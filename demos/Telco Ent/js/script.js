(function () {
	const chatBody = document.getElementById('chatBody');
	const textInput = document.getElementById('textInput');
	const sendBtn = document.getElementById('sendBtn');
	const statusText = document.getElementById('statusText');
	const phone = document.getElementById('phone');
	const flowView = document.getElementById('flowView');
	const verFlujoBtn = document.getElementById('verFlujoBtn');
	const iniciarDemoBtn = document.getElementById('iniciarDemoBtn');

	// ---------- state ----------
	const state = {
		phone: '70012345',
		flowType: null,      // 'recarga' | 'paquete'
		item: null,
		monto: null,
		billingName: null,
		billingDoc: null,
		awaitingInput: null, // function(value) or null
		inputMode: null,     // 'text' | 'number' | null (validation hint)
		lastOptions: null,   // {labels, handler} to re-show on invalid free text
	};

	const RECARGAS = ['Bs5', 'Bs10', 'Bs20', 'Bs50', 'Bs100', 'Bs200', 'Monto personalizado'];

	const PAQUETES = [
		{ tier: 3, price: 3, mb: 800, vig: '24 HRS' },
		{ tier: 4, price: 4, mb: 1100, vig: '24 HRS' },
		{ tier: 7, price: 7, mb: 2200, vig: '24 HRS' },
		{ tier: 10, price: 10, mb: 3000, vig: '48 HRS' },
		{ tier: 20, price: 20, mb: 6000, vig: '7 DÍAS' },
		{ tier: 50, price: 50, mb: 15000, vig: '30 DÍAS' },
	];

	// ---------- helpers: DOM ----------
	function scrollToBottom() {
		requestAnimationFrame(() => { chatBody.scrollTop = chatBody.scrollHeight; });
	}

	function timeNow() {
		const d = new Date();
		let h = d.getHours(), m = d.getMinutes();
		const ampm = h >= 12 ? 'p.m.' : 'a.m.';
		h = h % 12; if (h === 0) h = 12;
		return h + ':' + String(m).padStart(2, '0') + ' ' + ampm;
	}

	function addRow(html, side) {
		const row = document.createElement('div');
		row.className = 'row ' + side;
		row.innerHTML = html;
		chatBody.appendChild(row);
		scrollToBottom();
		return row;
	}

	function userEcho(text) {
		addRow(
			`<div class="bubble">${escapeHtml(text)}<div class="meta">${timeNow()} <span class="ticks">✓✓</span></div></div>`,
			'out'
		);
	}

	function escapeHtml(str) {
		return String(str).replace(/[&<>"']/g, s => ({
			'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
		}[s]));
	}

	function showTyping() {
		return addRow(`<div class="typing-bubble"><span></span><span></span><span></span></div>`, 'in');
	}

	function wait(ms) { return new Promise(r => setTimeout(r, ms)); }

	// sequential bot message with typing delay
	async function botMessage(text, delay) {
		const typingRow = showTyping();
		await wait(delay ?? (500 + Math.min(text.length * 8, 700)));
		typingRow.remove();
		addRow(
			`<div class="bubble">${escapeHtml(text).replace(/\n/g, '<br>')}<div class="meta">${timeNow()}</div></div>`,
			'in'
		);
		await wait(120);
	}

	async function botQR(monto) {
		const typingRow = showTyping();
		await wait(700);
		typingRow.remove();
		addRow(`
      <div class="bubble" style="padding:10px;">
        <div class="qr-card">
          ${qrSvg()}
          <div class="qr-amount">Bs ${monto.toFixed ? monto.toFixed(2) : monto}</div>
          <div class="qr-label">Código QR de pago · Escanea para pagar</div>
        </div>
        <div class="meta">${timeNow()}</div>
      </div>
    `, 'in');
		await wait(150);
	}

	function qrSvg() {
		// deterministic pseudo-random QR-like pattern (visual only)
		let seed = 42;
		function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
		const size = 21, cell = 150 / size;
		let rects = '';
		for (let y = 0; y < size; y++) {
			for (let x = 0; x < size; x++) {
				const isFinder =
					(x < 7 && y < 7) || (x > size - 8 && y < 7) || (x < 7 && y > size - 8);
				let fill = false;
				if (isFinder) {
					const lx = x < 7 ? x : (x - (size - 7));
					const ly = y < 7 ? y : (y - (size - 7));
					fill = (lx === 0 || lx === 6 || ly === 0 || ly === 6) || (lx >= 2 && lx <= 4 && ly >= 2 && ly <= 4);
				} else {
					fill = rnd() > 0.6;
				}
				if (fill) rects += `<rect x="${x * cell}" y="${y * cell}" width="${cell}" height="${cell}" fill="#111"/>`;
			}
		}
		return `<svg viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg"><rect width="150" height="150" fill="#fff"/>${rects}</svg>`;
	}

	// quick-reply option list (WhatsApp business style buttons)
	function showOptions(labels, handler, opts) {
		opts = opts || {};
		const card = document.createElement('div');
		card.className = 'options-wrap';
		const inner = document.createElement('div');
		inner.className = 'options-card';
		labels.forEach(label => {
			const btn = document.createElement('button');
			btn.className = 'opt-btn';
			btn.textContent = label;
			btn.addEventListener('click', () => {
				if (inner.dataset.locked) return;
				inner.dataset.locked = '1';
				[...inner.children].forEach(c => c.classList.add('disabled'));
				handler(label);
			});
			inner.appendChild(btn);
		});
		card.appendChild(inner);
		chatBody.appendChild(card);
		scrollToBottom();
		state.lastOptions = { labels, handler };
		state.awaitingInput = null;
	}

	function askFreeText(placeholderMode, onSubmit) {
		state.awaitingInput = onSubmit;
		state.inputMode = placeholderMode;
		state.lastOptions = null;
		textInput.placeholder = placeholderMode === 'number'
			? 'Escribe el monto en Bs...'
			: placeholderMode === 'phone'
				? 'Escribe el número de teléfono...'
				: 'Escribe tu respuesta...';
		textInput.focus();
	}

	function resetPlaceholder() {
		textInput.placeholder = 'Escribe un mensaje';
	}

	// ---------- flow ----------
	async function init() {
		statusText.textContent = 'en línea';
		await botMessage('¡Hola! 👋 Bienvenido al Asistente de compras de *Entel*.\nSelecciona una opción para continuar:');
		showOptions(['Entel Recargas', 'Paquetes'], handleEntelMenu);
	}

	async function handleEntelMenu(choice) {
		userEcho(choice);
		if (choice === 'Entel PostPago') {
			await botMessage('La consulta de PostPago no está incluida en esta demo.');
			showOptions(['⬅️ Volver'], () => { userEcho('⬅️ Volver'); handleMainMenu('ENTEL'); });
			return;
		}
		state.flowType = choice === 'Entel Recargas' ? 'recarga' : 'paquete';
		await askConfirmPhone();
	}

	async function askConfirmPhone() {
		await botMessage(`Vamos a continuar con el número *+591 ${state.phone}*`);
		showOptions(['Confirmar número', 'Cambiar número'], handlePhoneConfirm);
	}

	async function handlePhoneConfirm(choice) {
		userEcho(choice);
		if (choice === 'Confirmar número') {
			await proceedAfterPhone();
			return;
		}
		await botMessage('Por favor escribe el nuevo número de destino:');
		askFreeText('phone', async (value) => {
			userEcho(value);
			state.phone = value.replace(/\s+/g, '');
			await botMessage(`Número actualizado a *+591 ${state.phone}* ✅`);
			await proceedAfterPhone();
		});
	}

	async function proceedAfterPhone() {
		if (state.flowType === 'recarga') await showRecargas();
		else await showPaquetes();
	}

	async function showRecargas() {
		await botMessage('Estas son las recargas disponibles 💰');
		showOptions(RECARGAS, handleRecargaChoice);
	}

	async function handleRecargaChoice(choice) {
		userEcho(choice);
		if (choice === 'Monto personalizado') {
			await botMessage('Escribe el monto que deseas recargar (en Bs):');
			askFreeText('number', handleCustomAmount);
			return;
		}
		state.monto = parseInt(choice.replace('Bs', ''), 10);
		state.item = `Recarga ${choice}`;
		await askBillingCheck();
	}

	async function handleCustomAmount(value) {
		userEcho(value);
		const n = parseFloat(value.replace(/[^\d.]/g, ''));
		if (!n || n <= 0) {
			await botMessage('No entendí el monto. Por favor escribe solo el número, por ejemplo: 15');
			askFreeText('number', handleCustomAmount);
			return;
		}
		state.monto = n;
		state.item = `Recarga personalizada de Bs${n}`;
		await askBillingCheck();
	}

	async function showPaquetes() {
		await botMessage('Estos son los paquetes Megas PRO disponibles 📦');
		await wait(150);

		// interactive carousel: one card per package, two variants to pick inside
		const map = {};
		let locked = false;

		const wrap = document.createElement('div');
		wrap.className = 'pkg-carousel-wrap';

		const track = document.createElement('div');
		track.className = 'pkg-carousel';
		track.setAttribute('role', 'region');
		track.setAttribute('aria-roledescription', 'carrusel');
		track.setAttribute('aria-label', 'Paquetes disponibles');
		track.tabIndex = 0;

		PAQUETES.forEach(p => {
			const normalLabel = `Megas PRO ${p.tier} (${p.mb} MB) + WhatsApp Ilimitado (${p.vig})`;
			const promoLabel = `Megas PRO ${p.tier} (${p.mb} MB, + WhatsApp Ilimitado ${p.vig})`;
			map[normalLabel] = { label: normalLabel, price: p.price };
			map[promoLabel] = { label: promoLabel, price: p.price };

			const card = document.createElement('div');
			card.className = 'pkg-card';
			card.innerHTML = `
				<div class="pkg-head">
					<div class="pkg-tier">Megas PRO ${p.tier} + WhatsApp Ilimitado</div>
					<div class="pkg-price">Bs ${p.price}</div>
				</div>
				<div class="pkg-meta">
					<div class="pkg-data">${p.mb} MB</div>
					<div class="pkg-vig">Vigencia: ${p.vig}</div>
				</div>
				<div class="pkg-actions">
					<button class="pkg-opt" data-variant="normal">🌐 Comprar</button>
				</div>
			`;

			card.querySelectorAll('.pkg-opt').forEach(btn => {
				btn.addEventListener('click', () => {
					if (locked) return;
					locked = true;
					wrap.querySelectorAll('.pkg-opt').forEach(b => {
						b.classList.add('disabled');
						b.setAttribute('aria-disabled', 'true');
						b.tabIndex = -1;
					});
					const label = btn.dataset.variant === 'promo' ? promoLabel : normalLabel;
					handlePaqueteChoice(label, map);
				});
			});

			track.appendChild(card);
		});

		// controls: prev / next arrows + dots
		const controls = document.createElement('div');
		controls.className = 'carousel-controls';

		const prevBtn = document.createElement('button');
		prevBtn.className = 'carousel-arrow';
		prevBtn.textContent = '‹';
		prevBtn.disabled = true;
		prevBtn.setAttribute('aria-label', 'Paquetes anteriores');

		const nextBtn = document.createElement('button');
		nextBtn.className = 'carousel-arrow';
		nextBtn.textContent = '›';
		nextBtn.setAttribute('aria-label', 'Siguientes paquetes');

		const dotWrap = document.createElement('div');
		dotWrap.className = 'carousel-dots';
		dotWrap.setAttribute('aria-hidden', 'true');
		const dots = PAQUETES.map((_, i) => {
			const d = document.createElement('span');
			d.className = 'dot' + (i === 0 ? ' active' : '');
			dotWrap.appendChild(d);
			return d;
		});

		function step() {
			const card = track.querySelector('.pkg-card');
			return card ? card.offsetWidth + 10 : 168;
		}

		function updateCarouselState() {
			const idx = Math.round(track.scrollLeft / step());
			dots.forEach((d, i) => d.classList.toggle('active', i === idx));
			prevBtn.disabled = track.scrollLeft <= 4;
			nextBtn.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
		}

		prevBtn.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: 'smooth' }));
		nextBtn.addEventListener('click', () => track.scrollBy({ left: step(), behavior: 'smooth' }));
		track.addEventListener('scroll', updateCarouselState, { passive: true });
		track.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowRight') { e.preventDefault(); track.scrollBy({ left: step(), behavior: 'smooth' }); }
			else if (e.key === 'ArrowLeft') { e.preventDefault(); track.scrollBy({ left: -step(), behavior: 'smooth' }); }
		});

		controls.appendChild(prevBtn);
		controls.appendChild(dotWrap);
		controls.appendChild(nextBtn);

		wrap.appendChild(track);
		wrap.appendChild(controls);
		chatBody.appendChild(wrap);
		updateCarouselState();
		scrollToBottom();

		state.lastOptions = null; // carousel handles its own selection
		state.awaitingInput = null;
	}

	async function handlePaqueteChoice(choice, map) {
		userEcho(choice);
		const info = map[choice];
		state.monto = info.price;
		state.item = info.label;
		await botMessage(`Mostrando resumen y confirmación de tu paquetigo 🧾`);
		await askBillingCheck();
	}

	async function askBillingCheck() {
		await botMessage(`Resumen de tu compra:\n📦 ${state.item}\n📱 Número: +591 ${state.phone}\n💵 Monto: Bs ${state.monto}`);
		await botMessage('¿Tienes datos de facturación registrados previamente?');
		showOptions(['Sí, los tengo', 'No, es mi primera vez'], handleBillingCheck);
	}

	async function handleBillingCheck(choice) {
		userEcho(choice);
		if (choice === 'Sí, los tengo') {
			state.billingName = state.billingName || 'Juan Pérez';
			state.billingDoc = state.billingDoc || '1234567 LP';
			await botMessage(`Estos son tus datos guardados:\n👤 ${state.billingName}\n🪪 CI/NIT: ${state.billingDoc}`);
			showOptions(['Confirmar datos', 'Editar datos'], handleBillingConfirm);
			return;
		}
		await askBillingName();
	}

	async function handleBillingConfirm(choice) {
		userEcho(choice);
		if (choice === 'Confirmar datos') {
			await generateQR();
			return;
		}
		await askBillingName();
	}

	async function askBillingName() {
		await botMessage('Por favor escribe tu nombre completo:');
		askFreeText('text', async (value) => {
			userEcho(value);
			state.billingName = value;
			await askBillingDoc();
		});
	}

	async function askBillingDoc() {
		await botMessage('Ahora escribe tu número de CI o NIT de facturación:');
		askFreeText('text', async (value) => {
			userEcho(value);
			state.billingDoc = value;
			await botMessage(`Datos guardados:\n👤 ${state.billingName}\n🪪 CI/NIT: ${state.billingDoc} ✅`);
			await generateQR();
		});
	}

	async function generateQR() {
		statusText.textContent = 'escribiendo...';
		await botMessage('Generando código QR con el monto de la transacción... ⏳', 700);
		await botQR(state.monto);
		await wait(1400);
		statusText.textContent = 'escribiendo...';
		await botMessage('✅ ¡Pago exitoso! Gracias por tu compra en Entel.');
		statusText.textContent = 'en línea';
		showOptions(['🔄 Nueva transacción'], () => { userEcho('🔄 Nueva transacción'); resetState(); init(); });
	}

	function resetState() {
		state.flowType = null;
		state.item = null;
		state.monto = null;
	}

	// ---------- free text handling ----------
	async function handleUserSend() {
		const value = textInput.value.trim();
		if (!value) return;
		textInput.value = '';

		if (state.awaitingInput) {
			const fn = state.awaitingInput;
			state.awaitingInput = null;
			resetPlaceholder();
			fn(value);
			return;
		}

		// free text while options are showing / no active input request
		userEcho(value);
		const lower = value.toLowerCase();
		if (lower === 'menu' || lower === 'menú' || lower === 'inicio' || lower === 'hola') {
			resetState();
			await init();
			return;
		}
		await botMessage('No entendí tu mensaje 🤔 Por favor selecciona una de las opciones, o escribe "menu" para reiniciar.');
		if (state.lastOptions) {
			showOptions(state.lastOptions.labels, state.lastOptions.handler);
		}
	}

	sendBtn.addEventListener('click', handleUserSend);
	textInput.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') { e.preventDefault(); handleUserSend(); }
	});

	// ---------- side menu: ver flujo / iniciar demo ----------
	function verFlujo() {
		phone.classList.add('hidden');
		flowView.classList.add('active');
	}

	function iniciarDemo() {
		flowView.classList.remove('active');
		flowView.classList.remove('expanded');
		phone.classList.remove('hidden');
		chatBody.innerHTML = '<div class="day-chip"><span>HOY</span></div>';
		resetState();
		init();
	}

	verFlujoBtn.addEventListener('click', verFlujo);
	iniciarDemoBtn.addEventListener('click', iniciarDemo);
	flowView.querySelector('img').addEventListener('click', () => {
		flowView.classList.toggle('expanded');
	});

	// kick off
	init();
})();

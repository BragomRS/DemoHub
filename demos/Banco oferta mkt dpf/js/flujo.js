/*
    FLUJO ESPECÍFICO DEL PROYECTO: Banco Oferta Mkt (DPF)

    Simula una campaña de marketing de Banco Demo (banco ficticio) ofreciendo
    un Depósito a Plazo Fijo (DPF). Las tasas, plazos, agencias y datos de
    contacto son referenciales y únicamente para fines de demostración.

    Este archivo implementa los hooks que espera js/engine.js:

        iniciarFlujo()            -> primer mensaje/opciones del bot
        manejarEntradaUsuario(t)  -> procesa el texto libre del input
*/

/* DATOS CLIENTE */

const cliente = {
    nombre: "Brandon"
};

/* HOOK: PRIMER MENSAJE DEL BOT */

function iniciarFlujo() {

    addMessage(
        `
        <img src="images/mkt%20msc.jpeg" alt="Depósito a Plazo Fijo - Banco Demo" class="message-image">

        👋 ¡Hola, <b>${cliente.nombre}</b>!<br><br>

        En Banco Demo queremos ayudarte a hacer crecer tus ahorros.<br><br>

        Tenemos una oportunidad especial para ti: un <b>Depósito a Plazo Fijo (DPF)</b>
        con una tasa preferencial por tiempo limitado. 💰<br><br>

        Conoce nuestras opciones y descubre cómo puedes obtener un mejor rendimiento
        por tu dinero.<br>
        
        <div class="option-buttons">
            <button onclick="verTasasFlow()">Ver tasas</button>
            <button onclick="verPlazosFlow()">Ver plazos</button>
            <button onclick="ayudaFlow()">Ayuda</button>
        </div>
        `,
        "received"
    );

}

/* HOOK: TEXTO LIBRE DEL INPUT */

function manejarEntradaUsuario(text) {

    addMessage(
        `
        🙂 Por favor selecciona una de las opciones disponibles en el mensaje anterior.
        `,
        "received"
    );

}

/* OFRECER ASESOR (se muestra tras tasas / plazos / beneficios) */

function ofrecerAsesorFlow() {

    setTimeout(() => {

        addMessage(
            `
            💬 ¿Tienes dudas sobre este producto? Un asesor puede darte información
            personalizada.

            <div class="option-buttons">
                <button onclick="asesorFlow()">Hablar con un asesor</button>
            </div>
            `,
            "received"
        );

    }, tiempoRespuesta());

}

/* VER TASAS */

function verTasasFlow() {

    addUserMessage("Ver tasas");

    setTimeout(() => {

        addMessage(
            `
            📈 <b>Conoce nuestras tasas de DPF</b><br><br>

            Haz que tu dinero genere rendimientos mientras eliges el plazo que mejor
            se adapte a tus objetivos.

            <div class="carousel">

                <div class="carousel-card">
                    <span class="carousel-label">180 días</span>
                    <div class="carousel-rate">2.60%</div>
                    <div class="carousel-desc">Anual referencial.<br>Corto plazo, ideal para metas cercanas.</div>
                    <button class="carousel-btn" onclick="beneficiosFlow()">Beneficios</button>
                </div>

                <div class="carousel-card">
                    <span class="carousel-label">360 días</span>
                    <div class="carousel-rate">4.60%</div>
                    <div class="carousel-desc">Anual referencial.<br>Equilibrio entre plazo y rendimiento.</div>
                    <button class="carousel-btn" onclick="beneficiosFlow()">Beneficios</button>
                </div>

                <div class="carousel-card">
                    <span class="carousel-badge">Mejor tasa</span>
                    <span class="carousel-label">720 días</span>
                    <div class="carousel-rate">6.60%</div>
                    <div class="carousel-desc">Anual referencial.<br>Mayor plazo, mayor tasa referencial.</div>
                    <button class="carousel-btn" onclick="beneficiosFlow()">Beneficios</button>
                </div>

            </div>
            `,
            "received"
        );

        ofrecerAsesorFlow();

    }, tiempoRespuesta());

}

/* VER PLAZOS */

function verPlazosFlow() {

    addUserMessage("Ver plazos");

    setTimeout(() => {

        addMessage(
            `
            📅 <b>Invierte a tu ritmo</b><br><br>

            Tú eliges el plazo y nosotros te ofrecemos una alternativa para hacer
            crecer tu dinero.<br><br>

            ✔️ <b>180 días:</b> Si prefieres disponer de tu inversión en menos
            tiempo.<br>
            ✔️ <b>360 días:</b> Una de las opciones más elegidas por nuestros
            clientes para equilibrar plazo y rentabilidad.<br>
            ✔️ <b>720 días:</b> Para quienes buscan obtener un mayor rendimiento
            manteniendo su inversión por más tiempo.<br>

            <div class="option-buttons">
                <button onclick="verTasasFlow()">Ver tasas</button>
                <button onclick="beneficiosFlow()">Beneficios</button>
                <button onclick="ayudaFlow()">Ayuda</button>
            </div>
            `,
            "received"
        );

    }, tiempoRespuesta());

}

/* BENEFICIOS */

function beneficiosFlow() {

    addUserMessage("Beneficios");

    setTimeout(() => {

        addMessage(
            `
            ✨ <b>Beneficios de tu DPF</b><br><br>

            Al contratar un Depósito a Plazo Fijo puedes disfrutar de:<br><br>

            ✅ Una tasa definida durante el plazo contratado.<br>
            ✅ Rendimientos sobre tu inversión.<br>
            ✅ Diferentes opciones de plazo.<br>
            ✅ Una alternativa sencilla para planificar tus ahorros.<br><br>

            Los beneficios y condiciones están sujetos al producto vigente.<br><br>

            ¿Qué deseas conocer?

            <div class="option-buttons">
                <button onclick="verTasasFlow()">Ver tasas</button>
                <button onclick="verPlazosFlow()">Ver plazos</button>
                <button onclick="ayudaFlow()">Ayuda</button>
            </div>
            `,
            "received"
        );

        ofrecerAsesorFlow();

    }, tiempoRespuesta());

}

/* AYUDA - MENÚ */

function mostrarMenuAyuda() {

    setTimeout(() => {

        addMessage(
            `
            ℹ️ <b>¿Necesitas ayuda?</b><br><br>

            Estamos aquí para ayudarte.<br><br>

            Puedes consultar nuestros canales de atención, agencias y horarios.<br><br>

            ¿Qué deseas consultar?

            <div class="option-buttons">
                <button onclick="lineaGratuitaFlow()">Línea gratuita</button>
                <button onclick="agenciasFlow()">Agencias</button>
                <button onclick="horariosFlow()">Horarios de atención</button>
            </div>
            `,
            "received"
        );

    }, tiempoRespuesta());

}

function ayudaFlow() {

    addUserMessage("Ayuda");

    mostrarMenuAyuda();

}

function volverAyudaFlow() {

    addUserMessage("Volver a ayuda");

    mostrarMenuAyuda();

}

/* LÍNEA GRATUITA */

function lineaGratuitaFlow() {

    addUserMessage("Línea gratuita");

    setTimeout(() => {

        addMessage(
            `
            📞 <b>Línea gratuita</b><br><br>

            Si necesitas información o asistencia, puedes comunicarte con nosotros a
            través de nuestra línea gratuita:<br><br>

            <b>800-123-456</b><br><br>

            Nuestro equipo estará disponible para ayudarte con tus consultas.

            <div class="option-buttons">
                <button onclick="volverAyudaFlow()">Volver a ayuda</button>
            </div>
            `,
            "received"
        );

    }, tiempoRespuesta());

}

/* AGENCIAS */

function agenciasFlow() {

    addUserMessage("Agencias");

    setTimeout(() => {

        addMessage(
            `
            📍 <b>Nuestras agencias</b><br><br>

            Encuentra la agencia más cercana y consulta su ubicación.<br><br>

            ¿En qué ciudad deseas buscar?

            <div class="option-buttons">
                <button onclick="agenciaSantaCruzFlow()">Santa Cruz</button>
                <button onclick="agenciaLaPazFlow()">La Paz</button>
                <button onclick="agenciaCochabambaFlow()">Cochabamba</button>
            </div>
            `,
            "received"
        );

    }, tiempoRespuesta());

}

function agenciaSantaCruzFlow() {

    addUserMessage("Santa Cruz");

    setTimeout(() => {

        addMessage(
            `
            📍 <b>Agencias en Santa Cruz</b><br><br>

            <b>Agencia Central</b><br>
            Av. Principal #123<br><br>

            <b>Agencia Equipetrol</b><br>
            Av. San Martín #456<br><br>

            <b>Agencia Las Palmas</b><br>
            Av. Las Palmas #789

            <div class="option-buttons">
                <button onclick="volverAyudaFlow()">Volver a ayuda</button>
            </div>
            `,
            "received"
        );

    }, tiempoRespuesta());

}

function agenciaLaPazFlow() {

    addUserMessage("La Paz");

    setTimeout(() => {

        addMessage(
            `
            📍 <b>Agencias en La Paz</b><br><br>

            <b>Agencia Central</b><br>
            Av. Arce #123<br><br>

            <b>Agencia Miraflores</b><br>
            Av. Busch #456<br><br>

            <b>Agencia Zona Sur</b><br>
            Av. Ballivián #789

            <div class="option-buttons">
                <button onclick="volverAyudaFlow()">Volver a ayuda</button>
            </div>
            `,
            "received"
        );

    }, tiempoRespuesta());

}

function agenciaCochabambaFlow() {

    addUserMessage("Cochabamba");

    setTimeout(() => {

        addMessage(
            `
            📍 <b>Agencias en Cochabamba</b><br><br>

            <b>Agencia Central</b><br>
            Av. El Prado #123<br><br>

            <b>Agencia Norte</b><br>
            Av. América #456<br><br>

            <b>Agencia Cala Cala</b><br>
            Av. Circunvalación #789

            <div class="option-buttons">
                <button onclick="volverAyudaFlow()">Volver a ayuda</button>
            </div>
            `,
            "received"
        );

    }, tiempoRespuesta());

}

/* HORARIOS DE ATENCIÓN */

function horariosFlow() {

    addUserMessage("Horarios de atención");

    setTimeout(() => {

        addMessage(
            `
            🕐 <b>Horarios de atención</b><br><br>

            <b>Lunes a viernes</b><br>
            08:30 a 16:30<br><br>

            <b>Sábados</b><br>
            09:00 a 13:00<br><br>

            <b>Domingos y feriados</b><br>
            Cerrado.<br><br>

            Para atención fuera de horario, puedes comunicarte con nuestra línea
            gratuita.

            <div class="option-buttons">
                <button onclick="volverAyudaFlow()">Volver a ayuda</button>
            </div>
            `,
            "received"
        );

    }, tiempoRespuesta());

}

/* HABLAR CON UN ASESOR */

function asesorFlow() {

    addUserMessage("Hablar con un asesor");

    setTimeout(() => {

        addMessage(
            `
            👨‍💼 <b>Estamos para ayudarte</b><br><br>

            Un asesor especializado podrá brindarte información personalizada sobre:<br><br>

            ✅ Tasas vigentes<br>
            ✅ Plazos disponibles<br>
            ✅ Montos mínimos de inversión<br>
            ✅ Requisitos para contratar tu DPF<br>
            ✅ Condiciones del producto<br><br>

            ¿Deseas continuar con la atención?

            <div class="option-buttons">
                <button onclick="contactarAsesorFlow()">Contactar asesor</button>
            </div>
            `,
            "received"
        );

    }, tiempoRespuesta());

}

/* CONTACTAR ASESOR */

function contactarAsesorFlow() {

    addUserMessage("Contactar asesor");

    setTimeout(() => {

        addMessage(
            `
            Perfecto. Hemos registrado tu interés en nuestro Depósito a Plazo Fijo.<br><br>

            Un asesor se pondrá en contacto contigo para brindarte información sobre
            las opciones disponibles y ayudarte a elegir la alternativa que mejor se
            adapte a tus objetivos.<br><br>

            Gracias por confiar en Banco Demo. 🏦
            `,
            "received"
        );

        despedida();

    }, tiempoRespuesta());

}

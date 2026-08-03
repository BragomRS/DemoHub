/**
 * Motor de renderizado del Demo Hub.
 * Construye el sidebar (categorías + demos) y el panel principal
 * a partir del array DEMOS (js/demos.js). Nada del HTML se escribe a mano.
 */

const STATUS_CLASS = {
    "Disponible": "status-available",
    "En desarrollo": "status-in-progress",
    "Próximamente": "status-coming-soon"
};

const menuEl = document.getElementById("menu");
const contentEl = document.getElementById("content");
const sidebarEl = document.querySelector(".sidebar");
const sidebarToggleEl = document.getElementById("sidebarToggle");

let activeDemoId = null;
let showingPreview = false;
let sidebarCollapsed = false;

function setSidebarCollapsed(collapsed) {
    sidebarCollapsed = collapsed;
    sidebarEl.classList.toggle("collapsed", collapsed);
}

sidebarToggleEl.addEventListener("click", () => {
    setSidebarCollapsed(!sidebarCollapsed);
});

function groupByCategory(demos) {
    const map = new Map();
    demos.forEach(demo => {
        if (!map.has(demo.category)) map.set(demo.category, []);
        map.get(demo.category).push(demo);
    });
    return map;
}

function statusBadge(status) {
    const cssClass = STATUS_CLASS[status] || "status-default";
    return `<span class="status-badge ${cssClass}">${status}</span>`;
}

function renderMenu() {
    const grouped = groupByCategory(DEMOS);
    menuEl.innerHTML = "";

    grouped.forEach((demos, category) => {
        const categoryEl = document.createElement("div");
        categoryEl.className = "category";

        categoryEl.innerHTML = `
            <button class="category-header" type="button">
                <span>${category}</span>
                <span class="category-count">${demos.length}</span>
                <span class="chevron">▾</span>
            </button>
            <div class="category-list">
                ${demos.map(demo => `
                    <button class="demo-item ${demo.id === activeDemoId ? "active" : ""}" data-id="${demo.id}" type="button">
                        <span class="demo-item-title">${demo.title}</span>
                        ${statusBadge(demo.status)}
                    </button>
                `).join("")}
            </div>
        `;

        categoryEl.querySelector(".category-header").addEventListener("click", () => {
            categoryEl.classList.toggle("collapsed");
        });

        categoryEl.querySelectorAll(".demo-item").forEach(btn => {
            btn.addEventListener("click", () => {
                selectDemo(Number(btn.dataset.id));
            });
        });

        menuEl.appendChild(categoryEl);
    });
}

function selectDemo(id) {
    activeDemoId = id;
    showingPreview = false;
    setSidebarCollapsed(false);
    renderMenu();
    renderContent();
}

function renderContent() {
    const demo = DEMOS.find(d => d.id === activeDemoId);

    if (!demo) {
        contentEl.innerHTML = `
            <div class="empty-state">
                <h1>Bienvenido</h1>
                <p>Selecciona una demo en el panel lateral para comenzar.</p>
                <span class="demo-counter">${DEMOS.length} demo${DEMOS.length === 1 ? "" : "s"} disponibles</span>
            </div>
        `;
        return;
    }

    if (showingPreview) {
        contentEl.innerHTML = `
            <div class="demo-preview">
                <div class="demo-preview-header">
                    <h2>${demo.title}</h2>
                    <div class="demo-preview-actions">
                        <a href="${demo.url}" target="_blank" rel="noopener">Abrir en pestaña nueva</a>
                        <button class="btn-secondary" id="closePreview" type="button">Cerrar vista previa</button>
                    </div>
                </div>
                <iframe class="demo-preview-frame" src="${demo.url}" title="Vista previa de ${demo.title}"></iframe>
            </div>
        `;
        document.getElementById("closePreview").addEventListener("click", () => {
            showingPreview = false;
            setSidebarCollapsed(false);
            renderContent();
        });
        return;
    }

    contentEl.innerHTML = `
        <div class="demo-detail">
            <img class="demo-detail-image" src="${demo.image}" alt="${demo.title}">
            <div class="demo-detail-body">
                <div class="demo-detail-meta">
                    <span class="category-tag">${demo.category}</span>
                    ${statusBadge(demo.status)}
                </div>
                <h1>${demo.title}</h1>
                <p class="demo-detail-description">${demo.description}</p>
                <button class="btn-primary" id="openDemo" type="button">Abrir demo</button>
            </div>
        </div>
    `;
    document.getElementById("openDemo").addEventListener("click", () => {
        showingPreview = true;
        setSidebarCollapsed(true);
        renderContent();
    });
}

renderMenu();
renderContent();

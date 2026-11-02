/**
 * AAVV Pinar de Jalón (Valladolid)
 * Controlador de la Agenda Completa y Archivo de Eventos (eventos.html)
 * Incluye: Fetch JSON, pestañas Próximos/Celebrados/Todos, filtro por categorías, búsqueda en vivo y paginación de 6 en 6
 */

const EVENTS_PER_BATCH = 6;

// Datos de respaldo automático por si se abre eventos.html directamente vía protocolo file://
const FALLBACK_EVENTOS = [
    {
        id: 2,
        titulo: "Luce Jalón: Concurso de Decoración e Iluminación Navideña",
        fecha: "20/12/2026",
        dia: "20",
        mes: "DIC",
        hora: "18:30 h",
        lugar: "Plaza Everest · Pinar de Jalón",
        cuentaAtras: "✨ Próximo Evento Destacado",
        esPasado: false,
        categoria: "Cultura",
        imagen: "img/evento-lucejalon.jpg",
        imagenFallback: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=900&q=80",
        descripcion: "Concurso vecinal de decoración e iluminación navideña de balcones, ventanas y fachadas del barrio valorando estética, diseño, iluminación y creatividad. Inscripciones en navidadpinardejalon@gmail.com y entrega de premios en la Plaza Everest.",
        enlaceCalendar: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Concurso+Navide%C3%B1o+Luce+Jal%C3%B3n&details=Concurso+de+decoraci%C3%B3n+e+iluminaci%C3%B3n+navide%C3%B1a+en+Pinar+de+Jal%C3%B3n.+Inscripciones%3A+navidadpinardejalon%40gmail.com&location=Plaza+Everest%2C+Valladolid",
        textoWhatsApp: "¡Participa en el concurso de iluminación navideña Luce Jalón! ✨🎄 Inscripciones en navidadpinardejalon@gmail.com"
    },
    {
        id: 3,
        titulo: "JalonRun Navideña: Carrera Popular de Pinar de Jalón",
        fecha: "27/12/2026",
        dia: "27",
        mes: "DIC",
        hora: "10:30 h",
        lugar: "Plaza del Everest / Calle Aneto",
        cuentaAtras: "🏃 Tradición Navideña",
        esPasado: false,
        categoria: "Deportes",
        imagen: "img/evento-carrera.jpg",
        imagenFallback: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=80",
        descripcion: "Tradicional carrera popular navideña por el entorno natural de Pinar de Jalón con salida y meta en la Plaza del Everest / Calle Aneto. Recogida de bolsa del corredor y dorsales desde las 10:00 h.",
        enlaceCalendar: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=JalonRun+Carrera+Navide%C3%B1a+Pinar+de+Jal%C3%B3n&details=Carrera+popular+navide%C3%B1a+en+Pinar+de+Jal%C3%B3n.+Recogida+de+dorsales+desde+las+10%3A00h&location=Plaza+Everest%2C+Valladolid",
        textoWhatsApp: "¡Despide el año corriendo la tradicional JalonRun Navideña en Pinar de Jalón! 🏃‍♂️🌲 Salida en Plaza Everest a las 10:30h"
    },
    {
        id: 1,
        titulo: "JALONWEEN 2026: Escape Room 'El Ritual' y Baile de Disfraces",
        fecha: "31/10/2026",
        dia: "31",
        mes: "OCT",
        hora: "16:00 a 22:00 h",
        lugar: "Local C/ Kilimanjaro 4 y Parque",
        cuentaAtras: "✓ Celebrado",
        esPasado: true,
        categoria: "Fiestas",
        imagen: "img/evento-halloween.jpg",
        imagenFallback: "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?auto=format&fit=crop&w=900&q=80",
        descripcion: "Escape Room 'El Ritual' de 16:00 a 22:00 h en el local de la asociación (C/ Kilimanjaro 4) para grupos de 6 personas desde 14 años (20 min para escapar · Socios: 2 € / No socios: 4 €). Desde las 19:00 h, baile de disfraces en el parque con el DJ @danigarciia18.",
        enlaceCalendar: "",
        textoWhatsApp: ""
    },
    {
        id: 4,
        titulo: "V Fiestas Pinar de Jalón (Viernes 25 al Domingo 27 de Septiembre)",
        fecha: "25/09/2026",
        dia: "25",
        mes: "SEP",
        hora: "25 al 27 de septiembre",
        lugar: "Plaza Everest y Calle Kilimanjaro",
        cuentaAtras: "✓ Celebrado",
        esPasado: true,
        categoria: "Fiestas",
        imagen: "img/inicio.avif",
        imagenFallback: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80",
        descripcion: "Quinta edición de las Fiestas de Pinar de Jalón del viernes 25 al domingo 27 de septiembre con tres jornadas completas de actividades vecinales, peñas, música, juegos infantiles, torneos deportivos y gastronomía popular.",
        enlaceCalendar: "",
        textoWhatsApp: ""
    },
    {
        id: 5,
        titulo: "JALONWARTS: Fiesta Mágica en el Parque con DJ Frankiu y Sorteos",
        fecha: "30/05/2026",
        dia: "30",
        mes: "MAY",
        hora: "18:00 h",
        lugar: "Parque Pinar de Jalón",
        cuentaAtras: "✓ Celebrado",
        esPasado: true,
        categoria: "Infantil",
        imagen: "img/evento-jalonwarts.jpg",
        imagenFallback: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80",
        descripcion: "Tarde temática mágica en el Parque Pinar de Jalón desde las 18:00 h amenizada por DJ Frankiu, con sorteos y premios gracias a los establecimientos patrocinadores del barrio.",
        enlaceCalendar: "",
        textoWhatsApp: ""
    },
    {
        id: 6,
        titulo: "Asamblea Anual de Socios de la AAVV Pinar de Jalón",
        fecha: "21/03/2026",
        dia: "21",
        mes: "MAR",
        hora: "11:00 h",
        lugar: "Centro Cívico José Mª Luelmo",
        cuentaAtras: "✓ Celebrado",
        esPasado: true,
        categoria: "Cultura",
        imagen: "img/evento-asamblea.jpg",
        imagenFallback: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=900&q=80",
        descripcion: "Asamblea general ordinaria convocada a las 11:00 h en el Centro Cívico José Mª Luelmo para la aprobación de cuentas, evaluación de la gestión de la junta directiva y seguimiento de los proyectos y demandas del barrio.",
        enlaceCalendar: "",
        textoWhatsApp: ""
    },
    {
        id: 7,
        titulo: "Carnaval 2026 en la Plaza Everest",
        fecha: "16/02/2026",
        dia: "16",
        mes: "FEB",
        hora: "17:00 h",
        lugar: "Plaza Everest · Pinar de Jalón",
        cuentaAtras: "✓ Celebrado",
        esPasado: true,
        categoria: "Infantil",
        imagen: "img/evento-carnaval.jpg",
        imagenFallback: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80",
        descripcion: "Celebración popular de Carnaval en la Plaza Everest a partir de las 17:00 h con desfile de disfraces, música, animación infantil y encuentro vecinal para todas las edades.",
        enlaceCalendar: "",
        textoWhatsApp: ""
    },
    {
        id: 8,
        titulo: "IV Fiestas Pinar de Jalón y Arroz a la Zamorana",
        fecha: "26/09/2025",
        dia: "26",
        mes: "SEP",
        hora: "26 al 28 de septiembre",
        lugar: "Plaza Everest y Calle Kilimanjaro",
        cuentaAtras: "✓ Celebrado",
        esPasado: true,
        categoria: "Fiestas",
        imagen: "img/evento-fiestas4.jpg",
        imagenFallback: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80",
        descripcion: "Cuarta edición de las fiestas del barrio con pregón de David García López (rector de la UEMC), electrocharanga por la calle Kilimanjaro, juegos de feria, bingo musical y comida popular de arroz a la zamorana en la Plaza Everest.",
        enlaceCalendar: "",
        textoWhatsApp: ""
    }
];

let allEvents = [];
let filteredEvents = [];
let renderedCount = 0;
let activeStatus = "all";       // "all" | "upcoming" | "past"
let activeCategory = "all";     // "all" | "Deportes" | "Infantil" | "MedioAmbiente" | "Cultura" | "Fiestas"
let searchQuery = "";

/**
 * Escapa caracteres HTML para inyección segura
 */
function escapeHtml(str = "") {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

/**
 * Normaliza texto eliminando tildes y pasando a minúsculas
 */
function normalizeText(str = "") {
    return String(str)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

/**
 * Convierte fecha "dd/mm/yyyy" a timestamp del final de ese día (23:59:59)
 */
function parseEventDateDMY(dateStr = "") {
    if (!dateStr || typeof dateStr !== "string") return 0;
    const parts = dateStr.split("/");
    if (parts.length !== 3) return 0;
    const [day, month, year] = parts.map(Number);
    if (!day || !month || !year) return 0;
    return new Date(year, month - 1, day, 23, 59, 59, 999).getTime();
}

/**
 * Determina automáticamente si un evento ya ha pasado según su fecha (o esPasado)
 */
function isEventPast(ev) {
    const ts = parseEventDateDMY(ev.fecha);
    if (ts > 0) {
        return ts < Date.now();
    }
    return Boolean(ev.esPasado);
}

/**
 * Ordena eventos:
 * 1º Los próximos a ocurrir (de fecha más cercana a más lejana)
 * 2º Los que ya han pasado (cronológicamente del más reciente al más antiguo)
 */
function sortEventsChronologically(events = []) {
    const sorted = [...events].sort((a, b) => {
        const aPast = isEventPast(a);
        const bPast = isEventPast(b);

        if (aPast !== bPast) {
            return aPast ? 1 : -1;
        }

        const aTime = parseEventDateDMY(a.fecha);
        const bTime = parseEventDateDMY(b.fecha);

        if (!aPast) {
            return aTime - bTime;
        }
        return bTime - aTime;
    });

    // Marcar el evento futuro más próximo como destacado
    let firstUpcomingMarked = false;
    return sorted.map(ev => {
        const past = isEventPast(ev);
        const isNextHighlight = !past && !firstUpcomingMarked;
        if (isNextHighlight) firstUpcomingMarked = true;
        return {
            ...ev,
            esPasado: past,
            _isNextHighlight: isNextHighlight
        };
    });
}

/**
 * Construye el HTML de una tarjeta de evento diferenciando entre futuros y ya celebrados
 */
function createEventCardHtml(ev) {
    const isPast = Boolean(ev.esPasado);
    const cardClass = isPast ? "social-event-card is-past-event" : "social-event-card";
    const badgeClass = isPast
        ? "countdown-badge badge-past"
        : (ev._isNextHighlight ? "countdown-badge badge-urgent" : "countdown-badge");
    const badgeText = isPast ? "✓ Celebrado" : (ev.cuentaAtras || "Próxima cita");

    const fallbackUrl = ev.imagenFallback || "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=80";
    const descripcion = ev.descripcion || ev.resumen || "";
    const calendarUrl = ev.enlaceCalendar || ev.calendarUrl || "#";
    const waText = ev.textoWhatsApp || ev.whatsappTexto || ev.titulo;
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(waText)}`;
    const categoria = ev.categoria || "Comunidad";

    // Pie de tarjeta condicional: botones de Calendar/WhatsApp para futuros, o badge de celebrado + crónica para pasados
    const actionsHtml = !isPast
        ? `
        <div class="event-actions-row">
            <a href="${escapeHtml(calendarUrl)}"
               target="_blank"
               rel="noopener noreferrer"
               class="btn-event-action btn-cal">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                Añadir a Calendar
            </a>
            <a href="${waUrl}"
               target="_blank"
               rel="noopener noreferrer"
               class="btn-event-action btn-wa-share">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771z"/>
                </svg>
                Compartir WhatsApp
            </a>
        </div>
        `
        : `
        <div class="event-past-footer">
            <span class="past-status-pill">✓ Actividad finalizada (${escapeHtml(ev.fecha || "")})</span>
            <a href="noticias.html" class="past-photos-link">Ver crónica / fotos &rarr;</a>
        </div>
        `;

    return `
        <article class="${cardClass}" data-event-id="${escapeHtml(ev.id)}">
            <div class="event-image-wrap">
                <img src="${escapeHtml(ev.imagen)}"
                     onerror="this.onerror=null;this.src='${escapeHtml(fallbackUrl)}';"
                     alt="${escapeHtml(ev.titulo)}"
                     loading="lazy">
                <span class="${badgeClass}">${escapeHtml(badgeText)}</span>
                <div class="date-floating-box">
                    <span class="day">${escapeHtml(ev.dia)}</span>
                    <span class="month">${escapeHtml(ev.mes)}</span>
                </div>
            </div>

            <div class="event-card-body">
                <div class="event-meta-pills">
                    <span>🕙 ${escapeHtml(ev.hora)}</span>
                    <span>📍 ${escapeHtml(ev.lugar)}</span>
                    <button type="button" class="hashtag event-cat-chip" data-category="${escapeHtml(categoria)}">#${escapeHtml(categoria)}</button>
                </div>
                <h2 class="event-card-title">${escapeHtml(ev.titulo)}</h2>
                <p class="event-card-desc">${escapeHtml(descripcion)}</p>
                ${actionsHtml}
            </div>
        </article>
    `;
}

/**
 * Filtra los eventos combinando estado (Próximos/Celebrados/Todos), categoría y búsqueda en tiempo real
 */
function applyEventFiltersAndReset() {
    const normQuery = normalizeText(searchQuery.trim());
    const normCat = normalizeText(activeCategory);

    filteredEvents = allEvents.filter(ev => {
        const isPast = Boolean(ev.esPasado);

        // 1. Filtro por pestaña de estado
        if (activeStatus === "upcoming" && isPast) return false;
        if (activeStatus === "past" && !isPast) return false;

        // 2. Filtro por categoría temática
        if (activeCategory !== "all" && normalizeText(ev.categoria || "") !== normCat) {
            return false;
        }

        // 3. Filtro por texto en tiempo real
        if (!normQuery) return true;

        const searchable = normalizeText(
            `${ev.titulo || ""} ${ev.lugar || ""} ${ev.descripcion || ev.resumen || ""} ${ev.categoria || ""} ${ev.fecha || ""}`
        );
        return searchable.includes(normQuery);
    });

    const container = document.getElementById("archive-events-container");
    if (container) container.innerHTML = "";
    renderedCount = 0;

    renderNextEventsBatch();
    updateResetBtnVisibility();
}

/**
 * Renderiza progresivamente de 6 en 6 eventos
 */
function renderNextEventsBatch() {
    const container = document.getElementById("archive-events-container");
    const counterEl = document.getElementById("events-results-count");
    const loadMoreBtn = document.getElementById("load-more-events-btn");

    if (!container) return;

    if (filteredEvents.length === 0) {
        container.innerHTML = `
            <div class="empty-archive-state">
                <span class="empty-icon">📅</span>
                <h3>No hay actividades que coincidan con tu búsqueda</h3>
                <p>Prueba a cambiar la pestaña de estado (Próximos / Celebrados) o selecciona "Todos" en las categorías.</p>
            </div>
        `;
        if (counterEl) counterEl.textContent = "Mostrando 0 de 0 eventos";
        if (loadMoreBtn) loadMoreBtn.hidden = true;
        return;
    }

    const nextBatch = filteredEvents.slice(renderedCount, renderedCount + EVENTS_PER_BATCH);
    container.insertAdjacentHTML("beforeend", nextBatch.map(createEventCardHtml).join(""));
    renderedCount += nextBatch.length;

    if (counterEl) {
        counterEl.textContent = `Mostrando ${renderedCount} de ${filteredEvents.length} actividades`;
    }

    if (loadMoreBtn) {
        loadMoreBtn.hidden = renderedCount >= filteredEvents.length;
    }
}

/**
 * Muestra u oculta el botón de limpiar filtros
 */
function updateResetBtnVisibility() {
    const resetBtn = document.getElementById("reset-events-filters-btn");
    if (!resetBtn) return;
    resetBtn.hidden = activeStatus === "all" && activeCategory === "all" && searchQuery.trim() === "";
}

/**
 * Actualiza visualmente los botones de categoría
 */
function setCategoryUI(category) {
    activeCategory = category;
    document.querySelectorAll("[data-category]").forEach(btn => {
        if (btn.classList.contains("tag-filter")) {
            btn.classList.toggle("active", normalizeText(btn.dataset.category) === normalizeText(category));
        }
    });
}

/**
 * Actualiza visualmente las pestañas de estado
 */
function setStatusTabUI(status) {
    activeStatus = status;
    document.querySelectorAll(".status-tab-btn").forEach(btn => {
        const isSelected = btn.dataset.status === status;
        btn.classList.toggle("active", isSelected);
        btn.setAttribute("aria-selected", String(isSelected));
    });
}

/**
 * Carga inicial desde data/eventos.json
 */
async function initEventsArchive() {
    try {
        const res = await fetch("data/eventos.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        allEvents = Array.isArray(data) ? data : (data.items || []);
    } catch (err) {
        console.warn("Usando agenda local de respaldo:", err.message);
        allEvents = FALLBACK_EVENTOS;
    }

    // Ordenar: 1º próximos (más cercano primero) y 2º pasados (del más reciente al más antiguo)
    allEvents = sortEventsChronologically(allEvents);
    applyEventFiltersAndReset();
}

/**
 * Enlaza todos los eventos de interfaz
 */
function bindEventsUI() {
    // 1. Menú móvil responsive
    const menuBtn = document.querySelector(".mobile-menu-toggle");
    const mainNav = document.querySelector(".main-nav");
    if (menuBtn && mainNav) {
        menuBtn.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("is-open");
            menuBtn.setAttribute("aria-expanded", String(isOpen));
        });
    }

    // 2. Buscador en tiempo real
    const searchInput = document.getElementById("events-search-input");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value;
            applyEventFiltersAndReset();
        });
    }

    // 3. Pestañas de estado (Todos / Próximos / Celebrados)
    document.querySelectorAll(".status-tab-btn").forEach(tab => {
        tab.addEventListener("click", () => {
            setStatusTabUI(tab.dataset.status || "all");
            applyEventFiltersAndReset();
        });
    });

    // 4. Filtros superiores por categoría
    document.querySelectorAll(".tag-filter[data-category]").forEach(btn => {
        btn.addEventListener("click", () => {
            setCategoryUI(btn.dataset.category || "all");
            applyEventFiltersAndReset();
        });
    });

    // 5. Clic en chip de categoría dentro de una tarjeta
    const container = document.getElementById("archive-events-container");
    if (container) {
        container.addEventListener("click", (e) => {
            const catChip = e.target.closest(".event-cat-chip");
            if (catChip && catChip.dataset.category) {
                setCategoryUI(catChip.dataset.category);
                applyEventFiltersAndReset();
            }
        });
    }

    // 6. Botón limpiar filtros
    const resetBtn = document.getElementById("reset-events-filters-btn");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            if (searchInput) searchInput.value = "";
            searchQuery = "";
            setStatusTabUI("all");
            setCategoryUI("all");
            applyEventFiltersAndReset();
        });
    }

    // 7. Botón Cargar más eventos
    const loadMoreBtn = document.getElementById("load-more-events-btn");
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", () => {
            renderNextEventsBatch();
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    bindEventsUI();
    initEventsArchive();
});


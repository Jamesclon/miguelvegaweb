/**
 * AAVV Pinar de Jalón (Valladolid)
 * Lógica principal: Carga dinámica de JSON (Stories, Eventos, Muro Vecinal) e interacciones UI
 */

// Datos de respaldo automático por si se abre index.html con doble clic (protocolo file://)
const FALLBACK_DATA = {
    historias: [
        {
            id: "local-kilimanjaro",
            etiqueta: "Nuevo Local",
            icono: "🏠",
            claseAnillo: "ring-active",
            puntoActivo: true,
            titulo: "🏠 Nuevo Local en C/ Kilimanjaro 4",
            resumen: "¡Por fin nos ha sido adjudicado el local para la asociación en la calle Kilimanjaro 4! Muy pronto comunicaremos los horarios de apertura para actividades y reuniones vecinales."
        },
        {
            id: "jalonween",
            etiqueta: "Jalonween",
            icono: "🎃",
            claseAnillo: "ring-warm",
            puntoActivo: true,
            titulo: "🎃 JALONWEEN · Escape Room 'El Ritual'",
            resumen: "Escape Room 'El Ritual' de 16:00 a 22:00h en el local de la asociación (C/ Kilimanjaro 4 · Socios 2€ / No socios 4€) y Baile de disfraces desde las 19:00h en el parque con DJ @danigarciia18."
        },
        {
            id: "jalonrun",
            etiqueta: "JalonRun",
            icono: "🏃",
            claseAnillo: "ring-warm",
            puntoActivo: false,
            titulo: "🏃 Tradicional JalonRun Navideña",
            resumen: "Carrera popular navideña de Pinar de Jalón con salida en la Plaza Everest / Calle Aneto. Recogida de bolsa del corredor y dorsales desde las 10:00 h."
        },
        {
            id: "luce-jalon",
            etiqueta: "Luce Jalón",
            icono: "✨",
            claseAnillo: "ring-active",
            puntoActivo: false,
            titulo: "✨ Concurso Navideño 'Luce Jalón'",
            resumen: "Concurso de decoración e iluminación navideña de balcones y fachadas del barrio valorando estética, diseño y creatividad. Inscripciones: navidadpinardejalon@gmail.com"
        },
        {
            id: "repinar",
            etiqueta: "RePinar",
            icono: "🌲",
            claseAnillo: "ring-active",
            puntoActivo: false,
            titulo: "🌲 Proyecto de Renaturalización RePinar",
            resumen: "Propuesta de anillo verde alrededor del barrio, acondicionamiento deportivo y natural de la parcela de C/ Aneto, parque canino y refugio de fauna en el Canal del Duero."
        },
        {
            id: "auvasa-bus",
            etiqueta: "AUVASA y Bus",
            icono: "🚌",
            claseAnillo: "ring-active",
            puntoActivo: false,
            titulo: "🚌 Línea 4, Búho y Transporte Escolar",
            resumen: "Reuniones con AUVASA para mejorar frecuencias de la Línea 4 y ampliar el Búho (00:00, 01:00 y 02:00h), además del grupo de trabajo por el transporte escolar a los IES Condesa Eylo y Pinar de la Rubia."
        },
        {
            id: "farmacia-sacyl",
            etiqueta: "Farmacia",
            icono: "💊",
            claseAnillo: "",
            puntoActivo: false,
            titulo: "💊 Instalación de Farmacia en el Barrio",
            resumen: "Solicitud a la Junta de Castilla y León, apoyo de Procuradores en las Cortes y reuniones con empresarios tras la actualización de criterios de Sacyl para abrir farmacias."
        }
    ],
    eventos: [
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
        }
    ],
    noticias: [
        {
            id: "opinion-v-fiestas-barrio",
            titulo: "¿Qué tal las fiestas del barrio? ¡Tu opinión cuenta!",
            fecha: "01/10/2026",
            tiempoRelativo: "1 de octubre",
            ubicacion: "Plaza Everest · Pinar de Jalón",
            autor: "AAVV Pinar de Jalón",
            resumen: "Ya hemos dejado atrás la quinta edición de las fiestas del barrio, y queremos conocer tu opinión sobre las actividades y el ambiente general que hemos vivido el pasado fin de semana. Vuestras valoraciones son importantes para nosotros, pues nos ayudan a valorar dónde hemos acertado y dónde no, y cómo mejorar de cara al próximo año.",
            etiquetas: ["Cultura", "Fiestas", "Participacion"],
            likes: 94,
            enlaceUrl: "noticias.html#opinion-v-fiestas-barrio"
        },
        {
            id: "nuevo-local-asociacion-kilimanjaro",
            titulo: "Nuevo local de la asociación en la calle Kilimanjaro 4",
            fecha: "09/09/2026",
            tiempoRelativo: "9 de septiembre",
            ubicacion: "Calle Kilimanjaro, 4",
            autor: "AAVV Pinar de Jalón",
            resumen: "¡Hola, vecinos! Nos alegra comunicar que por fin nos ha sido adjudicado el local para la asociación, localizado en la calle Kilimanjaro 4. Cuando esté todo preparado, iremos comunicando los horarios de apertura y empezaremos a organizar actividades y eventos en el local. ¡Os esperamos a todos!",
            etiquetas: ["Asamblea", "Comunidad", "LocalVecinal"],
            likes: 132,
            enlaceUrl: "noticias.html#nuevo-local-asociacion-kilimanjaro"
        },
        {
            id: "transporte-escolar-condesa-eylo-pinar-rubia",
            titulo: "Transporte escolar a los institutos Condesa Eylo y Pinar de la Rubia",
            fecha: "02/06/2026",
            tiempoRelativo: "2 de junio",
            ubicacion: "Pinar de Jalón · Institutos",
            autor: "AAVV Pinar de Jalón",
            resumen: "En los últimos días estamos recabando información acerca de la no ampliación del transporte escolar a los institutos Condesa Eylo y Pinar de la Rubia. En colaboración con familias afectadas, se ha creado un grupo de trabajo junto a representantes de AMPAs de los distintos centros y la Federación de AMPAs para resolver el problema.",
            etiquetas: ["Movilidad", "TransporteEscolar", "Educacion"],
            likes: 86,
            enlaceUrl: "noticias.html#transporte-escolar-condesa-eylo-pinar-rubia"
        }
    ],
    galeria: [
        {
            id: 1,
            tipo: "imagen",
            url: "img/inicio.avif",
            miniatura: "img/inicio.avif",
            miniaturaFallback: "https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=800&q=80",
            titulo: "Amanecer con globos sobre Pinar de Jalón",
            fecha: "18/10/2026",
            likes: 142,
            categoria: "Naturaleza",
            pie: "Vista matinal de los globos aerostáticos sobrevolando los edificios y zonas verdes de nuestro barrio 🎈🌲"
        },
        {
            id: 2,
            tipo: "video",
            url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            miniatura: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
            miniaturaFallback: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
            titulo: "Resumen de las V Fiestas de Pinar de Jalón",
            fecha: "27/09/2026",
            likes: 198,
            categoria: "Fiestas",
            pie: "Tres días inolvidables de convivencia, peñas y actividades familiares en la Plaza Everest 🎉🤝"
        },
        {
            id: 3,
            tipo: "imagen",
            url: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=80",
            miniatura: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=700&q=80",
            miniaturaFallback: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=700&q=80",
            titulo: "JalonRun: Salida popular en Plaza Everest",
            fecha: "28/12/2025",
            likes: 165,
            categoria: "Deportes",
            pie: "Ambiente deportivo en la salida de la tradicional carrera navideña JalonRun 🏃‍♂️🌲"
        },
        {
            id: 4,
            tipo: "video",
            url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            miniatura: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
            miniaturaFallback: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80",
            titulo: "Ruta por el Canal del Duero y el Pinar",
            fecha: "14/06/2026",
            likes: 114,
            categoria: "Naturaleza",
            pie: "Recorrido en vídeo por los senderos naturales del pinar y el Canal del Duero 🌿🦆"
        },
        {
            id: 5,
            tipo: "imagen",
            url: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=1200&q=80",
            miniatura: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=700&q=80",
            miniaturaFallback: "https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=700&q=80",
            titulo: "Luce Jalón: Balcones y fachadas iluminadas",
            fecha: "22/12/2025",
            likes: 153,
            categoria: "Comunidad",
            pie: "Participantes y entrega de premios del concurso de decoración navideña Luce Jalón ✨🎄"
        },
        {
            id: 6,
            tipo: "video",
            url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            miniatura: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
            miniaturaFallback: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
            titulo: "Carnaval Vecinal en la Plaza Everest",
            fecha: "16/02/2026",
            likes: 127,
            categoria: "Fiestas",
            pie: "Vídeo resumen del desfile de disfraces y animación en la Plaza Everest 🎭🎶"
        }
    ]
};

/**
 * Escapa caracteres HTML para prevenir problemas al inyectar atributos o textos
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
 * Función auxiliar para obtener datos JSON con soporte tanto para Array directo como para { items: [...] } (Decap CMS)
 */
async function fetchCollection(url, fallbackKey) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const json = await response.json();
        return Array.isArray(json) ? json : (json.items || []);
    } catch (err) {
        console.warn(`Usando datos locales de respaldo para ${url}:`, err.message);
        return FALLBACK_DATA[fallbackKey] || [];
    }
}

/**
 * 1. Renderizado dinámico de la barra de "Stories" (#stories-container)
 */
async function loadStories() {
    const container = document.getElementById("stories-container");
    if (!container) return;

    const historias = await fetchCollection("data/historias.json", "historias");

    container.innerHTML = historias.map(story => {
        const ringClass = story.claseAnillo ? `story-ring ${escapeHtml(story.claseAnillo)}` : "story-ring";
        const dotHtml = story.puntoActivo ? `<span class="story-status-dot"></span>` : "";

        return `
            <button type="button"
                    class="story-item"
                    data-story-title="${escapeHtml(story.titulo)}"
                    data-story-text="${escapeHtml(story.resumen)}">
                <span class="${ringClass}">
                    <span class="story-avatar">${escapeHtml(story.icono)}</span>
                    ${dotHtml}
                </span>
                <span class="story-label">${escapeHtml(story.etiqueta)}</span>
            </button>
        `;
    }).join("");
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
 * Determina si un evento ya ha pasado comparando su fecha con hoy (o usando el booleano esPasado)
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
 * 2º Los ya celebrados (en orden cronológico inverso: del más reciente al más antiguo)
 */
function sortEventsChronologically(events = []) {
    return [...events].sort((a, b) => {
        const aPast = isEventPast(a);
        const bPast = isEventPast(b);

        if (aPast !== bPast) {
            return aPast ? 1 : -1;
        }

        const aTime = parseEventDateDMY(a.fecha);
        const bTime = parseEventDateDMY(b.fecha);

        // Si ambos son futuros: primero el más próximo a ocurrir (ascendente)
        if (!aPast) {
            return aTime - bTime;
        }
        // Si ambos ya han pasado: del más reciente al más antiguo (descendente)
        return bTime - aTime;
    });
}

/**
 * 2. Renderizado dinámico de la Agenda de Eventos (#events-container)
 */
async function loadEvents() {
    const container = document.getElementById("events-container");
    if (!container) return;

    const todosLosEventos = await fetchCollection("data/eventos.json", "eventos");
    // Ordenamos: primero los próximos más cercanos, y después los pasados cronológicamente
    const eventosOrdenados = sortEventsChronologically(todosLosEventos);
    const eventos = eventosOrdenados.slice(0, 3);

    let firstUpcomingHighlighted = false;

    container.innerHTML = eventos.map((ev) => {
        const past = isEventPast(ev);
        const isNextHighlight = !past && !firstUpcomingHighlighted;
        if (isNextHighlight) firstUpcomingHighlighted = true;

        const cardClass = past ? "social-event-card is-past-event" : "social-event-card";
        const badgeClass = past
            ? "countdown-badge badge-past"
            : (isNextHighlight ? "countdown-badge badge-urgent" : "countdown-badge");
        const badgeText = past ? "✓ Celebrado" : (ev.cuentaAtras || "Próxima cita");

        const fallbackImg = ev.imagenFallback || "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=900&q=80";
        const textoDesc = ev.descripcion || ev.resumen || "";
        const calendarLink = ev.enlaceCalendar || ev.calendarUrl || "eventos.html";
        const waText = ev.textoWhatsApp || ev.whatsappTexto || ev.titulo;
        const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(waText)}`;

        const footerActionsHtml = !past
            ? `
                <div class="event-actions-row">
                    <a href="${escapeHtml(calendarLink)}"
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
                    <a href="galeria.html" class="past-photos-link">Ver fotos y vídeos &rarr;</a>
                </div>
            `;

        return `
            <article class="${cardClass}">
                <div class="event-image-wrap">
                    <img src="${escapeHtml(ev.imagen)}"
                         onerror="this.onerror=null;this.src='${escapeHtml(fallbackImg)}';"
                         alt="${escapeHtml(ev.alt || ev.titulo)}"
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
                    </div>
                    <h3 class="event-card-title">${escapeHtml(ev.titulo)}</h3>
                    <p class="event-card-desc">${escapeHtml(textoDesc)}</p>
                    ${footerActionsHtml}
                </div>
            </article>
        `;
    }).join("");
}

/**
 * 3. Renderizado dinámico del Muro Comunitario (#feed-container)
 */
async function loadFeed() {
    const container = document.getElementById("feed-container");
    if (!container) return;

    const todasLasNoticias = await fetchCollection("data/noticias.json", "noticias");
    // En portada mostramos las 3 noticias más recientes
    const noticias = todasLasNoticias.slice(0, 3);

    container.innerHTML = noticias.map(post => {
        const etiquetas = Array.isArray(post.etiquetas) ? post.etiquetas : [];
        const categoriaPrincipal = post.categoriaFiltro || etiquetas[0] || "Comunidad";
        const allTagsString = [categoriaPrincipal, ...etiquetas].join(" ");
        const metaTime = [post.tiempoRelativo, post.ubicacion].filter(Boolean).join(" · ");
        const textoResumen = post.resumen || post.texto || "";
        const urlDestino = post.enlaceUrl || post.enlace || `noticias.html#${post.id}`;

        const tagsHtml = etiquetas.map(tag => `
            <button type="button" class="hashtag" data-tag="${escapeHtml(categoriaPrincipal)}">#${escapeHtml(tag)}</button>
        `).join("");

        return `
            <article class="social-post-card" data-tags="${escapeHtml(allTagsString)}">
                <header class="post-header">
                    <img src="img/logo.png"
                         onerror="this.onerror=null;this.src='img/logo.avif';"
                         alt="Avatar ${escapeHtml(post.autor)}"
                         class="post-avatar">
                    <div class="post-author-info">
                        <span class="post-author-name">
                            ${escapeHtml(post.autor || "AAVV Pinar de Jalón")}
                            <span class="verified-check" title="Asociación Vecinal Oficial">✓</span>
                        </span>
                        <span class="post-time">${escapeHtml(metaTime)}</span>
                    </div>
                </header>

                <div class="post-body">
                    <h3 class="post-headline">${escapeHtml(post.titulo)}</h3>
                    <p class="post-text">${escapeHtml(textoResumen)}</p>
                    <div class="post-tags">
                        ${tagsHtml}
                    </div>
                </div>

                <footer class="post-footer">
                    <button type="button" class="like-btn" aria-label="Me gusta esta publicación">
                        <span class="heart-icon">♥</span>
                        <span class="like-count">${Number(post.likes) || 0}</span>
                    </button>
                    <a href="${escapeHtml(urlDestino)}" class="post-read-more">Ver comunicado completo &rarr;</a>
                </footer>
            </article>
        `;
    }).join("");
}

/**
 * 3.5. Renderizado dinámico del Mosaico Multimedia de Portada (#home-gallery-container)
 */
async function loadHomeGallery() {
    const container = document.getElementById("home-gallery-container");
    if (!container) return;

    const todosLosItems = await fetchCollection("data/galeria.json", "galeria");
    // En portada mostramos las 6 publicaciones más recientes
    const recientes = todosLosItems.slice(0, 6);

    container.innerHTML = recientes.map(item => {
        const isVideo = item.tipo === "video";
        const fallbackImg = item.miniaturaFallback || "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=700&q=80";
        const videoIndicatorsHtml = isVideo
            ? `
            <span class="play-badge" aria-label="Vídeo">▶ Vídeo</span>
            <span class="video-indicator" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <polygon points="8 5 19 12 8 19 8 5"></polygon>
                </svg>
            </span>
            `
            : "";

        return `
            <a href="galeria.html#media-${escapeHtml(item.id)}" class="insta-tile" aria-label="Ver ${escapeHtml(item.titulo)} en la galería">
                <img src="${escapeHtml(item.miniatura || item.url)}"
                     onerror="this.onerror=null;this.src='${escapeHtml(fallbackImg)}';"
                     alt="${escapeHtml(item.titulo)}"
                     loading="lazy">
                ${videoIndicatorsHtml}
                <div class="insta-overlay">
                    <span class="insta-likes">♥ ${Number(item.likes) || 0}</span>
                    <p>${escapeHtml(item.titulo)}</p>
                </div>
            </a>
        `;
    }).join("");
}

/**
 * 4. Filtrado de publicaciones por etiqueta en el Muro Comunitario
 */
function filterPosts(tag) {
    const filterBtns = document.querySelectorAll(".tag-filter");
    const posts = document.querySelectorAll("#feed-container .social-post-card");

    filterBtns.forEach(btn => {
        btn.classList.toggle("active", btn.dataset.filter === tag);
    });

    posts.forEach(post => {
        const postTags = post.dataset.tags || "";
        const match = tag === "all" || postTags.includes(tag);
        post.style.display = match ? "flex" : "none";
    });
}

/**
 * 5. Inicialización de eventos e interacciones (Delegación de eventos)
 */
function initInteractions() {
    // Menú móvil desplegable
    const menuBtn = document.querySelector(".mobile-menu-toggle");
    const mainNav = document.querySelector(".main-nav");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuBtn && mainNav) {
        menuBtn.addEventListener("click", () => {
            const open = mainNav.classList.toggle("is-open");
            menuBtn.setAttribute("aria-expanded", String(open));
        });

        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                mainNav.classList.remove("is-open");
                menuBtn.setAttribute("aria-expanded", "false");
            });
        });
    }

    // Delegación para abrir el modal de "Stories" (#stories-container)
    const storiesContainer = document.getElementById("stories-container");
    const storyModal = document.getElementById("story-modal");
    const storyTitle = document.getElementById("story-modal-title");
    const storyText = document.getElementById("story-modal-text");
    const storyClose = document.querySelector(".story-close-btn");
    const storyCta = document.querySelector(".story-modal-cta");

    if (storiesContainer && storyModal) {
        storiesContainer.addEventListener("click", (e) => {
            const storyItem = e.target.closest(".story-item");
            if (!storyItem) return;

            storyTitle.textContent = storyItem.getAttribute("data-story-title") || "";
            storyText.textContent = storyItem.getAttribute("data-story-text") || "";
            storyModal.classList.add("is-open");
            storyModal.setAttribute("aria-hidden", "false");
        });

        [storyClose, storyCta, storyModal].forEach(el => {
            if (!el) return;
            el.addEventListener("click", (e) => {
                if (e.target === storyModal || e.target === storyClose || e.target === storyCta) {
                    storyModal.classList.remove("is-open");
                    storyModal.setAttribute("aria-hidden", "true");
                }
            });
        });
    }

    // Delegación en el Muro Comunitario (#feed-container): Likes y Hashtags
    const feedContainer = document.getElementById("feed-container");
    if (feedContainer) {
        feedContainer.addEventListener("click", (e) => {
            // Toggle botón de Me gusta
            const likeBtn = e.target.closest(".like-btn");
            if (likeBtn) {
                const countEl = likeBtn.querySelector(".like-count");
                const count = parseInt(countEl.textContent, 10) || 0;
                const liked = likeBtn.classList.toggle("is-liked");
                countEl.textContent = liked ? count + 1 : count - 1;
                return;
            }

            // Clic en hashtag dentro de una tarjeta
            const hashtagBtn = e.target.closest(".hashtag");
            if (hashtagBtn && hashtagBtn.dataset.tag) {
                filterPosts(hashtagBtn.dataset.tag);
            }
        });
    }

    // Botones superiores de filtro del Muro Comunitario
    document.querySelectorAll(".tag-filter").forEach(btn => {
        btn.addEventListener("click", () => filterPosts(btn.dataset.filter));
    });

    // Envío del formulario del Buzón Vecinal
    const buzonForm = document.getElementById("buzon-form");
    const feedback = document.getElementById("form-feedback");
    if (buzonForm && feedback) {
        buzonForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const nombreInput = document.getElementById("vecino-nombre");
            const nombre = nombreInput ? nombreInput.value : "vecino/a";
            feedback.textContent = `¡Gracias, ${nombre}! Tu mensaje ha sido registrado en el Buzón de la Asociación.`;
            buzonForm.reset();
        });
    }
}

// Inicialización al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    initInteractions();
    Promise.all([
        loadStories(),
        loadEvents(),
        loadFeed(),
        loadHomeGallery()
    ]);
});


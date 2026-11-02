/**
 * AAVV Pinar de Jalón (Valladolid)
 * Controlador del Archivo Histórico de Noticias (noticias.html)
 * Incluye: Fetch JSON, búsqueda instantánea, filtro por etiquetas, paginación de 6 en 6, likes y lightbox
 */

const ITEMS_PER_BATCH = 6;

// Respaldo automático por si se abre noticias.html directamente vía file://
const FALLBACK_NOTICIAS = [
    {
        id: "opinion-v-fiestas-barrio",
        titulo: "¿Qué tal las fiestas del barrio? ¡Tu opinión cuenta!",
        fecha: "01/10/2026",
        tiempoRelativo: "1 de octubre",
        ubicacion: "Plaza Everest · Pinar de Jalón",
        autor: "AAVV Pinar de Jalón",
        imagen: "img/inicio.avif",
        resumen: "Ya hemos dejado atrás la quinta edición de las fiestas del barrio, y queremos conocer tu opinión sobre las actividades y el ambiente general que hemos vivido el pasado fin de semana. Vuestras valoraciones son importantes para nosotros, pues nos ayudan a valorar dónde hemos acertado y dónde no, y cómo mejorar de cara al próximo año. Queremos agradecer a todos los involucrados en las fiestas y actividades su trabajo y aportación, sin ellos esto no sería posible.",
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
        imagen: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=80",
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
        imagen: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80",
        resumen: "En los últimos días estamos recabando información acerca de la no ampliación del transporte escolar a los institutos Condesa Eylo y Pinar de la Rubia. En colaboración con familias afectadas, se ha creado un grupo de trabajo junto a representantes de AMPAs de los distintos centros y la Federación de AMPAs, que junto con esta asociación vecinal, están buscando las vías más adecuadas para resolver el problema. Recordamos además que el CEIP El Peral dispone de autobús desde la calle Almanzor, frente al parque.",
        etiquetas: ["Movilidad", "TransporteEscolar", "Educacion"],
        likes: 86,
        enlaceUrl: "noticias.html#transporte-escolar-condesa-eylo-pinar-rubia"
    },
    {
        id: "jalonween-escape-room-baile-disfraces",
        titulo: "Jalonween: Escape Room 'El Ritual' en el local vecinal y Baile de Disfraces",
        fecha: "31/10/2026",
        tiempoRelativo: "Octubre 2026",
        ubicacion: "C/ Kilimanjaro 4 y Parque",
        autor: "AAVV Pinar de Jalón",
        imagen: "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?auto=format&fit=crop&w=900&q=80",
        resumen: "Celebramos Jalonween en Pinar de Jalón con el Escape Room 'El Ritual' (de 16:00 a 22:00 h en el nuevo local de la asociación en calle Kilimanjaro 4, en pases de 20 minutos para grupos de 6 personas) y baile de disfraces en el parque desde las 19:00 h con el DJ @danigarciia18.",
        etiquetas: ["Cultura", "Jalonween", "Actividades"],
        likes: 78,
        enlaceUrl: "noticias.html#jalonween-escape-room-baile-disfraces"
    },
    {
        id: "jalonwarts-fiesta-parque-pinar",
        titulo: "Jalonwarts en el Parque Pinar de Jalón con DJ y sorteos",
        fecha: "30/05/2026",
        tiempoRelativo: "30 de mayo",
        ubicacion: "Parque Pinar de Jalón",
        autor: "AAVV Pinar de Jalón",
        imagen: "",
        resumen: "Jornada mágica vecinal en el Parque Pinar de Jalón desde las 18:00 h amenizada por DJ Frankiu, con actividades familiares, sorteos y premios gracias a la colaboración de los establecimientos patrocinadores del barrio.",
        etiquetas: ["Cultura", "Jalonwarts", "Comunidad"],
        likes: 69,
        enlaceUrl: "noticias.html#jalonwarts-fiesta-parque-pinar"
    },
    {
        id: "asamblea-anual-socios-luelmo",
        titulo: "Convocatoria de Asamblea Anual de Socios en el Centro Cívico José Mª Luelmo",
        fecha: "21/03/2026",
        tiempoRelativo: "21 de marzo",
        ubicacion: "C.C. José Mª Luelmo",
        autor: "AAVV Pinar de Jalón",
        imagen: "",
        resumen: "La Asamblea General es el órgano supremo de gobierno de la asociación para evaluar la gestión anual, aprobar las cuentas, elegir la junta directiva y decidir las líneas de actuación prioritarias para los casi 3.000 vecinos empadronados en Pinar de Jalón.",
        etiquetas: ["Asamblea", "Participacion", "JuntaDirectiva"],
        likes: 54,
        enlaceUrl: "noticias.html#asamblea-anual-socios-luelmo"
    },
    {
        id: "concejo-abierto-exclusivo-pinar-jalon",
        titulo: "Primer Concejo Abierto exclusivo para el barrio de Pinar de Jalón",
        fecha: "27/10/2025",
        tiempoRelativo: "27 de octubre",
        ubicacion: "Teatro C.C. Delicias",
        autor: "AAVV Pinar de Jalón",
        imagen: "",
        resumen: "El Ayuntamiento de Valladolid nos invita a participar en el primer Concejo abierto exclusivo para nuestro barrio, Pinar de Jalón. En este espacio, tanto el alcalde como los concejales escucharán nuestras demandas, quejas y comentarios sobre los proyectos en marcha —Plaza Everest, parcela anexa a calle Aneto— y las zonas pendientes de actuación.",
        etiquetas: ["Asamblea", "ConcejoAbierto", "Participacion"],
        likes: 112,
        enlaceUrl: "noticias.html#concejo-abierto-exclusivo-pinar-jalon"
    },
    {
        id: "sacyl-criterios-apertura-farmacia-barrio",
        titulo: "Sacyl redefine los criterios para abrir farmacias: gestiones para Pinar de Jalón",
        fecha: "15/10/2025",
        tiempoRelativo: "Octubre 2025",
        ubicacion: "Sanidad · Pinar de Jalón",
        autor: "AAVV Pinar de Jalón",
        imagen: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=900&q=80",
        resumen: "Dentro de los desafíos actuales del barrio, mantenemos activa la solicitud a la Junta de Castilla y León, la petición de apoyo a los Procuradores de las Cortes y las reuniones con empresarios para facilitar la instalación de una oficina de farmacia en Pinar de Jalón tras la revisión de baremos de Sacyl.",
        etiquetas: ["Sanidad", "Farmacia", "Sacyl"],
        likes: 125,
        enlaceUrl: "noticias.html#sacyl-criterios-apertura-farmacia-barrio"
    },
    {
        id: "iv-fiestas-pinar-jalon-arroz-zamorana",
        titulo: "IV Fiestas de Pinar de Jalón: Pregón, peñas y comida popular en Plaza Everest",
        fecha: "26/09/2025",
        tiempoRelativo: "Septiembre 2025",
        ubicacion: "Plaza Everest y C/ Kilimanjaro",
        autor: "AAVV Pinar de Jalón",
        imagen: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=900&q=80",
        resumen: "Celebración de las IV Fiestas de Pinar de Jalón del 26 al 28 de septiembre con el pregón a cargo de David García López (rector de la UEMC), desfile de peñas y electrocharanga por la calle Kilimanjaro, juegos infantiles, bingo musical y reparto de arroz a la zamorana en los soportales de la Plaza Everest.",
        etiquetas: ["Cultura", "Fiestas", "PlazaEverest"],
        likes: 148,
        enlaceUrl: "noticias.html#iv-fiestas-pinar-jalon-arroz-zamorana"
    },
    {
        id: "proyecto-repinar-renaturalizacion-aneto-va30",
        titulo: "Proyecto RePinar, barreras acústicas en la VA-30 y mejora de Línea 4 y Búho de AUVASA",
        fecha: "12/05/2025",
        tiempoRelativo: "Mayo 2025",
        ubicacion: "C/ Aneto · VA-30 · Canal del Duero",
        autor: "AAVV Pinar de Jalón",
        imagen: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&q=80",
        resumen: "Impulsamos el proyecto de renaturalización integral RePinar (anillo verde, parcela deportiva en C/ Aneto, parque canino y refugio de fauna en el Canal del Duero), junto a la reclamación de paneles de insonorización en la autovía VA-30, limpieza de la escombrera en Finca La Florida y ampliación de frecuencias de la Línea 4 y del autobús Búho de AUVASA.",
        etiquetas: ["PinarLimpio", "Movilidad", "AUVASA", "VA30"],
        likes: 119,
        enlaceUrl: "noticias.html#proyecto-repinar-renaturalizacion-aneto-va30"
    }
];

let allNews = [];
let filteredNews = [];
let renderedCount = 0;
let activeTag = "all";
let searchQuery = "";
const likedPosts = new Set();

/**
 * Escapa texto para inyección segura en HTML
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
 * Normaliza texto eliminando tildes y pasando a minúsculas para búsquedas insensibles a acentos
 */
function normalizeText(str = "") {
    return String(str)
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
}

/**
 * Genera el HTML de una tarjeta de noticia manteniendo la estética Social Post
 */
function createNewsCardHtml(post) {
    const etiquetas = Array.isArray(post.etiquetas) ? post.etiquetas : [];
    const resumenTexto = post.resumen || post.texto || "";
    const metaSub = [post.tiempoRelativo, post.ubicacion].filter(Boolean).join(" · ");
    const isLiked = likedPosts.has(post.id);
    const currentLikes = (Number(post.likes) || 0) + (isLiked ? 1 : 0);

    const imageBlock = post.imagen
        ? `
        <button type="button"
                class="post-media-btn"
                data-full-img="${escapeHtml(post.imagen)}"
                data-caption="${escapeHtml(post.titulo)}"
                aria-label="Ampliar imagen de ${escapeHtml(post.titulo)}">
            <img src="${escapeHtml(post.imagen)}"
                 alt="${escapeHtml(post.titulo)}"
                 loading="lazy"
                 onerror="this.closest('.post-media-btn').style.display='none';">
            <span class="post-media-zoom-hint">🔍 Ampliar foto</span>
        </button>
        `
        : "";

    const tagsHtml = etiquetas.map(tag => `
        <button type="button" class="hashtag" data-tag="${escapeHtml(tag)}">#${escapeHtml(tag)}</button>
    `).join("");

    return `
        <article class="social-post-card archive-post-card" id="${escapeHtml(post.id)}" data-post-id="${escapeHtml(post.id)}">
            <div>
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
                        <span class="post-time">${escapeHtml(metaSub)}</span>
                    </div>
                    ${post.fecha ? `<span class="post-exact-date">${escapeHtml(post.fecha)}</span>` : ""}
                </header>

                ${imageBlock}

                <div class="post-body">
                    <h2 class="post-headline">${escapeHtml(post.titulo)}</h2>
                    <p class="post-text">${escapeHtml(resumenTexto)}</p>
                    <div class="post-tags">
                        ${tagsHtml}
                    </div>
                </div>
            </div>

            <footer class="post-footer">
                <button type="button" class="like-btn ${isLiked ? "is-liked" : ""}" aria-label="Me gusta esta publicación">
                    <span class="heart-icon">♥</span>
                    <span class="like-count">${currentLikes}</span>
                </button>
                <a href="index.html#participa" class="post-read-more">Comentar en Buzón &rarr;</a>
            </footer>
        </article>
    `;
}

/**
 * Filtra el array global según búsqueda de texto y etiqueta seleccionada
 */
function applyFiltersAndReset() {
    const normQuery = normalizeText(searchQuery.trim());
    const normTag = normalizeText(activeTag);

    filteredNews = allNews.filter(post => {
        const etiquetas = Array.isArray(post.etiquetas) ? post.etiquetas : [];

        // 1. Filtro por etiqueta
        const matchesTag =
            activeTag === "all" ||
            etiquetas.some(t => normalizeText(t) === normTag);

        if (!matchesTag) return false;

        // 2. Filtro por búsqueda en tiempo real
        if (!normQuery) return true;

        const searchableContent = normalizeText(
            `${post.titulo || ""} ${post.resumen || post.texto || ""} ${post.fecha || ""} ${post.ubicacion || ""} ${etiquetas.join(" ")}`
        );

        return searchableContent.includes(normQuery);
    });

    // Reiniciar contenedor y paginación
    const container = document.getElementById("archive-news-container");
    if (container) container.innerHTML = "";
    renderedCount = 0;

    renderNextBatch();
    updateResetButtonVisibility();
}

/**
 * Renderiza el siguiente lote de 6 noticias sin recargar la página
 */
function renderNextBatch() {
    const container = document.getElementById("archive-news-container");
    const counterEl = document.getElementById("archive-results-count");
    const loadMoreBtn = document.getElementById("load-more-btn");

    if (!container) return;

    if (filteredNews.length === 0) {
        container.innerHTML = `
            <div class="empty-archive-state">
                <span class="empty-icon">🔍</span>
                <h3>No hemos encontrado publicaciones con esos criterios</h3>
                <p>Prueba con otra palabra clave o pulsa en "Todas" para ver el archivo completo.</p>
            </div>
        `;
        if (counterEl) counterEl.textContent = "Mostrando 0 de 0 publicaciones";
        if (loadMoreBtn) loadMoreBtn.hidden = true;
        return;
    }

    const nextSlice = filteredNews.slice(renderedCount, renderedCount + ITEMS_PER_BATCH);
    const htmlBatch = nextSlice.map(createNewsCardHtml).join("");

    container.insertAdjacentHTML("beforeend", htmlBatch);
    renderedCount += nextSlice.length;

    // Actualizar texto contador
    if (counterEl) {
        counterEl.textContent = `Mostrando ${renderedCount} de ${filteredNews.length} publicaciones`;
    }

    // Mostrar u ocultar botón "Cargar más noticias históricas ↓"
    if (loadMoreBtn) {
        loadMoreBtn.hidden = renderedCount >= filteredNews.length;
    }
}

/**
 * Muestra u oculta el botón de limpiar filtros
 */
function updateResetButtonVisibility() {
    const resetBtn = document.getElementById("reset-filters-btn");
    if (!resetBtn) return;
    resetBtn.hidden = activeTag === "all" && searchQuery.trim() === "";
}

/**
 * Activa visualmente el botón de etiqueta seleccionado
 */
function setActiveTagUI(tag) {
    activeTag = tag;
    const filterBtns = document.querySelectorAll(".tag-filter");
    let matchedButton = false;

    filterBtns.forEach(btn => {
        const isMatch = normalizeText(btn.dataset.filter) === normalizeText(tag);
        btn.classList.toggle("active", isMatch);
        if (isMatch) matchedButton = true;
    });

    // Si el usuario pulsó un hashtag secundario que no está en la barra superior, desmarcamos "Todas"
    if (!matchedButton && tag !== "all") {
        filterBtns.forEach(btn => btn.classList.remove("active"));
    }
}

/**
 * Carga inicial de data/noticias.json
 */
async function initArchive() {
    try {
        const res = await fetch("data/noticias.json");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        allNews = Array.isArray(data) ? data : (data.items || []);
    } catch (err) {
        console.warn("Usando archivo histórico local de respaldo:", err.message);
        allNews = FALLBACK_NOTICIAS;
    }

    applyFiltersAndReset();

    // Si la URL incluye un hash (#id-noticia), desplazar suavemente a la tarjeta
    if (window.location.hash) {
        const targetId = window.location.hash.slice(1);
        const targetIndex = filteredNews.findIndex(n => n.id === targetId);
        while (targetIndex >= renderedCount && renderedCount < filteredNews.length) {
            renderNextBatch();
        }
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
            setTimeout(() => {
                targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
                targetEl.classList.add("is-highlighted");
            }, 150);
        }
    }
}

/**
 * Eventos de interfaz (búsqueda, filtros, paginación, likes, lightbox y menú móvil)
 */
function bindArchiveEvents() {
    // 1. Menú móvil responsive
    const menuBtn = document.querySelector(".mobile-menu-toggle");
    const mainNav = document.querySelector(".main-nav");
    if (menuBtn && mainNav) {
        menuBtn.addEventListener("click", () => {
            const isOpen = mainNav.classList.toggle("is-open");
            menuBtn.setAttribute("aria-expanded", String(isOpen));
        });
    }

    // 2. Búsqueda instantánea en tiempo real
    const searchInput = document.getElementById("news-search-input");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            searchQuery = e.target.value;
            applyFiltersAndReset();
        });
    }

    // 3. Píldoras de filtro por categoría
    document.querySelectorAll(".tag-filter").forEach(btn => {
        btn.addEventListener("click", () => {
            setActiveTagUI(btn.dataset.filter || "all");
            applyFiltersAndReset();
        });
    });

    // 4. Botón limpiar filtros
    const resetBtn = document.getElementById("reset-filters-btn");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            if (searchInput) searchInput.value = "";
            searchQuery = "";
            setActiveTagUI("all");
            applyFiltersAndReset();
        });
    }

    // 5. Botón Cargar más noticias históricas
    const loadMoreBtn = document.getElementById("load-more-btn");
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", () => {
            renderNextBatch();
        });
    }

    // 6. Delegación en el contenedor de noticias: Likes, Hashtags y Lightbox de imagen
    const container = document.getElementById("archive-news-container");
    const lightbox = document.getElementById("image-lightbox-modal");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");

    if (container) {
        container.addEventListener("click", (e) => {
            // A) Botón de Like
            const likeBtn = e.target.closest(".like-btn");
            if (likeBtn) {
                const card = likeBtn.closest("[data-post-id]");
                const postId = card ? card.dataset.postId : "";
                const countEl = likeBtn.querySelector(".like-count");
                const count = parseInt(countEl.textContent, 10) || 0;
                const liked = likeBtn.classList.toggle("is-liked");

                countEl.textContent = liked ? count + 1 : count - 1;
                if (postId) {
                    if (liked) likedPosts.add(postId);
                    else likedPosts.delete(postId);
                }
                return;
            }

            // B) Hashtag dentro de tarjeta
            const hashtagBtn = e.target.closest(".hashtag");
            if (hashtagBtn && hashtagBtn.dataset.tag) {
                setActiveTagUI(hashtagBtn.dataset.tag);
                applyFiltersAndReset();
                return;
            }

            // C) Abrir imagen en Lightbox
            const mediaBtn = e.target.closest(".post-media-btn");
            if (mediaBtn && lightbox && lightboxImg) {
                lightboxImg.src = mediaBtn.dataset.fullImg || "";
                lightboxImg.alt = mediaBtn.dataset.caption || "Imagen de la noticia";
                if (lightboxCaption) lightboxCaption.textContent = mediaBtn.dataset.caption || "";
                lightbox.classList.add("is-open");
                lightbox.setAttribute("aria-hidden", "false");
            }
        });
    }

    // Cerrar Lightbox
    if (lightbox) {
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox || e.target.classList.contains("lightbox-close")) {
                lightbox.classList.remove("is-open");
                lightbox.setAttribute("aria-hidden", "true");
            }
        });
    }
}

document.addEventListener("DOMContentLoaded", () => {
    bindArchiveEvents();
    initArchive();
});


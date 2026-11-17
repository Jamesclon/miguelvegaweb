// Galería multimedia de fotos y vídeos (galeria.html)

const FALLBACK_GALERIA = [
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
        pie: "Vista matinal de los globos aerostáticos sobrevolando los edificios y zonas verdes de nuestro barrio 🎈🌲 #BarrioPinarDeJalón"
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
        pie: "Tres días inolvidables de convivencia, peñas, electrocharanga y actividades familiares en la Plaza Everest y C/ Kilimanjaro 🎉🤝 #FiestasPinarDeJalón"
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
        pie: "Ambiente deportivo en la salida de la tradicional carrera navideña JalonRun por los caminos del pinar 🏃‍♂️🌲 #JalonRun #DeporteVecinal"
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
        pie: "Recorrido en vídeo por los senderos naturales del pinar y las riberas del Canal del Duero dentro del proyecto ambiental RePinar 🌿🦆 #RePinar"
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
        pie: "Participantes y entrega de premios del concurso de decoración navideña Luce Jalón en la Plaza Everest ✨🎄 #LuceJalón"
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
        pie: "Vídeo resumen del desfile de disfraces, música y animación infantil durante el Carnaval de Pinar de Jalón 🎭🎶 #CarnavalPinarDeJalón"
    },
    {
        id: 7,
        tipo: "imagen",
        url: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=1200&q=80",
        miniatura: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=700&q=80",
        miniaturaFallback: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=700&q=80",
        titulo: "Mañana de ciclismo y pumptrack en la zona deportiva",
        fecha: "10/05/2026",
        likes: 92,
        categoria: "Deportes",
        pie: "Jóvenes y familias disfrutando de la pista multideporte, calistenia y pumptrack junto al Canal del Duero 🚲🏀 #DeporteEnElBarrio"
    },
    {
        id: 8,
        tipo: "imagen",
        url: "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?auto=format&fit=crop&w=1200&q=80",
        miniatura: "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?auto=format&fit=crop&w=700&q=80",
        miniaturaFallback: "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?auto=format&fit=crop&w=700&q=80",
        titulo: "Noche de Jalonween y decoración vecinal",
        fecha: "31/10/2025",
        likes: 138,
        categoria: "Fiestas",
        pie: "Ambiente terrorífico y divertido durante la celebración de Jalonween en las comunidades y el parque del barrio 🎃👻 #Jalonween"
    },
    {
        id: 9,
        tipo: "imagen",
        url: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80",
        miniatura: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=700&q=80",
        miniaturaFallback: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=700&q=80",
        titulo: "Atardecer entre los pinos de la calle Aneto",
        fecha: "04/09/2026",
        likes: 131,
        categoria: "Naturaleza",
        pie: "Puesta de sol dorada entre las copas de los pinos piñoneros que rodean Pinar de Jalón 🌅🌲 #NaturalezaValladolid"
    }
];

const state = {
    allItems: [],
    filteredItems: [],
    activeFormat: "all",
    activeCategory: "all",
    currentIndex: -1,
    likedIds: new Set()
};

function parseDateDMY(dateStr) {
    if (!dateStr || typeof dateStr !== "string") return 0;
    const parts = dateStr.split("/");
    if (parts.length !== 3) return 0;
    const [day, month, year] = parts.map(Number);
    return new Date(year, month - 1, day).getTime() || 0;
}

async function fetchGalleryData() {
    try {
        const response = await fetch("data/galeria.json");
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return Array.isArray(data) ? data : (data.items || []);
    } catch (err) {
        console.warn("Usando datos de respaldo para galería multimedia:", err.message);
        return FALLBACK_GALERIA;
    }
}

function applyGalleryFilters() {
    state.filteredItems = state.allItems.filter((item) => {
        const matchesFormat =
            state.activeFormat === "all" ||
            (item.tipo && item.tipo.toLowerCase() === state.activeFormat.toLowerCase());

        const matchesCategory =
            state.activeCategory === "all" ||
            (item.categoria && item.categoria.toLowerCase() === state.activeCategory.toLowerCase());

        return matchesFormat && matchesCategory;
    });

    renderGalleryGrid();
    updateGalleryStatusBar();
}

function updateGalleryStatusBar() {
    const countEl = document.getElementById("gallery-results-count");
    const resetBtn = document.getElementById("reset-gallery-filters-btn");

    if (countEl) {
        const total = state.filteredItems.length;
        const videosCount = state.filteredItems.filter(i => i.tipo === "video").length;
        const photosCount = total - videosCount;

        if (state.activeFormat === "all" && state.activeCategory === "all") {
            countEl.textContent = `Mostrando ${total} elementos multimedia (${photosCount} fotos y ${videosCount} vídeos)`;
        } else {
            countEl.textContent = `${total} ${total === 1 ? "elemento encontrado" : "elementos encontrados"}`;
        }
    }

    if (resetBtn) {
        const hasFilters = state.activeFormat !== "all" || state.activeCategory !== "all";
        resetBtn.hidden = !hasFilters;
    }
}

function renderGalleryGrid() {
    const grid = document.getElementById("archive-gallery-grid");
    if (!grid) return;

    if (state.filteredItems.length === 0) {
        grid.innerHTML = `
            <div class="empty-archive-state">
                <span class="empty-icon" aria-hidden="true">🎞️</span>
                <h3>No hay fotos ni vídeos con estos filtros</h3>
                <p>Prueba a cambiar entre Fotos/Vídeos o selecciona otra categoría temática del barrio.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = state.filteredItems.map((item, idx) => {
        const isVideo = item.tipo === "video";
        const isLiked = state.likedIds.has(item.id);
        const displayLikes = isLiked ? item.likes + 1 : item.likes;
        const thumbSrc = item.miniatura || item.url;
        const fallbackSrc = item.miniaturaFallback || thumbSrc;

        const videoBadgesHTML = isVideo
            ? `
                <span class="play-badge" aria-label="Archivo de vídeo">▶ Vídeo</span>
                <span class="video-indicator" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                </span>
            `
            : `<span class="photo-type-badge" aria-label="Fotografía">📷 Foto</span>`;

        return `
            <article class="gallery-card ${isVideo ? "is-video-card" : "is-photo-card"}"
                     id="media-${item.id}"
                     data-index="${idx}"
                     tabindex="0"
                     role="button"
                     aria-label="Abrir ${isVideo ? "vídeo" : "fotografía"}: ${item.titulo}">
                <div class="gallery-card-media">
                    <img src="${thumbSrc}"
                         onerror="this.onerror=null;this.src='${fallbackSrc}';"
                         alt="${item.titulo}"
                         loading="lazy">
                    ${videoBadgesHTML}
                    <div class="insta-overlay gallery-card-overlay">
                        <span class="insta-likes" data-card-like-id="${item.id}">♥ ${displayLikes}</span>
                        <h3 class="gallery-card-overlay-title">${item.titulo}</h3>
                    </div>
                </div>
                <div class="gallery-card-body">
                    <div class="gallery-card-meta">
                        <span class="gallery-cat-pill">#${item.categoria}</span>
                        <span class="gallery-date">${item.fecha}</span>
                    </div>
                    <h2 class="gallery-card-title">${item.titulo}</h2>
                    <p class="gallery-card-caption">${item.pie}</p>
                </div>
            </article>
        `;
    }).join("");
}

function getEmbedVideoUrl(url) {
    if (!url) return null;
    if (url.includes("youtube.com/embed/") || url.includes("player.vimeo.com/")) {
        return url;
    }
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/);
    if (ytMatch && ytMatch[1]) {
        return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;
    }
    return null;
}

// Corta el audio/vídeo al cerrar o pasar de diapositiva
function stopLightboxMedia() {
    const stage = document.getElementById("lightbox-media-stage");
    if (!stage) return;

    const videoEl = stage.querySelector("video");
    if (videoEl) {
        try {
            videoEl.pause();
            videoEl.removeAttribute("src");
            videoEl.load();
        } catch (_) {
            // noop
        }
    }

    stage.innerHTML = "";
}

function openLightboxAt(index) {
    if (index < 0 || index >= state.filteredItems.length) return;
    state.currentIndex = index;

    const modal = document.getElementById("gallery-lightbox");
    if (!modal) return;

    renderLightboxSlide();

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    const modal = document.getElementById("gallery-lightbox");
    if (!modal) return;

    stopLightboxMedia();
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    state.currentIndex = -1;
}

function navigateLightbox(direction) {
    const total = state.filteredItems.length;
    if (total === 0) return;

    stopLightboxMedia();
    state.currentIndex = (state.currentIndex + direction + total) % total;
    renderLightboxSlide();
}

function renderLightboxSlide() {
    const item = state.filteredItems[state.currentIndex];
    if (!item) return;

    const stage = document.getElementById("lightbox-media-stage");
    const catEl = document.getElementById("lightbox-cat");
    const dateEl = document.getElementById("lightbox-date");
    const titleEl = document.getElementById("lightbox-title");
    const descEl = document.getElementById("lightbox-desc");
    const likeBtn = document.getElementById("lightbox-like-btn");
    const likeCountEl = document.getElementById("lightbox-like-count");
    const counterPosEl = document.getElementById("lightbox-counter-pos");

    if (!stage) return;

    // Limpiar contenido previo antes de inyectar nuevo medio
    stopLightboxMedia();

    if (item.tipo === "video") {
        const embedUrl = getEmbedVideoUrl(item.url);
        if (embedUrl) {
            stage.innerHTML = `
                <div class="lightbox-video-wrapper">
                    <iframe class="lightbox-iframe"
                            src="${embedUrl}"
                            title="${item.titulo}"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                </div>
            `;
        } else {
            const posterUrl = item.miniatura || item.miniaturaFallback || "";
            stage.innerHTML = `
                <video class="lightbox-video"
                       src="${item.url}"
                       poster="${posterUrl}"
                       controls
                       autoplay
                       playsinline>
                    Tu navegador no soporta la reproducción de vídeo HTML5.
                </video>
            `;
        }
    } else {
        const fallbackImg = item.miniaturaFallback || item.miniatura || item.url;
        stage.innerHTML = `
            <img class="lightbox-img"
                 src="${item.url}"
                 onerror="this.onerror=null;this.src='${fallbackImg}';"
                 alt="${item.titulo}">
        `;
    }

    if (catEl) catEl.textContent = `#${item.categoria}`;
    if (dateEl) dateEl.textContent = item.fecha;
    if (titleEl) titleEl.textContent = item.titulo;
    if (descEl) descEl.textContent = item.pie || "";

    const isLiked = state.likedIds.has(item.id);
    const currentLikes = isLiked ? item.likes + 1 : item.likes;

    if (likeBtn) {
        likeBtn.classList.toggle("liked", isLiked);
        likeBtn.setAttribute("aria-pressed", String(isLiked));
    }
    if (likeCountEl) {
        likeCountEl.textContent = currentLikes;
    }
    if (counterPosEl) {
        counterPosEl.textContent = `${state.currentIndex + 1} / ${state.filteredItems.length}`;
    }
}

function setupGalleryInteractions() {
    const formatBtns = document.querySelectorAll(".media-format-tabs .status-tab-btn");
    formatBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            formatBtns.forEach((b) => {
                b.classList.remove("active");
                b.setAttribute("aria-selected", "false");
            });
            btn.classList.add("active");
            btn.setAttribute("aria-selected", "true");

            state.activeFormat = btn.getAttribute("data-format") || "all";
            applyGalleryFilters();
        });
    });

    const catBtns = document.querySelectorAll(".archive-filter-tags .tag-filter");
    catBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            catBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            state.activeCategory = btn.getAttribute("data-category") || "all";
            applyGalleryFilters();
        });
    });

    const resetBtn = document.getElementById("reset-gallery-filters-btn");
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            state.activeFormat = "all";
            state.activeCategory = "all";

            formatBtns.forEach((b) => {
                const isAll = b.getAttribute("data-format") === "all";
                b.classList.toggle("active", isAll);
                b.setAttribute("aria-selected", String(isAll));
            });

            catBtns.forEach((b) => {
                b.classList.toggle("active", b.getAttribute("data-category") === "all");
            });

            applyGalleryFilters();
        });
    }

    const grid = document.getElementById("archive-gallery-grid");
    if (grid) {
        grid.addEventListener("click", (e) => {
            const card = e.target.closest(".gallery-card");
            if (!card) return;
            const index = parseInt(card.getAttribute("data-index"), 10);
            if (!isNaN(index)) {
                openLightboxAt(index);
            }
        });

        grid.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                const card = e.target.closest(".gallery-card");
                if (!card) return;
                e.preventDefault();
                const index = parseInt(card.getAttribute("data-index"), 10);
                if (!isNaN(index)) {
                    openLightboxAt(index);
                }
            }
        });
    }

    const modal = document.getElementById("gallery-lightbox");
    const closeBtn = document.getElementById("lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");
    const likeBtn = document.getElementById("lightbox-like-btn");

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (prevBtn) prevBtn.addEventListener("click", () => navigateLightbox(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => navigateLightbox(1));

    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal || e.target.classList.contains("lightbox-content")) {
                closeLightbox();
            }
        });
    }

    if (likeBtn) {
        likeBtn.addEventListener("click", () => {
            const item = state.filteredItems[state.currentIndex];
            if (!item) return;

            if (state.likedIds.has(item.id)) {
                state.likedIds.delete(item.id);
            } else {
                state.likedIds.add(item.id);
            }

            const isLiked = state.likedIds.has(item.id);
            const updatedLikes = isLiked ? item.likes + 1 : item.likes;

            likeBtn.classList.toggle("liked", isLiked);
            const likeCountEl = document.getElementById("lightbox-like-count");
            if (likeCountEl) likeCountEl.textContent = updatedLikes;

            const cardLikeBadge = document.querySelector(`[data-card-like-id="${item.id}"]`);
            if (cardLikeBadge) {
                cardLikeBadge.textContent = `♥ ${updatedLikes}`;
            }
        });
    }

    document.addEventListener("keydown", (e) => {
        if (!modal || !modal.classList.contains("is-open")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowLeft") navigateLightbox(-1);
        if (e.key === "ArrowRight") navigateLightbox(1);
    });
}

// Permite abrir un elemento concreto desde la portada vía #media-X
function checkDeepLinkHash() {
    const hash = window.location.hash;
    if (!hash || !hash.startsWith("#media-")) return;

    const targetId = parseInt(hash.replace("#media-", ""), 10);
    if (isNaN(targetId)) return;

    const targetIndex = state.filteredItems.findIndex((item) => Number(item.id) === targetId);
    if (targetIndex !== -1) {
        openLightboxAt(targetIndex);
    }
}

function setupMobileMenu() {
    const menuBtn = document.querySelector(".mobile-menu-toggle");
    const mainNav = document.getElementById("main-nav");
    if (!menuBtn || !mainNav) return;

    menuBtn.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("is-open");
        menuBtn.setAttribute("aria-expanded", String(isOpen));
    });
}

document.addEventListener("DOMContentLoaded", async () => {
    setupMobileMenu();
    setupGalleryInteractions();

    const rawItems = await fetchGalleryData();
    state.allItems = [...rawItems].sort((a, b) => parseDateDMY(b.fecha) - parseDateDMY(a.fecha));

    applyGalleryFilters();
    checkDeepLinkHash();
});


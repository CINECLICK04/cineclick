const peliculas = [
    {
        id: 1,
        titulo: "Los Olvidados (2015)",
        categoria: "Accion",
        imagen: "los olvidados.jpg",
        sinopsis: "Brian Barnes se despierta en medio del desierto herido...",
        linkReproductor: "https://archive.org/embed/losolvidados_202605", 
        linkDescarga: "https://ia902907.us.archive.org/18/items/losolvidados_202605/losolvidados.mp4"
    },
    { 
        id: 2,
        titulo: "Michael (2026)",
        categoria: "Drama",
        imagen: "michael.jpg",
        sinopsis: "El viaje de Michael Jackson más allá de la música...",
        linkReproductor: "https://archive.org/embed/michael.-2026.1080p.-camrip.-v-2.-lat.-ofdub.-1-xbet", 
        linkDescarga: "https://ia800500.us.archive.org/32/items/michael.-2026.1080p.-camrip.-v-2.-lat.-ofdub.-1-xbet/Michael.2026.1080p.CAMRip.V2.LAT.OFDUB.1XBET.mp4" 
    },
    {
        id: 3,
        titulo: "John Wick 1: Sin Control (2014)",
        categoria: "Accion",
        imagen: "jonhwick1.jpg",
        sinopsis: "John Wick emerge de su retiro para cazar a los mafiosos que le quitaron todo...",
        linkReproductor: "https://archive.org/embed/jonh-wick-1",
        linkDescarga: "https://ia801908.us.archive.org/24/items/jonh-wick-1/jonh%20wick%201.mp4"
    },
    {
        id: 4,
        titulo: "John Wick 2: Un Nuevo Día para Matar (2017)",
        categoria: "Accion",
        imagen: "jonhwick2.png",
        sinopsis: "Obligado por una deuda del pasado, John viaja a Roma para enfrentarse a los asesinos más peligrosos del mundo...",
        linkReproductor: "https://archive.org/embed/john.wick.chapter.-2.2017.1080-p-dual-lat",
        linkDescarga: "https://ia600608.us.archive.org/23/items/john.wick.chapter.-2.2017.1080-p-dual-lat/John.wick.chapter.2.2017.1080P-Dual-Lat.mp4"
    },
    {
        id: 5,
        titulo: "John Wick: Capítulo 3 - Parabellum (2019)",
        categoria: "Accion",
        imagen: "jonhwick3.jpg",
        sinopsis: "John Wick regresa a la acción con una recompensa de 14 millones de dólares sobre su cabeza...",
        linkReproductor: "https://archive.org/embed/jonh-wick-3",
        linkDescarga: "https://ia601407.us.archive.org/1/items/jonh-wick-3/jonh%20wick%203.mp4"
    }
];

// 1. MOSTRAR PELÍCULAS EN EL GRID
function mostrarPeliculas(lista) {
    const contenedor = document.getElementById('contenedor-peliculas');
    if (!contenedor) return; 
    
    contenedor.innerHTML = ""; 

    lista.forEach(peli => {
        const card = document.createElement('div');
        card.className = 'pelicula-card';
        // 💰 Al hacer clic en la tarjeta, se ejecuta la función que redirige al acortador
        card.setAttribute('onclick', `irAlAcortador(${peli.id})`);
        
        card.innerHTML = `
            <div class="card-img-container">
                <img src="${peli.imagen}" alt="${peli.titulo}">
                <div class="overlay">
                    <span>▶ REPRODUCIR</span>
                </div>
            </div>
            <div class="info-peli">
                <h3>${peli.titulo}</h3>
                <p class="tag-categoria">${peli.categoria}</p>
                <button class="btn-ver">Ver Ahora</button>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

// 💰 2. NUEVA FUNCIÓN: REDIRIGE POR TU ENLACE DE MONETIZACIÓN AL HACER CLIC
function irAlAcortador(id) {
    // Detectamos la URL actual de tu web de forma automática (funciona en local y en tu dominio definitivo)
    const urlBase = window.location.origin + window.location.pathname;
    
    // Creamos el enlace de retorno diciéndole a la web qué película abrir con el parámetro "?peli="
    const urlDestinoFinal = `${urlBase}?peli=${id}`;
    
    // Encriptamos la URL final para enviarla de forma segura a través de ouo.io
    const urlMonetizada = `http://ouo.io/qs/BpVY4RPC?s=${encodeURIComponent(urlDestinoFinal)}`;
    
    // Redirigimos al usuario para que pase por el anuncio
    window.location.href = urlMonetizada;
}

// 3. ABRIR EL MODAL DIRECTO (Esta se ejecuta automáticamente después de saltar el anuncio)
function abrirModalDirecto(id) {
    const peli = peliculas.find(p => p.id === parseInt(id));
    if (!peli) return;

    const modal = document.getElementById('modal-peli');
    const modalBody = document.getElementById('modal-body');
    const selectorSaga = document.getElementById('selector-saga');

    modal.style.display = "flex";
    if (selectorSaga) selectorSaga.style.display = "none"; 

    modalBody.innerHTML = `
        <h2 class="modal-titulo" style="color:white; margin-bottom:5px;">${peli.titulo}</h2>
        <p class="tag-categoria" style="display:inline-block; background:#e50914; color:white; padding:3px 8px; border-radius:3px; font-size:12px; margin-bottom:15px;">${peli.categoria}</p>
        
        <div class="sinopsis-container" style="color:#e0e0e0; font-size:14px; line-height:1.5; margin-bottom:20px; background:rgba(255,255,255,0.05); padding:15px; border-radius:8px; border-left:4px solid #e50914;">
            <p style="margin:0;">${peli.sinopsis}</p>
        </div>

        <div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.5); background:#000; margin-bottom: 20px;">
            <iframe 
                src="${peli.linkReproductor}" 
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" 
                allowfullscreen="true">
            </iframe>
        </div>

        <div class="modal-actions" style="display: flex; flex-direction: column; gap: 10px;">
            <a href="${peli.linkDescarga}" target="_blank" style="text-align: center; text-decoration: none; padding: 12px; background: #e50914; color: white; display: block; border-radius: 5px; font-size: 15px;">
                <strong>📥 Descargar Película Directa (Alta Calidad)</strong>
            </a>
            <button onclick="event.stopPropagation(); cerrarModal();" class="btn-ver" style="background: #333; color: white; border: none; padding: 10px; border-radius: 5px; cursor: pointer; width: 100%;">
                Volver al Catálogo
            </button>
        </div>
    `;
}

// 4. CERRAR MODAL
function cerrarModal() {
    const modal = document.getElementById('modal-peli');
    const modalBody = document.getElementById('modal-body');
    
    modal.style.display = "none";
    modalBody.innerHTML = ""; 
    
    // Limpiamos el parámetro de la URL para que no se quede pegado al cerrar el modal
    const urlLimpia = window.location.origin + window.location.pathname;
    window.history.replaceState({}, document.title, urlLimpia);
}

// 5. BUSCADOR EN TIEMPO REAL 
document.getElementById('buscador').addEventListener('input', (e) => {
    const termino = e.target.value.toLowerCase();
    const filtradas = peliculas.filter(p => p.titulo.toLowerCase().includes(termino));
    mostrarPeliculas(filtradas);
});

// 6. FILTRO POR CATEGORÍAS
document.querySelectorAll('.btn-filtro').forEach(boton => {
    boton.addEventListener('click', () => {
        const categoria = boton.getAttribute('data-category');
        document.querySelectorAll('.btn-filtro').forEach(b => b.classList.remove('active'));
        boton.classList.add('active');
        
        if (categoria === "all") {
            mostrarPeliculas(peliculas);
        } else {
            const filtradas = peliculas.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
            mostrarPeliculas(filtradas);
        }
    });
});

// 🔄 7. COMPROBACIÓN AL CARGAR LA PÁGINA (Abre el reproductor automáticamente si viene del acortador)
window.onload = () => {
    mostrarPeliculas(peliculas);
    
    // Revisamos si la URL tiene el ID de la película que el usuario quería ver
    const urlParams = new URLSearchParams(window.location.search);
    const peliId = urlParams.get('peli');
    
    if (peliId) {
        abrirModalDirecto(peliId);
    }
};
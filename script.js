const peliculas = [
    {
        id: 1,
        titulo: "Los Olvidados 2015",
        categoria: "Accion",
        imagen: "los olvidados.jpg",
        sinopsis: "Brian Barnes se despierta en medio del desierto herido...",
        linkReproductor: "https://archive.org/embed/losolvidados_202605", 
        linkDescarga: "https://ia902907.us.archive.org/18/items/losolvidados_202605/losolvidados.mp4"
    },
    { 
        id: 2,
        titulo: "Michael(2026)",
        categoria: "Drama",
        imagen: "michael.jpg",
        sinopsis: "El viaje de Michael Jackson más allá de la música...",
        linkReproductor: "https://archive.org/embed/michael.-2026.1080p.-camrip.-v-2.-lat.-ofdub.-1-xbet", 
        linkDescarga: "https://ia800500.us.archive.org/32/items/michael.-2026.1080p.-camrip.-v-2.-lat.-ofdub.-1-xbet/Michael.2026.1080p.CAMRip.V2.LAT.OFDUB.1XBET.mp4" 
    },
    {
        id: 3,
        titulo: "John Wick: La Saga Completa",
        categoria: "Accion",
        imagen: "johnwicksaga.png",
        esSaga: true, 
        sinopsis: "Sigue los pasos del legendario asesino de élite John Wick...",
        coleccion: [
            {
                titulo: "John Wick 1: Sin Control (2014)",
                categoria: "Accion", // 👈 CORRECCIÓN: Añadida explícitamente para consistencia
                imagen: "john wick 1.jpg",
                sinopsis: "John Wick emerge de su retiro para cazar a los mafiosos...",
                linkReproductor: "https://archive.org/embed/jonh-wick-1",
                linkDescarga: "https://ia801908.us.archive.org/24/items/jonh-wick-1/jonh%20wick%201.mp4"
            },
            {
                titulo: "John Wick 2: Un Nuevo Día para Matar (2017)",
                categoria: "Accion",
                imagen: "john wick 2.png",
                sinopsis: "Obligado por una deuda del pasado, John viaja a Roma...",
                linkReproductor: "https://archive.org/embed/tu_enlace_jw2",
                linkDescarga: "https://ouo.io/enlace_jw2"
            }
             {
                titulo: "John Wick: Capítulo 3 ",
                categoria: "Accion",
                imagen: "john wick 3.jpg",
                sinopsis: "John Wick (Keanu Reeves) regresa a la acción, solo que esta vez con una recompensa de 14 millones de dólares sobre su cabeza y con un ejército de mercenarios intentando darle caza. Tras asesinar a uno de los miembros del gremio de asesinos al que pertenecía, Wick es expulsado de la organización, pasando a convertirse en el centro de atención de multitud de asesinos a sueldo que esperan detrás de cada esquina para tratar de deshacerse de él.",
                linkReproductor: "https://archive.org/embed/jonh-wick-3",
                linkDescarga: "https://ia601407.us.archive.org/1/items/jonh-wick-3/jonh%20wick%203.mp4"
            }
            // ... resto de las películas de John Wick
        ]
    }
];

// 1. FUNCIÓN PARA MOSTRAR PELÍCULAS
function mostrarPeliculas(lista) {
    const contenedor = document.getElementById('contenedor-peliculas');
    if (!contenedor) return; 
    
    contenedor.innerHTML = ""; 

    lista.forEach(peli => {
        const card = document.createElement('div');
        card.className = 'pelicula-card';
        card.innerHTML = `
            <div class="card-img-container">
                <img src="${peli.imagen}" alt="${peli.titulo}">
                <div class="overlay" onclick="abrirModal(${peli.id})">
                    <span>▶ ${peli.esSaga ? 'VER SAGA' : 'REPRODUCIR'}</span>
                </div>
            </div>
            <div class="info-peli">
                <h3>${peli.titulo}</h3>
                <p class="tag-categoria">${peli.categoria}</p>
                <button class="btn-ver" onclick="abrirModal(${peli.id})">
                    ${peli.esSaga ? 'Ver Saga' : 'Ver Ahora'}
                </button>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

// 2. FUNCIÓN ABRIR MODAL
function abrirModal(id) {
    const peli = peliculas.find(p => p.id === id);
    if (!peli) return;

    const modal = document.getElementById('modal-peli');
    const selectorSaga = document.getElementById('selector-saga');
    const modalBody = document.getElementById('modal-body');

    modal.style.display = "flex";
    modalBody.innerHTML = "";
    selectorSaga.innerHTML = "";
    selectorSaga.style.display = "none";

    if (peli.esSaga) {
        selectorSaga.style.display = "grid";
        
        modalBody.innerHTML = `
            <h2 class="modal-titulo" style="color:white; margin-bottom:5px;">${peli.titulo}</h2>
            <p class="tag-categoria" style="display:inline-block; background:#e50914; color:white; padding:3px 8px; border-radius:3px; font-size:12px; margin-bottom:15px;">Colección Especial</p>
            <div class="sinopsis-container" style="color:#e0e0e0; font-size:14px; line-height:1.5; margin-bottom:20px; background:rgba(255,255,255,0.05); padding:15px; border-radius:8px; border-left:4px solid #e50914;">
                <p style="margin:0;">${peli.sinopsis}</p>
            </div>
            <h3 style="color:#fff; font-size:16px; margin-bottom:15px; text-align:center;">Selecciona la película que quieres ver:</h3>
        `;

        peli.coleccion.forEach(parte => {
            const item = document.createElement('div');
            item.className = 'item-saga-tarjeta';
            item.innerHTML = `
                <img src="${parte.imagen}" alt="${parte.titulo}">
                <h4>${parte.titulo}</h4>
            `;
            
            item.addEventListener('click', () => {
                selectorSaga.style.display = "none";
                construirReproductorHTML(parte);
            });
            
            selectorSaga.appendChild(item);
        });

    } else {
        construirReproductorHTML(peli);
    }
}

// 🎦 FUNCIÓN AUXILIAR REPRODUCTOR
function construirReproductorHTML(peliDatos) {
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <h2 class="modal-titulo" style="color:white; margin-bottom:5px;">${peliDatos.titulo}</h2>
        <p class="tag-categoria" style="display:inline-block; background:#e50914; color:white; padding:3px 8px; border-radius:3px; font-size:12px; margin-bottom:15px;">${peliDatos.categoria}</p>
        
        <div class="sinopsis-container" style="color:#e0e0e0; font-size:14px; line-height:1.5; margin-bottom:20px; background:rgba(255,255,255,0.05); padding:15px; border-radius:8px; border-left:4px solid #e50914;">
            <p style="margin:0;">${peliDatos.sinopsis}</p>
        </div>

        <div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.5); background:#000; margin-bottom: 20px;">
            <iframe 
                src="${peliDatos.linkReproductor}" 
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" 
                allowfullscreen="true">
            </iframe>
        </div>

        <div class="modal-actions" style="display: flex; flex-direction: column; gap: 10px;">
            <a href="${peliDatos.linkDescarga}" target="_blank" style="text-align: center; text-decoration: none; padding: 12px; background: #e50914; color: white; display: block; border-radius: 5px; font-size: 15px;">
                <strong>📥 Descargar Película Directa (Alta Calidad)</strong>
            </a>
            <button onclick="cerrarModal()" class="btn-ver" style="background: #333; color: white; border: none; padding: 10px; border-radius: 5px; cursor: pointer; width: 100%;">
                Volver al Catálogo
            </button>
        </div>
    `;
}

// 3. FUNCIÓN CERRAR MODAL
function cerrarModal() {
    const modal = document.getElementById('modal-peli');
    const modalBody = document.getElementById('modal-body');
    const selectorSaga = document.getElementById('selector-saga');
    
    modal.style.display = "none";
    modalBody.innerHTML = ""; 
    selectorSaga.innerHTML = "";
    selectorSaga.style.display = "none";
}

// 4. BUSCADOR INTEGRADO EN TIEMPO REAL (CORREGIDO)
document.getElementById('buscador').addEventListener('input', (e) => {
    const termino = e.target.value.toLowerCase();
    
    const filtradas = peliculas.filter(p => {
        // Verifica si coincide el título principal de la película o saga
        const coincidePrincipal = p.titulo.toLowerCase().includes(termino);
        
        // Si es una saga, verifica si alguna de las películas internas coincide
        const coincideEnSaga = p.esSaga && p.coleccion.some(subPeli => subPeli.titulo.toLowerCase().includes(termino));
        
        return coincidePrincipal || coincideEnSaga;
    });
    
    mostrarPeliculas(filtradas);
});

// 5. FILTRO POR CATEGORÍAS
document.querySelectorAll('.btn-filtro').forEach(boton => {
    boton.addEventListener('click', () => {
        const categoria = boton.getAttribute('data-category');
        document.querySelectorAll('.btn-filtro').forEach(b => b.classList.remove('active'));
        boton.classList.add('active');
        
        if (categoria === "all") {
            mostrarPeliculas(peliculas);
        } else {
            const filtradas = peliculas.filter(p => p.categoria === categoria);
            mostrarPeliculas(filtradas);
        }
    });
});

window.onload = () => mostrarPeliculas(peliculas);

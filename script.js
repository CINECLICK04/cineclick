const peliculas = [
    {
        id: 1,
        titulo: "Los Olvidados 2015",
        categoria: "Accion",
        imagen: "los olvidados.jpg",
        sinopsis: "Brian Barnes se despierta en medio del desierto herido y sin ningún recuerdo de quién es, ni ninguna idea de los acontecimientos que le han llevado a estar rodeado por ocho cadáveres, una camioneta con tres millones de dólares en efectivo y otra camioneta llena de cocaína. Perseguido no solo por el infame capo de la droga Mateo Pérez, quien trata desesperadamente de recuperar su dinero, y por el misterioso agente de la DEA Bob Rooker, si no también por el corrupto Sheriff Olson, ninguno de ellos se detendrá hasta echar el guante a la fortuna y al hombre que la tiene en su poder. En plena huida, Brian se da cuenta de que cuánto más recuerda, menos ganas tiene de saber quién es realmente. Pero ahora lo único que importa es ser el último que quede en pie.",
        // Tu link embed real listo:
        linkReproductor: "https://archive.org/embed/losolvidados_202605", 
        // Recuerda cambiar este enlace por el link .mp4 real cuando lo saques de la sección DOWNLOAD OPTIONS de Archive
        linkDescarga: "https://ia902907.us.archive.org/18/items/losolvidados_202605/losolvidados.mp4"
    },
    { 
        id: 2,
        titulo: "Michael(2026)",
        categoria: "Drama",
        imagen: "michael.jpg",
        sinopsis: "En las peligrosas favelas de Río de Janeiro, el capitán Nascimento, líder del Batallón de Operaciones Policiales Especiales (BOPE), busca a un sustituto idóneo para su puesto mientras intenta pacificar la zona.",
        linkReproductor: "https://archive.org/embed/michael.-2026.1080p.-camrip.-v-2.-lat.-ofdub.-1-xbet", 
        linkDescarga: "https://ia800500.us.archive.org/32/items/michael.-2026.1080p.-camrip.-v-2.-lat.-ofdub.-1-xbet/Michael.2026.1080p.CAMRip.V2.LAT.OFDUB.1XBET.mp4" 
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
                    <span>▶ REPRODUCIR</span>
                </div>
            </div>
            <div class="info-peli">
                <h3>${peli.titulo}</h3>
                <p class="tag-categoria">${peli.categoria}</p>
                <button class="btn-ver" onclick="abrirModal(${peli.id})">Ver Ahora</button>
            </div>
        `;
        contenedor.appendChild(card);
    });
}

// 2. FUNCIÓN ABRIR MODAL (CON REPRODUCTOR INTEGRADO HD + DESCARGA SEPARADA)
function abrirModal(id) {
    const peli = peliculas.find(p => p.id === id);
    const modal = document.getElementById('modal-peli');
    const modalBody = document.getElementById('modal-body');

    modal.style.display = "flex";
    
    modalBody.innerHTML = `
        <h2 class="modal-titulo" style="color:white; margin-bottom:5px;">${peli.titulo}</h2>
        <p class="tag-categoria" style="display:inline-block; background:#e50914; color:white; padding:3px 8px; border-radius:3px; font-size:12px; margin-bottom:15px;">${peli.categoria}</p>
        
        <!-- Bloque de Sinopsis -->
        <div class="sinopsis-container" style="color:#e0e0e0; font-size:14px; line-height:1.5; margin-bottom:20px; background:rgba(255,255,255,0.05); padding:15px; border-radius:8px; border-left:4px solid #e50914;">
            <p style="margin:0;">${peli.sinopsis}</p>
        </div>

        <!-- REPRODUCTOR DIRECTO EN TU PÁGINA (ARCHIVE.ORG) -->
        <div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; box-shadow: 0 0 20px rgba(0,0,0,0.5); background:#000; margin-bottom: 20px;">
            <iframe 
                src="${peli.linkReproductor}" 
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: none;" 
                allowfullscreen="true">
            </iframe>
        </div>

        <!-- Acciones del Modal: Descarga y Cierre -->
        <div class="modal-actions" style="display: flex; flex-direction: column; gap: 10px;">
            <a href="${peli.linkDescarga}" target="_blank" style="text-align: center; text-decoration: none; padding: 12px; background: #e50914; color: white; display: block; border-radius: 5px; font-size: 15px; transition: background 0.2s;">
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
    
    modal.style.display = "none";
    modalBody.innerHTML = ""; // Detiene la reproducción del video al cerrar
}

// 4. BUSCADOR EN TIEMPO REAL
document.getElementById('buscador').addEventListener('input', (e) => {
    const termino = e.target.value.toLowerCase();
    const filtradas = peliculas.filter(p => p.titulo.toLowerCase().includes(termino));
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
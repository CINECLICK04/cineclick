const peliculas = [
    {
        id: 1,
        titulo: "Los Olvidados 2015",
        categoria: "Accion",
        imagen: "los olvidados.jpg",
        sinopsis: "Brian Barnes se despierta en medio del desierto herido y sin ningún recuerdo de quién es, ni ninguna idea de los acontecimientos que le han llevado a estar rodeado por ocho cadáveres, una camioneta con tres millones de dólares en efectivo y otra camioneta llena de cocaína. Perseguido no solo por el infame capo de la droga Mateo Pérez, quien trata desesperadamente de recuperar su dinero, y por el misterioso agente de la DEA Bob Rooker, si no también por el corrupto Sheriff Olson, ninguno de ellos se detendrá hasta echar el guante a la fortuna y al hombre que la tiene en su poder. En plena huida, Brian se da cuenta de que cuánto más recuerda, menos ganas tiene de saber quién es realmente. Pero ahora lo único que importa es ser el último que quede en pie.",
        linkReproductor: "https://archive.org/embed/losolvidados_202605", 
        linkDescarga: "https://ia902907.us.archive.org/18/items/losolvidados_202605/losolvidados.mp4"
    },
    { 
        id: 2,
        titulo: "Michael(2026)",
        categoria: "Drama",
        imagen: "michael.jpg",
        sinopsis: "El viaje de Michael Jackson más allá de la música, desde el descubrimiento de su extraordinario talento como líder de los Jackson Five hasta convertirse en una visionaria estrella cuya ambición creativa despertó un incansable afán por consagrarse como el mayor icono de la industria del entretenimiento.",
        linkReproductor: "https://archive.org/embed/michael.-2026.1080p.-camrip.-v-2.-lat.-ofdub.-1-xbet", 
        linkDescarga: "https://ia800500.us.archive.org/32/items/michael.-2026.1080p.-camrip.-v-2.-lat.-ofdub.-1-xbet/Michael.2026.1080p.CAMRip.V2.LAT.OFDUB.1XBET.mp4" 
    },
    // 📂 AJUSTE: SAGA DE JOHN WICK INTEGRADA COMO CARPETA
    {
        id: 3,
        titulo: "John Wick: La Saga Completa",
        categoria: "Accion",
        imagen: "john wick.jpg", // Tu portada de la carpeta general
        esSaga: true, // Propiedad clave para identificarla
        sinopsis: "Sigue los pasos del legendario asesino de élite John Wick en su cruzada global de venganza contra la Alta Mesa.",
        coleccion: [
            {
                titulo: "John Wick 1: Sin Control (2014)",
                imagen: "john wick 1.jpg",
                sinopsis: "John Wick emerge de su retiro para cazar a los mafiosos que destruyeron lo último que le quedaba de su esposa.",
                linkReproductor: "https://archive.org/embed/jonh-wick-1",
                linkDescarga: "https://ouo.io/enlace_jw1"
            },
            {
                titulo: "John Wick 2: Un Nuevo Día para Matar (2017)",
                imagen: "john wick 2.png",
                sinopsis: "Obligado por una deuda del pasado, John viaja a Roma para enfrentarse a los asesinos más letales del mundo.",
                linkReproductor: "https://archive.org/embed/tu_enlace_jw2",
                linkDescarga: "https://ouo.io/enlace_jw2"
            },
            {
                titulo: "John Wick 3: Parabellum (2019)",
                imagen: "john wick 3.jpg",
                sinopsis: "With a 14 million bounty on his head, John Wick must fight his way out of New York City.",
                linkReproductor: "https://archive.org/embed/tu_enlace_jw3",
                linkDescarga: "https://ouo.io/enlace_jw3"
            },
            {
                titulo: "John Wick 4 (2023)",
                imagen: "john wick 4.jpg",
                sinopsis: "John Wick encuentra la manera definitiva de derrotar a la Alta Mesa, pero el precio por su libertad será el más alto.",
                linkReproductor: "https://archive.org/embed/tu_enlace_jw4",
                linkDescarga: "https://ouo.io/enlace_jw4"
            }
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

// 2. FUNCIÓN ABRIR MODAL (ADAPTADA PARA INTERCEPTAR SAGAS)
function abrirModal(id) {
    const peli = peliculas.find(p => p.id === id);
    const modal = document.getElementById('modal-peli');
    const selectorSaga = document.getElementById('selector-saga');
    const modalBody = document.getElementById('modal-body');

    modal.style.display = "flex";
    
    // Limpiamos los contenedores internos para evitar residuos de clics anteriores
    modalBody.innerHTML = "";
    selectorSaga.innerHTML = "";
    selectorSaga.style.display = "none";

    // SI ES UNA SAGA: Mostramos la carpeta con la lista de portadas
    if (peli.esSaga) {
        selectorSaga.style.display = "grid";
        
        // Ponemos un encabezado estético dentro del cuerpo del modal
        modalBody.innerHTML = `
            <h2 class="modal-titulo" style="color:white; margin-bottom:5px;">${peli.titulo}</h2>
            <p class="tag-categoria" style="display:inline-block; background:#e50914; color:white; padding:3px 8px; border-radius:3px; font-size:12px; margin-bottom:15px;">Colección Especial</p>
            <div class="sinopsis-container" style="color:#e0e0e0; font-size:14px; line-height:1.5; margin-bottom:20px; background:rgba(255,255,255,0.05); padding:15px; border-radius:8px; border-left:4px solid #e50914;">
                <p style="margin:0;">${peli.sinopsis}</p>
            </div>
            <h3 style="color:#fff; font-size:16px; margin-bottom:15px; text-align:center;">Selecciona la película que quieres ver:</h3>
        `;

        // Generamos los elementos interactivos para cada película de John Wick
        peli.coleccion.forEach(parte => {
            const item = document.createElement('div');
            item.className = 'item-saga-tarjeta';
            item.innerHTML = `
                <img src="${parte.imagen}" alt="${parte.titulo}">
                <h4>${parte.titulo}</h4>
            `;
            
            // Al hacer clic en una entrega, ocultamos las portadas y cargamos su reproductor
            item.addEventListener('click', () => {
                selectorSaga.style.display = "none";
                construirReproductorHTML(parte);
            });
            
            selectorSaga.appendChild(item);
        });

    } else {
        // SI ES PELÍCULA NORMAL: Inyecta el reproductor directamente
        construirReproductorHTML(peli);
    }
}

// 🎦 FUNCIÓN AUXILIAR: Inyecta el HTML del reproductor, sinopsis y botones
function construirReproductorHTML(peliDatos) {
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <h2 class="modal-titulo" style="color:white; margin-bottom:5px;">${peliDatos.titulo}</h2>
        <p class="tag-categoria" style="display:inline-block; background:#e50914; color:white; padding:3px 8px; border-radius:3px; font-size:12px; margin-bottom:15px;">${peliDatos.categoria || 'Acción'}</p>
        
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
            <a href="${peliDatos.linkDescarga}" target="_blank" style="text-align: center; text-decoration: none; padding: 12px; background: #e50914; color: white; display: block; border-radius: 5px; font-size: 15px; transition: background 0.2s;">
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
    modalBody.innerHTML = ""; // Detiene la reproducción del video al vaciar el HTML
    selectorSaga.innerHTML = "";
    selectorSaga.style.display = "none";
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

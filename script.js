document.addEventListener("DOMContentLoaded", () => {
    // Array ordenado con los contenedores de las 6 páginas (índices 0 a 5)
    const paginas = [
        document.querySelector(".contenedor-principal"), // Página 0: Portada
        document.querySelector(".primera-pagina"),        // Página 1: Para Comenzar
        document.querySelector(".segunda-pagina"),        // Página 2: Antojos Dumo
        document.querySelector(".tercera-pagina"),        // Página 3: Cócteles
        document.querySelector(".cuarta-pagina"),         // Página 4: Bebidas
        document.querySelector(".quinta-pagina")          // Página 5: Información
    ];

    const dots = document.querySelectorAll('.menu-rapido .dot');

    /**
     * Función global para ir a una página por su índice (0 a 5)
     */
    window.irAPagina = function(indice) {
        paginas.forEach((pag, i) => {
            if (!pag) return;

            if (i === indice) {
                // Muestra la página seleccionada
                pag.classList.remove("oculto");
            } else {
                // Oculta todas las demás
                pag.classList.add("oculto");
            }
        });

        // Actualiza el estado visual de los puntos indicadores
        dots.forEach((dot, i) => {
            if (i === indice) {
                dot.classList.add("activo");
            } else {
                dot.classList.remove("activo");
            }
        });
    };

    // Asegura que al cargar la web solo la portada (índice 0) esté visible
    irAPagina(0);
});

document.addEventListener("DOMContentLoaded", () => {
    // Array ordenado con las 6 páginas (índices 0 a 5)
    const paginas = [
        document.querySelector(".contenedor-principal"), // Página 0: Portada
        document.querySelector(".primera-pagina"),        // Página 1: Para Comenzar
        document.querySelector(".segunda-pagina"),        // Página 2: Antojos Dumo
        document.querySelector(".tercera-pagina"),        // Página 3: Cócteles
        document.querySelector(".cuarta-pagina"),         // Página 4: Bebidas
        document.querySelector(".quinta-pagina")          // Página 5: Información
    ].filter(Boolean);

    const dots = document.querySelectorAll('.menu-rapido .dot');
    let paginaActual = 0;
    let animando = false; // Bloquea clics múltiples mientras se anima

    /**
     * Función global para cambiar de página con animación
     */
    window.irAPagina = function(indice) {
        if (animando || indice === paginaActual) return;
        animando = true;

        const paginaSaliente = paginas[paginaActual];
        const paginaEntrante = paginas[indice];

        // 1. Actualiza el índice global
        paginaActual = indice;

        // 2. Actualiza los puntos indicadores de inmediato
        dots.forEach((dot, i) => {
            if (i === indice) {
                dot.classList.add("activo");
            } else {
                dot.classList.remove("activo");
            }
        });

        // 3. Inicia animación de salida en la página actual
        paginaSaliente.classList.add("anim-salida");

        setTimeout(() => {
            // Oculta la página saliente y limpia sus clases de animación
            paginaSaliente.classList.add("oculto");
            paginaSaliente.classList.remove("anim-salida", "pagina-activa");

            // 4. Prepara y muestra la página entrante
            paginaEntrante.classList.remove("oculto");
            paginaEntrante.classList.add("pagina-activa", "anim-entrada");

            setTimeout(() => {
                // Limpia la animación de entrada al terminar
                paginaEntrante.classList.remove("anim-entrada");
                animando = false;
            }, 400); // Duración de la entrada

        }, 300); // Duración de la salida
    };

    /**
     * Función para avanzar a la siguiente página en bucle al hacer tap en la pantalla
     */
    function cambiarSiguientePagina() {
        if (animando) return;
        const siguiente = (paginaActual + 1) % paginas.length;
        irAPagina(siguiente);
    }

    // Evento de clic en cada página (protegiendo enlaces de WhatsApp, Maps, etc.)
    paginas.forEach(pagina => {
        pagina.addEventListener("click", (e) => {
            if (e.target.closest('a') || e.target.closest('button')) return;
            cambiarSiguientePagina();
        });
    });

    // Inicialización: Muestra solo la portada sin ocultar clases base
    paginas.forEach((pag, i) => {
        if (i === 0) {
            pag.classList.remove("oculto");
            pag.classList.add("pagina-activa");
        } else {
            pag.classList.add("oculto");
            pag.classList.remove("pagina-activa");
        }
    });
});
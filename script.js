document.addEventListener("DOMContentLoaded", () => {
    // Definimos el orden exacto de las páginas del menú
    const paginas = [
        document.querySelector(".contenedor-principal"), // Portada (Página 0)
        document.querySelector(".primera-pagina"),        // Entradas / Comenzar (Página 1)
        document.querySelector(".segunda-pagina"),        // Antojos Dumo (Página 2)
        document.querySelector(".tercera-pagina"),        // Cócteles (Página 3)
        document.querySelector(".cuarta-pagina")          // Bebidas (Página 4)
    ].filter(Boolean); // Filtra por si alguna clase aún no existe en el DOM

    let paginaActual = 0;
    let animando = false;

    // Aseguramos la visibilidad inicial correcta (Solo la portada o primera activa sin oculto)
    paginas.forEach((pag, index) => {
        if (index === paginaActual) {
            pag.classList.remove("oculto");
            pag.classList.add("pagina-activa");
        } else {
            pag.classList.add("oculto");
            pag.classList.remove("pagina-activa");
        }
    });

    // Función para cambiar a la siguiente página con animación
    function cambiarPagina() {
        if (animando || paginas.length <= 1) return;
        animando = true;

        const paginaSaliente = paginas[paginaActual];
        
        // Calculamos la siguiente página (al llegar al final, regresa a la portada)
        paginaActual = (paginaActual + 1) % paginas.length;
        const paginaEntrante = paginas[paginaActual];

        // 1. Iniciar animación de salida
        paginaSaliente.classList.add("anim-salida");

        setTimeout(() => {
            // 2. Ocultar la página saliente y reiniciar sus clases de animación
            paginaSaliente.classList.add("oculto");
            paginaSaliente.classList.remove("pagina-activa", "anim-salida");

            // 3. Preparar la página entrante
            paginaEntrante.classList.remove("oculto");
            paginaEntrante.classList.add("pagina-activa", "anim-entrada");

            setTimeout(() => {
                // 4. Limpiar la clase de entrada al finalizar la animación
                paginaEntrante.classList.remove("anim-entrada");
                animando = false;
            }, 400); // Duración de la animación de entrada

        }, 300); // Duración de la animación de salida
    }

    // Agregar evento de clic a cada contenedor de página
    paginas.forEach(pagina => {
        pagina.addEventListener("click", cambiarPagina);
    });
});
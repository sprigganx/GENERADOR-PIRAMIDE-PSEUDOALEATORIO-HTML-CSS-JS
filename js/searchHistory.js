document.addEventListener("DOMContentLoaded", function () {
    // Obtener historial de pirámides y rutas
    Promise.all([
        fetch('http://localhost:4567/historialPiramides').then(response => response.json()),
        fetch('http://localhost:4567/historialRutas').then(response => response.json())
    ]).then(([dataPiramides, dataRutas]) => {
        mostrarHistorial(dataPiramides, dataRutas);
    }).catch(error => console.error('Error al obtener historial:', error));
});

function mostrarHistorial(historialPiramides, historialRutas) {
    const botonesContainer = document.getElementById('botones-container');

    historialPiramides.forEach((piramideHTML, index) => {
        // Crear botón para ver la pirámide
        const boton = document.createElement('button');
        boton.textContent = `Ver Pirámide ${index + 1}`;
        boton.addEventListener('click', () => {
            const piramideContainer = document.getElementById('piramide-container');
            piramideContainer.innerHTML = `<div class="historyBlocksB"><h3>Pirámide</h3>${piramideHTML}</div>`;

            // Mostrar la ruta correspondiente
            const rutaContainer = document.getElementById('ruta-mas-pesada');
            rutaContainer.innerHTML = `<div class="historyRouteB"><h3>Ruta</h3>${historialRutas[index]}</div>`;
        });
        botonesContainer.appendChild(boton);
    });
}

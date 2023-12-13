let historialPiramides = [];

function Dibujar() {
    let piramide = parseInt(document.getElementById("Cantidad").value);

    if (piramide > 0 && piramide < 51) {
        let arregloPiramide = [];
        let elemento = "";

        for (let i = 1; i <= piramide; i++) {
            elemento += '<div class="Space">';
            let nivel = [];
            
            for (let j = 0; j < i; j++) {
                const numeroAleatorio = Math.floor(Math.random() * 99) + 1;
                nivel.push(numeroAleatorio);
                elemento += '<div class="Blocks">' + numeroAleatorio + '</div>';
            }
            arregloPiramide.push(nivel);
            elemento += '</div>';
        }
        document.getElementById("pyramid").innerHTML = elemento;

        encontrarRutaMasPesada(arregloPiramide);
        respuestaRuta(arregloPiramide);
        colorCamino(encontrarRutaMasPesada(arregloPiramide));

        // Enviar datos al backend
        enviarAlBackend(document.getElementById("pyramid").innerHTML, document.getElementById("respuesta").innerHTML);
    } else {
        alert("El número tiene que ser mayor a 0 y menor que 51");
    }
}

function enviarAlBackend(pyramidContent, respuestaContent) {
    const pyramidData = {
        pyramid: pyramidContent
    };

    const respuestaData = {
        respuesta: respuestaContent
    };

    // Realizar la solicitud al backend para pyramid
    fetch('http://localhost:4567/piramides/pyramid', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pyramidData)
    })
    .then(response => response.json())
    .then(data => console.log('Respuesta del backend para pyramid:', data))
    .catch(error => console.error('Error al enviar datos al backend para pyramid:', error));

    // Realizar la solicitud al backend para respuesta
    fetch('http://localhost:4567/piramides/respuesta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(respuestaData)
    })
    .then(response => response.json())
    .then(data => console.log('Respuesta del backend para respuesta:', data))
    .catch(error => console.error('Error al enviar datos al backend para respuesta:', error));
}

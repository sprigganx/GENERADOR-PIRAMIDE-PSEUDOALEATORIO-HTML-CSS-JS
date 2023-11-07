function respuestaRuta(arregloPiramide) {
    const caminoMasPesado = encontrarRutaMasPesada(arregloPiramide);
    let caminoLegible = [];

    for (let i = 0; i < caminoMasPesado.length; i++) {
        caminoLegible.push(arregloPiramide[i][caminoMasPesado[i]]);
    }

    let elemento2 = "";

    for (let i = 0; i < caminoLegible.length; i++) {
        elemento2 += '<div class="Blocks-Two Path">' + caminoLegible[i] + '</div>';
    }

    document.getElementById("respuesta").innerHTML = elemento2;
    console.log("Camino más pesado (valores):", caminoLegible);
    console.log("Camino más pesado (suma):", sumaCaminoMasPesado);
}
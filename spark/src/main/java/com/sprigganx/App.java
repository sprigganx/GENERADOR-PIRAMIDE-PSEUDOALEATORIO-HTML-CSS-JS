package com.sprigganx;

import static spark.Spark.*;
import org.json.JSONArray;
import org.json.JSONObject;
import java.util.ArrayList;

public class App {

    private static ArrayList<String> historialPiramides = new ArrayList<>();
    private static ArrayList<String> historialRutas = new ArrayList<>();

    public static void main(String[] args) {

        System.out.println("Ejecutando en el puerto: 4567");
        habilitarCors();

        post("/piramides/pyramid", (req, res) -> {
            res.type("application/json");

            // Obtener datos del cuerpo de la solicitud
            JSONObject json = new JSONObject(req.body());
            // Acceder a los datos de pyramid
            String piramide = json.getString("pyramid");
            almacenarPiramide(piramide);

            // Enviar respuesta al frontend(Para ver si sirve xd)
            //Actu: si funcionó xd
            JSONObject responseJson = new JSONObject();
            responseJson.put("message", "Piramide recibida correctamente en el backend");
            return responseJson.toString();
        });

        post("/piramides/answer", (req, res) -> {
            res.type("application/json");
            JSONObject json = new JSONObject(req.body());

            String respuesta = json.getString("answer");
            almacenarRuta(respuesta);

            JSONObject responseJson = new JSONObject();
            responseJson.put("message", "Rutas recibidas correctamente en el backend");
            return responseJson.toString();
        });

        // Endpoint para obtener historial de las pirámides
        get("/historialPiramides", (req, res) -> {
            res.type("application/json");
            return obtenerHistorialPiramides().toString();
        });

        // Endpoint para obtener historial de las rutas
        get("/historialRutas", (req, res) -> {
            res.type("application/json");
            return obtenerHistorialRutas().toString();
        });
    }

    private static void almacenarRuta(String respuesta) {
        historialRutas.add(respuesta);
    }

    private static void almacenarPiramide(String piramide) {
        historialPiramides.add(piramide);
    }

    private static JSONArray obtenerHistorialPiramides() {
        return new JSONArray(historialPiramides);
    }

    private static JSONArray obtenerHistorialRutas() {
        return new JSONArray(historialRutas);
    }


    private static void habilitarCors() {
        options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }

            return "OK";
        });

        before((request, response) -> response.header("Access-Control-Allow-Origin", "*"));
    }
}

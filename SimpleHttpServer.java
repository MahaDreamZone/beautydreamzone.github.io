import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

import java.io.*;
import java.net.InetSocketAddress;
import java.util.Map;

public class SimpleHttpServer {
    public static void main(String[] args) throws IOException {
        // Create a new HTTP server on port 8000
        HttpServer server = HttpServer.create(new InetSocketAddress(8000), 0);

        // Create a context for the root path "/"
        server.createContext("/", new HttpHandler() {
            public void handle(HttpExchange exchange) throws IOException {
                // Get the request URI
                String uri = exchange.getRequestURI().toString();

                // Default to serving index.html
                if (uri.equals("/") || uri.equals("/index.html")) {
                    serveFile(exchange, "index.html");
                } else {
                    // Serve other static files
                    serveFile(exchange, uri.substring(1)); // Remove the leading "/"
                }
            }
        });

        // Start the server
        server.start();

        System.out.println("Server started on port 8000");
    }

    // Helper method to serve static files
    private static void serveFile(HttpExchange exchange, String filename) throws IOException {
        // Load the file from the file system
        File file = new File(filename);
        if (!file.exists()) {
            // File not found, return a 404 response
            String response = "File not found";
            exchange.sendResponseHeaders(404, response.length());
            OutputStream output = exchange.getResponseBody();
            output.write(response.getBytes());
            output.close();
            return;
        }

        // Set the content type based on the file extension
        String contentType = "text/html"; // Default to HTML
        if (filename.endsWith(".css")) {
            contentType = "text/css";
        } else if (filename.endsWith(".js")) {
            contentType = "application/javascript";
        }

        // Set the response headers
        exchange.getResponseHeaders().set("Content-Type", contentType);
        exchange.sendResponseHeaders(200, 0);

        // Write the file to the response body
        OutputStream output = exchange.getResponseBody();
        FileInputStream input = new FileInputStream(file);
        byte[] buffer = new byte[1024];
        int bytesRead;
        while ((bytesRead = input.read(buffer)) != -1) {
            output.write(buffer, 0, bytesRead);
        }
        input.close();
        output.close();
    }
}

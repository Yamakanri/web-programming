/*import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Properties;
import java.util.Scanner;

public class TestRequest {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);


        System.out.print("Введите строку запроса (например, ?x=0.5&y=3&r=100): ");
        String queryString = scanner.nextLine();


        Properties params = new Properties();
        params.setProperty("QUERY_STRING", queryString.substring(1)); // Убираем '?'

        try {

            RequestHandler requestHandler = new RequestHandler();
            Request request = requestHandler.handle(params);


            RequestProcessor requestProcessor = new RequestProcessor();
            boolean result = requestProcessor.process(request);


            String jsonResponse = buildSuccessResponse(result);
            String httpResponse = buildHttpResponse(200, "OK", jsonResponse);
            System.out.println("Ответ клиента:\n" + httpResponse);
        } catch (Exception e) {

            String jsonErrorResponse = buildErrorResponse(e.getMessage());
            String httpErrorResponse = buildHttpResponse(400, "Bad Request", jsonErrorResponse);
            System.out.println("Ответ клиента:\n" + httpErrorResponse);
        } finally {
            scanner.close();
        }
    }

    private static String buildSuccessResponse(boolean result) {
        Instant executionStart = Instant.now();
        long executionTimeNs = Duration.between(executionStart, Instant.now()).toNanos();
        String currentTime = DateTimeFormatter.ofPattern("HH:mm:ss").format(LocalDateTime.now());
        return String.format("{\"result\": %b, \"execution_time_ns\": %d, \"current_time\": \"%s\"}",
                result, executionTimeNs, currentTime);
    }

    private static String buildErrorResponse(String errorMessage) {
        return String.format("{\"error\": \"%s\"}", errorMessage);
    }

    private static String buildHttpResponse(int statusCode, String statusMessage, String json) {
        return String.format("HTTP/1.1 %d %s\nContent-Type: application/json\nAccess-Control-Allow-Origin: *\n" +
                        "Access-Control-Allow-Methods: GET\nAccess-Control-Allow-Headers: *\n" +
                        "Access-Control-Allow-Credentials: true\nContent-Length: %d\n\n%s",
                statusCode, statusMessage, json.getBytes(StandardCharsets.UTF_8).length, json);
    }
}

 */

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class ResponseBuilder {
    public String buildSuccessResponse(boolean result, Instant executionStart) {
        long executionTimeNs = Duration.between(executionStart, Instant.now()).toNanos();
        String currentTime = DateTimeFormatter.ofPattern("HH:mm:ss").format(LocalDateTime.now());
        return String.format("{\"result\": %b, \"execution_time_ns\": %d, \"current_time\": \"%s\"}",
                result, executionTimeNs, currentTime);
    }

    public String buildErrorResponse(String errorMessage) {
        return String.format("{\"error\": \"%s\"}", errorMessage);
    }

    public String buildHttpResponse(int statusCode, String statusMessage, String json) {
        return String.format("HTTP/1.1 %d %s\nContent-Type: application/json\nAccess-Control-Allow-Origin: *\n" +
                        "Access-Control-Allow-Methods: GET\nAccess-Control-Allow-Headers: *\n" +
                        "Access-Control-Allow-Credentials: true\nContent-Length: %d\n\n%s",
                statusCode, statusMessage, json.getBytes(StandardCharsets.UTF_8).length, json);
    }
}


import java.time.Instant;

public class ResponseSender {
    private final ResponseBuilder responseBuilder = new ResponseBuilder();

    public void sendResponse(boolean result) {
        Instant executionStart = Instant.now();
        String json = responseBuilder.buildSuccessResponse(result, executionStart);
        send(responseBuilder.buildHttpResponse(200, "OK", json));
    }

    public void sendError(String errorMessage) {
        String json = responseBuilder.buildErrorResponse(errorMessage);
        send(responseBuilder.buildHttpResponse(400, "Bad Request", json));
    }

    private void send(String response) {
        System.out.println(response);
    }
}



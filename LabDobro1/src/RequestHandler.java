import java.util.HashMap;
import java.util.Properties;

public class RequestHandler {
    private final RequestValidator requestValidator = new RequestValidator();

    public Request handle(Properties params) throws Exception {
        Request request = new Request(params);
        requestValidator.validate(request);
        return request;
    }
}

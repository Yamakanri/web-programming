import java.util.HashMap;
import java.util.Properties;

public class Request {
    private final HashMap<String, Object> parameters = new HashMap<>();
    private final HashMap<String, Object> body = new HashMap<>();

    public Request(Properties params) {
        fillParameters(params);
        fillBody(params);
    }

    private void fillParameters(Properties params) {
        String queryString = params.getProperty("QUERY_STRING");
        if (queryString != null && !queryString.isEmpty()) {
            String[] pairs = queryString.split("&");
            for (String pair : pairs) {
                String[] keyValue = pair.split("=");
                parameters.put(keyValue[0], keyValue.length > 1 ? keyValue[1] : "");
            }
        }
    }

    private void fillBody(Properties params) {
    }

    public HashMap<String, Object> getParameters() {
        return parameters;
    }

    public HashMap<String, Object> getBody() {
        return body;
    }
}

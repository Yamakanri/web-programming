package utilities;

import jakarta.servlet.http.HttpServletRequest;


public class Validator {

    public static boolean validate(HttpServletRequest request) {
        ParsedRequest parsedRequest = RequestParser.requestParse(request);
        float x = parsedRequest.getX();
        float y = parsedRequest.getY();
        float r = parsedRequest.getR();
        return x >= -5.0 && x <= 3.0 && y >= -5.0 && y <= 3.0 && r >= 1 && r <= 4;
    }
}

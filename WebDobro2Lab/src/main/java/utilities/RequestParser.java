package utilities;

import jakarta.servlet.http.HttpServletRequest;


public class RequestParser {

    public static ParsedRequest requestParse(HttpServletRequest request) {
        String xParam = request.getParameter("x");
        String yParam = request.getParameter("y");
        String rParam = request.getParameter("r");


        float x = (xParam != null && !xParam.isEmpty()) ? Float.parseFloat(xParam) : 0;
        float y = (yParam != null && !yParam.isEmpty()) ? Float.parseFloat(yParam) : 0;
        float r = (rParam != null && !rParam.isEmpty()) ? Float.parseFloat(rParam) : 0;

        return new ParsedRequest(x, y, r);
    }
}


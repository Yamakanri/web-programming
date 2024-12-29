package graph;
import utilities.ParsedRequest;
import utilities.RequestParser;
import jakarta.servlet.http.HttpServletRequest;
import static graph.HitValidator.checkHit;


public class PointFactory {
    public static Point createPoint(HttpServletRequest request){
        ParsedRequest parsedRequest = RequestParser.requestParse(request);
        float x = parsedRequest.getX();
        float y = parsedRequest.getY();
        float r = parsedRequest.getR();
        return new Point(x, y, r, checkHit(x,y,r));
    }
}

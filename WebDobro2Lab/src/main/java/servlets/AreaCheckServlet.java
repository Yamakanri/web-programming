package servlets;

import beans.ResultStorage;
import graph.Point;
import graph.PointFactory;
import java.io.IOException;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/AreaCheckServlet")
public class AreaCheckServlet extends HttpServlet {


    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {

            Instant executionStart = Instant.now();
            String formattedTime = DateTimeFormatter.ofPattern("HH:mm:ss").format(LocalTime.now());

            Point result = PointFactory.createPoint(request);

            result.setTime(formattedTime);
            result.setExecutionTime(Duration.between(executionStart, Instant.now()).toNanos() / 1_000_000.0);

            ResultStorage resultStorage = (ResultStorage) request.getSession().getAttribute("resultStorage");
            
            if (resultStorage == null) {
                resultStorage = new ResultStorage();
                request.getSession().setAttribute("resultStorage", resultStorage);}

            resultStorage.addResult(result);

            response.getWriter().write("{\"status\":\"OK\"}");
            response.setStatus(HttpServletResponse.SC_OK);

        } catch (NumberFormatException e) {
            response.getWriter().write("{\"status\":\"Error on Server\"}");
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);}
    }
}

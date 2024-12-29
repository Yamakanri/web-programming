package servlets;
import jakarta.servlet.annotation.WebServlet;
import utilities.Validator;


import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;



@WebServlet("/ControllerServlet")
public class ControllerServlet extends HttpServlet{

@Override
protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
    handleRequest(request, response);}

@Override
protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setStatus(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
    response.getWriter().write("Этот сервлет работает только с POST-запросами.");}


private void handleRequest(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
    try {

    if (Validator.validate(request)){
        request.getRequestDispatcher("AreaCheckServlet").forward(request, response);}
    else{
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
    response.sendRedirect("error-joke.jsp?error=400");}

    } catch (ServletException e) {
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        response.sendRedirect("error-joke.jsp?error=400");}
}
}

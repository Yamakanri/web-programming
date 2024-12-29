import com.fastcgi.FCGIInterface;

public class Main {
    public static void main(String[] args) {
        FCGIInterface fcgiInterface = new FCGIInterface();
        RequestHandler requestHandler = new RequestHandler();
        RequestProcessor requestProcessor = new RequestProcessor();
        ResponseSender responseSender = new ResponseSender();

        while (fcgiInterface.FCGIaccept() >= 0) {
            try {
                // 1 БЛОК ЛОГИКИ
                Request request = requestHandler.handle(FCGIInterface.request.params);

               // 2 БЛОК ЛОГИКИ
                boolean result = requestProcessor.process(request);

               //3 БЛОК ЛОГИКИ
                responseSender.sendResponse(result);
            } catch (Exception e) {
                // 3 БЛОК ОШИБКИ
                responseSender.sendError(e.getMessage());
            }
        }
    }
}

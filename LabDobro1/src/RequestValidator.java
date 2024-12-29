public class RequestValidator {
    public void validate(Request request) throws Exception {
        if (!request.getParameters().containsKey("x") || !request.getParameters().containsKey("y") || !request.getParameters().containsKey("r")) {
            throw new Exception("Missing necessary query param");
        }
        try {
            Float.parseFloat(request.getParameters().get("x").toString());
            Float.parseFloat(request.getParameters().get("y").toString());
            Integer.parseInt(request.getParameters().get("r").toString());
        } catch (NumberFormatException e) {
            throw new Exception("Wrong query param type");
        }
        try {

            int r = Integer.parseInt(request.getParameters().get("r").toString());
            if (r < 1 || r > 5) {
                throw new Exception("Incorrect parameter R");
            }


            float x = Float.parseFloat(request.getParameters().get("x").toString());
            float y = Float.parseFloat(request.getParameters().get("y").toString());

            if (x < -2.0 || x > 2.0) {
                throw new Exception("Incorrect parameter X");
            }
            if (y < -5.0 || y > 5.0) {
                throw new Exception("Incorrect parameter Y");
            }
        } catch (NumberFormatException e) {
            throw new Exception("Wrong query param type for x, y, or r");
        }
    }
}

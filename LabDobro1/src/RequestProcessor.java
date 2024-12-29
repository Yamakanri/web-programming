public class RequestProcessor {
    private final Validator validator = new Validator();

    public boolean process(Request request) {

        float x = Float.parseFloat(request.getParameters().get("x").toString());
        float y = Float.parseFloat(request.getParameters().get("y").toString());
        int r = Integer.parseInt(request.getParameters().get("r").toString());

        return validator.validate(x, y, r);
    }
}

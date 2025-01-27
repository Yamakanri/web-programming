package utilities;

public class Parser {

    public static float parse(String value) {
        try {
            return Float.parseFloat(value);
        } catch (NumberFormatException e) {
            return Float.NaN;
        }
    }
}

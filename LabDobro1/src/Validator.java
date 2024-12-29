public class Validator {
    public boolean validate(float x, float y, int r) {
        return isInBounds(x, y, r) && (triangleHit(x, y, r) || circleHit(x, y, r) || squareHit(x, y, r));
    }

    private boolean isInBounds(float x, float y, int r) {
        return x >= -2.0 && x <= 2.0 && y >= -5.0 && y <= 5.0 && r >= 1 && r <= 5;
    }

    private boolean triangleHit(float x, float y, int r) {
        x /= r;
        y /= r;
        return y >= -0.5 && x >= 0 && y <= -x + 0.5;
    }

    private boolean circleHit(float x, float y, int r) {
        return y >= 0 && x <= 0 && x * x + y * y <= r * r;
    }

    private boolean squareHit(float x, float y, int r) {
        x /= r;
        y /= r;
        return y >= 0 && x >= 0 && x <= 1  && y <= 0.5;
    }
}

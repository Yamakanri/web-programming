package utilities;

import java.io.Serializable;

public class HitValidator implements Serializable {
    public static boolean checkHit(float x, float y, float r) {
        return triangleHit(x / r, y / r) || circleHit(x/r, y/r, r) || squareHit(x / r, y / r);}


    private static boolean triangleHit(float x, float y) {
        return x >= -1 && x <= 0 && y >= 0 && y <= 0.5 * (x + 1);}

    private static boolean circleHit(float x, float y, float r) {
        return x >= 0 && y >= 0 && (x * x + y * y) <= 0.25;
    }

    private static boolean squareHit(float x, float y) {
        return x <= 0 && x >= -0.5 && y <= 0 && y >= -1;
    }
}

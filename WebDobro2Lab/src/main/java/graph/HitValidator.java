package graph;

public class HitValidator {
    public static boolean checkHit(float x, float y, float r) {
        return triangleHit(x / r, y / r) || circleHit(x, y, r) || squareHit(x / r, y / r);}


    private static boolean triangleHit(float x, float y) {
        return y >= -0.5 && x >= 0 && y<0 && x <= y + 0.5;}

    private static boolean circleHit(float x, float y, float r) {
        return y >= 0 && x <= 0 && x * x + y * y<= r * r;
    }

    private static boolean squareHit(float x, float y) {
        return x>0 && x<=1 && y>0 && y<=0.5;}
}

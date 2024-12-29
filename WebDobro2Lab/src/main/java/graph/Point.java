package graph;


public class Point {
    private final float x;
    private final float y;
    private final float r;
    private final boolean isHit;
    private String time;
    private double executionTime;

    public Point(float x, float y, float r, boolean isHit){
        this.x = x;
        this.y = y;
        this.r = r;
        this.isHit = isHit;
    }


    public float getX() {
        return x;
    }

    public float getY() {
        return y;
    }

    public float getR() {
        return r;
    }

    public boolean getIsHit() {
        return isHit;
    }

    public String getTime() {
        return time;
    }

    public double getExecutionTime() {
        return executionTime;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public void setExecutionTime(double executionTime) {
        this.executionTime = executionTime;
    }
}

package utilities;


public class Point {
    private final float x;
    private final float y;
    private final float r;
    private final boolean isHit;
    private String time;
    private float executionTime;

    public Point(float x, float y, float r, boolean isHit, String time, float executionTime){
        this.x = x;
        this.y = y;
        this.r = r;
        this.isHit = isHit;
        this.time = time;
        this.executionTime = executionTime;

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

    public float getExecutionTime() {
        return executionTime;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public void setExecutionTime(float executionTime) {
        this.executionTime = executionTime;
    }


    @Override
    public String toString() {
        return "Point{" +
                "x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", isHit=" + isHit +
                ", time='" + time + '\'' +
                ", executionTime=" + executionTime +
                '}';
    }
}

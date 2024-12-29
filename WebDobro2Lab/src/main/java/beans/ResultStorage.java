package beans;

import graph.Point;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;


public class ResultStorage implements Serializable {
    private static final long serialVersionUID = 133233L;
    private List<Result> results;


    public ResultStorage() {
        this.results = new ArrayList<>();
    }

    public void addResult(Point point) {
        Result result = new Result(
                point.getX(),
                point.getY(),
                point.getR(),
                point.getIsHit(),
                point.getExecutionTime(),
                point.getTime()
        );
        this.results.add(result);}

    public List<Result> getResults() {
        return results;
    }




    public static class Result implements Serializable {
        private static final long serialVersionUID = 23233L;
        private float x;
        private float y;
        private float r;
        private boolean isHit;
        private double executionTime;
        private String time;

        public Result(float x, float y, float r, boolean isHit, double executionTime, String time) {
            this.x = x;
            this.y = y;
            this.r = r;
            this.isHit = isHit;
            this.executionTime = executionTime;
            this.time = time;
        }
        public Result(){}

        public float getX() { return x; }
        public float getY() { return y; }
        public float getR() { return r; }
        public boolean getIsHit() {
            return isHit;
        }
        public double getExecutionTime() { return executionTime; }
        public String getTime() { return time; }
    }
}

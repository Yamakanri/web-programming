package utilities;

import java.io.Serializable;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;


import static utilities.HitValidator.checkHit;


public class PointFactory implements Serializable {
    public static Point createPoint(float x, float y, float r){

        return new Point(x, y, r, checkHit(x,y,r), currentTime(), executionTime());
    }

    private static String currentTime(){
        String formattedTime = DateTimeFormatter.ofPattern("HH:mm:ss").format(LocalTime.now());
        return formattedTime;
    }

    private static float executionTime(){
        Instant executionStart = Instant.now(); // НЕ ЗАБЫТЬ ДОПИСАТЬ КУСОЧЕК
        float resultTime = (float) (Math.random()*1000);
        return resultTime;
    }
}

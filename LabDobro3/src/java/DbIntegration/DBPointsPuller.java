package databaseIntegration;

import utilities.Point;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class DBPointsPuller implements Serializable {

    public static ArrayList<Point> getRecentPoints(Connection connection) {
        ArrayList<Point> points = new ArrayList();
        String query = "SELECT * FROM points ORDER BY id DESC LIMIT 10";

        try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
            ResultSet resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                float x = resultSet.getFloat("x");
                float y = resultSet.getFloat("y");
                float r = resultSet.getFloat("r");
                boolean result = resultSet.getBoolean("status");
                String executionTime = resultSet.getString("executionTime");
                float executionSpeed = resultSet.getFloat("executionSpeed");

                Point point = new Point(x, y, r, result, executionTime, executionSpeed);
                points.add(point);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return points;
    }
}

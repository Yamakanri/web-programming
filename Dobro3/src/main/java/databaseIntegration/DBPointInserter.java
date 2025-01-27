package databaseIntegration;

import utilities.Point;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class DBPointInserter implements Serializable {

    public static void insertPoint(Connection connection, Point point) {
        String insertSQL = "INSERT INTO points (x, y, r, status, executionTime, executionSpeed) VALUES (?, ?, ?, ?, ?, ?)";
        try (PreparedStatement preparedStatement = connection.prepareStatement(insertSQL)) {
            preparedStatement.setDouble(1, point.getX());
            preparedStatement.setDouble(2, point.getY());
            preparedStatement.setDouble(3, point.getR());
            preparedStatement.setBoolean(4, point.getIsHit());
            preparedStatement.setString(5, point.getTime());
            preparedStatement.setFloat(6, point.getExecutionTime());
            preparedStatement.executeUpdate();
            System.out.println("Точка успешно загружена: " + point);
        } catch (SQLException e) {
            System.out.println("Ошибка при загрузке точки: " + e.getMessage());
            e.printStackTrace();
        }
    }
}

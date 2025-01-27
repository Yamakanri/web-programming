package databaseIntegration;

import java.io.Serializable;
import java.sql.SQLException;
import java.sql.*;

public class DBCreator {
    public static void createTable(Connection conn) throws SQLException {
        String query = "CREATE TABLE IF NOT EXISTS points (" +
                "id SERIAL PRIMARY KEY, " +
                "x DECIMAL NOT NULL, " +
                "y DECIMAL NOT NULL, " +
                "r DECIMAL NOT NULL, " +
                "status BOOLEAN NOT NULL, " +
                "executionTime VARCHAR(40), " +
                "executionSpeed FLOAT NOT NULL" +
                ");";

        try (Statement statement = conn.createStatement()) {
            statement.execute(query);
            System.out.println("Таблица создана или уже существует.");
        } catch (SQLException e) {
            System.out.println("Ошибка при создании таблицы: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }
}

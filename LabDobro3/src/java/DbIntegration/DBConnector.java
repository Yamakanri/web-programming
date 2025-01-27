package databaseIntegration;

import jakarta.inject.Named;

import jakarta.enterprise.context.SessionScoped;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnector implements Serializable {


    private static final String DB_URL = "jdbc:postgresql://database:5432/mydatabase";
    private static final String USER = "myuser";
    private static final String PASSWORD = "mypassword";


    public Connection getConnection() throws SQLException, ClassNotFoundException {

        try {
            if (Class.forName("org.postgresql.Driver") != null) {
                System.out.println("Драйвер PostgreSQL успешно загружен!");
            }
        } catch (ClassNotFoundException e) {
            System.out.println("Не удалось загрузить драйвер PostgreSQL.");
            throw e;
        }
        return DriverManager.getConnection(DB_URL, USER, PASSWORD);
    }
}

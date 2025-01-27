package beans;

import databaseIntegration.DBConnector;
import databaseIntegration.DBCreator;
import databaseIntegration.DBPointsPuller;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import utilities.Point;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;

@Named("TableControllerBean")
@SessionScoped
public class TableControllerBean implements Serializable {
    private ArrayList<Point> points = new ArrayList<>();
    @Inject
    DBConnector dbConnector;

    public TableControllerBean() {

    }

    public ArrayList<Point> getPoints() {
        try (Connection connection = dbConnector.getConnection()) {
            DBCreator.createTable(connection);
            points = DBPointsPuller.getRecentPoints(connection);
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        }
        return points;
    }









    //Только для теста - удалить потом
    public void setDbConnector(DBConnector dbConnector) {
        this.dbConnector = dbConnector;
    }
}
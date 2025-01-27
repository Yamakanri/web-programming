package beans;


import databaseIntegration.DBConnector;
import databaseIntegration.DBCreator;
import databaseIntegration.DBPointInserter;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import utilities.InputValidator;
import utilities.Parser;
import utilities.Point;
import utilities.PointFactory;
import java.io.Serializable;
import java.sql.Connection;
import java.sql.SQLException;


@Named("FormControllerBean")
@SessionScoped
public class FormControllerBean implements Serializable {

    private String userX;
    private String userY;
    private String userR;

    @Inject
    private DBConnector dbConnector;
    @Inject
    private ErrorControllerBean errorControllerBean;
    @Inject
    private InputValidator inputValidator;


    public FormControllerBean() {}

    public String getUserX() { return userX; }
    public void setUserX(String userX) { this.userX = userX; }

    public String getUserY() { return userY; }
    public void setUserY(String userY) { this.userY = userY; }

    public String getUserR() { return userR; }
    public void setUserR(String userR) { this.userR = userR; }

    public void checkAndUpload() {
        if (!inputValidator.validateInputs(userX, userY, userR)) {
            errorControllerBean.setErrorMessage(inputValidator.getErrorMessage());
            return;
        }
        System.out.println("Запуск БД и начало загрузки точки");
        tableCreation();
        pointManipulation();
    }

    public void tableCreation() {
        try (Connection connection = dbConnector.getConnection()) {
            DBCreator.createTable(connection);
        } catch (SQLException | ClassNotFoundException e) {
            System.out.println("Ошибка при создании таблицы: " + e.getMessage());
        }
    }

    public void pointManipulation() {
        try (Connection connection = dbConnector.getConnection()) {
            Point result = PointFactory.createPoint(Parser.parse(userX), Parser.parse(userY), Parser.parse(userR));
            DBPointInserter.insertPoint(connection, result);
            System.out.println("В БД загружено: " + result);
        } catch (SQLException | ClassNotFoundException e) {
            System.out.println("Ошибка загрузки точки: " + e.getMessage());
        }
    }
}

package utilities;

import beans.ErrorControllerBean;
import jakarta.inject.Inject;

import java.io.Serializable;

public class InputValidator implements Serializable {


    @Inject
    ErrorControllerBean errorControllerBean;
    private String errorMessage;


    public boolean validateInputs(String userX, String userY, String userR) {
        errorMessage = null;

        if (userX == null || userY == null || userR == null) {
            errorMessage = "Выбраны не все поля!";
            return false;
        }

        return isInRange(userX, -4, 4, "X") &&
                isInRange(userY, -5, 3, "Y") &&
                isInRange(userR, 1, 3, "R");
    }


    public String getErrorMessage() {
        return errorMessage;
    }


    private boolean isInRange(String value, float min, float max, String fieldName) {
        float parsedValue = Parser.parse(value);
        if (Float.isNaN(parsedValue) || parsedValue < min || parsedValue > max) {
           errorControllerBean.setErrorMessage("Некорректное значение для поля " + fieldName);
            return false;
        }
        return true;
    }


}

package beans;


import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;

import java.io.Serializable;

@Named("ErrorControllerBean")
@SessionScoped
public class ErrorControllerBean implements Serializable {
    private String errorMessage;

    ErrorControllerBean(){}
    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}

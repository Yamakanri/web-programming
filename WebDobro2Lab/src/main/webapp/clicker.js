function handleClick(event) {
    var radius = parseFloat(document.getElementById("r").value);
    if (isNaN(radius) || radius <= 0) {
        displayError("Please, choose the R before clicking on the area");
        return;
    }
    if (radius<1 || radius >4) {
        displayError("Please, choose the R in between [1, 4]");
        return;
    }

    clearError();

    const canvas = document.getElementById("myCanvas");
    const rect = canvas.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;


    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const normalizedX = (clickX - centerX) / (canvas.width / 2);
    const normalizedY = (centerY - clickY) / (canvas.height / 2);

    console.log('Click coordinates:', { clickX, clickY });
    console.log('Normalized coordinates:', { normalizedX, normalizedY });

    const x = ((normalizedX * radius)/4)*5
    const y = ((normalizedY * radius)/4)*5;

    console.log('Scaled coordinates:', { x, y });

    if (x < -5 || x > 3) {
        displayError("X must be in [-5, 3] interval");
        return;
    } else if (y < -5 || y > 3) {
        displayError("Y must be in [-5, 3] interval");
        return;
    }

    clearError();
    sendDataToServer({ x: x.toFixed(2), y: y.toFixed(2), r: radius });
}

function displayError(message) {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = message;
}


function clearError() {
    const errorMessageElement = document.getElementById('error-message');
    errorMessageElement.textContent = '';
}

if (window.pointsData) {
    console.log("Points for drawing:", window.pointsData);

} else {
    console.log("Data not found");
}

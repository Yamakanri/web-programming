function handleClick(event) {
    var radius = parseFloat(document.getElementById("r").value);
    if (isNaN(radius) || radius <= 0) {
        displayError("Please, choose the R before clicking on the area");
        return;
    }

    clearError(); // Убираем сообщение об ошибке, если всё корректно

    const canvas = document.getElementById("myCanvas");
    const rect = canvas.getBoundingClientRect(); // Получаем размеры канваса
    const clickX = event.clientX - rect.left; // Координата X клика
    const clickY = event.clientY - rect.top;  // Координата Y клика

   
    const centerX = canvas.width / 2; // Центр по оси X
    const centerY = canvas.height / 2; // Центр по оси Y

    // Преобразуем координаты клика в логические значения относительно новой точки отсчета
    const normalizedX = (clickX - centerX) / (canvas.width / 2); // Нормализуем в диапазон от -1 до 1
    const normalizedY = (centerY - clickY) / (canvas.height / 2); // Нормализуем в диапазон от -1 до 1

    console.log('Click coordinates:', { clickX, clickY });
    console.log('Normalized coordinates:', { normalizedX, normalizedY });

    // Масштабируем эти нормализованные координаты на радиус, чтобы получить физические значения
    const x = ((normalizedX * radius)/4)*5 // Масштабируем по оси X
    const y = ((normalizedY * radius)/4)*5; // Масштабируем по оси Y

    console.log('Scaled coordinates:', { x, y });

    // Проверка, что точка внутри допустимого диапазона
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

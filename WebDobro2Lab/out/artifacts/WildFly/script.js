document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM-контент загружен...");
    initializeXButtons();  // Инициализация кнопок X
    initializeSubmitButton(); // Инициализация кнопки отправки

});

// Массив для хранения точек
let points = [];

// Функция для установки X
let selectedX = null;

function setX(value) {
    selectedX = value; // Сохраняем выбранное значение X
    console.log('Выбранный X:', selectedX);

    const xValueInput = document.getElementById('x_value');
    xValueInput.value = value;

    // Убираем выделение со всех кнопок
    const xButtons = document.querySelectorAll('.button-options');
    xButtons.forEach(button => button.removeAttribute('data-selected'));

    // Устанавливаем выделение на текущей кнопке
    const selectedButton = document.querySelector(`.button-options[value="${value}"]`);
    if (selectedButton) {
        selectedButton.setAttribute('data-selected', 'true');
    }
}

function updateYValue() {
    const yInput = document.getElementById('y');
    const yValueInput = document.getElementById('y_value');
    yValueInput.value = yInput.value;  // Сохраняем значение Y в скрытое поле
    console.log('Выбранное значение Y:', yInput.value);
}

// Добавляем слушатель для изменения поля Y
document.getElementById('y').addEventListener('input', updateYValue);

// Инициализация кнопок X
function initializeXButtons() {
    const xButtons = document.querySelectorAll('.button-options');
    xButtons.forEach(button => {
        button.addEventListener('click', () => {
            setX(button.value); // При клике на кнопку вызываем setX
        });
    });
}

// Инициализация кнопки отправки
function initializeSubmitButton() {
    document.querySelector('.submit-button').addEventListener('click', handleSubmit);
}

// Обработчик отправки формы
function handleSubmit() {
    // Получение выбранного X
    const xButton = document.querySelector('.button-options[data-selected="true"]');
    const x = xButton ? parseFloat(xButton.value) : null;

    // Получение Y из текстового поля
    const y = parseFloat(document.getElementById('y').value);

    // Получение R из текстового поля
    const r = parseFloat(document.getElementById('r').value);

    console.log('X:', x, 'Y:', y, 'R:', r); // Лог для отладки

    // Валидация входных данных
    const errorMessage = validateInputs(x, y, r);
    if (errorMessage) {
        document.getElementById('error-message').textContent = errorMessage;
        return;
    }

    // Очистка сообщения об ошибке
    document.getElementById('error-message').textContent = '';

    // Формирование данных для отправки
    const data = { x, y, r };

    // Отправка данных на сервер
    sendDataToServer(data);

    // Сохраняем точку в массив
    points.push({ x, y, r });

    // Обновляем таблицу (и график)
    updateTable();
}

// Валидация данных
function validateInputs(x, y, r) {
    if (x === null || isNaN(y) || isNaN(r)) {
        return 'Fill all the fields correctly';
    }
    if (y < -5 || y > 3) {
        return 'Y must be in between -5 and 3.';
    }
    if (r < 1 || r > 4) {
        return 'R must be in beеween 1 and 4.';
    }
    return '';
}

// Отправка данных на сервер
function sendDataToServer(data) {
    const { x, y, r } = data;
    const servletUrl = 'http://localhost:8080/WebDobro2Lab-1.0-SNAPSHOT/ControllerServlet'; // Укажите путь к вашему сервлету

    const xhr = new XMLHttpRequest();
    xhr.open('POST', servletUrl, true);

    // Устанавливаем заголовок Content-Type
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // Формируем параметры запроса
    const params = `x=${encodeURIComponent(x)}&y=${encodeURIComponent(y)}&r=${encodeURIComponent(r)}`;

    // Обработка ответа от сервлета
    xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    console.log('Ответ сервлета:', response);

                    if (response.status === "OK") {
                        // Обновляем таблицу только если статус OK
                        updateTable();
                    } else {
                        console.error('Сервер вернул ошибку:', response);
                    }
                } catch (e) {
                    console.error('Ошибка обработки ответа сервлета:', e);
                }
            } else {
                console.error('Ошибка запроса:', xhr.status, xhr.statusText);
            }
        }
    };

    // Отправка данных на сервлет
    xhr.send(params);
}

// Функция для обновления таблицы
function updateTable() {
    fetch('table-result.jsp', { method: 'GET' })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка загрузки таблицы: ${response.statusText}`);
            }
            return response.text();
        })
        .then(tableHTML => {
            const tableBody = document.querySelector('.rows');
            tableBody.innerHTML = tableHTML;

            // После обновления таблицы рисуем точки
            drawPointsFromTable();
        })
        .catch(error => {
            console.error('Ошибка при обновлении таблицы:', error);
        });
}

// Функция для отрисовки точек из таблицы на холсте
function drawPointsFromTable() {
    const tableRows = document.querySelectorAll('.rows tr');
    const rValue = parseFloat(document.querySelector('input[name="options"]:checked')?.value);

    if (isNaN(rValue)) {
        console.error("Не выбрано значение R. Точки не могут быть отображены.");
        return;
    }

    // Очищаем холст перед перерисовкой
    updateCanvas(rValue);

    tableRows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length < 3) return; // Убедимся, что есть хотя бы три столбца (X, Y, R)

        const x = parseFloat(cells[0].textContent.trim());
        const y = parseFloat(cells[1].textContent.trim());
        const r = parseFloat(cells[2].textContent.trim());

        if (!isNaN(x) && !isNaN(y) && !isNaN(r)) {
            drawPoint(x, y, rValue); // R берется из текущего состояния
        } else {
            console.warn('Некорректные данные для точки:', { x, y, r });
        }
    });
}
function sendForm() {
    const x = parseFloat(document.querySelector('input[name="x"]').value);
    const y = parseFloat(document.querySelector('input[name="y"]').value);
    const r = parseFloat(document.querySelector('input[name="options"]:checked')?.value);

    if (isNaN(x) || isNaN(y) || isNaN(r)) {
        console.error("Некорректные данные формы.");
        return;
    }

    fetch('add-point.jsp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `x=${x}&y=${y}&r=${r}`
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка отправки формы: ${response.statusText}`);
            }
            return response.text();
        })
        .then(() => {
            updateTable(); // Обновляем таблицу после успешной отправки данных
        })
        .catch(error => {
            console.error('Ошибка при отправке формы:', error);
        });
}

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
    const servletUrl = 'http://localhost:9798/WebDobro2Lab-1.0-SNAPSHOT/ControllerServlet'; // Укажите путь к вашему сервлету

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

// Массив для хранения всех нарисованных точек
let drawnPoints = [];

function drawPointsFromTable() {
    const canvas = document.getElementById('myCanvas');
    if (!canvas) {
        console.error("Холст не найден.");
        return;
    }
    const ctx = canvas.getContext('2d');

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const tableRows = document.querySelectorAll('.rows tr');
    if (tableRows.length === 0) {
        console.warn("Таблица пустая.");
        return;
    }

    // Получаем радиус из последней строки таблицы
    const lastRow = tableRows[tableRows.length - 1];
    const lastCells = lastRow.querySelectorAll('td, th');
    const lastR = parseFloat(lastCells[2]?.textContent.trim());
    if (isNaN(lastR)) {
        console.error("Некорректный радиус в последней строке таблицы.");
        return;
    }

    // Очищаем массив точек, чтобы избежать наложения старых
    drawnPoints = [];

    tableRows.forEach(row => {
        const cells = row.querySelectorAll('td, th');
        if (cells.length < 4) return; // Пропускаем строки с недостаточным числом ячеек

        const x = parseFloat(cells[0]?.textContent.trim());
        const y = parseFloat(cells[1]?.textContent.trim());
        const isHit = cells[3]?.textContent.trim().toLowerCase() === 'true'; // Проверяем значение hit

        if (!isNaN(x) && !isNaN(y)) {
            // Преобразуем координаты из логических в координаты холста
            const canvasX = centerX + (x / lastR) * (canvas.width / 2) * 4 / 5;
            const canvasY = centerY - (y / lastR) * (canvas.height / 2) * 4 / 5;

            // Устанавливаем цвет точки: зелёный для попаданий, чёрный для промахов
            const color = isHit ? "green" : "black";

            // Рисуем точку
            ctx.beginPath();
            ctx.arc(canvasX, canvasY, 5, 0, Math.PI * 2); // Радиус точки = 5 пикселей
            ctx.fillStyle = color;
            ctx.fill();
            ctx.closePath();

            // Добавляем точку в массив для отслеживания
            drawnPoints.push({ x: canvasX, y: canvasY, color: color });
        } else {
            console.warn('Некорректные данные для точки:', { x, y, lastR, isHit });
        }
    });
}

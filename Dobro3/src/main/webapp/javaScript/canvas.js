const points = [];



function initGraph(r) {
    const canvas = document.getElementById("graph-canvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const padding = 30;
    const scale = (canvas.width - 2 * padding) / (r * 2);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;


    drawGrid(ctx, centerX, centerY, r, scale);


    ctx.fillStyle = "rgb(255,0,0)";
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX - (r) * scale, centerY);
    ctx.lineTo(centerX, centerY - (r / 2) * scale);
    ctx.closePath();
    ctx.fill();


    ctx.fillStyle = "rgb(255,0,0)";
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, (r / 2) * scale, 1.5 * Math.PI, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();


    ctx.fillStyle = "rgba(255,0,0)";
    ctx.fillRect(centerX, centerY, -(r / 2) * scale, r * scale);


    ctx.strokeStyle = "#212227";
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(canvas.width, centerY);
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, canvas.height);
    ctx.stroke();


    ctx.fillStyle = "#212227";
    ctx.font = "bold 18px Courier New";
    drawAxisMarks(ctx, centerX, centerY, r, scale);


    points.forEach(point => {
        const graphX = centerX + point.x * scale;
        const graphY = centerY - point.y * scale;

        ctx.fillStyle = point.color || 'rgba(102,255,0,0.72)';
        ctx.beginPath();
        ctx.arc(graphX, graphY, 7, 0, 2 * Math.PI);
        ctx.fill();
    });


    canvas.onclick = function (event) {
        handleCanvasClick(event, r);
    };
}


function drawGrid(ctx, centerX, centerY, r, scale) {
    ctx.strokeStyle = "#d3d3d3";
    ctx.lineWidth = 0.5;


    for (let i = -r; i <= r; i += r / 10) {
        const y = centerY - i * scale;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(centerX * 2, y);
        ctx.stroke();
    }


    for (let i = -r; i <= r; i += r / 10) { // Уменьшаем шаг сетки
        const x = centerX + i * scale;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, centerY * 2);
        ctx.stroke();
    }
}

// Функция для отрисовки отметок на осях
function drawAxisMarks(ctx, centerX, centerY, r, scale) {
    ctx.strokeStyle = '#212227';
    ctx.beginPath();


    for (let i = -r; i <= r; i += r / 2) {
        const x = centerX + i * scale;
        ctx.moveTo(x, centerY - 5);
        ctx.lineTo(x, centerY + 5);
        ctx.stroke();
        if (i !== 0) {
            ctx.fillText(i.toFixed(2), x - 15, centerY + 25);
        }
    }


    for (let i = -r; i <= r; i += r / 2) {
        const y = centerY - i * scale;
        ctx.moveTo(centerX - 5, y);
        ctx.lineTo(centerX + 5, y);
        ctx.stroke();
        if (i !== 0) {
            ctx.fillText(i.toFixed(2), centerX + 15, y + 10);
        }
    }
}


function handleCanvasClick(event, r) {
    if (!r) {
        alert('Радиус не установлен. Укажите значение R.');
        return;
    }

    const canvas = document.getElementById('graph-canvas');
    const rect = canvas.getBoundingClientRect();

    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    const padding = 30;
    const scale = (canvas.width - 2 * padding) / (r * 2);
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const x = ((mouseX - centerX) / scale).toFixed(2);
    const y = -((mouseY - centerY) / scale).toFixed(2);

    const hit = isPointInArea(x, y, r);
    const color = hit ? "rgba(92,255,0,0.72)" : "black";
    points.push({ x: parseFloat(x), y: parseFloat(y), color: color });

    const yInput = document.getElementById('checkForm:hiddenY').value = y;
    const xInput = document.getElementById('checkForm:hiddenX').value = x;
    const rInput = document.getElementById('checkForm:hiddenR').value = r;
    document.getElementById('checkForm:checkButton').click();


    initGraph(r);

}
function handleFormSubmit(event) {
    event.preventDefault();

    const x = document.querySelector('input[name="point-form:x-value"]:checked').value.trim();
    const y = document.getElementById("point-form:y-value").value.trim();
    const r = document.getElementById("point-form:r-value").value.trim();
    console.log('points after submit:', x, y, r);

    if (y === null || isNaN(y)) {
        alert("Введите корректное значение Y!");
        return;
    }

    const hit = isPointInArea(x, y, r);
    const color = hit ? "rgba(252,137,163,0.72)" : "black";
    points.push({ x: parseFloat(x), y: parseFloat(y), color: color });

    console.log('points after submit:', points);

    initGraph(r);
}

function init() {
    const defaultR = 1;
    initGraph(defaultR);
    initButtonSubmit();
    document.querySelector('.button').addEventListener('click', handleFormSubmit);
}

function isPointInArea(x, y, r) {
    const normalizedX = x / r;
    const normalizedY = y / r;

    console.log('Checking point:', normalizedX, normalizedY);


    if (r < 1) return false;


    const isInCircle = normalizedX >= 0 && normalizedY >= 0 && (normalizedX * normalizedX + normalizedY * normalizedY <= 0.25);


    const isInTriangle = normalizedX >= -1 && normalizedX <= 0 && normalizedY >= 0 && normalizedY <= 0.5 * (normalizedX + 1);


    const isInRectangle = normalizedX <= 0 && normalizedX >= -0.5 && normalizedY <= 0 && normalizedY >= -1;


    return isInCircle || isInTriangle || isInRectangle;
}
function inRectangle(x, y) {
    return x <= 0 && x >= -0.5 && y <= 0 && y >= -1;
}

function inTriangle(x, y) {
    return x >= -1 && x <= 0 && y >= 0 && y <= 0.5 * (x + 1);
}
function inCircle(x, y) {
    return x >= 0 && y >= 0 && (x * x + y * y) <= 0.25;
}

window.updateGraph = function(radius) {
    const roundedRadius = roundToQuarter(radius);
    console.log("Обновляем график с R:", roundedRadius);
    initGraph(roundedRadius);
};

function roundToQuarter(value) {
    return Math.round(value * 4) / 4;
}


function initButtonSubmit() {
    document.addEventListener('click', function (event) {

        if (event.target && event.target.classList.contains('custom-button')) {
            const x = parseFloat(document.getElementById('point-form:X-spinner').value);
            const y = parseFloat(document.getElementById('point-form:yValue').value);
            const r = parseFloat(document.getElementById('checkForm:rValue').value);

            if (isNaN(x) || isNaN(y) || isNaN(r)) {
                return;
            }

            const hit = isPointInArea(x, y, r);
            points.push({ x: x, y: y, color: hit ? "rgba(92,255,0,0.72)" : "black" });


            initGraph(r);
        }
    });
}


window.onload = init;
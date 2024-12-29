window.onload = function () {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    const rInput = document.getElementById("r");

    function drawCanvas(r) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        const realR = 240;
        const drawR = parseFloat(r) || 1;
        const rHalf = drawR / 2;

        // Рисуем сетку
        ctx.strokeStyle = 'rgba(211, 211, 211, 1)';
        ctx.lineWidth = 1;
        for (let i = 0; i <= 9; i++) {
            let step = i * canvas.width / 10;
            ctx.beginPath();
            ctx.moveTo(canvas.width / 10 + step, 0);
            ctx.lineTo(canvas.width / 10 + step, canvas.height);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(0, canvas.height / 10 + step);
            ctx.lineTo(canvas.width, canvas.height / 10 + step);
            ctx.stroke();
        }

        // Рисуем фигуры (сектор, прямоугольник, треугольник)
        ctx.fillStyle = 'rgba(252, 68, 68, 1)';
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.width / 2);
        ctx.arc(canvas.width / 2, canvas.width / 2, realR, Math.PI, Math.PI * 1.5, false);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo(canvas.width / 2 + realR, canvas.height / 2);
        ctx.lineTo(canvas.width / 2 + realR, canvas.height / 2 - realR / 2);
        ctx.lineTo(canvas.width / 2, canvas.height / 2 - realR / 2);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.lineTo(canvas.width / 2 + realR / 2, canvas.height / 2);
        ctx.lineTo(canvas.width / 2, canvas.height / 2 + realR / 2);
        ctx.closePath();
        ctx.fill();

        // Рисуем оси
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 0);
        ctx.lineTo(canvas.width / 2, canvas.height);
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, canvas.height / 2);
        ctx.lineTo(canvas.width, canvas.height / 2);
        ctx.stroke();

        // Подписи и засечки
        const tickSize = 10; // Размер засечек
        ctx.fillStyle = 'black';
        ctx.font = '1.5rem Noto Sans Mono, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';

        // Функция для рисования засечек
        function drawTick(x, y, vertical = true) {
            ctx.beginPath();
            if (vertical) {
                ctx.moveTo(x - tickSize / 2, y);
                ctx.lineTo(x + tickSize / 2, y);
            } else {
                ctx.moveTo(x, y - tickSize / 2);
                ctx.lineTo(x, y + tickSize / 2);
            }
            ctx.stroke();
        }

        // Подписи и засечки по X
        ctx.fillText(`${rHalf}R`, canvas.width / 2 + realR / 2, canvas.height / 2 + 40);
        drawTick(canvas.width / 2 + realR / 2, canvas.height / 2, false);

        ctx.fillText(`${drawR}R`, canvas.width / 2 + realR, canvas.height / 2 + 40);
        drawTick(canvas.width / 2 + realR, canvas.height / 2, false);

        ctx.fillText(`-${rHalf}R`, canvas.width / 2 - realR / 2, canvas.height / 2 + 40);
        drawTick(canvas.width / 2 - realR / 2, canvas.height / 2, false);

        ctx.fillText(`-${drawR}R`, canvas.width / 2 - realR, canvas.height / 2 + 40);
        drawTick(canvas.width / 2 - realR, canvas.height / 2, false);

        // Подписи и засечки по Y
        ctx.fillText(`${rHalf}R`, canvas.width / 2 + 50, canvas.height / 2 - realR / 2);
        drawTick(canvas.width / 2, canvas.height / 2 - realR / 2);

        ctx.fillText(`${drawR}R`, canvas.width / 2 + 50, canvas.height / 2 - realR);
        drawTick(canvas.width / 2, canvas.height / 2 - realR);

        ctx.fillText(`-${rHalf}R`, canvas.width / 2 + 50, canvas.height / 2 + realR / 2);
        drawTick(canvas.width / 2, canvas.height / 2 + realR / 2);

        ctx.fillText(`-${drawR}R`, canvas.width / 2 + 50, canvas.height / 2 + realR);
        drawTick(canvas.width / 2, canvas.height / 2 + realR);
    }

    // Обновляем canvas при изменении R
    rInput.addEventListener("input", function () {
        const rValue = rInput.value;
        drawCanvas(rValue);
    });

    // Первоначальная отрисовка
    drawCanvas(1);
};

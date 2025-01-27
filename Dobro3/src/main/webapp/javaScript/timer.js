window.onload = function () {
    const timerElement = document.getElementById("timer");

    function updateClock() {
        const now = new Date();
        const date = now.toLocaleDateString("ru-RU", { year: 'numeric', month: 'long', day: 'numeric' });
        const time = now.toLocaleTimeString("ru-RU");
        timerElement.textContent = `${date}, ${time}`;
    }

    updateClock();
    setInterval(updateClock, 8000);
};

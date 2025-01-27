document.querySelector(".yForm").addEventListener("input", function (e) {
    let value = e.target.value;


    if (!/^-?\d*\.?\d{0,10}$/.test(value)) {
        e.target.value = value.slice(0, -1);
    }
});


function processForm() {
    const xValue = parseFloat(document.querySelector(".xForm input:checked")?.value);
    const yValue = parseFloat(document.querySelector(".yForm").value);
    const rValue = parseFloat(document.querySelector(".rForm").value);

    if (checkX(xValue) && checkY(yValue) && checkR(rValue)) {
        initGraph(rValue);

        console.log("Данные корректны:", { x: xValue, y: yValue, r: rValue });
    } else {
        badMessage("Данные невалидны");
    }
}


function checkY(value) {
    return !isNaN(value) && value >= -5 && value <= 3;
}

function checkX(value) {

    const validX = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];
    return validX.includes(value);
}

function checkR(value) {
    return !isNaN(value) && value >= 2 && value <= 5;
}

function badMessage(message) {
    let RequestStatus = document.querySelector(".status");
    RequestStatus.innerHTML = '';

    if (!RequestStatus.querySelector("h2")) {
        let statusText = document.createElement("h2");
        statusText.textContent = message;
        RequestStatus.style.color = "red";
        RequestStatus.classList.add('visible');
        RequestStatus.appendChild(statusText);
    }
}

document.querySelector('.button').addEventListener('click', function(event) {
    event.preventDefault();
    processForm();
});

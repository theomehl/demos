console.time();
let datetime = document.querySelector('input[type="datetime-local"]');
datetime.min = new Date(new Date().toString().split('GMT')[0]+' UTC').toISOString().split('.')[0].slice(0, -3);
let interval; 

let title = document.querySelector('h1');

function countdown() {
    let days, hours, minutes, seconds;
    let savedDate = localStorage.getItem('endDate');
    if (!savedDate) return;
    datetime.value = savedDate;

    let endDate = new Date(savedDate).getTime();
    if (isNaN(endDate)) return;

    function calculate() {
        let startDate = new Date();
        startDate = startDate.getTime();

        let timeRemaining = parseInt((endDate-startDate) / 1000);

        if (timeRemaining > 0) {
            days = parseInt(timeRemaining/86400);
            timeRemaining = (timeRemaining % 86400);

            hours = parseInt(timeRemaining / 3600);
            timeRemaining = (timeRemaining %3600);

            minutes = parseInt(timeRemaining / 60);
            timeRemaining = (timeRemaining % 60);

            seconds = parseInt(timeRemaining);

            document.getElementById("days").innerHTML = parseInt(days, 10);
            document.getElementById("hours").innerHTML = ("0" + hours).slice(-2);
            document.getElementById("minutes").innerHTML = ("0" + minutes).slice(-2);
            document.getElementById("seconds").innerHTML = ("0" + seconds).slice(-2);
        } else {
            return;
        }
    }
    calculate();
    interval = setInterval(calculate, 1000);
}

function getTitle() {
    if (!localStorage.getItem('title')) {
        title.innerHTML = 'Countdown.';
        return;
    }
    title.innerHTML = localStorage.getItem('title');
}

function setTitle() {
    localStorage.setItem('title', title.innerHTML);
    getTitle();
}

countdown();

datetime.addEventListener("change", function() {
    localStorage.setItem('endDate', datetime.value);
    clearInterval(interval);
    countdown();
});

title.addEventListener("focusout", setTitle);
getTitle();

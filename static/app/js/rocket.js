const rocket = document.getElementById('rocket');
const tv = document.getElementById('translationFLY');
const buttonStart = document.getElementById('spacex-btn');

let startedRocket = false;


// IlonMask
let timerIlonMask = 29000;
let intervalIlon;
let opacityTV = 0;
let opacityButton = 1;

// rocket
let timerFly = 3000;
let intervalFly;
let posYPrecents = 150;
let deltaXRocket;
let timeFly = 0;


function animation_fly_rocket() {
    if (timerFly > 0) {
        // просчитать смещение
        let deltaXRocket = Math.abs(-0.005*(timeFly)**2+0.25*(timeFly));
        posYPrecents -= deltaXRocket;
        rocket.style.top = `${posYPrecents}%`;
        
        
        timeFly += 1
        timerFly -= 40;
    } else {
        clearInterval(intervalFly)
    }
}

function animationIlonMask(){
    if (timerIlonMask > 0) {
        if (opacityTV < 1) {
            opacityTV += 0.05
            tv.style.opacity = opacityTV;
        }
        if (opacityButton > 0) {
            opacityButton -= 0.1;
            buttonStart.style.bottom = `${28 - opacityButton*30}%`;
            buttonStart.style.opacity = opacityButton;
        }
        
        timerIlonMask -= 40;
    } else {
        clearInterval(intervalIlon)
        tv.remove()

        // пуск ракеты
        intervalFly = setInterval(animation_fly_rocket,
            40);
    }
}


function run_Ilon_Mask() {
    tv.removeAttribute('hidden');
    tv.style.bottom = '2%'

    // добавить gif
    tv.innerHTML = '<img src="/static/app/mediaM/start_rocket.gif" alt="" width="100%">'

    intervalIlon = setInterval(animationIlonMask,
        40);
}

function start_rocket() {
    if (startedRocket == false) {
        run_Ilon_Mask()
        startedRocket = true;
    } else {
        console.log('already started!');
    }
}
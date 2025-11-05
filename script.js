const lines = document.querySelectorAll(".road__line1");
const car = document.querySelector(".car");
const otherCar = document.querySelector(".other__car");
const otherCar2 = document.querySelector(".other__car2");
const scoredis = document.querySelector(".score");
const gameover = document.querySelector(".gameover");
const maincars = document.querySelectorAll(".maincars");
const fire = document.querySelector(".fire");
const crash = document.querySelector(".crash__sounds");
const sidecrash = document.querySelector(".sidecrash__sounds");
const draft = document.querySelector(".dreft__sounds");
const normallspeed = document.querySelector(".normall__sounds");
const highspeed = document.querySelector(".high__sounds");
const firesound = document.querySelector(".fire__sounds");


let score = 0;
let y = 0;
let carsp =598.537;
let carsp1 =798.537;
let cmove = 160;
let crotate=0
let timeId;
let timesnum = 0;
let cartype = 1;
let tid;
let mcar;
let ocar;
let mcarleft;
let mcarright;
let mcartop;
let mcarbottom;
let ocarleft;
let ocarright;
let ocarbottom;
let ocar2left;
let ocar2right;
let ocar2bottom;
let src;
let carposat=0;

const carpositions = [280,5,300,20, 160,80,200,100,220,50,260,130 ];

maincars.forEach(e => {
    e.addEventListener("click", maincarchange);
})
addEventListener("keydown", carmove);
addEventListener("keyup", carturn);

function gameStart() {
    score = 0;
    y = 0;
    carsp = 598.537;
    carsp1 =798.537;
    cmove = 160;
    crotate = 0;
    timesnum = 0;
    cartype = 1;
    carposat = 0;
    otherCar.style.left = carpositions[carposat] + "px";
    carposat +=1;
    otherCar2.style.left = carpositions[carposat] + "px";
    otherCar.style.bottom = carsp + "px";
    otherCar2.style.bottom = carsp1 + "px";
    car.style.left = cmove + "px";
    gameover.style.display = "none";
    lines[0].style.bottom = y+"px";
    lines[1].style.bottom = y + "px";
    otherCar.style.bottom = carsp + "px"
    scoredis.textContent = score;
    firesound.pause();
    fire.style.display = "none";
    
}
function carturn(e) {
    if (e.key == "ArrowRight") {
        crotate = 0;
        car.style.transform = `skewy(${crotate}deg)`;
        car.style.rotate = crotate + "deg";
        clearTimeout(tid);
    } else if (e.key == "ArrowLeft") {
        crotate = 0;
        car.style.transform = `skewy(${crotate}deg)`;
        car.style.rotate = crotate + "deg";
        clearTimeout(tid);
    }
}

function carmove(e) {
    if (e.key == "ArrowRight") { carMoveRight(); }
    if (e.key == "ArrowLeft") { carMoveleft(); }
    
    if (e.key == "ArrowUp") {
        if (timesnum < 3) {
            highspeed.pause();
            normallspeed.play();
        }
        else if ((timesnum >= 3) && (timesnum <= 5)) {
            normallspeed.pause();
            highspeed.play();
        }
        if (timesnum <= 5) {
            timeId = setTimeout(roadMove, 10);
            timesnum += 1;
        }
    }
    if (e.key == "ArrowDown") {
        if ((timesnum < 3) && (timesnum>0)) {
            highspeed.pause();
            normallspeed.play();
        } else if ((timesnum >= 3) && (timesnum <= 5)) {
            normallspeed.pause();
            highspeed.play();
        } else if (timesnum == 0) {
            normallspeed.pause();
            highspeed.pause();
            
        }
        if (timesnum > 0) {
            clearTimeout(timeId);
            timesnum -= 1;
        }
    }
}
function carMoveRight() {
    if (cmove >= 320) {
        sidecrash.play();
            return
    }
    if (checkColossion()) { return }
    // draft.play();
        cmove += 10;
        car.style.left =cmove+"px";
        if (crotate <= 8) {
            crotate += 2;
            car.style.transform = `skewy(${crotate}deg)`;
            car.style.rotate = crotate + "deg";
        }
        tid = setTimeout(carMoveRight, 15);
}
function carMoveleft() {
    if(checkColossion()){return}
    if (cmove <= 0) {
        sidecrash.play();
        return
    }
    // draft.play();
    cmove -= 10;
    car.style.left= cmove+"px";
    if (crotate >= -8) {
        crotate -= 2;
        car.style.transform = `skewy(${crotate}deg)`;
       
        car.style.rotate = crotate + "deg";
    }
    tid = setTimeout(carMoveleft, 15);
}

function roadMove() {
    if (checkColossion()) {
        normallspeed.pause();
        highspeed.pause();
        crash.play();
        fire.style.left = mcarleft-80 + "px";
        fire.style.display = "block";
        gameover.style.display = "flex";
        firesound.play();
        return
    }
    if (y <= (-577)) {
        y = 0;
    }
    if (carsp <= -200) {
        if (cartype > 12) { cartype = 1 }
        if(carposat>12){carposat=0}
        otherCar.setAttribute("src", `cars/car${cartype}.png`);
        score += 1;
        scoredis.textContent = score;
        carsp = 598.537;
        otherCar.style.left = carpositions[carposat] + "px";
        otherCar.style.bottom = carsp + "px";
        cartype += 1;
        carposat += 1;
    }
    if (carsp1 <= -200) {
        if (cartype > 12) { cartype = 1 }
        if(carposat>12){carposat=0}
        otherCar2.setAttribute("src", `cars/car${cartype}.png`);
        score += 1;
        scoredis.textContent = score;
        carsp1 = 798.537;
        otherCar2.style.left = carpositions[carposat] + "px";
        otherCar2.style.bottom = carsp1 + "px";
        cartype += 1;
        carposat += 1;
    }
    
    y -= 1;
    carsp -= 1.3;
    carsp1 -= 1.2;
    
    lines[0].style.bottom = y+"px";
    lines[1].style.bottom = y + "px";
    otherCar.style.bottom = carsp + "px"
    otherCar2.style.bottom = carsp1 + "px"
    timeId = setTimeout(roadMove, 10);
    
 
}

function checkColossion() {
    mcarleft = car.style.left;
    mcarleft = mcarleft.replace("px", "");
    mcarleft = Number(mcarleft)+8;
    mcarright = mcarleft + 62.58-8;
    mcartop = car.style.bottom;
    mcartop = mcartop.replace("px", "");
    mcartop = Number(mcartop); 
    mcarbottom = mcartop;
    mcartop = mcartop + 125.16-10;
    ocarleft = otherCar.style.left;
    ocarleft = ocarleft.replace("px", "");
    ocarleft = Number(ocarleft)+8;
    ocarright = ocarleft + 62.58-8;
    ocarbottom = otherCar.style.bottom;
    ocarbottom = ocarbottom.replace("px", "");
    ocarbottom = Number(ocarbottom) - 10;
    ocar2left = otherCar2.style.left;
    ocar2left = ocar2left.replace("px", "");
    ocar2left = Number(ocar2left)+8;
    ocar2right = ocar2left + 62.58-8;
    ocar2bottom = otherCar2.style.bottom;
    ocar2bottom = ocar2bottom.replace("px", "");
    ocar2bottom = Number(ocar2bottom) -10;
    

    if ((mcartop >= ocarbottom )&&((ocarbottom+90)>=mcarbottom)) {

        if ((ocarleft >= mcarleft) && (ocarleft <= mcarright) ) {
            return true;
        }
        if ((ocarright <= mcarright) && (ocarright >= mcarleft) ) {
            return true;
        }
    }
    if ((mcartop >= ocar2bottom) && ((ocar2bottom + 90) >= mcarbottom)) {
    
        if ((ocar2left >= mcarleft) && (ocar2left <= mcarright) ) {
            return true;
        }
        if ((ocar2right <= mcarright) && (ocar2right >= mcarleft) ) {
            return true;
        }
    }
    return false;
}

function maincarchange(event) {
    src = event.target.getAttribute("src");
    car.setAttribute("src", src);

    
}
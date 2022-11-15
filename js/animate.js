const h2 = document.getElementById("title-h2");
const line = document.getElementById("title-line");
const p = document.getElementById("title-p");
const h1 = document.getElementById("title-h1");


function animations(element, animate, time) {
    setTimeout( () => {
        element.classList.add('animate__animated', animate)
    }, time);
};



animations(h2, 'animate__slideInLeft', 0);
animations(line, 'animate__slideInRight', 1000);
animations(p, 'animate__slideInUp', 2000);
animations(h1, 'animate__zoomIn', 3000);
import {reactions} from './reactions.js'
import {colorReactions} from './colorReactions.js';
let chemElements = document.querySelectorAll('.chemElement');
let elementsDiv = document.querySelector('.elements');
let mix = document.querySelector('.mix');
let menu = document.querySelector('.fa-brands');
let reaction = document.querySelector('.reaction');
let liquidDispenser = document.querySelector('.liquidDispenser');
let liquid1 = document.querySelector('.liquid1');
let liquid2 = document.querySelector('.liquid2');
let leave = document.querySelector('.fa-xmark');
let canChange = true;
let sound = new Audio('water-pouring-80316.mp3');
let drain = new Audio('water-draining-6415.mp3');

let sodium = chemElements[0];
let chlorine = chemElements[1];
let magnesium = chemElements[2];
let oxygen = chemElements[3];
let iron = chemElements[4];
let carbon = chemElements[5];
let sulfur = chemElements[6];
let hydrogen = chemElements[7];
let nitrogen = chemElements[8];
let copper = chemElements[9]
let calcium = chemElements[10];
let zinc = chemElements[11];

let selected = false;
let color;
let counter = 1;
let index;
let id = 0;

sodium.color = "rgb(0, 0, 255)";
chlorine.color = "rgb(0, 255, 0)";
magnesium.color = "rgb(169, 169, 169)";  
oxygen.color = "rgb(204, 204, 255)";   
iron.color = "rgb(179, 0, 0)";
carbon.color = "rgb(0, 0, 0)";
sulfur.color = "rgb(255, 204, 0)";
hydrogen.color = "rgb(204, 204, 255)";
nitrogen.color = "rgb(204, 204, 255)";
copper.color = "rgb(255, 127, 0)";
calcium.color = "rgb(232, 232, 232)";
zinc.color = "rgb(174, 219, 209)";

leave.addEventListener('click', function() {
    elementsDiv.style.left = '-545px';
});

chemElements.forEach(element => {
    element.addEventListener('click', function() {
        reaction.innerText = '';

        if (counter <= 2 && !element.classList.contains('selected') && canChange) {
            element.classList.toggle('selected');
            element.selected = !element.selected;
            console.log(counter);
            counter++;
            element.index = id+1;
            console.log(element.index);
 
            if (element.index === 1) { 
                liquid2.style.transform = 'none';
                liquid1.style.backgroundColor = element.color;
                liquid1.style.display = 'flex';
                setTimeout(() => {
                    liquid1.style.transition = 'transform 2s';
                    setTimeout(() => {
                        liquid1.style.transformOrigin = 'top';
                    }, 10);
                    liquid1.style.transform = "scaleY(-70)";
                }, 1100);
            } else if (element.index === 2) { 
                liquid2.style.display = 'flex';
                liquid2.style.backgroundColor = element.color;
                setTimeout(() => {
                    liquid2.style.transition = 'transform 3s';
                    setTimeout(() => {
                        liquid2.style.transformOrigin = 'top';
                    }, 10);
                    liquid2.style.transform = "scaleY(-140)";
            })}

            liquidDispenser.style.display = 'block';
            liquidDispenser.style.transition = "transform 1s";
            setTimeout(() => {
                liquidDispenser.style.transform = "scaleY(15)";
            }, 10);
            setTimeout(() => {
                sound.play();
            }, 650);
            liquidDispenser.style.backgroundColor = element.color;
            canChange = false;
            setTimeout(() => {
                canChange = true;
                sound.pause();
                sound.currentTime = 0;
            }, 3000);
            setTimeout(() => {
                liquidDispenser.style.transition = "none";
                liquidDispenser.style.display = 'none';
                liquidDispenser.style.transform = 'none';
            }, 3500);

            id++;
            console.log(id);
            
        } else if (element.classList.contains('selected') && canChange) {
            element.classList.toggle('selected');
            counter--;
            console.log(counter);

            if (element.index === 1 && id == 1) { 
                liquid1.style.transform = 'scaleY(0)';
                canChange = false;
                drain.play();
                setTimeout(() => {
                    liquid1.style.display = 'none';
                    liquid1.style.transform = "none";
                    canChange = true;
                    drain.pause();
                    drain.currentTime = 0;
                }, 2000);
            } else if (element.index === 2) { 
                liquid2.style.backgroundColor = element.color;
                liquid2.style.transform = 'scaleY(0)';
                canChange = false;
                drain.play();
                setTimeout(() => {
                    liquid2.style.display = 'none';
                    liquid2.style.transform = "none";
                    canChange = true;
                    drain.pause();
                    drain.currentTime = 0;
                }, 2000);
            } else if (element.index == 1 && id == 2) {
                liquid1.style.transform = 'scaleY(0)';
                liquid2.style.transform = 'scaleY(-70)';
                canChange = false;
                setTimeout(() => {
                    liquid1.style.display = 'none';
                    liquid1.style.transform = "none";
                    canChange = true;
                    element.index = 1;
                }, 2000);
            }

            
            id--;
            console.log(id);
        }
    });
});

menu.addEventListener('click', function() {
    elementsDiv.style.left="0px";
    console.log('s');
});


let twoElements = [];

let endElement;

let newColor;

mix.addEventListener('click', function() {
    // let count = 0;
    chemElements.forEach(element => {
        if (element.classList.contains('selected')) {
            twoElements.push(element.querySelector('p').textContent.toLowerCase())
            // count++
        }
    });

    if (id!=2) {
        console.log('Enter elements');
        console.log(twoElements);
    } else {
        endElement = twoElements[0] + "-" + twoElements[1];
        console.log(endElement);
        reaction.innerText = reactions[endElement];

        newColor = window.getComputedStyle(liquid1).backgroundColor + "-" + window.getComputedStyle(liquid2).backgroundColor;
        console.log(colorReactions[newColor]);
        console.log(newColor);
        
        liquid1.style.backgroundColor = colorReactions[newColor];
        liquid2.style.backgroundColor = colorReactions[newColor];
        
    }
});
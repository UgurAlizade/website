let chemElements = document.querySelectorAll('.chemElement');
let elementsDiv = document.querySelector('.elements');

let sodium = chemElements[0];
let chlorine = chemElements[1];
let magnesium = chemElements[2];
let oxygen = chemElements[3];
let iron = chemElements[4];
let carbon = chemElements[5];
let sulfur = chemElements[6];
let hydrogen = chemElements[7];
let nitrogen = chemElements[8];
let copper = chemElements[9];
let calcium = chemElements[10];
let zinc = chemElements[11];

let selected = false;
let color;
let counter = 1;

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

let leave = document.querySelector('.fa-xmark');
leave.addEventListener('click', function() {
    elementsDiv.style.display = 'none';
});

let index;
let id = 0;

let reaction = document.querySelector('.reaction');

let liquidDispenser = document.querySelector('.liquidDispenser');
let liquid1 = document.querySelector('.liquid1');
let liquid2 = document.querySelector('.liquid2');
let canChange = true;
let sound = new Audio('water-pouring-80316.mp3');
let drain = new Audio('water-draining-6415.mp3');

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

let menu = document.querySelector('.fa-brands');
menu.addEventListener('click', function() {
    elementsDiv.style.display = 'block';
    console.log('s');
});


const reactions = {
    "sodium-chlorine": "2Na + Cl2 → 2NaCl",
    "chlorine-sodium": "2Na + Cl2 → 2NaCl",

    "sodium-magnesium": "2Na + Mg → MgNa2",
    "magnesium-sodium": "2Na + Mg → MgNa2",

    "sodium-oxygen": "4Na + O2 → 2Na2O",
    "oxygen-sodium": "4Na + O2 → 2Na2O",

    "sodium-iron": "2Na + Fe → FeNa2",
    "iron-sodium": "2Na + Fe → FeNa2",

    "sodium-carbon": "2Na + C → Na2C",
    "carbon-sodium": "2Na + C → Na2C",

    "sodium-sulfur": "2Na + S → Na2S",
    "sulfur-sodium": "2Na + S → Na2S",

    "sodium-hydrogen": "2Na + 2H2O → 2NaOH + H2",
    "hydrogen-sodium": "2Na + 2H2O → 2NaOH + H2",

    "sodium-nitrogen": "3Na + N2 → 2Na3N",
    "nitrogen-sodium": "3Na + N2 → 2Na3N",

    "sodium-copper": "2Na + Cu → CuNa2",
    "copper-sodium": "2Na + Cu → CuNa2",

    "sodium-calcium": "2Na + Ca → CaNa2",
    "calcium-sodium": "2Na + Ca → CaNa2",

    "sodium-zinc": "2Na + Zn → ZnNa2",
    "zinc-sodium": "2Na + Zn → ZnNa2",

    "chlorine-magnesium": "Cl2 + Mg → MgCl2",
    "magnesium-chlorine": "Cl2 + Mg → MgCl2",

    "chlorine-oxygen": "2Cl2 + O2 → 2Cl2O",
    "oxygen-chlorine": "2Cl2 + O2 → 2Cl2O",

    "chlorine-iron": "3Cl2 + 2Fe → 2FeCl3",
    "iron-chlorine": "3Cl2 + 2Fe → 2FeCl3",

    "chlorine-carbon": "Cl2 + C → CCl4",
    "carbon-chlorine": "Cl2 + C → CCl4",

    "chlorine-sulfur": "Cl2 + S → SCl2",
    "sulfur-chlorine": "Cl2 + S → SCl2",

    "chlorine-hydrogen": "Cl2 + H2 → 2HCl",
    "hydrogen-chlorine": "Cl2 + H2 → 2HCl",

    "chlorine-nitrogen": "3Cl2 + N2 → 2NCl3",
    "nitrogen-chlorine": "3Cl2 + N2 → 2NCl3",

    "chlorine-copper": "Cl2 + Cu → CuCl2",
    "copper-chlorine": "Cl2 + Cu → CuCl2",

    "chlorine-calcium": "Cl2 + Ca → CaCl2",
    "calcium-chlorine": "Cl2 + Ca → CaCl2",

    "chlorine-zinc": "Cl2 + Zn → ZnCl2",
    "zinc-chlorine": "Cl2 + Zn → ZnCl2",

    "magnesium-oxygen": "2Mg + O2 → 2MgO",
    "oxygen-magnesium": "2Mg + O2 → 2MgO",

    "magnesium-iron": "3Mg + 2Fe → Fe3Mg2",
    "iron-magnesium": "3Mg + 2Fe → Fe3Mg2",

    "magnesium-carbon": "Mg + C → MgC",
    "carbon-magnesium": "Mg + C → MgC",

    "magnesium-sulfur": "Mg + S → MgS",
    "sulfur-magnesium": "Mg + S → MgS",

    "magnesium-hydrogen": "Mg + 2H2O → Mg(OH)2 + H2",
    "hydrogen-magnesium": "Mg + 2H2O → Mg(OH)2 + H2",

    "magnesium-nitrogen": "3Mg + N2 → Mg3N2",
    "nitrogen-magnesium": "3Mg + N2 → Mg3N2",

    "magnesium-copper": "Mg + Cu → MgCu2",
    "copper-magnesium": "Mg + Cu → MgCu2",

    "magnesium-calcium": "Mg + Ca → MgCa",
    "calcium-magnesium": "Mg + Ca → MgCa",

    "magnesium-zinc": "Mg + Zn → MgZn",
    "zinc-magnesium": "Mg + Zn → MgZn",

    "oxygen-iron": "3O2 + 2Fe → 2Fe2O3",
    "iron-oxygen": "3O2 + 2Fe → 2Fe2O3",

    "oxygen-carbon": "O2 + C → CO2",
    "carbon-oxygen": "O2 + C → CO2",

    "oxygen-sulfur": "O2 + S → SO2",
    "sulfur-oxygen": "O2 + S → SO2",

    "oxygen-hydrogen": "2H2 + O2 → 2H2O",
    "hydrogen-oxygen": "2H2 + O2 → 2H2O",

    "oxygen-nitrogen": "2N2 + 5O2 → 2N2O5",
    "nitrogen-oxygen": "2N2 + 5O2 → 2N2O5",

    "oxygen-copper": "O2 + 2Cu → 2CuO",
    "copper-oxygen": "O2 + 2Cu → 2CuO",

    "oxygen-calcium": "2Ca + O2 → 2CaO",
    "calcium-oxygen": "2Ca + O2 → 2CaO",

    "oxygen-zinc": "2Zn + O2 → 2ZnO",
    "zinc-oxygen": "2Zn + O2 → 2ZnO",

    "iron-carbon": "Fe + C → FeC",
    "carbon-iron": "Fe + C → FeC",

    "iron-sulfur": "Fe + S → FeS",
    "sulfur-iron": "Fe + S → FeS",

    "iron-hydrogen": "Fe + 2H2O → Fe(OH)2 + H2",
    "hydrogen-iron": "Fe + 2H2O → Fe(OH)2 + H2",

    "iron-nitrogen": "3Fe + N2 → Fe3N2",
    "nitrogen-iron": "3Fe + N2 → Fe3N2",

    "iron-copper": "Fe + Cu → FeCu",
    "copper-iron": "Fe + Cu → FeCu",

    "iron-calcium": "Fe + Ca → FeCa",
    "calcium-iron": "Fe + Ca → FeCa",

    "iron-zinc": "Fe + Zn → FeZn",
    "zinc-iron": "Fe + Zn → FeZn",

    "carbon-sulfur": "C + 2S → CS2",
    "sulfur-carbon": "C + 2S → CS2",

    "carbon-hydrogen": "C + 2H2 → CH4",
    "hydrogen-carbon": "C + 2H2 → CH4",

    "carbon-nitrogen": "C + N2 → CN2",
    "nitrogen-carbon": "C + N2 → CN2",

    "carbon-copper": "C + Cu → CuC",
    "copper-carbon": "C + Cu → CuC",

    "carbon-calcium": "C + Ca → CaC2",
    "calcium-carbon": "C + Ca → CaC2",

    "carbon-zinc": "C + Zn → ZnC2",
    "zinc-carbon": "C + Zn → ZnC2",

    "sulfur-hydrogen": "S + H2 → H2S",
    "hydrogen-sulfur": "S + H2 → H2S",

    "sulfur-nitrogen": "S + N2 → SN2",
    "nitrogen-sulfur": "S + N2 → SN2",

    "sulfur-copper": "S + Cu → CuS",
    "copper-sulfur": "S + Cu → CuS",

    "sulfur-calcium": "S + Ca → CaS",
    "calcium-sulfur": "S + Ca → CaS",

    "sulfur-zinc": "S + Zn → ZnS",
    "zinc-sulfur": "S + Zn → ZnS",

    "hydrogen-nitrogen": "3H2 + N2 → 2NH3",
    "nitrogen-hydrogen": "3H2 + N2 → 2NH3",

    "hydrogen-copper": "H2 + Cu → CuH2",
    "copper-hydrogen": "H2 + Cu → CuH2",

    "hydrogen-calcium": "H2 + Ca → CaH2",
    "calcium-hydrogen": "H2 + Ca → CaH2",

    "hydrogen-zinc": "H2 + Zn → ZnH2",
    "zinc-hydrogen": "H2 + Zn → ZnH2",

    "nitrogen-copper": "N2 + Cu → CuN2",
    "copper-nitrogen": "N2 + Cu → CuN2",

    "nitrogen-calcium": "N2 + Ca → CaN2",
    "calcium-nitrogen": "N2 + Ca → CaN2",

    "nitrogen-zinc": "N2 + Zn → ZnN2",
    "zinc-nitrogen": "N2 + Zn → ZnN2",

    "copper-calcium": "Cu + Ca → CaCu",
    "calcium-copper": "Cu + Ca → CaCu",

    "copper-zinc": "Cu + Zn → CuZn",
    "zinc-copper": "Cu + Zn → CuZn",

    "calcium-zinc": "Ca + Zn → CaZn",
    "zinc-calcium": "Ca + Zn → CaZn"
};

const colorReactions = {
    "rgb(0, 0, 255)-rgb(0, 255, 0)": "rgb(0, 128, 128)", 
    "rgb(0, 255, 0)-rgb(0, 0, 255)": "rgb(0, 128, 128)", 

    "rgb(0, 0, 255)-rgb(169, 169, 169)": "rgb(84, 84, 212)", 
    "rgb(169, 169, 169)-rgb(0, 0, 255)": "rgb(84, 84, 212)", 

    "rgb(0, 0, 255)-rgb(204, 204, 255)": "rgb(102, 102, 255)", 
    "rgb(204, 204, 255)-rgb(0, 0, 255)": "rgb(102, 102, 255)", 

    "rgb(0, 0, 255)-rgb(179, 0, 0)": "rgb(89, 0, 128)", 
    "rgb(179, 0, 0)-rgb(0, 0, 255)": "rgb(89, 0, 128)", 

    "rgb(0, 0, 255)-rgb(0, 0, 0)": "rgb(0, 0, 128)", 
    "rgb(0, 0, 0)-rgb(0, 0, 255)": "rgb(0, 0, 128)", 

    "rgb(0, 0, 255)-rgb(255, 204, 0)": "rgb(128, 128, 128)", 
    "rgb(255, 204, 0)-rgb(0, 0, 255)": "rgb(128, 128, 128)", 

    "rgb(0, 0, 255)-rgb(204, 204, 255)": "rgb(102, 102, 255)", 
    "rgb(204, 204, 255)-rgb(0, 0, 255)": "rgb(102, 102, 255)", 
    
    "rgb(169, 169, 169)-rgb(204, 204, 255)": "rgb(136, 136, 255)", 
    "rgb(204, 204, 255)-rgb(169, 169, 169)": "rgb(136, 136, 255)", 

    "rgb(169, 169, 169)-rgb(179, 0, 0)": "rgb(127, 84, 84)", 
    "rgb(179, 0, 0)-rgb(169, 169, 169)": "rgb(127, 84, 84)", 

    "rgb(169, 169, 169)-rgb(0, 0, 0)": "rgb(84, 84, 84)", 
    "rgb(0, 0, 0)-rgb(169, 169, 169)": "rgb(84, 84, 84)", 

    "rgb(169, 169, 169)-rgb(255, 204, 0)": "rgb(127, 127, 64)", 
    "rgb(255, 204, 0)-rgb(169, 169, 169)": "rgb(127, 127, 64)", 

    "rgb(169, 169, 169)-rgb(204, 204, 255)": "rgb(136, 136, 255)", 
    "rgb(204, 204, 255)-rgb(169, 169, 169)": "rgb(136, 136, 255)", 

    "rgb(169, 169, 169)-rgb(204, 204, 255)": "rgb(136, 136, 255)", 
    "rgb(204, 204, 255)-rgb(169, 169, 169)": "rgb(136, 136, 255)",

    "rgb(204, 204, 255)-rgb(179, 0, 0)": "rgb(121, 102, 102)", 
    "rgb(179, 0, 0)-rgb(204, 204, 255)": "rgb(121, 102, 102)",

    "rgb(204, 204, 255)-rgb(0, 0, 0)": "rgb(102, 102, 102)", 
    "rgb(0, 0, 0)-rgb(204, 204, 255)": "rgb(102, 102, 102)", 

    "rgb(204, 204, 255)-rgb(255, 204, 0)": "rgb(128, 128, 128)", 
    "rgb(255, 204, 0)-rgb(204, 204, 255)": "rgb(128, 128, 128)", 

    "rgb(204, 204, 255)-rgb(204, 204, 255)": "rgb(204, 204, 255)", 
    "rgb(204, 204, 255)-rgb(204, 204, 255)": "rgb(204, 204, 255)", 

    "rgb(179, 0, 0)-rgb(0, 0, 0)": "rgb(89, 0, 0)", 
    "rgb(0, 0, 0)-rgb(179, 0, 0)": "rgb(89, 0, 0)", 

    "rgb(179, 0, 0)-rgb(255, 204, 0)": "rgb(128, 89, 0)", 
    "rgb(255, 204, 0)-rgb(179, 0, 0)": "rgb(128, 89, 0)", 

    "rgb(179, 0, 0)-rgb(204, 204, 255)": "rgb(89, 89, 128)", 
    "rgb(204, 204, 255)-rgb(179, 0, 0)": "rgb(89, 89, 128)", 

    "rgb(179, 0, 0)-rgb(204, 204, 255)": "rgb(89, 89, 128)", 
    "rgb(204, 204, 255)-rgb(179, 0, 0)": "rgb(89, 89, 128)",

    "rgb(0, 0, 0)-rgb(255, 204, 0)": "rgb(64, 64, 0)", 
    "rgb(255, 204, 0)-rgb(0, 0, 0)": "rgb(64, 64, 0)", 

    "rgb(0, 0, 0)-rgb(204, 204, 255)": "rgb(102, 102, 255)", 
    "rgb(204, 204, 255)-rgb(0, 0, 0)": "rgb(102, 102, 255)", 

    "rgb(0, 0, 0)-rgb(204, 204, 255)": "rgb(102, 102, 255)", 
    "rgb(204, 204, 255)-rgb(0, 0, 0)": "rgb(102, 102, 255)", 

    "rgb(0, 0, 0)-rgb(204, 204, 255)": "rgb(102, 102, 255)", 
    "rgb(204, 204, 255)-rgb(0, 0, 0)": "rgb(102, 102, 255)", 
    
    "rgb(204, 204, 255)-rgb(255, 204, 0)": "rgb(128, 128, 255)", 
    "rgb(255, 204, 0)-rgb(204, 204, 255)": "rgb(128, 128, 255)", 

    "rgb(204, 204, 255)-rgb(255, 204, 0)": "rgb(128, 128, 255)", 
    "rgb(255, 204, 0)-rgb(204, 204, 255)": "rgb(128, 128, 255)", 
    
    "rgb(204, 204, 255)-rgb(255, 204, 0)": "rgb(128, 128, 255)", 
    "rgb(255, 204, 0)-rgb(204, 204, 255)": "rgb(128, 128, 255)",

    "rgb(179, 0, 0)-rgb(174, 219, 209)": "rgb(126, 109, 104)", 
    "rgb(174, 219, 209)-rgb(179, 0, 0)": "rgb(126, 109, 104)",

    "rgb(174, 219, 209)-rgb(0, 0, 255)": "rgb(87, 122, 169)", 
    "rgb(0, 0, 255)-rgb(174, 219, 209)": "rgb(87, 122, 169)"
};



let mix = document.querySelector('.mix');

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
/* salam */
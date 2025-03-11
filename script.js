import {elementsNames} from './nameelements.js';
import {els} from './nameelements.js';

let sound = new Audio('water-pouring-80316.mp3');
let drain = new Audio('water-draining-6415.mp3');

let searchEl=document.getElementById("searchEl");
let brands=document.getElementById("brands");
let xmark=document.getElementById("xmark");
let mix=document.getElementById("mix");
let elementsDiv=document.getElementById("elementsDiv");
let elementS=document.querySelector(".elements");
let liquidDispenser=document.getElementById("liquidDispenser");
let liquid1=document.getElementById("liquid1");
let liquid2=document.getElementById("liquid2");
let counter=0;

brands.addEventListener('click',()=>{
   elementsDiv.style.left="0px";
})

xmark.addEventListener('click',()=>{
   elementsDiv.style.left="-600px";
})

function addELement(){
   for(let i=0;i<elementsNames.length;i++){
       let newDiv=document.createElement("div");
       let newP=document.createElement("p");
       let newImg=document.createElement("img");
       newImg.src=`elementsImages/${elementsNames[i].toLocaleLowerCase()}.jpg`;
       newDiv.classList.add("element");
       newP.innerText=elementsNames[i];
       elementS.appendChild(newDiv);
       newDiv.append(newP,newImg);
       
    } 
   
}
  addELement();
  let findElements=document.querySelectorAll(".element");
  findElements.forEach(findPrasedymium =>{
    if(findPrasedymium.children[0].textContent=="Praseodymium"){
      findPrasedymium.style.fontSize="13px";
    }
  })
  
  let el1;
  let el2;
  let elements=document.querySelectorAll(".element");
  let checkliquid2 = false;
elements.forEach(element=>{
    element.addEventListener('click',()=>{
        if(!(element.classList.contains("selected"))){
            element.classList.add("selected");
          if(counter<2){
             liquidDispenser.style.animation="dispenser 2s ease-in-out";
             liquid1.style.animation="liquid1 2s ease-in-out 2s forwards";
             element.style.opacity="0.6";
             element.activated = true;
             element.name="first";
             
             el1=els.find(el => el.name.toLowerCase() === element.children[0].textContent.toLowerCase())

             if(el1 && !liquid1.style.backgroundColor){
               console.log(el1.color);
               liquid1.style.backgroundColor=`${el1.color}`;
             }
             counter++;
             console.log(counter);
          }
          if(counter==2){
            liquidDispenser.style.animation="dispenser2 2s ease-in-out";
            liquid2.style.animation="liquid2 2s ease-in-out 2s forwards";
            checkliquid2 = true;
            element.name="second";
            
            el2=els.find(el => el.name.toLowerCase() === element.children[0].textContent.toLowerCase())

            if(el2 && !liquid2.style.backgroundColor){
              console.log(el2.color);
              liquid2.style.backgroundColor=`${el2.color}`;
            }
            console.log(counter);
          }
        }else if (element.activated==true){
            element.classList.remove("selected");
            element.style.opacity="1";
            counter--;
            if(element.name=="second"){
              liquid2.style.animation="liquid2-back 2s ease-in-out";
              checkliquid2=false;
              setTimeout(()=>{
                liquid2.style.backgroundColor="";
              },2000)   
            }
            if(element.name=="first"){   
              liquid1.style.animation="liquid1-back 2s ease-in-out";
              if(checkliquid2 == true){
                liquid2.style.animation="liquid2Backdown 2s ease-in-out forwards";
                console.log(element);
              }
              setTimeout(()=>{
                liquid1.style.backgroundColor="";
              },2000) 
            console.log(counter)
        }
    }})
})

searchEl.addEventListener('input',()=>{
  elements.forEach(element=>{
    element.style.display="none";
    if(searchEl.value == ""){
      elements.forEach(el=>{
        el.style.display="flex";
      })
    }
    if(searchEl.value != "" && element.children[0].innerText.toLowerCase().includes(searchEl.value.toLowerCase())){
      element.style.display="flex";
      console.log(searchEl.value)
    }
  })
})


async function sendMessage(userMessage) {
  let apiKey="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"

  let response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "user", content: userMessage}
      ]
    })
  });

  let data = await response.json();
  console.log(data.choices[0].message.content)
}

//  animation: liquid1 2s ease-in-out 2s forwards;        liquid 1
// animation:liquid2 2s ease-in-out;                      liquid 2
// animation: dispenser 2s ease-in-out;                   dispenser
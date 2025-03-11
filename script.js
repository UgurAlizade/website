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

let mixture = [];
let gptAnswer = document.querySelector('.gptAnswer');


brands.addEventListener('click',()=>{
   elementsDiv.style.left="0px";
})

document.querySelector(".loadd").innerText = "";

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
  let el1;
  let el2;
  let elements=document.querySelectorAll(".element");
  let checkliquid2 = false;
elements.forEach(element=>{
    element.addEventListener('click',()=>{

        if((!element.classList.contains("selected"))){
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
            }
            if(element.name=="first"){   
              liquid1.style.animation="liquid1-back 2s ease-in-out";
              if(checkliquid2 == true){
                liquid2.style.animation="liquid2Backdown 2s ease-in-out forwards";
              }
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

let data


// Function to send a message to the OpenAI API and return the response
async function sendMessage(userMessage) {
  let apiKey = "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";  // Replace with your actual API key securely

  try {
    let response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4",  // Ensure this is the correct model name for your API version
        messages: [
          { role: "user", content: userMessage }
        ]
      })
    });

    if (!response.ok) {
      // Handle non-OK responses (e.g., 401 Unauthorized, 500 Server Errors)
      throw new Error(`API Request failed with status: ${response.status}`);
    }

    let data = await response.json();

    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      throw new Error("No valid choices found in the response");
    }
  } catch (error) {
    console.error("Error sending message:", error.message);
    return null;  // Return null in case of an error
  }
}

// Add the event listener separately
mix.addEventListener('click', async function() {
  let mixture = [];
  elements.forEach(element => {
    if (element.activated) {
      mixture.push(element.querySelector('p').innerText);
      console.log(mixture);
    }
  });

  // Ensure that there are at least two elements to mix
  if (mixture.length >= 2) {
    const message = `Hey ChatGPT, what would the mixture of the following elements be? If there is no possible mix, tell us. Otherwise, in a concise way, respond with the chemical result of the mix of the 2. Here's an example to how the mixtures should look: '2Fe + 3O₂ + 6H₂O -> 2Fe(OH)₃' - this was the reaction of salt and iron. However, this was only the corrosion in saltwater reaction. There are other reaction conditions as well. If that's the case, list all reactions and explain what each is. Do not forget to use only characters that Visual Studio Code will understand. Also make sure to introduce yourself as chemistryazerbaijan's AI bot. Anyway, here are the elements you need to mix: ${mixture[0]} and ${mixture[1]}`;
    document.querySelector(".loadd").innerText = "Loading...";
    // Call sendMessage and handle the result
    const gptResponse = await sendMessage(message);
    
    if (gptResponse) {
      console.log(gptResponse); // Log the response for debugging purposes
      gptAnswer.innerText = gptResponse;  // Update the UI with the response
      document.querySelector(".loadd").innerText = "";
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      });
      
    } else {
      gptAnswer.innerText = "Error getting response from API";  // Handle error case
    }
  } else {
    console.log("Not enough elements to create a mixture.");
  }
});
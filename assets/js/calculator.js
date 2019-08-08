// Only the addition functionality has been added.
function Calculator(){
    "use strict";

    let operands = [];
    let total = 0;
    let operator = "";

    let t = this;
    let result = 0;
    
    const add = function(total, n) {
        return(total + n);
    }

    const clearAll = function(){
        document.getElementById("container-display-stream").textContent = "";
        total = 0;
    }

    const clearDisplay = function(){
        document.getElementById("container-display-stream").textContent = "";
    }

    const equals = function(){
        console.log("Equals");
        operands[1] = document.getElementById("container-display-stream").textContent;

        if(operator == "+"){
            displayResult(add(parseInt(operands[0]), parseInt(operands[1])));
        }
        // Add other operators here
    }

    const input = function(e){   
        if(e.target.id == "btn-key-clear") {
            clearAll();
        } else if(e.target.id == "btn-key-add") {
            operands[0] = document.getElementById("container-display-stream").textContent;
            operator = "+";
            clearDisplay();
        } else if(e.target.id == "btn-key-equals") {
            equals();

        // Add other button checks here
        } else {  
            document.getElementById("container-display-stream").textContent += e.target.textContent;     
        }
    }

    const formatInput = function(s){
        // Format flairs added to result
        return s;
    }

    const formatResult = function(r){
        // Format the result to include thousandth spacing
        return r;
    }

    const displayResult = function(r){
        document.getElementById("container-display-stream").textContent = formatResult(r);
    }
    
    let buttons = document.getElementsByClassName("button-main");
    for (let i = 0; i < buttons.length; i++) { 
        buttons[i].addEventListener("click", input);
    }
}

let calc = new Calculator();

function CalculatorUI(){

    const documentObjectsProperties = {
        containerWrapperFX: document.getElementById("container-wrapper-fx"),
        wrapperOpacity: window.getComputedStyle(document.getElementById("container-wrapper-fx")).getPropertyValue('opacity')
    };

    const docOP = documentObjectsProperties;

    function setEventActions(){
        // Borked. The code below is meant to close the menu if area outside the settings/options window
        //      is clicked, but this isn't working as intended. Clicks are being registered when clicking 
        //      within the settings menu.
        // Either find a way to correct this (maybe z-index changes), or scrap the idea.
        // Added1: Possibly rotate settings window and FX overlay between z-indexes via JS. 
        //document.getElementById("container-wrapper-fx").addEventListener("click", function(){ closeSettings(docOP.containerWrapperFX, docOP.wrapperOpacity)});
        document.getElementById("settings-icon").addEventListener("click", () => openSettings(docOP.containerWrapperFX));
        document.getElementById("btn-settings-close").addEventListener("click", () => closeSettings(docOP.containerWrapperFX, docOP.wrapperOpacity));
        document.getElementById("btn-settings-closex").addEventListener("click", () => closeSettings(docOP.containerWrapperFX, docOP.wrapperOpacity));
    }

    function openSettings(element){
        if(!element.classList.contains("settings-fade-in"))  
            element.classList.add("settings-fade-in");
        document.getElementById("wrapper-settings").style.pointerEvents = "auto";
        document.getElementById("container-calculator").style.pointerEvents = "none";
    }

    function closeSettings(element, opacityValue){
        element.classList.remove("settings-fade-in");
        element.style.opacity = opacityValue;
        document.getElementById("wrapper-settings").style.pointerEvents = "none";
        document.getElementById("container-calculator").style.pointerEvents = "auto";
    }

    function beginAnimation(){
        let start = null;
        let element = document.getElementById('main-fx-overlay2');
        let degrees = [201,192, 48, 65, 4, 228, 163, 152, 302, 90];

        function step(timestamp){
        if (!start) start = timestamp;
        let progress = timestamp - start;
        element.style.background = `linear-gradient(${degrees[0]}deg, rgba(148, 148, 148, 0.07) 0%, rgba(148, 148, 148, 0.07) 50%,rgba(83, 83, 83, 0.07) 50%, rgba(83, 83, 83, 0.07) 100%),linear-gradient(${degrees[1]}deg, rgba(176, 176, 176, 0.08) 0%, rgba(176, 176, 176, 0.08) 50%,rgba(180, 180, 180, 0.08) 50%, rgba(180, 180, 180, 0.08) 100%),linear-gradient(${degrees[2]}deg, rgba(185, 185, 185, 0.1) 0%, rgba(185, 185, 185, 0.1) 50%,rgba(243, 243, 243, 0.1) 50%, rgba(243, 243, 243, 0.1) 100%),linear-gradient(${degrees[3]}deg, rgba(172, 172, 172, 0.09) 0%, rgba(172, 172, 172, 0.09) 50%,rgba(209, 209, 209, 0.09) 50%, rgba(209, 209, 209, 0.09) 100%),linear-gradient(${degrees[4]}deg, rgba(224, 224, 224, 0.03) 0%, rgba(224, 224, 224, 0.03) 50%,rgba(49, 49, 49, 0.03) 50%, rgba(49, 49, 49, 0.03) 100%),linear-gradient(${degrees[5]}deg, rgba(152, 152, 152, 0.03) 0%, rgba(152, 152, 152, 0.03) 50%,rgba(130, 130, 130, 0.03) 50%, rgba(130, 130, 130, 0.03) 100%),linear-gradient(${degrees[6]}deg, rgba(170, 170, 170, 0.08) 0%, rgba(170, 170, 170, 0.08) 50%,rgba(232, 232, 232, 0.08) 50%, rgba(232, 232, 232, 0.08) 100%),linear-gradient(${degrees[7]}deg, rgba(12, 12, 12, 0.05) 0%, rgba(12, 12, 12, 0.05) 50%,rgba(161, 161, 161, 0.05) 50%, rgba(161, 161, 161, 0.05) 100%),linear-gradient(${degrees[8]}deg, rgba(48, 48, 48, 0.1) 0%, rgba(48, 48, 48, 0.1) 50%,rgba(195, 195, 195, 0.1) 50%, rgba(195, 195, 195, 0.1) 100%),linear-gradient(${degrees[9]}deg, rgb(144, 14, 253),rgb(74, 115, 255))`;  
            for(let i = 0; i < degrees.length; i++){
                if(degrees[i] >= 360)
                    degrees[i] = 0;
                else
                    degrees[i] += 0.02;
            }
            window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
    }

    function init(){
        beginAnimation();
        setEventActions();
    }
    init();
}
CalculatorUI();
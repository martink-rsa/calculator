// Task: "Calculator" project for "The Odin Project" Web Development course.
// URL: https://www.theodinproject.com/lessons/calculator
// GitHub repo: https://github.com/martink-rsa/calculator
// GitHub page: https://martink-rsa.github.io/calculator/calculator.html

// **************
// ISSUES / BUGS
// **************
// 1 ---
// Same number being operated against itself is displaying the wrong information in the infoBar.
// Calculator logic still outputs the correct number.
//
// User input: 1 + 1 + 1 +   // Result is 3 and 3 is displayed
// infoBar: 1 + 2 + 3 +      // Appears to be taking the total 
//
// 2 ---
// Calculator not resesting when user calculates a sum and:
// * Presses an operator;
// * Press a number.
// The calculator should possibly do a soft reset by using the result as the left operand for further calculations,
//      IF the user is not doing successive equal button presses.
// 3 ---
// Repeating different operator(s) needs to switch signs instead of trying to perform a calculation
// Will currently result in 0 when repeated.

// To-do:
// Find and add functionality to empty "available" button.
// 
//

// Ideas / considerations / to-do outside of normal development:
//
// Display:
// * Format thousandth separators

// Key Codes (JS Escape Sequence):
//
// +- \u00B1
// sqrt \u221A
// × \xD7
// 

function Calculator(){
    "use strict";
    
    let operands = [], // left operand = operands[0], right operand = operands[1]
        operator = "",
        t = this,  
        signs = [ // Array for substituting visually correct mathematical signs
        ["*",
        "/",
        "sqrt"],
        ["\xD7",
        "\xF7",
        "\u221A"]];
    let stream = document.getElementById("container-display-stream");
    let lastAction;
    let infobar = document.getElementById("display-infobar");
         

    const calculate = function(n1, operator, n2){
        let result;
        if(operator == "+"){
            result = parseFloat(n1) + parseFloat(n2);
        } else if(operator == "-"){
            result = parseFloat(n1) - parseFloat(n2);
        } else if(operator == "*"){
            result = parseFloat(n1) * parseFloat(n2);
        } else if(operator == "/"){
            result = parseFloat(n1) / parseFloat(n2);

        // R.I.P other operators that were inlcuded in the initial design: %, sqrt, powX(root), pow3(cube)
        // They require their own implementation checks as I planned to have visual changes.
        // Will attempt to add them again at a later stage.

        }
        return result;
    }

    const input = function(e){

        // C button
        if(e.target.id == "btn-key-clear") {
            lastAction = "clear";
            resetCalculator();
         
        // Backspace Button
        } else if(e.target.id == "btn-key-backspace") {
            if(stream.textContent != "0"){
                if(stream.textContent.length == 1)
                    stream.textContent = "0";
                else
                    stream.textContent = stream.textContent.slice(0, stream.textContent.length - 1);
            }

        // = Button
        } else if(e.target.id == "btn-key-equals") {
            if (operands[0]){   
                if(lastAction == "calculate"){
                    operands[0] = formatInput(stream.textContent);                   
                } else {
                    operands[1] = formatInput(stream.textContent);
                }
                displayResult(calculate(operands[0],operator,operands[1]));
                displayInfobar(operands[1],"=", stream.textContent);
                lastAction = "calculate";
            }
            
        // +- button
        } else if(e.target.id == "btn-key-plusminus") {
            stream.textContent *= -1;
            lastAction = "plusminus";

        // . button
        } else if(e.target.id == "btn-key-decimal") {
            if(!stream.textContent.includes("."))
                stream.textContent += e.target.textContent;
            lastAction = "decimal";

        } else if(e.target.textContent >= "0" && e.target.textContent <= "9") {  
            if(lastAction == "operator" || (stream.textContent == "0" && !operands[0])){
                clearDisplay();
            }
            stream.textContent += e.target.textContent; 
            lastAction = "number";

        } else if(e.target.id == "btn-key-available") {
            console.log("Available key: Working")
                    
        // All other controls
        } else {
            if(!operands[0] ){                  
                operands[0] = formatInput(stream.textContent);
                
            }else{    
                operands[1] = formatInput(stream.textContent);
                displayResult(calculate(operands[0],operator,operands[1]));   
            } 
            
            // Key presses
            if(e.target.id == "btn-key-add")
                operator = "+";
            else if(e.target.id == "btn-key-minus")
                operator = "-";
            else if(e.target.id == "btn-key-multiply")
                operator = "*";
            else if(e.target.id == "btn-key-divide")
                operator = "/";

            operands[0] = formatInput(stream.textContent);
            displayInfobar(operands[0], operator);
            lastAction = "operator";
        } 
    }

    // Typically, the left operand and a operator are passed:
    //      "1", "+"
    // An exception is the equal sign being pressed, which passes
    //      "5", "=", "6"
    const displayInfobar = function(...args){
        if(args[0] == "0" || args.includes("Infinity") ){ 
            infobar.textContent = "0";
        } else {
            let s = "",
                current = "",
                equalsFound = 0;
            
            if(infobar.textContent == "0")
                infobar.textContent = "";

            for(let i = 0; i < args.length; i++){
                current = args[i];

                // Brackets no longer applied to negative numbers once the equal sign has been parsed
                if(current == "=") 
                    equalsFound = 1;
                if(parseFloat(args[i]) <= 0 && !equalsFound){
                    current = "(" + current + ")";
                }

                // Successive equal button presses will need an operand added 
                // 56 + 5 = 61 5 = 66 should look like 56 + 5 = 61 + 5 = 66
                if(lastAction == "calculate" && i == 0){
                    current = operator + " " + current;
                }

                // Switch signs if the operator matches a replacement character
                // / = ÷
                if(signs[0].findIndex(v => v == current) != -1){
                    current=signs[1][signs[0].findIndex(v => v == current)];
                }

                s += current + " ";
            }    
            infobar.textContent += s;
        }       
    } 

    const clearDisplay = function(){
        stream.textContent = "";
    }

    const resetCalculator = function(){
        operands[0] = "";
        operands[1] = "";
        displayResult("0");
        infobar.textContent = "0";
    }

    const displayResult = function(r){
       
        stream.textContent = formatResult(r);   
    }

    const formatInput = function(s){
        // Format flairs added to result
        return s;
    }

    const formatResult = function(r){
        // Format the result to include thousandth spacing
        return r;
    }
    
    // Should move events to it's own function.
    // Events 
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
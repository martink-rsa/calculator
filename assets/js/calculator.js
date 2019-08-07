



document.getElementById("settings-icon").addEventListener("click", function(){
    openSettings();
});

let mainWrapperFX = document.getElementById("container-wrapper-fx");
let wrapperOpacity = window.getComputedStyle(document.getElementById("container-wrapper-fx")).getPropertyValue('opacity');



document.getElementById("d1").addEventListener("click", function(){ 
    if(!mainWrapperFX.classList.contains("settings-fade-in"))  
        mainWrapperFX.classList.add("settings-fade-in");

});

document.getElementById("d2").addEventListener("click", function(){
    
    mainWrapperFX.classList.remove("settings-fade-in");
    mainWrapperFX.style.opacity = wrapperOpacity;

});

let start = null;
var element = document.getElementById('main-fx-overlay2');
let degrees = [201,192, 48, 65, 4, 228, 163, 152, 302, 90];

function step(timestamp){
  if (!start) start = timestamp;
  var progress = timestamp - start;
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


function openSettings(){
    let mainWrapper = document.getElementById("wrapper-settings");
    let mainWrapperFX = document.getElementById("container-wrapper-fx");
    mainWrapperFX.classList.add("settings-fade-in");
}
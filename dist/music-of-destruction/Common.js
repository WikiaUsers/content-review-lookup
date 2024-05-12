/* Any JavaScript here will be loaded for all users on every page load. */
function cleanFormula(formula) {
    return formula.replace(/[^0-9.+*\/()-]/g, '');
}

const sliderBar = document.getElementById("sliderBar");
const sliderThumb = document.getElementById("sliderThumb");
const output = document.getElementById("output");
const descriptionOutput = document.getElementById("descriptionOutput");
const abilityImage = document.getElementById("ability-image");
const currentLvl = document.getElementById('current-lvl');

let isDragging = false;
let selectedAbility = null;

sliderThumb.addEventListener("mousedown", function() {
    isDragging = true;
});

document.addEventListener("mousemove", function(e) {
    if (isDragging) {
        let newPos = e.clientX - sliderBar.getBoundingClientRect().left;
        if (newPos >= 0 && newPos <= sliderBar.offsetWidth) {
            sliderThumb.style.left = newPos + "px";
            let value = Math.ceil(newPos / sliderBar.offsetWidth * Number(abilities[selectedAbility].getAttribute("data-maxLvl")));
            if (selectedAbility !== null) {
                if (abilities[selectedAbility].getAttribute(`data-formula1`) == '') {
                    return null;
                }else{
                    
                    // Clear existing content in output element
                    output.innerHTML = '';
                }
                
                LoadAllFormulas();

            }
        }
    }
});

document.addEventListener("mouseup", function() {
    isDragging = false;
});

let abilities = document.querySelectorAll(".ability");

abilities.forEach(function(ability, index) {
    ability.addEventListener("click", function() {
        selectedAbility = index;
        if ((abilities[selectedAbility].getAttribute("data-formula1") == 'DPS')) {
            output.innerHTML = '';

            LoadAllFormulas();

        }else if((abilities[selectedAbility].getAttribute("data-formula1") == '')){
            output.innerHTML = '';
            
            currentLvl.innerHTML = '';
            
            let AbilityDescription = abilities[selectedAbility].getAttribute("data-abilityDescription1");
            abilityImage.innerHTML = abilities[selectedAbility].innerHTML;
            output.innerHTML = `${AbilityDescription}` ;
            descriptionOutput.innerHTML = abilities[selectedAbility].getAttribute("data-description");
        }else{
            output.innerHTML = '';
            LoadAllFormulas();
        }
    });
});

function LoadAllFormulas() {
    let value = Math.ceil(sliderThumb.offsetLeft / sliderBar.offsetWidth * Number(abilities[selectedAbility].getAttribute("data-maxLvl")));

    currentLvl.innerHTML = 'current ability lvl:' + value;
    abilityImage.innerHTML = abilities[selectedAbility].innerHTML;

    
    for (let index = 1; index <= 4; index++) {
        if (abilities[selectedAbility].getAttribute(`data-formula${index}`) && abilities[selectedAbility].getAttribute(`data-abilityDescription${index}`)) {
            if (abilities[selectedAbility].getAttribute(`data-formula${index}`) == 'DPS') {
                let formula = abilities[selectedAbility].getAttribute(`data-formula${index}`).replace("{{value}}", value);
                let AbilityDescription = abilities[selectedAbility].getAttribute(`data-abilityDescription${index}`);
                // Append new content to output element

                output.innerHTML += `<p>${AbilityDescription} ${formula}</p>`;
            }
            else{

                let formula = abilities[selectedAbility].getAttribute(`data-formula${index}`).replace("{{value}}", value);
                let cleanFormulaText = cleanFormula(formula);
                let AbilityDescription = abilities[selectedAbility].getAttribute(`data-abilityDescription${index}`);
                // Append new content to output element
                output.innerHTML += `<p>${AbilityDescription} ${formula} = ${eval(cleanFormulaText)}</p>`;
            }
        }
    }

    descriptionOutput.innerHTML = abilities[selectedAbility].getAttribute("data-description");

}
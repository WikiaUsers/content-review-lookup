// Creates a number scroll on in Temtem infoboxes to calculate the freetem reward based on level
$(function () {
    if(!document.getElementById('freetemReward')){return;} // early return

    var freetemRewardDiv = document.getElementById('freetemReward');
    var catchRate = freetemRewardDiv.dataset.catchRate;
    var freetemRewardResultEl = document.getElementById('freetemRewardResult');

    function updateReward(catchRate, level) {
        return (20 + Math.ceil((level / catchRate) * 270));
    }

    if (catchRate == 0){
        catchRate = 200;
    }
    var freetemRewardInput = document.createElement('input');
    Object.assign(freetemRewardInput, {"type":"number", "min":"1", "max":"100", "maxLength":"6", "value":"1", "style":"width:3.5em;"});
    freetemRewardInput.addEventListener("change", function(){
        freetemRewardResultEl.textContent = updateReward(catchRate, freetemRewardInput.value);
    })
    freetemRewardDiv.append(freetemRewardInput);
    freetemRewardResultEl.textContent = updateReward(catchRate, 1);
});
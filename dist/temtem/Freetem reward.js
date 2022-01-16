// Creates a number scroll on in Temtem infoboxes to calculate the freetem reward based on level
RLQ.push(['jquery', function () {
    if(document.getElementById('freetemReward')){
        var freetemRewardDiv = document.getElementById('freetemReward');
        var catchRate = freetemRewardDiv.dataset.catchRate;
        var freetemRewardResultEl = null;

        function updateReward(catchRate, level) {
            return (20 + Math.ceil((level / catchRate) * 270));
        }

        if (catchRate) {
            if (catchRate == 0){
                catchRate = 200;
            }
            freetemRewardDiv.innerHTML = 'Level <input type="number" min="1" max="100" maxlength="6" value="1" onchange="freetemRewardResultEl.innerHTML = updateReward(' + catchRate + ', this.value)" style="width:3.5em">: <span id="freetemRewardResult"></span>';
            freetemRewardResultEl = document.getElementById('freetemRewardResult');
            freetemRewardResultEl.innerHTML = updateReward(catchRate, 1);
        }
    }
}]);
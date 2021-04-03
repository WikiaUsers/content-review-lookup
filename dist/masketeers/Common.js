switch (mw.config.get('wgPageName')) {
    case 'Arcana':
        arcanaCalc();
        break;
    case 'Template:ArcanaCalculator':
        arcanaCalc();
        break;
}

function arcanaCalc() {
	var $arcanaCalcName = $("#arcanaCalc"),
		arcanaCalcHtml = '<form style="display:initial" id="arcaneCalc"><label for="stageNumber">Stage:</label><input style="float: right; width:35%;" type="number" id="stageNumber" min="60" max="10000"></br><label for="chimeLevel">Chime level:</label><input style="float: right; width:35%;" type="number" id="chimeLevel" min="0" max="1000"></br><label for="eliteLevel">Elite tier:</label><input style="float: right; width:35%;" type="number" id="eliteLevel" min="0" max="7"></br><input style="background-color:#8939d0; border-radius: 8px; color:white;" type="button" onclick="" value="Calculate" id="calculate"/></form>';
		
		$arcanaCalcName.html(arcanaCalcHtml);
		
}
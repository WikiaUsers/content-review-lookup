$("document").ready(function(){
	if ($("#BuildHippoForm").length == 1){
		
		$("#BuildHippoForm").append(BuildHippoFormHTML());
		$("#BuildHippoForm").append(BuildHippoResult());
		
		//submit form for calculations
		$("#hc_submitHippo").click(function(){
			runHippoCalc($("#hippoForm").closest("form"));
		});
		
		//reset form for calculations
		$("#hc_resetHippo").click(function(){
			resetHippoCalc();
		});
	}
});

function BuildHippoFormHTML()
{
	return	'<form class="formContainer" style="margin-bottom:0;" id="hippoForm">'+
				'<table cellspacing="0" cellpadding="2" style="padding-bottom:2px;">'+
					'<tr>'+
						'<th width="60px">Stage</th>'+
						'<td><b>Max Hippo</b><sup style="cursor:help;" title="Hippo = Hidden Power">(?)</sup></td>'+
						'<td><b>Evo Cost</b><sup style="cursor:help;" title="Number of copies to evolve to next stage. &#10;For super-cannibals such as Lykos, input (1, 2, 4, 8). Otherwise, input (1, 1, 1, 1)">(?)</sup></td>'+
					'</tr>'+
					'<tr>'+
						'<th>1</th>'+
						'<td><input type="number" min="0" max="99" name="hippo1"></td>'+
						'<td><input type="number" min="0" max="99" name="evo1"></td>'+
					'</tr>'+
					'<tr>'+
						'<th>2</th>'+
						'<td><input type="number" min="0" max="99" name="hippo2"></td>'+
						'<td><input type="number" min="0" max="99" name="evo2"></td>'+
					'</tr>'+
					'<tr>'+
						'<th>3</th>'+
						'<td><input type="number" min="0" max="99" name="hippo3"></td>'+
						'<td><input type="number" min="0" max="99" name="evo3"></td>'+
					'</tr>'+
					'<tr>'+
						'<th>4</th>'+
						'<td><input type="number" min="0" max="99" name="hippo4"></td>'+
						'<td><input type="number" min="0" max="99" name="evo4"></td>'+
					'</tr>'+
					'<tr>'+
						'<th>5</th>'+
						'<td><input type="number" min="0" max="99" name="hippo5"></td>'+
						'<td></td>'+
					'</tr>'+
					'<tr>'+
						'<td colspan="3"><hr style="padding:0; margin:1px 0;" /></td>'+
					'</tr>'+
					'<tr>'+
						'<td></td>'+
						'<td><b>Hippos</b></td>'+
						'<td><b>At Stage</b></td>'+
					'</tr>'+
					'<tr>'+
						'<th width="60px">Target:</th>'+
						'<td><input type="number" min="0" max="99" name="targetHP"></td>'+
						'<td><input type="number" min="1" max="5" name="targetEvo" /></td>'+
					'</tr>'+
					'<tr>'+
						'<td></td>'+
						'<td><input type="button" id="hc_submitHippo" value="Submit" /></td>'+
						'<td><input type="reset" id="hc_resetHippo" value="Clear" /></td>'+
					'</tr>'+
				'</table>'+
			'</form>';
}

function BuildHippoResult()
{
	return '<div style="display:none; border-top:2px dotted orange; margin-top:5px;" id="hippoCalcResult"></div>';
}

function resetHippoCalc()
{
	$("#hippoCalcResult").slideUp(300);
}

function copies_counting(hippo, evo, targetHP, targetEvo) {
	// hippo: array of max hippo at stage 0 1 2 ...
	// evo: array of evo cost TO stage 0 1 2 ... (evo[0] = 0)
	// targetHP: number hippo wanted
	// targetEvo: evo stage wanted

        validateHippoInput(hippo, evo, targetHP, targetEvo);

	hippo.unshift(0);
	evo.unshift(0, 1);
	var last = [0];
	for (var i = 1; i <= targetEvo; i++) {
		var copies = [ last[0] + evo[i] ];
		var jmax = Math.min(targetHP, hippo[i]);  // no need to count beyond targetHP
		for (var j = 1; j <= jmax; j++) {
			var min = copies[0] + copies[j - 1];
			for (var k = 1; k < (j+1)/2; k++) {
				min = Math.min(min, copies[k] + copies[j - 1 - k]);  // combined from fewer HPs
			}
			if (j <= hippo[i - 1]) {
				min = Math.min(min, last[j] + evo[i]);  // evolve from last stage
			}
			copies[j] = min;
		}
		last = copies;
	}
	
	return last[last.length - 1];
}

function validateHippoInput(hippo, evo, targetHP, targetEvo) {
    if (isNaN(targetEvo)) {
        throw "Error: Invalid target evo stage";
    }
    if (targetEvo > hippo.length || targetEvo > evo.length + 1) {
        throw "Error: Insufficient data";
    }
    if (isNaN(targetHP) || targetHP > hippo[targetEvo-1]) {
        throw "Error: Invalid target hippo";
    }
}

function appendInt(cur) {
    if (cur != undefined) {
        this.push(parseInt(cur));
        return true;
    }
    return false;
}

function accumulate(prev, cur, index, array) {
        if (cur.value != "") {
            prev[cur.name] = cur.value;
        }
        return prev;
}

function runHippoCalc(form) {
    var formData = form.serializeArray().reduce(accumulate, {});

    var hippo = [];
    [formData["hippo1"], formData["hippo2"], formData["hippo3"], formData["hippo4"], formData["hippo5"]].every(appendInt, hippo);
    var evo = [];
    [formData["evo1"], formData["evo2"], formData["evo3"], formData["evo4"]].every(appendInt, evo);
    var targetHP = parseInt(formData["targetHP"]);
    var targetEvo = parseInt(formData["targetEvo"]);
    
    var msg = "";
    try {
        var copies = copies_counting(hippo, evo, targetHP, targetEvo);
        msg = "<span>Result: You need <b>" + copies + "</strong> copies</b>.</span>";
        //msg += "<br /><small><i>Optimal evo path coming soon to a wiki near you</i></small>";
    }
    catch (e) {
        if (typeof(e) == "string") {
            msg = e;
        }
    }

    $("#hippoCalcResult").html(msg).slideDown(300);
}
$("document").ready(function(){
	if ($("#BuildXPForm").length == 1){
		$("#BuildXPForm").append(BuildXPFormHTML());
		$("#BuildXPForm").append(BuildXPResult());
		
		//submit form for calculations
		$("#xpc_submitExp").click(function(){
			calcExp();
		});
		
		//reset form for calculations
		$("#xpc_resetExp").click(function(){
			resetCalcExp();
		});
	}
});

function BuildXPFormHTML()
{
	return	'<form class="formContainer" id="XPForm" onReset="resetCalcExp()" style="margin-bottom:0;">'+
				'<table>'+
					'<tr>'+
						'<td width="100px"><label for="xpc_curExp">Current EXP:</label></td>'+
						'<td><input type="number" min="-1" max="999999" id="xpc_curExp" /></td>'+
					'</tr>'+
					'<tr>'+
						'<td><label for="xpc_targetRank">Spirit Rank:</label></td>'+
						'<td>'+
							'<select name="Rank" id="xpc_targetRank">'+
								'<option>SS</option>'+
								'<option>S+</option>'+
								'<option>S</option>'+
								'<option>A+</option>'+
								'<option>A</option>'+
								'<option>B+</option>'+
								'<option>B</option>'+
								'<option>C+</option>'+
								'<option>C</option>'+
							'</select>'+
						'</td>'+
					'</tr>'+
					'<tr>'+
						'<td>Use Books:</td>'+
						'<td><input type="checkbox" id="xpc_S_Book" /><label for="xpc_S_Book" style="margin-right:8px;">S</label>'+
						'<input type="checkbox" id="xpc_A_Book" /><label for="xpc_A_Book" style="margin-right:8px;">A</label>'+
						'<input type="checkbox" id="xpc_B_Book" /><label for="xpc_B_Book">B</label></td>'+
					'</tr>'+
					'<tr>'+
						'<td style="vertical-align:top;">Options:</td>'+
						'<td><input type="checkbox" id="xpc_bonusExp" /><label for="xpc_bonusExp">1.5x EXP</label>'+ '<br />' +
						'<input type="checkbox" id="xpc_offColor" /><label for="xpc_offColor">Off-color books</label></td>'+
					'</tr>'+
					'<tr>'+
						'<td></td>'+
						'<td><input type="button" id="xpc_submitExp" value="Submit" /> <input type="reset" id="xpc_resetExp" value="Clear" /></td>'+
					'</tr>'+
				'</table>'+
			'</form>';
}

function BuildXPResult(){
    return '<div style="display:none; border-top:2px dotted orange; margin-top:5px;" id="expCalcResult"></div>';
}

function resetCalcExp()
{
	$("#expCalcResult").slideUp(300);
}

function calcExp() {
	//EXP for each rank starting from SS and descending to C
	var rank =[153460, 102212, 63204, 35620, 19564, 10268, 4502, 1067, 81];
	var SBook=[8431, 10538, 12621, 15776];
	var ABook=[1442, 1802, 2148, 2685];
	var BBook=[291, 364, 427, 533];
 
	var ExpDiff = rank[ $("#xpc_targetRank").prop("selectedIndex")] - $("#xpc_curExp").val();
	var result = ["", ExpDiff];
	var html = "";
	
	if ($("#xpc_curExp").val() < 0) {
		$("#expCalcResult").html("Kuma must really hate you to give you spirits with negative EXP.").slideDown(300);
		return;
	}
 
	if ($("#xpc_S_Book").prop('checked')) {
		result = checkOpts(result, SBook, " S Books");
	}
 
	if ($("#xpc_A_Book").prop('checked')) {
		result = checkOpts(result, ABook, " A Books");
	}
 
	if ($("#xpc_B_Book").prop('checked')) {
		result = checkOpts(result, BBook, " B Books");
	}
 
	if ($("#xpc_S_Book").prop('checked') || $("#xpc_A_Book").prop('checked') || $("#xpc_B_Book").prop('checked')) {
		result[0] += " and " + result[1] + " EXP";
	} else {
		result[0] += result[1] + " EXP";
	}
	
	html +=	'<table>' +
				'<tr>' +
					'<td width="100px">Target EXP:</td>' +
					'<td>' + rank[ $("#xpc_targetRank").prop("selectedIndex")] + '</td>' +
				'</tr>' +
				'<tr>' +
					'<td>EXP Needed:</td>' +
					'<td>' + ExpDiff + '</td>' +
				'</tr>';
	
	if (ExpDiff < 0) {
		html += '<tr><td colspan="2">Negative EXP to reach max level? Stop trying to break the calculator, man. (Current EXP is too large for the selected Spirit Rank)</td></tr>';
	}
	else {
		html += '<tr><td style="vertical-align:top;">It will take:</td><td>' + result[0] + ' to reach max level.</td></tr>';
	}
	
	html +=	"</table>"
	$("#expCalcResult").html(html).slideDown(300);
}
 
//Checks for bonus EXP and off color
function checkOpts(input, bookExp, book){
	if ($("#xpc_offColor").prop('checked')) {
		if ($("#xpc_bonusExp").prop('checked')) {
			//Off color + bonus EXP
			input = calcDiff(input, bookExp[2], book);
		}	
		else {
			//Off color + no bonus EXP
			input = calcDiff(input, bookExp[0], book);
		}
	}
	else {
		if ($("#xpc_bonusExp").prop('checked')) {
			//On color + bonus EXP
			input = calcDiff(input, bookExp[3], book);
		}
		else {
			//On color + no bonus EXP
			input = calcDiff(input, bookExp[1], book);
		}
	}
	return input;
}
 
//Finds the max number of books possible without wasting EXP
function calcDiff(input, exp, book) {
	var count = 0;
 
	while (input[1] >= exp) {
		input[1] -= exp;
		count++;
	}
	input[0] += count + book + ", ";
	return input;
}
/******************************************************/
/* Multikick w/tab insert                             */
/* Idea by Madnessfan34537 and Phillycj               */
/* Code by Madnessfan34537, Joeytje50 and Callofduty4 */
/******************************************************/
 
//Multikicker
//Written by Madnessfan34537 and Callofduty4
 
function showPopup() {
        $('body').append('<section style="left: 50%; top: 50px; width: 434px; z-index: 2000000002; margin-left: -222px;" class="modalWrapper" id="masskicker"><button class="close wikia-chiclet-button" onclick="cancelKick()"><img src="https://images.wikia.nocookie.net/__cb57523/common/skins/oasis/images/icon_close.png"></button><h1>Mass-kick</h1><section class="modalContent"><div><form method="" name="" class="WikiaForm "><fieldset><p>Enter usernames here, separated by a comma and a space. Tab insert works.</p><input type="text" name="multikickinput" id="multikickinput" /></fieldset></form><div style="float:right;"><a onclick="kickUsers()" class="wikia-button">Kick!</a>&nbsp;<a onclick="cancelKick()" id="cancel" class="wikia-button secondary">Cancel</a></div></section></section>');
	$('body').append('<div style="height: 100%; width: 100%; z-index: 2000000001; opacity: 0.65; display: block;" data-opacity="0.65" class="blackout"></div>');
}
 
function kickUsers() {
	var multikick = $('#multikickinput').val()
	if (multikick.length != 0) {
		var usersToKick = multikick.split(", ");
		var i = 0;
		for (i; i<usersToKick.length; i++) {
			mainRoom.kick({name:usersToKick[i]});
		}
		$('#masskicker').remove();
		$('.blackout').remove();
	}
}
 
function cancelKick() {
	$('#masskicker').remove();
	$('.blackout').remove();
}
 
$('<a id= "multiKickerButton" class="wikia-button" href="javascript:showPopup()" style="position:absolute; right:55px; top:22px;">Multikick</a>').appendTo('.Write');
 
 
//Tab insert for usernames
//Written by Joeytje50 of Runescape wiki
 
function getCaretPos(ctrl) {
    var CaretPos = 0;    // IE Support
    if (document.selection) {
    ctrl.focus ();
        var Sel = document.selection.createRange ();
        Sel.moveStart ('character', -ctrl.value.length);
        CaretPos = Sel.text.length;
    }
    // Firefox support
    else if (ctrl.selectionStart || ctrl.selectionStart == '0')
        CaretPos = ctrl.selectionStart;
    return (CaretPos);
}
function setCaretPos(ctrl, pos){
    if(ctrl.setSelectionRange)
    {
        ctrl.focus();
        ctrl.setSelectionRange(pos,pos);
    }
    else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}
 
$('#multikickinput').after('<span style="display:none;" id="autofilldata">[0,"","",0,null]</span>');
$('#multikickinput').keydown(function(e) {
	if (e.keyCode == 9) {
		e.preventDefault();
		var curval = this.value;
		var afData = eval(document.getElementById('autofilldata').innerHTML);
		var curpos = afData[3]==0?getCaretPos(this):afData[3];
		var carpos = getCaretPos(this)
		if ((!curval.charAt(carpos)||curval.charAt(carpos).match(/\s/))&&!curval.charAt(carpos-1).match(/\s/)&&this.value.length) {
			var unamestart = '';
			if (afData[1].length==0) {
				for (i=curpos-1;i>=0&&!curval.charAt(i).match(/\s/);i--) {
					unamestart = curval.charAt(i) + unamestart;
				}
			} else {
				unamestart = afData[1];
			}
			var afterTComplete = '';
			for (i=curpos;i<curval.length;i++) {
				afterTComplete += curval.charAt(i);
			}
			//generate list of users
			var userList = '';
			var userlistelems = document.getElementsByClassName('User');
			for (i=0;i<userlistelems.length;i++) {
				userList += userlistelems[i].getElementsByClassName('username')[0].innerHTML+',';
			}
			userList = userList.replace(new RegExp('('+wgUserName+'|RSChatBot),|,$','g'),'')
			userList = userList.split(',').sort()
			var matchedNames = [];
			for (i=0;i<userList.length;i++) {
				if (userList[i].match(new RegExp('^'+unamestart, 'i'))) {
					matchedNames.push(userList[i]);
				}
			}
			var newval = curval.split('');
			for (i=carpos-1;i>=0&&i>=carpos-(!(afData[4]===null)?(matchedNames[afData[4]]?matchedNames[afData[4]].length:0) : unamestart.length)&&matchedNames.length>0;i--) {
				newval[i] = '';
			}
			matchedNames = !matchedNames[0]?['']:matchedNames;
			newval[curpos-unamestart.length] += matchedNames[afData[0]]?matchedNames[afData[0]]:'';
			newval = newval.join('');
			this.value = newval;
			setCaretPos(this, curpos+(matchedNames[afData[0]].length?matchedNames[afData[0]].length:0))
			var iter = afData[0]>=matchedNames.length-1?0:afData[0]+1;
			document.getElementById('autofilldata').innerHTML = '['+iter+',"'+unamestart+'","'+matchedNames[afData[0]]+'",'+curpos+','+afData[0]+']'
		}
		return false;
	} else if (e.which != 16) {
		document.getElementById('autofilldata').innerHTML = '[0,"","",0,null]';
	}
}).click(function() {
	document.getElementById('autofilldata').innerHTML = '[0,"","",0,null]';
}).blur(function() {
	document.getElementById('autofilldata').innerHTML = '[0,"","",0,null]';
})
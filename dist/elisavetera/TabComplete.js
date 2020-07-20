//Tab insert for usernames
$('[name="message"]').after('<span style="display:none;" id="autofilldata">[0,"","",0,null]</span>');
$('[name="message"]').keydown(function(e) {
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
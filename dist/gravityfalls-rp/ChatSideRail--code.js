
//<source lang="javascript">
/* ChatRail thing by ChaoticShadow
/* Special Thanks to: Slyst, Shining-Armour, RansomTime and others
/*
/* Minimum Requirements to run this:
/* - Potato PC
/*
/* Features
/* - Kick, Ban, AutoKick (Mod only)
/* - Music
/* - User Info blah blah blah
/*
*/
 
if(wgCanonicalSpecialPageName == 'Chat') {
    //Rail
    var rail = $('<section id="WikiaPage" class="WikiaPage" style="left: 10px !important; right: 90% !important; width: 9% !important;"></section>');
 
    var searchbar = $('\
    <div style="overflow: hidden; height: 35px; position:relative; margin-top: -46px; margin-left: 124px;">\
        <form name="searchbox" id="searchbox" class="searchbox" action="/wiki/Special:Search" target="_blank">\
            <input class="searchboxInput" name="search" type="text" value="" placeholder="" size="50">\
            &nbsp;\
            <input type="submit" name="go" class="searchboxGoButton" value="Try exact match">\
            &nbsp;\
            <input type="submit" name="fulltext" class="searchboxSearchButton" value="Search full text">\
        </form>\
    </div>');
 
    var switchrail = $('\
    <table style="width:100%;">\
        <tr>\
            <td style="width:50%;">\
                <button onclick="switchMT()" style="width:100%;">Mod Tools</button>\
            </td>\
            <td style="width:50%;">\
                <button onclick="switchUI()" style="width:100%">User Info</button>\
            </td>\
        </tr>\
        <tr>\
            <td style="width:50%;">\
                <button onclick="switchMU()" style="width:100%;">Music</button>\
            </td>\
        </tr>\
        <tr>\
            <td colspan="2">\
                <hr />\
            </td>\
        </tr>\
    </table>');
 
    var mtrail = $('\
    <table style="width:100%;" id="mtrail">\
        <tr>\
            <td><input type="text" id="userinput" value="" style="width:100%;"></td>\
        </tr>\
        <tr>\
            <td><button onclick="kick()" id="kickbutton" style=width:100%;">Kick</button></td>\
        </tr>\
        <tr>\
            <td><button onclick="ban()" id="banbutton" style=width:100%;">Ban</button></td>\
        </tr>\
        <tr>\
            <td><button onclick="autokick()" id="autokickbutton" style=width:100%;">AutoKick</button></td>\
        </tr>\
    </table>');
 
    var uirail = $('\
    <table style="width:100%;" id="uirail">\
        <tr>\
            <td><input type="text" id="userinfo" value="" style="width:100%;"></td>\
        </tr>\
        <tr>\
            <td><button onclick="userpage()" id="userpage" style=width:100%;">User Page</button></td>\
        </tr>\
        <tr>\
            <td><button onclick="talkpage()" id="talkpage" style=width:100%;">Talk Page</button></td>\
        </tr>\
        <tr>\
            <td><button onclick="messagewall()" id="mwall" style=width:100%;">Message Wall</button></td>\
        </tr>\
        <tr>\
            <td><button onclick="blog()" id="blog" style=width:100%;">Blog</button></td>\
        </tr>\
        <tr>\
            <td><button onclick="contribs()" id="contribution" style=width:100%;">Contributions</button></td>\
        </tr>\
        <tr>\
            <td><button onclick="banlog()" id="banlog" style=width:100%;">Ban Log</button></td>\
        </tr>\
        <tr>\
            <td><button onclick="blocklog()" id="blocklog" style=width:100%;">Block Log</button></td>\
        </tr>\
        <tr>\
            <td><button onclick="log()" id="publiclogs" style=width:100%;">Logs</button></td>\
        </tr>\
    </table>');
 
    var murail = $('\
    <table style="width:100%;" id="murail">\
        <tr>\
            <td><button onclick="addmusic()" style="width:100%;">Add Music</button></td>\
        </tr>\
        <tr>\
            <td><button onclick="removemusic()" style=width:100%;">Remove Music</button></td>\
        </tr>\
        <tr>\
            <td><hr /></td>\
        </tr>\
        <tr>\
            <td><div id="musiclist" style ="width:100%; height:100%; overflow-y:auto; border:1px solid gray;"></div></td>\
        </tr>\
    </table>');
 
    var aboutbutton = $('<table style="width:100%; position:absolute; bottom:0;"><tr><td><button onclick="about()" style="width:100%;">About</button></td></tr></table>');
 
 
    //Credit goes to author in Wikipedia
    function userIsInGroup(group) {
        if (wgUserGroups) {
            if ( !group || group.length == 0 ) {
                group = '*';
            }
		for(var i in wgUserGroups)
			if (wgUserGroups[i]==group) return true;
        }
        return false;
    }
    //Thanks to RansomTime, with some modifications
    function exist (variable) {
        if (variable == ""){
            return false;
        }
        return true;
    }
 
    function switchMT() {
        murail.hide();
        uirail.hide();
        if(userIsInGroup('sysop') || userIsInGroup('bureaucrat') || userIsInGroup('chatmoderator') || userIsInGroup('VSTF')) {
            mtrail.show();
        }
        else {
            $.showCustomModal( 'Insuficient rights', 'Your current rights: ' + wgUserGroups.toString() + '<br />Only users with one or more of the following rights can use these functions (Kick, Ban, Autokick): bureaucrat,sysop,chatmoderator,vstf');
        }
    }
 
    function switchUI() {
        mtrail.hide();
        murail.hide();
        uirail.show();
    }
 
    function switchMU() {
        mtrail.hide();
        uirail.hide();
        murail.show();
    }
 
    //Thanks S-A for clearing this up and explaining
    function kick() {
        var user = $('#userinput').val();
        if (exist(user) === true ) {
            mainRoom.kick({
                name: user
            });
        }
    }
 
    function ban() {
        var user = $('#userinput').val();
        if (exist(user) === true ) {
            mainRoom.ban({
                name: user
            });
        }
    }
 
    function autokick() {
        alert('Do not use');
        var user = $('#userinput').val();
        if (exist(user) === true ) {
            $.showCustomModal()
            mainRoom.kick({
                name: user
            });
        }
    }
 
    //Idk what happens if I don't define user every time
    //I swear slyst pretty much wrote the whole thing: {
    function userpage() {
        var user = $('#userinfo').val();
        var open = '/wiki/User:' + user;
        if (exist(user)) {
            window.open(open, 'blank');
        }
    }
 
    function talkpage() {
        var user = $('#userinfo').val();
        var open = '/wiki/User_talk:' + user;
        if (exist(user)) {
            window.open(open, 'blank');
        }
    }
 
    function messagewall() {
        var user = $('#userinfo').val();
        var open = '/wiki/Message_Wall:' + user;
        if (exist(user)) {
            window.open(open, 'blank');
        }
    }
 
    function blog() {
        var user = $('#userinfo').val();
        var open = '/wiki/User_blog:' + user;
        if (exist(user)) {
            window.open(open, 'blank');
        }
    }
 
    function contribs() {
        var user = $('#userinfo').val();
        var open = '/wiki/Special:Contributions/' + user;
        if (exist(user)) {
            window.open(open, 'blank');
        }
    }
 
    function banlog() {
        var user = $('#userinfo').val();
        var open = '/wiki/Special:Log/chatban?page=User:' + user;
        if (exist(user)) {
            window.open(open, 'blank');
        }
    }
 
    function blocklog() {
        var user = $('#userinfo').val();
        var open = '/wiki/Special:Log/block?page=User:' + user;
        if (exist(user)) {
            window.open(open, 'blank');
        }
    }
 
    function log() {
        var user = $('#userinfo').val();
        var open = '"/wiki/Special:Log/' + user;
        if (exist(user)) {
            window.open(open, 'blank');
        }
    }
    // }
 
    /* <div><iframe> links from the maker of {{Template:YouTube Player}} */
    function addmusic() {
        //var link = $('<input type="text" value="" id="music" style="width:100%;">');
        var music1 = '<div style="width: 212px; overflow: hidden; height: 20px; position: relative; border: 3px outset #0f0f0f; margin-bottom: 5px;"><iframe width="417" height="23" src="https://www.youtube.com/embed/';
        var music2 = '?version=3&hl=en_US&theme=dark&color=white&loop=1&showinfo=0&autohide=0&disablekb=1&autoplay=0" frameborder="0" allowfullscreen=0></iframe></div>';
        //var modal = form.append(link);
        //var link   = prompt('Add Music');
 
        //$('#musiclist').append(music);
 
 
        $.showCustomModal( 'Add Music (THIS IS BROKEN)', '<p>Insert the part of a YouTube video url after the "watch?v="</p><input type="text" value="" id="music" style="width:100%;">', {
            id: 'addmusicmodal',
            width: 500,
            buttons: [
                {
                    id:'confirm',
                    message:'Confirm',
                    click: function(){
                        /*if($('#music').val().length !== 11) {
                            alert('Not a valid link');
                        }
                        else {*/
                            var music  = music1 + $('#music').val() + music2;
                            $('#musiclist').append(music);
                        //}
                    }
                }
            ]
        });
    }
 
    function removemusic() {
        $.showCustomModal( 'Remove Music (THIS IS ALSO BROKEN)', '<form class="WikiaForm"><table><tr><td style="style:85%">1</td><td></td></table></form>', {
            id: 'removemusicmodal',
            width: 500
        });
    }
 
    //Look at this terrible formatting
    function about() {
        $.showCustomModal('About', '\
        <div style="text-align:center">\
            ChatRail α by <a href="http://www.c.wikia.com/wiki/User:ChaoticShadow" target="_blank">ChaoticShadow</a>\
            <br />\
            With lots of help from: Slyst, RansomTime, Shining-Amour, and many more, along with other fantastic scripts other users have made.\
        </div>\
        <hr />\
        <h2>Features</h2>\
            <h3>Mod Only:</h3>\
                <ul>\
                    <li>Kick</li>\
                    <li>Ban</li>\
                    <li>Autokick</li>\
                </ul>\
            <h3>General Usage:</h3>\
                <ul>\
                    <li>Add/Remove Music</li>\
                    <li>Search Bar</li>\
                    <li>User Info</li>\
                </ul>\
                <ul>\
                    <ul>\
                        <li>User Page</li>\
                        <li>Talk Page</li>\
                        <li>Blog</li>\
                        <li>Contributions</li>\
                        <li>Chat Ban Log</li>\
                        <li>Block Log</li>\
                        <li>Public Logs</li>\
                    </ul>\
                </ul>\
        <h2>Features to come</h2>\
            <h3>Random:</h3>\
                <ol>\
                    <li>Give a suggestion</li>\
                    <li>???</li>\
                    <li>PROFIT!!!</li>\
                </ol>\
        ', {
            id: 'aboutmodal',
            width: 500
        });
        $('#aboutmodal ul').css({
            'display': 'block',
            'list-style-type': 'disc',
            'margin-bottom': '1 em',
            'margin-left': '0',
            'margin-right': '0',
            'padding-left': '40px'
        });
        $('ol').css({
            'display': 'block',
            'list-style-type': 'decimal',
            'margin-bottom': '1em',
            'margin-left': '0',
            'margin-right': '0',
            'padding-left': '40px' 
        });
    }
 
    document.getElementById("WikiaPage").style.left = "10%";
    searchbar.insertAfter($('.ChatHeader .wordmark'));
 
    rail.append(aboutbutton);
    rail.append(switchrail);
    rail.append(mtrail);
    rail.append(uirail);
    rail.append(murail);
    murail.hide();
 
    /* Making sure regular users don't get kick/ban/autokick functions */
    if(userIsInGroup('sysop') || userIsInGroup('bureaucrat') || userIsInGroup('chatmoderator') || userIsInGroup('VSTF')) {
        uirail.hide();
    }
    else {
        mtrail.hide();
    }
    rail.insertAfter($('header.ChatHeader'));
 }
//</source>
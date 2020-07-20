//To-do: load user groups from template
//Note to self: ?action=raw would be perfect here
 
 
$(function() {
 
 
    function addCSS(bureaucrats, admins, custodians, mods) {
        var usergroups = [bureaucrats, admins, custodians, mods];
        var style = "<style id='chatstyles' type='text/css'>";
        for (i = 0; i < usergroups.length; i++) {
            for (j = 0; j < usergroups[i].length; j++) {
                switch( i ) {
                    case 0:
                        style += "[data-user='" + usergroups[i][j] + "'] .username {color: #CD0000 !important; font-weight: bold;} ";
                        style+= ".Chat [data-user='" + usergroups[i][j] + "'] .username:after {content: '[Bureaucrat]'; margin-left:1em} ";
                        break;
                    case 1:
                        style += "[data-user='" + usergroups[i][j] + "'] .username {color: #800080 !important; font-weight: bold;} ";
                        style += ".Chat [data-user='" + usergroups[i][j] + "'] .username:after {content: '[Admin]'; margin-left:1em} ";
                        break;
                    case 2:
                        style += "[data-user='" + usergroups[i][j] + "'] .username {color: #228C77 !important; font-weight: bold;} ";
                        style += ".Chat [data-user='" + usergroups[i][j] + "'] .username:after {content: '[Custodian]'; margin-left:1em} ";
                        break;
                    case 3:
                        style += "[data-user='" + usergroups[i][j] + "'] .username {color: #1874CD !important; font-weight: bold;} ";
                        style += ".Chat [data-user='" + usergroups[i][j] + "'] .username:after {content: '[Moderator]'; margin-left:1em} ";
                        break;
                    default:
                        console.log("Default");
                }
            }
        }
        style += "</style>";
        $('head').append(style);
        console.log("Done! (v1.5)");
    }
 
 
    function process(array) {
        //var staff = [array.indexOf("//Bureaucrat"),array.indexOf("//Admin"),array.indexOf("//Custodian"),array.indexOf("//Chat Mod")];
        //for (i=0;i<staff.length;++i) staff[i] = ((staff[i]>-1&&array[staff[i]+1].length>0)?array[staff[i]+1].split(/\,\s*/):[]);
        //addCSS(staff[0],staff[1],staff[2],staff[3]);
    }
 
    $.get('/wiki/MediaWiki:Custom-righted-users?action=raw')
    .done(function (data) {
        //process(data.split(/\r\n|\n|\r/));
        console.log(data.split(/\r\n|\n|\r/));
    });
 
});
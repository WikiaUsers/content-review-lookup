//apply new style rules for staff members based on data stored at MediaWiki:Custom-righted-users
//Edit the Mediawiki file to change highlighting
//Made by Xytl

$(function() {
    
    // Changes colour and appends tag depending on user group
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
        console.log("Done! (v1.6)");
    }

    // Processes the data received from the get function below
    function process(array) {
        // Makes sure there are no spaces before or after each array element
        // Additionally removes any blank lines
        var clean = [];
        for (i = 0; i < array.length; i++){
            array[i] = array[i].replace(/^\s+|\s+$/g,'');
            if (array[i].length > 0) {
                clean.push(array[i]);
            }
        }
        
        var staff = [clean.indexOf("//Bureaucrat"), clean.indexOf("//Admin"), clean.indexOf("//Custodian"), clean.indexOf("//Chat Mod")];
        
        // staff.length is the number of user rights groups
        // produces an array of arrays
        for (i = 0; i < staff.length; i++) {
            /*
            // Checks that there are users to be highlighted from each group - e.g. if there are no bureaucrats defined,
            //  then the indexOf will be set to -1 and here it will be skipped - AND
            // Checks that we are only looping as many times as we have user groups AND
            // Checks that the element we are trying to get is a name, not a section heading (such as "//Bureaucrat")
            */
            if ((staff[i] > -1) && (clean.length > staff[i]+1) && (clean[staff[i]+1].indexOf("//") < 0)) {
                // split the groups of names into individual names
                staff[i] = clean[staff[i]+1].split(/\,\s*/);
                // trims the whitespace from the usernames (again)
                for (j = 0; j < staff[i].length; ++j) {
                    staff[i][j] = staff[i][j].replace(/^\s+|\s+$/g,'');
                }
            // If not, leave the element for that rights group empty, and loop back to the first one
            } else {
                staff[i] = [];
            }
        } 
        addCSS(staff[0],staff[1],staff[2],staff[3]);
    }
    
    // Fetch data from [[MediaWiki:Custom-righted-users]] in a raw format, so that we don't have to wait for
    // js changes to be approved when updating
    $.get('/wiki/MediaWiki:Custom-righted-users?action=raw')
    .done(function (data) {
        // Turn the response into an array of names and rights
        // ["//Bureaucrat", "Name1, Name2", "//Admin", "Name3, Name4, Name5"]
        process(data.split(/\r\n|\n|\r/));
    });
    
});
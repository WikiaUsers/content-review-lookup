/**
 * Quick Tools - a collection of AJAX based helper scripts
 * 
 * @author - Benjamin Williams (Shining-Armor)
 * 
 * @license - GNU GPL v3
 */
 
/**
 * @variable [object] main QuickTools object.
 */
var QuickTools = window.QuickTools || {};
 
/**
 * @variable [object] object for applet specific functions
 */
QuickTools.applet = {};
 
/**
 * @variable [object] object for applet specific HTML
 */
QuickTools.applet.html = {};
 
/**
 * @block [string] HTML for different applet forms
 *
 * current applets:
 *    - Block
 *    - Delete
 *    - Move
 *    - Protect
 *    - Batch Delete
 */
QuickTools.applet.html.home = '\
<h1>Welcome to Quick Tools!</h1> \
<hr /> \
<br /> \
<p>Quick Tools is a blah blah blah something ponies might turn this area into a sort of to-do list idk.</p> \
<br /> \
Debugging info: \
<hr /> \
<br /> \
User name: ' + mw.config.get('wgUserName') + '<br /> \
User rights: ' + (function() {
    var userText = '';
    var userGroups = mw.config.get('wgUserGroups');
 
    for (var i = 0; i < userGroups.length; i++) {
        userGroups[i] = userGroups[i].charAt(0).toUpperCase() + userGroups[i].slice(1);
        userText += userGroups[i] + ', ';
    }
 
    return userText.substring(0, userText.length - 2);
}()) + ' <br />\
Namespace: ' + (function() {
    var namespace = '', k;
 
    for (k in mw.config.get('wgNamespaceIds')) {
        if (mw.config.get('wgNamespaceIds')[k] === mw.config.get('wgNamespaceNumber')) {
            if (k.toString() === '') {
                namespace = 'Main';
            } else {
                namespace = k.toString().charAt(0).toUpperCase() + k.slice(1);
            }
        }
    }
 
    return namespace;
}()) + ' (' + mw.config.get('wgNamespaceNumber') + ')';
 
QuickTools.applet.html.block = '\
<p>User name: </p><input type="text" class="QuickToolsInput" name="QuickToolsBlock" /><br /> \
<p>Duration:  </p><input type="text" class="QuickToolsInput" name="QuickToolsDuration" /><br /> \
<p>Reason:    </p><input type="text" class="QuickToolsInput" name="QuickToolsReason" /> \
<p> \
    <label>Disallow talk pages: <input type="checkbox" name="QuickToolsNoTalk" /></label> \
    <label>Disallow account creation: <input type="checkbox" name="QuickToolsNoCreate" /></label> \
</p> \
<p>Status: </p><div id="QuickToolsStatus"></div> <br /> \
<div style="width: 96%; text-align: right;"> \
    <a class="QuickToolsSingleButton" name="QuickToolsSubmit">Block</a> \
</div>';
 
QuickTools.applet.html.delet = '\
<h1>delete</h1>';
 
QuickTools.applet.html.move = '\
<h1>move</h1>';
 
QuickTools.applet.html.protect = '\
<h1>protect</h1>';
 
QuickTools.applet.html.batchdelete = '\
<h1>batch delete</h1>';
 
/**
 * @variable [boolean] modal control switch
 */
QuickTools.modalShown = false;
 
/**
 * @variable [string] modal HTML
 */
QuickTools.formHTML = '\
<div id="QuickToolsModal"> \
    <div id="QuickToolsHead"> \
        <a href="https://dev.wikia.com/wiki/QuickTools" id="QuickToolsHeading">Quick Tools</a> \
        <span id="QuickToolsClose">X</span> \
    </div> \
    <table id="QuickToolsWrapper" border="1"> \
        <tr> \
            <td id="QuickToolsRail"> \
                <ul> \
                    <li><a class="QuickToolsLink" href="javascript:void(0)">Home</a></li> \
                    <li><a class="QuickToolsLink" href="javascript:void(0)">Batch Delete</a></li> \
                    <li><a class="QuickToolsLink" href="javascript:void(0)">Delete</a></li> \
                    <li><a class="QuickToolsLink" href="javascript:void(0)">Block</a></li> \
                    <li><a class="QuickToolsLink" href="javascript:void(0)">Move</a></li> \
                    <li><a class="QuickToolsLink" href="javascript:void(0)">Protect</a></li> \
                </ul> \
            </td> \
            <td id="QuickToolsContext"> \
                <div id="QuickToolsDraw"></div> \
            </td> \
        </tr> \
    </table> \
</div>';
 
/**
 * @variable [string] modal CSS
 */
QuickTools.formCSS = '\
#QuickToolsModal { \
    display: none; \
    -moz-border-radius: 10px; \
    -moz-box-shadow: -3px 2px 9px 0 rgba(50, 50, 50, 0.81); \
    -webkit-border-radius: 10px; \
    -webkit-box-shadow: -3px 2px 9px 0 rgba(50, 50, 50, 0.81); \
    background-color: #0175c7; \
    border-radius: 10px; \
    box-shadow: -3px 2px 9px 0 rgba(50, 50, 50, 0.81); \
    height: auto; \
    left: 25%; \
    margin: 0; \
    padding: 4px; \
    position: fixed !important; \
    top: 20%; \
    width: 650px; \
    z-index: 2000000004 !important; \
} \
#QuickToolsWrapper { \
    -moz-border-radius: 4px; \
    -webkit-border-radius: 4px; \
    border-collapse: collapse; \
    border-radius: 4px; \
    height: 300px; \
    margin-bottom: 3px; \
} \
#QuickToolsWrapper, \
#QuickToolsWrapper>td, \
#QuickToolsWrapper>th, \
#QuickToolsWrapper > tr { \
    border: 2px solid #fff !important; \
} \
#QuickToolsHead { \
    height: auto; \
    width: 100%; \
} \
#QuickToolsHeading { \
    color: #fff; \
    float: left; \
    font-family: "Times New Roman"; \
    font-size: 170%; \
    font-weight: bold; \
    margin-top: 0; \
    margin: 4px; \
} \
#QuickToolsClose { \
    -moz-border-radius: 4px; \
    -webkit-border-radius: 4px; \
    -webkit-transition: background-color 1s; \
    border-radius: 4px; \
    border: 2px solid #fff; \
    color: #fff; \
    float: right; \
    font-weight: bold; \
    margin-top: 2px; \
    margin: 4px; \
    padding: 2px; \
    padding-left: 4px; \
    padding-right: 4px; \
    transition: background-color: 1s; \
} \
#QuickToolsClose:hover { \
    background-color: #0061a6; \
    cursor: pointer; \
} \
#QuickToolsWrapper { \
    width: 100%; \
} \
#QuickToolsContext { \
    height: 100%; \
    margin: 0; \
    padding: 0; \
    width: 80%; \
} \
#QuickToolsRail { \
    border-right: 1px solid #fff; \
    height: 100%; \
    margin: 0; \
    overflow: auto; \
    padding: 0; \
    width: 20%; \
} \
#QuickToolsRail > ul { \
    height: 100%; \
    list-style: none; \
    margin: 0; \
    padding: 0; \
} \
#QuickToolsDraw { \
    border-left: 1px solid #fff; \
    height: 100%; \
    width: 99%; \
    padding: 8px 8px 8px 8px; \
    color: #fff; \
    font-weight: bold; \
} \
#QuickToolsDraw hr { \
    width: 96%; \
    float: left; \
} \
#QuickToolsDraw p { \
    width: auto; \
} \
#QuickToolsStatus { \
    border: 2px solid #FFF; \
    width: 94%; \
    height: 83px; \
    padding: 4px; \
    overflow: auto; \
} \
.QuickToolsLink { \
    -webkit-transition: background-color 1s; \
    border: 2px solid #fff; \
    color: #fff; \
    display: inline-block; \
    font-weight: bold; \
    margin: 3px; \
    padding: 3px; \
    transition: background-color: 1s; \
    width: 87%; \
} \
.QuickToolsLink:hover { \
    background-color: #0061a6; \
    text-decoration: none; \
} \
.QuickToolsInput { \
    background: transparent; \
    border-bottom: 2px solid #fff !important; \
    border-left: 2px solid #fff !important; \
    border: none; \
    color: #fff; \
    font-weight: bold; \
    margin: 4px; \
    padding: 2px; \
} \
.QuickToolsInput:focus { \
    outline: 0; \
}\
.QuickToolsSingleButton { \
    -webkit-transition: background-color 1s; \
    background-color: transparent; \
    border: 2px solid #fff; \
    color: #fff; \
    font-weight: bold; \
    margin: 2px; \
    padding: 2px; \
    text-decoration: none; \
    transition: background-color: 1s; \
    cursor: pointer; \
} \
.QuickToolsSingleButton:hover { \
    background-color: #0061a6; \
    text-decoration: none; \
    cursor: pointer; \
}';
 
/**
 * Adds even listeners to various UI components
 *
 * @function [args] none
 * @returns [] none
 */
QuickTools.addListeners = function() {
    // Open button (tool bar)
    document.getElementById('QuickToolsOpen').addEventListener('click', function() {
        QuickTools.showHideModal();
    });
 
    // Close button (in modal)
    document.getElementById('QuickToolsClose').addEventListener('click', function() {
        QuickTools.showHideModal();
    });
 
    //All sidebar buttons
    $('#QuickToolsRail ul li').each(function() {
        $(this).click(function() {
            switch ($(this).children('a').text().toLowerCase()) {
                case 'batch delete':
                    QuickTools.applet.showApplet('batch delete');
                    break;
                case 'block':
                    QuickTools.applet.showApplet('block');
                    break;
                case 'delete':
                    QuickTools.applet.showApplet('delete');
                    break;
                case 'move':
                    QuickTools.applet.showApplet('move');
                    break;
                case 'protect':
                    QuickTools.applet.showApplet('protect');
                    break;
                default:
                    QuickTools.applet.showApplet('home');
            }
        });
    });
};
 
/**
 * Adds modal HTML and CSS to the body/head of the page
 *
 * @function [args] none
 * @returns [] none
 */
QuickTools.buildModal = function() {
    $('body').append(QuickTools.formHTML);
    document.getElementsByTagName('head')[0].innerHTML += '<style>' + QuickTools.formCSS + '</style>';
};
 
/**
 * Toggles the modals state on or off
 *
 * @function [args] none
 * @returns [] none
 *
 * @TODO: Replace with CSS animations
 */
QuickTools.showHideModal = function() {
    if (QuickTools.modalShown === false) {
        $('#QuickToolsModal').fadeIn('slow');
        QuickTools.modalShown = true;
    } else if (QuickTools.modalShown === true) {
        $('#QuickToolsModal').fadeOut('slow');
        QuickTools.modalShown = false;
    }
};
 
/**
 * Draws applet HTML to the applet context
 *
 * @function [args] [[string](apple): applet name]
 * @returns [] none
 */
QuickTools.applet.showApplet = function(apple) {
    var applet = apple.replace(/ /g, '');
 
    $('#QuickToolsDraw').html(QuickTools.applet.html[applet]);
 
    if (applet !== 'home') {
        $('a[name=QuickToolsSubmit]').click(function() {
            QuickTools.applet[applet]();
        });
    }
};
 
/**
 * Creates an XHR request to the API
 *
 * @function [args] [[object](payload): API params]
 * @returns [[object](response data)]
 */
QuickTools.applet.post = function(payload, callback) {
    $.ajax({
        url: mw.util.wikiScript('api'),
        type: "POST",
        dataType: "JSON",
        data: payload,
        success: function(data) {
            callback(data);
        },
        error: function(err, status) {
            callback('FAILED ' + err + ':' + status);
        }
    });
};
 
/**
 * Creates an XHR request to the API
 *
 * @function [args] [[string](message): message to write] 
 *                  [[bool](status): fail or success]
 * @returns [] none
 */
QuickTools.applet.writeOut = function(message, status) {
    var html = $('#QuickToolsStatus').html();
    var color = status === true ? 'white' : 'red';
    var line = '<span style="color: ' + color + ';">> ' + message + '</span><br />';
 
    html += line;
 
    $('#QuickToolsStatus').html(html);
};
 
/**
 * Creates an XHR request to the API
 *
 * @function [args] none
 * @returns [] none
 */
QuickTools.applet.block = function() {
    var payload = {
        action: 'block',
        user: $('input[name=QuickToolsBlock]').val(),
        expiry: $('input[name=QuickToolsDuration]').val(),
        reason: $('input[name=QuickToolsReason]').val(),
        nocreate: '',
        allowusertalk: '',
        autoblock: 0,
        format: 'json',
        token: mw.user.tokens.values.editToken
    };
 
    if (!$('input[name=QuickToolsNoCreate]:checked').length) {
        delete payload.nocreate;
    }
 
    if ($('input[name=QuickToolsNoTalk]:checked').length) {
        delete payload.allowusertalk;
    }
 
    QuickTools.applet.writeOut('attempting to block ' + payload.user + ' for ' + payload.expiry + '...', true);
 
    QuickTools.applet.post(payload, function(data) {
        var result = 'Post error in applet.post. Check back later to see my new error of the day.';
        if (typeof data === 'object') {
            if (!data.error) {
                QuickTools.applet.writeOut(payload.user + ' was blocked!', true);
            } else {
                QuickTools.applet.writeOut('block failed: ' + data.error.code, false);
            }
        } else {
            QuickTools.applet.writeOut(result, false);
        }
    });
};
 
/**
 * Initializes script
 *
 * @function [args] none
 * @returns [] none
 */
QuickTools.init = function() {
    if ($('#QuickToolsOpen').length > 0) {
        return;
    }
 
    var link ='<li><a href="javascript:void(0)" id="QuickToolsOpen" title="Quick Tools">Quick Tools</a></li>';
 
    $('.toolbar > ul.tools').append(link);
    QuickTools.buildModal();
    QuickTools.addListeners();
    QuickTools.applet.showApplet('home');
};
 
$(document).ready(function() {
    QuickTools.init();
});
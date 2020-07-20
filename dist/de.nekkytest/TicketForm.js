function TicketForm() {
var articlepath = mw.config.get('wgArticlePath').replace('$1','');
    gui = document.createElement('div');
    gui.innerHTML = '<div style="font-family: Rubik; text-align: left; margin: 10px; padding: 30px; padding-top: 0px; border: solid 1px #ccc; border-radius: 2px;">'
    + '<h2 style="font-size: 1.3em; margin-top: 10px; font-weight: bold;">Neues Ticket hinzufügen</h2>'
    + '<span style="font-weight: bold;">Wie lautet der Name des Wikis?</span>'
    + '<div class="wds-textarea" style="margin: 10px 0 18px;">'
    + '<div class="wds-textarea__field-wrapper">'
	+ '<textarea id="wikiname" rows="1" placeholder="Beispiel Wiki" maxlength="50" id="ember78" class="wds-textarea__field"></textarea>'
	+ '</div>' 
	+ '</div>' 
    + '<span style="font-weight: bold;">Wie lautet die URL?</span>'
    + '<div class="wds-textarea" style="margin: 10px 0 18px;">'
    + '<div class="wds-textarea__field-wrapper">'
	+ '<textarea id="url" rows="1" placeholder="de.nekkytest" maxlength="30" id="ember78" class="wds-textarea__field"></textarea>'
	+ '</div>' 
	+ '</div>' 
    + '<span style="font-weight: bold;">Wie lautet die Ticket-NR?</span>'
    + '<div class="wds-textarea" style="margin: 10px 0 18px;">'
    + '<div class="wds-textarea__field-wrapper">'
	+ '<textarea id="key" rows="1" placeholder="123" maxlength="3" id="ember78" class="wds-textarea__field"></textarea>'
	+ '</div>' 
	+ '</div>' 
    + '<span style="font-weight: bold;">Wie ist der aktuelle Status des Tickets?</span><br />'
    + '<select id="status" name="status">'
    + '<option value="">Auswählen</option>'
    + '<option value="backlog">Backlog</option>'
    + '<option value="progress">In Progress</option>'
    + '<option value="done">Done</option>'
    + '<option value="unresolved">Unresolved</option>'
    + '</select>'
    + '<br />'
    + '<span style="font-weight: bold;">Welche Priorität hat das Ticket?</span><br />'
    + '<select id="priority" name="priority">'
    + '<option value="">Auswählen</option>'
    + '<option value="1">P1</option>'
    + '<option value="2">P2</option>'
    + '<option value="3">P3</option>'
    + '<option value="4">P4</option>'
    + '</select>'
    + '<br /><br />'
    + '<span style="font-weight: bold;">Wem wurde das Ticket zugeteilt?</span>'
    + '<div class="wds-textarea" style="margin: 10px 0 18px;">'
    + '<div class="wds-textarea__field-wrapper">'
	+ '<textarea id="assignee" rows="1" placeholder="Nekky-chan" maxlength="20" id="ember78" class="wds-textarea__field"></textarea>'
	+ '</div>' 
	+ '</div>' 
    + '<span id="submitbuttonnewticket" class="wds-button" style="margin:0  auto; cursor: pointer; color: white;" onclick="submitNewTicket()">Ticket speichern</span>'
    + '<span class="vanformresult"></span>'
    + '</div>';
	if(wgPageName == 'Vanguard') {
        document.getElementById('create-van').append(gui);
        document.getElementById('van-box').style.display='none';
	}
}
addOnloadHook(TicketForm);
function submitNewTicket() {
    resultpath = mw.config.get('wgArticlePath').replace('$1','');
    apilangpath = mw.config.get('wgArticlePath').replace('wiki/$1','');
    wikiname = $("#wikiname").val();
    key = $("#key").val();
    url = $("#url").val();
    status = $("#status").val();
    priority = $("#priority").val();
    assignee = $("#assignee").val();
    ort = "Vanguard/" + wikiname;
    vorlage = 'Van';
    text = '{{'+ vorlage
        + '\n|key-nr = '
        + key
        + '\n|url = '
        + url
        + '\n|status = '
        + status
        + '\n|project = '
        + wikiname
        + '\n|priority = '
        + priority
        + '\n|assignee = '
        + assignee
        + '\n}}\n\n';
    if (!wikiname) {
        alert('Es wurde kein Projektname angegeben.');
    } else {
            $.post(wgServer
                + apilangpath
                + 'api.php?action=edit&title=' + encodeURIComponent(ort)
                + '&prependtext=' + encodeURIComponent(text)
                + '&token=' + encodeURIComponent(this.mediaWiki.user.tokens.values.editToken)
                + '&summary=Neues Ticket erstellt', function() {
                    window.location.href = resultpath + ort;
            });
    }
}
if (location.href.includes("Fanfictions")) {
    
    $("#mw-content-text")[0].innerHTML = $("#mw-content-text")[0].innerHTML + "<br/><p>Want your Fanfiction added here? Enter it's exact name below!</p>";
    
    article = $("#WikiaArticle")[0];
    
    box = document.createElement("input");
    article.append(box);
    
    btn = document.createElement("button");
    btn.innerHTML = "Submit";
    btn.onclick = function() { submitData(box.value); };
    
    article.append(btn);
    
   
    
    if (!wgUserGroups.includes("sysop") || wgUserGroups.includes("threadmoderator") || wgUserGroups.includes("chatmoderator")) {  try {
            document.getElementsByClassName("page-header__contribution")[0].remove();
        } catch(e) {
             console.log("Could not remove page-header__contribution because:" + e);
        }
        
    }
    
   
}


function submitData(submissionName) {
    $.ajax({
        url: mw.util.wikiScript(),
        type: 'GET',
        data: {
            title: 'Module:FanficDataStore',
            action: 'raw',
            cb: Math.ceil(new Date().getTime() / 1000),
            dataType: 'text'
        },
        success: function(data) {
            submitEdit(JSON.stringify(JSON.parse(data.substring(2,data.length)).push(submissionName)));
        },
        error: function() {
            alert("An error has occured\nPlease check your internet connection, and that you are not blocked on this wiki!");
        }
    });
}
 
function submitEdit(stuff) {
    $.ajax({
        url: mw.util.wikiScript('api'),
        type: 'POST',
        data: {
            title: 'Module:FanficDataStore',
            action: 'edit',
            summary: 'Adding fanfictions',
            text: stuff,
            bot: 1,
            token: mw.user.tokens.get('editToken'),
            format: 'json'
        },
        success: function(d) {
            if (d.edit.result == 'Success') {
                location.href += (location.href.indexOf('?') > -1) ? '&action=purge' : '?action=purge';
            }
        }
    });
}
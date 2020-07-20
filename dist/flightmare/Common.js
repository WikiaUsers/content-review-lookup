/* Statistiken für die Infoboxen */

(function( $ ) {
    if (!$('#stat-data').length) return;

    $('#stat-data').append('<canvas id="canvas" width="256" height="256" style="margin: 0 auto;" />');
    function draw() {
        var canvas = document.getElementById("canvas");
        if (canvas.getContext) {
            var ctx = canvas.getContext("2d"),
                centerx = 120,
                centery = 128,
                centert = 112;
                textOffset = 112,
                amplitude = 10,
                stats = JSON.parse( $('#stat-data').attr('data-info') );
                
            //draw axes
            for(i = 10; i > 0; i--){
                ctx.beginPath();
                ctx.moveTo(amplitude*i*Math.cos(Math.PI/4)+centerx, amplitude*i*Math.sin(Math.PI/4)+centery);
                for(j = 8; j > 0; j--) {
                ctx.lineTo(amplitude*i*Math.cos(j*Math.PI/4)+centerx, amplitude*i*Math.sin(j*Math.PI/4)+centery);
                }
                ctx.lineWidth = 1;
                ctx.strokeStyle = 'gray';
                ctx.stroke();
            }
            

            //create radial gradient
            var grd = ctx.createRadialGradient(128,128,0,128,128,181);
            grd.addColorStop(0,'rgba(129,1,1,0)');
            grd.addColorStop(1,'rgba(129,1,1,0.25)');

            //draw shape
            ctx.beginPath();
            ctx.moveTo(amplitude*stats.Geschwindigkeit*Math.cos(Math.PI/2)+centerx,amplitude*stats.Geschwindigkeit*Math.sin(Math.PI/2)+centery);
            ctx.lineTo(amplitude*stats.Geschick*Math.cos(Math.PI/4)+centerx,amplitude*stats.Geschick*Math.sin(Math.PI/4)+centery);
            ctx.lineTo(amplitude*stats.Rank*Math.cos(2*Math.PI)+centerx,amplitude*stats.Rank*Math.sin(2*Math.PI)+centery);
            ctx.lineTo(amplitude*stats.Kraft*Math.cos(7*Math.PI/4)+centerx,amplitude*stats.Kraft*Math.sin(7*Math.PI/4)+centery);
            ctx.lineTo(amplitude*stats.Ausdauer*Math.cos(3*Math.PI/2)+centerx,amplitude*stats.Ausdauer*Math.sin(3*Math.PI/2)+centery);
            ctx.lineTo(amplitude*stats.Feuerkraft*Math.cos(5*Math.PI/4)+centerx,amplitude*stats.Feuerkraft*Math.sin(5*Math.PI/4)+centery);
            ctx.lineTo(amplitude*stats.Courage*Math.cos(Math.PI)+centerx,amplitude*stats.Courage*Math.sin(Math.PI)+centery);
            ctx.lineTo(amplitude*stats.Intelligenz*Math.cos(3*Math.PI/4)+centerx,amplitude*stats.Intelligenz*Math.sin(3*Math.PI/4)+centery);
            ctx.closePath();
            ctx.fillStyle = grd;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#810101';
            ctx.stroke();

            //text on top of shape
            ctx.fillStyle = 'black';
            ctx.fillText("Geschwindigkeit",textOffset*Math.cos(Math.PI/2)+centert,textOffset*Math.sin(Math.PI/2)+centery);
            ctx.fillText("Geschick",textOffset*Math.cos(Math.PI/4)+centert,textOffset*Math.sin(Math.PI/4)+centery);
            ctx.fillText("Rank",textOffset*Math.cos(2*Math.PI)+centert,textOffset*Math.sin(2*Math.PI)+centery);
            ctx.fillText("Stärke",textOffset*Math.cos(7*Math.PI/4)+centert,textOffset*Math.sin(7*Math.PI/4)+centery);
            ctx.fillText("Ausdauer",textOffset*Math.cos(3*Math.PI/2)+centert,textOffset*Math.sin(3*Math.PI/2)+centery);
            ctx.fillText("Feuerkraft",textOffset*Math.cos(5*Math.PI/4)+centert,textOffset*Math.sin(5*Math.PI/4)+centery);
            ctx.fillText("Courage",textOffset*Math.cos(Math.PI)+centert,textOffset*Math.sin(Math.PI)+centery);
            ctx.fillText("Intelligenz",textOffset*Math.cos(3*Math.PI/4)+centert,textOffset*Math.sin(3*Math.PI/4)+centery);

            //Show when done
            $('#stat-data').show();
        }
    }
    draw();
})( this.jQuery );

////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
* @author: Flightmare (http://elderscrolls.wikia.com/wiki/User:Flightmare)
* @version: 1.0
* @license: CC-BY-SA 3.0
* @description: Creates a flat feed for discussions module on Special:DiscussionsFeed. Includes moderation tools.
*/

function updateFeed(content, isMod) {
    var rcLimit = 25;
    console.log("sending xhr");
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if(request.readyState == 4 && request.status == 200) {
            var arr = JSON.parse(request.responseText);
            content.innerHTML = '';
            for (var i = 0; i < rcLimit; i++) {
                var text = arr["_embedded"]["doc:posts"][i].rawContent;
                var user = arr["_embedded"]["doc:posts"][i]["createdBy"].name;
                var epoch = arr["_embedded"]["doc:posts"][i]["creationDate"].epochSecond;
                var postID = arr["_embedded"]["doc:posts"][i].id;
                var threadID = arr["_embedded"]["doc:posts"][i].threadId;
                var isReported = arr["_embedded"]["doc:posts"][i].isReported;
                var dt = new Date(epoch * 1000);

                //Create HTML:
                var par = document.createElement("P");
                par.className = "df-entry";

                //Create HTML for date:
                var spanDate = document.createElement("SPAN");
                spanDate.className = "df-date";
                var spanDateText = document.createTextNode(dt + ": ");
                spanDate.appendChild(spanDateText);
                par.appendChild(spanDate);

                //Create HTML for message body:
                var aMessage = document.createElement("A");
                aMessage.className = "df-content";
                aMessage.href = "https://mediawiki119.wikia.com/d/p/" + threadID + "/r/" + postID;
                aMessage.target = "_blank";
                var aMessageText = document.createTextNode(text);
                aMessage.appendChild(aMessageText);
                par.appendChild(aMessage);

                //Create HTML for user:
                var spanUser = document.createElement("SPAN");
                spanUser.className = "df-user";
                var spanUserText = document.createTextNode(" — " + user);
                spanUser.appendChild(spanUserText);
                par.appendChild(spanUser);

                //Create Delete button for moderators:
                if (isMod) {
                    var btnDelete = document.createElement("button");
                    btnDelete.type = "button";
                    btnDelete.textContent = "Delete";
                    btnDelete.addEventListener("click", deletePost(postID));
                    par.appendChild(btnDelete);
                }

                content.appendChild(par);
            }
        }
    };
    request.open("GET", "https://services.wikia.com/discussion/203236/posts?limit=" + rcLimit + "&page=0&responseGroup=small&reported=false&viewableOnly=true", true);
    request.setRequestHeader('Accept', 'application/hal+json');
    request.send();
}

function deletePost(postID) {
    console.log("Deleting post: " + postID);
    var request = new XMLHttpRequest();
    request.open("PUT", "https://services.wikia.com/discussion/203236/posts/" + postID + "/delete", true);
    request.send();
}

function createDiscussionsFeed() {
    if(wgPageName == 'Special:DiscussionsFeed') {
        document.title = 'Discussions Feed - ' + wgSiteName;
        var canBlock = Boolean(wgUserGroups.indexOf('sysop') > -1 || wgUserGroups.indexOf('staff') > -1 || wgUserGroups.indexOf('helper') > -1 || wgUserGroups.indexOf('vstf') > -1);
        var isMod = Boolean(canBlock || wgUserGroups.indexOf('threadmoderator') > -1);
        var content = document.getElementById("mw-content-text");
        content.innerHTML = 'Loading feed...<div id="ajaxloader"></div>';
        updateFeed(content, isMod);
    }
}

addOnloadHook(createDiscussionsFeed);
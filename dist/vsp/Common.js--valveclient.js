//Search for Valve Client user agent
var valveclient = navigator.userAgent.search(/Valve Client/i);

if (valveclient !== -1)
{
    valveclient = true;
}


//Creates Back/Forward navigation element on every editable content page
//This is mainly used for the TF2 MOTD
if(valveclient === true)
{
    var content = document.getElementById('mw-content-text');
    if(content !== undefined)
    {
        motdnav = document.createElement("div");
        motdnav.innerHTML = '<div id="motdnav">'
            +'<div id="motdnavleft">'
                +'<p><a href="/wiki/" class="image image-thumbnail link-internal"><img src="https://vignette.wikia.nocookie.net/vsp/images/9/92/Go-previous.png/revision/latest?cb=20150726121903" alt="Go-previous" class="" data-image-key="Go-previous.png" data-image-name="Go-previous.png" width="42" height="42"></a>'
                    +'<span>Back</span>'
                +'</p>'
            +'</div>'
            +'<div id="motdnavright">'
                +'<p><span>Forward</span>'
                +'<a href="/wiki/" class="image image-thumbnail link-internal"><img src="https://vignette.wikia.nocookie.net/vsp/images/5/5d/Go-next.png/revision/latest?cb=20150726121846" alt="Go-next" class="" data-image-key="Go-next.png" data-image-name="Go-next.png" width="42" height="42"></a>'
                +'</p>'
            +'</div>'
        +'</div>';
        
        // prepend motdnav to the beginning of theParent
        content.insertBefore(motdnav, content.firstChild);
        
        var motdnavleft = document.getElementById('motdnavleft');
        
        motdnavleft.addEventListener('click', function() {
            history.back();
        }, false);
        
        var motdnavright = document.getElementById('motdnavleft');
        
        motdnavright.addEventListener('click', function() {
            history.forward();
        }, false);
        
    }
}
//Print out browser info
/*
var obj = navigator;

var output = "";
for(property in obj)
{
  output += property + " = " + navigator[property] + "\n";
}

alert(output);
*/
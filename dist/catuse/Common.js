if(wgAction=="view" && wgTitle != "IRC")
{
  var rail = document.getElementById("column-one");
  if(rail)
  {
    var ircBox = document.createElement("div");
    ircBox.id = "ircBox";
    ircBox.className = "portlet";
    ircBox.innerHTML = ''
         + '<h5>IRC login</h5>'
         + '<div class="pBody" id="ircform_container" style="font-size:11px;padding:4px">'
          + '<form id="ircform" method="get" action="http://irc.wikia.com/" name="loginform">'
           + '<span style="width:75px;display:block">Username:</span>'
           + '<input type="text" name="nick" value="" size="18"> '
           + '<input type="submit" value="Login" style="font-size:95%;margin:2px 0 10px 34px"><br/>'
           + '<span style="width:75px;display:block">Channel:</span>'
          + '</form>'
         + '</div>';
    var selectThing = document.createElement("select");
    selectThing.name = "channels";
    selectThing.style.width="100%";
    selectThing.innerHTML = ''
          + '<optgroup label="Final Fantasy Wiki">'
           + '<option>#Wikia-FF</option>'
          + '</optgroup><optgroup label="Wikia">'
           + '<option>##wikia</option>'
           + '<option>#wikia-vstf</option>'
          + '</optgroup>'
    var afterElement = document.getElementById("p-tb");
    rail.insertBefore(ircBox,afterElement);
    document.getElementById("ircform").appendChild(selectThing);
  }
}
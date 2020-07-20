if(wgCanonicalSpecialPageName == 'Chat') {
    var rail            = $('<section id="WikiaPage" class="WikiaPage" style="background-color: white; border: 1px solid #cccccc; border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; bottom: 10px; color: #3a3a3a; left: 10px !important; margin: 0; position: absolute; right: 90% !important; top: 55px; width: 9% !important;"></section>');
    var showHide        = $('<tr><td><button onclick="Hide()" style=width:100%;">Hide</button></td></tr>');
    var test            = $('<p>1</p>')
    
    function Hide() {
        showHide.replaceWith($('<tr><td><button onclick="Show()" style=width:100%;">Show</button></td></tr>'));
        test.hide();
    }
    function Show() {
        showHide.replaceWith($('<tr><td><button onclick="Hide()" style=width:100%;">Hide</button></td></tr>'));
        test.show();
    }
    
    document.getElementById("WikiaPage").style.left = "10%";
    rail.append(showHide);
    rail.append(test);
    rail.insertAfter($("header.ChatHeader"));
 }
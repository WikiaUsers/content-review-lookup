/*
 * Replacing the Upload Photo link on to always point to the shared English image repository.
 */

function ModifySidebar(action, section, name, link) {
    try {
        switch (section) {
          case "languages":
            var target = "p-lang";
            break;
          case "toolbox":
            var target = "p-tb";
            break;
          case "navigation":
            var target = "p-navigation";
            break;
          default:
            var target = "p-" + section;
            break;
        }
 
        if (action == "add") {
            var node = document.getElementById(target)
                               .getElementsByTagName('div')[0]
                               .getElementsByTagName('ul')[0];
 
            var aNode = document.createElement('a');
            var liNode = document.createElement('li');
 
            aNode.appendChild(document.createTextNode(name));
            aNode.setAttribute('href', link);
            liNode.appendChild(aNode);
            liNode.className='plainlinks';
            node.appendChild(liNode);
        }
 
        if (action == "remove") {
            var list = document.getElementById(target)
                               .getElementsByTagName('div')[0]
                               .getElementsByTagName('ul')[0];
 
            var listelements = list.getElementsByTagName('li');
 
            for (var i = 0; i < listelements.length; i++) {
                if (listelements[i].getElementsByTagName('a')[0].innerHTML == name ||
                    listelements[i].getElementsByTagName('a')[0].href == link) {
 
                    list.removeChild(listelements[i]);
                }
            }
        }
 
    } catch(e) {
      // lets just ignore what's happened
      return;
    }
}
 
function CustomizeModificationsOfSidebar() {
    //removes [[Special:Upload]] from the Japanese toolbox
    ModifySidebar("remove", "toolbox", "Upload photo", "http://ja.ghostintheshell.wikia.com/wiki/Special:Upload");
    ModifySidebar("remove", "toolbox", "Upload photo", "http://ja.ghostintheshell.wikia.com/wiki/%E7%89%B9%E5%88%A5:%E3%82%A2%E3%83%83%E3%83%97%E3%83%AD%E3%83%BC%E3%83%89");
    //adds [[Special:Upload]] to toolbox
    ModifySidebar("add", "toolbox", "Upload file", "http://ghostintheshell.wikia.com/wiki/Special:Upload");
    //removes [[Special:MultipleUpload]] from the Japanese toolbox
    ModifySidebar("remove", "toolbox", "Upload multiple files", "http://ja.ghostintheshell.wikia.com/wiki/Special:MultipleUpload");
    ModifySidebar("remove", "toolbox", "Upload multiple files", "http://ja.ghostintheshell.wikia.com/wiki/%E7%89%B9%E5%88%A5:%E3%83%9E%E3%83%AB%E3%83%81%E3%82%A2%E3%83%83%E3%83%97%E3%83%AD%E3%83%BC%E3%83%89");
    //adds [[Special:MultipleUpload]] to toolbox
    ModifySidebar("add", "toolbox", "Upload multiple files", "http://ghostintheshell.wikia.com/wiki/Special:MultipleUpload");
}
 
addOnloadHook(CustomizeModificationsOfSidebar);
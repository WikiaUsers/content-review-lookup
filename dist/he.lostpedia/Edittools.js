/* פונקציה שמשמשת את הניקוד ב[[מדיה ויקי:Edittools]] */
function nikud() {
    if (document.getElementById('edit-templates')!=null){
        var a;
        for (var i=0; a = document.getElementsByTagName("span")[i]; i++) {
            if(a.className == "nikud") {
                a.onclick = function() {
                    insertTags('', this.title, '');
                    return false;
                };
            }
        }
    }
}
 
 
addOnloadHook(nikud);
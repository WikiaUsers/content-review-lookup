var ss_memory = null;
 
function SearchCall(){
    var newdiv = document.getElementById("searchsuggest");
    if (!newdiv) {
        var newdiv = document.createElement("div");
        newdiv.id = "searchsuggest";
        var searchdiv = document.getElementById("searchBody");
        searchdiv.appendChild(newdiv);
    }
    var x = document.getElementById("searchInput").value;
    if (x == ss_memory) {
        return;
    }
    ss_memory = x;
    document.getElementById("searchsuggest").style.display = 'none';
    if (x.length < 30 && x.length > 1 && x.value != "") {
        sajax_do_call("wfAjaxSearchSuggest", [x], newdiv);
        document.getElementById("searchsuggest").style.display = 'block';
    }
}
 
function ss_ajax_onload(){
    var x = document.getElementById('searchInput');
    x.onkeyup = function(){
        SearchCall();
    };
}
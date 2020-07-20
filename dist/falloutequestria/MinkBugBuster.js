function showDebugBar() {
    jQuery("<div/>", {
        id: 'minkDebugBar',
        style: 'position:absolute;top:0px;height:400px;width:100%;padding:50px;z-index:1001;font-size:16px;background-color:#F9F7ED;'
    }).appendTo("body");
}

function debugFunction(f) {
    $.("#minkDebugBar").text(f());

}
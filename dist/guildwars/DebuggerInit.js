alert('DebuggerInit.js written');
function debuggerInit() {
alert('DebuggerInit called');
    if (!DEBUGMODE) return;

    var debugDiv = document.createElement("div");
    debugDiv.id = 'debugDiv';

    if (navigator.appName == "Microsoft Internet Explorer"){
        document.body.insertBefore(debugDiv, document.body.lastChild); // appendChild doesn't work with body for IE for whatever reason
    } else {
        document.body.appendChild(debugDiv);
    }

    debugDiv.style.background='yellow';
    debugDiv.style.clear='both';

    var debugHead = document.createElement("div");
    debugHead.id = 'debugHead';
    debugHead.innerHTML = 'Debug buffer header';
    debugDiv.appendChild(debugHead);
    var debugBody = document.createElement("div");
    debugBody.id = 'debugBody';
    debugDiv.appendChild(debugBody);
}
addOnloadHook(debuggerInit);
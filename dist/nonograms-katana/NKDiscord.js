if (document.getElementById('NKdiscordWidget')) {
    // Fetch guild data
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    }
    xmlhttp.open('GET', 'https://discord.com/api/guilds/1238437678974898196/widget.json', false);
    xmlhttp.send();
    var widgetData = JSON.parse(xmlhttp.responseText);

    // Injecting some fake/missing data here
    widgetData.channels = [
        {id:0, name:'#discord-tavern', info:'Like in-game, but with pictures and gifs'},
        {id:0, name:'#nonograms-katana-wiki', info:'Share ideas, ask questions, give feedback'},
        {id:0, name:'#creating-nonograms', info:'Become a puzzle artist'},
        {id:0, name:'#memes', info:'Fun.jpg'},
    ];

    // Widget template
    var outHeader = '<a href="https://discord.com/?utm_source=Discord%20Widget&amp;utm_medium=Logo" target="_blank"></a><div class="dwName">' + mw.html.escape(widgetData.name) + '</div>' + '<div class="dwCount"><strong>' + (widgetData.presence_count) + '</strong> Users Online</div>';
    var outBody = '';
    for (var cid in widgetData.channels) {
        outBody += '<div>' + mw.html.escape(widgetData.channels[cid].name) + '</div>';
        if (widgetData.channels[cid].info) {
            outBody += '<small>' + mw.html.escape(widgetData.channels[cid].info) + '</small>';
        }
    }
    var outFooter = '<a href="' + widgetData.instant_invite + '" target="_blank">Join Now!</a>';

    // Output widget
    var output = '<div class="dwHeader">' + outHeader + '</div><div class="dwBody">' + outBody + '</div><div class="dwFooter">' + outFooter + '</div>';
    document.getElementById('NKdiscordWidget').innerHTML = '<div class="dwPanel">' + output + '</div>';
}
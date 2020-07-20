importScriptPage("MediaWiki:JacobsLadderSuite.js","d97"); // IF YOU REMOVE THIS IT WON'T WORK

ClientsideCensor = {
    LoadAttemptsCounter: 1,
    LoadFunction: setInterval( function() {
        if (typeof censoredWords !== "undefined") {      // if there are words in the censored list
            if (censoredWords.length > 0) {              // as above
                censoredRegex = "";
                for (i = 0; i < censoredWords.length; i++){
                    if(i != censoredWords.length-1){
                        censoredRegex = censoredRegex.concat("\\b("+censoredWords[i].replace("/\//g","\\/")+"|"+censoredWords[i].replace("/\//g","\\/")+"s)\\b|");
                    } else {
                        censoredRegex = censoredRegex.concat("\\b("+censoredWords[i].replace("/\//g","\\/")+"|"+censoredWords[i].replace("/\//g","\\/")+"s)\\b");
                    }
                }
                censoredFilter = new RegExp(censoredRegex,"gi");          // create a new regex
                clearInterval(ClientsideCensor.LoadFunction);             // stop trying to reload
                ClientsideCensor.beginCensor();                           // start censoring the chat
                
            } else {
                console.error("[ClientsideCensor] ERROR: No censored words have been defined! Unable to load.");
                clearInterval(ClientsideCensor.LoadFunction);
            }
        } else if (ClientsideCensor.LoadAttemptsCounter == 10) {
            console.log("We didn't find any words to censor after "+(ClientsideCensor.LoadAttemptsCounter)+" attempts.");
            console.error("[ClientsideCensor] ERROR: No censored words have been defined! Unable to load.");
            clearInterval(ClientsideCensor.LoadFunction);
        } else {
            console.log("We didn't find any words to censor after "+(ClientsideCensor.LoadAttemptsCounter)+" attempts.");
            ClientsideCensor.LoadAttemptsCounter++;
        }
    }, 1000),

    beginCensor: function() {
        /* a = JLAPI.mostRecentMessage.cid();
        b = eval(a.slice(1))
        
        for (i=0;i < b; i++){
            if(typeof $("#Chat_214 > ul > #entry-c"+i+" > span.message") !== "undefined") {
                c = $("#Chat_214 > ul > #entry-c"+i+" > span.message").html();
                d = c.replace(censoredFilter,"***");
                $("#Chat_214 > ul > #entry-c"+i+" > span.message").html(d);
            }
        } */ // Scan the messages already in the chat.
                
        mainRoom.model.chats.bind("afteradd", function() {   // This is what scans incoming messages and removes
            a = JLAPI.mostRecentMessage.cid();               // the naughty words
            b = $("#entry-"+a).html();
            c = b.replace(censoredFilter,"***");
            $("#entry-"+a).html(c);
        });
    },
};

function addCensoredWords() {
  for (var i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
}

JLAPI.Chat.onLoad("ClientsideCensor.LoadFunction;");
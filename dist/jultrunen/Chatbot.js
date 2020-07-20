$.getScript('http://nerdamer.com/js/nerdamer.core.js', function() {
    nerdamer.register([{
        name: 'rand',
        visible: true,
        numargs: 2,
        build: function() {
            return randomInt;
        }
    }]);

});
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//configuration
userOwnerName = "Jultrun121";
running = true;

function setMenssage(user, text, ping) {
    //para ver si en el texto fue primero el ping o no
    var isPingFirst = text.startsWith(ping);
    var module = getModule(text.toLowerCase());

    if (module !== undefined){
        if(running && module.name != "run"){
            return modules[module.name].fn(user, text, {phrase:module.phrase,end:module.end}, isPingFirst);
        }else if(!running && module.name == "run"){
             return modules[module.name].fn(user, text, {phrase:module.phrase,end:module.end}, isPingFirst);
        }
    }



}

function getModule(text) {
    var phrases = [];
    //recorre cada modulo
    for (var module in modules) { //y cada frase del modulo
        for (var i in modules[module].phrases) {
            phrase = modules[module].phrases[i];
            var regExp = new RegExp("\\b" + phrase + "\\b"); //genera una exprecion regular de la frase
            regExpResult = regExp.exec(text); //se genera una objeto con la infacion de la coincidencia del tecto ingresado con la frase

            if (regExpResult !== null) {
                phrases.push({
                    index: regExpResult.index,
                    end: regExpResult[0].length + regExpResult.index,
                    phrase: regExpResult[0],
                    name: module
                }); //si coincide agrega al array el modulo y la posicion donde se encontro por primersa vez
            }
        }

    }
    if (phrases.length > 0) {
        var minVal = phrases[0]; //encuentra en modulo con la posicion mas baja
        for (var j in phrases) {
            if (phrases[j].index < minVal.index) {
                minVal = phrases[j];
            }

        }
        return minVal;
    }
}




modules = {
    saludos: {
        phrases: ["h*o+la+","h(i|y)","hello","buenas","alola"],
        fn: function(user, text, phrase, isPingFirst) {
            var array = ["Hola", "Hi", "Alola", "Konichiwa", "hello", "España", "Reino Unido", "Alemania", "Argentina", "Bolivia", "Chile", "Colombia", "Costa Rica", "Cuba", "Ecuador", "El Salvador", "Guatemala", "Honduras", "México", "Nicaragua", "Panamá", "Paraguay", "Perú", "Puerto Rico", "República Dominicana", "Uruguay", "Venezuela", "Hyrule"];
            var L = array.length;
            var r = Math.round(Math.random() * (L - 1));
            return (array[r] + " " + user);
        },
        info: "hola:saluda al usuario",
        allInfo: "saluda al usuario en distintas formas \nhola trunBot"
    },
    despedidas: {
        phrases: ["adios"],
        fn: function(user, text, phrase, isPingFirst) {
            return ("adios "+ user);
        },
        info: "adios:despide al usuario",
        allInfo: "despide al usuario \nadios trunbot"
    },
    run: {
        phrases: ["corre","encender","enciendete"],
        fn: function(user, text, phrase, isPingFirst) {
            userModel = mainRoom.viewUsers.model.users.findByName(user);
            if (userModel.attributes.isStaff || userModel.attributes.isModerator || userModel.attributes.name == userOwnerName) {
                running = true;
                return (wgUserName + " ha sido ejecutado por " + user);
            }
        },
        info: "corre:corre el bot en caso de estar detenido. Solo pueden hacerlo los moderadores,administradores, el staff y el dueño del bot:"+userOwnerName,
        allInfo : "corre la ejecucion del bot para que pueda ser usado otra vez\ntrunbot corre"
    },
    stop: {
        phrases: ["det(e|é)n(er|te)","off"],
        fn: function(user, text, phrase, isPingFirst) {
            userModel = mainRoom.viewUsers.model.users.findByName(user);
            if (userModel.attributes.isStaff || userModel.attributes.isModerator || userModel.attributes.name == userOwnerName) {
                running = false;
                return (wgUserName + " ha sido detenido por " + user);
            }
        },
        info: "detener:detiene al bot. Solo pueden hacerlo los moderadores,administradores, el staff y el dueño del bot:"+userOwnerName,
        allInfo: "detiene la ejecucion del bot para que no pueda ser usado hasta que sea ejecutado otra vez\ntrunbot detente"
    },
    pregunta: {
        phrases: ["responde"],
        fn: function(user, text, phrase, isPingFirst) {
            var q = ["En mi opinión, sí", "Es cierto", "Es decididamente así", "Probablemente", "Buen pronóstico", "Todo apunta a que sí", "Sin duda", "Sí", "Sí - definitivamente", "Debes confiar en ello", "Respuesta vaga, vuelve a intentarlo", "Pregunta en otro momento", "Será mejor que no te lo diga ahora", "No puedo predecirlo ahora", "Concéntrate y vuelve a preguntar", "No cuentes con ello", "Mi respuesta es no", "Mis fuentes me dicen que no", "Las perspectivas no son buenas", "Muy dudoso", "pa k kieres saber eso jaja saludos", "Yo ke se, no soy 100tifikoo"];
            var whichQuotation = Math.round(Math.random() * (Q - 1));
            return Quotation[whichQuotation];


        },
        info : "responde:responde al azar usando las respuestas la Magic 8-Ball",
        allInfo: this.info+"\ntrunbot responde \"pregunta\""
    },
    matematicas: {
        phrases: ["cuanto es"],
        fn: function(user, text, phrase, isPingFirst) {
            var finalIndex = phrase.endIndex;
            var procedimiento = text.substring(finalIndex);
            try {
                resp = nerdamer(procedimiento).evaluate().text();
                if (!isNaN(resp) || procedimiento.indexOf(resp) == -1) {
                    return resp;
                }

            } catch (err) {
                if (err == 'Error: Division by zero!') {
                    return "fallo critico del sistema";
                }
            }
            return ("no se procesar eso");
        },
        info :"cuanto es:proporciona respuesta a una exprecion matematica",
        allInfo:"responde a una exprecion usando la libreria nerdamer http://nerdamer.com/ \ntrunbot cuanto es (sqrt(9)*(2+2)^4)/27"
    },
    userAleatorio: {
        phrases: ["azar"],
        fn: function(user, text, phrase, isPingFirst) {

            $usuariosSpan = $('#WikiChatList span.username');
            $usuarios = [];
            for (i = 0; i < $usuariosSpan.length; i++) {
                $usuarios[i] = $($usuariosSpan[i]).html();
            }
            var removeItem = wgUserName;

            $usuarios = jQuery.grep($usuarios, function(value) {
                return value != removeItem;
            });
            var U = $usuarios.length;
            var usuarioId = Math.round(Math.random() * (U - 1));
            return $usuarios[usuarioId];

        },
        info:"azar:seleciona un usaurio al azar expeto al mismo bot",
        allInfo:this.info+"\ntrunbot azar"
    },
    palabraAleatoria: {
        phrases: ["escoge","elige"],
        fn: function(user, text, phrase, isPingFirst) {
            var finalIndex = phrase.end+1;
            var lista = text.substring(finalIndex);
            lista = lista.split(', ').join(',').split(' ,').join(',');
            var array = lista.split(',');
            for (var i in array) {
                if (array[i].indexOf('/') === 0) {
                    array[i] = "\\" + array[i].substring(1);
                }
            }

            var L = array.length;
            var r = Math.round(Math.random() * (L - 1));

            return (array[r]);

        },
        info:"seleciona una palabra al azar de una lista separada por comas",
        allInfo:this.info+"\ntrunbot escoge opcion a,opcion b,opcion c"
    },
    preguntaUltima: {
        phrases: ["cual es el sentido de la vida"],
        fn: function(user, text, phrase, isPingFirst) {
            console.log(42)
            return "42";
        },
        info: "cual es el sentido de la vida:da la respuesta de la vida del universo y todo lo demas",
        allInfo:"da la respuesta del todo calculada por su potente procesador"
    },
    help: {
        phrases: ["help"],
        fn:function(user, text, phrase, isPingFirst){
            var finalIndex = phrase.end+1;
            if(text.length>finalIndex){
                var args = text.substring(finalIndex).toLowerCase();
                console.log(args);
                var module = getModule(args);
                console.log(module);
                if(module!==undefined){
                    return modules[module.name].allInfo;
                }
            }else{
                var info="";
                for(module in modules){
                    info=info+modules[module].info+"\n";
                }
                return info;
            }
            
        },
        info:"help:proporciona ayuda sobre los comandos del bot",
        allInfo:"muestra ayuda sobre el comando especificado  '\nhelp [comando]"
    },
    sheldonJuego: {
        phrases: ["juega"],
        fn: function(user, text, phrase, isPingFirst) {
            var finalIndex = phrase.end;
            var elecUser = text.substring(finalIndex).toLowerCase();




            var election = function(name) {
                this.name = name;
                this.w = [];
            };




            var elections = [];

            elections.push(new election("papel"));
            elections.push(new election("piedra"));
            elections.push(new election("lagarto"));
            elections.push(new election("spock"));
            elections.push(new election("tijeras"));


            for (var i = 0; i < elections.length; i++) {
                for (var j = 1; j < elections.length; j++) {
                    if ((j % elections.length) % 2 !== 0) {
                        elections[i].w.push(elections[(j + i) % elections.length].name);
                    }
                }

            }


            var elecIa = elections[Math.round(Math.random() * (elections.length - 1))];
            //console.log("ia:"+elecIa.name)

            if (new RegExp("\\bpapel\\b").test(elecUser)) {
                elecUser = elections[0];
            } else
            if (new RegExp("\\bpiedra\\b").test(elecUser)) {
                elecUser = elections[1];
            } else
            if (new RegExp("\\blagarto\\b").test(elecUser)) {
                elecUser = elections[2];
            } else
            if (new RegExp("\\bspoc*k*\\b").test(elecUser)) {
                elecUser = elections[3];
            } else
            if (new RegExp("\\bti(g|j)eras*\\b").test(elecUser)) {
                elecUser = elections[4];
            } else {
                return "elecion invalida";
            }


            if (elecUser == elecIa) {
                return "elegí " + elecIa.name + " empate";
            }
            if ($.inArray(elecIa.name, elecUser.w) != -1) {
                return "elegí " + elecIa.name + " tu " + elecUser.name + " ganaste ";
            } else {
                return "elegí " + elecIa.name + " tu " + elecUser.name + " perdiste";
            }


        },
        info:"juega:permite jugar piedra,papel,lagarto,spock,tijeras",
        allInfo:"permite jugar el juego que se ve en la serie Big Bang Teory\nLas tijeras cortan el papel, el papel cubre a la piedra, la piedra aplasta al lagarto, el lagarto envenena a Spock, Spock destroza las tijeras, las tijeras decapitan al lagarto, el lagarto se come el papel, el papel refuta a Spock, Spock vaporiza la piedra, y, como es habitual… la piedra aplasta las tijeras.\ntrunbot juega tijeras"
    }




};

if (wgCanonicalSpecialPageName == 'Chat') {
    NodeChatDiscussion.prototype.chatBot = function(chat) {
        if (mainRoom.isInitialized && chat.attributes.name != wgUserName && !chat.attributes.isInlineAlert) {
            window.dinged = true;
            //resolve HTML
            var text = chat.attributes.text;
            var pings = document.getElementById('pings').value.removeTrailing('\n').split('\n');
            for (var i = 0; i < pings.length; i++) {
                if (text.toLowerCase().indexOf(pings[i].toLowerCase()) != -1 || this != mainRoom.viewDiscussion) {
                    var textold = $('textarea[name=message]').val();
                    $('textarea[name=message]').val(setMenssage(chat.attributes.name, text, pings[i].toLowerCase()));
                    mainRoom.sendMessage({
                        which: 13,
                        shiftKey: false,
                        preventDefault: function() {}
                    })
                    if (!window.dinged) {
                        window.ding = setInterval('FlashTitle()', 500);
                    }
                    this.scrollToBottom();
                    $('textarea[name=message]').val(textold);
                    break;
                }
            }
        }
    };
    mainRoom.model.chats.bind('afteradd', $.proxy(mainRoom.viewDiscussion.chatBot, mainRoom.viewDiscussion));


}
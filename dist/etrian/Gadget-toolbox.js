// Adds a toolbox to the left side of the screen
// @author Destruction Matter

/*global $, mw */
/*jslint browser: true, plusplus: true, vars: true */

if (window.modsLoaded === undefined) {
    var modsLoaded = {};
}

if (mw.config.get('wgNamespaceNumber') !== undefined && !modsLoaded.toolbox) {
    var toolboxMod = {
        toggleToolbox: function () {
            "use strict";
            if (parseInt($('#customToolbox').css('left'), 10) < 0) {
                $('#customToolbox').animate({left: '0'});
            } else {
                $('#customToolbox').animate({left: '-245'});
            }
        },
        addTool: function () {
            "use strict";
            var link = $('#linkinputbox').val();
            var text = $('#descinputbox').val();
            $('#toolboxlinks').append('<li><a href="' + link + '">' + text + '</a></li>');
            var links = "";
            if (localStorage.toolboxLinks) {
                links = localStorage.toolboxLinks;
                links = links + "||";
            }
            links = links + link + "|" + text;
            localStorage.toolboxLinks = links;
        },
        initModule: function () {
            "use strict";
            $('body').append('<div id="customToolbox" style="position:fixed;background-color:white;z-index:10;left:-245px;top:45%;width:250px;padding:0.5em;border:2px solid black;"><strong style="font-size:large;">Toolbox</strong><ul id="toolboxlinks" style="list-style-type:disc;padding-left:1em;"><li><a href="/wiki/Project:Manual_of_Style/Rewrite">Manual of Style</a></li><li><a href="/wiki/Project:To_Do_List">Wiki To Do List</a></li><li><a href="/wiki/Category:Candidates_for_deletion">Candid. Deletion</a></li></ul><input type="text" id="linkinputbox" size="8" placeholder="URL" /><input type="text" id="descinputbox" size="8" placeholder="Name" /><button onclick="toolboxMod.addTool()">Add</button><span style="position:absolute;right:0px;top:0px;width:2.5em;height:100%;border-left:1px solid black;text-align:center;" onclick="toolboxMod.toggleToolbox()"><span style="position:absolute;top:45%;font-size:large;">&#60;</span></span></div>');
            if (localStorage.toolboxLinks) {
                var links = localStorage.toolboxLinks;
                var linksArray = links.split("||");
                var i;
                for (i = 0; i < linksArray.length; i++) {
                    var split = linksArray[i].split("|");
                    var link = split[0];
                    var text = split[1];
                    $('#toolboxlinks').append('<li><a href="' + link + '">' + text + '</a></li>');
                }
            }
        }
    };
    $(document).ready(function () {
        "use strict";
        toolboxMod.initModule();
    });
    modsLoaded.toolbox = true;
}
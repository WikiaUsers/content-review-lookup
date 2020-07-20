// <syntaxhighlight lang="JavaScript">
// Adds a module with map icons and other things to the right edit rail to allow for easier map editing
// @author Destruction Matter

/*global $, mw, confirm */
/*jslint plusplus: true, vars: true, browser: true */

// global object of what custom JS is loaded, if we are first to run, create the object
if (window.modsLoaded === undefined) {
    var modsLoaded = {};
}

// check if we are in the Map namespace and if we are editting, otherwise we don't need to load
if (mw.config.get('wgNamespaceNumber') === 112 && mw.config.get('wgAction') === 'edit' && !modsLoaded.mappingTools) {
    var mappingTools = {
        editorTextArea: "", // ID of the editor text box
        dragEnabled: false, // whether the tool is anchored
        doubleWalling: true, // whether we automatically change the appropriate adjacent wall when walling
        mapMode: 1, // which game we are mapping for
        // colours of walls and tiles for visual cues to map tool grid
        mapColors: [
            {
                tile: {
                    n: "rgb(49,132,181)",
                    d: "rgb(181,20,20)",
                    w: "rgb(24,165,222)"
                },
                wall: "rgb(148,255,239)"
            },
            {
                tile: {
                    n: "rgb(8,165,123)",
                    y: "rgb(189,206,99)",
                    c: "rgb(24,231,189)"
                },
                wall: "rgb(148,255,189)"
            }
        ],
        // array of links for the icons, 1st dimension is game, 2nd is icon, 3rd is description, file name, link
        mapIcons: [
            {
                Door: ['Door', 'Door', 'https://images.wikia.nocookie.net/etrian/images/7/70/EO1MapIconDoor.png'],
                Event: ['Event', 'Event', 'https://images.wikia.nocookie.net/etrian/images/a/ae/EO1MapIconEvent.png'],
                FOE: ['FOE', 'FOE', 'https://images.wikia.nocookie.net/etrian/images/c/c8/EO1MapIconFOE.png'],
                StairsDown: ['Down Stairs', 'StairsDown', 'https://images.wikia.nocookie.net/etrian/images/4/43/EO1MapIconStairsDown.png'],
                StairsUp: ['Up Stairs', 'StairsUp', 'https://images.wikia.nocookie.net/etrian/images/f/f5/EO1MapIconStairsUp.png'],
                Treasure: ['Treasure', 'Treasure', 'https://images.wikia.nocookie.net/etrian/images/7/7d/EO1MapIconTreasure.png'],
                Warp: ['Warp', 'Warp', 'https://images.wikia.nocookie.net/etrian/images/0/0c/EO1MapIconWarp.png'],
                Pit: ['Pit', 'Pit', 'https://images.wikia.nocookie.net/etrian/images/c/cf/EO1MapIconPit.png'],
                GeomagneticField: ['Geomagnetic Field', 'GeomagneticField', 'https://images.wikia.nocookie.net/etrian/images/e/e3/EO1MapIconGeomagneticField.png'],
                HealingSpring: ['Healing Spring', 'HealingSpring', 'https://images.wikia.nocookie.net/etrian/images/c/ca/EO1MapIconHealingSpring.png'],
                UpArrow: ['Up Arrow', 'UpArrow', 'https://images.wikia.nocookie.net/etrian/images/7/7e/EO1MapIconUpArrow.png'],
                DownArrow: ['Down Arrow', 'DownArrow', 'https://images.wikia.nocookie.net/etrian/images/1/14/EO1MapIconDownArrow.png'],
                LeftArrow: ['Left Arrow', 'LeftArrow', 'https://images.wikia.nocookie.net/etrian/images/4/40/EO1MapIconLeftArrow.png'],
                RightArrow: ['Right Arrow', 'RightArrow', 'https://images.wikia.nocookie.net/etrian/images/0/08/EO1MapIconRightArrow.png'],
                LeftRightArrow: ['Left Right Arrow', 'LeftRightArrow', 'https://images.wikia.nocookie.net/etrian/images/6/69/EO1MapIconLeftRightArrow.png'],
                UpDownArrow: ['Up Down Arrow', 'UpDownArrow', 'https://images.wikia.nocookie.net/etrian/images/b/ba/EO1MapIconUpDownArrow.png'],
                ItemPoint: ['Item Point', 'ItemPoint', 'https://images.wikia.nocookie.net/etrian/images/f/f3/EO1MapIconItemPoint.png'],
                Chop: ['Chop', 'Chop', 'https://images.wikia.nocookie.net/etrian/images/2/23/EO1MapIconChop.png'],
                Mine: ['Mine', 'Mine', 'https://images.wikia.nocookie.net/etrian/images/f/f6/EO1MapIconMine.png'],
                Take: ['Take', 'Take', 'https://images.wikia.nocookie.net/etrian/images/6/64/EO1MapIconTake.png'],
                FlowerBoat: ['Flower Boat', 'FlowerBoat', 'https://images.wikia.nocookie.net/etrian/images/5/58/EO1MapIconFlowerBoat.png']
            },
            {
                ClosedDoor: ['Closed Door', 'ClosedDoor', 'https://images.wikia.nocookie.net/etrian/images/a/a2/EO2MapIconClosedDoor.png'],
                Door: ['Door', 'Door', 'https://images.wikia.nocookie.net/etrian/images/5/52/EO2MapIconDoor.png'],
                Event: ['Event', 'Event', 'https://images.wikia.nocookie.net/etrian/images/a/a6/EO2MapIconEvent.png'],
                Important: ['Important', 'Important', 'https://images.wikia.nocookie.net/etrian/images/9/9f/EO2MapIconImportant.png'],
                FOE: ['FOE', 'FOE', 'https://images.wikia.nocookie.net/etrian/images/6/64/EO2MapIconFOE.png'],
                StairsDown: ['Down Stairs', 'StairsDown', 'https://images.wikia.nocookie.net/etrian/images/3/38/EO2MapIconStairsDown.png'],
                StairsUp: ['Up Stairs', 'StairsUp', 'https://images.wikia.nocookie.net/etrian/images/5/56/EO2MapIconStairsUp.png'],
                Treasure: ['Treasure', 'Treasure', 'https://images.wikia.nocookie.net/etrian/images/3/39/EO2MapIconTreasure.png'],
                Warp: ['Warp', 'Warp', 'https://images.wikia.nocookie.net/etrian/images/4/4c/EO2MapIconWarp.png'],
                Pit: ['Pit', 'Pit', 'https://images.wikia.nocookie.net/etrian/images/4/42/EO2MapIconPit.png'],
                GeomagneticField: ['Geomagnetic Field', 'GeomagneticField', 'https://images.wikia.nocookie.net/etrian/images/c/cf/EO2MapIconGeomagneticField.png'],
                GeomagneticPoleOff: ['Geomagnetic Pole Off', 'GeomagneticPoleOff', 'https://images.wikia.nocookie.net/etrian/images/e/e0/EO2MapIconGeomagneticPoleOff.png'],
                GeomagneticPoleOn: ['Geomagnetic Pole On', 'GeomagneticPoleOn', 'https://images.wikia.nocookie.net/etrian/images/4/46/EO2MapIconGeomagneticPoleOn.png'],
                UpArrow: ['Up Arrow', 'UpArrow', 'https://images.wikia.nocookie.net/etrian/images/9/92/EO2MapIconUpArrow.png'],
                DownArrow: ['Down Arrow', 'DownArrow', 'https://images.wikia.nocookie.net/etrian/images/9/9f/EO2MapIconDownArrow.png'],
                LeftArrow: ['Left Arrow', 'LeftArrow', 'https://images.wikia.nocookie.net/etrian/images/6/6f/EO2MapIconLeftArrow.png'],
                RightArrow: ['Right Arrow', 'RightArrow', 'https://images.wikia.nocookie.net/etrian/images/d/d3/EO2MapIconRightArrow.png'],
                LeftRightArrow: ['Left Right Arrow', 'LeftRightArrow', 'https://images.wikia.nocookie.net/etrian/images/0/05/EO2MapIconLeftRightArrow.png'],
                UpDownArrow: ['Up Down Arrow', 'UpDownArrow', 'https://images.wikia.nocookie.net/etrian/images/1/1f/EO2MapIconUpDownArrow.png'],
                ItemPointBlue: ['Item Point Blue', 'ItemPointBlue', 'https://images.wikia.nocookie.net/etrian/images/6/68/EO2MapIconItemPointBlue.png'],
                ItemPointGreen: ['Item Point Green', 'ItemPointGreen', 'https://images.wikia.nocookie.net/etrian/images/3/38/EO2MapIconItemPointGreen.png'],
                ItemPointPurple: ['Item Point Purple', 'ItemPointPurple', 'https://images.wikia.nocookie.net/etrian/images/3/36/EO2MapIconItemPointPurple.png']
            }
        ],
        // anchors/unanchors the tool from the rail and toggle JQuery UI's draggable functionality on it
        toggleDrag: function () {
            "use strict";
            var element = $('.module_maptools').detach();
            if (!this.dragEnabled) {
                element.appendTo("body");
                $('.module_maptools').draggable();
                $('.module_maptools').css("position", "fixed");
                $('.module_maptools').css("background-color", "white");
                $('.module_maptools').css("border", "1px solid black");
                $('.module_maptools').css("top", "0px");
                $('.module_maptools').css("left", "0px");
                $('.module_maptools').css("z-index", "20000001");
                $('.module_maptools').css("max-width", "400px");
                this.dragEnabled = true;
            } else if (this.dragEnabled) {
                element.insertAfter(".module_page_controls");
                $('.module_maptools').draggable("destroy");
                $('.module_maptools').css("position", "");
                $('.module_maptools').css("left", "");
                $('.module_maptools').css("top", "");
                $('.module_maptools').css("border", "");
                $('.module_maptools').css("background-color", "");
                this.dragEnabled = false;
            }
        },
        // fancy hiding/showing of tool contents
        mapToolsSlide: function () {
            "use strict";
            $('#maptoolsarea').slideToggle('medium');
            $('.module_maptools .chevron').toggleClass('expand');
            $('.module_maptools .chevron').toggleClass('collapse');
        },
        // replaces current selection with arg, to insert text, set start index at insert location and make end = start so no text is being replaced
        insertText: function (text) {
            "use strict";
            $(this.editorTextArea).textSelection('encapsulateSelection', {
                'peri': text,
                'selectPeri': false,
                'replace': true
            });
        },
        setSelection: function (sPos, ePos) {
            "use strict";
            $(this.editorTextArea).textSelection('setSelection', {
                'start': sPos,
                'end': ePos
            });
        },
        positionAtParam: function (param) {
            "use strict";
            var editText = $(this.editorTextArea).val();
            var pos = editText.indexOf(param) + param.length + 1;
            this.setSelection(pos, pos);
        },
        // select all the arguments for the given parameter, returns true if we find the param, otherwise false
        selectArg: function (param) {
            "use strict";
            var editText = $(this.editorTextArea).val();
            if (editText.indexOf(param) === -1) {
                return false;
            }
            var posS = editText.indexOf(param) + param.length + 1;
            var posE;
            var type = param.slice(2);
            if (type === "i") {
                if (editText.indexOf("[[", posS) === posS) {
                    posE = editText.indexOf("]]", posS) + 2;
                } else {
                    posE = posS;
                }
            } else {
                if (editText.indexOf("|", posS) > posS) {
                    if (editText.indexOf("|", posS) < editText.indexOf("\n", posS)) {
                        posE = editText.indexOf("|", posS);
                    } else {
                        posE = editText.indexOf("\n", posS);
                    }
                } else {
                    posE = posS;
                }
            }
            this.setSelection(posS, posE);
            return true;
        },
        insertIcon: function (iconFileName) {
            "use strict";
            this.insertText('[[File:EO' + this.mapMode + 'MapIcon' + iconFileName + '.png]]');
        },
        smartInsert: function (name, arg) {
            "use strict";
            if (arg === "tile") {
                var select = $('input[name=tile]:checked');
                if (select.hasClass("mIcon")) {
                    this.selectArg(name.slice(0, 2) + "i");
                    if (select.val() === "None") {
                        this.insertText("");
                        $("#" + name).html('');
                    } else {
                        this.insertIcon(select.val());
                        $("#" + name).html('<img src="' + this.mapIcons[this.mapMode-1][select.val()][2] + '" alt="icon" />');
                    }
                } else if (select.hasClass("mTile")) {
                    this.selectArg(name);
                    this.insertText(select.val());
                    if (select.val() === "w") {
                        if (this.selectArg(name.slice(0, 2) + "bg")) {
                            this.insertText("w");
                        }
                    }
                } else if (select.val() === "desc") {
                    this.selectArg(name.slice(0, 2) + "d");
                }
            } else {
                this.selectArg(name);
                var temp = $(this.editorTextArea).textSelection('getSelection');
                var tRow = name.charCodeAt(0);
                var tCol = parseInt(name.charAt(1), 10);
                if (temp.indexOf(arg) > -1) {
                    temp = temp.replace(arg, "");
                    this.insertText(temp);
                    this.colourToolTile(name, arg, "walloff");
                    if (this.doubleWalling) {
                        if (arg === "N") {
                            if (tRow > ("a").charCodeAt(0)) {
                                tRow -= 1;
                                tRow = String.fromCharCode(tRow);
                                this.selectArg(tRow+tCol+"w");
                                temp = $(this.editorTextArea).textSelection('getSelection');
                                temp = temp.replace("S", "");
                                this.insertText(temp);
                                this.colourToolTile(tRow+tCol+"w", "S", "walloff");
                            }
                        }
                        else if (arg === "S") {
                            if (tRow < ("e").charCodeAt(0)) {
                                tRow += 1;
                                tRow = String.fromCharCode(tRow);
                                this.selectArg(tRow+tCol+"w");
                                temp = $(this.editorTextArea).textSelection('getSelection');
                                temp = temp.replace("N", "");
                                this.insertText(temp);
                                this.colourToolTile(tRow+tCol+"w", "N", "walloff");
                            }
                        }
                        else if (arg === "W") {
                            if (tCol > 1) {
                                tCol -= 1;
                                tRow = String.fromCharCode(tRow);
                                this.selectArg(tRow+tCol+"w");
                                temp = $(this.editorTextArea).textSelection('getSelection');
                                temp = temp.replace("E", "");
                                this.insertText(temp);
                                this.colourToolTile(tRow+tCol+"w", "E", "walloff");
                            }
                        }
                        else if (arg === "E") {
                            if (tCol < 5) {
                                tCol += 1;
                                tRow = String.fromCharCode(tRow);
                                this.selectArg(tRow+tCol+"w");
                                temp = $(this.editorTextArea).textSelection('getSelection');
                                temp = temp.replace("W", "");
                                this.insertText(temp);
                                this.colourToolTile(tRow+tCol+"w", "W", "walloff");
                            }
                        }
                    }
                } else {
                    this.positionAtParam(name);
                    this.insertText(arg);
                    this.colourToolTile(name, arg, "wall");
                    if (this.doubleWalling) {
                        if (arg === "N") {
                            if (tRow > ("a").charCodeAt(0)) {
                                tRow -= 1;
                                tRow = String.fromCharCode(tRow);
                                this.positionAtParam(tRow+tCol+"w");
                                this.insertText("S");
                                this.colourToolTile(tRow+tCol+"w", "S", "wall");
                            }
                        }
                        else if (arg === "S") {
                            if (tRow < ("e").charCodeAt(0)) {
                                tRow += 1;
                                tRow = String.fromCharCode(tRow);
                                this.positionAtParam(tRow+tCol+"w");
                                this.insertText("N");
                                this.colourToolTile(tRow+tCol+"w", "N", "wall");
                            }
                        }
                        else if (arg === "W") {
                            if (tCol > 1) {
                                tCol -= 1;
                                tRow = String.fromCharCode(tRow);
                                this.positionAtParam(tRow+tCol+"w");
                                this.insertText("E");
                                this.colourToolTile(tRow+tCol+"w", "E", "wall");
                            }
                        }
                        else if (arg === "E") {
                            if (tCol < 5) {
                                tCol += 1;
                                tRow = String.fromCharCode(tRow);
                                this.positionAtParam(tRow+tCol+"w");
                                this.insertText("W");
                                this.colourToolTile(tRow+tCol+"w", "W", "wall");
                            }
                        }
                    }
                }
            }
        },
        colourToolTile: function (loc, coord, type) {
            "use strict";
            if (type === "wall") {
                $("." + loc + coord).css('background-color', this.mapColors[this.mapMode - 1].wall);
                $("#" + loc + coord).css('background-color', this.mapColors[this.mapMode - 1].wall);
            } else if (type === "tile") {
                if (coord !== "") {
                    $("#" + loc).css('background-color', this.mapColors[this.mapMode - 1].tile[coord]);
                } else if ($('input[name=tile]:checked').hasClass("mTile")) {
                    if ($('input[name=tile]:checked').val() === "") {
                        $("#" + loc).css('background-color', '');
                    } else {
                        $("#" + loc).css('background-color', this.mapColors[this.mapMode - 1].tile[$('input[name=tile]:checked').val()]);
                    }
                }
            } else if (type === "walloff") {
                $("." + loc + coord).css('background-color', '');
                $("#" + loc + coord).css('background-color', '');
            }
        },
        parseMap: function () {
            "use strict";
            var i;
            // for each row of quadrant
            for (i = 0; i < 5; i++) {
                var row;
                if (i === 0) {
                    row = "a";
                } else if (i === 1) {
                    row = "b";
                } else if (i === 2) {
                    row = "c";
                } else if (i === 3) {
                    row = "d";
                } else if (i === 4) {
                    row = "e";
                }
                var j;
                // for each cell
                for (j = 0; j < 5; j++) {
                    var tileCoord;
                    tileCoord = row + (j + 1);
                    var k;
                    // for each param of the cell
                    for (k = 0; k < 5; k++) {
                        var tileId;
                        if (k === 0) {
                            tileId = tileCoord + "t";
                        } else if (k === 1) {
                            tileId = tileCoord + "i";
                        } else if (k === 2) {
                            tileId = tileCoord + "w";
                        } else if (k === 3) {
                            tileId = tileCoord + "d";
                        } else if (k === 4) {
                            tileId = tileCoord + "bg";
                        }
                        this.selectArg(tileId);
                        var args = $(this.editorTextArea).textSelection('getSelection');
                        if (k === 2) {
                            if (args.indexOf("N") > -1) {
                                this.colourToolTile(tileId, "N", "wall");
                            }
                            if (args.indexOf("S") > -1) {
                                this.colourToolTile(tileId, "S", "wall");
                            }
                            if (args.indexOf("W") > -1) {
                                this.colourToolTile(tileId, "W", "wall");
                            }
                            if (args.indexOf("E") > -1) {
                                this.colourToolTile(tileId, "E", "wall");
                            }
                        } else if (k === 0 && args !== "") {
                            this.colourToolTile(tileId, args, "tile");
                        } else if (k === 1) {
                            if (args === "") {
                                $("#" + tileCoord + "t").html('');
                            } else {
                                var argIcon = args.slice(17);
                                argIcon = argIcon.slice(0, -6);
                                $("#" + tileCoord + "t").html('<img src="' + this.mapIcons[this.mapMode-1][argIcon][2] + '" alt="icon" />');
                            }
                        }
                    }
                }
            }
        },
        createBaseMap: function () {
            "use strict";
            if (confirm("This will replace all of the existing content on the page.  You cannot undo (Ctrl+Z) this action.  Are you sure?")) {
                var quadTemp;
                if (this.mapMode === 1) {
                    quadTemp = "";
                } else if (this.mapMode === 2) {
                    quadTemp = " EO2";
                }
                $(this.editorTextArea).val('{{Map quadrant' + quadTemp + '\r\n|a1t=|a1i=|a1w=|a1d=|a1bg=\r\n|a2t=|a2i=|a2w=|a2d=|a2bg=\r\n|a3t=|a3i=|a3w=|a3d=|a3bg=\r\n|a4t=|a4i=|a4w=|a4d=|a4bg=\r\n|a5t=|a5i=|a5w=|a5d=|a5bg=\r\n|b1t=|b1i=|b1w=|b1d=|b1bg=\r\n|b2t=|b2i=|b2w=|b2d=|b2bg=\r\n|b3t=|b3i=|b3w=|b3d=|b3bg=\r\n|b4t=|b4i=|b4w=|b4d=|b4bg=\r\n|b5t=|b5i=|b5w=|b5d=|b5bg=\r\n|c1t=|c1i=|c1w=|c1d=|c1bg=\r\n|c2t=|c2i=|c2w=|c2d=|c2bg=\r\n|c3t=|c3i=|c3w=|c3d=|c3bg=\r\n|c4t=|c4i=|c4w=|c4d=|c4bg=\r\n|c5t=|c5i=|c5w=|c5d=|c5bg=\r\n|d1t=|d1i=|d1w=|d1d=|d1bg=\r\n|d2t=|d2i=|d2w=|d2d=|d2bg=\r\n|d3t=|d3i=|d3w=|d3d=|d3bg=\r\n|d4t=|d4i=|d4w=|d4d=|d4bg=\r\n|d5t=|d5i=|d5w=|d5d=|d5bg=\r\n|e1t=|e1i=|e1w=|e1d=|e1bg=\r\n|e2t=|e2i=|e2w=|e2d=|e2bg=\r\n|e3t=|e3i=|e3w=|e3d=|e3bg=\r\n|e4t=|e4i=|e4w=|e4d=|e4bg=\r\n|e5t=|e5i=|e5w=|e5d=|e5bg=\r\n}}<noinclude>__NOWYSIWYG__</noinclude>');
            }
        },
        initModule: function () {
            "use strict";
            var i;
/******     this nav table may be obsolete now     *******/
            var tableLinks;
            tableLinks = "";
            for (i = 0; i < 5; i++) {
                tableLinks = tableLinks + "<tr>";
                var out;
                out = "'";
                if (i === 0) {
                    out = out + "a";
                } else if (i === 1) {
                    out = out + "b";
                } else if (i === 2) {
                    out = out + "c";
                } else if (i === 3) {
                    out = out + "d";
                } else if (i === 4) {
                    out = out + "e";
                }
                var j;
                for (j = 0; j < 5; j++) {
                    tableLinks = tableLinks + "<td>";
                    var out2;
                    out2 = out + (j + 1);
                    var k;
                    for (k = 0; k < 5; k++) {
                        var outl;
                        var out3;
                        if (k === 0) {
                            out3 = out2 + "t";
                            outl = "T";
                        } else if (k === 1) {
                            out3 = out2 + "i";
                            outl = "I";
                        } else if (k === 2) {
                            out3 = out2 + "w";
                            outl = "W";
                        } else if (k === 3) {
                            out3 = out2 + "d";
                            outl = "D";
                        } else if (k === 4) {
                            out3 = out2 + "bg";
                            outl = "BG";
                        }
                        out3 = out3 + "'";
                        var navLink;
                        if (k === 1) {
                            navLink = "mappingTools.selectArg(";
                        } else if (k === 0 || k === 4) {
                            navLink = "mappingTools.selectArg(";
                        } else {
                            navLink = "mappingTools.positionAtParam(";
                        }
                        tableLinks = tableLinks + '<a href="#" onclick="' + navLink + out3 + ')">' + outl + "</a>";
                        if (((k + 1) % 3) === 0 && k < 4) {
                            tableLinks = tableLinks + "<br />";
                        } else if (k < 4) {
                            tableLinks = tableLinks + "-";
                        }
                    }
                    tableLinks = tableLinks + "</td>";
                }
                tableLinks = tableLinks + "</tr>";
            }
/******     END nav table     ******/
            // Get which game we are mapping for
            if (mw.config.get('wgTitle').substr(0, 3) === "EO1") {
                this.mapMode = 1;
            } else if (mw.config.get('wgTitle').substr(0, 3) === "EO2") {
                this.mapMode = 2;
            }
            var ii = 0;
            // radio buttons for tile icons
            var iconLinks = "";
            for (var prop in this.mapIcons[this.mapMode-1]) {
                if (this.mapIcons[this.mapMode-1].hasOwnProperty(prop)) {
            //for (ii = 0; ii < this.mapIcons[this.mapMode - 1].length; ii++) {
                    iconLinks = iconLinks + '<input type="radio" class="mIcon" name="tile" value="' + mappingTools.mapIcons[mappingTools.mapMode - 1][prop][1] + '"><img src="' + mappingTools.mapIcons[mappingTools.mapMode - 1][prop][2] + '" alt="' + mappingTools.mapIcons[mappingTools.mapMode - 1][prop][0] + '" title="' + mappingTools.mapIcons[mappingTools.mapMode - 1][prop][0] + '" /></input>';
                    if ((ii+1) % 7 === 0) {
                        iconLinks += "<br />";
                    }
                    ii += 1;
                }
            }
            // new map tool here
            var output = "<table class='mapeditor' border='1' style='border-collapse:collapse'><tbody>";
            // for each row of quadrant
            for (i = 0; i < 15; i++) {
                output += "<tr>";
                var row;
                // which row we are on
                if (i < 3) {
                    row = "a";
                } else if (i < 6) {
                    row = "b";
                } else if (i < 9) {
                    row = "c";
                } else if (i < 12) {
                    row = "d";
                } else if (i < 15) {
                    row = "e";
                }
                var col;
                var tileId;
                var coord;
                // if we are on a row with map tiles
                if (i === 1 || i === 4 || i === 7 || i === 10 || i === 13) {
                    // each cell in row
                    for (ii = 0; ii < 15; ii++) {
                        // figure out which column we are on
                        if (ii < 3) {
                            col = "1";
                        } else if (ii < 6) {
                            col = "2";
                        } else if (ii < 9) {
                            col = "3";
                        } else if (ii < 12) {
                            col = "4";
                        } else if (ii < 15) {
                            col = "5";
                        }
                        // combine to get cell location
                        tileId = row + col;
                        // if we are at a tile, otherwise we are at a vertical border
                        if (ii === 1 || ii === 4 || ii === 7 || ii === 10 || ii === 13) {
                            tileId += "t";
                            output += '<td class="mapcell" id="' + tileId + '" onclick="mappingTools.smartInsert(' + "'" + tileId + "'" + ', ' + "'tile'" + ');mappingTools.colourToolTile(' + "'" + tileId + "','','tile')" + '"></td>';
                        } else {
                            tileId += "w";
                            // if we are left border, or right
                            if (ii === 0 || ii === 3 || ii === 6 || ii === 9 || ii === 12) {
                                coord = "W";
                                output += '<td class="mapborderV" id="' + tileId + coord + '" onclick="mappingTools.smartInsert(' + "'" + tileId + "'" + ', ' + "'" + coord + "'" + ')"></td>';
                            } else {
                                coord = "E";
                                output += '<td class="mapborderV" id="' + tileId + coord + '" onclick="mappingTools.smartInsert(' + "'" + tileId + "'" + ', ' + "'" + coord + "'" + ')"></td>';
                            }
                        }
                    }
                } else {
                    for (ii = 0; ii < 15; ii++) {
                        // figure out which column we are on
                        if (ii < 3) {
                            col = "1";
                        } else if (ii < 6) {
                            col = "2";
                        } else if (ii < 9) {
                            col = "3";
                        } else if (ii < 12) {
                            col = "4";
                        } else if (ii < 15) {
                            col = "5";
                        }
                        // combine to get cell location
                        tileId = row + col + "w";
                        // if we are at a border or not
                        if (ii === 1 || ii === 4 || ii === 7 || ii === 10 || ii === 13) {
                            // if we are on top border, or bottom
                            if (i === 0 || i === 3 || i === 6 || i === 9 || i === 12) {
                                coord = "N";
                                output += '<td class="mapborderH" id="' + tileId + coord + '" onclick="mappingTools.smartInsert(' + "'" + tileId + "'" + ', ' + "'" + coord + "'" + ')"></td>';
                            } else {
                                coord = "S";
                                output += '<td class="mapborderH" id="' + tileId + coord + '" onclick="mappingTools.smartInsert(' + "'" + tileId + "'" + ', ' + "'" + coord + "'" + ')"></td>';
                            }
                        } else {
                            output += '<td class="' + tileId;
                            // left corner, or right
                            if (ii === 0 || ii === 3 || ii === 6 || ii === 9 || ii === 12) {
                                output += 'W';
                            } else {
                                output += 'E';
                            }
                            output += ' ' + tileId;
                            // top corner, or bottom
                            if (i === 0 || i === 3 || i === 6 || i === 9 || i === 12) {
                                output += 'N';
                            } else {
                                output += 'S';
                            }
                            output += '"></td>';
                        }
                    }
                }
                output += "</tr>";
            }
            output += "</tbody></table>";
            var tileSelect = '<input type="radio" class="mIcon" name="tile" value="None">No Icon</input><br /><br />';
            tileSelect += '<input type="radio" class="mTile" name="tile" value="" checked="checked">None</input><br /><input type="radio" class="mTile" name="tile" value="n">Normal</input><br />';
            if (this.mapMode === 1) {
                tileSelect += '<input type="radio" class="mTile" name="tile" value="d">Damage</input><br /><input type="radio" class="mTile" name="tile" value="w">Water</input>';
            } else if (this.mapMode === 2) {
                tileSelect += '<input type="radio" class="mTile" name="tile" value="y">Yellow</input><br /><input type="radio" class="mTile" name="tile" value="c">Cyan</input>';
            }
            tileSelect += '<br /><br /><input type="radio" name="tile" value="desc">Description</input><br /><a href="javascript:void(0)" onclick="mappingTools.doubleWalling = !mappingTools.doubleWalling;">Double Wall</a>';
            $('<div class="module module_maptools"><h3 onclick="mappingTools.mapToolsSlide()"><span>Mapping Tools</span><img src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" class="chevron expand" /></h3><div id="maptoolsarea" style="display:none" class="module_content">' + iconLinks + '<br /><div style="float:right">' + tileSelect + '</div><table id="tablenavlinks" border="1" style="font-size:18px;display:none"><tbody>' + tableLinks + '</tbody></table><br />' + output + '<br /><a href="javascript:void(0)" onclick="mappingTools.parseMap()">Parse Map</a>&nbsp;&nbsp;<a href="javascript:void(0)" onclick="$(' + "'#tablenavlinks'" + ').toggle()">Toggle Nav Table</a>&nbsp;&nbsp;<a href="javascript:void(0)" onclick="mappingTools.toggleDrag()">Release/Anchor</a><br /><a href="javascript:void(0)" onclick="mappingTools.createBaseMap()">Create Base Map (Will replace all existing content)</a></div>').insertAfter('.module_page_controls');
        }
    };
    $(document).ready(function () {
        "use strict";
        mw.loader.using('jquery.ui.draggable');
        mappingTools.initModule();
        if ($('body').hasClass('rte')) {
            mappingTools.editorTextArea = "textarea.cke_source";
        } else {
            mappingTools.editorTextArea = "#wpTextbox1";
            mappingTools.mapToolsSlide();
        }
    });
    modsLoaded.mappingTools = true;
}
// </syntaxhighlight>
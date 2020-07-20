/*
 * Tic tac toe 
 * by Dessamator
 */

$(function () {
    if (mw.config.get('wgCanonicalSpecialPageName') === 'Chat') {
        //user configuration
        var sPlayerImagesURL = ["https://vignette.wikia.nocookie.net/duolingo/images/0/05/Champagne.png", "https://vignette.wikia.nocookie.net/duolingo/images/d/da/FormalAtire.png"];
        var sBot = 'TTTbot ';
        var bUsePlayerImages = true; //0 no images; 1 imagex active

        //end user configuration

        var sCurrentPlayer = 0;
        var sStyles = '<style id="TTTstyles">' +
            '.TTTbox{' +
            'cursor:pointer;' +
            'width:150px;' +
            'height:150px;' +
            'border-radius: 10px;' +
            'display: block;' +
            'position:relative;' +
            'top: 0px; float: right' +
            '}' +
            '</style>';
        var oPlayers = [
            ['0', '<img src=' + sPlayerImagesURL[0] + ' alt="imgPlayer1" height="20" width="30">', 0],
            ['X', '<img src=' + sPlayerImagesURL[1] + ' alt="imgPlayer2" height="20" width="30">', 0]
        ];
        var sEmptyCell = "●";
        var bPlayed = false;
        var tIds = ["00", "01", "02", "10", "11", "12", "20", "21", "22"];
        var oAINextPlay = {
            x: -1,
            y: -1,
            play: false
        };
        var arrTTT = [];
        var sVer = "1.0";

        main();

        function main() {
            console.log(sBot + ' ' + sVer + " " + new Date().toISOString());
            //Load ChatArrival
            mainRoom.model.chats.bind('afteradd', ChatArrival); // Create a link to the chatarrival
        }

        function ChatArrival(oChat) {
            sData = oChat.attributes.text;
            var sLastUser = oChat.attributes.name;
            if (sData) {
                var bTriggeredCmd = triggeredCmd(sData, sLastUser);
                if (bTriggeredCmd) {
                    return true;
                }
            }
        }

        function removeMsg() {
            $('.Chat li').last().remove();
        }

        function triggeredCmd(sData, sUser) {
            sData = sData.toLowerCase();
            var arrMatchCmd = sData.match(/^!(\S+)/i) || [];
            var sCmd = arrMatchCmd[1] || "";
            if (sData.substr(0, 1) === ("!")) {
                if (sCmd === 'ticstart' && sUser === wgUserName) {
                    removeMsg();
                    startGame();
                    return true;
                }
            }
            return false;
        }

        function createTable() {
            for (var i = 0; i < 3; i++) {
                if (!arrTTT[i]) {
                    arrTTT[i] = [];
                }
                for (var j = 0; j < 3; j++) {
                    arrTTT[i][j] = sEmptyCell;
                }
            }
            var btnDismiss = '<span id="btnDismiss" class="dismiss" style="margin-left: 35px; color:red">X</span>';
            var btnChange = '<span id="idChangeIcon" style="margin-top:70px;margin-left: 0px; color:red">*</span>';
            var sTTT = btnChange + btnDismiss + "<table><caption>TicTT</caption>" + "<tbody><tr>";
            for (var i = 0; i < 9; i++) {
                sTTT += '<td style="border-style: solid">' + '<div id="c' + tIds[i] + '" style="width:35px; height:30px">' + sEmptyCell + '</div></td>';
                if (i === 2 || i === 5) {
                    sTTT += '</tr><tr>';
                }
            }
            sTTT += "</tbody></tr></table>";
            $('.Chat')[0].scrollTop = $('.Chat')[0].scrollHeight;
            return sTTT;
        }

        function startGame() {
            if ($('#TTTgame').length > 0) {
                $('#TTTgame').html(createTable());
            } else {
                $('#TTTstyles').remove();
                $('body').append(sStyles);
                $('.Chat').append('<div id="TTTgame" class="TTTbox">');
                $('#TTTgame').html(createTable());
            }
            $('#btnDismiss').on('click', function () {
                $('#TTTgame').fadeOut(function () {
                    $(this).remove();
                });
            });
            $('#idChangeIcon').on('click', function () {
                bUsePlayerImages = !(bUsePlayerImages);
                var iUseImages = 0;
                var arrPlayerId = {
                    "X": 0,
                        "0": 1
                };
                if (bUsePlayerImages) {
                    iUseImages = 1;
                }
                for (var i = 0; i < 3; i++) {
                    for (var j = 0; j < 3; j++) {
                        if (arrTTT[i][j] === "X" || arrTTT[i][j] === "0") {
                            var iValue = arrPlayerId[arrTTT[i][j]];
                            $('#c' + i + '' + j).html(oPlayers[iValue][iUseImages]);
                        }
                    }
                }
            });

            $('div').on('click', function () {
                if ($(this).html() === sEmptyCell) {
                    if (sCurrentPlayer === 0) {
                        if ($(this).html() === sEmptyCell) { //&& !bPlayed) {
                            bPlayed = true;
                            var sId = $(this).attr('id');
                            var x = sId.substr(1, 1);
                            var y = sId.substr(2);
                            PlayCell(x, y);
                            sCurrentPlayer = 1;
                        }
                    }
                    if (sCurrentPlayer === 1 && hasEnded().length === 0) {
                        var x, y;
                        if (isVal(1, 1, sEmptyCell)) {
                            x = 1;
                            y = 1;
                        } else if (oAINextPlay.play) {
                            x = oAINextPlay.x;
                            y = oAINextPlay.y;
                        } else {
                            do {
                                sCoord = Math.floor((Math.random() * tIds.length));
                                x = tIds[sCoord].substr(0, 1);
                                y = tIds[sCoord].substr(1);
                            } while (!isVal(x, y, sEmptyCell));
                        }
                        oAINextPlay.play = false;
                        PlayCell(x, y);
                        sCurrentPlayer = 0;
                    }
                    var sResult = hasEnded();
                    if (sResult !== "") {
                        if (sResult === "draw") {
                            alert("Draw. Game over.");
                        } else {
                            oPlayers[sCurrentPlayer][2] += 1;
                            var sWinner = "PC wins";
                            if (sCurrentPlayer === 1) {
                                sWinner = "You win";
                            }
                            alert(sWinner + ". Score :" + oPlayers[0][2] +
                                '-' + oPlayers[1][2] + ' (P1-P2)');
                        }
                        sCurrentPlayer = 0;
                        startGame();
                    }
                }
            });
        }

        function PlayCell(x, y) {
            var iUseImages = 0;
            if (bUsePlayerImages) {
                iUseImages = 1;
            }
            if (x < 3 && x >= 0 && y < 3 && y >= 0) {
                arrTTT[x][y] = oPlayers[sCurrentPlayer][0];
                $('#c' + x + '' + y).html(oPlayers[sCurrentPlayer][iUseImages]);
            }
        }

        function getCellVal(x, y) {
            return arrTTT[x][y];
        }

        function isVal(x, y, sVal) {
            var sCoordValue = getCellVal(x, y);
            if (sVal === sCoordValue) {
                return true;
            }
            return false;
        }

        function hasEnded() {
            var sResult = "";
            var iCount = 0;
            var sRowHData, sRowVData;
            var sPlayer1 = oPlayers[0][0];
            var sPlayer2 = oPlayers[1][0];
            for (var i = 0; i < 3; i++) {
                var iHorXs = 0,
                    iHorOs = 0,
                    iVerXs = 0,
                    iVerOs = 0;
                sRowHData = "";
                sRowVData = "";
                for (var j = 0; j < 3; j++) {
                    sRowHData += getCellVal(i, j);
                    sRowVData += getCellVal(j, i);
                    if (!isVal(i, j, sEmptyCell)) {
                        iCount++;
                    }
                    if (isVal(i, j, sPlayer2)) {
                        iHorXs++;
                    }
                    if (isVal(i, j, sPlayer1)) {
                        iHorOs++;
                    }
                    if (isVal(j, i, sPlayer2)) {
                        iVerXs++;
                    }
                    if (isVal(j, i, sPlayer1)) {
                        iVerOs++;
                    }
                    if (sCurrentPlayer === 1) {
                        function makeMove(x, sRowData, bVEmpty) {
                            var iEmpty = sRowData.indexOf(sEmptyCell);
                            y = iEmpty;
                            if (bVEmpty) {
                                iEmpty = sRowData.indexOf(sEmptyCell);
                                y = x;
                                x = iEmpty;
                            }
                            if (iEmpty >= 0 && sRowData.length === 3) {
                                oAINextPlay.x = x;
                                oAINextPlay.y = y;
                                oAINextPlay.play = true;
                            }
                        }
                        if (sRowHData.length === 3 && iHorOs === 2 || iHorXs === 2) {
                            makeMove(i, sRowHData, false);
                        } else if (sRowVData.length === 3 && iVerOs === 2 || iVerXs === 2) {
                            makeMove(i, sRowVData, true);
                        }
                    }
                    if (iHorXs > 2 || iHorOs > 2 || iVerXs > 2 || iVerOs > 2) {
                        sResult = "win";
                    }
                }
            }
            if (isVal(1, 1, sPlayer1)) {
                if (sCurrentPlayer === 1) {
                    var tDiagDefense = {
                        "00": "22",
                            "02": "20",
                            "22": "00",
                            "20": "02"
                    };
                    var x1, y1, x2, y2;
                    for (var sCoord in tDiagDefense) {
                        x1 = sCoord.substr(0, 1);
                        y1 = sCoord.substr(1);
                        if (isVal(x1, y1, sPlayer1)) {
                            x2 = tDiagDefense[sCoord].substr(0, 1);
                            y2 = tDiagDefense[sCoord].substr(1);
                            if (isVal(x2, y2, sEmptyCell)) {
                                oAINextPlay.x = x2;
                                oAINextPlay.y = y2;
                                oAINextPlay.play = true;
                                break;
                            }
                        }
                    }
                }
            }
            if (isVal(1, 1, sPlayer1) && ((isVal(0, 2, sPlayer1) && isVal(2, 0, sPlayer1)) || (isVal(0, 0, sPlayer1) && isVal(2, 2, sPlayer1)))) {
                sResult = "win";
            } else if (isVal(1, 1, sPlayer2) && (isVal(0, 2, sPlayer2) && isVal(2, 0, sPlayer2) || (isVal(0, 0, sPlayer2) && isVal(2, 2, sPlayer2)))) {
                sResult = "win";
            }
            if (iCount === 9 & sResult.length < 1) {
                sResult = "draw";
            }
            return sResult;
        }
    }
});
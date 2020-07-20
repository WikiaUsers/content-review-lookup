/* Created primarily for the Animal Crossing Wiki <http://animalcrossing.wikia.com>
Everything's licensed under the MIT License (see below).

The MIT License (MIT)

Copyright (c) 2015 Wikia User 'Dragonfree97'

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */
/* This is a demo game to show off the features of ChatGame. It has three parts:
the parser, the commands, and the game logic. The parser is what reads incoming
messages that ChatGame passes to the game. It is responsible for slicing up the
message into commands with arguments. Each command has a respective section in
the ttt object which details how many arguments each command takes and also what
code should be executed upon receiving the command. Upon receiving a command from
ChatGame, the gameParser will cause the respective code to be executed. In this game,
the commands are simply 'tell the other player we clicked on cell XY', 'clicking on
XY was a valid move for the opponent', and 'clicking on XY was not a valid move for
the opponent'. It's necessary to have these verification functions because otherwise
people could cheat very easily. The game logic section simply is responsible for
checking if someone has won yet, clicking on the appropriate cell in the game board,
etc. These three blocks combine to make the game, which hooks in to ChatGame to
provide multiplayer connectivity. */
/* Read messages from ChatGame get passed into this function here */
/* All multiplayer games must have a gameParser function          */
function gameParser(input) {
    TicTacToe.mostRecentCommand = input;
    // console.log("GAMEPARSER input: " + input);
    var inputArray = input.slice(4).split('-');
    // console.log(inputArray);
    var actionParams = eval("ttt.".concat(inputArray[0], ".params"));
    // console.log(actionParams);
    gameParamString = "";
    for (i = 1; i < actionParams + 1; i++) {
        if (i == actionParams) {
            gameParamString = gameParamString.concat("'", inputArray[i], "'");
        } else {
            gameParamString = gameParamString.concat("'", inputArray[i], "',");
        }
    }
    // console.log(gameParamString);
    eval("ttt.".concat(inputArray[0], ".action(" + gameParamString + ")"));
}

/* Here's our command setup. Must begin with three letter game code */

ttt = {
    clicked: {
        action: function(cell) {
            var verified = TicTacToe.theyClickedOnCell(cell);
            if (verified === true) {
                ChatGame.communicate("ttt-verified-" + TicTacToe.mostRecentCommand);
                TicTacToe.yourTurn = true;
                TicTacToe.checkForWinner();
                TicTacToe.updateTurn();
            } else {
                ChatGame.communicate("ttt-notverified-" + TicTacToe.mostRecentCommand);
            }
        },
        params: 2,
    },
    verified: {
        action: function(input) {
            TicTacToe.checkForWinner();
            // TO DO: pass information to spectators somehow
            TicTacToe.updateTurn();
        }
    },
    notverified: {
        action: function(input) {
            TicTacToe.yourTurn = true;
            // parse for last parameter
            var notVerifiedArray = input.slice(4).split('-');
            console.error("[TicTacToe] ERROR: The following action was considered illegal by the other player: " + notVerifiedArray);
            var a = notVerifiedArray.length;
            TicTacToe.revertCell(input);
        }
    }
};

/* Game logic */

TicTacToe = {
    html: '<table style="width: 400px"> <tr> <td style="width: 50%;"> <table id="tictactoe-table"> <tbody id="tictactoe-tbody"> <tr class="tictactoe-tr"> <td class="tictactoe-td" id="tictactoe-11" onClick="TicTacToe.clickedOnCell(this.id.slice(10));"></td><td class="tictactoe-td" id="tictactoe-12" onClick="TicTacToe.clickedOnCell(this.id.slice(10));"></td><td class="tictactoe-td" id="tictactoe-13" onClick="TicTacToe.clickedOnCell(this.id.slice(10));"></td></tr><tr class="tictactoe-tr"> <td class="tictactoe-td" id="tictactoe-21" onClick="TicTacToe.clickedOnCell(this.id.slice(10));"></td><td class="tictactoe-td" id="tictactoe-22" onClick="TicTacToe.clickedOnCell(this.id.slice(10));"></td><td class="tictactoe-td" id="tictactoe-23" onClick="TicTacToe.clickedOnCell(this.id.slice(10));"></td></tr><tr class="tictactoe-tr"> <td class="tictactoe-td" id="tictactoe-31" onClick="TicTacToe.clickedOnCell(this.id.slice(10));"></td><td class="tictactoe-td" id="tictactoe-32" onClick="TicTacToe.clickedOnCell(this.id.slice(10));"></td><td class="tictactoe-td" id="tictactoe-33" onClick="TicTacToe.clickedOnCell(this.id.slice(10));"></td></tr></tbody> </table> </td><td style="border:1px solid black; vertical-align:top;"> <table id="tictactoe-info-table" style="margin-left:auto; margin-right: auto; width: 100%;"> <tbody id="tictactoe-info-tbody" style="width: 100%;"> <tr class="tictactoe-info-tr" style="width: 100%;"><td style="width: 100%;"><center id="tictactoe-info-header" style="width: 100%;"> <b>Tic-tac-toe</b></center></td></tr><tr class="tictactoe-info-tr" style="width: 100%;"><td style="width: 100%;">' +
        '<center id="whose-turn-is-it" style="width: 100%;"></center></td></tr><tr class="tictactoe-info-tr" style="width: 100%;"><td style="width: 100%;">' +
        '<center id="which-player-am-i" style="width: 100%;"></center></td></tr><tr class="tictactoe-info-tr" style="width: 100%;"><td style="width: 100%;">' +
        '<center id="info" style="width: 100%;">This is a proof-of-concept game to demonstrate the features of ChatGame.</center></td></tr></tbody> </table> </td></tr></table>',
    css: '.tictactoe-td { border: 1px solid black; height: 48px; width: 48px; background-color: white; }',

    gridArray: ["", "", "", "", "", "", "", "", ""],
    yourTurn: false,
    gameOver: false,
    numberOfTurns: 0,

    mostRecentCommand: "", //NYI

    updateTurn: function() {
        if (TicTacToe.yourTurn === true) {
            $("#whose-turn-is-it").html("It's your turn!");
        } else {
            $("#whose-turn-is-it").html("It's their turn!");
        }
    },

    clearGameBoard: function() {
        $(".tictactoe-td").css("background-color", "white");
        TicTacToe.gridArray = ["", "", "", "", "", "", "", "", ""];
        //console.log("clearing the game board");
        TicTacToe.numberOfTurns = 0;
        TicTacToe.gameOver = false;
    },

    revertCell: function(input) {
        TicTacToe.gridArray[TicTacToe.clickToArray(eval(input))] = "";
        $("#tictactoe-" + input).css("background-color", "white");
    },

    theyClickedOnCell: function(input) {
        if (TicTacToe.gridArray[TicTacToe.clickToArray(eval(input))] === "") {
            if (ChatGame.currentPlayer == "player2") {
                $("#tictactoe-" + input).css("background-color", "blue");
                a = TicTacToe.clickToArray(eval(input));
                //console.log(a);
                TicTacToe.gridArray[a] = "X";
                //console.log(TicTacToe.gridArray);
            } else {
                $("#tictactoe-" + input).css("background-color", "red");
                a = TicTacToe.clickToArray(eval(input));
                //console.log(a);
                TicTacToe.gridArray[a] = "O";
                //console.log(TicTacToe.gridArray);
            }
            return true;
        } else {
            return false; // They can't go here
        }
    },

    clickedOnCell: function(input) {
        //console.log("You clicked on cell " + input);
        if (TicTacToe.yourTurn === true) {
            if (TicTacToe.gridArray[TicTacToe.clickToArray(eval(input))] === "") {
                if (ChatGame.currentPlayer == "player1") {
                    $("#tictactoe-" + input).css("background-color", "blue");
                    a = TicTacToe.clickToArray(eval(input));
                    //console.log(a);
                    TicTacToe.gridArray[a] = "X";
                    //console.log(TicTacToe.gridArray);
                } else {
                    $("#tictactoe-" + input).css("background-color", "red");
                    a = TicTacToe.clickToArray(eval(input));
                    //console.log(a);
                    TicTacToe.gridArray[a] = "O";
                    //console.log(TicTacToe.gridArray);
                }
                TicTacToe.yourTurn = false;
                ChatGame.communicate("ttt-clicked-" + input); // Tells the other player the move you just made
            } else {
                alert("You can't go here!");
            }
        } else {
            alert("It's not your turn!");
        }
    },

    clickToArray: function(n) {
        i = 0;
        switch (n) {
            case 11:
                i = 0;
                //console.log("i = " + i);
                break;
            case 12:
                i = 1;
                //console.log("i = " + i);
                break;
            case 13:
                i = 2;
                //console.log("i = " + i);
                break;
            case 21:
                i = 3;
                //console.log("i = " + i);
                break;
            case 22:
                i = 4;
                //console.log("i = " + i);
                break;
            case 23:
                i = 5;
                //console.log("i = " + i);
                break;
            case 31:
                i = 6;
                //console.log("i = " + i);
                break;
            case 32:
                i = 7;
                //console.log("i = " + i);
                break;
            case 33:
                i = 8;
                //console.log("i = " + i);
                break;
        }
        return i;
    },

    winnerFound: function(winner) {
        TicTacToe.gameOver = true;
        TicTacToe.numberOfTurns = 0;
        if (ChatGame.broadcastEnabled) {
            if (winner != ChatGame.currentPlayer) {
                sendMessage("[ChatGame] " + ChatGame.otherPlayerName + " beat me at Tic-tac-toe!");
                alert(ChatGame.otherPlayerName + " won!");
            } else {
                sendMessage("[ChatGame] I beat " + ChatGame.otherPlayerName + " at Tic-tac-toe!");
                alert(wgUserName + " won!");
            }
        }
        TicTacToe.clearGameBoard();
    },

    draw: function() {
        alert("It was a draw");
        TicTacToe.gameOver = true;
        TicTacToe.numberOfTurns = 0;
        if (ChatGame.broadcastEnabled) {
            sendMessage("[ChatGame] I drew against " + ChatGame.otherPlayerName + " in a game of Tic-tac-toe!");
        }
        TicTacToe.clearGameBoard();
    },

    checkForWinner: function() {
        TicTacToe.numberOfTurns++;
        // This is an extremely shitty way to do this check so I apologise to anyone out there cringing at this poor code

        //check the horizontal rows
        if (TicTacToe.gridArray[0] == "X" && TicTacToe.gridArray[1] == "X" && TicTacToe.gridArray[2] == "X") {
            TicTacToe.winnerFound("player1");
        }
        if (TicTacToe.gridArray[3] == "X" && TicTacToe.gridArray[4] == "X" && TicTacToe.gridArray[5] == "X") {
            TicTacToe.winnerFound("player1");
        }
        if (TicTacToe.gridArray[6] == "X" && TicTacToe.gridArray[7] == "X" && TicTacToe.gridArray[8] == "X") {
            TicTacToe.winnerFound("player1");
        }

        if (TicTacToe.gridArray[0] == "O" && TicTacToe.gridArray[1] == "O" && TicTacToe.gridArray[2] == "O") {
            TicTacToe.winnerFound("player2");
        }
        if (TicTacToe.gridArray[3] == "O" && TicTacToe.gridArray[4] == "O" && TicTacToe.gridArray[5] == "O") {
            TicTacToe.winnerFound("player2");
        }
        if (TicTacToe.gridArray[6] == "O" && TicTacToe.gridArray[7] == "O" && TicTacToe.gridArray[8] == "O") {
            TicTacToe.winnerFound("player2");
        }

        //check the vertical columns
        if (TicTacToe.gridArray[0] == "X" && TicTacToe.gridArray[3] == "X" && TicTacToe.gridArray[6] == "X") {
            TicTacToe.winnerFound("player1");
        }
        if (TicTacToe.gridArray[1] == "X" && TicTacToe.gridArray[4] == "X" && TicTacToe.gridArray[7] == "X") {
            TicTacToe.winnerFound("player1");
        }
        if (TicTacToe.gridArray[2] == "X" && TicTacToe.gridArray[5] == "X" && TicTacToe.gridArray[8] == "X") {
            TicTacToe.winnerFound("player1");
        }

        if (TicTacToe.gridArray[0] == "O" && TicTacToe.gridArray[3] == "O" && TicTacToe.gridArray[6] == "O") {
            TicTacToe.winnerFound("player2");
        }
        if (TicTacToe.gridArray[1] == "O" && TicTacToe.gridArray[4] == "O" && TicTacToe.gridArray[7] == "O") {
            TicTacToe.winnerFound("player2");
        }
        if (TicTacToe.gridArray[2] == "O" && TicTacToe.gridArray[5] == "O" && TicTacToe.gridArray[8] == "O") {
            TicTacToe.winnerFound("player2");
        }

        //check the diagonals
        if (TicTacToe.gridArray[0] == "X" && TicTacToe.gridArray[4] == "X" && TicTacToe.gridArray[8] == "X") {
            TicTacToe.winnerFound("player1");
        }
        if (TicTacToe.gridArray[2] == "X" && TicTacToe.gridArray[4] == "X" && TicTacToe.gridArray[6] == "X") {
            TicTacToe.winnerFound("player1");
        }

        if (TicTacToe.gridArray[0] == "O" && TicTacToe.gridArray[4] == "O" && TicTacToe.gridArray[8] == "O") {
            TicTacToe.winnerFound("player2");
        }
        if (TicTacToe.gridArray[2] == "O" && TicTacToe.gridArray[4] == "O" && TicTacToe.gridArray[6] == "O") {
            TicTacToe.winnerFound("player2");
        }

        if (!TicTacToe.gameOver && TicTacToe.numberOfTurns == 9) {
            TicTacToe.draw();
        }
    },

    loadGame: function() {
        createInlineAlert("Loading Tic-tac-toe");

        var $TicTacToeWindow = $.showCustomModal("Tic-tac-toe", "<div id='game-box'></div>", {
            id: "tictactoeWindow",
            width: 400,
            buttons: [{
                id: "Quit",
                message: "Quit",
                handler: function() {
                    $("#tictactoeWindow").closeModal();
                    ChatGame.disconnectPlayer();
                }
            }]
        });

        $("#game-box").html(""); // just in case
        $(".blackout").remove();

        $($TicTacToeWindow).draggable({
            cancel: "#game-box",
        }); // make the modal movable

        $("head").append("<style>" + TicTacToe.css + "</style>");
        $("#game-box").append(TicTacToe.html);
        TicTacToe.updateTurn();

        if (ChatGame.currentPlayer == "player1") {
            TicTacToe.yourTurn = true;
            $("#which-player-am-i").html("<b style='color:blue;'>You're player 1!</b>");
            TicTacToe.updateTurn();
        } else {
            TicTacToe.yourTurn = false;
            $("#which-player-am-i").html("<b style='color:red;'>You're player 2!</b>");
            TicTacToe.updateTurn();
        }
    }
};

/* Bootstrap the app */
/* note: I don't really know what that means but the wikia chat source code uses it when initializing mainRoom so it's probably important */
/* and it sounds cool so it's okay */

TicTacToe.loadGame();
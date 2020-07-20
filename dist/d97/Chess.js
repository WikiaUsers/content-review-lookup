function gameParser(input) {
    console.log("GAMEPARSER input: " + input);
    var inputArray = input.slice(4).split('-');
    console.log(inputArray);
    var actionParams = eval("chx.".concat(inputArray[0], ".params"));
    console.log(actionParams);
    gameParamString = "";
    for (i = 1; i < actionParams + 1; i++) {
        if (i == actionParams) {
            gameParamString = gameParamString.concat("'", inputArray[i], "'");
        } else {
            gameParamString = gameParamString.concat("'", inputArray[i], "',");
        }
    }
    // console.log(gameParamString);
    eval("chx.".concat(inputArray[0], ".action(" + gameParamString + ")"));
}

chx = {
    moved: {
        action: function(x1, y1, x2, y2) {
            if (ChessGame.verifyMove(x1, y1, x2, y2)) {
                ChessGame.yourTurn = true;
                ChessGame.movePiece(x1, y1, x2, y2);
                ChatGame.communicate("chx-valid-" + x1 + "-" + y1 + "-" + x2 + "-" + y2);
                $(".chess-piece").draggable("enable");
                ChessGame.updateCells();
                switch (ChessGame.gameStatus(ChessGame.player)) {
                    case "mate":
                        ChessGame.gameOver(false);
                        break;
                    case "stale":
                        ChessGame.gameOver("draw");
                        break;
                }
            } else {
                ChatGame.communicate("chx-invalid");
                console.log("ERROR: Move invalid. If you see this, it means something's gone seriously wrong");
            }
        },
        params: 4,
    },
    valid: {
        action: function(x1, y1, x2, y2) {
            ChessGame.movePiece(x1, y1, x2, y2);
            $("#chess-loading-icon").css("display", "none");
            ChessGame.updateCells();
            var otherplayer;
            switch (ChessGame.player) {
                case 'white':
                    otherplayer = 'black';
                    break;
                case 'black':
                    otherplayer = 'white';
                    break;
            }
            switch (ChessGame.gameStatus(otherplayer)) {
                case "mate":
                    ChessGame.gameOver(true);
                    break;
                case "stale":
                    ChessGame.gameOver("draw");
                    break;
            }
        },
        params: 4,
    },
    invalid: {
        action: function() {
            console.log("ERROR: Move invalid. If you see this, it means something's gone seriously wrong");
            ChessGame.yourTurn = true;
            $(".chess-piece").draggable("enable");
            ChessGame.updateCells();
        },
        params: 0,
    },
    resign: {
        action: function() {
            ChessGame.updateCells();
            ChessGame.gameOver("resigned");
        },
        params: 0,
    },
    draw: {
        action: function() {
            $(".chess-dialog").dialog("open");
        },
        params: 0,
    },
    drawagree: {
        action: function() {
            alert("The other player agreed to a draw.");
            ChessGame.updateCells();
            ChessGame.gameOver("draw");
        },
        params: 0,
    },
    drawdecline: {
        action: function() {
            console.log("Draw request was declined");
            $(".chess-piece").draggable("enable");
            ChessGame.updateCells();
        },
        params: 0,
    }
};

ChessGame = {
    version: 3.0,

    chessboardArray: [],
    moveType: "normal", // used for checking en passant, castling and promotion
    processTime: 0,
    player: '',
    yourTurn: false,

    css: '.no-close .ui-dialog-titlebar-close {display: none;}.ui-state-disabled{opacity: 1 !important;}.chess-width-override{width: initial !important;}.no-close .ui-dialog-titlebar-close{display: none;}.chess-td{height: 34px; width: 32px;position: relative;}.chess-td:hover{box-shadow: inset 1px 1px red, 1px 1px red;z-index: 1000;}.hovering{box-shadow: inset 1px 1px blue, 1px 1px blue;z-index: 999;}.chess-piece{height: 32px; width: 32px; background-size: 32px;}.chess-highlight{background-color: orange; opacity: 0; height: 34px; width: 34px; position: absolute; left: 0px; top: 0px;}.taken-chess-piece{display: inline-block;}',
    html: '<!--<div id="chess-dialog">The other player wants to agree to a draw. Do you accept?</div>--> <table> <tr> <td style="border: 1px solid red;"> <table id="chess-table" style=\'border-spacing:0; border: 5px outset Sienna;\'> <tbody id="chess-tbody"> </tbody> </table> </td><td style="border:1px solid red; width:150px; vertical-align:top;"> <table id="chess-info-table" style="margin-left:auto; margin-right: auto; width: 100%; border-collapse:collapse; font-size: 10pt;"> <tbody id="chess-info-tbody" style="width: 100%;"> <tr class="chess-info-tr" style="width: 100%;"><td style="width: 100%;"><center id="chess-info" style="width: 100%;"> <b>Chess Version 0.3</b></center></td></tr><tr class="chess-info-tr" style="width: 100%;"><td style="width: 100%;"><center id="whose-turn-is-it" style="width: 100%;">It\'s your turn!</center></td></tr><tr class="chess-info-tr" style="width: 100%;"><td style="width: 100%;"><center id="which-player-am-i" style="width: 100%;">You\'re player 1.</center></td></tr><tr class="chess-info-tr" style="width: 100%;"><td style="width: 100%;"><center id="is-white-in-check" style="width: 100%;">White\'s not in check.</center></td></tr><tr class="chess-info-tr" style="width: 100%;"><td style="width: 100%;"><center id="is-black-in-check" style="width: 100%;">Black\'s not in check.</center></td></tr><tr class="chess-info-tr" style="width: 100%;"> <td style="width: 100%"> <center><button id="chess-resign">Resign</button></center> </td></tr><tr class="chess-info-tr" style="width: 100%;"> <td style="width: 100%"> <center><button id="chess-draw">Declare a draw</button></center> </td></tr> <tr class="chess-info-tr" style="width: 100%;"> <td style="width: 100%"> <center><img src="https://vignette.wikia.nocookie.net/d97/images/a/af/Hourglass.gif/revision/latest?cb=20150803204258" id="chess-loading-icon"></center> </td></tr></tbody> </table> </td></tr></table>',

    normalcolor: "rgb(240,217,181)",
    darkcolor: "rgb(181,136,99)",
    normalhighlight: "rgb(249,185,72)",
    darkhighlight: "rgb(255,153,39)",

    // Gets the piece at x,y
    getPiece: function(x, y) {
        //console.log("trying to scan piece ("+x+","+y+")");
        if (x > 7 || x < 0 || y > 7 || y < 0) {
            console.error("ERROR: Attempted to call getPiece with invalid co-ordinates!");
            return false;
        }
        if (!ChessGame.chessboardArray[y][x]) return false;
        return ChessGame.chessboardArray[y][x];
    },

    gameOver: function(win) {
        $(".chess-piece").draggable("disable");
        if (win === true) {
            alert("Game over! You won!");
            if (ChatGame.broadcastResult) sendMessage("[ChatGame] I beat " + otherPlayerName + " at chess!");
        } else if (win === false) {
            alert("Game over! You lost!");
            if (ChatGame.broadcastResult) sendMessage("[ChatGame] I lost to " + otherPlayerName + " at chess!");
        } else if (win === "draw") {
            alert("Game over! Stalemate!");
            if (ChatGame.broadcastResult) sendMessage("[ChatGame] I drew with " + otherPlayerName + " at chess!");
        } else if (win === "resigned") {
            alert("Game over! The other player resigned!");
            if (ChatGame.broadcastResult) sendMessage("[ChatGame] I beat " + otherPlayerName + " at chess!");
        } else {
            alert("Game over!");
        }
        $("#chessWindow").closeModal();
        ChatGame.disconnectPlayer();
        ChatGame.reset();
    },

    // Puts piece obj down at x,y
    setPiece: function(x, y, obj) {
        ChessGame.chessboardArray[y][x] = obj;
    },

    askForVerif: function(x1, y1, x2, y2) {
        if (!(x1 == x2 && y1 == y2) && ChessGame.getPiece(x1, y1)) {
            ChessGame.yourTurn = false;
            var x1 = parseInt(x1, 10);
            var y1 = parseInt(y1, 10);
            var x2 = parseInt(x2, 10);
            var y2 = parseInt(y2, 10);
            $(".chess-piece").draggable("disable");
            $("#chess-loading-icon").css("display", "inline");
            ChatGame.communicate("chx-moved-" + x1 + "-" + y1 + "-" + x2 + "-" + y2);
        }
    },

    verifyMove: function(x1, y1, x2, y2, testingForCheck) {
        // Behold! My AntiStringBullshitInator!
        var x1 = parseInt(x1, 10);
        var y1 = parseInt(y1, 10);
        var x2 = parseInt(x2, 10);
        var y2 = parseInt(y2, 10);
        var dx = x2 - x1;
        var dy = y2 - y1;
        var type = "normal";
        var validMove = false; // Here we store if our move is ostensibly valid without regard to check etc
        //if(!testingForCheck) { console.log("Moving from ("+x1+","+y1+") to ("+x2+","+y2+"); dx = "+dx+", dy = "+dy); }

        if (!ChessGame.getPiece(x1, y1)) return false; // We don't want to be moving around blank squares
        var ourPiece = ChessGame.getPiece(x1, y1);
        //if(!testingForCheck) { console.log("Our piece: "+ourPiece.color+" "+ourPiece.type); }
        if (ChessGame.getPiece(x2, y2)) {
            var theirPiece = ChessGame.getPiece(x2, y2);
        } else {
            var theirPiece = false;
        }
        if (theirPiece) {
            //if(!testingForCheck) { console.log("Their piece: "+theirPiece.color+" "+theirPiece.type); }
            if (theirPiece.color == ourPiece.color) return false; // Don't let us move onto our own pieces.
            if (!testingForCheck && theirPiece.type == "king") return false; // Don't let us capture the king.
        }

        // This is disgustingly and probably needlessly complicated
        switch (ourPiece.type) {
            case "pawn":
                // Move case 1: Can move two spaces forward.
                if (ourPiece.initial && (dy == 2 || dy == -2) && dx == 0) {
                    //console.log("Pawn: move case 1");
                    validMove = true;
                    if (ourPiece.color == "black" && (ChessGame.getPiece(x1, y1 + 1) || ChessGame.getPiece(x1, y1 + 2))) {
                        validMove = false;
                    }
                    if (ourPiece.color == "white" && (ChessGame.getPiece(x1, y1 - 1) || ChessGame.getPiece(x1, y1 - 2))) {
                        validMove = false;
                    }
                }
                // Move case 2: Can move one space forward.
                if (dx == 0) {
                    //console.log("Pawn: move case 2");
                    if (ourPiece.color == "black" && dy == 1 && !theirPiece) validMove = true;
                    if (ourPiece.color == "white" && dy == -1 && !theirPiece) validMove = true;
                }
                // Move case 3: Taking another piece.
                if (theirPiece && (dx == 1 || dx == -1)) {
                    //console.log("Pawn: move case 3");
                    if (ourPiece.color == "black" && dy == 1) validMove = true;
                    if (ourPiece.color == "white" && dy == -1) validMove = true;
                }
                break;
            case "rook":
                // Move case 1: Horizontal movement
                var clear = false;
                if (y1 == y2 || x1 == x2) clear = true; // Assume the path is clear
                if (y1 == y2) {
                    //console.log("Rook: move case 1");
                    if (dx == 1 || dx == -1) clear = true; // If we're only moving one tile, we don't need to check if there's anything in the way.
                    if (dx < 0) {
                        for (i = -1; i > dx; i--) { // Left-wards movement
                            if (ChessGame.getPiece(x1 + i, y1)) clear = false;
                        }
                    }
                    if (dx > 0) {
                        for (i = 1; i < dx; i++) { // Right-wards movement
                            if (ChessGame.getPiece(x1 + i, y1)) clear = false;
                        }
                    }
                }
                // Move case 2: Vertical movement
                if (x1 == x2) {
                    //console.log("Rook: move case 2");
                    if (dy == 1 || dy == -1) clear = true; // If we're only moving one tile, we don't need to check if there's anything in the way.
                    if (dy < 0) {
                        for (i = -1; i > dy; i--) { // Up-wards movement
                            if (ChessGame.getPiece(x1, y1 + i)) clear = false;
                        }
                    }
                    if (dy > 0) {
                        for (i = 1; i < dy; i++) { // Down-wards movement
                            if (ChessGame.getPiece(x1, y1 + i)) clear = false;
                        }
                    }
                }
                validMove = clear;
                break;
            case "knight":
                // Move case 1: L-shaped movement
                //console.log("Knight: move case 1");
                if ((dx == 1 && dy == -2) || (dx == 2 && dy == -1) || (dx == 2 && dy == 1) || (dx == 1 && dy == 2) || (dx == -1 && dy == -2) || (dx == -2 && dy == -1) || (dx == -2 && dy == 1) || (dx == -1 && dy == 2)) {
                    validMove = true;
                }
                break;
            case "bishop":
                var clear = false;
                if (dx == dy || -1 * dx == dy) {
                    clear = true; // The bishop can move when the gradient of its move is 1 or -1.
                    if (dx > -2 && dx < 2 && dy > -2 && dy < 2) validMove = true; // If we're only moving one tile, we don't need to check if it's clear.
                    // Move case 1: Up & Right
                    if (dx > 1 && dy < -1) { /*console.log("Bishop: move case 1");*/
                        for (i = 1; i < dx; i++) {
                            if (x1 + i < 0 || y1 + i < 0 || x1 + i > 7 || y1 - i > 7) return false; // Let's not move off the board
                            if (ChessGame.getPiece(x1 + i, y1 - i)) clear = false;
                        }
                    }
                    // Move case 2: Up & Left
                    if (dx < -1 && dy < -1) { /*console.log("Bishop: move case 2");*/
                        for (i = -1; i > dx; i--) {
                            if (x1 + i < 0 || y1 + i < 0 || x1 + i > 7 || y1 + i > 7) return false; // Let's not move off the board
                            if (ChessGame.getPiece(x1 + i, y1 + i)) clear = false;
                        }
                    }
                    // Move case 3: Down & Right
                    if (dx > 1 && dy > 1) { /*console.log("Bishop: move case 3");*/
                        for (i = 1; i < dx; i++) {
                            if (x1 + i < 0 || y1 + i < 0 || x1 + i > 7 || y1 + i > 7) return false; // Let's not move off the board
                            if (ChessGame.getPiece(x1 + i, y1 + i)) clear = false;
                        }
                    }
                    // Move case 4: Down & Left
                    if (dx < -1 && dy > 1) { /*console.log("Bishop: move case 4");*/
                        for (i = -1; i > dx; i--) {
                            if (x1 + i < 0 || y1 - i < 0 || x1 + i > 7 || y1 - i > 7) return false; // Let's not move off the board
                            console.log("Checking cell (" + (x1 + i) + "," + (y1 - i) + ")");
                            if (ChessGame.getPiece(x1 + i, y1 - i)) clear = false;
                        }
                    }
                }
                validMove = clear;
                break;
            case "queen":
                var clear = false;
                if (x1 == x2 || y1 == y2 || dx == dy || -1 * dx == dy) clear = true;
                if (dx == dy || -1 * dx == dy) { // The queen can move when the gradient of its move is 1 or -1.
                    if (dx > -2 && dx < 2 && dy > -2 && dy < 2) validMove = true; // If we're only moving one tile, we don't need to check if it's clear.
                    // Move case 1: Up & Right
                    if (dx > 1 && dy < -1) { /*console.log("Queen: move case 1");*/
                        for (i = 1; i < dx; i++) {
                            if (x1 + i < 0 || y1 + i < 0 || x1 + i > 7 || y1 - i > 7) return false; // Let's not move off the board
                            if (ChessGame.getPiece(x1 + i, y1 - i)) clear = false;
                        }
                    }
                    // Move case 2: Up & Left
                    if (dx < -1 && dy < -1) { /*console.log("Queen: move case 2");*/
                        for (i = -1; i > dx; i--) {
                            if (x1 + i < 0 || y1 + i < 0 || x1 + i > 7 || y1 + i > 7) return false; // Let's not move off the board
                            if (ChessGame.getPiece(x1 + i, y1 + i)) clear = false;
                        }
                    }
                    // Move case 3: Down & Right
                    if (dx > 1 && dy > 1) { /*console.log("Queen: move case 3");*/
                        for (i = 1; i < dx; i++) {
                            if (x1 + i < 0 || y1 + i < 0 || x1 + i > 7 || y1 + i > 7) return false; // Let's not move off the board
                            if (ChessGame.getPiece(x1 + i, y1 + i)) clear = false;
                        }
                    }
                    // Move case 4: Down & Left
                    if (dx < -1 && dy > 1) { /*console.log("Queen: move case 4");*/
                        for (i = -1; i > dx; i--) {
                            if (x1 + i < 0 || y1 - i < 0 || x1 + i > 7 || y1 - i > 7) return false; // Let's not move off the board
                            if (ChessGame.getPiece(x1 + i, y1 - i)) clear = false;
                        }
                    }
                }
                // Move case 5: Horizontal movement
                if (y1 == y2) {
                    /*console.log("Queen: Move case 5");*/
                    if (dx == 1 || dx == -1) clear = true; // If we're only moving one tile, we don't need to check if there's anything in the way.
                    if (dx < 0) {
                        for (i = -1; i > dx; i--) { // Left-wards movement
                            if (ChessGame.getPiece(x1 + i, y1)) clear = false;
                        }
                    }
                    if (dx > 0) {
                        for (i = 1; i < dx; i++) { // Right-wards movement
                            if (ChessGame.getPiece(x1 + i, y1)) clear = false;
                        }
                    }
                }
                // Move case 6: Vertical movement
                if (x1 == x2) {
                    /*console.log("Queen: Move case 6");*/
                    if (dy == 1 || dy == -1) clear = true; // If we're only moving one tile, we don't need to check if there's anything in the way.
                    if (dy < 0) {
                        for (i = -1; i > dy; i--) { // Up-wards movement
                            if (ChessGame.getPiece(x1, y1 + i)) clear = false;
                        }
                    }
                    if (dy > 0) {
                        for (i = 1; i < dy; i++) { // Down-wards movement
                            if (ChessGame.getPiece(x1, y1 + i)) clear = false;
                        }
                    }
                }
                console.log("clear: " + clear);
                validMove = clear;
                break;
            case "king":
                // Move case 1 - regular king movement
                if (dx < 2 && dx > -2 && dy < 2 && dy > -2) { // The king can only move within one square of his current position.
                    //console.log("King: Move case 1");
                    validMove = true;
                }
                if (!testingForCheck && ourPiece.initial && !ChessGame.inCheck(ourPiece.color)) { // Castling!
                    // Move case 2 - kingside castling
                    if (y1 == y2 && x2 == 6 && ChessGame.getPiece(7, y1) && !ChessGame.getPiece(6, y1) && !ChessGame.getPiece(5, y1)) {
                        if (ChessGame.getPiece(7, y1).color == ourPiece.color && ChessGame.getPiece(7, y1).type == "rook" && ChessGame.getPiece(7, y1).initial === true) {
                            //console.log("King: Move case 2");
                            validMove = true;
                        }
                    }
                    if (y1 == y2 && x2 == 2 && ChessGame.getPiece(0, y1) && !ChessGame.getPiece(3, y1) && !ChessGame.getPiece(2, y1) && !ChessGame.getPiece(1, y1)) {
                        if (ChessGame.getPiece(0, y1).color == ourPiece.color && ChessGame.getPiece(0, y1).type == "rook" && ChessGame.getPiece(0, y1).initial === true) {
                            //console.log("King: Move case 3");
                            validMove = true;
                        }
                    }
                }
                break;
        }
        if (!validMove) { /*console.log("Invalid move");*/ } else if (!testingForCheck) {
            // Here we're going to simulate the move and see if it puts us in check.
            var otherPiece = ChessGame.getPiece(x2, y2);
            ChessGame.setPiece(x2, y2, ourPiece);
            ChessGame.setPiece(x1, y1, '');
            var are_we_in_check = ChessGame.inCheck(ourPiece.color);
            //console.log("Would we be in check if we moved to ("+x2+","+y2+")? "+are_we_in_check)
            ChessGame.setPiece(x1, y1, ourPiece);
            ChessGame.setPiece(x2, y2, otherPiece);
            if (!are_we_in_check) { /*console.log("this move won't put us in check! we're free to move");*/
                return true;
            } else { /*console.log("this move would put us in check");*/
                return false;
            }
        } else {
            return true;
        }
    },

    movePiece: function(x1, y1, x2, y2) {

        ChessGame.moveType = "normal";

        // Behold! My AntiStringBullshitInator!
        var x1 = parseInt(x1, 10);
        var y1 = parseInt(y1, 10);
        var x2 = parseInt(x2, 10);
        var y2 = parseInt(y2, 10);

        if (!(x1 == x2 && y1 == y2) && ChessGame.getPiece(x1, y1) && ChessGame.verifyMove(x1, y1, x2, y2)) {
            // Decide what kind of move we seem to be making
            our_piece = ChessGame.getPiece(x1, y1);
            ChessGame.moveType = "normal";
            if (our_piece.type == "king" && x1 == 4 && x2 == 6) ChessGame.moveType = "kingside castling";
            if (our_piece.type == "king" && x1 == 4 && x2 == 2) ChessGame.moveType = "queenside castling";

            switch (ChessGame.moveType) {
                case "normal":
                    // Move handling 1: regular movement
                    console.log("Move handling 1");
                    their_piece = ChessGame.getPiece(x2, y2);
                    ChessGame.setPiece(x2, y2, our_piece);
                    ChessGame.setPiece(x1, y1, '');
                    ChessGame.getPiece(x2, y2).initial = false; // Set the initial status to false, because we know this piece has moved.

                    //Promotion code
                    var promote = '';
                    if (our_piece.color == "white" && our_piece.type == "pawn" && y2 === 0) {
                        while (!(promote == "queen" || promote == "rook" || promote == "knight" || promote == "bishop")) {
                            promote = prompt("Promote your pawn to: (accepted values: queen, rook, knight, bishop)", "queen");
                            promote = promote.toLowerCase();
                        }
                        ChessGame.getPiece(x2, y2).type = promote;
                    }
                    if (our_piece.color == "black" && our_piece.type == "pawn" && y2 == 7) {
                        while (!(promote == "queen" || promote == "rook" || promote == "knight" || promote == "bishop")) {
                            promote = prompt("Promote your pawn to: (accepted values: queen, rook, knight, bishop)", "queen");
                            promote = promote.toLowerCase();
                        }
                        ChessGame.getPiece(x2, y2).type = promote;
                    }
                    break;
                case "kingside castling":
                    // Move handling 2: kingside castle
                    console.log("Move handling 2");
                    their_piece = ChessGame.getPiece(7, y2);
                    ChessGame.setPiece(6, y2, our_piece);
                    ChessGame.setPiece(7, y2, ''); // Delete the rook at (7,y)
                    ChessGame.setPiece(4, y2, ''); // Delete the king at (4,y)
                    ChessGame.setPiece(5, y1, their_piece);
                    ChessGame.getPiece(6, y2).initial = false; // Set the initial status to false, because we know this piece has moved.
                    ChessGame.getPiece(5, y2).initial = false; // Set the initial status to false, because we know this piece has moved.
                    break;
                case "queenside castling":
                    // Move handling 3: queenside castle
                    console.log("Move handling 3");
                    their_piece = ChessGame.getPiece(0, y2);
                    ChessGame.setPiece(2, y2, our_piece);
                    ChessGame.setPiece(0, y2, ''); // Delete the rook at (7,y)
                    ChessGame.setPiece(4, y2, ''); // Delete the king at (4,y)
                    ChessGame.setPiece(3, y1, their_piece);
                    ChessGame.getPiece(2, y2).initial = false; // Set the initial status to false, because we know this piece has moved.
                    ChessGame.getPiece(3, y2).initial = false; // Set the initial status to false, because we know this piece has moved.
                    break;
                default:
                    console.error("ERROR: This move doesn't appear to have valid typing.");
            }
            ChessGame.updateCells();
            var audio = new Audio('https://vignette.wikia.nocookie.net/d97/images/f/fb/Chess.ogg/revision/latest?cb=20150802123053');
            audio.play();
        }
    },

    // By rendering a piece on every square and only changing the object values, we save all that dicking around with jquery
    updateCells: function() {
        for (y = 0; y < 8; y++) {
            for (x = 0; x < 8; x++) {
                if (ChessGame.getPiece(x, y)) {
                    // console.log("Updating a "+ChessGame.getPiece(x,y).color+" "+ChessGame.getPiece(x,y).type+" on cell ("+x+","+y+")");
                    if (ChessGame.getPiece(x, y).color == "white") {
                        if (ChessGame.getPiece(x, y).type == "pawn") {
                            $("#chess-piece-" + x + y).css("background-image", 'url("https://vignette.wikia.nocookie.net/d97/images/6/6e/WP.png/revision/latest?cb=20150730160239")');
                        }
                        if (ChessGame.getPiece(x, y).type == "rook") {
                            $("#chess-piece-" + x + y).css("background-image", 'url("https://vignette.wikia.nocookie.net/d97/images/4/43/WR.png/revision/latest?cb=20150730160239")');
                        }
                        if (ChessGame.getPiece(x, y).type == "knight") {
                            $("#chess-piece-" + x + y).css("background-image", 'url("https://vignette.wikia.nocookie.net/d97/images/d/dc/WN.png/revision/latest?cb=20150730160238")');
                        }
                        if (ChessGame.getPiece(x, y).type == "bishop") {
                            $("#chess-piece-" + x + y).css("background-image", 'url("https://vignette.wikia.nocookie.net/d97/images/7/73/WB.png/revision/latest?cb=20150730160238")');
                        }
                        if (ChessGame.getPiece(x, y).type == "queen") {
                            $("#chess-piece-" + x + y).css("background-image", 'url("https://vignette.wikia.nocookie.net/d97/images/4/42/WQ.png/revision/latest?cb=20150730160239")');
                        }
                        if (ChessGame.getPiece(x, y).type == "king") {
                            $("#chess-piece-" + x + y).css("background-image", 'url("https://vignette.wikia.nocookie.net/d97/images/0/05/WK.png/revision/latest?cb=20150730160238")');
                        }
                    } else {
                        if (ChessGame.getPiece(x, y).type == "pawn") {
                            $("#chess-piece-" + x + y).css("background-image", 'url("https://vignette.wikia.nocookie.net/d97/images/d/dc/BP.png/revision/latest?cb=20150730160236")');
                        }
                        if (ChessGame.getPiece(x, y).type == "rook") {
                            $("#chess-piece-" + x + y).css("background-image", 'url("https://vignette.wikia.nocookie.net/d97/images/f/ff/BR.png/revision/latest?cb=20150730160237")');
                        }
                        if (ChessGame.getPiece(x, y).type == "knight") {
                            $("#chess-piece-" + x + y).css("background-image", 'url("https://vignette.wikia.nocookie.net/d97/images/1/16/BN.png/revision/latest?cb=20150730160236")');
                        }
                        if (ChessGame.getPiece(x, y).type == "bishop") {
                            $("#chess-piece-" + x + y).css("background-image", 'url("https://vignette.wikia.nocookie.net/d97/images/e/e7/BB.png/revision/latest?cb=20150730160235")');
                        }
                        if (ChessGame.getPiece(x, y).type == "queen") {
                            $("#chess-piece-" + x + y).css("background-image", 'url("https://vignette.wikia.nocookie.net/d97/images/0/07/BQ.png/revision/latest?cb=20150730160237")');
                        }
                        if (ChessGame.getPiece(x, y).type == "king") {
                            $("#chess-piece-" + x + y).css("background-image", 'url("https://vignette.wikia.nocookie.net/d97/images/e/e2/BK.png/revision/latest?cb=20150730160236")');
                        }
                    }
                    if (ChessGame.getPiece(x, y).color != ChessGame.player && ChessGame.yourTurn) {
                        $("#chess-piece-" + x + y).draggable("disable");
                    } else {
                        $("#chess-piece-" + x + y).draggable("enable");
                    }
                } else {
                    $("#chess-piece-" + x + y).css("background-image", 'none');
                }
            }
        }
        if (ChessGame.inCheck("black")) {
            console.log("Black's king is in check!");
            $("#is-black-in-check").html("Black <b>is</b> in check!");
        } else {
            $("#is-black-in-check").html("Black's not in check!");
        }

        if (ChessGame.inCheck("white")) {
            console.log("White's king is in check!");
            $("#is-white-in-check").html("White <b>is</b> in check!");
        } else {
            $("#is-white-in-check").html("White's not in check!");
        }

        if (ChessGame.yourTurn) {
            $("#whose-turn-is-it").html("<b> <span style='color: red;'>It's your turn!</span> </b>");
        } else {
            $("#whose-turn-is-it").html("It's their turn!");
        }
    },

    inCheck: function(color) {
        console.log("Testing for check.");
        var king_attacked_x = 0;
        var king_attacked_y = 0;
        var king_found = false;

        for (attacked_y = 0; attacked_y < 8; attacked_y++) { // check every row
            if (king_found) break;
            for (attacked_x = 0; attacked_x < 8; attacked_x++) { // check every cell in each row
                if (ChessGame.getPiece(attacked_x, attacked_y)) { // if there's a piece at this position
                    if (ChessGame.getPiece(attacked_x, attacked_y).color == color && ChessGame.getPiece(attacked_x, attacked_y).type == "king") {
                        console.log("We found the " + color + " king! He's at (" + attacked_x + "," + attacked_y + ")");
                        king_attacked_x = attacked_x;
                        king_attacked_y = attacked_y;
                    }
                }
            }
        }
        // Now we know where the king is, we're going to check if there's anything on the board that can take it in the next move.
        var check = false; // assume the king is not in check

        for (attacking_y = 0; attacking_y < 8; attacking_y++) {
            if (check) break; // prevent doing loads of tests if we know the king is already in check

            for (attacking_x = 0; attacking_x < 8; attacking_x++) {
                if (check) break;
                if (typeof ChessGame.getPiece(attacking_x, attacking_y).color !== "undefined") {
                    //console.log("Checking cell ("+attacking_x+","+attacking_y+") for attacks on king at ("+king_attacked_x+","+king_attacked_y+")");
                    if (ChessGame.getPiece(attacking_x, attacking_y).color != color) {
                        //console.log("Checking a "+ChessGame.getPiece(attacking_x,attacking_y).color+ChessGame.getPiece(attacking_x,attacking_y).type+" at ("+attacking_x+","+attacking_y+").");
                        if (ChessGame.verifyMove(attacking_x, attacking_y, king_attacked_x, king_attacked_y, true)) { //can something move onto the king's square?
                            //console.log("The "+ChessGame.getPiece(attacking_x,attacking_y).color+ChessGame.getPiece(attacking_x,attacking_y).type+" at ("+attacking_x+","+attacking_y+") can move onto the king's square!");
                            check = true;
                        }
                    }
                }
            }
        }
        return check;
    },

    gameStatus: function(color) {
        if (!(color == "white" || color == "black")) {
            console.error("ERROR: Invalid input into ChessGame.gameStatus()!");
        } else {
            //Test for checkmate, first of all
            var available_move = false; // assume we can't move
            for (cm_y1 = 0; cm_y1 < 8; cm_y1++) {
                if (available_move === true) break;
                for (cm_x1 = 0; cm_x1 < 8; cm_x1++) { // For every cell on the board
                    if (available_move === true) break;
                    if (ChessGame.getPiece(cm_x1, cm_y1)) { // if there's a piece
                        if (ChessGame.getPiece(cm_x1, cm_y1).color == color) { // and it's not the same color as we are
                            for (cm_y2 = 0; cm_y2 < 8; cm_y2++) {
                                if (available_move === true) break;
                                for (cm_x2 = 0; cm_x2 < 8; cm_x2++) {
                                    if (available_move === true) break;
                                    if (ChessGame.verifyMove(cm_x1, cm_y1, cm_x2, cm_y2)) {
                                        console.log("Valid move found!");
                                        available_move = true;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (!available_move && !ChessGame.inCheck(color)) {
                console.log("Stalemate!");
                return "stale";
            } else if (!available_move) {
                console.log("Checkmate!");
                return "mate";
            } else if (ChessGame.inCheck(color)) {
                console.log("Check!");
                return "check";
            } else {
                return true;
            }
        }
    },

    addHighlights: function(x, y) {
        var hi_x = parseInt(x, 10);
        var hi_y = parseInt(y, 10);
        var hi_x2;
        var hi_y2;
        for (hi_y2 = 0; hi_y2 < 8; hi_y2++) { // check every row
            for (hi_x2 = 0; hi_x2 < 8; hi_x2++) { // check every cell in each row
                if (ChessGame.verifyMove(hi_x, hi_y, hi_x2, hi_y2)) {
                    if (hi_y2 % 2 != hi_x2 % 2) {
                        $("#chess-td-" + hi_x2 + hi_y2).css("background-color", ChessGame.darkhighlight);
                    } else {
                        $("#chess-td-" + hi_x2 + hi_y2).css("background-color", ChessGame.normalhighlight);
                    }
                }
            }
        }
    },

    // Hides the move guidance after you drop a piece
    removeHighlights: function() {
        for (y = 0; y < 8; y++) { // check every row
            for (x = 0; x < 8; x++) { // check every cell in each row
                if (y % 2 != x % 2) {
                    $("#chess-td-" + x + y).css("background-color", ChessGame.darkcolor);
                } else {
                    $("#chess-td-" + x + y).css("background-color", ChessGame.normalcolor);
                }
            }
        }
    },

    resign: function() {
        if (confirm("Would you like to resign? This will end the game.")) {
            ChatGame.communicate("chx-resign");
            if (ChatGame.broadcastResult) sendMessage("[ChatGame] I lost to " + otherPlayerName + " at chess!");
            $("#chessWindow").closeModal();
            ChatGame.disconnectPlayer();
            ChatGame.reset();
        }
    },

    draw: function() {
        if (confirm("Would you like to offer to draw? This will end the game if the other player agrees.")) {
            ChatGame.communicate("chx-draw");
            $(".chess-piece").draggable("disable");
        }
    },

    // Creates the chessboard and populates it with pieces
    drawChessboard: function() {
        for (y = 0; y < 8; y++) {
            ChessGame.chessboardArray.push([]);
            $("#chess-tbody").append("<tr id='chess-row-" + y + "'>a</tr>");
            // console.log(y);
            for (x = 0; x < 8; x++) {
                $("#chess-row-" + y).append("<td class='chess-td' id='chess-td-" + x + y + "' x='" + x + "' y='" + y + "'></td>");
                $("#chess-td-" + x + y).append("<div id='chess-piece-" + x + y + "' x='" + x + "' y='" + y + "' class='chess-piece'></div>");

                ChessGame.chessboardArray[y].push("");

                if (y % 2 != x % 2) { // This changes the color of the cells for the checkerboard pattern
                    $("#chess-td-" + x + y).css("background-color", ChessGame.darkcolor);
                } else {
                    $("#chess-td-" + x + y).css("background-color", ChessGame.normalcolor);
                }

                // Now we're going to add our pieces
                // Firstly the pawns
                if (y == 1) ChessGame.chessboardArray[y][x] = {
                    "color": "black",
                    "type": "pawn",
                    "initial": true
                }; // second-top row
                if (y == 6) ChessGame.chessboardArray[y][x] = {
                    "color": "white",
                    "type": "pawn",
                    "initial": true
                }; // second-bottom row
                if (y === 0) { // Black pieces
                    if (x === 0 || x == 7) ChessGame.chessboardArray[y][x] = {
                        "color": "black",
                        "type": "rook",
                        "initial": true
                    };
                    if (x == 1 || x == 6) ChessGame.chessboardArray[y][x] = {
                        "color": "black",
                        "type": "knight",
                        "initial": true
                    };
                    if (x == 2 || x == 5) ChessGame.chessboardArray[y][x] = {
                        "color": "black",
                        "type": "bishop",
                        "initial": true
                    };
                    if (x == 3) ChessGame.chessboardArray[y][x] = {
                        "color": "black",
                        "type": "queen",
                        "initial": true
                    };
                    if (x == 4) ChessGame.chessboardArray[y][x] = {
                        "color": "black",
                        "type": "king",
                        "initial": true
                    };
                }
                if (y === 7) { // White pieces
                    if (x === 0 || x == 7) ChessGame.chessboardArray[y][x] = {
                        "color": "white",
                        "type": "rook",
                        "initial": true
                    };
                    if (x == 1 || x == 6) ChessGame.chessboardArray[y][x] = {
                        "color": "white",
                        "type": "knight",
                        "initial": true
                    };
                    if (x == 2 || x == 5) ChessGame.chessboardArray[y][x] = {
                        "color": "white",
                        "type": "bishop",
                        "initial": true
                    };
                    if (x == 3) ChessGame.chessboardArray[y][x] = {
                        "color": "white",
                        "type": "queen",
                        "initial": true
                    };
                    if (x == 4) ChessGame.chessboardArray[y][x] = {
                        "color": "white",
                        "type": "king",
                        "initial": true
                    };
                }

                $(".chess-piece").draggable({
                    zIndex: 1000,
                    containment: "#chess-tbody",
                    start: function(event, ui) {
                        if (ChessGame.yourTurn == true) {
                            var x = $(ui.helper).attr("x");
                            var y = $(ui.helper).attr("y");
                            ChessGame.addHighlights(x, y);
                        } else {
                            $(ui.helper).draggable("disable");
                        }
                    },
                    stop: function(event, ui) {
                        ChessGame.removeHighlights();
                    },
                });
                $(".chess-td").droppable({
                    hoverClass: "hovering",
                    drop: function(event, ui) {
                        if (ChessGame.yourTurn == true) {
                            var newX = $(this).attr('x');
                            var newY = $(this).attr('y');
                            var oldX = $(ui.draggable).attr('x');
                            var oldY = $(ui.draggable).attr('y');
                            ChessGame.askForVerif(oldX, oldY, newX, newY);
                        }
                        $(ui.draggable).css("left", "0px").css("top", "0px");
                    }
                });

            }
        }
    },

    loadApp: function() {
        createInlineAlert("Loading Chess");

        ChessGame.app = $.showCustomModal("Chess", "<div id='game-box'></div>", {
            id: "chessWindow",
            width: 400,
            buttons: [{
                id: "Close",
                message: "Close",
                handler: function() {
                    $("#chessWindow").closeModal();
                    ChatGame.disconnectPlayer();
                    ChatGame.reset();
                }
            }]
        });

        $(".blackout").remove(); // make the chat usable with modal open
        $(ChessGame.app).draggable({
            cancel: "#game-box",
        }); // make the modal movable
        $("#game-box").html(""); // blank the game box just in case

        $("head").append("<style id='chess-css'>" + ChessGame.css + "</style>");
        $("#game-box").append(ChessGame.html); // load our assets into the window

        ChessGame.drawChessboard(); // create the game pieces and board
        $(".chess-piece").draggable("option", "grid", [1.416, 1.416]); // fix that annoying bug where you glitch through the chessboard

        $("#chess-loading-icon").css("display", "none");
        $(".modalWrapper").addClass("chess-width-override");

        switch (ChatGame.currentPlayer) {
            case "player1":
                ChessGame.player = "white";
                $("#which-player-am-i").html("You're " + ChessGame.player + "!");
                ChessGame.yourTurn = true; // white goes first
                break;
            case "player2":
                ChessGame.player = "black";
                $("#which-player-am-i").html("You're " + ChessGame.player + "!");
                $(".chess-piece").draggable("disable");
                break;
            default:
                console.error("ERROR: Invalid ChatGame.currentPlayer");
        }

        $("#chess-resign").click(function() {
            ChessGame.resign();
        });
        $("#chess-draw").click(function() {
            ChessGame.draw();
        });

        $("#chess-dialog").dialog({
            autoOpen: false,
            modal: true,
            closeOnEscape: false,
            dialogClass: "no-close",
            buttons: [{
                text: "Agree",
                click: function() {
                    ChatGame.communicate("chx-drawagree");
                    ChessGame.gameOver("draw");
                    $("#chess-dialog").dialog("close");
                }
            }, {
                text: "Decline",
                click: function() {
                    ChatGame.communicate("chx-drawdecline");
                    $("#chess-dialog").dialog("close");
                }
            }]
        });

        ChessGame.updateCells(); // ready to begin
    }
};

ChessGame.loadApp();
//retirer la raison par défaut sur spécial:supprimer
$(function() {
    if(mw.config.get('wgAction') === 'delete') {
        $("#wpReason").val("");
    }
});

// Plus de notification
 
// Forum
 
$('.board.board-73859').before('<div class="heading"><h3>Réglement</h3></div>'); $('.board.board-30673').before('<div class="heading"><h3>One Piece Encyclopédie</h3></div>');
$('.board.board-30674').before('<div class="heading"><h3>Autour de One Piece</h3></div>');
$('.board.board-74734').before('<div class="heading"><h3>Coin des Artistes</h3></div>');
$('.board.board-30684').before('<div class="heading"><h3>Coin Administratif</h3></div>');
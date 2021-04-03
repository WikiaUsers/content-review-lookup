//Standard Edit Summary
window.dev = window.dev || {};
window.dev.editSummaries = {
    select: 'MediaWiki:Custom-StandardEditSummary'
};

//Pokémon Search
$('.pokesearch-inputbox').append('<div style="margin: 5px auto; width: 164px;"><input value=""/><br/><div style="margin: 5px auto; width: 75px;"><button>GO!</button></div></div>');
$(".pokesearch-inputbox button").click(function() { window.location.hash = $(".pokesearch-inputbox input").val() });

//Family Filter
$('.Toggler.All .Toggler-Button').click( function() {
      $('.Toggler .Toggler-Button').removeClass("Toggled");
      $(this).addClass("Toggled");
      $('.evolution-tree.one-stage').removeClass("hide-it");
      $('.evolution-tree.two-stage').removeClass("hide-it");
      $('.evolution-tree.three-stage').removeClass("hide-it");
      $('.evolution-tree.four-stage').removeClass("hide-it");
});
$('.Toggler.OneStage .Toggler-Button').click( function() {
      $('.Toggler .Toggler-Button').removeClass("Toggled");
      $(this).addClass("Toggled");
      $('.evolution-tree.two-stage').addClass("hide-it");
      $('.evolution-tree.three-stage').addClass("hide-it");
      $('.evolution-tree.four-stage').addClass("hide-it");
      $('.evolution-tree.one-stage').removeClass("hide-it");
});
$('.Toggler.TwoStage .Toggler-Button').click( function() {
      $('.Toggler .Toggler-Button').removeClass("Toggled");
      $(this).addClass("Toggled");
      $('.evolution-tree.one-stage').addClass("hide-it");
      $('.evolution-tree.three-stage').addClass("hide-it");
      $('.evolution-tree.four-stage').addClass("hide-it");
      $('.evolution-tree.two-stage').removeClass("hide-it");
});
$('.Toggler.ThreeStage .Toggler-Button').click( function() {
      $('.Toggler .Toggler-Button').removeClass("Toggled");
      $(this).addClass("Toggled");
      $('.evolution-tree.one-stage').addClass("hide-it");
      $('.evolution-tree.two-stage').addClass("hide-it");
      $('.evolution-tree.four-stage').addClass("hide-it");
      $('.evolution-tree.three-stage').removeClass("hide-it");
});
$('.Toggler.Branched .Toggler-Button').click( function() {
      $('.Toggler .Toggler-Button').removeClass("Toggled");
      $(this).addClass("Toggled");
      $('.evolution-tree.one-stage').addClass("hide-it");
      $('.evolution-tree.two-stage').addClass("hide-it");
      $('.evolution-tree.three-stage').addClass("hide-it");
      $('.evolution-tree.four-stage').addClass("hide-it");
      $('.evolution-tree.branched-line').removeClass("hide-it");
});
$('.Toggler.MegaEvo .Toggler-Button').click( function() {
      $('.Toggler .Toggler-Button').removeClass("Toggled");
      $(this).addClass("Toggled");
      $('.evolution-tree').addClass("hide-it");
      $('.evolution-tree.mega-stage').removeClass("hide-it");
});
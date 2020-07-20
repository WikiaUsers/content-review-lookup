//SELEKTOR
$('.pokesearch-inputbox').append('<div style="margin: 5px auto; width: 164px;"><input value=""/><br/><div style="margin: 5px auto; width: 75px;"><button>GO!</button></div></div>');
$(".pokesearch-inputbox button").click(function() { window.location.hash = $(".pokesearch-inputbox input").val() });
//Search
$('.search-inputbox').append('<div style="margin: 5px auto; width: 164px;"><input value=""/><br/><div style="margin: 5px auto; width: 75px;"><button>Find item!</button></div></div>');
$(".search-inputbox button").click(function() { window.location.hash = $(".search-inputbox input").val() });
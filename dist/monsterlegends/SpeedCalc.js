$(".submit").live("click", function() {
    var speed = $(".speed").val();
    var rune1 = $(".rune1").val();
    var rune2 = $(".rune2").val();
    var rune3 = $(".rune3").val();  
    var rune4 = $(".rune4").val();
    var rune5 = $(".rune5").val();
    var rune6 = $(".rune6").val();   
    var rune7 = $(".rune7").val();
    var rune8 = $(".rune8").val();
    var rune9 = $(".rune9").val();
    var speedactual = Math.floor(parseInt(speed) * (1 + parseFloat(rune1) + parseFloat(rune2) + parseFloat(rune3)+ parseFloat(rune4)+ parseFloat(rune5)+ parseFloat(rune6)+ parseFloat(rune7)+ parseFloat(rune8)+ parseFloat(rune9)))
     $(".text").val(speedactual);
});
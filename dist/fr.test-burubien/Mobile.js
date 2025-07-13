/* Tout code JavaScript placé ici sera chargé avec les pages accédées par les utilisateurs du site mobile */
/* Correctif Fuji*/
$(document).ready(function () {
  filterSelection("all")

  function filterSelection(c) {
    var x, i;
    var fclass = "." + c;
    if (c == "all") fclass = "";
    
    $(".filterDiv").removeClass("show");
    
    $(".filterDiv" + fclass).toggleClass("show");
  }

  // Add active class to the current control button (highlight it)
  var btns = $("#myBtnContainer .btn");
  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
      var current = $(".active").removeClass("active");
      this.className += " active";
      filterSelection(this.getAttribute(('data-filter-class')));
    });
  }
});
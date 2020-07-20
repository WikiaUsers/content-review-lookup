/* Размещённый здесь JavaScript код будет загружаться всем пользователям при обращении к каждой странице */
function Collapse(_this) {
  var position = _this.index();
  var tbody = _this.parent().parent();
  
  tbody.children().each(function(index) {
    var object = $( this ).children().eq(position);
    if (index > 0) {
      if (object.css("visibility") == "visible") {
        object.css("visibility", "hidden");
        object.css("border", "none");
      }
      else {
        object.css("visibility", '');
        object.css("border", '');
      }
    }
  });
  
  var isAllHidden = true;
  tbody.children().each(function(index) {
    if (index > 0) {
      $( this ).children().each(function() {
        if ($( this ).css("visibility") != "hidden")
          isAllHidden = false;
      });
    }
  });
  tbody.children().each(function(index) {
    if (index > 0) {
      if (isAllHidden)
        $( this ).css("display", "none");
      else
        $( this ).css("display", '');
    }
  });
}

$( ".collapsable ").find("th").each(function() {
  $( this ).addClass("collapsableHeader");
  $( this ).text(function(i, oldText) {
    return oldText + " ▼";
  });
  
  Collapse($( this ));
  
});

$( ".collapsableHeader" ).click(function() {
  $( this ).text(function(i, oldText) {
    if (oldText[oldText.length - 1] == "▼")
      return oldText.slice(0, -1) + "▲";
    else
      return oldText.slice(0, -1) + "▼";
  });
  
  Collapse($( this ));

});
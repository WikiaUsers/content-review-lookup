/******************\
 Tabelle mit Filter
\******************/
function GetTableParent (Objekt){
  if (Objekt.className.toLowerCase().search("filterable") >=0) return Objekt;
  if (Objekt.id == "WikiaArticle")                             return false;
  return (GetTableParent (Objekt.parentNode));
}

function FilterTableFunction(Filter, TD_Reihe) {
  // Schalter Ein / Aus
  if (Filter.className == 'an') Filter.className = 'aus'; else Filter.className = 'an';
  var FilterTable =  GetTableParent (Filter);
  if (! FilterTable) return false;
  
  var FilterTR = FilterTable.getElementsByTagName('tr');
  var FilterTD;
  for (i=2; i < FilterTR.length; i ++) {
    FilterTD = FilterTR[i].getElementsByTagName('td');
    if (FilterTD[TD_Reihe].innerHTML.search(Filter.innerHTML) >= 0) {
      if(Filter.className == 'an') 
        FilterTR[i].style.display='table-row';
      else
        FilterTR[i].style.display='none';
    }
  }
  return true;
}

// Alle Tabellen, die sich im Artikel befinden
var ArtikelTabelle = document.getElementById("WikiaArticle").getElementsByTagName('table');

for (var i = 0; i < ArtikelTabelle.length; i++){
  // suchen, ob es eine filterbare Tabelle gibt
  if (ArtikelTabelle[i].className.toLowerCase().search("filterable") >=0) {
    var FilterTabelleTR = ArtikelTabelle[i].getElementsByTagName('tr');
    var FilterTabelleTH = FilterTabelleTR[0].getElementsByTagName('th');
    var AuswahlTR = document.createElement("tr");
    for (var n=0; n<FilterTabelleTH.length; n++) {
      var newTDFilter = document.createElement("td");
      var ListeAllerFilter = FilterTabelleTH[n].getAttribute('data-Filter');
      if (ListeAllerFilter){
        ListeAllerFilter = ListeAllerFilter.split(",");
        for (var k=0; k< ListeAllerFilter.length; k++) {
          var Filter_Text = document.createTextNode(ListeAllerFilter[k].trim());
          var TD_Span_Element = document.createElement("span");
          TD_Span_Element.setAttribute('data-FilterSpalte', n);
          TD_Span_Element.className = 'an';
          TD_Span_Element.onclick = function(){ 
                                      FilterTableFunction(this, this.getAttribute('data-FilterSpalte')); 
                                    };          
          TD_Span_Element.appendChild(Filter_Text);
          newTDFilter.appendChild(TD_Span_Element);
          newTDFilter.appendChild(document.createElement("br"));
        }
      }
      AuswahlTR.appendChild(newTDFilter);
    }
    FilterTabelleTR[0].parentNode.insertBefore(AuswahlTR, FilterTabelleTR[0]);
  }
}
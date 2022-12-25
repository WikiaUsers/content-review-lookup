// Improvement of the search page v4
// Auteur : Marc Mongenet & Suisui
// Source licenced GFDL & GPL
 
function SpecialSearchEnhanced() 
{
 
  function SearchForm(engine_name, engine_url, logo_url, search_action_url, 
                      search_field_name, add_search_field, field_array)
  {
 
    var span= document.createElement("span");
    span.style.marginRight = "1em";
 
 
    var form = document.createElement("form");
    form.method = "get";
    form.action = search_action_url;
    form.style.display = "inline";
    span.appendChild(form);
 
    var input = document.createElement("input");
    input.type = "hidden";
    input.name = search_field_name;
    form.appendChild(input);
 
    for( var i in field_array){
      var fld = document.createElement("input");
      fld.type = "hidden";
      fld.name = i;
      fld.value = field_array[i];
      form.appendChild(fld);
    }
 
 
    var submit = document.createElement("input");
    submit.type = "submit";
    submit.value = document.getElementsByName("fulltext")[0].value;
    form.appendChild(submit);
 
    form.onsubmit = function() {
      if(add_search_field == ""){
        input.value = document.getElementById("lsearchbox").value;
      }else{
        input.value = document.getElementById("lsearchbox").value+add_search_field;
      }
    }
 
    var a = document.createElement("a");
    a.href = engine_url;
    span.appendChild(a);
 
    var img = document.createElement("img");
    img.src = logo_url;
    img.alt = engine_name;
    img.style.borderWidth = "0";
    img.style.padding = "5px";
    img.style.width = "135px";
    img.style.height = "35px";
    a.appendChild(img);
 
    return span;
  }
  if (typeof SpecialSearchEnhancedDisabled != 'undefined') return;
  if (wgCanonicalNamespace != "Special" || wgCanonicalSpecialPageName != "Search") return;
 
  if(skin == "monobook" || skin == "cologneblue" || skin == "simple"){var mainNode = document.getElementsByTagName("form");}
  if (!mainNode) return;
  mainNode = mainNode[0];
  mainNode.appendChild(document.createElement("center"));
  mainNode = mainNode.lastChild;
 
  var searchValue = document.getElementById("lsearchbox").value;
 
  var div= document.createElement("div");
  div.style.width = "100%";
//  ul.style.list-style-type = "none";
  mainNode.appendChild(div);
 
  var engine;
  var goodsearcho = new Object();
  goodsearcho["charityid"] = "812661";
  engine = SearchForm("GoodSearch", "http://www.goodsearch.com/", "http://www.goodsearch.com/_gfx/title_smaller.gif",
                      "http://www.goodsearch.com/Search.aspx",
                      "Keywords", "+site:commons.wikimedia.org", goodsearcho);
  div.appendChild(engine);
 
  var mayflowero = new Object();
  mayflowero["t"] = "n";
  engine = SearchForm("MayFlower", "http://tools.wikimedia.de/~tangotango/mayflower/index.php", "http://tools.wikimedia.de/~tangotango/mayflower/mayflower-logo.png",  
                     "http://tools.wikimedia.de/~tangotango/mayflower/search.php",
                     "q", "", mayflowero);
  div.appendChild(engine);
 
  var googleo = new Object();
  googleo["as_sitesearch"] = "commons.wikimedia.org";
  engine = SearchForm("Google", "http://www.google.com/", "http://www.google.com/logos/powered_by_google_135x35.gif", 
                      "http://www.google.com/search",
                      "q", "", googleo);
  div.appendChild(engine);
 
  var yahooo = new Object();
  yahooo["vs"] = "commons.wikimedia.org";
  yahooo["ei"] = "UTF-8";
  engine = SearchForm("Yahoo!", "http://www.yahoo.com/", "http://us.i1.yimg.com/us.yimg.com/i/yahoo.gif",  
                     "http://search.yahoo.com/search",
                     "p", "", yahooo);
  div.appendChild(engine);
 
  var msliveo = new Object();
  msliveo["q1"] = "site:commons.wikimedia.org"
  engine = SearchForm("Live", "http://search.live.com/", "http://ads.msn.com/ads/pronws/ideas/en/us/EN_Logo_Right_Live.gif",  
                      "http://search.live.com/results.aspx",
                      "q", "", msliveo);
  div.appendChild(engine);
 
  var asko = new Object();
  msliveo["q1"] = "site:commons.wikimedia.org"
  engine = SearchForm("ask.com", "http://www.ask.com/", "http://sp.ask.com/sh/i/h/logo_ask.gif",  
                      "http://www.ask.com/web",
                      "q", "+site:commons.wikimedia.org", asko);
  div.appendChild(engine);
 
}
 
addOnloadHook(SpecialSearchEnhanced);
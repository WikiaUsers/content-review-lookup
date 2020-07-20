/* ************************************************************* */
// Wikia Skin Selection Buttons

// Add skin selector buttons
function SkinButtons()
{
  var href = ''+window.location+'' ; 
  var monobook = href ;
  var oasis = href ; 
  var mobile = href ; 
  var phone = href ; 
  var app = href ; 

  if (href.match(/useskin=/) == null) 
  { 
      if (href.match(/\?/))
      {
          monobook = href + '&useskin=monobook' ;
          oasis = href + '&useskin=wikia' ; 
          mobile = href + '&useskin=wikiamobile' ; 
          phone = href + '&useskin=wikiaphone' ; 
          app = href + '&useskin=wikiaapp' ; 
        } else { 
          monobook = href + '?useskin=monobook' ;
          oasis = href + '?useskin=wikia' ; 
          mobile = href + '?useskin=wikiamobile' ; 
          phone = href + '?useskin=wikiaphone' ; 
          app = href + '?useskin=wikiaapp' ; 
      }
    } else { 
      if (href.match(/useskin=monobook/))
      {
          monobook = href ;
          oasis = href.replace("useskin=monobook","useskin=wikia");
          mobile = href.replace("useskin=monobook","useskin=wikiamobile");
          phone = href.replace("useskin=monobook","useskin=wikiaphone");
          app = href.replace("useskin=monobook","useskin=wikiaapp");
        } else if (href.match(/useskin=wikia/)) {
          oasis = href ;
          monobook = href.replace("useskin=wikia","useskin=monobook");
          mobile = href.replace("useskin=wikia","useskin=wikiamobile");
          phone = href.replace("useskin=wikia","useskin=wikiaphone");
          app = href.replace("useskin=wikia","useskin=wikiaapp");
        } else if (href.match(/useskin=oasis/)) {
          oasis = href.replace("useskin=oasis","useskin=wikia");
          monobook = href.replace("useskin=oasis","useskin=monobook");
          mobile = href.replace("useskin=oasis","useskin=wikiamobile");
          phone = href.replace("useskin=oasis","useskin=wikiaphone");
          app = href.replace("useskin=oasis","useskin=wikiaapp");
        } else if (href.match(/useskin=wikiamobile/)) {
          oasis = href.replace("useskin=wikiamobile","useskin=wikia");
          monobook = href.replace("useskin=wikiamobile","useskin=monobook");
          mobile = href ;
          phone = href.replace("useskin=wikiamobile","useskin=wikiaphone");
          app = href.replace("useskin=wikiamobile","useskin=wikiaapp");
        } else if (href.match(/useskin=wikiaphone/)) {
          oasis = href.replace("useskin=wikiaphone","useskin=wikia");
          monobook = href.replace("useskin=wikiaphone","useskin=monobook");
          mobile = href.replace("useskin=wikiaphone","useskin=wikiamobile");
          phone = href ;
          app = href.replace("useskin=wikiaphone","useskin=wikiaapp");
        } else if (href.match(/useskin=wikiaapp/)) {
          oasis = href.replace("useskin=wikiaapp","useskin=wikia");
          monobook = href.replace("useskin=wikiaapp","useskin=monobook");
          mobile = href.replace("useskin=wikiaapp","useskin=wikiamobile");
          phone = href.replace("useskin=wikiaapp","useskin=wikiaphone");
          app = href ;
      }
  }

//  $('#WikiaArticle').prepend('<div style="float:right;"> <a href="'+mobile+'" class="wikia-button">Mobile</a> <a href="'+phone+'" class="wikia-button">Phone</a> <a href="'+app+'" class="wikia-button">App</a> <a href="'+monobook+'" class="wikia-button">Monobook</a> <a href="'+oasis+'" class="wikia-button">Oasis</a> </div><br clear=all/>'); // Oasis

  $('#WikiaHeader').append('<div style="float:right;"> <a href="'+mobile+'" class="wikia-button">Mobile</a> <a href="'+phone+'" class="wikia-button">Phone</a> <a href="'+app+'" class="wikia-button">App</a> <a href="'+monobook+'" class="wikia-button">Monobook</a> <a href="'+oasis+'" class="wikia-button">Oasis</a> </div><br clear=all/>'); // Oasis

//  $('#EditPageToolbar').append('<div style="float:right;"> <a href="'+mobile+'" class="wikia-button">Mobile</a> <a href="'+phone+'" class="wikia-button">Phone</a> <a href="'+app+'" class="wikia-button">App</a> <a href="'+monobook+'" class="wikia-button">Monobook</a> <a href="'+oasis+'" class="wikia-button">Oasis</a> </div><br clear=all/>'); // Oasis

  $('#contentSub').prepend('<div style="float:right;"> <a href="'+mobile+'" class="button">Mobile</a> <a href="'+phone+'" class="button">Phone</a> <a href="'+app+'" class="button">App</a> <a href="'+monobook+'" class="button">Monobook</a> <a href="'+oasis+'" class="button">Oasis</a> </div><br clear=all/>'); // Monobook

}

addOnloadHook(SkinButtons);

/* ************************************************************* */
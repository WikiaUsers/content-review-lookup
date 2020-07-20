/**
 * Outils pour réverter
 *
 * fournit des liens dans les pages de diff pour révoquer facilement une modification et avertir son auteur
 *
 * Auteurs : Emperor Jarjakrine
 * Dernière révision : 27 décembre 2013 — séparation des annulations et révocations
 * 
 */
//<nowiki>
var RevertDiffParams = new Object();
 
RevertDiffParams.Text = new Object();
RevertDiffParams.Text.Annul = "Annuler";
RevertDiffParams.Text.AnnulResume = 'Annulation des modifications de [[Special:Contributions/$2|$2]] (retour à la précédente version de [[Special:Contributions/$1|$1]])';
RevertDiffParams.Text.Message = "Message";
RevertDiffParams.Text.MessageAlert = 'Quel message faut-il laisser ?';
RevertDiffParams.Text.Revert = "Révoquer";
RevertDiffParams.Text.RevertResume = 'Révocation des modifications de [[Special:Contributions/$2|$2]] (retour à la précédente version de [[Special:Contributions/$1|$1]])';
RevertDiffParams.Text.Warn = "Avertir";
 
 
RevertDiffParams.Warn = [ 
  {urlparam:"warn=01", text:"Maladresse",   template:'{{subst:Vandal 10}} ~~~~'},
  {urlparam:"warn=02", text:"Vandalisme",   template:'{{subst:Test 1}} ~~~~'},
  {urlparam:"warn=03", text:"Test2",        template:'{{subst:Test 2}} ~~~~'},
  {urlparam:"warn=04", text:"Test3",        template:'{{subst:Test 3}} ~~~~'},
  {urlparam:"warn=05", text:"Test4",        template:'{{subst:Seul avertissement}} ~~~~'},
  {urlparam:"warn=06", text:"Lien externe", template:'{{subst:W}} ~~~~'},
  {urlparam:"warn=07", text:"Faut sourcer", template:'{{subst:Faut sourcer}} ~~~~'},
  {urlparam:"warn=08", text:"Bienvenue",    template:'{{W|sign=~~~~}}'},
  {urlparam:"warn=09", text:"BienvenueIP",  template:'{{W IP}} ~~~~'},
  {urlparam:"warn=10", text:"MerciIP",      template:'{{W IP méritante|sign=~~~~}}'}
];
 
 
function getURLParameters(x) {
  var questionMark = x.indexOf('?');
  if (questionMark == -1) return {}
  var fieldsArray = x.substr(questionMark + 1).split('&');
  var fields = {}
  for (var i = 0; i < fieldsArray.length; i++) {
    var field = fieldsArray[i];
    var equal = field.indexOf('=');
    if (equal == -1) {
      fields[decodeURIComponent(field)] = '';
    } else {
      fields[decodeURIComponent(field.substr(0, equal))] =
          decodeURIComponent(field.substr(equal + 1));
    }
  }
  return fields;
}
 
_GET = getURLParameters(location.href);
 
function getMessage (chemin, where, user1, user2) {
  var message = prompt (RevertDiffParams.Text.MessageAlert, '');
  if (message) {
    window.location = chemin + '&'+where+'=2&user1='+user1+'&user2='+user2+'&message='+message;
  }
}
 
$(document).ready(function (){
  if (location.href.match(/diff=/)) {
    // Get username of submitter
    var user1TD = $('td.diff-otitle')[0];
    var user2TD = $('td.diff-ntitle')[0];
    if(!user1TD || !user2TD) return;
 
    // Récupération du chemin vers la version à rétablir
    var chemin = encodeURI(user1TD.getElementsByTagName('a')[1].href);
 
    var user1 = $(user1TD).find('a.mw-userlink')[0].innerHTML;
    var user2 = $(user2TD).find('a.mw-userlink')[0].innerHTML;
 
    var Annul = '('
               + '<a href="'+chemin+'&annul=1&user1='+user1+'&user2='+user2+'">'+RevertDiffParams.Text.Annul+'</a>'
               + ' / '
               + '<a href="javascript:getMessage(\''+chemin+'\',\'annul\',\''+user1+'\',\''+user2+'\');">'+RevertDiffParams.Text.Message+'</a>'
               + ')';
 
    var Revert = '('
               + '<a href="'+chemin+'&revert=1&user1='+user1+'&user2='+user2+'">'+RevertDiffParams.Text.Revert+'</a>'
               + ' / '
               + '<a href="javascript:getMessage(\''+chemin+'\',\'revert\',\''+user1+'\',\''+user2+'\');">'+RevertDiffParams.Text.Message+'</a>'
               + ')';
 
    var Warn = '('+RevertDiffParams.Text.Warn+' : ';
    var SiteURL = wgServer + wgScript + '?title=';
    for(var a=0,l=RevertDiffParams.Warn.length;a<l;a++){
        if(a!=0) Warn += ' / ';
        Warn += '<a href="'+SiteURL+'User_talk:'+user2+'&action=edit&section=new'
              + '&'+RevertDiffParams.Warn[a].urlparam+'" '
              + 'title="'+RevertDiffParams.Warn[a].template+'" '
              + '>'+RevertDiffParams.Warn[a].text+'</a>';
    }
    Warn += ')';
    document.getElementById('contentSub').innerHTML = Annul + " " + Revert + " " + Warn;
 
  }else if (location.href.match(/annul=1/)) {
    document.getElementById('wpSummary').value = RevertDiffParams.Text.AnnulResume.split("$1").join(_GET['user1']).split("$2").join(_GET['user2']);
    document.getElementById('editform').submit();
  }else if (location.href.match(/annul=2/)) { 
    document.getElementById('wpSummary').value = 
RevertDiffParams.Text.AnnulResume.split("$1").join(_GET['user1']).split("$2").join(_GET['user2']) + ' : '+_GET['message'];
    document.getElementById('editform').submit();
  }else if (location.href.match(/revert=1/)) {
    document.getElementById('wpSummary').value = RevertDiffParams.Text.RevertResume.split("$1").join(_GET['user1']).split("$2").join(_GET['user2']);
    document.getElementById('editform').submit();
  }else if (location.href.match(/revert=2/)) { 
    document.getElementById('wpSummary').value = 
RevertDiffParams.Text.RevertResume.split("$1").join(_GET['user1']).split("$2").join(_GET['user2']) + ' : '+_GET['message'];
    document.getElementById('editform').submit();
  }else{  
    for(var a=0,l=RevertDiffParams.Warn.length;a<l;a++){
      var Warn = RevertDiffParams.Warn[a];
      if (location.href.match(new RegExp(Warn.urlparam))) {
        document.getElementById('wpTextbox1').value = Warn.template;
        document.getElementById('editform').submit();
      }
    }
  }
});
//</nowiki>
/* Овде је било Јавасцрипт преузме свим корисницима у сваком чизмом странице. */
// НАСТАВИТЕ ДО СТВАРАЊА ДОДАТНИХ ПРАВА КОРИСНИКА ИКОНЕ ЗА ПРОФИЛ СТУБОВА
 
function addMastheadTags() {
  var rights = {};
 
  // Почетак листу рачуна дати додатна права корисника иконе
  rights["Koštunica"]           = ["Administrator"],
  rights["Јастреб"]             = ["Роллбацк"];
 
  // Крај листе рачуна истакнута додатна права корисника иконе
 
  // Почетак скрипта за уклањање старих правима иконе и налепите Нови
 
    if (wgCanonicalSpecialPageName == "Contributions") {
      var user = wgPageName.substring(wgPageName.lastIndexOf("/")+1).replace(/_/g," ");
    } else { var user = wgTitle; }
 
    if (typeof rights[user] != "undefined") {
 
      // уклонити старе права
      $('.UserProfileMasthead .masthead-info span.tag').remove();
 
      for( var i=0, len=rights[user].length; i < len; i++) {
 
        // да додате нову особу
        $('<span class="tag" span style="margin-left: 10px !important">' + rights[user][i] +
          '</span>').appendTo('.masthead-info hgroup');
      }
    }
 
  // Крај скрипта за уклањање старих правима иконе и налепите Нови
 
};
 
$(function() {
  if ($('#UserProfileMasthead')) {
    addMastheadTags();
  }
});
 
// КРАЈ СТВАРАЊА ДОДАТНИХ ПРАВА КОРИСНИКА ИКОНЕ ЗА ПРОФИЛ СТУБОВА
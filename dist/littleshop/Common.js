/* Any JavaScript here will be loaded for all users on every page load. */

//*Wam Rail Score*//
window.railWAM = {
     logPage:'Little Shop Of Horrors Wiki:Log of WAM Scores',
     loadOnPage:'Special:WikiActivity',
     lang:'English'
};
//*End Wam Rail Score*//

//*NoBots Template*//
function allowBots(text, user){
  if (!new RegExp("\\{\\{\\s*(nobots|bots[^}]*)\\s*\\}\\}", "i").test(text)) return true;
  return (new RegExp("\\{\\{\\s*bots\\s*\\|\\s*deny\\s*=\\s*([^}]*,\\s*)*" + user.replace(/([\(\)\*\+\?\.\-\:\!\=\/\^\$])/g, "\\$1") + "\\s*(?=[,\\}])[^}]*\\s*\\}\\}", "i").test(text)) ? false : new RegExp("\\{\\{\\s*((?!nobots)|bots(\\s*\\|\\s*allow\\s*=\\s*((?!none)|([^}]*,\\s*)*" + user.replace(/([\(\)\*\+\?\.\-\:\!\=\/\^\$])/g, "\\$1") + "\\s*(?=[,\\}])[^}]*|all))?|bots\\s*\\|\\s*deny\\s*=\\s*(?!all)[^}]*|bots\\s*\\|\\s*optout=(?!all)[^}]*)\\s*\\}\\}", "i").test(text);
}
//*NoBots*//
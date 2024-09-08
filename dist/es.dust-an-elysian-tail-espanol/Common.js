/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
 
// 3. Custom User Tags, including Inactive
 
importArticle({ type:'script',  article:'w:c:dev:UserTags/code.js' });
 
// Custom User Tags, including Inactive
	window.UserTagsJS = {
		tags: {
			libre: { u: 'Libre', title: 'No ocupado por el momento, deja un mensaje si necesitas algo..' }
		},
		modules: {
			inactive: { // Edits must be to content namespaces, not user/walls/forum/blog
				days: 30,
				namespaces: [0, 1, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
				zeroIsInactive: true
			},
			mwGroups: ['bureaucrat', 'chatmoderator', 'patroller', 'rollback', 'sysop', 'bannedfromchat', 'bot', 'bot-global'],
			autoconfirmed: true,
			inactive: true,
			newuser: true,
			metafilter: {
				sysop: ['bureaucrat'],
				bot: ['bot-global']
			}
		}
	};
	scriptList.push('w:dev:UserTags/code.js');
 
/* Actualización Automática */
var AjaxRCRefreshText = 'Act. automát.';
var AjaxRCRefreshHoverText = 'Refrescar esta página automáticamente';
var ajaxPages = ["Especial:CambiosRecientes","Especial:WikiActivity"];
var ajaxRefresh = 20000;
importScriptPage('AjaxRC/code.js', 'dev');
 
// userRightIcons
importScriptPage('MediaWiki:Common.js/userRightsIcons.js');
// other imports
importScriptPage('Countdown/code.js', 'dev');
// <syntax type="javascript">
 
/* Username */
function UserNameReplace(){
  if (wgUserName){
    var spans = getElementsByClassName(document, "span", "insertusername");
 
    for (var i = 0; i < spans.length; i++){
      spans[i].innerHTML = wgUserName;
    }
  }
}
 
addOnloadHook(UserNameReplace);
addOnloadHook(UserNameReplace);
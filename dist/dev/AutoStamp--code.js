// <source lang="javascript">
/* created by Curiouscrab */
if(wgAction == 'edit') {
	var updatedTS = document.getElementById('wpTextbox1').value.split('\n');
	if(wgPageName.split('.')[wgPageName.split('.').length-1] == 'js' && updatedTS[0].substring(0,2) == '//' && updatedTS[0][5] == ':' && updatedTS[0][8] == ',') {
		updatedTS[0] = '// ' + (new Date().getUTCHours() < 10 ? '0' + new Date().getUTCHours() : new Date().getUTCHours()) + ':' + (new Date().getUTCMinutes() < 10 ? '0' + new Date().getUTCMinutes() : new Date().getUTCMinutes()) + ', ' + wgMonthNames[new Date().getUTCMonth() + 1] + ' ' + new Date().getUTCDate() + ', ' + new Date().getUTCFullYear() + ' (UTC)';
	} else if(wgPageName.split('.')[wgPageName.split('.').length-1] == 'js') {
		updatedTS[0] = '// ' + (new Date().getUTCHours() < 10 ? '0' + new Date().getUTCHours() : new Date().getUTCHours()) + ':' + (new Date().getUTCMinutes() < 10 ? '0' + new Date().getUTCMinutes() : new Date().getUTCMinutes()) + ', ' + wgMonthNames[new Date().getUTCMonth() + 1] + ' ' + new Date().getUTCDate() + ', ' + new Date().getUTCFullYear() + ' (UTC)\n\n' + updatedTS[0];
	} else if(wgPageName.split('.')[wgPageName.split('.').length-1] == 'css' && updatedTS[0].substring(0,2) == '/*' && updatedTS[0][5] == ':' && updatedTS[0][8] == ',') {
		updatedTS[0] = '/* ' + (new Date().getUTCHours() < 10 ? '0' + new Date().getUTCHours() : new Date().getUTCHours()) + ':' + (new Date().getUTCMinutes() < 10 ? '0' + new Date().getUTCMinutes() : new Date().getUTCMinutes()) + ', ' + wgMonthNames[new Date().getUTCMonth() + 1] + ' ' + new Date().getUTCDate() + ', ' + new Date().getUTCFullYear() + ' (UTC) */';
	} else if(wgPageName.split('.')[wgPageName.split('.').length-1] == 'css') {
		updatedTS[0] = '/* ' + (new Date().getUTCHours() < 10 ? '0' + new Date().getUTCHours() : new Date().getUTCHours()) + ':' + (new Date().getUTCMinutes() < 10 ? '0' + new Date().getUTCMinutes() : new Date().getUTCMinutes()) + ', ' + wgMonthNames[new Date().getUTCMonth() + 1] + ' ' + new Date().getUTCDate() + ', ' + new Date().getUTCFullYear() + ' (UTC) */\n\n' + updatedTS[0];
	}
	document.getElementById('wpTextbox1').value = updatedTS.join('\n');
	console.log('Loaded AutoStamp v1.0');
}
// </source>
/* ========================================================================== *\
*                                                                              *
*   MediaWiki:PermissionOTRS.js                                                *
*   Maintainer: [[User:Bryan]]                                                 *
*   Copyright (c) 2007 Bryan Tong Minh.                                        *
*   Licensed under the terms of the MIT license                                *
*                                                                              *
*  ==========================================================================  *
*                                                                              *
*   This scripts allows you to add OTRS permission links in an easy manner.    *
*   It will replace {{OTRS pending}} by the correct permission template.       *
*   If no occurrence of {{OTRS pending}} can be found, it will OVERWRITE       *
*   the permission field of the information template. If the information       *
*   template is not available, the script will fail.                           *
*                                                                              *
*  ==========================================================================  *
*                                                                              *
*   Tested with: Mozilla Firefox 2.0.0.6                                       *
*   Install this script by activating it in Preferences>Gadgets                      *
*                                                                              *
\* ========================================================================== */

function addPermission(ticket)
{
	var req = sajax_init_object();
	req.open('GET', wgScriptPath + '/api.php?action=query&prop=info|revisions&' + 
		'format=json&intoken=edit&rvprop=content|timestamp&titles=' + 
		encodeURIComponent(wgPageName), false);
	req.send(null);
	var info = eval('(' + req.responseText + ')');
	for (var key in info['query']['pages'])
	{
		var page = info['query']['pages'][key];
		var token = page['edittoken'];
		var content = page['revisions'][0]['*'];
		var editTime = page['revisions'][0]['timestamp'].replace(/[^0-9]/g, '');

		var rOTRS = new RegExp('\\{\\{Otrs[_ ]pending[^}]*\\}\\}', 'i');
		if (rOTRS.test(content))
		{
			content = content.replace(rOTRS, '{{PermissionOTRS|ticket=' + ticket + '}}');
		}
		else
		{
			var rPermission = new RegExp('\\n\\|Permission[ \\t]*=.*', 'i');
			if (rPermission.test(content))
			{
				content = content.replace(rPermission, '\n|Permission={{PermissionOTRS|ticket=' +
					ticket + '}}');
			}
			else
			{
				alert('No suitable place found to insert template!');
				return;
			}
		}

                var rNPD = new RegExp('\\{\\{no permission since.+\n', 'i');
                if (rNPD.test(content))
                  content = content.replace(rNPD, '');
		var postdata = '';
		postdata += 'wpTextbox1=' + encodeURIComponent(content);
		postdata += '&wpSummary=' + encodeURIComponent('Adding [[Commons:OTRS|OTRS]] permission using [[MediaWiki:PermissionOTRS.js|PermissionOTRS.js]]');
		postdata += '&wpSave=save';
		postdata += '&wpEditToken=' + encodeURIComponent(token);
		postdata += '&wpEdittime=' + editTime;
		postdata += '&wpStarttime=' + editTime;

		req = sajax_init_object();
		req.open('POST', wgScriptPath + '/index.php?action=submit&title=' + encodeURIComponent(wgPageName), false);
		req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		req.setRequestHeader('Content-Length', postdata.length);
		req.send(postdata);

		document.close();
		document.open();
		document.write(req.responseText);
		return;
	}
}
function OTRS()
{
	var ticket = prompt('Ticket link?');
	if (ticket) addPermission(ticket);
}

if (wgNamespaceNumber == 6) $j(document).ready(function () { 
	 addPortletLink('p-tb', 'javascript:void(OTRS())', 'PermissionOTRS');
});
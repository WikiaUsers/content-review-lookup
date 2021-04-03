if (wgNamespaceNumber == 'all' || && wgPageName) {
	var norm = wgPageName;
	var test = 'COD:';
	var ext = null;
	if (norm == test + '[a-z]') ext = 'Project' + '[a-z]';
	else if (norm == test + '[a-z]') ext = 'Project' + '[a-z]';
	if (ext != null) window.location.href = window.location.href.replace(/\/COD:/i, '/' + text.replace('Project:') + '[a-z]' + ext);
}
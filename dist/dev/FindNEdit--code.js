// <source lang="javascript">
/* created by Curiouscrab */
var searchWords;
var addBefores;
var addAfters;
for(i=0;i<searchWords.length;i++) {
	if(document.getElementById('mw-content-text').innerHTML.search(searchWords[i]) > -1 && wgAction == 'view') {
		var brokenText = document.getElementById('mw-content-text').innerHTML.split(searchWords[i]);
		var excludedItems = ['/','?','"','#','.2F','%2F'];
		for(j=1;j<brokenText.length;j++) {
			if(excludedItems.indexOf(brokenText[j][0]) < 0 && excludedItems.indexOf(brokenText[j][0] + brokenText[j][1] + brokenText[j][2]) < 0) {
				brokenText[j] = (addBefores[i] || '') + searchWords[i] + (addAfters[i] || '') + brokenText[j];
			} else {
				brokenText[j] = searchWords[i] + brokenText[j];
			}
		}
		$('#mw-content-text').html(brokenText.join(''));
	}
}
console.log('Loaded FindNEdit v1.0');
// </source>
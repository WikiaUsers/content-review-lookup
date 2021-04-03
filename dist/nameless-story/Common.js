// JavaScript for placing the image template inside the summary box on [[Special:Upload]].
$(function FairUseRationale() {
	if((wgPageName == 'Special:Upload' || wgPageName == 'Special:MultipleUpload') && document.getElementById('wpDestFile').value === '') {
		document.getElementById('wpUploadDescription').value = '{{Image\n|description=\n|source=\n|purpose=\n|resolution=\n|replaceability=\n|other information=\n}}';
	}
});

// Configuration for [[w:c:dev:AddRailModule]]
window.AddRailModule = [{
    //Discord Rail Module
    page: 'Template:DiscordRailModule',
    prepend: true,
    maxAge: 86400,
}, {
    //Spoiler Rail Module
    page: 'Template:SpoilerRailModule',
    maxAge: 86400,
}];
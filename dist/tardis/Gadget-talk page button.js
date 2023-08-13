/* This JavaScript was put together by [[w:c:c:User:BryghtShadow]] after [[User:Bongolium500]] struglled with it a ton. It has since been modified slightly by Bongolium to make it work with protected pages.
TO DO:
    Add an icon to the button
*/
var editable = mw.config.get("wgIsProbablyEditable");
var namespace = mw.config.get("wgNamespaceNumber");
var talk = document.getElementById('ca-talk');
var edit;
if (namespace % 2 === 0 && namespace !== -1) {
	if (editable === true) {
		if (document.getElementById('ca-formedit') === null) {
			edit = document.getElementById('ca-edit');
		} else {
    		edit = document.getElementById('ca-formedit');
		}
	} else {
		edit = document.getElementById('ca-viewsource');
	}
}
edit.after(talk);
talk.classList.add('wds-button','wds-is-text','page-header__action-button','has-label');
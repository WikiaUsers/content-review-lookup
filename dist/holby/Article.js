// Article Management Module by Eladkse
// With thanks to Memory Alpha

if(document.getElementById('universe') || document.getElementById('stub') || document.getElementById('spoiler') || document.getElementById('disambig') || document.getElementById('construct')) {

function ArticleModule() {
		$('.WikiaRail form#WikiaSearch').after('<section class="ArticleModule module" style="padding-top: 8px !important;"><span id="ArticleModule"></span></section>');
	$('section#WikiaSpotlightsModule').css({"display": 'none'});
	$('.WikiaPagesOnWikiModule').hide();
}
 
addOnloadHook(ArticleModule);

function MoveUniverse() {
if(document.getElementById('universe')) {
		$('#ArticleModule').before('<a title="Article is out of universe"><img src="https://images.wikia.nocookie.net/casualty/images/e/e5/OoU.png"></a>');
}}

addOnloadHook(MoveUniverse);

function MoveStub() {
if(document.getElementById('stub')) {
		$('#ArticleModule').before('<a title="Article is a stub"><img src="https://images.wikia.nocookie.net/casualty/images/9/9d/Spoiler.png"></a>');
}}

addOnloadHook(MoveStub);

function MoveSpoiler() {
if(document.getElementById('spoiler')) {
		$('#ArticleModule').before('<a title="Article contains spoilers"><img src="https://images.wikia.nocookie.net/casualty/images/e/e5/OoU.png"></a>');
}}

addOnloadHook(MoveSpoiler);

function MoveDisambig() {
if(document.getElementById('disambig')) {
		$('#ArticleModule').before('<a title="Disambiguation page"><img src="https://images.wikia.nocookie.net/casualty/images/e/e5/OoU.png"></a>');
}}

addOnloadHook(MoveDisambig);

function MoveConstruction() {
if(document.getElementById('construction')) {
		$('#ArticleModule').before('<a title="Article is under construction"><img src="https://images.wikia.nocookie.net/casualty/images/e/e5/OoU.png"></a>');
}}

addOnloadHook(MoveConstruction);

}
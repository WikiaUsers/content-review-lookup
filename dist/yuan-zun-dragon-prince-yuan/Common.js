/* Any JavaScript here will be loaded for all users on every page load. */
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:ReferencePopups/code.js',
    ]
});
/* 
////////////////////////////////////////////////////////////////////
// THE BELOW CODE ADDS CUSTOM BUTTONS TO THE JAVASCRIPT EDIT TOOLBAR
////////////////////////////////////////////////////////////////////
*/

if ( window.mwCustomEditButtons ) {
  mwCustomEditButtons.push( {
     "imageFile": "https://upload.wikimedia.org/wikipedia/commons/0/05/Button_Anf%C3%BChrung.png",
     "speedTip": "Quote",
     "tagOpen": "{{Quote|",
     "tagClose": "|}}",
     "sampleText": ""} );
     
  mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/2/29/Character_Button.png",
     "speedTip": "Character",
     "tagOpen": "{{Char temp\r|image1 = \r|title1 = \r|chinese = \r|pinyin = \r|aliases = \r\r|vital_status = \r|killed_by = \r|cause_of_death = \r|age = \r|gender = \r|species = \r|hair_color = \r|eye_color = \r|height = \r|weight = \r|body = \r|bloodline = \r\r|spouse(s) = \r|relatives = \r|friend(s) = \r|enemie(s) = \r|allies = \r|pets = \r|disciple(s) = \r|master(s) = \r\r|occupation(s) = \r|affiliation(s)  = \r|sect(s)  = \r\r|universe = \r|realm = \r|planet = \r|contient = \r|empire = \r|country =  \r|region = \r|village = \r\r|cultivation_base = \r|fleshly_body = \r|battle_prowess = \r|soul =\r\r|book = \r|novel = \r|manhua = \r",
     "tagClose": "}}",
     "sampleText": ""} );
     
      mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/3/3a/Comic_Button.png",
     "speedTip": "Chapter",
     "tagOpen": "{{Chapters\r|title1 = \r|link = \r|book = \r|chapter = \r|posted_on = \r|translator = \r|pc = \r|nc  = \r",
     "tagClose": "}}",
     "sampleText": ""} );
     
}
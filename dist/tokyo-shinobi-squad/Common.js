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
     "tagOpen": "{{Quote||",
     "tagClose": "|}}",
     "sampleText": ""} );
     
     mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/2/29/Character_Button.png",
     "speedTip": "Character",
     "tagOpen": "{{Character Infobox\r|image1 = \r|caption1 = \r|title1 = \r|kanji = \r|rōmaji = \r|aliases = \r|vital_status = \r|species = \r|ethnicity = \r|age = \r|birthday = \r|gender = \r|hair_color = \r|eye_color = \r|height = \r|weight = \r|blood_type = \r|spouse(s) = \r|relatives = \r|friend(s) = \r|allies = \r|enemies = \r|birthplace = \r|occupation(s) = \r|affiliation(s) = \r|fighting_style = \r|manga_debut = \r|anime_debut = \r|japanese_va = \r|english_va = \r|cantonese_va = \r|korean_va = \r",
     "tagClose": "}}",
     "sampleText": ""} );
     
mwCustomEditButtons.push( {
     "imageFile": "https://images.wikia.nocookie.net/marveldatabase/images/3/3a/Comic_Button.png",
     "speedTip": "Chapter",
     "tagOpen": "{{Chapter Infobox\r|title1 = \r|image1 = \r|japanese = \r|romaji = \r|cover = \r|volume = \r|pages = \r|date = \r|issue = \r|arc = \r|new_character(s) = \r|anime_episode(s) = \r|previous = \r|next = \r",
     "tagClose": "}}",
     "sampleText": ""} );
     
}
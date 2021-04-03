//------------------------------------//
/* На вики также подключено "Extension:DynamicPageList" MediaWiki */

// ============================================================
// ===Автовыведения имени посетителя===
(function () { 
if ( !wgUserName ) return; 
$("span.insertusername").text(wgUserName); 
})();

// =======================

window.pPreview = {
    noimage: ''
};

// =====================================
//                Imports
// =====================================

// See MediaWiki:ImportJS
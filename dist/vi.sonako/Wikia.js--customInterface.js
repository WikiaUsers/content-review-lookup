// RelatedPagesModule
$(function() {
    var readmore = "#RelatedPagesModuleWrapper > .RelatedPagesModule";
    $("body").on("DOMNodeInserted", readmore, function() {
        importArticles({
            type: "style",
            articles: "MediaWiki:Read_more.css"
        });
    });
}());

/* Chèn cho các trang riêng (Vô hiệu hóa)
if ( mediaWiki.config.get( 'wgCanonicalSpecialPageName' ) === 'WikiActivity') {
   impart('MediaWiki:Sakura.js');
} 

if (mediaWiki.config.get('wgNamespaceNumber') === 0 || mediaWiki.config.get('wgNamespaceNumber') === 4 || mediaWiki.config.get('wgNamespaceNumber') === 6 || mediaWiki.config.get('wgNamespaceNumber') === 14 || mediaWiki.config.get('wgNamespaceNumber') === 112 || mediaWiki.config.get('wgNamespaceNumber') === 114 || mediaWiki.config.get('wgNamespaceNumber') === 500 || mediaWiki.config.get('wgNamespaceNumber') === 1201) {
   impart('MediaWiki:Snow.js');
} 
*/

$(function() {
    /* Bug Animation*/
    if (document.getElementById('bug') !== null) {
        impart('MediaWiki:Bug.js');
    }

    /* Spider Animation*/
    if (document.getElementById('spider') !== null) {
        impart('MediaWiki:Spider.js');
    }

    /* Snow Animation*/
    if (document.getElementById('snow') !== null) {
        impart('MediaWiki:Snow.js');
    }

    /* Snow Animation Light Weight Version*/
    if (document.getElementById('snow2') !== null) {
        impart('MediaWiki:Snow_2.js');
    }

    /* Hoa mai Animtion*/
    if (document.getElementById('hoamai') !== null) {
        impart('MediaWiki:Hoa_mai.js');
    }

    /* Hoa dao Animation*/
    if (document.getElementById('hoadao') !== null) {
        impart('MediaWiki:Hoa_dao.js');
    }

    /* 3D-Leaf Animation*/
    if (document.getElementById('leaf') !== null) {
        impart('MediaWiki:3d-falling-leaves.js');
        impart('MediaWiki:Rotate3Di.js');
        impart('MediaWiki:Falling_Leaves.js');
    }

    /* Sakura Animation*/
    if (document.getElementById('sakura') !== null) {
        impart('MediaWiki:Sakura.js');
    }

    /* Present Animation*/
    if (document.getElementById('present') !== null) {
        impart('MediaWiki:Present.js');
    }

    /* Ornament Animation*/
    if (document.getElementById('ornament') !== null) {
        impart('MediaWiki:Ornament.js');
    }

    /* Particles Animation*/
    if (document.getElementById('fireflies') !== null) {
        $('.WikiaSiteWrapper').append('<div id="particles-js"></div>');
        impart('MediaWiki:Particles.js');
        impart('MediaWiki:Particle_set.js');
    }

    /* Particles Animation*/
    if (document.getElementById('fireflies2') !== null) {
        impart('MediaWiki:Fireflies.js');
    }
    /* Stars Cursor Animation*/
    impart('MediaWiki:Stars_Cursor.js');
});
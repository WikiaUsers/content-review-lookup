/* @module          Featured
 * @author          Americhino
 * @description     JS for featured template. 
 * @version         0.9.0
*/
var featuredText = '\
<div class="featured__text"> \
<div class="featured__text-about"> \
This article is <b>featured</b>. This means that it meets the highest quality standards of the Americhino Wiki, and features exceptional content. Featured articles often represent the community\'s best work.<br /> <a class="featured__text-read-more wds-button wds-is-secondary" href="/wiki/Project:Featured"><span>Read More</span></a>\
</div> \
<div class="featured__text-list"> \
<h2 class="featured__text-header"> \
What makes a featured article? \
</h2> \
<ul> \
<li>Quality content</li> \
<li>Exceptional writing</li> \
<li>Useful information</li> \
</ul> \
</div> \
</div>';
$(fixFeaturedLoadCSS);
$('.featured').hover(expandFeatured);
$('.featured').append(featuredText);
$('.featured__text-read-more span').after($('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" width="12" height="12" class="wds-icon wds-icon-tiny wds-dropdown-chevron"><path d="M6.003 10.002a.997.997 0 0 1-.707-.293L.293 4.706a1 1 0 1 1 1.414-1.414l4.296 4.295 4.293-4.293A1 1 0 1 1 11.71 4.71l-5 5a.997.997 0 0 1-.707.293" fill-rule="evenodd"></path></svg>'));
function fixFeaturedLoadCSS() {
mw.util.addCSS(' \
	.featured:hover { \
	    height: 300px !important; \
	    background-color: #111 !important; \
	    transition: all 0.5s ease; \
    } \
    .featured__title, \
    .featured:hover .featured__title { \
        z-index: 999999999 !important; \
	} \
	.featured:hover .featured__text { \
        z-index: 9999999999 !important; \
	} \
	.featured:not(:hover) .featured__text-list ul \
	.featured:not(:hover) .featured__text-list, \
	.featured:not(:hover) .featured__text-about { \
        display: none !important; \
    }')
}
function expandFeatured() {
	mw.util.addCSS(' \
	.featured:hover { \
	    height: 300px !important; \
	    background-color: #111 !important; \
	    transition: all 0.5s ease; \
    } \
    .featured { \
        margin-top: 0 !important; \
        transition: all 0.5s ease; \
        } \
    .featured .featured__text { \
        display: none !important; \
        transition: all 0.5s ease; \
        width: 100%; \
		z-index: -1000 !important;\
    } \
    .featured:hover .featured__text { \
        display: flex !important; \
        font-family: Rubik, sans-serif; \
        position: absolute; \
        top: 150px; \
        transition: all 0.5s ease; \
    } \
    .featured:hover .featured__text-list { \
        display: block !important; \
		width: 80% !important; \
        transition: all 0.5s ease; \
        padding: 10px; \
    } \
	.featured:hover .featured__text-about { \
	    display: block !important; \
		width: 100% !important; \
		transition: all 0.5s ease; \
		padding: 10px; \
	} \
	.featured .featured__text-list, \
	.featured .featured__text-about { \
		display: none !important;\
	} \
    .featured__text-header { \
        margin-top: 0 !important; \
		border-bottom: 0 !important; \
    } \
	.featured .featured__text-read-more { \
        color: #0078ff !important; \
		border-color: #0078ff !important; \
    } \
	.featured:hover .featured__text-read-more svg { \
	    transform: rotate(270deg) !important; \
		padding-top: 5px !important; \
	}'
    );
}
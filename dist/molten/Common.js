/*
 * Authors: T3CHNOCIDE (http://community.wikia.com/wiki/User:T3CHNOCIDE)
 *          Silicon Soldier (http://community.wikia.com/wiki/User:Silicon_Soldier)
 * Website: Destiny Wiki (http://destiny.wikia.com)
 * License: CC-BY-SA 3.0
 * Version: v2.0 (6 August 2016)
 * Function:
 *      Modifies Special:Upload to include a graphical form which allows users to select
 *      pre-defined options that describe the image and enfore entry of information such as 
 *      image source and licensing. From the collected data, the script autofills the
 *      description box with image information and categories.
 *      Adds image summary template to multiple upload special page.
 *      Forces add image button at Special:Images to redirect to Special:Upload.
 *
 *      To reduced load time across the site, this script has functionality stored on separate
 *      files. A quick check here is used to determine which is to be executed.
 *      They are located at .../Upload.js, .../MultipleUpload.js, and .../Images.js
 *
 * History:
 *      29 January 2014 - 1.0 Finalised
 *      23 October 2015 - Updated to use JS object to hold category data.
 *      15 April 2016   - Minor fix. (Source code located at MediaWiki:ScriptHistory/fileUpload.js)
 *      6 August 2016   - 2.0 Beta Released
 * To Do:
 *      1) Store provided data in cookie to enable recovery in event of accidental page closure.
 *      2) Retain provided data when image upload rejected. EG: False positive duplicate image.
 *      3) Implement caching of generated HTML.
 * Additional Details:
 *      This JavaScript extension requires additional CSS to function as expected.
 *      Below is a list of the CSS classes used.
 *      - uf-header
 *      - uf-section
 *      - uf-hide
 *      - uf-selected
 *      - uf-button
 *      - uf-expander
 *      - uf-more-buttons
 */


function ufCheck() {
    "use strict";
    switch (mw.config.get('wgCanonicalSpecialPageName')) {
        case "Upload":
            if (!mw.config.get('wpForReUpload')) {
                importArticle({
                    type: "script",
                    article: "MediaWiki:UploadForm.js/Upload.js"
                });
            }
            break;
        case "MultipleUpload":
            importArticle({
                type: "script",
                article: "MediaWiki:UploadForm.js/MultipleUpload.js"
            });
            break;
        case "Images":
            importArticle({
                type: "script",
                article: "MediaWiki:UploadForm.js/Images.js"
            });
            break;
    }
}

//Execute ufInject after DOM has loaded.
$(document).ready(ufCheck());
/**
 * @fileOverview NoImageLightbox
 * https://dev.wikia.com/wiki/NoImageLightbox
 * - Kills image lightbox so that clicking an image takes you to the File:
 * - By default videos should still play normally, but you can set
 *       window.NoImageLightbox.novideo = true
 *   to disable the lightbox entirely for both images and videos
 * - Available under Creative Commons Attribution-Share Alike License 3.0
 * @author User:Mathmagician
 */

/*jshint forin:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, jquery:true */
/*global mediaWiki */

(function ($, mw, window) {
    'use strict';

    // [private] variables
    var $images, NoImageLightbox;

    // fix <a class="image"> hrefs to go to the File: page
    // Note: doesn't affect videos, video hrefs are already correct, don't need updated
    function updateImgLinkHrefs() {
        $images.each(function () {
            // Note: a.image, a.lightbox excludes image previews on File: pages themselves,
            // which are of course intended to link to the direct URL of the image
            var $img = $(this),
                urlpart = $img.attr('data-image-name')
                    .replace(/&amp;/g,'&')
                    .replace(/&quot;/g, '"'),
                $a = $img.parent('a.image, a.lightbox')
                    .not('a.link-external, a.link-internal');

            $a.attr('href', mw.util.getUrl('File:' + urlpart));
        });
    }

    // turns off the lightbox for both images and videos
    function killLightboxEntirely() {
        mw.config.set('wgEnableLightboxExt',false);
        $("#WikiaArticle, #RelatedVideosRL, #LatestPhotosModule, #WikiaArticleComments").off('.lightbox');
    }

    // DEFAULT: turn off the lightbox for IMAGES ONLY
    function killLightboxForImagesOnly() {
        // runs before Wikia's LightboxLoader.loadLightbox event
        // and prevents it from executing by stopping propagation on images
        $images
            .off('click.noimagelightbox')
            .on('click.noimagelightbox', function (event) {
                event.stopImmediatePropagation();
            });
    }

    // init
    function initNoImageLightbox() {
        $images = $('img[data-image-key]');
        NoImageLightbox = window.NoImageLightbox || {};

        updateImgLinkHrefs();

        if (NoImageLightbox.novideo) {
            killLightboxEntirely();
        } else {
            killLightboxForImagesOnly();
        }
    }

    // automatically add init to the ajaxCallAgain array for compatibility with AjaxRC
    // e.g. when images show up in the activity feed on Special:WikiActivity
    if ($.isArray(window.ajaxCallAgain)) {
        window.ajaxCallAgain.push(initNoImageLightbox);
    } else {
        window.ajaxCallAgain = [initNoImageLightbox];
    }

    // call init on $(document).ready, when Right Rail loads, and on edit preview
    $(initNoImageLightbox);
    mw.hook('wikipage.content').add(initNoImageLightbox);
    $('#WikiaRail').on('afterLoad.rail', initNoImageLightbox);
}(jQuery, mediaWiki, window));
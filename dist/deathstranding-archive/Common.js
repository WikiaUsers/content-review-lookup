/** JavaScript here will be loaded for the desktop view */
$(document).ready(function () {
    /* r/DeathStranding JSON data fetching, for main page content updates */
    if (mw.config.get('wgIsMainPage')) {
        $.getJSON(
            'https://www.reddit.com/r/DeathStranding.json?jsonp=?',
            function foo(data) {
                $.each(
                    data.data.children.slice(0, 30),
                    function (i, post) {
                        if ($('#reddit-content tr').length === 10) {
                            return;
                        } else if (post.data.stickied) {
                            $('#reddit-content-stickied').append('<div class="reddit-content-renderer-stickied"><a href="' + post.data.url + '">' + post.data.title + '</a></div>');
                        } else if (post.data.thumbnail !== 'self' && !post.data.spoiler && post.data.ups > 20) {
                            $('#reddit-content').append('<div class="reddit-content-renderer"><div class="reddit-content-thumbnail"><a href="' + post.data.url + '">' + '<img src="' + post.data.thumbnail + '"></a></div><div class="reddit-content-info"><a href="' + post.data.url + '"><span class="reddit-content-title">' + post.data.title + '</span></a><div class="reddit-content-stats"><span class="upvotes">' + post.data.ups + ' upvotes</span><span> · <a href="https://www.reddit.com' + post.data.permalink + '">' + post.data.num_comments + ' comments</a></span></div></div></div>');
                        }
                    }
                );
            }
        );
    }

    /* Infobox slideshow */
    if ($('#slideshow')) {
        var $slideshow = $('#slideshow'),
            $slides = $('.ss-slide'),
            $bullets = $('.ss-bullet'),
            slideIndex = 1,
            slideCount = $slides.length;

        var showSlide = function (n) {
            if (n > slideCount) {
                slideIndex = 1;
            } else if (n < 1) {
                slideIndex = slideCount;
            }

            $slides.each(function () {
                $(this).hide();
            });
            $bullets.each(function () {
                $(this).removeClass('ss-bullet-active');
            });

            $slideshow.find($slides[slideIndex - 1]).show();
            $slideshow.find($bullets[slideIndex - 1]).addClass('ss-bullet-active');
        };
        var ssArrowNav = function (n) {
            showSlide(slideIndex += n);
        };
        var currentSlide = function (n) {
            showSlide(slideIndex = n);
        };
        var setBullets = function (n) {
            if (n === 0) {
                return;
            } else {
                $slideshow.find($bullets[n - 1]).click(function () {
                    currentSlide(n);
                });
                setBullets(n - 1);
            }
        };

        $('#ss-arrow-left').click(function () {
            showSlide(slideIndex += -1);
        });
        $('#ss-arrow-right').click(function () {
            showSlide(slideIndex += 1);
        });

        setBullets(slideCount);
        showSlide(slideIndex);
    }

    /* Customized Special:Upload form */
    if (mw.config.get('wgCanonicalSpecialPageName') === 'Upload') {
        var setupUploadForm = function () {
            /* If the user is NOT reuploading a file */
            if (window.location.search.indexOf('wpForReUpload=1') === -1) {
                /* Bind upload button to checkOverall function */
                $('#mw-upload-form').bind('submit', checkOverall);

                /* Hide existing Summary box */
                $('tr.mw-htmlform-field-HTMLTextAreaField').hide();

                /* Remove license preview */
                $('#mw-license-preview').remove();

                /* Add new required row */
                var $tbody = $('#mw-htmlform-description').children('tbody').eq(0);
                $tbody.append('<tr><td class="mw-label" style="width: 125px;">Subject categories:<br /><small>(separate with commas)</small></td><td class="mw-input"><input id="catsBox" size="60"></td></tr>');
            } else {
                $('#mw-upload-form').bind('submit', checkFilename);
            }
        }

        var checkOverall = function () {
            var $wpLicense = $('#wpLicense');
            var $wpDestFile = $('#wpDestFile');

            /* Check for duplicated or capitalized file extensions */
            if ($wpDestFile.val().match(/(JPG|JPEG|PNG|GIF|SVG|jpg.jpg|jpeg.jpeg|png.png|gif.gif|svg.svg)$/)) {
                alert('Please do not use capitalized or duplicated file extensions in the filename.');
                return false;
            }

            /* Check for annoying characters */
            if ($wpDestFile.val().match(/(\(|\)|!|\?|,|\+|\*)/)) {
                alert('Please do not use parentheses, slashes, punctuation marks, or other non-alphanumeric characters in your filename.');
                return false;
            }

            /* Check if license has been changed */
            if ($wpLicense.val() !== '') {
                $('#wpUploadDescription').val(
                    $('#wpUploadDescription').val().replace('| license    = ', '| license    = ' + $wpLicense.val())
                );
            }

            /* Replace filename whitespace and underscores with hyphens
             * Reason: SEO, as Google prefers hyphens to whitespace/underscores in filenames
             */
            $wpDestFile.val($wpDestFile.val().replace(/\s/g, '-').replace(/_/g, '-'));

            /* Replace spaced and unspaced commas with pipes */
            var $catsBox = $('#catsBox');
            var $categories = ($catsBox.val() !== '') ? $catsBox.val().replace(/,\s/g, '|').replace(/,/g, '|') + '|' : '';

            var fileinfo = '{{Fileinfo\r\n';
            fileinfo += '| license    = ' + $wpLicense.val() + '\r\n';
            fileinfo += '| categories = ' + $categories + '\r\n';
            fileinfo += '}}';

            $('#wpUploadDescription').val(fileinfo);

            $wpLicense.prop("selectedIndex", 0);

            return true;
        }

        var checkFilename = function () {
            var $wpDestFile = $('#wpDestFile');
            var $wpLicense = $('#wpLicense');

            /* Check for duplicated or capitalized file extensions */
            if ($wpDestFile.val().match(/(JPG|JPEG|PNG|GIF|SVG|jpg.jpg|jpeg.jpeg|png.png|gif.gif|svg.svg)$/)) {
                alert('Please do not use capitalized or duplicated file extensions in the filename.');
                return false;
            }

            /* Check for annoying characters */
            if ($wpDestFile.val().match(/(\(|\)|!|\?|,|\+|\*)/)) {
                alert('Please do not use parentheses, slashes, punctuation marks, or other non-alphanumeric characters in your filename.');
                return false;
            }

            /* Check if license has been changed */
            if ($wpLicense.val() !== '') {
                $('#wpUploadDescription').val(
                    $('#wpUploadDescription').val().replace('| license    = ', '| license    = ' + $wpLicense.val())
                );

                $wpLicense.prop("selectedIndex", 0);
            }
            return true;
        }
        /* END customized upload form */

        setupUploadForm();
    }
});
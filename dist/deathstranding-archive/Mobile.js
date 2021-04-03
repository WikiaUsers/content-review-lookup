/** JavaScript here will be loaded for the mobile view */

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
});
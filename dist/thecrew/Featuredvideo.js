// Feature Video Responsive slider - Courtesy of WARFRAME Wiki
$( ".mainpage-box-featuredvideos-responsive a.video.video-thumbnail.large" ).addClass( "force-lightbox" );
// $( ".mainpage-box-featuredvideos-responsive span.thumbnail-play-icon-container" ).append( "▷" );

$(".mainpage-box-featuredvideos-responsive .vid-item1").mouseenter(function () {
        $(".mainpage-box-featuredvideos-responsive .vid-item1").css('left', '0');
	});
$(".mainpage-box-featuredvideos-responsive .vid-item2").mouseenter(function () {
        $(".mainpage-box-featuredvideos-responsive .vid-item2").css('left', 'calc((100% - 480px) * 0.33)');
        $(".mainpage-box-featuredvideos-responsive .vid-item1").css('left', 'calc(-480px + (100% - 480px) * 0.33)');
	});
$(".mainpage-box-featuredvideos-responsive .vid-item3").mouseenter(function () {
        $(".mainpage-box-featuredvideos-responsive .vid-item3").css('left', 'calc((100% - 480px) * 0.66)');
        $(".mainpage-box-featuredvideos-responsive .vid-item1").css('left', 'calc(-480px + (100% - 480px) * 0.66 / 2)');
        $(".mainpage-box-featuredvideos-responsive .vid-item2").css('left', 'calc(-480px + (100% - 480px) * 0.66)');
	});
$(".mainpage-box-featuredvideos-responsive").mouseleave(function () {
        $(".mainpage-box-featuredvideos-responsive .vid-item1").css('left', '0');
        $(".mainpage-box-featuredvideos-responsive .vid-item2").css('left', 'calc((100% - 480px) * 0.33)');
        $(".mainpage-box-featuredvideos-responsive .vid-item3").css('left', 'calc((100% - 480px) * 0.66)');
	});
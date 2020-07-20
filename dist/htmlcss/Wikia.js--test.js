/**
 * This is a JavaScript page used for testing.
 * 
 **/

$(document).ready(function initNavigation(){
    var $Navigation =
        $('<section />')
        .addClass('Navigation HTMLCSSNavigation html-css-navigation')
        .attr('id', 'HTMLCSSNavigation')
        .load('/index.php?title=Template:HTMLCSSNavigation&action=render', function(data){
            var $data = $(data) instanceof jQuery ? $(data) : '';
            if ($data.find('a:has(img), img').length){
                $data.find('a:has(img), img').each(function(){
                    var $img = $(this),
                        $img_elem = $('<figure />');
                    $img.replaceWith(
                        $img_elem
                        .addClass('NavigationImage navigation-image')
                        .html([
                            $img,
                            $('<figcaption />')
                                .addClass('nav-image-desc description')
                                .text()
                        ])
                        .hover(
                            function showDesc(){
                                var $desc = $(this).find('figcaption.description');
                                if (
                                    $desc.length
                                    &&
                                    !$desc.hasClass('active')
                                ){
                                    $desc.addClass('active');
                                }
                            },
                            function hideDesc(){
                                var $desc = $(this).find('figcaption.description');
                                if (
                                    $desc.length
                                    &&
                                    $desc.hasClass('active')
                                ){
                                    $desc.removeClass('active');
                                }
                            }
                            )
                        );
                });
            }
        });
});
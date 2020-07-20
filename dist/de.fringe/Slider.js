if(!!$('.slider').length) {
    $('.slider').each(function() {
        slides = [{src:'',txt:''}];
        $(this).empty();
        
        for(var i in slides) {
           var slide = slides[i];
            $(this).append(
                $('<input />').addClass('control').attr({
                    name: 'slide',
                    id: 'slide' + i,
                    type: 'radio'
                }).prop('checked', i === 0),
                $('<label />').attr({
                    for: 'slide' + i,
                    id: 's' + i
                })
            );
        }
    
        for(var i in slides) {
            var slide = slides[i];
            $(this).append(
                $('<a />').addClass('slide').attr('href','').append(
                    $('<img />').attr('src',slide.src)
                )
            );
        }
    });   
}
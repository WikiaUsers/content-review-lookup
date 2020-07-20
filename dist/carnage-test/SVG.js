$(function(){
    var svgContainer = $('.svg-container');
    svgContainer.html('<svg class="svg-wrapper test-svg" id="test-svg"></svg>');
    jQuery.getJSON('/api.php?action=parse&text={{:' + wgPageName + '/SVG}}&format=json', function(data){
        var code = data.parse['*'];
        if (code){
            $('.svg.wrapper').html(code);
        }
    });
});
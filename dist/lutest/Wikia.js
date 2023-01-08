$('#cake').click(function(){
    $('#infoboxhidetest, .infoboxhidetest').animate({opacity: '0'}, 1500, function(){
            $('#infoboxhidetest, .infoboxhidetest').hide().animate({display: 'none'}, function(){
                 $('table#cake2').stop().show().animate({opacity: '1'}, 1500 );
                    });
    });   
});
 
$('#cake2').stop().click(function(){
    $('#cake2').animate({opacity: '0'}, 1500, function(){
           $('#cake2').hide().animate({top: '+=0px'}, function(){
                 $('#infoboxhidetest, .infoboxhidetest').show().animate({opacity: '1', display: 'inline-table'}, 1500 );
                    });
    });   
});
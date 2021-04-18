/*====================================================================================*/
	//Homepage turrets/hulls dropdown lists
	
	if($("#HomepageDropdowns").length){
	  var ddl = $(".drop-down-list");
	  $(document).on('click', '.drop-down-block', function() {
	    for(var i = 0; i < ddl.length; i++)
	    {
	      if(ddl[i] == ($(this).next().find('.drop-down-list'))[0])
	      {
	        $(ddl[i]).parent().prev().toggleClass("rotate180");
	        $(ddl[i]).slideToggle();
	      }
	      else
	      {
	        $(ddl[i]).parent().prev().toggleClass("rotate180", false);
	        $(ddl[i]).hide();
	      }
	    }
	  });
	
	  $(document).click(function(event){ 
	    if(!$(event.target).hasClass('drop-down-list') && !$(event.target).parent().hasClass('drop-down-list') && !$(event.target).parent().parent().hasClass('drop-down-list') && !$(event.target).parent().hasClass('drop-down-block') && !$(event.target).hasClass('drop-down-block') && !$(event.target).hasClass('drop-down-list-wrapper')) 
	    {
	      for(var j = 0; j < ddl.length; j++)
	      {
	        if($(ddl[j]).is(":visible")) 
	        {
	          $(ddl[j]).parent().prev().toggleClass("rotate180", false);
	          $(ddl[j]).slideUp("fast");
	        }
	      }
	    }     
	  });
	}
	
	/*============================================================================================*/
	/*============================================================================================*/
	
	if ($(".mapScreenshotsCarousel").length) {
	  $('.mapScreenshotsCarousel .carouselContainer').remove();
	
	  $.each($(".mapScreenshotsCarousel .open"), function(k,v) {
	    $($(v).children()).detach().insertAfter($(v));
	  });
	}
	
	/*============================================================================================*/
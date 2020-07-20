/* JS de l'accueil */
if ( $('.mainpage').length )
    {
        console.log("Accueil : OK2");
        $('.createboxButton').click(function(){
            newPageName=$('.createboxInput').val();
                if ( !newPageName )
                {
                    event.preventDefault();
                    alert("Vous devez entrer le nom de la nouvelle page ! \nVeuillez s\'il vous plaît vérifier qu\'elle ne\'existe pas au préalable.");
                }
            });
        setInterval(function()
            {
                $(".titre").animate({borderRadius:0},500);
                $(".titre").animate({borderRadius:'1em'},500);
                $(".titre").animate({borderRadius:'2em'},500);
            },3000);
            
        $(".accueil_cache_activator p").click(function()
            {
                $(".accueil_visible").slideUp('slow'); 
                $(".accueil_cache_activator").slideUp('slow'); 
                $(".accueil_cache").slideDown('slow');
                $('html, body').animate({
                        scrollTop: $("#WikiaPageHeader").offset().top
                    }, 2000);
            });
            
        $(".accueil_cache_droite_activator p").click(function()
            {
                $(".accueil_visible_droite").slideUp('slow'); 
                $(".accueil_cache_droite_activator").slideUp('slow'); 
                $(".accueil_cache_droite").slideDown('slow');
                $('html, body').animate({
                        scrollTop: $("#WikiaPageHeader").offset().top
                    }, 2000);
            });
            
        $(".accueil_cache_desactivator p").click(function()
            {
                $(".accueil_cache").slideUp('slow');
                $(".accueil_visible").slideDown('slow'); 
                $(".accueil_cache_activator").slideDown('slow'); 
                $('html, body').animate({
                        scrollTop: $("#WikiaPageHeader").offset().top
                    }, 2000);
            });
            
        $(".accueil_cache_droite_desactivator p").click(function()
            {
                $(".accueil_cache_droite").slideUp('slow');
                $(".accueil_visible_droite").slideDown('slow'); 
                $(".accueil_cache_droite_activator").slideDown('slow'); 
                $('html, body').animate({
                        scrollTop: $("#WikiaPageHeader").offset().top
                    }, 2000);
            });
    }
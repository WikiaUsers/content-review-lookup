//                                    ..,*,. 
//                           .,*///(/////((#%&&&&%(/,.                            
//                        ,*(((((/////////*****//(##&@@%*                         
//                    .*((((////*******////////******/(%&@&/                      
//                  *##(//*****,,,,,,,,,,******/(((/****/(#&@&/                   
//                ,##/****,,,,,,,,,..    .,  ..,*///((/*****/#&@#.                
//              .(%(***,,,,,,,,.        ./*.       .*((#(/****(#&&,               
//             *%#/**,,,,,,,            /(*,          .*(#(****/(%@(              
//           .(#/**,,,,,,,             *#/**,            *##/****/#&&,            
//           *#/**,,,,,,.             .##***,.            ,(#(****/(%&/           
//           (#/**,,,,,.             .(%(****,.            ./%#/***/(%(.          
//          ,#(**,,,,*,  ,////////////##/***************,,,,,(%(****/##,          
//         .(#/**,,***,     *(((//////(#****//////***,,,,.   *%#*****/(*          
//         ,%(********.       ./(((((///****,,,,,,,,,,.      .#%/*****//.        
//         .(#******//,          ,/((%(***,,,,,,,,,.         ./%#******/,        
//          *#/*****/#(.          /%#/,,/(*******,           ,#%(*******.        
//          .#(*****/#%*         *%#*,,,,/((*****,.          /%#/*,,***,         
//           /#/****/(##*       ,#(,,,,,,,*((/****,         .#%(*,,,,*,.          
//           .((/*****(#&(     .#(,,,,.     ./((***,       ,(%#/*,,,,,.           
//             /#/*****/#&&,   //,,.           ./(*,.     /#%#/*,,,,,,.           
//              ,#(*****/(%@&/..                  .**   ,(##(**,,,,,,             
//                /#/*****/(#&@&/                    *//#%(/*,,,,,,.              
//                 ,(#//*****/(%&@@&#/*.      ...,*//#%#(/**,,,,,.                
//                   ./#(//******//((#####(//////(##(//***,,,,,.                    
//                      .*((///////////////((((((///***,,,,,,.                       
//                          ,//(((//////////////***,,,,,,,                           
//                              .,,********,,,,,,,,,,,.                              
//                                      ....

importArticles({
     type: "script",
     articles: [ 
    	"MediaWiki:FastFriendRSRCalculator.js",
    	"MediaWiki:Common.js/FormulaCalculator.js"
     ]
});

/* Ganer's next event style? */
( function () {
    'use strict';
 
    var dynamicImages = document.getElementsByClassName( 'dynamic-images'),
        i, imageSet , j;
 
    for ( i = 0; i < dynamicImages.length; i++ ) {
        imageSet = dynamicImages[i].getElementsByClassName( 'image' );
        for ( j = 0; j < imageSet.length; j++ ) {
            if ( j > 0 ) {
                imageSet[j].style.display = 'none';
            }
            imageSet[j].addEventListener( 'click', function ( event ) {
                event.stopImmediatePropagation();
                event.preventDefault();
                this.style.display = 'none';
                if ( this.nextElementSibling !== null ) {
                    this.nextElementSibling.style.display = 'inline';
                } else {
                    this.parentNode.getElementsByClassName( 'image' )[0].style.display = 'inline';
                }
            });
        }
    }
}() );
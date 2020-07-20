$(function(){
                $('body').clipboard(
                {
                    prepend: "转自<b>冰与火之歌中文维基</b>:<br />",
                    append: "http://zh.asoiaf.wikia.com/index.php?curid="+wgArticleId,
			  disable: false,
                    oncopy: function(content){} 
                
                });
            
            });
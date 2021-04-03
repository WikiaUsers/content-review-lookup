var MyICP = (function($) {

    "use strict";

  

    var ICPversion = '0.1.0';

    var ICP;


    importArticle({

        type: 'script',

        article: 'u:pt.starwars:MediaWiki:ICP.js'

    });


    mw.hook("dev.icp").add(function(icpModule) {

        ICP = icpModule.ICP;

        icpModule.extend(MyWiki);

    

        var mywiki = new MyWiki();

        mywiki.errorHandler(mywiki.init);

        mywiki.init.__errorHandler__();

    });

  

    var MyWiki = function() {

      ICP.call(this);

      

      this.version = ICPversion;

    };


    return {

        ICP: ICP,

        MyWiki: MyWiki

    };

  })(jQuery);
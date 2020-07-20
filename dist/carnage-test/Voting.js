$((function(window, $, mw){
    var config = $.extend({}, window.votingConfig);
    
    function Voting(){
        this.namespace = mw.config.get('wgCanonicalNamespace');
        this.title = this.page = mw.config.get('wgTitle');
        this.isArticle = mw.config.get('wgIsArticle');
        this.allowed = this.merge([], config.allowed);
        this.excludedPages = this.merge([], config.excludedPages);
        this.mustBeArticle = this.def(config.mustBeArticle, false);
        this.styles = $.extend({ color: '#45ff00', width: 30 }, config.styles);
        this.ratingNames = this.merge([], config.ratingNames);
        this.max = 5;
    }
    
    Voting.prototype = {
        constructor: Voting,
        // Voting stars
        $starsDisplay: $('<div>').addClass('voting__stars-wrapper'),
        $starsInner: $('<div>').addClass('voting__stars-inner'),
        $starsList: $('<ul>').addClass('voting__stars-list'),
        // Voting stats
        // Module
        $module: $('<section>').addClass('voting__module rail-module'),
        createStars: function(){
            this.$stars = (new Array(this.max)).fill(null).map(function(x, i){
                var n = i + 1;
                return $('<li>').attr('data-rating', n);
            }, this);
            this.ratings = (new Array(this.max + 1)).fill(null);
            var len = this.ratings.length;
            for (var i = 1; i < len; i++){
                var name = this.ratingNames[i - 1] || '';
                this.ratings[i] = name;
            }
        },
        check: function(){
            var Api = new mw.Api();
            Api.get({
                format: 'json',
                
            }).done($.proxy(function(){}, this));
        }
    };
    
    return (window.Voting = new Voting());
}(this, jQuery, mediaWiki)).init);
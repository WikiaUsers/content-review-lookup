function importOptionsJS(name){
        var script = '';
        if (name.indexOf(':') === -1){
            script = 'MediaWiki:Options.js/' + name + '.js';
        } else {
            script = name;
        }
}
    
function importOptionsCSS(name){
        var style = '';
        if (name.indexOf(':') === -1){
            style = 'MediaWiki:Options.css/' + name + '.css';
        } else {
            style = name;
        }
}
    
function importMainCSS(){
        importArticle({
            type: 'style',
            article: 'MediaWiki:Options.css'
        });
}
    
importMainCSS();

var Options = Options || {};

Options.createUI = {
    'switch': function(options, callback){
        
    },
    'checkbox': function(option, callback){
        
    },
    'inputbox': function(title, callback){
        
    },
    'button': function(title, callback){
        
    }
};
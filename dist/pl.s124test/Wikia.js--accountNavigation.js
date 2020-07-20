// Only for use to private js
// To import code: 
// importArticles({
//   type: 'script',
//   articles: [
//       'u:pl.s124test.wikia.com:MediaWiki:Wikia.js/accountNavigation.js',
//   ]
// });
// To add link:
// addToNavbar([
//    {
//        href: 'link1',
//        text: 'text1',
//        place: '4'
//    },
//    {
//        href: 'link2',
//        text: 'text2',
//        place: '5'
//    },
// ]);




window.addToNavbar = (function(){
    function init(){
        var $menu = document.querySelector('.wds-global-navigation__user-menu .wds-list');
        if ($menu === null) return;
        var $childs = $menu.children;
        linksToLoad.forEach(function(v){
            var $a = document.createElement('a');
            var $li = document.createElement('li');
            $li.appendChild($a);
     
            $a.appendChild(document.createTextNode(v.text || v.href));
            $a.setAttribute('href',v.href);
     
            if(!isNaN(Number(v.place))){
                var $elem = $childs[v.place];
                if($elem) $menu.insertBefore($li,$elem);
            } else if(v.place === 'last'){
                $menu.appendChild($li);
            }
        });
        linksToLoad = [];
    }
    var linksToLoad = [];
    if(document.readyState !== "complete" && document.readyState !== "loaded")
        document.addEventListener("DOMContentLoaded", init);
    return function(linki){
        linksToLoad = linksToLoad.concat(linki);
        if(document.readyState === "complete" || document.readyState === "loaded"){
            init();
        }
    }
})();
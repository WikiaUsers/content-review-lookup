//for [[Википедия:Скрипты]]

appendCSS('div.nojs {display:none} div.js {display:block !important}')

//need jQuery for most scripts
if (skin!='vector' & !window.$j) 
  importScriptURI('http://bits.wikimedia.org/skins-1.5/common/jquery.min.js') 

//load from URL with ?run=name
var par = /[&?]run=([a-z\.\/]+)/i.exec(document.URL)
if (par) runPublicScript(par[1])

//otherwise create buttons
addHandler(window, 'load', function(){
 $j('span.script').each(function(i,sp){
   $j('<input type=button value="'+$j(sp).text()+'">')
   .attr('id', /[a-z\/]+/i.exec(sp.id)[0])
   .click(function(){runPublicScript(this.id)})
   .replaceAll(sp)
 })
})
 
function runPublicScript(name){
  importScriptURI('/w/index.php?title=MediaWiki:Script/'+name+'.js&action=raw&ctype=text/javascript&nocache='+Math.random())
}
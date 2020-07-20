/* Any JavaScript here will be loaded for users using the Modern skin */
document._realGEBI = document.getElementById
document.getElementById = function(id){
 var x = this._realGEBI(id)
 if (x) return x
 //otherwise try to find a reasonable equivalent for monobook-specific element ids
 switch(id) {
   case 'content': return this._realGEBI('mw_content')
   case 'column-content': return this._realGEBI('mw_contentwrapper')
   case 'bodyContent': return this._realGEBI('mw_contentholder')
   case 'column-one': return this._realGEBI('mw_portlets')
   case 'globalWrapper': return this._realGEBI('mw_main')
   default: return null
 }
}
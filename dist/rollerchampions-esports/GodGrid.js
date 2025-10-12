/* global mw, jQuery */
(function() {
if (window.GodGridInit) return; // prevent double init
window.GodGridInit = true;


function normalize(x){ return (x||'').toString().toLowerCase().trim(); }


function applyFilters(root){
var $root = jQuery(root);
var q = normalize($root.find('.sg-search').val());
var filters = {};
$root.find('.sg-filter select').each(function(){
var key = jQuery(this).attr('data-filter');
var val = jQuery(this).val();
if (val) filters[key] = val;
});


var shown = 0;
$root.find('.sg-card').each(function(){
var $c = jQuery(this);
var name = normalize($c.attr('data-name'));
var ok = true;
if (q && name.indexOf(q) === -1) ok = false;
Object.keys(filters).forEach(function(k){
if (!$c.is('[data-'+k+']')) return;
if ($c.attr('data-'+k) !== filters[k]) ok = false;
});
$c.toggleClass('is-hidden', !ok);
if (ok) shown++;
});
$root.find('.sg-count-num').text(shown);
}


function syncStateToHash(root){
var $root = jQuery(root);
var params = new URLSearchParams();
var q = $root.find('.sg-search').val();
if (q) params.set('q', q);
$root.find('.sg-filter select').each(function(){
var key = jQuery(this).attr('data-filter');
var val = jQuery(this).val();
if (val) params.set(key, val);
});
var str = params.toString();
if (str) location.hash = 'godgrid:' + str; else if (location.hash.startsWith('#godgrid:')) location.hash = '';
}


function restoreStateFromHash(root){
if (!location.hash.startsWith('#godgrid:')) return;
var qs = location.hash.replace('#godgrid:', '');
var params = new URLSearchParams(qs);
var $root = jQuery(root);
if (params.get('q')) $root.find('.sg-search').val(params.get('q'));
$root.find('.sg-filter select').each(function(){
var key = jQuery(this).attr('data-filter');
if (params.get(key)) jQuery(this).val(params.get(key));
});
}


function init($ctx){
$ctx = $ctx || jQuery(document);
$ctx.find('.godgrid-root').each(function(){
var root = this;
restoreStateFromHash(root);
applyFilters(root);


jQuery(root).on('input change', '.sg-search, .sg-filter select', function(){
applyFilters(root);
syncStateToHash(root);
});


// Re-apply on hash changes (shareable filters)
jQuery(window).on('hashchange', function(){
var before = location.hash;
if (!before.startsWith('#godgrid:')) return;
restoreStateFromHash(root);
applyFilters(root);
});
});
}


// Run on ready and after AJAX page loads (Fandom/MediaWiki)
mw.hook('wikipage.content').add(function($content){ init($content); });
})();
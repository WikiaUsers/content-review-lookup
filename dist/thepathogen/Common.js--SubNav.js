/* <source lang="javascript"> */
 
/* Start Level 4 navigation javascript -------------------------------------- */
/* See also: MediaWiki:Wiki-navigation -------------------------------------- */
/* -------------------------------------------------------------------------- */
$(function() {
 
    var nav = $('.WikiHeader nav'),
        chevron = '<img height="0" width="0" class="chevron-right" src="data:image/gif;base64,R0lGODlhAQABAIABAAAAAP///yH5BAEAAAEALAAAAAABAAEAQAICTAEAOw%3D%3D" />';
 
        // Crafting
    nav.find('a[href="/wiki/Crafting"] + .subnav-3').html('<li><a href="/wiki/Construction" class="subnav-3a">Construction' + chevron + '</a><ul><li><a href="/wiki/Buildings">Buildings</a></li><li><a href="/wiki/Dragon Buildings">Dragon Buildings</a></li></ul></li><li><a href="/wiki/Schools#Crafting_Schools" class="subnav-3a">Crafting Schools</a></li><li><a href="/wiki/Formulas" class="subnav-3a">Formulas</a></li><li><a href="/wiki/Machines" class="subnav-3a">Machines</a></li><li><a href="/wiki/Resources" class="subnav-3a">Resources</a></li><li><a href="/wiki/Techniques" class="subnav-3a">Techniques</a></li>');
 
});
 
/* </source> */
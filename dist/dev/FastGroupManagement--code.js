/* @author Universal Omega */
function removeGroups(group){
$.when(mw.loader.using(["mediawiki.api"])).then(function () {
var params = {
		action: 'userrights',
		user: $('h1[itemprop="name"]').text(),
		remove: group,
		reason: 'removed' + $('h1[itemprop="name"]').text() + ' from the ' + group + ' group',
		format: 'json'
	},
	api = new mw.Api();

api.postWithToken( 'userrights', params ).done( function ( data ) {
        alert(group + ' successfully removed from ' + $('h1[itemprop="name"]').text())
} );
});
}
function showall(){
$('.user-identity-header__tag').hide();
$.when(mw.loader.using(["mediawiki.api"])).then(function () {
var params = {
		action: 'query',
		list: 'users',
		ususers: $('h1[itemprop="name"]').text(),
		usprop: 'groups',
		format: 'json'
	},
	api = new mw.Api();

api.get( params ).done( function ( data ) {
var groups = data.query.users[0].groups,
    g,
    Usergroups=[];
for ( g in groups ) {
      $('.user-identity-header__attributes').append('<span class="user-identity-header__tag tag-all tag-' + groups[g] + '" onclick="removeGroups(`' + groups[g] + '`); this.remove();">' + groups[g] + '</span>');
    }
   $('.user-identity-header__attributes').append('<span class="user-identity-header__tag tag-all" onclick="revertTags();">Cancel</span>');
} );
});
}
function addGroups(group){
$.when(mw.loader.using(["mediawiki.api"])).then(function () {
var params = {
		action: 'userrights',
		user: $('h1[itemprop="name"]').text(),
		add: group,
		reason: 'added' + $('h1[itemprop="name"]').text() + ' to the ' + group + ' group',
		format: 'json'
	},
	api = new mw.Api();

api.postWithToken( 'userrights', params ).done( function ( data ) {
        alert(group + ' successfully added to ' + $('h1[itemprop="name"]').text())

} );
});
}
function allGroups(){
$('.user-identity-header__tag').hide();
 $('.user-identity-header__attributes').append('<span class="user-identity-header__tag tag-all-groups" onclick="revertTags();">Cancel</span>');

var params = {
    action: "query",
    meta: "siteinfo",
	siprop: 'usergroups',
    format: "json"
},
api = new mw.Api();

api.get( params ).done( function ( data ) {
var groups = data.query.usergroups,
    g,
    Usergroups=[];
for ( g in groups ) {
      $('.user-identity-header__attributes').append('<span class="user-identity-header__tag tag-all-groups tag-' + groups[g].name + '" onclick="addGroups(`' + groups[g].name +'`);">' + groups[g].name + '</span>');
    }
    
} );
}
function revertTags(){
$('.user-identity-header__tag').show();
$('.user-identity-header__tag.tag-all').remove();
$('.user-identity-header__tag.tag-all-groups').remove();
}

$('.user-identity-header__attributes').append('<span class="user-identity-header__tag tag-remove_groups" onclick="showall();">Remove Groups</span>');
$('.user-identity-header__attributes').append('<span class="user-identity-header__tag tag-add_groups" onclick="allGroups();">Add Groups</span>');
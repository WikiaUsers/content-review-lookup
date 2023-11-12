var params = {
	action: "query",
	format: "json",
	meta: "userinfo",
	formatversion: "latest",
	uiprop: "groups"
};
var api = new mw.Api();

var groups;
api.get( params ).then( function ( queryOutput ) {
	groups = queryOutput[groups];
} );

if (/*Array.prototype.includes.call(groups, "bureaucrat")*/ Array.isArray(groups)) {
	location.href='https://faervellrp.fandom.com/ru/wiki/FirewellRP_Вики';
}
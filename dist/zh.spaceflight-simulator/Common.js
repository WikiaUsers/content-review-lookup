/* 这里的任何JavaScript将为所有用户在每次页面加载时加载。 */
/* 外部链接 */
var external = document.getElementsByClassName( 'external' );
for ( var i = 0; i < external.length; i++ ) {
	external[ i ].target = '_self';
}
$( "[href^=https://spaceflight-simulator.fandom.com/zh/]" ).attr( "target", "_self" );
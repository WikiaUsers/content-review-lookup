/* 这里的任何JavaScript将为所有用户在FandomDesktop皮肤加载 */
/*
 * 在每次页面加载时加载的JavaScript参见[[MediaWiki:Common.js]]
 */

/* 链接 */
/** 外部链接 */
$( ".external" ).attr( "target", "_self" );
$( ".mw-parser-output a[href^='https://spaceflight-simulator.fandom.com/zh/']" ).attr( "target", "_self" );

/* 扩展 */
/** 模板数据 */
$( "section.mw-templatedata-doc-wrap code:not( :last-child )" ).after( " " );
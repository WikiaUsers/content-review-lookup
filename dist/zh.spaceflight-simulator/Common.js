/* 这里的任何JavaScript将为所有用户在每次页面加载时加载 */
/* 外部链接 */
$( ".external" ).attr( "target", "_self" );
$( ".mw-parser-output a[href^='https://spaceflight-simulator.fandom.com/zh/']" ).attr( "target", "_self" );

/* 模板数据 */
$( "section.mw-templatedata-doc-wrap code:not( :last-child )" ).after( " " );
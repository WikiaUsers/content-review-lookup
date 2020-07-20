//<syntaxhighlight lang="javascript">
$('#PowerShareMenu').ready(function(){
$('#PowerShareMenu').append(
' <span style="vertical-align:top; background-color:#000000; padding:0.2em; border-color:#DDDDDD; border-width:0.2em; border-style:solid; display:inline-block;"> <script src="https://platform.linkedin.com/in.js" type="text/javascript">lang: ' + mw.config.get("wgUserLanguage") + '_' + mw.config.get("wgUserLanguage").toUpperCase() + '</script><script type="IN/Share" data-counter="top"></script></span> '
);
});
//</syntaxhighlight>
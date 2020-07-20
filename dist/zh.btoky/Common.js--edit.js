//<source lang="javascript">
 
/*
 
== 編輯工具欄 ==
*/
 
/**
 * tip for custom edittools
 * 
 * Maintainers: fdcn@zh.wikipedia
 */
$( function(){
	//在提交新段落時，讓主題欄在特定情況下失效
	if(document.getElementById('no-new-title') && document.editform.wpSection.value=="new") {
		if(summaryinput=document.getElementById("wpSummary")) {
                        summaryinput.disabled=true;
                        summaryinput.value='';
                }
	}
});
 
( function( $, mw ) { $( function() {
    if ( $( '#editform input[name=wpSection]' ).val() === 'new' ) {
        if ( $( '#no-new-title' ).length ) {
            $( '#wpSummary' ).attr( 'disabled', true );
        }
        return;
    }
    $( '#wpSummaryLabel .mw-summary-preset' ).on( 'click', '.mw-summary-preset-item a', function( e ) {
        e.preventDefault();
        var $this = $( this ), summary = $( '#wpSummary' ).val();
        var $item = $this.parent( '.mw-summary-preset-item' );
        summary = summary.replace( /\s+$/g, '' );
        if ( summary != '' ) {
            summary += ' ';
        }
        summary += $item.attr( 'title' ) || $this.text();
        $this.replaceWith( $this.contents() );
        $( '#wpSummary' ).val( summary );
    } );
} ); } )( jQuery, mediaWiki );
 
/*
 
== 强制预览 ==
[[mw:Manual:Force preview]]
*/
 
// -------------------------------------------------------------------------------
//  Force Preview  JavaScript code - Start
//
//  To allow any group to bypass being forced to preview, 
//  enter the group name in the permittedGroups array.
//  E.g.
//    var permittedGroups = [];                       // force everyone
//    var permittedGroups = [ "user"];                // permit logged-in users 
//    var permittedGroups = [ "sysop", "bureaucrat"]; // permit sysop, bureaucrat 
// -------------------------------------------------------------------------------
var permittedGroups = [ 'confirmed', 'autoconfirmed' ];
 
Array.prototype.intersects = function() {
	// --------------------------------------------------------
	//  Returns true if any element in the argument array
	//  is the same as an element in this array
	// --------------------------------------------------------
	if ( !arguments.length ) return false;
 
	var array2 = arguments[0];
 
	var len1 = this.length;
	var len2 = array2.length;
	if ( len2 == 0 ) return false;
 
	for ( var i = 0; i < len1; i++ ) {
		for ( var j = 0; j < len2; j++ ) {
			if ( this[i] === array2[j] ) return true;
		}
	}
	return false;
};
 
function forcePreview() {
	if ( mw.config.get( "wgAction" ) != "edit" ) return;
	if ( mw.config.get( "wgUserGroups" ).intersects( permittedGroups ) ) return;
	// Doesn't work correctly with live preview
	if ( mw.user.options.get( "uselivepreview" ) == "1" ) return;
	var saveButton = document.getElementById( "wpSave" );
	if ( !saveButton ) return;
	saveButton.disabled = true;
	saveButton.value = saveButton.value + wgULS( '（请先预览）', '（請先預覽）' );
	saveButton.style.fontWeight = "normal";
	document.getElementById("wpPreview").style.fontWeight = "bold";
}
 
jQuery(document).ready( forcePreview );
// -----------------------------------------------------
//  Force Preview  JavaScript code - End
// -----------------------------------------------------
 
/*
 
== 取消修訂編輯摘要修正 ==
*/
/**
  fix edit summary prompt for undo
  this code fixes the fact that the undo function combined with the "no edit summary prompter" causes problems if leaving the edit summary unchanged
  this was added by [[:en:User:Deskana]], code by [[:en:User:Tra]]
*/
$ (function () {
	var autoSummary=document.getElementsByName('wpAutoSummary')[0];
	if (document.location.search.indexOf("undo=") != -1 && autoSummary)
	{ autoSummary.value=''; }
});
 
/*
 
== WP:DYKC編輯時取消編輯摘要空段落標示 ==
*/
$( function(){
	var $wpSummary=$("#editform #wpSummary"), $wpTextbox1=$("#editform #wpTextbox1");
	if($wpSummary.length==0 || $wpTextbox1.length==0) return;
	var wpSummary=$wpSummary.get(0), wpTextbox1=$wpTextbox1.get(0);
	var keyReg= /(?:\n|.)*\|\s*article\s*= *([\S ]*)(?:\n|.)*/m ;
	if(wpSummary.value.indexOf("  ")>=0) wpSummary.value="";
	if(mw.config.get("wgPageName")!="Wikipedia:新条目推荐/候选") return;
	if(wpSummary.value=="/"+"*  *"+"/ " && wpTextbox1.value.match(keyReg) ){}else return;
	var temp=wpTextbox1.value.replace(keyReg, '$1');
	if(!temp) return;
	wpSummary.value=wpSummary.defaultValue="\/"+"* "+temp+" *"+"\/ ";
});
 
 
/* Check for any client-side simplified/traditional Chinese conversion */
var checkAntiConv = function() {
    var $ac = $('#wpAntiConv');
    if ($ac.length && $ac.val() != '\u6c49\u6f22') {
        var text = $('#wpTextbox1').val();
        var section = $('input[name=wpSection]').val();
        var basetimestamp = $('input[name=wpEdittime]').val();
        var starttimestamp = $('input[name=wpStarttime]').val();
        $('#editform :input').attr({disabled:true,readOnly:true});
        mw.loader.using(['mediawiki.notify','mediawiki.notification'],function(){
            mw.notify(wgULS(
                '系统检测到您使用了客户端繁简转换软件，且此软件对文本框中的内容进行了转换。请关闭此软件后重新打开编辑界面，再进行编辑。',
                '系統檢測到您使用了客戶端繁簡轉換軟件，且此軟件對文本框中的內容進行了轉換。請關閉此軟件後重新打開編輯界面，再進行編輯。'
            ),{autoHide:false});
        });
    } else {
        setTimeout(checkAntiConv, 1000);
    }
};
setTimeout(checkAntiConv, 1000);
//</source>
/* Any JavaScript here will be loaded for all users on every page load. */

/** Collapsible tables *********************************************************
  *
  *  Description: Allows tables to be collapsed, showing only the header. See
  *               [[wikipedia:Wikipedia:NavFrame]].
  *  Maintainer on Wikipedia: [[wikipedia:User:R. Koot]]
  */
 
 var autoCollapse = 2;
 var collapseCaption = "hide";
 var expandCaption = "show";
 
 function hasClass( element, className ) {
  var Classes = element.className.split( " " );
  for ( var i = 0; i < Classes.length; i++ ) {
    if ( Classes[i] == className ) {
      return ( true );
    }
  }
  return ( false );
 }
 
 function collapseTable( tableIndex )
 {
     var Button = document.getElementById( "collapseButton" + tableIndex );
     var Table = document.getElementById( "collapsibleTable" + tableIndex );
 
     if ( !Table || !Button ) {
         return false;
     }
 
     var Rows = Table.getElementsByTagName( "tr" ); 
 
     if ( Button.firstChild.data == collapseCaption ) {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = "none";
         }
         Button.firstChild.data = expandCaption;
     } else {
         for ( var i = 1; i < Rows.length; i++ ) {
             Rows[i].style.display = Rows[0].style.display;
         }
         Button.firstChild.data = collapseCaption;
     }
 }
 
 function createCollapseButtons()
 {
     var tableIndex = 0;
     var NavigationBoxes = new Object();
     var Tables = document.getElementsByTagName( "table" );
 
     for ( var i = 0; i < Tables.length; i++ ) {
         if ( hasClass( Tables[i], "collapsible" ) ) {
             NavigationBoxes[ tableIndex ] = Tables[i];
             Tables[i].setAttribute( "id", "collapsibleTable" + tableIndex );
 
             var Button     = document.createElement( "span" );
             var ButtonLink = document.createElement( "a" );
             var ButtonText = document.createTextNode( collapseCaption );
 
             Button.style.styleFloat = "right";
             Button.style.cssFloat = "right";
             Button.style.fontWeight = "normal";
             Button.style.textAlign = "right";
             Button.style.width = "6em";
 
             ButtonLink.setAttribute( "id", "collapseButton" + tableIndex );
             ButtonLink.setAttribute( "href", "javascript:collapseTable(" + tableIndex + ");" );
             ButtonLink.appendChild( ButtonText );
 
             Button.appendChild( document.createTextNode( "[" ) );
             Button.appendChild( ButtonLink );
             Button.appendChild( document.createTextNode( "]" ) );
 
             var Header = Tables[i].getElementsByTagName( "tr" )[0].getElementsByTagName( "th" )[0];
             /* only add button and increment count if there is a header row to work with */
             if (Header) {
                 Header.insertBefore( Button, Header.childNodes[0] );
                 tableIndex++;
             }
         }
     }
 
     for ( var i = 0;  i < tableIndex; i++ ) {
         if ( hasClass( NavigationBoxes[i], "collapsed" ) || ( tableIndex >= autoCollapse && hasClass( NavigationBoxes[i], "autocollapse" ) ) ) {
             collapseTable( i );
         }
     }
 }
 
 addOnloadHook( createCollapseButtons );


/** Hiding things with JS ******
  *
  * This should only be used when necessary. You can also use CSS hiding, but must also be used when necessary.
*/

 function hideObjects() {
     var arrO = document.getElementById("article").getElementsByTagName("*");

     for (var i = 0; i < arrO.length; i++ ) {
         if( hasClass( arrO[i], "jshidden" ) ) {
             arrO[i].style.display = "none";
         }
     }
 }

 addOnloadHook( hideObjects );

/** tabber.js by Patrick Fitzgerald
  * http://www.barelyfitz.com/projects/tabber/
  * License: http://www.opensource.org/licenses/mit-license.php
  * Copyright (c) 2006 Patrick Fitzgerald
  */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('4 j(a){q b;2.7=I;2.Y="o";2.J="1l";2.Z="1m";2.10="1n";2.11="1o";2.K="1p";2.12="1q";2.L=[\'1r\',\'1s\',\'1t\',\'1u\',\'1v\'];2.13=l;2.14=1w;2.15=l;2.M=\'<16>1x<17>\';u(b 1y a){2[b]=a[b]}2.N=m y(\'\\\\b\'+2.Y+\'\\\\b\',\'d\');2.1z=m y(\'\\\\b\'+2.J+\'\\\\b\',\'d\');2.18=m y(\'\\\\b\'+2.Z+\'\\\\b\',\'d\');2.19=m y(\'\\\\b\'+2.10+\'\\\\b\',\'d\');2.O=m y(\'\\\\b\'+2.K+\'\\\\b\',\'d\');2.5=m 1A();3(2.7){2.1a(2.7);2.7=I}}j.r.1a=4(e){q a,i,z,t,P=0,A,B,k,f,D;3(!v.Q){8 l}3(e.C){2.C=e.C}2.5.p=0;a=e.1B;u(i=0;i<a.p;i++){3(a[i].6&&a[i].6.E(2.18)){t=m 1C();t.7=a[i];2.5[2.5.p]=t;3(a[i].6.E(2.19)){P=2.5.p-1}}}A=v.R("1D");A.6=2.11;u(i=0;i<2.5.p;i++){t=2.5[i];t.h=t.7.S;3(2.14){t.7.S=\'\'}3(!t.h){u(z=0;z<2.L.p;z++){D=t.7.Q(2.L[z])[0];3(D){t.h=D.1E;3(2.13){t.h.n(/<1F>/d," ");t.h=t.h.n(/<[^>]+>/g,"")}1G}}}3(!t.h){t.h=i+1}B=v.R("F");t.F=B;k=v.R("a");k.T(v.1H(t.h));k.1I="1J:1K(I);";k.S=t.h;k.1L=2.1b;k.o=2;k.w=i;3(2.15&&2.M){f=2.M;f=f.n(/<16>/d,2.C);f=f.n(/<1M>/d,i);f=f.n(/<17>/d,i+1);f=f.n(/<1N>/d,t.h.n(/[^a-1O-1P-9\\-]/d,\'\'));k.C=f}B.T(k);A.T(B)}e.1Q(A,e.1R);e.6=e.6.n(2.N,2.J);2.U(P);3(G 2.1c==\'4\'){2.1c({o:2})}8 2};j.r.1b=4(b){q c,a,x,w,H;a=2;3(!a.o){8 l}x=a.o;w=a.w;a.1S();3(G x.1d==\'4\'){H={\'o\':x,\'1e\':w,\'V\':b};3(!b){H.V=1T.V}c=x.1d(H);3(c===l){8 l}}x.U(w);8 l};j.r.1f=4(){q i;u(i=0;i<2.5.p;i++){2.1g(i)}};j.r.1g=4(a){q b;3(!2.5[a]){8 l}b=2.5[a].7;3(!b.6.E(2.O)){b.6+=\' \'+2.K}2.1h(a);8 2};j.r.U=4(a){q b;3(!2.5[a]){8 l}2.1f();b=2.5[a].7;b.6=b.6.n(2.O,\'\');2.1i(a);3(G 2.1j==\'4\'){2.1j({\'o\':2,\'1e\':a})}8 2};j.r.1i=4(a){2.5[a].F.6=2.12;8 2};j.r.1h=4(a){2.5[a].F.6=\'\';8 2};4 1k(a){q b,s,i;3(!a){a={}}b=m j(a);s=v.Q("7");u(i=0;i<s.p;i++){3(s[i].6&&s[i].6.E(b.N)){a.7=s[i];s[i].o=m j(a)}}8 2}4 W(a){3(!a){a={}}1U(4(){1k(a)})}3(G X==\'1V\'){W()}1W{3(!X[\'1X\']){W(X)}}',62,122,'||this|if|function|tabs|className|div|return|||||gi||aId||headingText||tabberObj|DOM_a|false|new|replace|tabber|length|var|prototype|divs||for|document|tabberIndex|self|RegExp|i2|DOM_ul|DOM_li|id|headingElement|match|li|typeof|onClickArgs|null|classMainLive|classTabHide|titleElements|linkIdFormat|REclassMain|REclassTabHide|defaultTab|getElementsByTagName|createElement|title|appendChild|tabShow|event|tabberAutomaticOnLoad|tabberOptions|classMain|classTab|classTabDefault|classNav|classNavActive|titleElementsStripHTML|removeTitle|addLinkId|tabberid|tabnumberone|REclassTab|REclassTabDefault|init|navClick|onLoad|onClick|index|tabHideAll|tabHide|navClearActive|navSetActive|onTabDisplay|tabberAutomatic|tabberlive|tabbertab|tabbertabdefault|tabbernav|tabbertabhide|tabberactive|h2|h3|h4|h5|h6|true|nav|in|REclassMainLive|Array|childNodes|Object|ul|innerHTML|br|break|createTextNode|href|javascript|void|onclick|tabnumberzero|tabtitle|zA|Z0|insertBefore|firstChild|blur|window|addOnloadHook|undefined|else|manualStartup'.split('|'),0,{}))
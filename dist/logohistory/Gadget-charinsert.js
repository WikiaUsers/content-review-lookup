// copied from [[mw:User:Alex Smotrov/edittools.js]], modified for use on the English Wikipedia.
// enableForAllFields() feature from [[commons:MediaWiki:Edittools.js]]
// combined and modified by [[User:Ilmari Karonen]]

// Configuration (to be set from [[Special:MyPage/common.js]]):
//   window.charinsertCustom – Object. Merged into the default charinsert list. For example, setting
//       this to { Symbols: '‽' } will add the interrobang to the end of the Symbols section.
//   window.editToolsRecall – Boolean. Set true to create a recall switch.
//   window.charinsertDontMove – Boolean. Set true to leave the box in its default position, rather
//       than moving it above the edit summary.
//   window.updateEditTools() – Function. Call after updating window.charinsertCustom to regenerate the
//       EditTools window.


window.updateEditTools = function () {
};

jQuery( document ).ready( function ( $ ) {
    var EditTools = {
        // Entries prefixed with ␥ (U+2425 SYMBOL FOR DELETE FORM TWO) will not appear in the article namespace (namespace 0).
        // Please make any changes to [[MediaWiki:Edittools]] as well, however, instead of using the ␥ symbol, use {{#ifeq:{{NAMESPACE}}|{{ns:0}}| | }}.
        charinsert: {
            'Insert': ' – — ° ″ ′ ≈ ≠ ≤ ≥ ± − × ÷ ← → · §  ␥Sign_your_posts_on_talk_pages: ␥~~\~~  Cite_your_sources: <ref>+</ref>',
            'Wiki markup': 'Insert:  – — ° ″ ′ ≈ ≠ ≤ ≥ ± − × ÷ ← → · § ␥~~\~~ <ref>+</ref>  Wiki_markup:  {\{+}}  {\{\{+}}}  |  [+]  [\[+]]  [\[Category:+]]  #REDIRECT.[\[+]]  &nb'+'sp;  <s>+</s>  <sup>+</sup>  <sub>+</sub>  <code>+</code>  <pre>+</pre>  <blockquote>+</blockquote>  <ref.name="+"_/>  {\{#tag:ref|+|group="nb"|name=""}}  {\{Reflist}}  <references./>  <includeonly>+</includeonly>  <noinclude>+</noinclude>  {\{DEFAULTSORT:+}}  <nowiki>+</nowiki>  <!--.+_-->  <span.class="plainlinks">+</span>',
            'Symbols': '~ | ¡¿†‡↔↑↓•¶#∞  ‘+’ “+” ‹+› «+» ⟨+⟩  ¤₳฿₵¢₡₢$₫₯€₠₣ƒ₴₭₤ℳ₥₦№₧₰£៛₨₪৳₮₩¥  ♠♣♥♦  ♭♯♮  ©®™ ◌ {\{Unicode|+}}',
            'Latin': 'A a Á á À à Â â Ä ä Ǎ ǎ Ă ă Ā ā Ã ã Å å Ą ą Æ æ Ǣ ǣ  B b  C c Ć ć Ċ ċ Ĉ ĉ Č č Ç ç  D d Ď ď Đ đ Ḍ ḍ Ð ð  E e É é È è Ė ė Ê ê Ë ë Ě ě Ĕ ĕ Ē ē Ẽ ẽ Ę ę Ẹ ẹ Ɛ ɛ Ə ə  F f  G g Ġ ġ Ĝ ĝ Ğ ğ Ģ ģ  H h Ĥ ĥ Ħ ħ Ḥ ḥ  I i İ ı Í í Ì ì Î î Ï ï Ǐ ǐ Ĭ ĭ Ī ī Ĩ ĩ Į į Ị ị  J j Ĵ ĵ  K k Ķ ķ  L l Ĺ ĺ Ŀ ŀ Ľ ľ Ļ ļ Ł ł Ḷ ḷ Ḹ ḹ  M m Ṃ ṃ  N n Ń ń Ň ň Ñ ñ Ņ ņ Ṇ ṇ Ŋ ŋ  O o Ó ó Ò ò Ô ô Ö ö Ǒ ǒ Ŏ ŏ Ō ō Õ õ Ǫ ǫ Ọ ọ Ő ő Ø ø Œ œ  Ɔ ɔ  P p  Q q  R r Ŕ ŕ Ř ř Ŗ ŗ Ṛ ṛ Ṝ ṝ  S s Ś ś Ŝ ŝ Š š Ş ş Ș ș Ṣ ṣ ß  T t Ť ť Ţ ţ Ț ț Ṭ ṭ Þ þ  U u Ú ú Ù ù Û û Ü ü Ǔ ǔ Ŭ ŭ Ū ū Ũ ũ Ů ů Ų ų Ụ ụ Ű ű Ǘ ǘ Ǜ ǜ Ǚ ǚ Ǖ ǖ  V v  W w Ŵ ŵ  X x  Y y Ý ý Ŷ ŷ Ÿ ÿ Ỹ ỹ Ȳ ȳ  Z z Ź ź Ż ż Ž ž  ß Ð ð Þ þ Ŋ ŋ Ə ə  {\{Unicode|+}}',
            'Greek': 'ΆάΈέΉήΊίΌόΎύΏώ  ΑαΒβΓγΔδ  ΕεΖζΗηΘθ  ΙιΚκΛλΜμ  ΝνΞξΟοΠπ  ΡρΣσςΤτΥυ  ΦφΧχΨψΩω  ᾼᾳᾴᾺὰᾲᾶᾷἈἀᾈᾀἉἁᾉᾁἌἄᾌᾄἊἂᾊᾂἎἆᾎᾆἍἅᾍᾅἋἃᾋᾃἏἇᾏᾇ  ῈὲἘἐἙἑἜἔἚἒἝἕἛἓ  ῌῃῄῊὴῂῆῇἨἠᾘᾐἩἡᾙᾑἬἤᾜᾔἪἢᾚᾒἮἦᾞᾖἭἥᾝᾕἫἣᾛᾓἯἧᾟᾗ  ῚὶῖἸἰἹἱἼἴἺἲἾἶἽἵἻἳἿἷ  ῸὸὈὀὉὁὌὄὊὂὍὅὋὃ  ῤῬῥ  ῪὺῦὐὙὑὔὒὖὝὕὛὓὟὗ  ῼῳῴῺὼῲῶῷὨὠᾨᾠὩὡᾩᾡὬὤᾬᾤὪὢᾪᾢὮὦᾮᾦὭὥᾭᾥὫὣᾫᾣὯὧᾯᾧ   {\{Polytonic|+}}',
            'Cyrillic': 'АаБбВвГг  ҐґЃѓДдЂђ  ЕеЁёЄєЖж  ЗзЅѕИиІі  ЇїЙйЈјКк  ЌќЛлЉљМм  НнЊњОоПп  РрСсТтЋћ  УуЎўФфХх  ЦцЧчЏџШш  ЩщЪъЫыЬь  ЭэЮюЯя ӘәӨөҒғҖҗ ҚқҜҝҢңҮү ҰұҲҳҸҹҺһ  ҔҕӢӣӮӯҘҙ  ҠҡҤҥҪҫӐӑ  ӒӓӔӕӖӗӰӱ  ӲӳӸӹӀ  ҞҟҦҧҨҩҬҭ  ҴҵҶҷҼҽҾҿ  ӁӂӃӄӇӈӋӌ  ӚӛӜӝӞӟӠӡ  ӤӥӦӧӪӫӴӵ  ́',
            'Hebrew': 'אבגדהוזחטיךכלםמןנסעףפץצקרשת  ׳ ״  װױײ',
            'Arabic': '  Transcription: ʾ ṯ ḥ ḫ ẖ ḏ š ṣ ḍ ṭ ẓ ʿ ġ ẗ ا ﺁ ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه ة و ي ى ء أ إ ؤ ئ',
            'IPA (English)': 'ˈ ˌ ŋ ɡ tʃ dʒ ʃ ʒ θ ð ʔ  iː ɪ uː ʊ ʌ ɜr eɪ ɛ æ oʊ ɒ ɔː ɔɪ ɔr ɑː ɑr aɪ aʊ  ə ər ɨ ɵ ʉ ⟨+⟩  {\{IPAc-en|+}} {\{IPA-en|+}} {\{IPA|/+/}}',
            'IPA': 't̪ d̪ ʈɖɟɡɢʡʔ  ɸβθðʃʒɕʑʂʐçʝɣχʁħʕʜʢɦ  ɱɳɲŋɴ  ʋɹɻɰ  ʙⱱʀɾɽ  ɫɬɮɺɭʎʟ  ʍɥɧ  ʼ ɓɗʄɠʛ  ʘǀǃǂǁ  ɨʉɯ ɪʏʊ øɘɵɤ ə ɚ ɛœɜɝɞʌɔ æ ɐɶɑɒ  ʰʱʷʲˠˤˀ ᵊ k̚ ⁿˡ  ˈˌːˑ t̪ d̪ s̺ s̻ θ̼ s̬ n̥ ŋ̊ a̤ a̰  β̞ ˕ r̝ ˔ o˞ ɚ ɝ e̘ e̙ u̟ i̠ ɪ̈ e̽ ɔ̹ ɔ̜ n̩ ə̆ ə̯ ə̃ ȷ̃ ɫ z̴ ə̋ ə́ ə̄ ə̀ ə̏ ə̌ ə̂ ə᷄ ə᷅ ə᷇ ə᷆ ə᷈ ə᷉ t͡ʃ d͡ʒ t͜ɬ ‿  ˥ ˦ ˧ ˨ ˩ ꜛ ꜜ | ‖ ↗ ↘  k͈ s͎ {\{IPA|+}}',
            'Math and logic': '− × ÷ ⋅ ° ∗ ∘ ± ∓ ≤ ≥ ≠ ≡ ≅ ≜ ≝ ≐ ≃ ≈ ⊕ ⊗ ⇐ ⇔ ⇒ ∞ ← ↔ → ≪ ≫ ∝ √ ∤ ≀ ◅ ▻ ⋉ ⋊ ⋈ ∴ ∵ ↦ ¬ ∧ ∨ ⊻ ∀ ∃ ∈ ∉ ∋ ⊆ ⊈ ⊊ ⊂ ⊄ ⊇ ⊉ ⊋ ⊃ ⊅ ∪ ∩ ∑ ∏ ∐ ′ ∫ ∬ ∭ ∮ ∇ ∂ ∆ ∅ ℂ ℍ ℕ ℙ ℚ ℝ ℤ ℵ ⌊ ⌋ ⌈ ⌉ ⊤ ⊥ ⊢ ⊣ ⊧ □ ∠ ⟨ ⟩ {\{frac|+|}} &nb'+'sp; &minus; <math>+</math> {\{math|+}}'
        },

        charinsertDivider: "\240",

        cookieName: 'edittoolscharsubset',

        createEditTools: function ( placeholder ) {
            var sel, id;
            var box = document.createElement( "div" );
            var prevSubset = 0, curSubset = 0;
            box.id = "editpage-specialchars";
            box.title = 'Click on the character or tag to insert it into the edit window';

            // append user-defined sets
            if ( window.charinsertCustom ) {
                for ( id in charinsertCustom ) {
                    if ( !EditTools.charinsert[id] ) {
                        EditTools.charinsert[id] = '';
                    }
                }
            }

            // create drop-down select
            sel = document.createElement( 'select' );
            for ( id in EditTools.charinsert ) {
                sel.options[sel.options.length] = new Option( id, id );
            }
            sel.selectedIndex = 0;
            sel.style.marginRight = '.3em';
            sel.title = 'Choose character subset';
            sel.onchange = sel.onkeyup = selectSubset;
            box.appendChild( sel );

            // create "recall" switch
            if ( window.editToolsRecall ) {
                var recall = document.createElement( 'span' );
                recall.appendChild( document.createTextNode( '↕' ) ); // ↔
                recall.onclick = function() {
                    sel.selectedIndex = prevSubset;
                    selectSubset();
                }
                with ( recall.style ) {
                    cssFloat = styleFloat = 'left';
                    marginRight = '5px';
                    cursor = 'pointer';
                }
                box.appendChild( recall );
            }

            // load latest selection from cookies
            try {
                var cookieRe = new RegExp( "(?:^|;)\\s*" + EditTools.cookieName + "=(\\d+)\\s*(?:;|$)" );
                var m = cookieRe.exec( document.cookie );
                if ( m && m.length > 1 && parseInt( m[1] ) < sel.options.length ) {
                    sel.selectedIndex = parseInt( m[1] );
                }
            } catch ( err ) {
                // ignore
            }

            placeholder.parentNode.replaceChild( box, placeholder );
            selectSubset();
            return;

            function selectSubset() {
                // remember previous (for "recall" button)
                prevSubset = curSubset;
                curSubset = sel.selectedIndex;
                //save into cookies for persistence
                try {
                    var expires = new Date();
                    expires.setTime( expires.getTime() + 30 * 24 * 60 * 60 * 1000 );  // + 30 days
                    document.cookie = EditTools.cookieName + "=" + curSubset + ";path=/;expires=" + expires.toUTCString();
                } catch ( err ) {
                    // ignore
                }
                //hide other subsets
                var pp = box.getElementsByTagName( 'p' ) ;
                for ( var i = 0; i < pp.length; i++ ) {
                    pp[i].style.display = 'none';
                }
                //show/create current subset
                var id = sel.options[curSubset].value;
                var p = document.getElementById( id );
                if ( !p ) {
                    p = document.createElement( 'p' );
                    p.id = id;
                    if ( id == 'Arabic' || id == 'Hebrew' ) {
                        p.style.fontSize = '120%';
                        p.dir = 'rtl';
                    }
                    var tokens = EditTools.charinsert[id];
                    if ( window.charinsertCustom && charinsertCustom[id] ) {
                        if ( tokens.length > 0 ) {
                            tokens += ' ';
                        }
                        tokens += charinsertCustom[id];
                    }
                    EditTools.createTokens( p, tokens );
                    box.appendChild( p );
                }
                p.style.display = 'inline';
            }
        },

        createTokens: function ( paragraph, str ) {
            var tokens = str.split( ' ' ), token, i, n;
            for ( i = 0; i < tokens.length; i++ ) {
                token = tokens[i];
                n = token.indexOf( '+' );
                if ( token.charAt( 0 ) === '␥' ) {
                    if ( token.length > 1 && mw.config.get( 'wgNamespaceNumber' ) === 0 ) {
                        continue;
                    } else {
                        token = token.substring( 1 );
                    }
                }
                if ( token == '' || token == '_' ) {
                    addText( EditTools.charinsertDivider + ' ' );
                } else if ( token == '\n' ) {
                    paragraph.appendChild( document.createElement( 'br' ) );
                } else if ( token == '___' ) {
                    paragraph.appendChild( document.createElement( 'hr' ) );
                } else if ( token.charAt( token.length-1 ) == ':' ) { // : at the end means just text
                    addBold( token );
                } else if ( n == 0 ) { // +<tag>  ->   <tag>+</tag>
                    addLink( token.substring( 1 ), '</' + token.substring( 2 ), token.substring( 1 ) );
                } else if ( n > 0 ) { // <tag>+</tag>
                    addLink( token.substring( 0, n ), token.substring( n+1 ) );
                } else if ( token.length > 2 && token.charCodeAt( 0 ) > 127 ) { // a string of insertable characters
                    for ( var j = 0; j < token.length; j++ ) {
                        addLink( token.charAt( j ), '' );
                    }
                } else {
                    addLink( token, '' );
                }
            }
            return;

            function addLink( tagOpen, tagClose, name ) {
                var handler;
                var dle = tagOpen.indexOf( '\x10' );
                if ( dle > 0 ) {
                    var path = tagOpen.substring( dle + 1 ).split( '.' );
                    tagOpen = tagOpen.substring( 0, dle );
                    var handler = window;
                    for ( var i = 0; i < path.length; i++ ) {
                        handler = handler[path[i]];
                    }
                } else {
                    tagOpen = tagOpen.replace( /\./g,' ' );
                    tagClose = tagClose ? tagClose.replace( /_/g,' ' ) : '';
                    handler = new Function(
                        "evt",
                        "insertTags('" + tagOpen + "', '" + tagClose + "', ''); return killEvt( evt );"
                    );
                }
                var a = document.createElement( 'a' );
                name = name || tagOpen + tagClose;
                name = name.replace( /\\n/g,'' );
                a.appendChild( document.createTextNode( name ) );
                a.href = "#";
                addHandler( a, 'click', handler );
                paragraph.appendChild( a );
                addText( ' ' );
            }

            function addBold( text ) {
                var b = document.createElement( 'b' );
                b.appendChild( document.createTextNode( text.replace( /_/g,' ' ) ) );
                paragraph.appendChild( b );
                addText( ' ' );
            }
            function addText( txt ) {
                paragraph.appendChild( document.createTextNode( txt ) );
            }
        },

        enableForAllFields: function () {
            if ( typeof( insertTags ) != 'function' || window.WikEdInsertTags ) {
                return;
            }
            // insertTags from the site-wide /skins-1.5/common/edit.js just inserts in the first
            // textarea in the document. Evidently, that's not good if we have multiple textareas.
            // My first idea was to simply add a hidden textarea as the first one, and redefine
            // insertTags such that it copied first the last active textareas contents over to that hidden
            // field, set the cursor or selection there, let the standard insertTags do its thing, and
            // then copy the hidden field's text, cursor position and selection back to the currently
            // active field. Unfortunately, that is just as complex as simply copying the whole code
            // from wikibits to here and let it work on the right text field in the first place.
            var texts = document.getElementsByTagName( 'textarea' );
            for ( var i = 0; i < texts.length; i++ ) {
                addHandler( texts[i], 'focus', EditTools.registerTextField );
            }
            // While we're at it, also enable it for input fields
            texts = document.getElementsByTagName( 'input' );
            for ( var i = 0; i < texts.length; i++ ) {
                if ( texts[i].type == 'text' ) {
                    addHandler( texts[i], 'focus', EditTools.registerTextField );
                }
            }
            insertTags = EditTools.insertTags; // Redefine the global insertTags
        },

        last_active_textfield: null,

        registerTextField: function ( evt ) {
            var e = evt || window.event;
            var node = e.target || e.srcElement;
            if ( !node ) {
                return;
            }
            EditTools.last_active_textfield = node.id;
            return true;
        },

        getTextArea: function () {
            var txtarea = null;
            if ( EditTools.last_active_textfield && EditTools.last_active_textfield != "" )
                txtarea = document.getElementById( EditTools.last_active_textfield );
            if ( !txtarea ) {
                // Fallback option: old behaviour
                if ( document.editform ) {
                    txtarea = document.editform.wpTextbox1;
                } else {
                    // Some alternate form? Take the first one we can find
                    txtarea = document.getElementsByTagName( 'textarea' );
                    if ( txtarea.length > 0 ) {
                        txtarea = txtarea[0];
                    } else {
                        txtarea = null;
                    }
                }
            }
            return txtarea;
        },

        insertTags: function ( tagOpen, tagClose, sampleText ) {
            var txtarea = EditTools.getTextArea();
            if ( !txtarea ) {
                return;
            }

            /* Usability initiative compatibility */
            if ( typeof $j != 'undefined' && typeof $j.fn.textSelection != 'undefined' ) {
                $j( txtarea ).textSelection(
                    'encapsulateSelection',
                    { 'pre': tagOpen, 'peri': sampleText, 'post': tagClose }
                );
                return;
            }

            var selText, isSample = false;

            function checkSelectedText() {
                if ( !selText ) {
                    selText = sampleText;
                    isSample = true;
                } else if ( selText.charAt( selText.length - 1 ) == ' ' ) { // Exclude ending space char
                    selText = selText.substring( 0, selText.length - 1 );
                    tagClose += ' ';
                }
            }

            if ( document.selection && document.selection.createRange ) { // IE/Opera
                // Save window scroll position
                var winScroll = 0;
                if ( document.documentElement && document.documentElement.scrollTop ) {
                    winScroll = document.documentElement.scrollTop;
                } else if ( document.body ) {
                    winScroll = document.body.scrollTop;
                }
                // Get current selection
                txtarea.focus();
                var range = document.selection.createRange();
                selText = range.text;
                // Insert tags
                checkSelectedText();
                range.text = tagOpen + selText + tagClose;
                // Mark sample text as selected
                if ( isSample && range.moveStart ) {
                    if ( window.opera ) {
                        tagClose = tagClose.replace( /\n/g, "" );
                    }
                    range.moveStart( 'character', - tagClose.length - selText.length );
                    range.moveEnd( 'character', - tagClose.length );
                }
                range.select();
                // Restore window scroll position
                if ( document.documentElement && document.documentElement.scrollTop ) {
                    document.documentElement.scrollTop = winScroll;
                } else if ( document.body ) {
                    document.body.scrollTop = winScroll;
                }
            } else if ( txtarea.selectionStart || txtarea.selectionStart == '0' ) { // Mozilla
                // Save textarea scroll position
                var textScroll = txtarea.scrollTop;
                // Get current selection
                txtarea.focus();
                var startPos = txtarea.selectionStart;
                var endPos = txtarea.selectionEnd;
                selText = txtarea.value.substring( startPos, endPos );
                // Insert tags
                checkSelectedText();
                txtarea.value = txtarea.value.substring( 0, startPos ) + tagOpen + selText
                    + tagClose + txtarea.value.substring( endPos );
                // Set new selection
                if ( isSample ) {
                    txtarea.selectionStart = startPos + tagOpen.length;
                    txtarea.selectionEnd = startPos + tagOpen.length + selText.length;
                } else {
                    txtarea.selectionStart = startPos + tagOpen.length + selText.length + tagClose.length;
                    txtarea.selectionEnd = txtarea.selectionStart;
                }
                // Restore textarea scroll position
                txtarea.scrollTop = textScroll;
            }
        }, // end insertTags

        setup: function () {
            var placeholder;
            if ( $( '#editpage-specialchars' ).length ) {
                placeholder = $( '#editpage-specialchars' )[0];
            } else {
                placeholder = $( '<div id="editpage-specialchars"> </div>' ).prependTo( '.mw-editTools' )[0];
            }
            if ( !placeholder ) {
                return;
            }
            if ( !window.charinsertDontMove ) {
                $( '.editOptions' ).before( placeholder );
            }
            EditTools.createEditTools( placeholder );
            EditTools.enableForAllFields();
            window.updateEditTools = function () {
                EditTools.createEditTools( $( '#editpage-specialchars' )[0] );
            };
        }

    }; // end EditTools

    EditTools.setup();
} );
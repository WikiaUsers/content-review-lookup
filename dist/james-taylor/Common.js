/* ============================================================
   JAMES TAYLOR'S STUDIO — diorama (self-injecting)
   Append this block to MediaWiki:Common.js
   Builds the entire widget inside <div class="jt-dw-mount"></div>
   ============================================================ */
(function () {
    'use strict';

    var AUDIO_BASE = 'https://community-activations-fandom.github.io/jt/';

    var DATA = {
        '1a': { yr: '1968 \u00b7 Apple Records', t: 'Apple Records Contract',
            b: 'Signed in 1968, this contract brought James Taylor to Apple Records, making him one of the first non-British artists signed by the label and launching his recording career.',
            art: '<svg viewBox="0 0 80 70" width="80" height="70"><polygon points="10,18 70,18 70,62 10,62" fill="#e8e0c8"/><polygon points="10,18 70,18 70,24 10,24" fill="#f5eed6"/><g stroke="#b0a078" stroke-width="1"><line x1="18" y1="32" x2="62" y2="32"/><line x1="18" y1="40" x2="60" y2="40"/><line x1="18" y1="48" x2="58" y2="48"/></g><circle cx="56" cy="54" r="6" fill="#1a5a1a"/><circle cx="56" cy="54" r="6" fill="none" stroke="#2a7a2a" stroke-width="0.8"/></svg>' },
        '1b': { yr: 'Signature Instrument', t: 'Gibson J-50 Acoustic Guitar',
            b: 'The signature songwriting instrument of Taylor\u2019s early career - his signature songwriting instrument, used to develop the fingerpicking style and intimate sound that became his trademark.',
            art: '<svg viewBox="0 0 70 96" width="70" height="96"><ellipse cx="34" cy="68" rx="17" ry="22" fill="#6a3a10"/><ellipse cx="26" cy="68" rx="8" ry="20" fill="#7a4516"/><ellipse cx="34" cy="48" rx="12" ry="15" fill="#6a3a10"/><ellipse cx="27" cy="48" rx="5" ry="13" fill="#7a4516"/><circle cx="34" cy="66" r="5.5" fill="#1a0a02"/><circle cx="34" cy="66" r="5.5" fill="none" stroke="#3a2008" stroke-width="1"/><rect x="30" y="18" width="7" height="42" fill="#3a1e06"/><rect x="30" y="18" width="3" height="42" fill="#4a2810"/></svg>' },
        '1c': { yr: '1970', t: 'Handwritten Lyrics to \u201CFire and Rain\u201D',
            b: 'Draft lyrics from Taylor\u2019s breakthrough song, inspired by personal loss, addiction, and recovery during a turbulent period of his life.',
            art: '<svg viewBox="0 0 80 70" width="80" height="70"><polygon points="14,12 66,12 66,64 14,64" fill="#e8e0c8"/><g stroke="#a89060" stroke-width="0.8" stroke-linecap="round" fill="none"><path d="M20,22 Q30,19 40,22 T58,22"/><path d="M20,30 Q28,27 38,30 T54,29"/><path d="M20,38 Q32,35 42,38 T60,37"/><path d="M20,46 Q28,44 36,46 T52,45"/><path d="M20,54 Q30,51 40,54"/></g></svg>' },
        '1d': { yr: 'Sweet Baby James', t: 'Photo of \u201CSweet Baby James\u201D',
            b: 'A photograph of Taylor\u2019s nephew, James, whose birth inspired \u201CSweet Baby James,\u201D one of his most beloved and enduring songs.',
            art: '<svg viewBox="0 0 70 76" width="70" height="76"><polygon points="6,6 64,6 64,70 6,70" fill="#5a4525"/><polygon points="12,12 58,12 58,64 12,64" fill="#1a1812"/><ellipse cx="35" cy="38" rx="11" ry="13" fill="#3a3020"/><ellipse cx="35" cy="30" rx="7" ry="7" fill="#4a4030"/></svg>' },
        '2a': { yr: '1971', t: 'Grammy Award for \u201CYou\u2019ve Got a Friend\u201D',
            b: 'Taylor\u2019s first Grammy Award, earned for his 1971 recording of \u201CYou\u2019ve Got a Friend,\u201D which became his only No. 1 single.',
            art: '<svg viewBox="0 0 60 80" width="60" height="80"><polygon points="22,58 38,52 46,58 30,64" fill="#b8902c"/><polygon points="22,58 30,64 30,72 22,66" fill="#8a6c20"/><path d="M30,52 C24,44 16,36 14,26 C20,30 24,34 30,38 C36,34 40,30 46,26 C44,36 36,44 30,52 Z" fill="#c8a030"/><path d="M30,52 C26,44 20,37 18,28 C22,32 26,35 30,38 Z" fill="#f5c518" opacity="0.4"/></svg>' },
        '2b': { yr: '1970', t: 'Gold Record \u2014 Sweet Baby James',
            b: 'A commemorative plaque marking the commercial success of Sweet Baby James, the album that established Taylor as a major recording artist.',
            art: '<svg viewBox="0 0 70 80" width="70" height="80"><polygon points="6,6 64,6 64,74 6,74" fill="#2e2012"/><polygon points="12,12 58,12 58,68 12,68" fill="#1a140c"/><ellipse cx="35" cy="40" rx="20" ry="22" fill="#c8a030"/><ellipse cx="35" cy="40" rx="20" ry="22" fill="none" stroke="#f5c518" stroke-width="1"/><ellipse cx="35" cy="40" rx="6" ry="7" fill="#1a140c"/></svg>' },
        '2c': { yr: 'Height of Fame', t: 'Family Photograph',
            b: 'A candid family portrait reflecting the intersection of Taylor\u2019s public success and evolving personal life during the height of his fame.',
            art: '<svg viewBox="0 0 70 80" width="70" height="80"><polygon points="6,8 64,8 64,72 6,72" fill="#4a3a20"/><polygon points="12,14 58,14 58,66 12,66" fill="#1a1410"/><ellipse cx="28" cy="34" rx="6" ry="7" fill="#2a2018"/><ellipse cx="42" cy="32" rx="6" ry="7" fill="#2a2018"/><ellipse cx="35" cy="44" rx="5" ry="6" fill="#2a2018"/></svg>' },
        '2d': { yr: '1971', t: 'Time Magazine Cover',
            b: 'Taylor\u2019s appearance on the cover of Time signaled his emergence as one of the defining voices of the singer-songwriter era.',
            art: '<svg viewBox="0 0 64 80" width="64" height="80"><polygon points="6,6 58,6 58,74 6,74" fill="#e8e4dc"/><polygon points="6,6 58,6 58,16 6,16" fill="#c83020"/><text x="32" y="14" font-family="DM Serif Display,serif" font-size="8" fill="#fff" text-anchor="middle">TIME</text><ellipse cx="32" cy="44" rx="14" ry="18" fill="#b0a890"/><ellipse cx="32" cy="38" rx="9" ry="9" fill="#c8c0a8"/></svg>' },
        '3a': { yr: '2015', t: 'Presidential Medal of Freedom',
            b: 'The nation\u2019s highest civilian honor, awarded to Taylor in 2015 in recognition of his contributions to American culture and music.',
            art: '<svg viewBox="0 0 70 80" width="70" height="80"><polygon points="10,68 60,68 66,74 4,74" fill="#2a3445"/><polygon points="10,30 60,30 60,68 10,68" fill="#1a2433" opacity="0.4"/><polygon points="10,30 60,30 66,24 4,24" fill="#3a4658" opacity="0.6"/><polygon points="35,36 40,50 54,50 43,58 47,72 35,63 23,72 27,58 16,50 30,50" fill="#c8a030"/><polygon points="31,24 39,24 37,14 33,14" fill="#3a5a9a"/></svg>' },
        '3b': { yr: '2000', t: 'Rock and Roll Hall of Fame',
            b: 'Commemorating Taylor\u2019s 2000 induction into the Rock and Roll Hall of Fame, recognizing his lasting influence on popular music.',
            art: '<svg viewBox="0 0 60 80" width="60" height="80"><polygon points="4,4 56,4 56,76 4,76" fill="#3a241a"/><polygon points="10,10 50,10 50,70 10,70" fill="#1a1408"/><line x1="16" y1="22" x2="44" y2="22" stroke="#4a3a20" stroke-width="2"/><text x="30" y="58" font-family="serif" font-size="20" fill="#6a5a40" text-anchor="middle">\u2605</text></svg>' },
        '3c': { yr: 'Later Career', t: 'Handwritten Tour Setlist',
            b: 'A working setlist from a later-career tour, featuring songs that remained central to Taylor\u2019s live performances across generations.',
            art: '<svg viewBox="0 0 60 80" width="60" height="80"><polygon points="8,6 52,6 52,74 8,74" fill="#e8e0d0"/><g stroke="#909880" stroke-width="1" stroke-linecap="round"><line x1="14" y1="16" x2="44" y2="16"/><line x1="14" y1="26" x2="40" y2="26"/><line x1="14" y1="36" x2="46" y2="36"/><line x1="14" y1="46" x2="38" y2="46"/><line x1="14" y1="56" x2="44" y2="56"/><line x1="14" y1="66" x2="36" y2="66"/></g></svg>' },
        '3d': { yr: 'Later Years', t: 'Family Keepsakes',
            b: 'Family keepsakes from a later chapter of life, following the births of his four children: Sally, Ben, Rufus, and Henry.',
            art: '<svg viewBox="0 0 80 76" width="80" height="76"><polygon points="6,6 74,6 74,70 6,70" fill="#9a7a4a"/><polygon points="12,12 68,12 68,64 12,64" fill="#b8956a"/><polygon points="18,18 38,18 38,36 18,36" fill="#d85a5a"/><polygon points="44,20 62,20 62,34 44,34" fill="#5a8ad8"/><polygon points="18,42 36,42 36,58 18,58" fill="#f5c518"/><polygon points="42,40 62,40 62,58 42,58" fill="#6ac86a"/></svg>' }
    };

    var ROOM_SVG =
'<svg viewBox="0 0 280 1080" xmlns="http://www.w3.org/2000/svg" class="jt-dw-svg">' +
'<defs>' +
'<radialGradient id="jtGlowBulb" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffd97a" stop-opacity="0.55"/><stop offset="100%" stop-color="#ffd97a" stop-opacity="0"/></radialGradient>' +
'<radialGradient id="jtGlowLamp" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffb84d" stop-opacity="0.5"/><stop offset="100%" stop-color="#ffb84d" stop-opacity="0"/></radialGradient>' +
'</defs>' +
'<rect x="0" y="0" width="280" height="360" fill="#16120b"/>' +
'<polygon points="24,46 150,88 150,300 24,258" fill="#3a2e1e"/>' +
'<polygon points="150,88 256,46 256,258 150,300" fill="#473827"/>' +
'<polygon points="24,258 150,300 256,258 256,300 150,342 24,300" fill="#241a10"/>' +
'<polygon points="150,88 256,46 256,150 150,200" fill="#ffcf6e" opacity="0.10"/>' +
'<ellipse cx="150" cy="120" rx="120" ry="80" fill="url(#jtGlowBulb)"/>' +
'<g stroke="#2c2014" stroke-width="0.8" opacity="0.6"><line x1="150" y1="124" x2="256" y2="82"/><line x1="150" y1="170" x2="256" y2="128"/><line x1="150" y1="216" x2="256" y2="174"/><line x1="64" y1="60" x2="64" y2="272"/><line x1="104" y1="73" x2="104" y2="285"/></g>' +
'<line x1="150" y1="0" x2="150" y2="70" stroke="#1a1208" stroke-width="1.4"/>' +
'<circle cx="150" cy="78" r="7" fill="#ffe79a"/>' +
'<circle cx="150" cy="78" r="3.5" fill="#fff4cf"/>' +
'<path d="M145,72 q5,-7 10,0" fill="none" stroke="#caa64e" stroke-width="0.8"/>' +
'<rect x="14" y="14" width="172" height="16" rx="3" fill="#0d1018" opacity="0.78"/>' +
'<text x="20" y="26" class="jt-era-tag" fill="#ffd24a">THE EARLY YEARS \u00b7 1966\u20131969</text>' +
'<g class="jt-item" data-id="1a"><ellipse class="jt-item-glow" cx="72" cy="130" rx="26" ry="24" fill="#39c739" opacity="0.16"/><polygon points="56,104 96,118 96,160 56,146" fill="#efe7cf"/><polygon points="56,104 96,118 96,122 56,108" fill="#fbf4dc"/><g stroke="#b0a078" stroke-width="0.7"><line x1="62" y1="118" x2="88" y2="127"/><line x1="62" y1="125" x2="86" y2="133"/><line x1="62" y1="132" x2="84" y2="139"/></g><circle cx="84" cy="148" r="4" fill="#1f6e1f"/><circle cx="84" cy="148" r="4" fill="none" stroke="#34962f" stroke-width="0.5"/><text class="jt-item-hint" x="100" y="134" font-size="7.5" fill="#7be87b">examine</text></g>' +
'<g class="jt-item" data-id="1b"><ellipse class="jt-item-glow" cx="150" cy="230" rx="28" ry="18" fill="#e8902f" opacity="0.16"/><ellipse cx="150" cy="236" rx="15" ry="19" fill="#874a14"/><ellipse cx="144" cy="236" rx="7" ry="18" fill="#9a571c"/><ellipse cx="150" cy="220" rx="11" ry="13" fill="#874a14"/><ellipse cx="145" cy="220" rx="5" ry="12" fill="#9a571c"/><rect x="146" y="226" width="9" height="10" fill="#874a14"/><circle cx="150" cy="234" r="4.5" fill="#250f02"/><circle cx="150" cy="234" r="4.5" fill="none" stroke="#4a2a0c" stroke-width="0.8"/><rect x="147" y="180" width="6" height="42" fill="#4a2a0c"/><rect x="147" y="180" width="2.5" height="42" fill="#5e3614"/><rect x="145" y="170" width="10" height="12" fill="#3a2208" rx="1"/><line x1="148" y1="180" x2="148" y2="250" stroke="#d8c884" stroke-width="0.4" opacity="0.7"/><line x1="151" y1="180" x2="151" y2="250" stroke="#d8c884" stroke-width="0.4" opacity="0.7"/><text class="jt-item-hint" x="170" y="226" font-size="7.5" fill="#f2b962">examine</text></g>' +
'<g class="jt-item" data-id="1c"><ellipse class="jt-item-glow" cx="206" cy="210" rx="30" ry="16" fill="#ffd24a" opacity="0.16"/><polygon points="178,200 208,190 238,200 208,210" fill="#5e4a2a"/><polygon points="178,200 208,210 208,230 178,220" fill="#4a3a22"/><polygon points="208,210 238,200 238,220 208,230" fill="#3c2e1a"/><polygon points="194,194 214,189 226,194 206,199" fill="#efe7cf"/><g stroke="#a89060" stroke-width="0.6"><line x1="198" y1="194" x2="212" y2="191"/><line x1="200" y1="196" x2="214" y2="193"/><line x1="201" y1="198" x2="213" y2="195"/></g><text class="jt-item-hint" x="242" y="202" font-size="7.5" fill="#ffd24a">examine</text></g>' +
'<g class="jt-item" data-id="1d"><ellipse class="jt-item-glow" cx="96" cy="250" rx="20" ry="13" fill="#19d2e0" opacity="0.14"/><polygon points="82,232 110,242 110,266 82,256" fill="#6e5630"/><polygon points="86,237 106,244 106,262 86,255" fill="#241f17"/><ellipse cx="96" cy="250" rx="5" ry="6" fill="#4a3e28"/><ellipse cx="96" cy="246" rx="3" ry="3" fill="#5e5238"/><text class="jt-item-hint" x="58" y="252" font-size="7.5" fill="#5fe2f0">examine</text></g>' +
'<rect x="0" y="356" width="280" height="6" fill="#05070a"/>' +
'<rect x="0" y="362" width="280" height="360" fill="#1c160c"/>' +
'<polygon points="24,408 150,450 150,662 24,620" fill="#41331d"/>' +
'<polygon points="150,450 256,408 256,620 150,662" fill="#4f3e22"/>' +
'<polygon points="24,620 150,662 256,620 256,662 150,704 24,662" fill="#2c2010"/>' +
'<polygon points="180,420 232,400 232,452 180,472" fill="#bfe3ff"/>' +
'<polygon points="180,420 232,400 232,452 180,472" fill="none" stroke="#6a5a38" stroke-width="2"/>' +
'<line x1="206" y1="410" x2="206" y2="462" stroke="#6a5a38" stroke-width="1.5"/>' +
'<line x1="180" y1="446" x2="232" y2="426" stroke="#6a5a38" stroke-width="1.5"/>' +
'<polygon points="180,472 232,452 256,520 150,560" fill="#ffd86a" opacity="0.14"/>' +
'<ellipse cx="200" cy="500" rx="120" ry="90" fill="#ffcf6e" opacity="0.07"/>' +
'<g stroke="#2e2212" stroke-width="0.8" opacity="0.55"><line x1="150" y1="486" x2="256" y2="444"/><line x1="150" y1="532" x2="256" y2="490"/><line x1="64" y1="422" x2="64" y2="634"/><line x1="104" y1="435" x2="104" y2="647"/></g>' +
'<rect x="14" y="376" width="172" height="16" rx="3" fill="#0d1018" opacity="0.78"/>' +
'<text x="20" y="388" class="jt-era-tag" fill="#ffd24a">THE PEAK YEARS \u00b7 1970\u20131979</text>' +
'<g class="jt-item" data-id="2a"><ellipse class="jt-item-glow" cx="74" cy="540" rx="24" ry="14" fill="#ffd24a" opacity="0.18"/><polygon points="52,548 80,538 102,548 74,558" fill="#4a3a22"/><polygon points="52,548 74,558 74,562 52,552" fill="#382a18"/><polygon points="66,536 78,532 84,536 72,540" fill="#caa036"/><polygon points="66,536 72,540 72,546 66,542" fill="#9a7a26"/><polygon points="72,540 84,536 84,542 72,546" fill="#b48e2e"/><path d="M75,532 C72,527 68,523 67,518 C70,520 73,522 75,523 C77,522 80,520 83,518 C82,523 78,527 75,532 Z" fill="#dcb43a"/><path d="M75,532 C73,527 70,523 69,519 C71,521 73,522 75,523 Z" fill="#ffd24a" opacity="0.5"/><text class="jt-item-hint" x="96" y="534" font-size="7.5" fill="#ffd24a">examine</text></g>' +
'<g class="jt-item" data-id="2b"><ellipse class="jt-item-glow" cx="92" cy="470" rx="24" ry="22" fill="#ffd24a" opacity="0.16"/><polygon points="78,446 108,456 108,498 78,488" fill="#3e2c18"/><polygon points="82,452 104,459 104,492 82,485" fill="#241c10"/><ellipse cx="93" cy="471" rx="10" ry="11" fill="#caa036"/><ellipse cx="93" cy="471" rx="10" ry="11" fill="none" stroke="#ffd24a" stroke-width="0.6"/><ellipse cx="93" cy="471" rx="3" ry="3.5" fill="#241c10"/><text class="jt-item-hint" x="60" y="474" font-size="7.5" fill="#ffd24a">examine</text></g>' +
'<g class="jt-item" data-id="2c"><ellipse class="jt-item-glow" cx="208" cy="480" rx="24" ry="22" fill="#19d2e0" opacity="0.14"/><polygon points="190,456 220,446 220,488 190,498" fill="#5e4a2a"/><polygon points="194,462 216,455 216,484 194,491" fill="#241c14"/><ellipse cx="202" cy="472" rx="4" ry="5" fill="#3a2e20"/><ellipse cx="210" cy="470" rx="4" ry="5" fill="#3a2e20"/><ellipse cx="206" cy="478" rx="3" ry="3.5" fill="#3a2e20"/><text class="jt-item-hint" x="224" y="474" font-size="7.5" fill="#5fe2f0">examine</text></g>' +
'<g class="jt-item" data-id="2d"><ellipse class="jt-item-glow" cx="206" cy="600" rx="28" ry="17" fill="#e84a3a" opacity="0.16"/><polygon points="184,596 208,588 232,596 208,604" fill="#3a4555"/><polygon points="184,596 208,604 208,620 184,612" fill="#2a3340"/><polygon points="208,604 232,596 232,612 208,620" fill="#222b38"/><polygon points="196,588 216,582 226,586 206,592" fill="#f0ece4"/><polygon points="196,588 216,582 217,585 197,591" fill="#d83828"/><text class="jt-item-hint" x="236" y="592" font-size="7.5" fill="#f56a5a">examine</text></g>' +
'<rect x="0" y="718" width="280" height="6" fill="#05070a"/>' +
'<rect x="0" y="724" width="280" height="356" fill="#10151d"/>' +
'<polygon points="24,770 150,812 150,1024 24,982" fill="#283341"/>' +
'<polygon points="150,812 256,770 256,982 150,1024" fill="#313d4c"/>' +
'<polygon points="24,982 150,1024 256,982 256,1024 150,1066 24,1024" fill="#1a222c"/>' +
'<line x1="60" y1="1024" x2="60" y2="950" stroke="#2a3340" stroke-width="2.4"/>' +
'<polygon points="48,924 72,924 78,950 42,950" fill="#ffb84d"/>' +
'<polygon points="48,924 72,924 70,918 50,918" fill="#e0a040"/>' +
'<ellipse cx="60" cy="952" rx="90" ry="80" fill="url(#jtGlowLamp)"/>' +
'<polygon points="42,950 78,950 110,1024 10,1024" fill="#ffb84d" opacity="0.10"/>' +
'<g stroke="#1a222c" stroke-width="0.8" opacity="0.6"><line x1="150" y1="848" x2="256" y2="806"/><line x1="150" y1="894" x2="256" y2="852"/><line x1="104" y1="797" x2="104" y2="1009"/></g>' +
'<rect x="14" y="738" width="180" height="16" rx="3" fill="#0d1018" opacity="0.78"/>' +
'<text x="20" y="750" class="jt-era-tag" fill="#ffd24a">THE LEGACY \u00b7 2000\u2013PRESENT</text>' +
'<g class="jt-item" data-id="3a"><ellipse class="jt-item-glow" cx="74" cy="900" rx="26" ry="16" fill="#ffd24a" opacity="0.18"/><polygon points="54,896 94,896 94,872 54,872" fill="#2a3445" opacity="0.6"/><polygon points="54,896 94,896 98,900 50,900" fill="#3a4658"/><polygon points="54,872 94,872 98,876 50,876" fill="#4a586a" opacity="0.7"/><polygon points="74,878 77,886 85,886 79,891 81,899 74,894 67,899 69,891 63,886 71,886" fill="#caa036"/><polygon points="74,882 76,887 80,887 77,890 78,894 74,892 70,894 71,890 68,887 72,887" fill="#ffd24a" opacity="0.6"/><polygon points="71,872 77,872 76,866 72,866" fill="#4a6aaa"/><text class="jt-item-hint" x="100" y="894" font-size="7.5" fill="#ffd24a">examine</text></g>' +
'<g class="jt-item" data-id="3b"><ellipse class="jt-item-glow" cx="92" cy="828" rx="24" ry="22" fill="#9a5ad8" opacity="0.16"/><polygon points="78,804 108,814 108,856 78,846" fill="#4a3024"/><polygon points="82,810 104,817 104,852 82,845" fill="#241c10"/><line x1="86" y1="822" x2="100" y2="826" stroke="#5e4a2a" stroke-width="1.5"/><g stroke="#3a2c18" stroke-width="0.7"><line x1="86" y1="828" x2="100" y2="832"/><line x1="86" y1="834" x2="98" y2="838"/></g><text x="90" y="846" font-size="10" fill="#8a7a54" text-anchor="middle">\u2605</text><text class="jt-item-hint" x="56" y="838" font-size="7.5" fill="#bd8aeb">examine</text></g>' +
'<g class="jt-item" data-id="3c"><ellipse class="jt-item-glow" cx="150" cy="930" rx="26" ry="18" fill="#19d2e0" opacity="0.14"/><line x1="142" y1="968" x2="150" y2="928" stroke="#3a4555" stroke-width="2" stroke-linecap="round"/><line x1="158" y1="968" x2="150" y2="928" stroke="#2a3340" stroke-width="2" stroke-linecap="round"/><line x1="150" y1="968" x2="150" y2="928" stroke="#34404f" stroke-width="2" stroke-linecap="round"/><polygon points="134,912 150,908 166,912 150,916" fill="#e0d8c8"/><polygon points="134,912 150,916 150,932 134,928" fill="#f0e8d8"/><polygon points="150,916 166,912 166,928 150,932" fill="#d0c8b8"/><g stroke="#909880" stroke-width="0.5"><line x1="137" y1="918" x2="147" y2="921"/><line x1="137" y1="922" x2="147" y2="925"/><line x1="153" y1="921" x2="163" y2="918"/><line x1="153" y1="925" x2="163" y2="922"/></g><text class="jt-item-hint" x="170" y="924" font-size="7.5" fill="#5fe2f0">examine</text></g>' +
'<g class="jt-item" data-id="3d"><ellipse class="jt-item-glow" cx="208" cy="848" rx="26" ry="24" fill="#ffd24a" opacity="0.14"/><polygon points="186,824 224,810 224,866 186,880" fill="#aa8a56"/><polygon points="190,830 220,819 220,860 190,871" fill="#c8a578"/><polygon points="194,834 206,830 206,842 194,846" fill="#e86a6a"/><polygon points="209,832 218,829 218,840 209,843" fill="#6a9ae8"/><polygon points="195,850 205,847 205,858 195,861" fill="#ffd24a"/><polygon points="208,847 217,844 217,856 208,859" fill="#7ad87a"/><text class="jt-item-hint" x="158" y="848" font-size="7.5" fill="#ffd24a">examine</text></g>' +
'</svg>';

    function buildWidget(mount) {
        var html =
            '<div class="jt-dw">' +
              '<div class="jt-dw-head">' +
                '<div class="jt-dw-ht">JAMES TAYLOR\u2019S STUDIO</div>' +
                '<div class="jt-dw-sub">Step inside three rooms from a life in music. <strong>Pick up any object</strong> to hear its story.</div>' +
              '</div>' +
              '<div class="jt-dw-body">' + ROOM_SVG +
                '<div class="jt-dw-inspect" id="jt-dw-inspect">' +
                  '<div class="jt-dw-inspect-inner">' +
                    '<div class="jt-dw-inspect-close" id="jt-dw-close">Put it back</div>' +
                    '<div class="jt-dw-inspect-svg" id="jt-dw-art"></div>' +
                    '<div class="jt-dw-inspect-yr" id="jt-dw-yr"></div>' +
                    '<div class="jt-dw-inspect-title" id="jt-dw-title"></div>' +
                    '<div class="jt-dw-inspect-body" id="jt-dw-body"></div>' +
                    '<div class="jt-dw-audio-btn" id="jt-dw-audio-btn"><span id="jt-dw-audio-label">Replay narration</span></div>' +
                  '</div>' +
                '</div>' +
              '</div>' +
              '<div class="jt-dw-foot">Choose any keepsake above to uncover its story</div>' +
            '</div>';
        mount.innerHTML = html;

        var inspect = mount.querySelector('#jt-dw-inspect');
        var elYr = mount.querySelector('#jt-dw-yr');
        var elT = mount.querySelector('#jt-dw-title');
        var elB = mount.querySelector('#jt-dw-body');
        var elArt = mount.querySelector('#jt-dw-art');
        var audioBtn = mount.querySelector('#jt-dw-audio-btn');
        var audioLabel = mount.querySelector('#jt-dw-audio-label');
        var closeBtn = mount.querySelector('#jt-dw-close');

        var currentAudio = null;
        var currentId = null;

        function playClip(id) {
            if (currentAudio) { currentAudio.pause(); currentAudio = null; }
            try {
                var a = new Audio(AUDIO_BASE + id + '.mp3');
                currentAudio = a;
                a.play().catch(function () {});
            } catch (e) {}
        }

        function openInspect(id) {
            var d = DATA[id];
            if (!d) { return; }
            currentId = id;
            elYr.textContent = d.yr;
            elT.textContent = d.t;
            elB.textContent = d.b;
            elArt.innerHTML = d.art;
            audioLabel.textContent = 'Replay narration';
            inspect.classList.add('jt-vis');
            inspect.scrollTop = 0;
            playClip(id);
        }

        function closeInspect() {
            inspect.classList.remove('jt-vis');
            if (currentAudio) { currentAudio.pause(); currentAudio = null; }
        }

        var items = mount.querySelectorAll('.jt-item');
        for (var i = 0; i < items.length; i++) {
            (function (el) {
                el.addEventListener('click', function () {
                    openInspect(el.getAttribute('data-id'));
                });
            })(items[i]);
        }

        audioBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            if (currentAudio && !currentAudio.paused) {
                currentAudio.pause();
                audioLabel.textContent = 'Play narration';
            } else if (currentId) {
                playClip(currentId);
                audioLabel.textContent = 'Replay narration';
            }
        });

        closeBtn.addEventListener('click', closeInspect);

        inspect.addEventListener('click', function (e) {
            if (e.target === inspect) { closeInspect(); }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') { closeInspect(); }
        });
    }

    function init() {
        var mounts = document.querySelectorAll('.jt-dw-mount');
        for (var i = 0; i < mounts.length; i++) {
            if (!mounts[i].getAttribute('data-built')) {
                mounts[i].setAttribute('data-built', '1');
                buildWidget(mounts[i]);
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}());

/* ============================================================
   THE LEXICON — worn index-card glossary deck (self-injecting)
   Append this block to MediaWiki:Common.js
   Builds the deck inside <div class="jt-lex-mount"></div>.
   Add new terms by adding objects to the TERMS array.
   cat controls the stamp colour:
     'person'     -> brown    'place' -> teal
     'instrument' -> rust      'label' -> purple
   catLabel is the text shown on the stamp (free text).
   ============================================================ */
(function () {
    'use strict';

    var TERMS = [
        { cat: 'person',     catLabel: 'Person',    term: 'Kooch',
          pron: 'nickname',
          def: 'The longtime nickname of guitarist Danny Kortchmar, Taylor\u2019s friend and frequent collaborator from the earliest days onward.' },
        { cat: 'place',      catLabel: 'Place',     term: 'Morgan Creek',
          pron: 'Chapel Hill, NC',
          def: 'A waterway central to Taylor\u2019s North Carolina boyhood and the rural landscape that shaped his early songwriting.' },
        { cat: 'instrument', catLabel: 'Technique', term: 'Dropped D',
          pron: 'guitar tuning',
          def: 'Lowering the low E string to D \u2014 a favored tuning that gives his playing its deep, resonant foundation.' },
        { cat: 'place',      catLabel: 'Place',     term: 'Squibnocket',
          pron: 'Martha\u2019s Vineyard',
          def: 'An area on the Vineyard long associated with Taylor \u2014 part of his enduring connection to the island.' },
        { cat: 'label',      catLabel: 'Band',      term: 'The Flying Machine',
          pron: 'est. 1966',
          def: 'Taylor\u2019s first major band, formed in New York with Danny Kortchmar before his solo career took flight.' },
        { cat: 'instrument', catLabel: 'Technique', term: 'Thumb-Over Grip',
          pron: 'fretting technique',
          def: 'Wrapping the thumb over the neck to fret bass notes, freeing the fingers for Taylor\u2019s intricate voicings.' },
        { cat: 'person',     catLabel: 'Lore',      term: 'Hercules',
          pron: 'childhood dog',
          def: 'A dog from Taylor\u2019s youth, remembered in his stories and song \u2014 a small, enduring piece of personal mythology.' }
    ];

    function buildLexicon(mount) {
        mount.innerHTML =
            '<div class="jt-lex">' +
              '<div class="jt-lex-head">' +
                '<div class="jt-lex-kicker">The Lexicon</div>' +
                '<div class="jt-lex-title">A James Taylor Glossary</div>' +
              '</div>' +
              '<div class="jt-lex-body">' +
                '<div class="jt-lex-card" id="jt-lex-card">' +
                  '<div class="jt-lex-hole"></div>' +
                  '<span class="jt-lex-cat" id="jt-lex-cat"></span>' +
                  '<div class="jt-lex-term" id="jt-lex-term"></div>' +
                  '<div class="jt-lex-pron" id="jt-lex-pron"></div>' +
                  '<div class="jt-lex-rule"></div>' +
                  '<div class="jt-lex-def" id="jt-lex-def"></div>' +
                '</div>' +
                '<div class="jt-lex-nav">' +
                  '<div class="jt-lex-arrow" id="jt-lex-prev">\u2190</div>' +
                  '<div class="jt-lex-counter"><b id="jt-lex-num">1</b> / <span id="jt-lex-tot"></span></div>' +
                  '<div class="jt-lex-arrow" id="jt-lex-next">\u2192</div>' +
                '</div>' +
              '</div>' +
              '<div class="jt-lex-foot" id="jt-lex-foot"></div>' +
            '</div>';

        var i = 0;
        var card  = mount.querySelector('#jt-lex-card');
        var elCat = mount.querySelector('#jt-lex-cat');
        var elTerm= mount.querySelector('#jt-lex-term');
        var elPron= mount.querySelector('#jt-lex-pron');
        var elDef = mount.querySelector('#jt-lex-def');
        var elNum = mount.querySelector('#jt-lex-num');
        var elFoot= mount.querySelector('#jt-lex-foot');
        mount.querySelector('#jt-lex-tot').textContent = TERMS.length;

        function render() {
            var t = TERMS[i];
            elCat.textContent = t.catLabel;
            elCat.className = 'jt-lex-cat cat-' + t.cat;
            elTerm.textContent = t.term;
            elPron.textContent = t.pron;
            elDef.textContent = t.def;
            elNum.textContent = i + 1;
            elFoot.textContent = 'CARD ' + (i + 1) + ' OF ' + TERMS.length + ' \u00b7 PULL TO ADVANCE';
            elCat.style.transform = 'rotate(' + (-3 + Math.random() * 2.5).toFixed(1) + 'deg)';
        }
        function step(dir) {
            card.classList.add('jt-fading');
            setTimeout(function () {
                i = (i + dir + TERMS.length) % TERMS.length;
                render();
                card.classList.remove('jt-fading');
            }, 240);
        }
        mount.querySelector('#jt-lex-next').addEventListener('click', function () { step(1); });
        mount.querySelector('#jt-lex-prev').addEventListener('click', function () { step(-1); });
        render();
    }

    function init() {
        var mounts = document.querySelectorAll('.jt-lex-mount');
        for (var i = 0; i < mounts.length; i++) {
            if (!mounts[i].getAttribute('data-built')) {
                mounts[i].setAttribute('data-built', '1');
                buildLexicon(mounts[i]);
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}());
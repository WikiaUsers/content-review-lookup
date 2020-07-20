/* Cualquier código JavaScript escrito aquí se cargará para todos los usuarios en cada carga de página. */
//<pre>
{{MediaWiki:Common.js/Clases/UtilityTools.js}}
 
var $UT = UtilityTools;
if (!window.$G){
        window.$G = $UT.get;
}
 
// Datos para scripts que se cargan de forma as�ncrona:
var postloadFunctionData = {
        'charinsert': {
                "MediaWiki": [ '\x7E\x7E\x7E\x7E', ['\x7B{','}}'], ['[[',']]'], ['[[Categor�a:',']]'], ['#REDIRECCI�N [[',']]'], ['<ref>','</ref>'], '<references />', ['<includeonly>','</includeonly>'], ['<noinclude>','</noinclude>'], ['<nowiki>','</nowiki>'], ['<gallery>','</gallery>'], ['<tt>','</tt>'], '\x7B{PAGENAME}}', ['\x7B{subst:t|','}}'] ],
                "Japon�s - Katakana": ['&#12450;','&#12449;','&#12452;','&#12451;','&#12454;','&#12532;','&#12453;','&#12456;','&#12455;','&#12458;','&#12457;','&#12459;','&#12460;','&#12461;','&#12462;','&#12463;','&#12464;','&#12465;','&#12466;','&#12467;','&#12468;','&#12469;','&#12470;','&#12471;','&#12472;','&#12473;','&#12474;','&#12475;','&#12476;','&#12477;','&#12478;','&#12479;','&#12480;','&#12481;','&#12482;','&#12484;','&#12485;','&#12483;','&#12486;','&#12487;','&#12488;','&#12489;','&#12490;','&#12491;','&#12492;','&#12493;','&#12494;','&#12495;','&#12496;','&#12497;','&#12498;','&#12499;','&#12500;','&#12501;','&#12502;','&#12503;','&#12504;','&#12505;','&#12506;','&#12507;','&#12508;','&#12509;','&#12510;','&#12511;','&#12512;','&#12513;','&#12514;','&#12516;','&#12515;','&#12518;','&#12517;','&#12520;','&#12519;','&#12521;','&#12522;','&#12523;','&#12524;','&#12525;','&#12527;','&#12535;','&#12528;','&#12536;','&#12529;','&#12537;','&#12530;','&#12538;','&#12531;','&#12289;','&#12290;',['&#12300;','&#12301;'],['&#12302;','&#12303;'],'&#12445;','&#12446;','&#12293;','&#12541;','&#12542;'],
                "Japon�s - R\u014Dmaji": ['&#256;','&#257;','&#274;','&#275;','&#298;','&#299;','&#332;','&#333;','&#362;','&#363;'],
                "Alfabeto fon�tico": ['&#616;','&#649;','&#623;','&#618;','&#655;','&#650;','�','&#600;','&#629;','&#612;','&#601;','&#603;','�','&#604;','&#606;','&#652;','&#596;','�','&#592;','&#630;','&#593;','&#594;','&#602;','&#605;','&#688;','&#689;','&#690;','&#692;','&#695;','&#734;','&#736;','&#740;','&#700;','&#712;','&#716;','&#720;','&#721;','.','&#648;','&#598;','&#607;','&#610;','&#660;','&#625;','&#627;','&#626;','&#331;','&#628;','&#665;','&#640;','&#638;','&#637;','&#632;','&#946;','&#952;','�','&#643;','&#658;','&#642;','&#656;','&#669;','&#611;','&#967;','&#641;','&#295;','&#661;','&#614;','&#620;','&#622;','&#651;','&#633;','&#635;','&#624;','&#621;','&#654;','&#671;','&#653;','&#613;','&#668;','&#674;','&#673;','&#597;','&#657;','&#634;','&#615;','&#609;','&#619;'],
                "Plantillas de licencias": [['\x7B{Art Oficial|','}}'], '\x7B{CC-BY}}', '\x7B{CC-BY}}', '\x7B{CC-SA}}', '\x7B{CC-BY-SA}}', '\x7B{Car�tula}}', '\x7B{Fair use}}', ['\x7B{Fanart|','}}'], '\x7B{GFDL}}', '\x7B{Imagen de Sugimori}}', '\x7B{Imagen de commons}}', '\x7B{LAL}}', '\x7B{PD}}', '\x7B{Pok�mon sprite}}', '\x7B{Scan}}', '\x7B{ScreenshotJuego}}', '\x7B{ScreenshotTV}}'],
                "Categor�as de im�genes": ['[[Categor�a:Sprites de Pok�mon Rojo y Azul]]', '[[Categor�a:Sprites de Pok�mon Verde]]', '[[Categor�a:Sprites de Pok�mon Amarillo]]', '[[Categor�a:Sprites de espaldas de la primera generaci�n]]', '[[Categor�a:Sprites de Pok�mon Oro]]', '[[Categor�a:Sprites brillantes de Pok�mon Oro]]', '[[Categor�a:Sprites de Pok�mon Plata]]', '[[Categor�a:Sprites brillantes de Pok�mon Plata]]', '[[Categor�a:Sprites de Pok�mon Cristal]]', '[[Categor�a:Sprites brillantes de Pok�mon Cristal]]', '[[Categor�a:Sprites de espaldas de la segunda generaci�n]]', '[[Categor�a:Sprites brillantes de espaldas de la segunda generaci�n]]', '[[Categor�a:Sprites de Pok�mon Rub� y Zafiro]]', '[[Categor�a:Sprites brillantes de Pok�mon Rub� y Zafiro]]', '[[Categor�a:Sprites de Pok�mon Esmeralda]]', '[[Categor�a:Sprites brillantes de Pok�mon Esmeralda]]', '[[Categor�a:Sprites de Pok�mon Rojo Fuego y Verde Hoja]]', '[[Categor�a:Sprites brillantes de Pok�mon Rojo Fuego y Verde Hoja]]', '[[Categor�a:Sprites de espaldas de la tercera generaci�n]]', '[[Categor�a:Sprites brillantes de espaldas de la tercera generaci�n]]', '[[Categor�a:Sprites de Pok�mon Diamante y Perla]]', '[[Categor�a:Sprites brillantes de Pok�mon Diamante y Perla]]', '[[Categor�a:Sprites de Pok�mon Platino]]', '[[Categor�a:Sprites brillantes de Pok�mon Platino]]', '[[Categor�a:Sprites de espaldas de la cuarta generaci�n]]', '[[Categor�a:Sprites brillantes de espaldas de la cuarta generaci�n]]', '[[Categor�a:Iconos de Pok�mon de la primera generaci�n]]', '[[Categor�a:Iconos de Pok�mon de la segunda generaci�n]]', '[[Categor�a:Iconos de Pok�mon de la tercera generaci�n]]', '[[Categor�a:Iconos de Pok�mon de la cuarta generaci�n]]'],
                "Im�genes para tipos": ['\x7B{subst:t|Acero}}', '\x7B{subst:t|Agua}}', '\x7B{subst:t|Bicho}}', '\x7B{subst:t|Drag�n}}', '\x7B{subst:t|El�ctrico}}', '\x7B{subst:t|Fantasma}}', '\x7B{subst:t|Fuego}}', '\x7B{subst:t|Hielo}}', '\x7B{subst:t|Lucha}}', '\x7B{subst:t|Normal}}', '\x7B{subst:t|Planta}}', '\x7B{subst:t|Ps�quico}}', '\x7B{subst:t|Roca}}', '\x7B{subst:t|Siniestro}}', '\x7B{subst:t|Tierra}}', '\x7B{subst:t|Veneno}}', '\x7B{subst:t|Volador}}']
        }
};
 
$(function() {
        if ($UT.get('editform') || $UT.get('mw-upload-form')){
                importScript('MediaWiki:Common.js/Clases/CharInsert.js');
        }
});
 
//</pre>
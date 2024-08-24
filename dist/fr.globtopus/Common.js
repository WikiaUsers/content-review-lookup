/*eslint-env jquery*/
/*jslint browser: true*/
/*eslint-env browser*/
/*global $*/
 /******************************************/
 /* Switch theme clair/sombre avec mémoire */
 /******************************************/
if (typeof (localStorage) === 'undefined') {
 document.getElementById("result").innerHTML = 'Your browser does not support HTML5 localStorage. Try upgrading.';
} else {
 if (localStorage.getItem("fav") !== null) {
  getFav = localStorage.fav;
  $("#gdex-page").addClass('gdex-dark');
  $('.gdex-header-btns,.gdex-infobox-container,.gdex-infobox-footer,.gdex-infobox-container,gdex-infobox-footer,.gdex-box-container').addClass('gdex-darker');
 }
}
$(document).ready(function () {
 $('#switcher').on('click', function () {
  getFav = localStorage.fav;
  $("#gdex-page").toggleClass('gdex-dark');
  $('.gdex-header-btns,.gdex-infobox-container,.gdex-infobox-footer,.gdex-infobox-container,gdex-infobox-footer,.gdex-box-container').toggleClass('gdex-darker');
  if ($("#gdex-page").hasClass('gdex-dark')) {
   localStorage.setItem('fav', 'gdex-dark', 'gdex-darker');
  } else {
   localStorage.removeItem('fav');
  }
 });
});
(function () {
 'use strict';
 $('#switcher').click(function () {
  var $this = $(this);
  if ($this.hasClass('gdex-darker')) {
   $this.text('Clair');
  } else {
   $this.text('Sombre');
  }
 });
  /********************************/
 /*  Ancien switch sans mémoire  */
 /********************************/
 $('.switcher').click(function () {
  $('.Infobox-Deco').toggleClass('boxshad2 Darkbk Darktx');
  $('.Box1-Deco').toggleClass('boxshad2');
  $('.Box1-Cont').toggleClass('Darktx');
  $('.Box1-Back,.Head-PageSize,.Head-B1Size,.Head-B2Size').toggleClass('Darkbk Darktx');
  $('.Head-B1Size,.Head-B2Size').toggleClass('Darksd');
  $('.Box1-Sub').toggleClass('Box1-Sub2');
  $('.Box1-Back').toggleClass('Box1-Back2');
  $('.Head-Shad').toggleClass('Head-Shad2');
  $('.Head-Size').toggleClass('Head-Size2');
  $('.Infobox-Head,.IMGbox-Head').toggleClass('Darkhd');
  $('.switcher').toggleClass('switcher2');
 });
 /*******************************************/
 /* Tous les boutons du slider de l'accueil */
 /*******************************************/
 $('#NavCat').click(function () {
  $('#NavCat').toggleClass('Lum');
  $('#NavsubCat').toggle();
  $('#NavsubChroniques,#NavsubWebseries,#NavsubJDR,#NavsubGlobtopus').hide();
  $('#NavChroniques,#NavWebseries,#NavJDR,#NavGlobtopus').removeClass('Lum');
 });
 $('#NavChroniques').click(function () {
  $('#NavChroniques').toggleClass('Lum');
  $('#NavsubChroniques').toggle();
  $('#NavsubCat,#NavsubWebseries,#NavsubJDR,#NavsubGlobtopus').hide();
  $('#NavCat,#NavWebseries,#NavJDR,#NavGlobtopus').removeClass('Lum');
 });
 $('#NavWebseries').click(function () {
  $('#NavWebseries').toggleClass('Lum');
  $('#NavsubWebseries').toggle();
  $('#NavsubCat,#NavsubChroniques,#NavsubJDR,#NavsubGlobtopus').hide();
  $('#NavCat,#NavChroniques,#NavJDR,#NavGlobtopus').removeClass('Lum');
 });
 $('#NavJDR').click(function () {
  $('#NavJDR').toggleClass('Lum');
  $('#NavsubJDR').toggle();
  $('#NavsubCat,#NavsubChroniques,#NavsubWebseries,#NavsubGlobtopus').hide();
  $('#NavCat,#NavChroniques,#NavWebseries,#NavGlobtopus').removeClass('Lum');
 });
 $('#NavGlobtopus').click(function () {
  $('#NavGlobtopus').toggleClass('Lum');
  $('#NavsubGlobtopus').toggle();
  $('#NavsubCat,#NavsubChroniques,#NavsubWebseries,#NavsubJDR').hide();
  $('#NavCat,#NavChroniques,#NavWebseries,#NavJDR').removeClass('Lum');
 });
 $('#NavYoutube').click(function () {
  $('#NavsubYoutube').toggle('200');
  $('#NavsubLiens').hide(function () {
   $(this).delay('60');
  });
 });
 $('#NavLiens').click(function () {
  $('#NavsubLiens').toggle('200');
  $('#NavsubYoutube').hide(function () {
   $(this).delay('60');
  });
 });
 $('#BC1').mouseenter(function () {
  $('#SubBC1').show('200');
  $('#SubBC2,#SubBC3,#SubBC4,#SubBC5,#SubBC6').hide(function () {
   $(this).delay('60');
  });
 });
 $('#BC2').mouseenter(function () {
  $('#SubBC2').show('200');
  $('#SubBC1,#SubBC3,#SubBC4,#SubBC5,#SubBC6').hide(function () {
   $(this).delay('60');
  });
 });
 $('#BC3').mouseenter(function () {
  $('#SubBC3').show('200');
  $('#SubBC2,#SubBC1,#SubBC4,#SubBC5,#SubBC6').hide(function () {
   $(this).delay('60');
  });
 });
 $('#BC4').mouseenter(function () {
  $('#SubBC4').show('200');
  $('#SubBC2,#SubBC3,#SubBC1,#SubBC5,#SubBC6').hide(function () {
   $(this).delay('60');
  });
 });
 $('#BC5').mouseenter(function () {
  $('#SubBC5').show('200');
  $('#SubBC2,#SubBC3,#SubBC4,#SubBC1,#SubBC6').hide(function () {
   $(this).delay('60');
  });
 });
 $('#BC6').mouseenter(function () {
  $('#SubBC6').show('200');
  $('#SubBC2,#SubBC3,#SubBC4,#SubBC5,#SubBC1').hide(function () {
   $(this).delay('60');
  });
 });
 $('#BW1').mouseenter(function () {
  $('#SubBW1').show('200');
  $('#SubBW2,#SubBW3,#SubBW4').hide(function () {
   $(this).delay('60');
  });
 });
 $('#BW2').mouseenter(function () {
  $('#SubBW2').show('200');
  $('#SubBW1,#SubBW3,#SubBW4').hide(function () {
   $(this).delay('60');
  });
 });
 $('#BW3').mouseenter(function () {
  $('#SubBW3').show('200');
  $('#SubBW2,#SubBW1,#SubBW4').hide(function () {
   $(this).delay('60');
  });
 });
 $('#BW4').mouseenter(function () {
  $('#SubBW4').show('200');
  $('#SubBW2,#SubBW3,#SubBW1').hide(function () {
   $(this).delay('60');
  });
 });
 $('#BJ1').mouseenter(function () {
  $('#SubBJ1').show('200');
  $('#SubBJ2,#SubBJ3,#SubBJ4,#SubBCJ5,#SubBJ6').hide(function () {
   $(this).delay('60');
  });
 });
 $('#BJ2').mouseenter(function () {
  $('#SubBJ2').show('200');
  $('#SubBJ1,#SubBJ3,#SubBJ4,#SubBJ5,#SubBJ6').hide(function () {
   $(this).delay('60');
  });
 });
 $('#BJ3').mouseenter(function () {
  $('#SubBJ3').show('200');
  $('#SubBJ2,#SubBJ1,#SubBJ4,#SubBJ5,#SubBJ6').hide(function () {
   $(this).delay('60');
  });
 });
 $('#BJ4').mouseenter(function () {
  $('#SubBJ4').show('200');
  $('#SubBJ2,#SubBJ3,#SubBJ1,#SubBJ5,#SubBJ6').hide(function () {
   $(this).delay('60');
  });
 });
 $('#BJ5').mouseenter(function () {
  $('#SubBJ5').show('200');
  $('#SubBJ2,#SubBJ3,#SubBJ4,#SubBJ1,#SubBJ6').hide(function () {
   $(this).delay('60');
  });
 });
 $('#BJ6').mouseenter(function () {
  $('#SubBJ6').show('200');
  $('#SubBJ2,#SubBJ3,#SubBJ4,#SubBJ1,#SubBJ5').hide(function () {
   $(this).delay('60');
  });
 });
 /*****************/
 /* Divers import */
 /*****************/
 window.AddRailModule = [{prepend: true}];
 window.YoutubePlayerDisableAutoplay = true;
 window.SpoilerAlertJS = {
  question: 'Je suis un fier rempart de Globtopia dont la mission est de te protéger des spoilers de cette zone. Veux-tu ouvrir la porte et les affronter courageusement? ',
  yes: 'Oui. Je veux les voir.',
  no: 'Non.. je ne suis pas prêt.',
  fadeDelay: 1000
 };
 window.MassCategorizationGroups = ['sysop', 'content-moderator'];
}()); //use strict
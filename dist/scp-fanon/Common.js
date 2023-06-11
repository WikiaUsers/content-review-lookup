/************************************************************************/
/* Any JavaScript here will be loaded for all users on every page load. */
/************************************************************************/



/* SIMON LOVELACE'S FINE GAME SECTION. DO NOT ALTER THIS. */
// svg symbol for ETS Waves
for (var i = 0; i < document.getElementsByClassName("Ets-Wave").length; i++) {
	var svg = '<svg version="1.0" width="50px" height="50px" viewBox="0 0 1324.000000 1229.000000" preserveAspectRatio="xMidYMid meet">\n<g transform="translate(0.000000,1229.000000) scale(0.100000,-0.100000)" fill="#e6e6e6" stroke="#e6e6e6">\n',
		path = '<path d="M6100 8447 c0 -2636 1 -2585 -56 -2867 -108 -539 -378 -904 -791\n-1070 -240 -97 -549 -114 -790 -44 -326 94 -545 323 -647 676 -62 215 -60 150\n-63 1771 l-4 1477 -389 0 -390 0 0 -1467 c0 -888 4 -1525 10 -1613 34 -488\n168 -826 431 -1089 253 -252 562 -384 989 -422 395 -35 771 37 1028 198 202\n126 479 409 589 602 38 67 63 91 94 91 53 0 54 -12 30 -228 -38 -346 -41 -454\n-41 -1619 l0 -1143 390 0 390 0 0 2248 c0 2239 3 2419 35 2637 84 563 326 946\n720 1143 92 46 237 91 349 109 136 21 388 13 499 -16 435 -115 680 -432 742\n-958 13 -108 15 -350 15 -1555 l0 -1428 390 0 390 0 0 1488 c0 937 -4 1538\n-10 1623 -38 489 -181 831 -457 1089 -294 275 -663 402 -1163 402 -392 -1\n-670 -76 -915 -250 -95 -67 -332 -301 -395 -389 -25 -35 -70 -105 -101 -155\n-49 -80 -60 -93 -86 -96 -53 -5 -58 12 -44 161 26 286 31 580 31 1825 l0 1292\n-390 0 -390 0 0 -2423z" stroke-linecap="round" stroke-width="0"/></g></svg>';
	var complete_svg = svg + path;
    document.getElementsByClassName("Ets-Wave")[i].innerHTML = complete_svg;
}
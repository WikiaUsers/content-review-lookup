/**
 * Place <div id="hi3-dye-tool"></div> on a page and this builds the tool
 * inside it.
 */
( function () {
'use strict';
if ( window.hi3DyeToolLoaded ) { return; }
window.hi3DyeToolLoaded = true;

/* ---- ingredient constants: [hue degrees, saturation per unit, darkening per unit] ---- */
var ING = {
  "Acorn":[0,0,2], "Aridberry":[270,10,5], "Basil":[111,10,5], "Beet":[348,10,5],
  "Bird of Paradise":[336,5,0], "Black Nightshade Flower":[0,0,5], "Blackberry":[0,0,10],
  "Blueberry":[240,10,0], "Bluebonnet Flower":[230,5,0], "Carrot":[27,10,5],
  "Cineraria Flower":[210,5,0], "Cloudberry":[30,10,5], "Coal":[0,0,20],
  "Cranberry":[7,10,5], "Crystal Flower":[190,10,0], "Dandelion":[55,5,0],
  "Desert Rose":[25,5,0], "Dragonblood Sap":[2,50,10], "Fire Flower":[345,10,0],
  "Frangipanis Flower":[310,2,0], "Gerbera Daisy":[43,5,0], "Grape Bundle":[335,10,5],
  "Hellebore Flower":[100,5,0], "Iceberry":[180,10,5], "Kelp":[106,10,5],
  "Lemon":[60,10,5], "Liatris Flower":[280,5,0], "Lime":[80,10,5], "Lotus Flower":[63,7,0],
  "Mango":[57,10,5], "Mint":[122,10,5], "Morel Mushroom":[41,3,2], "Mulberry":[290,7,7],
  "Mullein Flower":[47,5,0], "Olive":[72,2,2], "Oozeberry":[130,10,5], "Orange":[33,10,5],
  "Pansy":[165,5,0], "Pimpernel Flower":[15,5,0], "Pineapple":[52,10,5],
  "Pink Zinnia":[320,5,0], "Plum":[285,10,5], "Poppy":[38,5,0], "Raspberry":[0,10,0],
  "Red Rose":[355,5,0], "Saffron":[32,5,0], "Seaberry":[65,10,5],
  "Spiderwort Flower":[263,5,0], "Spinach":[115,10,10], "Star Flower":[200,5,0],
  "Strawberry":[5,10,5], "Sulfur":[51,5,0], "Water Iris":[300,5,0]
};

var RAD = Math.PI / 180, COS = {}, SIN = {}, NAMES = [], COL = [], DRK = [];
for ( var n in ING ) {
  if ( !Object.prototype.hasOwnProperty.call( ING, n ) ) { continue; }
  COS[ n ] = Math.cos( ING[ n ][ 0 ] * RAD );
  SIN[ n ] = Math.sin( ING[ n ][ 0 ] * RAD );
  NAMES.push( n );
  ( ING[ n ][ 1 ] > 0 ? COL : DRK ).push( n );
}
NAMES.sort();

/* ---- the dye model ----------------------------------------------------- */

/* Saturation is vector addition on the hue circle, not a running total. What
   two disagreeing ingredients cancel comes off the brightness instead, which
   is why opposite hues make mud rather than a bright color in between. */
function mix( c ) {
  var x = 0, y = 0, total = 0, dark = 0, k, w;
  for ( k in c ) {
    if ( !Object.prototype.hasOwnProperty.call( c, k ) || !ING[ k ] ) { continue; }
    w = ING[ k ][ 1 ] * c[ k ];
    total += w;
    dark += ING[ k ][ 2 ] * c[ k ];
    x += w * COS[ k ];
    y += w * SIN[ k ];
  }
  var mag = Math.sqrt( x * x + y * y );
  var H = Math.atan2( y, x ) / RAD;
  if ( H < 0 ) { H += 360; }
  /* 99 only when nothing in the pot has a hue at all. Colored ingredients that
     cancel each other exactly still start from 100 - confirmed in game. */
  var base = total > 0 ? 100 : 99;
  return {
    H: H,
    S: Math.min( 100, mag ),
    V: Math.max( 0, Math.min( 100, base - ( total - mag ) - dark ) )
  };
}

function hsv2rgb( H, S, V ) {
  H = ( H % 360 + 360 ) % 360;
  S /= 100;
  V /= 100;
  var i = Math.floor( H / 60 ), f = H / 60 - i;
  var p = V * ( 1 - S ), q = V * ( 1 - S * f ), t = V * ( 1 - S * ( 1 - f ) );
  var r = [ [ V, t, p ], [ q, V, p ], [ p, V, t ], [ p, q, V ], [ t, p, V ], [ V, p, q ] ][ i % 6 ];
  /* round half up, which is what the game does - not the banker's rounding
     most languages default to */
  return [
    Math.floor( r[ 0 ] * 255 + 0.5 + 1e-9 ),
    Math.floor( r[ 1 ] * 255 + 0.5 + 1e-9 ),
    Math.floor( r[ 2 ] * 255 + 0.5 + 1e-9 )
  ];
}
function hx2( v ) { return ( v < 16 ? '0' : '' ) + v.toString( 16 ); }
function toHex( c ) { return '#' + hx2( c[ 0 ] ) + hx2( c[ 1 ] ) + hx2( c[ 2 ] ); }
function mixHex( c ) { var m = mix( c ); return toHex( hsv2rgb( m.H, m.S, m.V ) ); }

function parseHex( s ) {
  s = String( s ).trim().replace( /^#/, '' );
  if ( /^[0-9a-fA-F]{3}$/.test( s ) ) {
    s = s[ 0 ] + s[ 0 ] + s[ 1 ] + s[ 1 ] + s[ 2 ] + s[ 2 ];
  }
  if ( !/^[0-9a-fA-F]{6}$/.test( s ) ) { return null; }
  return [ parseInt( s.slice( 0, 2 ), 16 ), parseInt( s.slice( 2, 4 ), 16 ), parseInt( s.slice( 4, 6 ), 16 ) ];
}
function rgb2hsv( r, g, b ) {
  r /= 255; g /= 255; b /= 255;
  var mx = Math.max( r, g, b ), mn = Math.min( r, g, b ), d = mx - mn, H = 0;
  if ( d ) {
    H = mx === r ? 60 * ( ( ( g - b ) / d ) % 6 )
      : mx === g ? 60 * ( ( b - r ) / d + 2 )
      : 60 * ( ( r - g ) / d + 4 );
  }
  if ( H < 0 ) { H += 360; }
  return { H: H, S: ( mx ? d / mx : 0 ) * 100, V: mx * 100 };
}
/* Distance between two colors, weighted so it tracks what the eye notices
   rather than treating every channel alike: green counts heaviest, and red and
   blue shift weight with how bright the pair is. This is the same measure the
   full Dye Bench uses, so a recipe carries the same Exact / very close /
   nearest label in both tools. Straight RGB distance would rank a green step
   as equal to a blue one, which does not match how the miss actually looks. */
function dist( a, b ) {
  var rm = ( a[ 0 ] + b[ 0 ] ) / 2;
  var dr = a[ 0 ] - b[ 0 ], dg = a[ 1 ] - b[ 1 ], db = a[ 2 ] - b[ 2 ];
  return Math.sqrt( ( 2 + rm / 256 ) * dr * dr + 4 * dg * dg +
                    ( 2 + ( 255 - rm ) / 256 ) * db * db );
}

/* ---- is a color reachable at all? -------------------------------------- */

/* The brightest a recipe can be at a given hue and saturation. Every unit of
   push costs a unit of brightness, plus whatever darkening it carries, so the
   cheapest way to a hue is what sets the ceiling. Only ever needs one or two
   colored ingredients, so checking pairs is exact rather than a guess. */
function maxValue( H, S ) {
  var best, i, j, A, B, gap, sa, sb, g, na, nb, u, v, w;
  if ( S <= 0.5 ) {                                   // a gray: two routes to it
    best = -1;
    for ( i = 0; i < DRK.length; i++ ) {              // a colorless ingredient alone
      best = Math.max( best, 99 - ING[ DRK[ i ] ][ 2 ] );
    }
    for ( i = 0; i < COL.length; i++ ) {              // or two exact opposites
      for ( j = i + 1; j < COL.length; j++ ) {
        A = COL[ i ]; B = COL[ j ];
        gap = Math.abs( ING[ A ][ 0 ] - ING[ B ][ 0 ] ) % 360;
        if ( Math.min( gap, 360 - gap ) !== 180 ) { continue; }
        sa = ING[ A ][ 1 ]; sb = ING[ B ][ 1 ];
        u = sa; v = sb;
        while ( v ) { w = u % v; u = v; v = w; }
        g = u; na = sb / g; nb = sa / g;               // smallest equal pushes
        best = Math.max( best, 100 - ( sa * na + sb * nb ) - ( ING[ A ][ 2 ] * na + ING[ B ][ 2 ] * nb ) );
      }
    }
    return best;
  }
  var th = H * RAD, tx = S * Math.cos( th ), ty = S * Math.sin( th );
  best = Infinity;
  for ( i = 0; i < COL.length; i++ ) {
    A = COL[ i ];
    var ax = COS[ A ], ay = SIN[ A ], ca = 1 + ING[ A ][ 2 ] / ING[ A ][ 1 ];
    if ( Math.abs( ax * ty - ay * tx ) < 1e-9 && ( ax * tx + ay * ty ) > 0 ) {
      best = Math.min( best, Math.sqrt( tx * tx + ty * ty ) * ca );
    }
    for ( j = i + 1; j < COL.length; j++ ) {
      B = COL[ j ];
      var bx = COS[ B ], by = SIN[ B ], cb = 1 + ING[ B ][ 2 ] / ING[ B ][ 1 ];
      var det = ax * by - ay * bx;
      if ( Math.abs( det ) < 1e-9 ) { continue; }
      var wa = ( tx * by - ty * bx ) / det, wb = ( ax * ty - ay * tx ) / det;
      if ( wa < -1e-9 || wb < -1e-9 ) { continue; }
      best = Math.min( best, wa * ca + wb * cb );
    }
  }
  if ( !isFinite( best ) ) { return -1; }
  return 100 + S - best;
}
/* A hex only pins the color to within half a step per channel, and the ceiling
   can move sharply across that gap, so test the corners of that little box and
   accept the color if any point inside it is reachable. Erring generous is
   deliberate: telling someone a dye they just brewed is impossible is worse
   than staying quiet about a near miss. */
function reachable( rgb ) {
  var i, c, p, h, v, mid, mv, best = -Infinity, ok = false;
  for ( i = 0; i < 8; i++ ) {
    p = [ rgb[ 0 ] + ( i & 1 ? 0.5 : -0.5 ), rgb[ 1 ] + ( i & 2 ? 0.5 : -0.5 ), rgb[ 2 ] + ( i & 4 ? 0.5 : -0.5 ) ];
    for ( c = 0; c < 3; c++ ) { p[ c ] = Math.max( 0, Math.min( 255, p[ c ] ) ); }
    h = rgb2hsv( p[ 0 ], p[ 1 ], p[ 2 ] );
    v = maxValue( h.H, h.S );
    if ( v >= 0 && h.V <= v + 0.6 ) { ok = true; }
    if ( v > best ) { best = v; }
  }
  mid = rgb2hsv( rgb[ 0 ], rgb[ 1 ], rgb[ 2 ] );
  mv = maxValue( mid.H, mid.S );
  if ( mv >= 0 && mid.V <= mv + 0.6 ) { ok = true; }
  if ( mv > best ) { best = mv; }
  return { ok: ok, ceiling: best, S: mid.S, V: mid.V, H: mid.H };
}

/* ---- the finder --------------------------------------------------------- */

/* Every one- and two-color combination up to MAXN each, then a darkener chosen
   to land the brightness. Deliberately capped at two colors: it keeps this
   comfortably under a tenth of a second on a page a lot of people load. */
var MAXN = 20;
function search( target ) {
  var tg = rgb2hsv( target[ 0 ], target[ 1 ], target[ 2 ] );
  var pool = [];
  function consider( c ) {
    var m = mix( c ), rgb = hsv2rgb( m.H, m.S, m.V ), d = dist( rgb, target );
    if ( d > 80 ) { return; }   // in the weighted units above, ~2x the old plain-RGB cutoff
    var units = 0, k;
    for ( k in c ) { if ( Object.prototype.hasOwnProperty.call( c, k ) ) { units += c[ k ]; } }
    var copy = {};
    for ( k in c ) { if ( Object.prototype.hasOwnProperty.call( c, k ) ) { copy[ k ] = c[ k ]; } }
    pool.push( { counts: copy, hex: toHex( rgb ), d: d, units: units } );
  }
  function withDarkener( c, V ) {
    consider( c );
    if ( V <= tg.V + 0.5 ) { return; }
    for ( var q = 0; q < DRK.length; q++ ) {
      var dk = DRK[ q ], k = Math.round( ( V - tg.V ) / ING[ dk ][ 2 ] ), t;
      for ( t = k - 1; t <= k + 1; t++ ) {
        if ( t < 1 || t > MAXN ) { continue; }
        c[ dk ] = t; consider( c ); delete c[ dk ];
      }
    }
  }
  if ( tg.S < 4 ) {
    for ( var q = 0; q < DRK.length; q++ ) {
      for ( var k = 1; k <= MAXN; k++ ) {
        var cg = {}; cg[ DRK[ q ] ] = k; consider( cg );
      }
    }
  }
  var maxLost = Math.min( 100 - tg.V + 14, DRK.length ? 45 : 100 - tg.V + 14 );
  var maxTotal = tg.S + 100 - tg.V + 14 + ( tg.S > 99 ? 30 : 0 );
  var c = {};
  for ( var i = 0; i < COL.length; i++ ) {
    var A = COL[ i ], sa = ING[ A ][ 1 ];
    for ( var a = 1; a <= MAXN; a++ ) {
      var wa = sa * a, ax = wa * COS[ A ], ay = wa * SIN[ A ];
      c[ A ] = a;
      var ma = Math.sqrt( ax * ax + ay * ay );
      withDarkener( c, 100 - ( wa - ma ) );
      if ( wa - ma <= maxLost && wa <= maxTotal ) {
        for ( var j = i + 1; j < COL.length; j++ ) {
          var B = COL[ j ], sb = ING[ B ][ 1 ];
          for ( var b = 1; b <= MAXN; b++ ) {
            var wb = sb * b, tot = wa + wb;
            if ( tot > maxTotal ) { break; }
            var x = ax + wb * COS[ B ], y = ay + wb * SIN[ B ];
            var mg = Math.sqrt( x * x + y * y );
            if ( tot - mg > maxLost ) { continue; }
            var S = Math.min( 100, mg );
            if ( Math.abs( S - tg.S ) > 12 ) { continue; }
            if ( tg.S > 6 ) {
              var H = Math.atan2( y, x ) / RAD;
              if ( H < 0 ) { H += 360; }
              var dh = Math.abs( H - tg.H );
              if ( dh > 180 ) { dh = 360 - dh; }
              if ( dh > 16 ) { continue; }
            }
            c[ B ] = b;
            withDarkener( c, 100 - ( tot - mg ) );
            delete c[ B ];
          }
        }
      }
      delete c[ A ];
    }
  }
  pool.sort( function ( p, q2 ) { return ( p.d - q2.d ) || ( p.units - q2.units ); } );
  var seen = {}, out = [];
  for ( var z = 0; z < pool.length && out.length < 8; z++ ) {
    var r = pool[ z ], names = [], kk;
    for ( kk in r.counts ) { if ( Object.prototype.hasOwnProperty.call( r.counts, kk ) ) { names.push( kk ); } }
    names.sort();
    var key = names.map( function ( q3 ) { return q3 + ':' + r.counts[ q3 ]; } ).join( '|' );
    if ( seen[ key ] ) { continue; }
    seen[ key ] = 1;
    r.text = names.map( function ( q3 ) { return r.counts[ q3 ] + ' ' + q3; } ).join( ' + ' );
    out.push( r );
  }
  return out;
}

/* ---- interface ---------------------------------------------------------- */

var CSS =
'.hi3d{--hi3-line:rgba(127,127,127,.4);--hi3-fill:rgba(127,127,127,.09);' +
'border:1px solid var(--hi3-line);padding:12px;margin:12px 0;font-size:14px;line-height:1.5}' +
'.hi3d *{box-sizing:border-box}' +
'.hi3d h3{margin:0 0 8px;font-size:15px;border:0;padding:0}' +
'.hi3d-cols{display:flex;flex-wrap:wrap;gap:18px}' +
'.hi3d-col{flex:1 1 300px;min-width:0}' +
'.hi3d-bar{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:8px}' +
'.hi3d select,.hi3d input{font:inherit;font-size:13px;padding:4px 6px;border:1px solid var(--hi3-line);' +
'background:var(--hi3-fill);color:inherit;max-width:100%}' +
'.hi3d select{flex:1 1 140px;min-width:0}' +
'.hi3d input.hi3d-n{width:56px}' +
'.hi3d input.hi3d-hex{width:96px;font-family:monospace}' +
'.hi3d button{font:inherit;font-size:13px;padding:4px 10px;cursor:pointer;' +
'border:1px solid var(--hi3-line);background:var(--hi3-fill);color:inherit}' +
'.hi3d button:hover{border-color:currentColor}' +
'.hi3d button[disabled]{opacity:.5;cursor:default}' +
'.hi3d-rows{margin:0 0 8px;padding:0;list-style:none}' +
'.hi3d-rows li{display:flex;align-items:center;gap:8px;padding:2px 0}' +
'.hi3d-rows li .hi3d-lbl{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}' +
'.hi3d-x{border:0!important;background:none!important;padding:0 4px!important;opacity:.6}' +
'.hi3d-x:hover{opacity:1}' +
'.hi3d-out{display:flex;align-items:center;gap:10px;flex-wrap:wrap;' +
'border-top:1px solid var(--hi3-line);padding-top:8px;margin-top:4px}' +
'.hi3d-sw{width:34px;height:34px;border:1px solid var(--hi3-line);flex:none}' +
'.hi3d-hexout{font-family:monospace;font-size:15px}' +
'.hi3d-hsv{opacity:.7;font-size:12px}' +
'.hi3d-res{width:100%;border-collapse:collapse;font-size:13px}' +
'.hi3d-res td{padding:3px 6px 3px 0;border:0;vertical-align:middle}' +
'.hi3d-res tr+tr td{border-top:1px solid var(--hi3-line)}' +
'.hi3d-chip{width:20px;height:20px;display:block;flex:none;border:1px solid var(--hi3-line)}' +
'.hi3d-mono{font-family:monospace;white-space:nowrap}' +
'.hi3d-note{font-size:12px;opacity:.75;margin-top:8px}' +
'.hi3d-warn{font-size:13px;border-left:3px solid currentColor;padding:6px 10px;margin-top:8px;background:var(--hi3-fill)}' +
'@media(max-width:600px){.hi3d-cols{gap:14px}}';

function el( tag, cls, txt ) {
  var e = document.createElement( tag );
  if ( cls ) { e.className = cls; }
  if ( txt !== undefined ) { e.textContent = txt; }
  return e;
}

function build( host ) {
  host.textContent = '';
  host.className = ( host.className ? host.className + ' ' : '' ) + 'hi3d';

  var style = document.getElementById( 'hi3d-style' );
  if ( !style ) {
    style = el( 'style' );
    style.id = 'hi3d-style';
    style.appendChild( document.createTextNode( CSS ) );
    document.head.appendChild( style );
  }

  var cols = el( 'div', 'hi3d-cols' );
  var mixCol = el( 'div', 'hi3d-col' );
  var findCol = el( 'div', 'hi3d-col' );
  cols.appendChild( mixCol );
  cols.appendChild( findCol );
  host.appendChild( cols );

  /* ---- mixer ---- */
  mixCol.appendChild( el( 'h3', null, 'Mixer' ) );
  var bar = el( 'div', 'hi3d-bar' );
  var sel = el( 'select' );
  for ( var i = 0; i < NAMES.length; i++ ) {
    var o = el( 'option', null, NAMES[ i ] );
    o.value = NAMES[ i ];
    sel.appendChild( o );
  }
  var num = el( 'input', 'hi3d-n' );
  num.type = 'number'; num.min = '1'; num.max = '99'; num.value = '1';
  var add = el( 'button', null, 'Add' );
  add.type = 'button';
  var clear = el( 'button', null, 'Clear' );
  clear.type = 'button';
  bar.appendChild( sel ); bar.appendChild( num ); bar.appendChild( add ); bar.appendChild( clear );
  mixCol.appendChild( bar );

  var list = el( 'ul', 'hi3d-rows' );
  mixCol.appendChild( list );
  var out = el( 'div', 'hi3d-out' );
  var sw = el( 'span', 'hi3d-sw' );
  var hexOut = el( 'span', 'hi3d-hexout' );
  var hsvOut = el( 'span', 'hi3d-hsv' );
  out.appendChild( sw ); out.appendChild( hexOut ); out.appendChild( hsvOut );
  mixCol.appendChild( out );

  var counts = {};
  function draw() {
    list.textContent = '';
    var names = [], k;
    for ( k in counts ) { if ( Object.prototype.hasOwnProperty.call( counts, k ) ) { names.push( k ); } }
    names.sort();
    names.forEach( function ( nm ) {
      var li = el( 'li' );
      var chip = el( 'span', 'hi3d-chip' );
      chip.style.background = ING[ nm ][ 1 ] ? toHex( hsv2rgb( ING[ nm ][ 0 ], 100, 100 ) ) : 'transparent';
      var lbl = el( 'span', 'hi3d-lbl', counts[ nm ] + ' ' + nm );
      var x = el( 'button', 'hi3d-x', '×' );
      x.type = 'button';
      x.setAttribute( 'aria-label', 'Remove ' + nm );
      x.onclick = function () { delete counts[ nm ]; draw(); };
      li.appendChild( chip ); li.appendChild( lbl ); li.appendChild( x );
      list.appendChild( li );
    } );
    if ( !names.length ) {
      hexOut.textContent = '—';
      hsvOut.textContent = 'nothing in the pot';
      sw.style.background = 'transparent';
      return;
    }
    var m = mix( counts ), hex = toHex( hsv2rgb( m.H, m.S, m.V ) );
    sw.style.background = hex;
    hexOut.textContent = hex;
    hsvOut.textContent = 'H ' + Math.round( m.H ) + '  S ' + Math.round( m.S ) + '  V ' + Math.round( m.V );
  }
  add.onclick = function () {
    var nm = sel.value, k = parseInt( num.value, 10 );
    if ( !ING[ nm ] || !( k >= 1 ) ) { return; }
    counts[ nm ] = ( counts[ nm ] || 0 ) + Math.min( 99, k );
    draw();
  };
  clear.onclick = function () { counts = {}; draw(); };
  draw();

  /* ---- finder ---- */
  findCol.appendChild( el( 'h3', null, 'Find a color' ) );
  var fbar = el( 'div', 'hi3d-bar' );
  var hexIn = el( 'input', 'hi3d-hex' );
  hexIn.type = 'text';
  hexIn.value = '#7a4b8c';
  hexIn.setAttribute( 'aria-label', 'Target hex color' );
  hexIn.spellcheck = false;
  var peek = el( 'span', 'hi3d-sw' );
  var find = el( 'button', null, 'Find' );
  find.type = 'button';
  fbar.appendChild( hexIn ); fbar.appendChild( peek ); fbar.appendChild( find );
  findCol.appendChild( fbar );
  var warn = el( 'div' );
  findCol.appendChild( warn );
  var tbl = el( 'table', 'hi3d-res' );
  var tb = el( 'tbody' );
  tbl.appendChild( tb );
  findCol.appendChild( tbl );
  var note = el( 'div', 'hi3d-note' );
  findCol.appendChild( note );

  function showPeek() {
    var rgb = parseHex( hexIn.value );
    peek.style.background = rgb ? toHex( rgb ) : 'transparent';
  }
  function run() {
    var rgb = parseHex( hexIn.value );
    warn.textContent = '';
    warn.className = '';
    if ( !rgb ) {
      tb.textContent = '';
      note.textContent = 'That is not a hex color. Try something like #7a4b8c.';
      return;
    }
    showPeek();
    find.disabled = true;
    var prev = find.textContent;
    find.textContent = 'Searching…';
    /* let the button repaint before the search takes the thread */
    setTimeout( function () {
      try {
        var chk = reachable( rgb );
        if ( !chk.ok ) {
          warn.className = 'hi3d-warn';
          warn.textContent = chk.ceiling < 0
            ? 'This color cannot be made: nothing points at that hue.'
            : chk.S <= 0.5
              ? 'This color cannot be made. The brightest gray any recipe reaches is a value of ' +
                Math.max( 0, Math.round( chk.ceiling ) ) + ', and this one needs ' + Math.round( chk.V ) +
                '. Bleaching is the only way back to pure white.'
              : 'This color cannot be made. At that hue and saturation the brightest a recipe reaches is a value of ' +
                Math.max( 0, Math.round( chk.ceiling ) ) + ', and this one needs ' + Math.round( chk.V ) +
                '. The closest are below.';
        }
        var t0 = new Date().getTime();
        var res = search( rgb );
        var ms = new Date().getTime() - t0;
        tb.textContent = '';
        if ( !res.length ) {
          note.textContent = 'Nothing close turned up.';
          return;
        }
        res.forEach( function ( r ) {
          var tr = el( 'tr' );
          var td1 = el( 'td' );
          var chip = el( 'span', 'hi3d-chip' );
          chip.style.background = r.hex;
          td1.appendChild( chip );
          var td2 = el( 'td', null, r.text );
          var td3 = el( 'td', 'hi3d-mono', r.hex );
          var td4 = el( 'td', 'hi3d-mono', r.d < 3 ? 'exact' : r.d < 14 ? 'very close' : 'nearest' );
          td4.style.opacity = '.7';
          tr.appendChild( td1 ); tr.appendChild( td2 ); tr.appendChild( td3 ); tr.appendChild( td4 );
          tb.appendChild( tr );
        } );
        note.textContent = 'Every one- and two-color combination up to ' + MAXN +
          ' each, plus a darkener, in ' + ms + ' ms.';
      } finally {
        find.textContent = prev;
        find.disabled = false;
      }
    }, 16 );
  }
  find.onclick = run;
  hexIn.oninput = showPeek;
  hexIn.onkeydown = function ( e ) { if ( e.key === 'Enter' || e.keyCode === 13 ) { run(); } };
  showPeek();
  run();
}

function init() {
  var host = document.getElementById( 'hi3-dye-tool' );
  if ( host && !host.getAttribute( 'data-hi3d-ready' ) ) {
    host.setAttribute( 'data-hi3d-ready', '1' );
    build( host );
  }
}

if ( window.mw && window.mw.hook ) {
  window.mw.hook( 'wikipage.content' ).add( init );
} else if ( document.readyState === 'loading' ) {
  document.addEventListener( 'DOMContentLoaded', init );
} else {
  init();
}

}() );
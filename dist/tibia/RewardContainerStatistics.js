/*global $, mw*/
(function () {
'use strict';
var ajax_load_bar = new Image();
ajax_load_bar.src = "http://images3.wikia.nocookie.net/tibia/en/images/d/de/Ajax_Load_Bar.gif";

var reward_container_statistics_string = '';
var reward_container_statistics_string_comp = '';
var reward_container_statistics_obj = {};
var reward_container_statistics_basetimestamp;
var sysop = false;

var reward_container_statistics_init;
var sort_functions = {
  creature: function (a, b) {
    if (a === b) { return 0; }
    if (a.toLowerCase() > b.toLowerCase()) { return 1; }
    return -1;
  },
  times_desc: function (a, b) {
    return (b[1] - a[1]);
  }
};
var html_e = function (t) {
  var cmap = {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'};
  return String(t).replace(/[&<>"']/g, function (m) { return cmap[m]; });
};
var text_compress = function (contents) {
  contents = '__cs64' + LZString.compressToBase64(contents) + '__ce64';
  return contents;
};
var text_decompress = function (contents) {
  contents = contents.replace(/__cs64([\s\S]*?)__ce64/g, function (all, $1) {
    return LZString.decompressFromBase64($1);
  });
  return contents;
};

var numcs = function (n) { n = String(n); while ((/\d{4}/).test(n)) { n = n.replace(/(\d{3},|\d{3}$)/, ',$1'); } return n; };
var reward_container_statistics_merge = function (data, sort_by_occurrences) {
  $('#reward_container_statistics_block p').html('Processing<br /><br /><img src="http://images3.wikia.nocookie.net/tibia/en/images/d/de/Ajax_Load_Bar.gif" alt="Processing" />');
  if (sort_by_occurrences === undefined) { sort_by_occurrences = false; }

  var x, t = '', tmp, stats = {};
  var creature, loot, amount;
  data = data.split(/(?:\r\n|\r|\n){1,10}/g);
  for (x = 0; x < data.length; x++) {
    tmp = data[x].split('|');
    creature = tmp[0]; amount = parseFloat(tmp[1]); loot = tmp.slice(2).join('|');
    if (!stats.hasOwnProperty(creature)) { stats[creature] = {}; }
    if (!stats[creature].hasOwnProperty(loot)) { stats[creature][loot] = 0; }
    stats[creature][loot] += amount;
  }
  for (creature in stats) { if (stats.hasOwnProperty(creature)) {
    for (loot in stats[creature]) { if (stats[creature].hasOwnProperty(loot)) {
      t += creature + '|' + stats[creature][loot] + '|' + loot + '\n';
    } }
  } }
  return [$.trim(t), stats];
};

var reward_container_statistics_end = function (msg, action) {
  $('#reward_container_statistics_block').fadeOut(500, function () {
    if (msg) { alert(msg); }
  });
  if (action) {
    if (action === 1) { $('#reward_container_statistics_up').prop({disabled: false}); }
    if (action === 2) { $('#reward_container_statistics_l').prop({disabled: false}); }
  }
};

var reward_container_statistics_table_toggle = function (e) {
  e.preventDefault();
  $(this).html($(this).html().indexOf('Show') === -1 ? 'Show' : 'Hide');
  $(this).nextAll('table:first').add($(this).nextAll('a:first')).toggle();
};
var reward_container_statistics_table_up = function (e) {
  e.preventDefault();
  $('html, body').scrollTop($(this).prevAll('a:first').offset().top);
};
var reward_container_statistics_generator_gen = function () {
  $('#reward_container_statistics_block p').html('Processing<br /><br /><img src="http://images3.wikia.nocookie.net/tibia/en/images/d/de/Ajax_Load_Bar.gif" alt="Processing" />');
  $('#reward_container_statistics_block').fadeTo(400, 0.8, function () {
    var stats = reward_container_statistics_obj;
    var html = '';
    $('#reward_container_statistics_tables').empty();
    $('#reward_container_statistics_generator_sel option:selected').each(function () {
      var creature = $(this).val(), tmp;
      var i, loot_list = [], loot, amount, times;
      for (loot in stats[creature]) { if (stats[creature].hasOwnProperty(loot)) { loot_list.push([loot, stats[creature][loot]]); } }
      loot_list.sort(sort_functions.times_desc);
      times = 0;
      tmp = '<table class="reward_container_statistics wikitable sortable" style="display:none;"><tr><th>Times</th><th>Loot</th></tr>';
      for (i = 0; i < loot_list.length; i++) {
        amount = loot_list[i][1];
        tmp += '<tr><td style="vertical-align: top;">' + amount + '</td><td>' + html_e(loot_list[i][0].replace(/\*/g, ' ').replace(/\|/g, ', ')) + '</td></tr>';
        times += amount;
      }
      tmp += '</table>';
      html += '<br />' + html_e(creature) + ' ' + ' (<b>' + times + '</b> times)' + ' - ' +
        '<a href="#" class="reward_container_statistics_table_toggle">Show</a>' +
        tmp +
        '<a href="#" class="reward_container_statistics_table_up" style="display:none;">up</a>';
    });
    if (html) {
      $('#reward_container_statistics_tables').append(html);
      $('#reward_container_statistics_tables .reward_container_statistics_table_up').click(reward_container_statistics_table_up);
      $('#reward_container_statistics_tables .reward_container_statistics_table_toggle').click(reward_container_statistics_table_toggle);
      try {
        mw.loader.using('jquery.tablesorter', function () {
          $('table.sortable.reward_container_statistics').not('.jquery-tablesorter').tablesorter();
        });
      } catch (ignore) {}
    }
    else { $('#reward_container_statistics_tables').html('<br />Nothing to show with the current selection'); }
    reward_container_statistics_end();
  });
};
var reward_container_statistics_generator_init = function () {
  var creature, creature_list = [];
  var i = 0, options = '';
  var stats = reward_container_statistics_obj;
  for (creature in stats) { if (stats.hasOwnProperty(creature)) { creature_list.push(creature); } }
  creature_list.sort(sort_functions.creature);
  for (i = 0; i < creature_list.length; i++) {
    options += '<option value="' + html_e(creature_list[i]) + '">' + html_e(creature_list[i]) + '</option>';
  }
  $('#reward_container_statistics_generator').empty().append(
    $('<table>', {'class': 'wikitable'}).append($('<tr>').append(
      $('<td>', {style: 'vertical-align:top;padding:5px 20px;'}).append(
        'Creatures to include, use control+click to multi select<br />',
        $('<a />', {href: '#'}).html('Select all')
        .click(function (e) {
          e.preventDefault();
          $('#reward_container_statistics_generator_sel').find('option').prop({selected: true});
        }),
        '<br />',
        $('<select>', {id: 'reward_container_statistics_generator_sel', multiple: 'multiple'}).attr({size: 12})
        .css({width: '100%'}).html(options)
      )
    )),
    '<br />',
    $('<input>', {type: 'button', value: 'Generate tables'}).click(reward_container_statistics_generator_gen),
    '<hr />',
    $('<div></div>', {id: 'reward_container_statistics_tables'})
  );
};

var reward_container_statistics_upload = function (success_callback) {
  $('#reward_container_statistics_up').prop({disabled: true});
  $('#reward_container_statistics_block p').html('Uploading<br /><br /><img src="http://images3.wikia.nocookie.net/tibia/en/images/d/de/Ajax_Load_Bar.gif" alt="Uploading" />');
  $('#reward_container_statistics_block').fadeTo(400, 0.8);
  var upload_stats = function () {
    var errort = 'There was an error uploading, try again';
    $.ajax({
      url: '/api.php', type: 'POST', dataType: 'json',
      data: {
        action: 'edit', title: 'TibiaWiki:Reward_Container_Statistics/Statistics', format: 'json',
        summary: 'merging/compressing', text: reward_container_statistics_string_comp,
        token: mw.user.tokens.get('editToken'), basetimestamp: reward_container_statistics_basetimestamp, minor: 'minor'
      },
      error: function () { reward_container_statistics_end(errort, 2); },
      success: function (obj) {
        if (obj && obj.edit && obj.edit.result === 'Success') {
          if (success_callback) { success_callback(); }
          reward_container_statistics_end('Stats uploaded.', 1);
        }
        else { reward_container_statistics_end(errort, 1); }
      }
    });
  };
  upload_stats();
};


var reward_container_statistics_text_to_stats = function (text, contents_original_size) {
  var tmp = reward_container_statistics_merge(text);
  reward_container_statistics_string = tmp[0];
  reward_container_statistics_obj = tmp[1];
  reward_container_statistics_generator_init();
  reward_container_statistics_end();
  $('#reward_container_statistics_td_load').empty().append(
    $('<input>', {type: 'button', value: 'Go back'}).click(function () { reward_container_statistics_init(); })
  );
  if (sysop) {
    if (!$('#reward_container_statistics_stats_size1').length) {
      $('#reward_container_statistics_td_sysop').css({textAlign: 'left', lineHeight: 1.5}).empty().append(
        $('<div />').append(
          'Stored size:&nbsp;',
          $('<span />', {id: 'reward_container_statistics_stats_size1'}).css({fontWeight: 700})
        ),
        $('<div />').append(
          'Decompressed size:&nbsp;',
          $('<span />', {id: 'reward_container_statistics_stats_size2'}).css({fontWeight: 700})
        ),
        $('<div />').append(
          'Merged & compressed size:&nbsp;',
          $('<span />', {id: 'reward_container_statistics_stats_size3'}).css({fontWeight: 700})
        ),
        $('<div />').css({textAlign: 'center'}).append(
          $('<input>', {type: 'button', value: 'Upload merged & compressed', id: 'reward_container_statistics_up'}).click(function () {
            reward_container_statistics_upload(function () {
              $('#reward_container_statistics_stats_size1').text(numcs(reward_container_statistics_string_comp.length));
              $('#reward_container_statistics_stats_size2').text(numcs(text.length));
              $('#reward_container_statistics_stats_size3').text(numcs(reward_container_statistics_string_comp.length));
            });
          })
        )
      );
    }
    if (contents_original_size === undefined) { contents_original_size = text.length; }
    reward_container_statistics_string_comp = text_compress(reward_container_statistics_string);

    $('#reward_container_statistics_stats_size1').text(numcs(contents_original_size));
    $('#reward_container_statistics_stats_size2').text(numcs(text.length));
    $('#reward_container_statistics_stats_size3').text(numcs(reward_container_statistics_string_comp.length));
    $('#reward_container_statistics_up').prop({disabled: false});
  }
};

var reward_container_statistics_load = function (from_teaxtarea) {
  $('#reward_container_statistics_l').prop({disabled: true});
  $('#reward_container_statistics_block p').html('Downloading<br /><br /><img src="http://images3.wikia.nocookie.net/tibia/en/images/d/de/Ajax_Load_Bar.gif" alt="Downloading" />');
  $('#reward_container_statistics_block').fadeTo(400, 0.8);
  if (from_teaxtarea) {
    reward_container_statistics_text_to_stats($('#' + from_teaxtarea).val());
    return;
  }
  var errort = 'There was a problem downloading, try again.';
  var get_stats_contents = function () {
    $.ajax({
      url: '/api.php', type: 'GET', dataType: 'json',
      data: {
        action: 'query', titles: 'TibiaWiki:Reward_Container_Statistics/Statistics', format: 'json',
        rvprop: 'content', prop: 'info|revisions', intoken: 'edit'
      },
      error: function () { reward_container_statistics_end(errort, 2); },
      success: function (obj) {
        var x, contents, contents_original_size;
        if (obj && obj.query && obj.query.pages) {
          for (x in obj.query.pages) { if (obj.query.pages.hasOwnProperty(x)) {
            if (obj.query.pages[x].missing !== undefined) { reward_container_statistics_end(errort, 2); }
            else {
              contents = obj.query.pages[x].revisions[0]['*'] || '';
              contents_original_size = contents.length;
              contents = $.trim(contents);
              contents = text_decompress(contents);
              reward_container_statistics_text_to_stats(contents, contents_original_size);
            }
            break;
          } }
        }
        else { reward_container_statistics_end(errort, 2); }
      }
    });
  };
  var get_edit_info = function () {
    $.ajax({
      url: '/api.php', type: 'GET', dataType: 'json',
      data: {
        action: 'query', titles: 'TibiaWiki:Reward_Container_Statistics/Statistics', format: 'json',
        prop: 'info|revisions', intoken: 'edit'
      },
      error: function () { reward_container_statistics_end(errort, 2); },
      success: function (obj) {
        var x;
        if (obj && obj.query && obj.query.pages) {
          for (x in obj.query.pages) { if (obj.query.pages.hasOwnProperty(x)) {
            if (obj.query.pages[x].missing !== undefined) { reward_container_statistics_basetimestamp = ''; }
            else { reward_container_statistics_basetimestamp = obj.query.pages[x].revisions[0].timestamp; get_stats_contents(); }
            break;
          } }
        }
        else { reward_container_statistics_end(errort, 2); }
      }
    });
  };
  get_edit_info();
};

reward_container_statistics_init = function () {
  $('#reward_container_statistics_main').empty().css({textAlign: 'center', minHeight: '100px'}).append(
    $('<table>', {style: 'width:100%;'}).append($('<tr>').append(
      $('<td>', {style: 'width:50%;', id: 'reward_container_statistics_td_load'}).append(
        $('<textarea>', {cols: '20', rows: '5', style: 'width:100%;margin-bottom:5px;', id: 'reward_container_statistics_pt'}),
        $('<input>', {type: 'button', id: 'reward_container_statistics_p', value: 'Process your pasted data'}),
        '<br />',
        '(<b>Creature heal and damage statistics</b> from<br />',
        $('<a />', {href: '/wiki/Loot_Statistics', target: '_blank'}).html('Loot Statistics'),
        ')',
        '<br /><br />OR<br /><br />',
        $('<input>', {type: 'button', id: 'reward_container_statistics_l', value: 'Load data saved on TibiaWiki'})
      ),
      $('<td>', {style: 'text-align:left;width:50%;', id: 'reward_container_statistics_td_sysop'}).append('&nbsp;')
    )),
    $('<div></div>', {id: 'reward_container_statistics_generator', style: 'text-align:left;'})
  );

  $('#reward_container_statistics_main').append(
    $('<div></div>', {id: 'reward_container_statistics_block'})
    .css({display: 'none', position: 'absolute', top: '0px', left: '0px', width: '100%', height: '100%', backgroundColor: '#666666', textAlign: 'center'})
    .html('<p style="font-size:xx-large;font-weight:bolder;font-family:Arial;color:white"></p><br />')
  );

  $('#reward_container_statistics_l').on('click', function () { reward_container_statistics_load(); });
  $('#reward_container_statistics_p').on('click', function () { reward_container_statistics_load('reward_container_statistics_pt'); });
};

//LZString from https://github.com/pieroxy/lz-string/blob/2f749bc9fe3cc889fa9e32d2769a930d977596e6/libs/lz-string.min.js
//eslint-disable-next-line
var LZString=function(){function o(o,r){if(!t[o]){t[o]={};for(var n=0;n<o.length;n++)t[o][o.charAt(n)]=n}return t[o][r]}var r=String.fromCharCode,n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",t={},i={compressToBase64:function(o){if(null==o)return"";var r=i._compress(o,6,function(o){return n.charAt(o)});switch(r.length%4){default:case 0:return r;case 1:return r+"===";case 2:return r+"==";case 3:return r+"="}},decompressFromBase64:function(r){return null==r?"":""==r?null:i._decompress(r.length,32,function(e){return o(n,r.charAt(e))})},compressToUTF16:function(o){return null==o?"":i._compress(o,15,function(o){return r(o+32)})+" "},decompressFromUTF16:function(o){return null==o?"":""==o?null:i._decompress(o.length,16384,function(r){return o.charCodeAt(r)-32})},compressToUint8Array:function(o){for(var r=i.compress(o),n=new Uint8Array(2*r.length),e=0,t=r.length;t>e;e++){var s=r.charCodeAt(e);n[2*e]=s>>>8,n[2*e+1]=s%256}return n},decompressFromUint8Array:function(o){if(null===o||void 0===o)return i.decompress(o);for(var n=new Array(o.length/2),e=0,t=n.length;t>e;e++)n[e]=256*o[2*e]+o[2*e+1];var s=[];return n.forEach(function(o){s.push(r(o))}),i.decompress(s.join(""))},compressToEncodedURIComponent:function(o){return null==o?"":i._compress(o,6,function(o){return e.charAt(o)})},decompressFromEncodedURIComponent:function(r){return null==r?"":""==r?null:(r=r.replace(/ /g,"+"),i._decompress(r.length,32,function(n){return o(e,r.charAt(n))}))},compress:function(o){return i._compress(o,16,function(o){return r(o)})},_compress:function(o,r,n){if(null==o)return"";var e,t,i,s={},p={},u="",c="",a="",l=2,f=3,h=2,d=[],m=0,v=0;for(i=0;i<o.length;i+=1)if(u=o.charAt(i),Object.prototype.hasOwnProperty.call(s,u)||(s[u]=f++,p[u]=!0),c=a+u,Object.prototype.hasOwnProperty.call(s,c))a=c;else{if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++),s[c]=f++,a=String(u)}if(""!==a){if(Object.prototype.hasOwnProperty.call(p,a)){if(a.charCodeAt(0)<256){for(e=0;h>e;e++)m<<=1,v==r-1?(v=0,d.push(n(m)),m=0):v++;for(t=a.charCodeAt(0),e=0;8>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}else{for(t=1,e=0;h>e;e++)m=m<<1|t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t=0;for(t=a.charCodeAt(0),e=0;16>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1}l--,0==l&&(l=Math.pow(2,h),h++),delete p[a]}else for(t=s[a],e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;l--,0==l&&(l=Math.pow(2,h),h++)}for(t=2,e=0;h>e;e++)m=m<<1|1&t,v==r-1?(v=0,d.push(n(m)),m=0):v++,t>>=1;for(;;){if(m<<=1,v==r-1){d.push(n(m));break}v++}return d.join("")},decompress:function(o){return null==o?"":""==o?null:i._decompress(o.length,32768,function(r){return o.charCodeAt(r)})},_decompress:function(o,n,e){var t,i,s,p,u,c,a,l,f=[],h=4,d=4,m=3,v="",w=[],A={val:e(0),position:n,index:1};for(i=0;3>i;i+=1)f[i]=i;for(p=0,c=Math.pow(2,2),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(t=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;l=r(p);break;case 2:return""}for(f[3]=l,s=l,w.push(l);;){if(A.index>o)return"";for(p=0,c=Math.pow(2,m),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;switch(l=p){case 0:for(p=0,c=Math.pow(2,8),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 1:for(p=0,c=Math.pow(2,16),a=1;a!=c;)u=A.val&A.position,A.position>>=1,0==A.position&&(A.position=n,A.val=e(A.index++)),p|=(u>0?1:0)*a,a<<=1;f[d++]=r(p),l=d-1,h--;break;case 2:return w.join("")}if(0==h&&(h=Math.pow(2,m),m++),f[l])v=f[l];else{if(l!==d)return null;v=s+s.charAt(0)}w.push(v),f[d++]=s+v.charAt(0),h--,s=v,0==h&&(h=Math.pow(2,m),m++)}}};return i}();"function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module&&(module.exports=LZString);

(function () {
  $.ajax({
    url: '/api.php', type: 'GET', dataType: 'json',
    data: {
      action: 'query', format: 'json',
      meta: 'userinfo', uiprop: 'groups'
    },
    success: function (obj) {
      var x;
      if (obj && obj.query && obj.query.userinfo && obj.query.userinfo.groups) {
        for (x in obj.query.userinfo.groups) { if (obj.query.userinfo.groups.hasOwnProperty(x)) {
          if ((obj.query.userinfo.groups[x]) === 'sysop') { sysop = true; break; }
        } }
      }
      reward_container_statistics_init();
      $('#reward_container_statistics_img').hide();
      $('#reward_container_statistics_main').show();
    }
  });
}());
}());
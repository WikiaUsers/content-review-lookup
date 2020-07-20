//<noinclude>{{protected|this page contains javascript and therefor VERY vulnerable to vandalism or hackers}}</noinclude>
//JS<pre id="pre_mapper">

//All images need to have this size:
//high resolution images(png) should be 4x in size
minimap_images_width = 2048;
minimap_images_height = 2304;

minimap_mapper_page = 'http://tibia.wikia.com/wiki/Mapper';

minimap_max_x = 131;
minimap_max_y = 129;

minimap_images = [];

minimap_images[0] = [
'https://images.wikia.nocookie.net/tibia/en/images/9/97/Minimap_Symbols.gif',
'https://images.wikia.nocookie.net/tibia/en/images/6/6c/Minimap_Loading.gif'
];

minimap_images[1] = [
'https://images.wikia.nocookie.net/tibia/en/images/1/1c/Minimap_Floor_0.png',
'https://images.wikia.nocookie.net/tibia/en/images/d/df/Minimap_Floor_1.png',
'https://images.wikia.nocookie.net/tibia/en/images/2/2a/Minimap_Floor_2.png',
'https://images.wikia.nocookie.net/tibia/en/images/8/87/Minimap_Floor_3.png',
'https://images.wikia.nocookie.net/tibia/en/images/f/f7/Minimap_Floor_4.png',
'https://images.wikia.nocookie.net/tibia/en/images/6/61/Minimap_Floor_5.png',
'https://images.wikia.nocookie.net/tibia/en/images/b/be/Minimap_Floor_6.png',
'https://images.wikia.nocookie.net/tibia/en/images/6/64/Minimap_Floor_7.png',
'https://images.wikia.nocookie.net/tibia/en/images/f/fc/Minimap_Floor_8.png',
'https://images.wikia.nocookie.net/tibia/en/images/e/e6/Minimap_Floor_9.png',
'https://images.wikia.nocookie.net/tibia/en/images/a/a3/Minimap_Floor_10.png',
'https://images.wikia.nocookie.net/tibia/en/images/e/e4/Minimap_Floor_11.png',
'https://images.wikia.nocookie.net/tibia/en/images/4/44/Minimap_Floor_12.png',
'https://images.wikia.nocookie.net/tibia/en/images/c/cf/Minimap_Floor_13.png',
'https://images.wikia.nocookie.net/tibia/en/images/9/90/Minimap_Floor_14.png',
'https://images.wikia.nocookie.net/tibia/en/images/f/ff/Minimap_Floor_15.png'
];

minimap_images[4] = [
'',
'',
'',
'',
'',
'',
'',
'https://images.wikia.nocookie.net/tibia/en/images/c/c5/Minimap_Floor_7h.png',
'',
'',
'',
'',
'',
'',
'',
''
];

if (typeof Image === 'function') {
    // Image constructor supported, we can preload images
    preload_image = function (src) {
        var img = new Image();
        img.src = src;
        return img;
    };
    preload_image_array = function (arr) {
        var len = arr.length;
        while (len--) {
            preload_image(arr[len]);
        }
    };
    mapper_preload_files = function (ele) {
        var files = minimap_images, len = files.length;
        if (ele.checked) {
            while (len--) {
                if (files[len] && typeof files[len] === 'object') {
                    preload_image_array(files[len]);
                }
            }
        }
    };
}
minimap_get_coords = function(url, varname) {
  url = decodeURI(url);
  if (typeof varname == 'undefined') { varname = 'coords'; }
  var pars = [], tmpp = url.split(varname + '='); tmpp.shift(); tmpp = tmpp.join('').split('&')[0];
  if (varname == 'coords') {
//0x.1x,2y.3y,4z,5zoom,6zoomm,7centermark
    if (tmpp === '' || (tmpp = tmpp.split(/[,-]/)).length < 3) { pars = [127, 128, 124, 128, 7, 1, 1, 1]; }
    else {
      pars[0] = parseInt(tmpp[0].split('.')[0] || 127, 10);
      pars[1] = parseInt(tmpp[0].split('.')[1] || 0, 10);
      pars[2] = parseInt(tmpp[1].split('.')[0] || 124, 10);
      pars[3] = parseInt(tmpp[1].split('.')[1] || 0, 10);
      pars[4] = parseInt(tmpp[2] || 7, 10);
      pars[5] = parseFloat(tmpp[3] || 1);
      pars[6] = parseFloat(tmpp[4] || 1);
      pars[7] = parseInt(tmpp[5] || 1, 10);
      pars[0] = (pars[0] > minimap_max_x || pars[0] < 124 ? 127 : pars[0]);
      pars[1] = (pars[1] > 255 || pars[1] < 0 ? 0 : pars[1]);
      pars[2] = (pars[2] > minimap_max_y || pars[2] < 121 ? 124 : pars[2]);
      pars[3] = (pars[3] > 255 || pars[3] < 0 ? 0 : pars[3]);
      pars[4] = (pars[4] > 15 || pars[4] < 0 ? 7 : pars[4]);
      pars[5] = (pars[5] > 8 || pars[5] < 1 ? 1 : pars[5]);
      pars[6] = (pars[6] > 8 || pars[6] < 0 ? 1 : pars[6]);
      pars[7] = (pars[7] > 1 || pars[7] < 0 ? 1 : pars[7]);
    }
  }
  else if (varname.indexOf('mark') === 0) {
//Default 0x.1x,2y.3y,4z,5icon,6link
    if (tmpp === '' || (tmpp = tmpp.split(/[,-]/)).length < 3) { pars = [127, 128, 124, 128, 7, 1, '']; }
    else {
      pars[0] = parseInt(tmpp[0].split('.')[0] || 127, 10);
      pars[1] = parseInt(tmpp[0].split('.')[1] || 0, 10);
      pars[2] = parseInt(tmpp[1].split('.')[0] || 124, 10);
      pars[3] = parseInt(tmpp[1].split('.')[1] || 0, 10);
      pars[4] = parseInt(tmpp[2] || 7, 10);
      pars[5] = parseInt(tmpp[3] || 1, 10);
      pars[6] = tmpp[4] || '';
      pars[0] = (pars[0] > minimap_max_x || pars[0] < 124 ? 127 : pars[0]);
      pars[1] = (pars[1] > 255 || pars[1] < 0 ? 0 : pars[1]);
      pars[2] = (pars[2] > minimap_max_y || pars[2] < 121 ? 124 : pars[2]);
      pars[3] = (pars[3] > 255 || pars[3] < 0 ? 0 : pars[3]);
      pars[4] = (pars[4] > 15 || pars[4] < 0 ? 7 : pars[4]);
      pars[5] = (pars[5] > 22 || pars[5] < 0 ? 1 : pars[5]);
    }
  }
  return pars;
};
minimap_change_src = function () {
    var fresh = (minimap_read_cookie('minimap_fresh') == '1'), len1 = minimap_images.length, len2, currList;
    if (fresh) {
        while (len1--) {
            currList = minimap_images[len1];
            len2 = currList instanceof Array ? currList.length : 0;
            while (len2--) {
                if (currList[len2]) {
                    currList[len2] += "?nocache=" + (+new Date());
                }
            }
        }
    }
};
minimap_center_div = function () {
  var aligner = function(ea) { if (ea.css('display') == 'block') {
    var tmp = parseInt((($(window).height() - ea[0].offsetHeight) / 2)+ $(window).scrollTop(), 10);
    tmp = (tmp > 0 ? tmp : 10);
    ea.css({position: 'absolute', top:tmp, left: parseInt((($(window).width() - ea.width()) / 2)+ $(window).scrollLeft(), 10)});
    $('#minimap_blackout').css({display: 'block'}).height($(document).height());
  } };
  aligner($('#minimap_wp'));
};

minimap_drago = null; minimap_dragos = null; minimap_dragms = null;
minimap_dragstart = function () {
  $('#minimap_img').mousedown(function(ev) {
    if (!(minimap_drago = $('#minimap_imgdiv')[0])) { return; }
    minimap_dragms = {x:ev.pageX, y:ev.pageY};
    minimap_dragos = {x:$(minimap_drago).css('left'), y:$(minimap_drago).css('top')};
    return false;
  });
};

$(document).mouseup(function (ev) {
  if (minimap_drago) {
    minimap_map_data[1] += parseInt((minimap_dragms.x -ev.pageX)/minimap_map_data[5], 10);
    minimap_map_data[3] += parseInt((minimap_dragms.y -ev.pageY)/minimap_map_data[5], 10);
    minimap_pos();
  }
  minimap_drago = null;
});

$(document).mousemove(function (ev) {
  if (minimap_drago) {
    minimap_drago.style.left = (parseFloat(minimap_dragos.x) - (minimap_dragms.x - ev.pageX))+'px';
    minimap_drago.style.top = (parseFloat(minimap_dragos.y) - (minimap_dragms.y - ev.pageY))+'px';
    return false;
  }
});

minimap_map_data = [];
minimap_map_sdata = [];

minimap_data_to_url = function (type) {
//0x.1x,2y.3y,4z,5zoom,6zoomm,7centermark
//0x.1x,2y.3y,4z,5icon,6link
  var x, ret;
  if (type === 0) {//Direct Link
    ret = minimap_mapper_page+'?coords=';
    ret += minimap_map_data[0]+'.'+minimap_map_data[1]+'-'+minimap_map_data[2]+'.'+minimap_map_data[3]+'-'+
           minimap_map_data[4]+'-'+minimap_map_data[5]+'-'+minimap_map_data[6]+'-'+minimap_map_data[7];
    if ($('#minimap_marks_enabled').is(':checked')) {
      for (x in minimap_map_data) { if (minimap_map_data.hasOwnProperty(x) && typeof minimap_map_data[x] == 'object') {
        ret += '&'+x+'=';
        ret += minimap_map_data[x][0]+'.'+minimap_map_data[x][1]+'-'+minimap_map_data[x][2]+'.'+minimap_map_data[x][3]+
        '-'+minimap_map_data[x][4]+'-'+minimap_map_data[x][5]+(minimap_map_data[x][6] ? '-'+minimap_map_data[x][6] : '');
      } }
    }
  }
  else if (type == 1) {//Template:Minimap
    ret = '{'+'{Minimap';
    ret += '|x='+minimap_map_data[0]+'.'+minimap_map_data[1]+'|y='+minimap_map_data[2]+'.'+minimap_map_data[3]+'|z='+
           minimap_map_data[4]+'|zoom='+minimap_map_data[5]+'|zoomm='+minimap_map_data[6]+
           '|width='+(1 / minimap_map_data[5])+'|height='+(1 / minimap_map_data[5])+
           '|centermark='+(minimap_map_data[7] ? 'yes' : 0);
    if ($('#minimap_marks_enabled').is(':checked')) {
      for (x in minimap_map_data) { if (minimap_map_data.hasOwnProperty(x) && typeof minimap_map_data[x] == 'object') {
        if (minimap_map_data[4] != minimap_map_data[x][4]) { continue; }
        ret += '|'+x+'=';
        ret += minimap_map_data[x][0]+'.'+minimap_map_data[x][1]+','+minimap_map_data[x][2]+'.'+minimap_map_data[x][3]+
        ','+minimap_map_data[x][5]+','+minimap_map_data[x][6];
      } }
    }
    ret += '}'+'}';
  }
  else if (type == 2) {//Wiki Link
    ret = document.getElementById('minimap_tcode3').value.replace(/\s|%20/gi, '_');
    ret = '['+minimap_data_to_url(0).replace(/\s|%20/gi, '_')+(ret === '' ? '' : ' ')+ret+']';
  }
  else if (type == 3) {//x,y,z
    ret = minimap_map_data[0]+'.'+minimap_map_data[1]+','+minimap_map_data[2]+'.'+minimap_map_data[3]+','+
          minimap_map_data[4];
  }
  else if (type == 4) {//tibiaml map
    ret = 'http://map.tibiaml.com/?p='+
          ((minimap_map_data[0]*256)+minimap_map_data[1])+','+((minimap_map_data[2]*256)+minimap_map_data[3])+','+
          minimap_map_data[4]+':'+(minimap_map_data[5] > 7 ?8:(minimap_map_data[5] > 3 ?7:(minimap_map_data[5] > 2 ?6:5)));
  }
  return ret;
};

minimap_mapper_list_click = function() {
  if ($('#minimap_loading').css('display') == 'block') { return; }
  var e = $('#mapper_list :selected').val();
  e = decodeURI(e).split(',');
  $('#mapper_mark_remove').attr('disabled', false);
  minimap_map_data[0] = parseInt(e[0], 10); minimap_map_data[1] = parseInt(e[1], 10);
  minimap_map_data[2] = parseInt(e[2], 10); minimap_map_data[3] = parseInt(e[3], 10);
  minimap_map_data[4] = parseInt(e[4], 10);
  minimap_pos(false);
};

minimap_read_cookie = function(name) {
  var i, c, cl = document.cookie.split(';');
  for(i=0;i<cl.length;i++) { c = $.trim(cl[i]); if (c.indexOf(name+'=') === 0) { return c.substring(name.length+1); } }
  return null;
};

minimap_write_cookie = function(name, val) {
  var date = new Date(); date.setTime(date.getTime()+(7*24*60*60*1000)); date = date.toGMTString();
  document.cookie = name+'='+val+'; expires='+date+'; path=/';
};

minimap_codes_update = function (reset_list) {
  var tmp;
  tmp = -1*(minimap_map_data[4] - 7);
  $('#minimap_current_floor').val((tmp < 1 ? '' : '+') + tmp);
  $('#minimap_current_coords').val(minimap_data_to_url(3));
  if ($('#minimap_tcode1').size()) {
    $('#minimap_tcode1').val(minimap_data_to_url(0));
    $('#minimap_tcode2').val(minimap_data_to_url(1));
    $('#minimap_tcode4').val(minimap_data_to_url(2));
    if (typeof reset_list == 'undefined' || reset_list) {
      var i = 1; tmp = '';
      while (minimap_map_data['mark'+i]) {
        tmp += '<option value="'+encodeURI(minimap_map_data['mark'+i].join(','))+'">'+i+'</option>';
        i++;
      }
      $('#mapper_list').empty().append(tmp);
    }
  }
};

minimap_pos_b = function(act, val) {
  if ($('#minimap_loading').css('display') == 'block') { return; }
  var x;
  if (act == 'reset') {
    minimap_map_data = [];
    for (x in minimap_map_sdata) { if (minimap_map_sdata.hasOwnProperty(x)) {
      minimap_map_data[x] = (typeof minimap_map_sdata[x] == 'object' ? minimap_map_sdata[x].slice(0) : minimap_map_sdata[x]);
    } }
  }
  else if (act == 'we') { minimap_map_data[1] += val; }
  else if (act == 'ns') { minimap_map_data[3] += val; }
  else if (act == 'zoom') {
    x = minimap_map_data[5] * val; if (x > 8 || x < 1) { return; } minimap_map_data[5] = Math.round(x);
    if (minimap_map_data[5] < 1) { minimap_map_data[5] = 1; }
    while (minimap_map_data[5] != 1 && minimap_map_data[5] != 2 && minimap_map_data[5] != 4 && minimap_map_data[5] != 8) { minimap_map_data[5]--; }
  }
  else if (act == 'floor') { x = minimap_map_data[4] + val; if (x > 15 || x < 0) { return; } minimap_map_data[4] = x; }
  minimap_pos();
};


minimap_pos = function(reset_list) {
  $('#minimap_maindiv').css('display', 'none'); $('#minimap_loading').css('display', 'block');
//Adjusts values out of range for x and y
  minimap_map_data[0] = minimap_map_data[0]+Math.floor(minimap_map_data[1] / 256);
  minimap_map_data[1] = minimap_map_data[1]-(Math.floor(minimap_map_data[1]/256)*256);
  minimap_map_data[2] = minimap_map_data[2]+Math.floor(minimap_map_data[3] / 256);
  minimap_map_data[3] = minimap_map_data[3]-(Math.floor(minimap_map_data[3]/256)*256);

  var hres, d, ch, parss, pars = minimap_map_data;
  var tleft = Math.floor((((pars[0] - 124 - (1*(1/pars[5]))) * 256) + pars[1]) * pars[5], 10)+Math.floor(pars[5] / 2);
  var ttop = Math.floor((((pars[2] - 121- (0.75*(1/pars[5]))) * 256) + pars[3]) * pars[5], 10)+Math.floor(pars[5] / 2);
  var twidth = Math.floor(minimap_images_width * pars[5]);
  var theight = Math.floor(minimap_images_height * pars[5]);

  hres = (minimap_read_cookie('minimap_hres') == '1');
//main image
  d = $('#minimap_imgdiv');
  d.css({'left':(-1*tleft)+'px', 'top':(-1*ttop)+'px'});
  ch = d.children(':first');
  ch.width(twidth).height(theight);

  hres = (hres ? (pars[5] >= 3 ? (minimap_images[4] && minimap_images[4][pars[4]] ? 4 : 1) : 1) : 1);
  if (ch.attr('src') == minimap_images[hres][pars[4]]) {
    $('#minimap_loading').css('display', 'none'); $('#minimap_maindiv').css('display', 'block');
  }
  else { ch.attr('src', minimap_images[hres][pars[4]]); }
//dashed lines
  if ($('#minimap_cmark_enabled').is(':checked')) {
    minimap_map_data[7] = 1;
    $('#minimap_vl').css({'display':'block', 'visibility':'visible'});
    $('#minimap_hl').css({'display':'block', 'visibility':'visible'});
    if (!$('#minimap_editor_mode').is(':checked')) {
      parss = minimap_map_sdata;
      tleft = Math.floor((((parss[0] - 124 - (1*(1/pars[5]))) * 256) + parss[1]) * pars[5], 10)+Math.floor(pars[5] / 2);
      ttop = Math.floor((((parss[2] - 121- (0.75*(1/pars[5]))) * 256) + parss[3]) * pars[5], 10)+Math.floor(pars[5] / 2);

      $('#minimap_vl').appendTo($('#minimap_imgdiv')).css({
        'left':(tleft+256)+'px',
        'top':(ttop+(wgPageName != 'Mapper' ? parseInt((384-parseInt(384*(pars[5] / parss[5]), 10))/2, 10) : 0))+'px',
        'height':(wgPageName != 'Mapper' ? parseInt(384*(pars[5] / parss[5]), 10) : 384)+'px'
      });

      $('#minimap_hl').appendTo($('#minimap_imgdiv')).css({
        'left':(tleft+(wgPageName != 'Mapper' ? parseInt((512-parseInt(512*(pars[5] / parss[5]), 10))/2, 10) : 0))+'px',
        'top':(ttop+192)+'px',
        'width':(wgPageName != 'Mapper' ? parseInt(512*(pars[5] / parss[5]), 10) : 512)+'px'
      });
    }
    else {
      $('#minimap_vl').appendTo($('#minimap_imgdiv').parent()).css({'left':'256px', 'top':'0px', 'height':'384px'});
      $('#minimap_hl').appendTo($('#minimap_imgdiv').parent()).css({'left':'0px', 'top':'192px', 'width':'512px'});
    }
  }
  else {
    minimap_map_data[7] = 0;
    $('#minimap_vl').css({'display':'none', 'visibility':'hidden'});
    $('#minimap_hl').css({'display':'none', 'visibility':'hidden'});
  }
//marks
  var tmpm, i = 1, msize, mleft, mtop;

  $('[id^="minimap_mark"]').filter(function() { var id = $(this).attr('id').replace('minimap_mark', ''); return (parseInt(id, 10) > 0 ? true : false); } ).css({'display':'none', 'visibility':'hidden'});

  if ($('#minimap_marks_enabled').is(':checked')) { while (pars['mark'+i]) {
    tmpm = pars['mark'+i];
    if (!$('#minimap_mark'+i).size()) {
      $('<div id="minimap_mark'+i+'">&nbsp</div>')
      .css({'display':'block', 'position':'absolute', 'z-index':'2003', 'overflow':'hidden', '':''})
      .html('<div style="position:absolute;overflow:hidden;">'+
            '<a href=""><img src="'+minimap_images[0][0]+'" alt="" width="121" height="22" border="0" /></a>'+
            '<div style="text-align:center;padding:0px;margin:0px;border:none;position:absolute;top:0px;left:0px;width:0px;height:0px;display:none;visibility:hidden;line-height:normal;">'+
            '</div>')
      .appendTo($('#minimap_imgdiv'));
    }
    if (tmpm[4] != pars[4]) { i++; continue; }//mark in same z
    msize = Math.floor(11*pars[5]*pars[6])+'px';

    $('#minimap_mark'+i).css({
      'display':'block', 'visibility':'visible',
      'left':Math.floor(((((tmpm[0] - 124) * 256) + (tmpm[1])) * pars[5]) - (5*pars[5]*pars[6]))+'px',
      'top':Math.floor(((((tmpm[2] - 121) * 256) + (tmpm[3])) * pars[5]) - (5*pars[5]*pars[6]))+'px',
      'width':msize, 'height':msize
    });
    mleft = Math.floor(Math.floor(((tmpm[5] == 21 ? 22 : tmpm[5])-1)/2)*11*pars[5]*pars[6]);
    mtop = Math.floor((Math.floor(((tmpm[5] == 21 ? 22 : tmpm[5]))/2) == (((tmpm[5] == 21 ? 22 : tmpm[5]))/2) ? 11 : 0)*pars[5]*pars[6]);
    $('#minimap_mark'+i)
    .children(':first')//hidder div
    .css({'left':(-1 * mleft)+'px', 'top':(-1 * mtop)+'px'})
    .children(':first')//a link
    .css('cursor', 'default').attr({'onclick':'return false;', 'href':''});
    if (tmpm[6] !== '' && tmpm[5] != 21) {
      $('#minimap_mark'+i).children(':first').children(':first')//a link
      .css('cursor', 'pointer').attr({'onclick':'window.open(this.href); return false;', 'href':'/wiki/'+encodeURI(tmpm[6])});
    }
    d = $('#minimap_mark'+i).children(':first').children(':first')[0];
    if (tmpm[5] == 21) {//numeric mark
      $('#minimap_mark'+i).children(':first').children(':first').next()
      .css({
        'display':'block', 'visibility':'visible', 'left':mleft+'px', 'top':mtop+'px', 'width':msize, 'height':msize,
        'font-size':(parseInt(msize, 10) - 2)+'px', 'line-height':'normal'
      })
      .html(tmpm[6] !== '' ? parseInt(tmpm[6].slice(0, 2), 10) || 0 : 0);
    }
    $('#minimap_mark'+i).children(':first').children(':first').children(':first')//image
    .attr({'title':tmpm[6], 'alt':tmpm[6]}).css({'width':Math.floor(121*pars[5]*pars[6]), 'height':Math.floor(22*pars[5]*pars[6])});
    i++;
  } }
  minimap_codes_update(reset_list);
};

minimap_mapper_add_mark = function() {
  if ($('#minimap_loading').css('display') == 'block') { return; }
  var i = 1; while (minimap_map_data['mark'+i]) { i++; }
  minimap_map_data['mark'+i] = minimap_map_data.slice(0, 5);
  minimap_map_data['mark'+i][5] = $('[id^="mapper_marker_r"]:checked').val();
  minimap_map_data['mark'+i][6] = document.getElementById('mapper_optional_link').value.replace(/\s|%20/gi, '_');
  minimap_pos();
};

minimap_mapper_remove_mark = function() {
  if (document.getElementById('minimap_loading').style.display == 'block') { return; }
  if (!$('#mapper_list :selected').size()) { return; }
  $('#mapper_mark_remove').attr('disabled', true);
  $('#mapper_list :selected').remove();
  minimap_map_data = minimap_map_data.slice(0, 8);
  $('#mapper_list option').each(function(i) {
    var tmp = decodeURI($(this).val()).split(',', 7);
    minimap_map_data['mark'+(i+1)] = [parseInt(tmp[0], 10), parseInt(tmp[1], 10), parseInt(tmp[2], 10),
                                      parseInt(tmp[3], 10), parseInt(tmp[4], 10), parseInt(tmp[5], 10), tmp[6]];
  });
  minimap_pos();
//0x.1x,2y.3y,4z,5zoom,6zoomm,7centermark
//0x.1x,2y.3y,4z,5icon,6link
};

minimap_load = function(url) {
  minimap_map_sdata = minimap_get_coords(url); minimap_map_data = minimap_get_coords(url);
  var pars = minimap_get_coords(url);
  var tid = 'minimap_w' + (wgPageName == 'Mapper' ? 'f' : 'p');
  minimap_change_src();// bypass image cache if the user opts to
  if (wgPageName != 'Mapper') {
    if (!$('#minimap_blackout').size()) { $('body').append(
      '<div id="minimap_blackout" class="minimap_blackout" onclick="$(\'.minimap_wp, #minimap_blackout\').css(\'display\', \'none\').html(\'&nbsp;\'); return false;">&nbsp;</div>');
    }
    if (!$('#minimap_wp').size()) { $('body').append('<div id="minimap_wp" class="minimap_wp minimap_w"></div>'); }
    $('#minimap_blackout').css('display', 'block').height($(document).height());
    $('#minimap_wp').css('display', 'block');
  }
  var tmp =
  (wgPageName != 'Mapper' ?
  '<div style=\'text-align:center;background:#eeeeee;color:#0038d8;font-weight:bold;height:19px;padding-top: 2px\'>TibiaWiki Map</div>'+
    '<div class="minimap_wx" onclick="$(\'.minimap_wp, #minimap_blackout\').css(\'display\', \'none\').html(\'&nbsp;\'); return false;">X</div>'
  : '<div style="border-bottom-color:#aaaaaa;border-bottom-style:solid;border-bottom-width:1px;"><font size="+1">Mapper</font></div><br />')+
  '<div style="display:block;border:1px #3366CC solid;background-color:grey;">'+
    '<div id="minimap_loading" ><img src="'+minimap_images[0][1]+'" alt="Loading" width="512" height="384" /></div>'+
    '<div id="minimap_maindiv" style="overflow:hidden;"><div style="overflow:hidden;display:block;position:absolute;width:512px;height:384px;">'+
      '<div id="minimap_imgdiv" style="display:block;position:absolute;">'+
        '<img id="minimap_img" src="" alt="" width="" height="" />'+
        '<div id="minimap_vl" style="position:absolute;left:256px;top:0px;display:block;width:1px;height:384px;border-left:1px dashed #FFFFFF;"></div>'+
        '<div id="minimap_hl" style="position:absolute;left:0px;top:192px;display:block;width:512px;height:1px;border-top:1px dashed #FFFFFF;"></div>';
  var tmpm, i = 1;
  while (url.indexOf('mark'+i) != -1) {
    tmpm = minimap_get_coords(url, 'mark'+i);
    minimap_map_sdata['mark'+i] = tmpm.slice(0); minimap_map_data['mark'+i] = tmpm;
    tmp +=
        '<div id="minimap_mark'+i+'" style="overflow:hidden;position:absolute; z-index:2003;">'+
        '<div style="position:absolute;overflow:hidden;">'+
        '<a href=""><img src="'+minimap_images[0][0]+'" alt="" width="121" height="22" border="0" /></a>'+
        '<div style="text-align:center;padding:0px;margin:0px;border:none;position:absolute;top:0px;left:0px;width:0px;height:0px;display:none;visibility:hidden;"></div>'+
        '</div></div>'+
        '';
    i++;
  }
  tmp +=
      '</div>'+
    '</div></div>'+
  '</div>'+
  '<div style="'+(wgPageName != 'Mapper' ? 'background-color:#EEEEEE;' : '')+'">'+
  '<table border="0"><tr><td style="vertical-align:top;width:46px;">'+
  '<div style="margin:2px;line-height:10px;"><input type="button" onclick="minimap_pos_b(\'ns\', -30);" class="starn btns" value="" /><br />'+
  '<input type="button" onclick="minimap_pos_b(\'we\', -30);" class="starw btns" value="" />'+
  '<input type="button" onclick="minimap_pos_b(\'reset\');" class="starc btns" value="" />'+
  '<input type="button" onclick="minimap_pos_b(\'we\', 30);" class="stare btns" value="" /><br />'+
  '<input type="button" onclick="minimap_pos_b(\'ns\', 30);" class="stars btns" value="" />'+
  '</div>'+
  '</td><td style="vertical-align:top;width:46px;">'+
  '<div style="margin:2px;">'+
    '<input type="button" onclick="minimap_pos_b(\'zoom\', 0.5);" class="zoomm btn" value="" />'+
    '<input type="button" onclick="minimap_pos_b(\'floor\', -1);" class="floorp btn" value="" /><br />'+
    '<input type="button" onclick="minimap_pos_b(\'zoom\', 2);" class="zoomp btn" value="" />'+
    '<input type="button" onclick="minimap_pos_b(\'floor\', 1);" class="floorm btn" value="" />'+
  '</div>'+
  '</td><td style="vertical-align:top;">'+
  '<input type="checkbox" value="1" checked="checked" id="minimap_marks_enabled" onclick="minimap_pos();" />Enable marks<br />'+
  '<input type="checkbox" value="1" '+(pars[7] ? 'checked="checked" ' : '')+'id="minimap_cmark_enabled" onclick="minimap_pos();" />Center mark<br />'+
  '</td><td style="vertical-align:top;padding-left:10px;">'+
  'Current floor: <input id="minimap_current_floor" type="text" size="4" value="" readonly="readonly" onclick="this.select()" /><br />'+
  'Coords: <input id="minimap_current_coords" type="text" size="18" value="" readonly="readonly" onclick="this.select()" />'+
  '</td></tr><td>&nbsp;</td><td>&nbsp;</td><td colspan="2">'+
  '<input type="checkbox" value="1" '+(minimap_read_cookie('minimap_hres') == '1' ? 'checked="checked" ' : '')+'id="minimap_hres_enabled" onclick="minimap_write_cookie(\'minimap_hres\', (this.checked ? 1 : 0)); minimap_pos();" />Load high resolution images &nbsp;'+
  '<input type="checkbox" value="0" '+(!preload_image ? 'disabled=disabled' : '')+'onclick="mapper_preload_files(this);" /> Preload images &nbsp;'+
  (wgPageName == 'Mapper' ?
  '<input type="checkbox" value="1" '+(window.location.search.indexOf('coords=') !== -1 ? '' : 'checked="checked" ')+'id="minimap_editor_mode" onclick="minimap_pos();" />Editor mode &nbsp;'+
  '<input type="checkbox" value="1" '+(minimap_read_cookie('minimap_fresh') == '1' ? 'checked="checked" ' : '')+'onclick="minimap_write_cookie(\'minimap_fresh\', this.checked ? 1 : 0); minimap_change_src(); " />Force-reload images'+
  '</td></tr></table><table border="0" style="width:512px;overflow:auto"><tr>'+
  '<td colspan="2" style="border-top:1px #333333 solid;border-bottom:1px #333333 solid;text-align:center;">Mark manager'+
  '</td></tr><tr><td coldspan="2">'+
  '<div style="font-size:80%;">'+
  '<a href="" onclick="$(\'#mapper_help1\').toggle(); return false;">Toggle Help</a><br />'+
  '<div id="mapper_help1" style="background-color:#DDDDDD;display:none;">'+
    'Enable <b>Editor Mode</b><br />'+
    'Select an icon<br />'+
    'Optionally write a wiki article name<br />'+
    'Use the dotted lines(Center Mark) to select where you want to add a mark<br />'+
    'Click <b>Add</b><br />'+
    'To remove a mark, select it on the list, wait the map takes you to it and click <b>Remove</b><br />'+
    'The "1" Icon is used to add marks with numbers, write a number instead of an article name'+
  '</div></div>'+
  '</td></tr></table><table><tr><td style="overflow:auto;width:270px;vertical-align:top;">'+
  '<input type="radio" value="1" checked="checked" name="mapper_markc" id="mapper_marker_r1" class="mapper_marker_r" />'+
  '<input type="radio" value="3" name="mapper_markc" id="mapper_marker_r3" class="mapper_marker_r" />'+
  '<input type="radio" value="5" name="mapper_markc" id="mapper_marker_r5" class="mapper_marker_r" />'+
  '<input type="radio" value="7" name="mapper_markc" id="mapper_marker_r7" class="mapper_marker_r" />'+
  '<input type="radio" value="9" name="mapper_markc" id="mapper_marker_r9" class="mapper_marker_r" />'+
  '<input type="radio" value="11" name="mapper_markc" id="mapper_marker_r11" class="mapper_marker_r" />'+
  '<input type="radio" value="13" name="mapper_markc" id="mapper_marker_r13" class="mapper_marker_r" />'+
  '<input type="radio" value="15" name="mapper_markc" id="mapper_marker_r15" class="mapper_marker_r" />'+
  '<input type="radio" value="17" name="mapper_markc" id="mapper_marker_r17" class="mapper_marker_r" />'+
  '<input type="radio" value="19" name="mapper_markc" id="mapper_marker_r19" class="mapper_marker_r" />'+
  '<input type="radio" value="21" name="mapper_markc" id="mapper_marker_r21" class="mapper_marker_r" />'+
  '<br /><img src="'+minimap_images[0][0]+'" width="242" height="44" /><br />'+
  '<input type="radio" value="2" name="mapper_markc" id="mapper_marker_r2" class="mapper_marker_r" />'+
  '<input type="radio" value="4" name="mapper_markc" id="mapper_marker_r4" class="mapper_marker_r" />'+
  '<input type="radio" value="6" name="mapper_markc" id="mapper_marker_r6" class="mapper_marker_r" />'+
  '<input type="radio" value="8" name="mapper_markc" id="mapper_marker_r8" class="mapper_marker_r" />'+
  '<input type="radio" value="10" name="mapper_markc" id="mapper_marker_r10" class="mapper_marker_r" />'+
  '<input type="radio" value="12" name="mapper_markc" id="mapper_marker_r12" class="mapper_marker_r" />'+
  '<input type="radio" value="14" name="mapper_markc" id="mapper_marker_r14" class="mapper_marker_r" />'+
  '<input type="radio" value="16" name="mapper_markc" id="mapper_marker_r16" class="mapper_marker_r" />'+
  '<input type="radio" value="18" name="mapper_markc" id="mapper_marker_r18" class="mapper_marker_r" />'+
  '<input type="radio" value="20" name="mapper_markc" id="mapper_marker_r20" class="mapper_marker_r" />'+
  '<input type="radio" value="22" name="mapper_markc" id="mapper_marker_r22" class="mapper_marker_r" /><br />'+
  'Optional Article: <input type="text" value="" size="15" id="mapper_optional_link" /><br />'+
  '<input type="button" value="Add" onclick="minimap_mapper_add_mark();" />'+
  '</td><td style="vertical-align:top;">'+

  '<select size="6" id="mapper_list" style="width:90px"></select>'+
  '&nbsp;<input type="button" value="Remove" disabled="disabled" id="mapper_mark_remove" onclick="minimap_mapper_remove_mark();" />'+

  '</td></tr></table><table border="0" style="width:510px;overflow:auto;"><tr><td colspan="2" style="border-top:1px #333333 solid;border-bottom:1px #333333 solid;text-align:center;">'+
    'Link and templates'+
    '</td></tr><tr><td>Wiki Link:'+
    '</td><td>'+
      '<table style="width:100%;overflow:auto;"><tr><td>Link text:'+
        '</td><td><input id= "minimap_tcode3" type="text" value="here" size="10" onkeyup="minimap_codes_update();" />'+
        '</td></tr><td>Code:'+
        '</td><td><input id= "minimap_tcode4" readonly="readonly" type="text" value="" size="30" onclick="this.select()" />'+
      '</td></tr></table>'+
    '</td></tr><tr><td>Direct Link:</td><td><input id= "minimap_tcode1" readonly="readonly" type="text" value="" size="45" onclick="this.select()" />'+
    '</td></tr><tr><td>Simple Template:'+
    '</td><td><input id= "minimap_tcode2" readonly="readonly" type="text" value="" size="45" onclick="this.select()" />'
  : '')+
  '</td></tr></table></div>'+
  (wgPageName != 'Mapper' ?
    '<div onclick="window.open(minimap_data_to_url(0)); $(\'.minimap_wx\').click(); return false;" class="minimap_wl" title="Expand on TibiaWiki"></div>'
  : '')+
  '';
  $('#'+tid).html(tmp);
  $('#mapper_list').change(function(){minimap_mapper_list_click();});
  if (wgPageName != 'Mapper') { minimap_center_div(); }
  $('#minimap_img').load(function() {
    $('#minimap_loading').css('display', 'none'); $('#minimap_maindiv').css('display', 'block');
  });
  minimap_pos();
  minimap_dragstart();
  if (wgPageName == 'Mapper') { try { $('#mapper_loading').hide(); } catch(er) { } }
};

$('a[href*="'+minimap_mapper_page+'"]').click(function() { minimap_load($(this).attr('href')); return false; });

if (wgPageName == 'Mapper') { minimap_load(window.location.search.substring(1)); }
else{ $(window).resize(function(){ minimap_center_div(); }); }

//</pre>
// [[Category:Maps]]
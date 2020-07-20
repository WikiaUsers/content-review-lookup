var walls = [ 
    "Message Wall",
    "Nachrichtenseite",
    "Muro",
    "Viestiseinä",
    "Mur",
    "Üzenőfal",
    "Bacheca",
    "メッセージ ウォール",
    "Prikbord",
    "Tablica wiadomości",
    "Mural de mensagens",
    "Стіна обговорення",
    "Стена обсуждения",
    "留言墙"
    ],
    username = mw.config.get("wgPageName").split("/")[1],
    token = mw.user.tokens.get("editToken");
    
$(function (){
    if (mw.config.get("wgCanonicalSpecialPageName") === 'Contributions') {
        $('.mw-contributions-form').before('<a href="javascript:deleteEverything()">Xóa tất cả</a> | ');
        $('.mw-contributions-form').before('<a href="javascript:rollbackEverything()">Rollback tất cả</a> | ');
        $('.mw-contributions-form').before('Ban (<a href="javascript:blockEveryone3d()">3 ngày</a> | <a href="javascript:blockEveryone1w()">1 tuần</a> | <a href="javascript:blockEveryone2w()">2 tuần</a> | <a href="javascript:blockEveryone3m()">3 tháng</a> | <a href="javascript:blockEveryoneinf()">vĩnh viễn</a>) | ');
        $('.mw-contributions-form').before('<a href="javascript:deleteEverything();rollbackEverything();blockEveryone2w()">Tất cả điều trên</a>');
    }
});

function rollbackEverything() {
    $('.mw-rollback-link a').each(function(i) {
        var obj = $(this),
        href = obj.attr('href');
        setTimeout(function() {
	$.get(href);
	console.log('Rollback number ' + i + ' thành công!');
	obj.text('Xong!').css({'color':'grey','text-decoration':'line-through'}).removeAttr('href').parents().eq(1).css({'color':'grey','text-decoration':'line-through'}).children().removeAttr('href').css({'color':'grey','text-decoration':'line-through'});
    }, i*500);
    });
}

function blockEveryone3d() {
    new mw.Api().post({
    format: 'json',
    action: 'block',
    user: username,
    expiry: '3 days',
    nocreate: 0,
    autoblock: 0,
    reason: '[[Help:Vandalism|Vandalism]].',
    bot: true,
    token: token
    })
    .done(function(d) { 
      if (!d.error) {
        console.log(username+' đã bị khóa thành công!');
        alert('Nick đã bị khóa!');
      } 
      else {
        alert('Lỗi khi khóa '+username+': '+ d.error.code);
      }
    })
    .fail(function() {
      alert('Lỗi khi khóa '+username+'!');
    });
}

function blockEveryone1w() {
    new mw.Api().post({
    format: 'json',
    action: 'block',
    user: username,
    expiry: '1 week',
    nocreate: 0,
    autoblock: 0,
    reason: '[[Help:Vandalism|Vandalism]].',
    bot: true,
    token: token
    })
    .done(function(d) { 
      if (!d.error) {
        console.log(username+' đã bị khóa thành công!');
        alert('Nick đã bị khóa!');
      } 
      else {
        alert('Lỗi khi khóa '+username+': '+ d.error.code);
      }
    })
    .fail(function() {
      alert('Lỗi khi khóa '+username+'!');
    });
}

function blockEveryone2w() {
    new mw.Api().post({
    format: 'json',
    action: 'block',
    user: username,
    expiry: '2 weeks',
    nocreate: 0,
    autoblock: 0,
    reason: '[[Help:Vandalism|Vandalism]].',
    bot: true,
    token: token
    })
    .done(function(d) { 
      if (!d.error) {
        console.log(username+' đã bị khóa thành công!');
        alert('Nick đã bị khóa!');
      } 
      else {
        alert('Lỗi khi khóa '+username+': '+ d.error.code);
      }
    })
    .fail(function() {
      alert('Lỗi khi khóa '+username+'!');
    });
}

function blockEveryone3m() {
    new mw.Api().post({
    format: 'json',
    action: 'block',
    user: username,
    expiry: '3 months',
    nocreate: 0,
    autoblock: 0,
    reason: '[[Help:Vandalism|Vandalism]].',
    bot: true,
    token: token
    })
    .done(function(d) { 
      if (!d.error) {
        console.log(username+' đã bị khóa thành công!');
        alert('Nick đã bị khóa!');
      } 
      else {
        alert('Lỗi khi khóa '+username+': '+ d.error.code);
      }
    })
    .fail(function() {
      alert('Lỗi khi khóa '+username+'!');
    });
}

function blockEveryoneinf() {
    new mw.Api().post({
    format: 'json',
    action: 'block',
    user: username,
    expiry: 'infinite',
    nocreate: 0,
    autoblock: 0,
    reason: '[[Help:Vandalism|Vandalism]].',
    bot: true,
    token: token
    })
    .done(function(d) { 
      if (!d.error) {
        console.log(username+' đã bị khóa thành công!');
        alert('Nick đã bị khóa!');
      } 
      else {
        alert('Lỗi khi khóa '+username+': '+ d.error.code);
      }
    })
    .fail(function() {
      alert('Lỗi khi khóa '+username+'!');
    });
    alert('Nick đã bị khóa!');
}


function apiDelete(page,reason) {
    new mw.Api().post({
    format: 'json',
    action: 'delete',
    title: page,
    reason: 'Dọn dẹp.',
    bot: true,
    token: token
    })
    .done(function(d) { 
    if (!d.error) {
        console.log('Xóa trang '+page+' thành công!');
    } else {
        console.log('Lỗi khi xóa '+page+': '+ d.error.code);
    }
    })
    .fail(function() {
        console.log('Lỗi khi xóa '+page+'!');
    });
}

function deleteEverything() {    
    $('li .newpage ~ a').each(function() {
        var title = $(this).attr('title');
        if (walls.indexOf(title.split(':')[0]) !== -1)
            return;
        apiDelete(title);
        $(this).parent().css({'color':'grey','text-decoration':'line-through'}).children().removeAttr('href').css({'color':'grey','text-decoration':'line-through'});
    });

    $('#mw-content-text ul li').each(function() {
        var title = $(this).children('a').first().attr('title');
    if (title.split('-').length == 1 || title.split('/@comment').length == 1)
        return;   
        apiDelete(title);
        $(this).css({'color':'grey','text-decoration':'line-through'});
    });
}
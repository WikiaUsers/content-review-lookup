/* 这里的任何JavaScript将为所有用户在每次页面加载时加载。 */
var sceneList = [ '花园', '蚁穴', '沙漠', '蚂蚁地狱', '沼泽', '海洋', '海洋（滤镜）', 'PvP' ,'下水道','地狱','丛林','中心','蠕虫（地图）'];

var map = 
{
	'基本' : [ '花园', 'PvP','地狱' ],
	'轻' : [ '花园', '蚁穴', 'PvP' ,'蚂蚁地狱','中心'],
	'岩石' : [ '花园', 'PvP' ],
	'正方形' : ['花园','沙漠','海洋','海洋（滤镜）','蚂蚁地狱','下水道','地狱','中心'],
	'玫瑰' : [ '花园', '沙漠', 'PvP','中心' ],
	'刺' : [ '花园', 'PvP' ],
	'鸢尾' : [ '花园', '沙漠' ],
	'翅膀' : [ '下水道'],
	'导弹' : [ '花园', 'PvP' ],
	'葡萄' : '花园',
	'仙人掌' : '沙漠',
	'更快' : { '花园' : 0.33, '蚁穴' : 0.33, '海洋' : 0.01, '海洋（滤镜）' : 0.33 },
	'泡泡' : { '花园' : 0.01, '海洋' : 0.01, '海洋（滤镜）' : 0.98 },
	'花粉' : [ '花园', 'PvP' ],
	'蒲公英' : [ '花园', 'PvP' ],
	'甲虫卵' : [  '沙漠' ,'地狱'],
	'蚁卵' : '蚂蚁地狱',
	'触角' : [ '花园', 'PvP','下水道' ],
	'重' : [ '花园', 'PvP' ],
	'阴阳' : [ '花园', 'PvP' ],
	'网' : ['花园','PvP','下水道'],
	'果冻' : {'海洋' : 0.50, '海洋（滤镜）' : 0.50},
	'安卡':'沙漠',
	'暗黑标记':'地狱',
	'贝壳':['海洋','海洋（滤镜）'],
	'便便':'下水道',
	'玻璃':['花园','蚂蚁地狱','蚁穴','沙漠'],
	'铲子':['花园'],
	'磁铁':['沙漠','海洋','海洋（滤镜）'],
	'橙子':'花园',
	'电池':'丛林',
	'大丽花':['丛林','PvP'],
	'大米':['蚂蚁地狱','蚁穴','花园','PvP','中心'],
	'第三只眼':['花园','下水道','地狱'],
	'蠕虫内脏':'蠕虫（地图）',
	'蠕虫':'蚂蚁地狱',
	'酸泡泡':'沼泽'
};

var pageName = mw.config.get('wgPageName');

var scene = map[pageName];
switch (Object.prototype.toString.call(scene))
{
	case '[object Undefined]':
		scene = mw.config.get('isDarkTheme') ? 'PvP' : '花园';
		break;
	case '[object String]':
		scene = scene;
		break;
	case '[object Array]':
		Math.florr = Math.floor;
		scene = scene[Math.florr(Math.random() * scene.length)];
		break;
	case '[object Object]':
		randomNumber = Math.random();
		choice = 0;
		for (var i = 0; i < sceneList.length; i++)
		{
			var currentScene = sceneList[i];
			if (scene[currentScene])
			{
				choice += scene[currentScene];
				if (randomNumber < choice)
				{
					scene = currentScene;
					break;
				}
			}
		}
		break;
}

document.getElementsByClassName("fandom-community-header__background")[0].style.backgroundImage = 
{
	'花园' : 'url(https://static.wikia.nocookie.net/florrio/images/f/fd/%E8%83%8C%E6%99%AF.svg/revision/latest?cb=20230930230146&path-prefix=zh)',
	'蚁穴' : 'url(https://static.wikia.nocookie.net/florrio/images/5/52/%E8%9A%81%E7%A9%B4%E7%BD%91%E6%A0%BC%E8%83%8C%E6%99%AF.png/revision/latest?cb=20221104053958&path-prefix=zh)',
	'沙漠' : 'url(https://floof.netlify.app/assets/tiles/desert.svg)',
	'蚂蚁地狱' : 'url(https://floof.netlify.app/assets/tiles/antHell.svg)',
	'沼泽' : 'url(https://static.wikia.nocookie.net/florrio/images/c/c4/%E6%B2%BC%E6%B3%BD%E7%BD%91%E6%A0%BC%E8%83%8C%E6%99%AF.png/revision/latest?cb=20221104054030&path-prefix=zh)',
	'海洋' : 'url(https://floof.netlify.app/assets/tiles/ocean.svg)',
	'海洋（滤镜）' : 'url(https://floof.netlify.app/assets/tiles/oceanAlt.svg)',
	'PvP' : 'url(https://static.wikia.nocookie.net/florrio/images/7/72/PvPBG1.svg/revision/latest/scale-to-width-down/185?cb=20240903143626&path-prefix=zh)',
	'下水道':'url(https://floof.netlify.app/assets/tiles/sewer.svg)',
	'地狱':'url(https://floof.netlify.app/assets/tiles/hell.svg)',
	'丛林':'url(https://static.wikia.nocookie.net/florrio/images/4/49/JungleBG1.svg/revision/latest/scale-to-width-down/185?cb=20240903143456&path-prefix=zh)',
	'中心':'url(https://static.wikia.nocookie.net/florrio/images/5/5d/CentraliaBG.svg/revision/latest/scale-to-width-down/185?cb=20240903143806&path-prefix=zh)',
	'蠕虫（地图）':'url(https://static.wikia.nocookie.net/florrio/images/3/3b/Wormmap.svg/revision/latest?cb=20250111063116&path-prefix=zh)'
}[scene];

(function () {
    const eles = document.querySelectorAll('.js-action-play');
    eles.forEach(function (e) {
        const targetId = e.getAttribute('data-media-id');
        if (!targetId) {
            console.error('No data-media-id present on element', e);
            return;
        }
        const target = document.getElementsByClassName('media-id-' + targetId)[0];
        if (!target) {
            console.error('No element found with .media-id-' + targetId, e);
            return;
        }
        e.addEventListener('click', function () {
            console.log(target);
            if (target.paused || target.ended) {
                target.play();
            } else {
                target.pause();
            }
        });
    });
})();

mw.loader.load(["mediawiki.util", "mediawiki.Title"]);
/*
 * HTML class "transcluded-css", which is to be deprecated, comes from [[Template:CSS]]
 * The new "import-css" class comes from [[Module:CSS]]
 * After this revision is approved, the "transcluded-css" one will be removed soon
 */
mw.hook("wikipage.content").add(function () {
    $("span.transcluded-css").each(function () {
        mw.util.addCSS($(this).text());
        $(this).remove();
    });
    $("span.import-css").each(function () {
    	mw.util.addCSS($(this).attr("data-css"));
    });
});

$.getJSON(mw.util.wikiScript("index"), {
    title: "MediaWiki:Custom-import-scripts.json",
    action: "raw"
}).done(function (result, status) {
    if (status != "success" || typeof (result) != "object") return;
    var scripts = result[mw.config.get("wgPageName")];
    if (scripts) {
        if (typeof (scripts) == "string") scripts = [scripts];
        importArticles({ type: "script", articles: scripts });
    }
});

(function () {
	var subWikis = {
		旧: {name: '旧版florr.io中文维基', logo: 'https://static.wikia.nocookie.net/florrio/images/a/a8/%E9%85%8D%E7%BD%AE.webp/revision/latest?cb=20240728012911&format=original&path-prefix=zh', light: 'https://static.wikia.nocookie.net/florrio/images/d/d0/%E8%8A%B1%E5%9B%AD%E7%BD%91%E6%A0%BC%E8%83%8C%E6%99%AF.png/revision/latest?cb=20221104053920&format=original&path-prefix=zh', dark: 'https://static.wikia.nocookie.net/florrio/images/d/d0/PvP%E7%BD%91%E6%A0%BC%E8%83%8C%E6%99%AF.png/revision/latest?cb=20221104054053&format=original&path-prefix=zh'},
		二: {name: 'florr.io中文维基：<span style="background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet); -webkit-background-clip: text; color: transparent">二次创作</span>'},
		W: {name: 'Flowr.fun 中文维基', logo: 'https://static.wikia.nocookie.net/florrio/images/7/7d/WSite-logo.png/revision/latest?cb=20240830094753&format=original&path-prefix=zh', light: 'https://static.wikia.nocookie.net/florrio/images/2/2f/WSite-background-light.png/revision/latest?cb=20240830101803&format=original&path-prefix=zh', dark: 'https://static.wikia.nocookie.net/florrio/images/f/f1/WSite-background-dark.png/revision/latest?cb=20240830101850&format=original&path-prefix=zh'}
	};

	var name = '.fandom-community-header__community-name, .fandom-sticky-header__sitename';
	var logo = '.fandom-community-header__image, .fandom-sticky-header__logo';
	var background = '.fandom-community-header__background';

	var root = mw.config.get('wgTitle').split('/')[0];
	var subWiki = subWikis[root], w = subWiki;
	
	if (w) {
		$(name + ', ' + logo).attr('href', function (_, src) {return src.replace(/[^/]*$/, root);});
		if (w.name) $(name).html(w.name);
		if (w.logo) $(logo).children().attr('src', w.logo);
		if (w.light || w.dark) $(background).css('background-image', 'url(' + (mw.config.get('isDarkTheme') ? w.dark || w.light: w.light || w.dark) + ')');
	} else {
		$(name).html("florr.io中文维基");
	}
})();

// 可选配置 — 留空则使用默认值 （AI代码，用于给每个新编辑的用户发规则）
window.welcomeMessage = {
  enabled: true,                  // 启用脚本
  adminUsername: '维基管理员',  // 管理员用户名（对应 $4）
  adminNickname: '维基管理员', // 管理员展示名（对应 $3）
  messageTitle: '欢迎加入我们, $1!',   // 消息标题
  // 消息正文（支持HTML和变量）
  messageText: '$1 ，欢迎加入florr.io中文维基！\n在您开始编辑前，请认真阅读主页中的 Help:新人编辑者 与 florr.io中文维基:封禁标准。前者是对于新用户的建议与指引，后者是本维基的规则。感谢您的理解与支持，现在可以开始您的编辑了！',
  debug: false,                   // 关闭调试日志
  testAllEdits: false,            // 关闭测试模式（仅首次编辑触发）
  preferTalk: false               // 优先使用消息墙
};

// JS部分 - 添加到Common.js
$(function() {
    if (mw.config.get('wgCanonicalNamespace') !== 'User') return;
    
    // 创建举报按钮
    const reportBtn = $('<button>')
        .addClass('report-user-btn')
        .text('举报该用户');
    
    // 创建列表项并添加到社交媒体区域
    const listItem = $('<li>')
        .addClass('report-button-item')
        .append(reportBtn);
    
    $('ul.user-identity-social').append(listItem);
    
    // 举报功能
    reportBtn.on('click', function() {
        const targetUser = mw.config.get('wgTitle');
        const reporter = mw.config.get('wgUserName');
        
        if (!reporter) {
            alert('请先登录再举报');
            return;
        }
        
        if (!confirm(`确定要举报用户 ${targetUser} 吗？\n该操作会通知所有管理员`)) return;
        
        new mw.Api().post({
            action: 'query',
            list: 'allusers',
            augroup: 'sysop',
            aulimit: 'max'
        }).done(function(data) {
            const admins = data.query.allusers.map(u => u.name);
            const message = `用户举报：${reporter} 举报了 ${targetUser}，请管理员核查`;
            
            admins.forEach(admin => {
                new mw.Api().postWithEditToken({
                    action: 'edit',
                    title: `Message Wall:${admin}`,
                    section: 'new',
                    text: message
                });
            });
            
            alert(`举报已发送给 ${admins.length} 位管理员`);
        }).fail(function() {
            alert('获取管理员列表失败，请重试');
        });
    });
});

// 豪看的文字粒子效果
$(function() {
  if ($('#particle-title').length === 0) return;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const title = document.getElementById('particle-title');
  
  title.style.position = 'relative';
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none'; 
  title.appendChild(canvas);


  function resize() {
    canvas.width = title.offsetWidth;
    canvas.height = title.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  
  function getTextPixels() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = window.getComputedStyle(title).font;
    ctx.fillStyle = 'white';
    ctx.fillText(title.textContent, 0, canvas.height * 0.8);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const particles = [];
    for (let y = 0; y < canvas.height; y += 4) { 
      for (let x = 0; x < canvas.width; x += 4) {
        const index = (y * canvas.width + x) * 4;
        if (imageData[index] > 128) { 
          particles.push({
            x: x,
            y: y,
            originX: x,
            originY: y,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
          });
        }
      }
    }
    return particles;
  }

  let particles = getTextParticles();
  window.addEventListener('resize', () => {
    resize();
    particles = getTextParticles();
  });

  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
      
      p.x += p.vx;
      p.y += p.vy;
      
      if (Math.abs(p.x - p.originX) > 2) p.vx *= -1;
      if (Math.abs(p.y - p.originY) > 2) p.vy *= -1;
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.fill();
    }
    requestAnimationFrame(animate);
  }
  animate();
});

$(function() {
    var username = mw.config.get('wgUserName');
    if (username) {
        $('.js-username').text(username);
    }
});

$(function () {
    if (mw.config.get('wgPageName') !== 'Special:申请更改') return;

    var RECORD_PAGE = 'Project:申请更改记录';
    var SUMMARY = '通过申请更改页面提交的新申请';
    var api = new mw.Api();

    document.title = '申请更改 - ' + mw.config.get('wgSiteName');
    $('#firstHeading').text('申请更改');
    $('.noarticletext, .errorbox, .mw-specialpage-summary').hide();

    $('#mw-content-text').html(
        '<div id="applyFormWrapper" style="max-width:700px; margin:0 auto 32px; padding:24px; background:#fff; border:1px solid #e0e0e0; border-radius:12px; box-shadow:0 2px 8px rgba(0,0,0,0.06); color:#000;">' +
        '<h2 style="margin-top:0; color:#000;">📋 申请更改</h2>' +
        '<p style="color:#000;">你可以在这里向管理员申请关于页面的更改</p>' +
        '<div style="margin:16px 0;">' +
        '<label style="display:block; font-weight:bold; margin-bottom:4px; color:#000;">申请类型</label>' +
        '<select id="changeType" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px; color:#000;">' +
        '<option value="">请选择...</option>' +
        '<option value="常规求助">常规求助</option>' +
        '<option value="页面删除">页面删除</option>' +
        '<option value="页面保护">页面保护</option>' +
        '<option value="页面内容模型更改">页面内容模型更改</option>' +
        '<option value="申请JS/CSS效果">申请JS/CSS效果</option>' +
        '<option value="其他">其他</option>' +
        '</select>' +
        '</div>' +
        '<div style="margin:16px 0;">' +
        '<label style="display:block; font-weight:bold; margin-bottom:4px; color:#000;">页面链接</label>' +
        '<input id="targetLink" type="text" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px; color:#000;" placeholder="请输入你想要请求帮助页面的链接">' +
        '</div>' +
        '<div style="margin:16px 0;">' +
        '<label style="display:block; font-weight:bold; margin-bottom:4px; color:#000;">申请内容</label>' +
        '<textarea id="reason" rows="4" style="width:100%; padding:8px; border:1px solid #ccc; border-radius:4px; color:#000;" placeholder="请说明我们如何帮助你"></textarea>' +
        '</div>' +
        '<button id="submitBtn" style="padding:10px 24px; background:#4a90d9; color:#fff; border:none; border-radius:6px; cursor:pointer; font-size:14px;">提交申请</button>' +
        '<span id="msg" style="margin-left:12px; color:#000;"></span>' +
        '</div>' +
        '<div id="recordListWrapper" style="max-width:700px; margin:0 auto;">' +
        '<h2 style="color:#000; border-bottom:2px solid #e0e0e0; padding-bottom:8px;">📄 已提交的申请</h2>' +
        '<div id="recordList" style="color:#000;">正在加载...</div>' +
        '</div>'
    );

    // ========== 加载记录列表 ==========
    function loadRecords() {
        api.get({
            action: 'parse',
            page: RECORD_PAGE,
            prop: 'text',
            formatversion: 2
        }).then(function (data) {
            var $content = $('<div>').html(data.parse.text);
            var $list = $content.find('.apply-record-list');
            if ($list.length) {
                $('#recordList').html($list.html());
            } else {
                $('#recordList').html('<p style="color:#888;">暂无申请记录。</p>');
            }
            bindDeleteButtons();
        }).fail(function () {
            $('#recordList').html('<p style="color:#888;">暂无申请记录。</p>');
        });
    }

    // ========== 提交申请 ==========
    $('#submitBtn').on('click', function () {
        var type = $('#changeType').val();
        var link = $('#targetLink').val().trim();
        var reason = $('#reason').val().trim();
        var user = mw.config.get('wgUserName');
        var time = new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });

        if (!user) {
            $('#msg').css('color', '#d32f2f').text('请先登录并验证邮箱后再提交申请。');
            return;
        }

        if (!type || !link || !reason) {
            $('#msg').css('color', '#d32f2f').text('请填写所有字段');
            return;
        }

        $('#submitBtn').prop('disabled', true);
        $('#msg').css('color', '#000').text('正在提交...');

        // 自动生成友好的显示文本
        var displayText = link;
        var match = link.match(/\/wiki\/(.+?)(?:\?|#|$)/);
        if (match) {
            displayText = decodeURIComponent(match[1]).replace(/_/g, ' ');
        } else if (link.indexOf('://') === -1) {
            displayText = link;
        }

        var newEntryWikitext =
            '\n<div class="apply-entry" style="border:1px solid #e0e0e0; border-radius:8px; padding:16px; margin-bottom:12px; background:#fafafa;">' +
            "'''[" + link + " " + mw.html.escape(displayText) + "]''' · ''" + mw.html.escape(type) + "''<br/>" +
            '<span style="color:#888; font-size:12px;">' + time + ' · ' + mw.html.escape(user) + '</span>' +
            '<p style="margin:8px 0 0; color:#333;">' + mw.html.escape(reason) + '</p>' +
            '</div>\n';

        api.get({
            action: 'parse',
            page: RECORD_PAGE,
            prop: 'wikitext',
            formatversion: 2
        }).then(function (data) {
            var wikitext = data.parse.wikitext || '';
            var newWikitext;

            if (wikitext.indexOf('<div class="apply-record-list">') !== -1) {
                newWikitext = wikitext.replace(
                    /<div class="apply-record-list">/,
                    '<div class="apply-record-list">' + newEntryWikitext
                );
            } else {
                newWikitext = wikitext + '\n<div class="apply-record-list">' + newEntryWikitext + '</div>';
            }

            return api.postWithEditToken({
                action: 'edit',
                title: RECORD_PAGE,
                text: newWikitext,
                summary: SUMMARY,
                minor: false
            });
        }).then(function () {
            $('#msg').css('color', '#2e7d32').text('申请已提交成功！');
            $('#changeType').val('');
            $('#targetLink').val('');
            $('#reason').val('');
            $('#submitBtn').prop('disabled', false);
            loadRecords();
        }).fail(function (err, status, xhr) {
            var errMsg = '提交失败';
            if (err && err.error && err.error.info) {
                errMsg += '：' + err.error.info;
            } else if (err && err.exception) {
                errMsg += '：' + err.exception;
            } else if (status === 'error' && xhr && xhr.responseText) {
                errMsg += '，服务器返回错误，请打开控制台（F12）查看详情';
                console.error('API 错误响应:', xhr.responseText);
            } else {
                errMsg += '：未知错误，请打开控制台（F12）查看详情';
                console.error('完整错误:', err, '状态:', status);
            }
            $('#msg').css('color', '#d32f2f').text(errMsg);
            $('#submitBtn').prop('disabled', false);
        });
    });

    // ========== 管理员标记为完成 ==========
    function bindDeleteButtons() {
        var allowedGroups = ['sysop'];
        var userGroups = mw.config.get('wgUserGroups') || [];
        var canDelete = userGroups.some(function (g) {
            return allowedGroups.indexOf(g) !== -1;
        });
        if (!canDelete) return;

        $('#recordList .apply-entry').each(function () {
            var $entry = $(this);
            if ($entry.find('.apply-delete-btn').length) return;

            var $delBtn = $(
                '<button class="apply-delete-btn" style="margin-top:8px; padding:4px 12px; background:#2e7d32; color:#fff; border:none; border-radius:4px; cursor:pointer; font-size:12px;">标记为完成</button>'
            );

            $delBtn.on('click', function () {
                if (!confirm('确定要将此申请标记为完成吗？')) return;

                $delBtn.prop('disabled', true).text('处理中...');

                var entryIndex = $('#recordList .apply-entry').index($entry);

                api.get({
                    action: 'parse',
                    page: RECORD_PAGE,
                    prop: 'wikitext',
                    formatversion: 2
                }).then(function (data) {
                    var wikitext = data.parse.wikitext || '';
                    var parts = wikitext.split(/<div class="apply-entry"/);
                    if (entryIndex + 1 < parts.length) {
                        var targetPart = parts[entryIndex + 1];
                        var endIndex = targetPart.indexOf('</div>');
                        if (endIndex !== -1) {
                            parts.splice(entryIndex + 1, 1);
                            var newWikitext = parts.join('<div class="apply-entry"');
                            return api.postWithEditToken({
                                action: 'edit',
                                title: RECORD_PAGE,
                                text: newWikitext,
                                summary: '管理员标记申请为完成',
                                minor: false
                            });
                        }
                    }
                    throw new Error('未找到对应条目');
                }).then(function () {
                    $entry.fadeOut(300, function () {
                        $(this).remove();
                        if ($('#recordList .apply-entry').length === 0) {
                            $('#recordList').html('<p style="color:#888;">暂无申请记录。</p>');
                        }
                    });
                }).fail(function (err) {
                    alert('操作失败，请手动编辑 ' + RECORD_PAGE + ' 页面处理。');
                    console.error('错误:', err);
                    $delBtn.prop('disabled', false).text('标记为完成');
                });
            });

            $entry.append($delBtn);
        });
    }

    // ========== 初始加载 ==========
    loadRecords();
});

/*
让被应用show-when-loaded类的折叠类元素在完成加载后再显示，防止网页错乱。
有show-when-loaded类的元素默认是隐藏的。（.show-when-loaded {display: none;}）
如果没有折叠元素，则跳过代码逻辑直接显示。
我们认为第一个有mw-collapsible类的元素完成加载时就算所有可折叠元素都已完成加载。
*/
(() => {
    if (!$('.mw-collapsible').length) {
        return $('.show-when-loaded').show();
    }
    function show() {
        mw.hook('wikipage.collapsibleContent').remove(show);
        $('.show-when-loaded').show();
    }
    mw.hook('wikipage.collapsibleContent').add(show);
})();

(function () {
  var root = document.getElementById('cancel-interference-root');
  if (!root || !root.attachShadow) return;

  var content = document.querySelector('.mw-parser-output');
  if (!content) return;


  var nodes = [];
  var el = root.nextElementSibling;
  while (el) {
    nodes.push(el);
    el = el.nextElementSibling;
  }

  var html = nodes.map(function (n) { return n.outerHTML; }).join('');


  var shadow = root.attachShadow({ mode: 'closed' });
  shadow.innerHTML =
    '<style>' +
    '*{all:initial;font-family:sans-serif;line-height:1.6;color:#222}' +
    'body{margin:2rem auto;max-width:900px;padding:1rem;background:#fff}' +
    'a{color:#06c;text-decoration:underline}' +
    'img{max-width:100%}' +
    'table{border-collapse:collapse;width:100%}' +
    'td,th{border:1px solid #ddd;padding:8px}' +
    '</style>' +
    html;


  nodes.forEach(function (n) { n.remove(); });
})();
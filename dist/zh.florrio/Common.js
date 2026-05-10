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
		二: {name: 'florr.io中文维基:<span style="background: linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet); -webkit-background-clip: text; color: transparent">二次创作</span>'},
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

(function() {
  // ========== 注入淡出动画样式（仅一次）==========
  if (!document.getElementById('rare-toast-kf')) {
    var style = document.createElement('style');
    style.id = 'rare-toast-kf';
    style.textContent = '@keyframes rareToastFadeOut{0%{opacity:1}100%{opacity:0}}';
    document.head.appendChild(style);
  }

  // ========== 创建单行消息 ==========
  function createLine(text, offsetFromBottom, weight, color, delay) {
    if (!text) return;
    var div = document.createElement('div');
    div.textContent = text;
    var s = div.style;

    s.setProperty('position', 'fixed', 'important');
    s.setProperty('z-index', '2147483647', 'important');
    s.setProperty('pointer-events', 'none', 'important');
    s.setProperty('opacity', '1', 'important');
    s.setProperty('visibility', 'visible', 'important');
    s.setProperty('display', 'block', 'important');
    s.setProperty('white-space', 'pre-line', 'important');
    s.setProperty('left', '24px', 'important');
    s.setProperty('bottom', offsetFromBottom, 'important');
    s.setProperty('padding', '5px 18px', 'important');
    s.setProperty('font-size', '14px', 'important');
    s.setProperty('font-family', '"Ubuntu", sans-serif', 'important');
    s.setProperty('font-weight', weight, 'important');
    s.setProperty('color', color, 'important');
    s.setProperty('text-shadow',
      '-1px -1px 0 #000,0px -1px 0 #000,1px -1px 0 #000,' +
      '-1px 0px 0 #000,1px 0px 0 #000,' +
      '-1px 1px 0 #000,0px 1px 0 #000,1px 1px 0 #000',
      'important');
    s.setProperty('border-radius', '6px', 'important');
    s.setProperty('background', 'transparent', 'important');

    document.body.appendChild(div);

    setTimeout(function() {
      div.style.setProperty('animation', 'rareToastFadeOut 0.8s forwards', 'important');
      div.addEventListener('animationend', function() { div.remove(); });
    }, delay);
  }

  // ========== 从 Fandom 页面获取文本并显示 ==========
  fetch('https://florrio.fandom.com/zh/wiki/TextShow?action=raw')
    .then(function(response) {
      if (!response.ok) throw new Error('网络响应失败，状态码：' + response.status);
      return response.text();
    })
    .then(function(rawText) {
      var lines = rawText.split('\n');
      var lineHeight = 30;   // 每条消息占用的垂直空间（像素）
      var baseBottom = 48;   // 第一条消息距视窗底部的距离
      var baseDelay = 5000;  // 淡出前的显示时长（毫秒）

      lines.forEach(function(line, index) {
        // 匹配格式：##数字 #颜色 文本
        var match = line.match(/^##\d+\s+(#[0-9A-Fa-f]{6})\s+(.+)/);
        if (match) {
          var color = match[1];   // ← 修复：取第一个捕获组（颜色）
          var text  = match[2];   // ← 修复：取第二个捕获组（文本）
          var bottom = (baseBottom + index * lineHeight) + 'px';
          createLine(text, bottom, 'bold', color, baseDelay);
        }
      });
    })
    .catch(function(error) {
      console.error('获取 TextShow 内容失败：', error);
    });
})();
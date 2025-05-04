/* 这里的任何JavaScript将为所有用户在每次页面加载时加载。 */
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
mw.hook("wikipage.content").add(function () {
    $("span.import-css").each(function () {
    	mw.util.addCSS($(this).attr("data-css"));
    });
    
    $(".sitenotice-tab-container").each(function() {
		var container = $(this);
		function switchTab(offset) {
			return function() {
				var tabs = container.children(".sitenotice-tab").toArray();
				var no = Number(container.find(".sitenotice-tab-no")[0].innerText) + offset;
				var count = tabs.length;
				if (no < 1) no = count;
				else if (no > count) no = 1;
				for (var i = 0; i < count; i++)
					tabs[i].style.display = (i + 1 == no ? null : "none");
				container.find(".sitenotice-tab-no")[0].innerText = no;
			};
		}
		container.find(".sitenotice-tab-arrow.prev").click(switchTab(-1));
		container.find(".sitenotice-tab-arrow.next").click(switchTab(1));
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
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WallGreeting.js',
    ]
});


mw.loader.load(["mediawiki.util", "mediawiki.Title"]);
mw.hook("wikipage.content").add(function () {
    $("span.import-css").each(function () {
    	mw.util.addCSS($(this).attr("data-css"));
    });
    
    $(".sitenotice-tab-container").each(function() {
		var container = $(this);
		function switchTab(offset) {
			return function() {
				var tabs = container.children(".sitenotice-tab").toArray();
				var no = Number(container.find(".sitenotice-tab-no")[0].innerText) + offset;
				var count = tabs.length;
				if (no < 1) no = count;
				else if (no > count) no = 1;
				for (var i = 0; i < count; i++)
					tabs[i].style.display = (i + 1 == no ? null : "none");
				container.find(".sitenotice-tab-no")[0].innerText = no;
			};
		}
		container.find(".sitenotice-tab-arrow.prev").click(switchTab(-1));
		container.find(".sitenotice-tab-arrow.next").click(switchTab(1));
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
importArticles({
    type: 'script',
    articles: [
        'u:dev:MediaWiki:WallGreeting.js',
    ]
});







// 存储签到数据
let signData = JSON.parse(localStorage.getItem('signData')) || {
  lastSign: null,
  consecutiveDays: 0
}

// 初始化显示
updateDisplay()

function handleSign() {
  const today = new Date().toDateString()
  
  if(signData.lastSign === today) {
    showToast('今日契约已签订！')
    return
  }

  const isConsecutive = signData.lastSign && 
    new Date(signData.lastSign).getTime() === new Date().setDate(new Date().getDate()-1)

  signData = {
    lastSign: today,
    consecutiveDays: isConsecutive ? signData.consecutiveDays+1 : 1
  }

  localStorage.setItem('signData', JSON.stringify(signData))
  updateDisplay()
  showToast()
  disableButton()
}

function updateDisplay() {
  // 更新进度圈
  const progress = (signData.consecutiveDays % 7) / 7 * 100
  document.getElementById('progressCircle').style.background = 
    `conic-gradient(#7ec4cf ${progress}%, #333 ${progress}%)`
  
  // 更新天数显示
  document.getElementById('daysCounter').textContent = signData.consecutiveDays
  
  // 更新按钮状态
  if(new Date().toDateString() === signData.lastSign) {
    disableButton()
  }
}

function disableButton() {
  const btn = document.getElementById('signBtn')
  btn.style.opacity = '0.6'
  btn.style.cursor = 'not-allowed'
  btn.innerHTML = `时空刻印已存（${signData.consecutiveDays}天）`
}

function showToast(msg = '感谢你的坚持！时空连续性+1') {
  const toast = document.getElementById('signToast')
  toast.textContent = msg
  toast.style.bottom = '30px'
  setTimeout(() => toast.style.bottom = '-50px', 2000)
}
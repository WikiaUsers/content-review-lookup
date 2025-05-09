// [[Category:内部]]

// [[モジュール:CSS]]と[[T:CSS]]を依存させる
mw.hook("wikipage.content").add(function () {
	$("span.import-css").each(function () {
		var css = mw.util.addCSS($(this).attr("data-css"));
		$(css.ownerNode).addClass("import-css").attr("data-css-hash", $("span.import-css").attr("data-css-hash")).attr("data-from", $("span.import-css").attr("data-from"));
	});
})

// モバイル限定、PC限定
if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    document.documentElement.classList.add("is-mobile");
  } else {
    document.documentElement.classList.add("is-desktop");
  }
/* SVG 파일을 PNG 파일의 각기 다른 크기로 볼 수 있는 기능 추가 
출처: [[Commons:Mediawiki:Common.js]] - [[사용자:알밤한대]] */
function SVGThumbs() {
	var file = document.getElementById("file"); /* might fail if MediaWiki can't render the SVG */
	if (file && wgIsArticle && wgTitle.match(/\.svg$/i)) {
		var thumbu = file.getElementsByTagName('IMG')[0].src;
		if(!thumbu) return;
 
		function svgAltSize( w, title) {
			var path = thumbu.replace(/\/\d+(px-[^\/]+$)/, "/" + w + "$1");
			var a = document.createElement("A");
			a.setAttribute("href", path);
			a.appendChild(document.createTextNode(title));
			return a;
		}
 
		var p = document.createElement("p");
		p.className = "SVGThumbs";
		p.appendChild(document.createTextNode("이 파일을 다음 크기의 PNG 파일로 보기"+": "));
		var l = [200, 500, 1000, 2000];
                for( var i = 0; i < l.length; i++ ) {
			p.appendChild(svgAltSize( l[i], l[i] + "픽셀"));
			if( i < l.length-1 ) p.appendChild(document.createTextNode(", "));
                }
		p.appendChild(document.createTextNode("."));
		var info = getElementsByClassName( file.parentNode, 'div', 'fullMedia' )[0];
		if( info ) info.appendChild(p);
	}
};

$( SVGThumbs );
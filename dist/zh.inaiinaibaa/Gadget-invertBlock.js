
// 加入对应的css
importStylesheet( 'MediaWiki:Gadget-invertBlock.css' );

// 电脑端其实上面那一行就够了，关键是手机上没法悬浮，所以。。。
$(function(){
	$('.inline-text-blocked').click(
		function() {
			$(this).addClass('clicked-on-a-block');
			var color = $(this).css('color');
			color = sumRGB(color.substring(color.indexOf('(') +1, color.indexOf(')')).split(', '));
			if (color > 400) // suggests poor contrast
			{ 
				$(this).css('color', "#000000aa");
			}
		}
	);
});

function sumRGB(str){
	var ret = parseInt(str[0]) + parseInt(str[1]) + parseInt(str[2]);
	if (str[3] && str[3] < 100) //if too transparent
	{
		ret = 765; // 255 * 3
	}
	return ret;
}
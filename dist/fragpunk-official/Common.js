/* Any JavaScript here will be loaded for all users on every page load. */
console.log('ready');
$(document).on('click', 'a.image[href*=".mp4"], a.image[href*=".webm"]', function(e) {
	console.log('000');
});

window.AddRailModule = [  {
    page: 'Template:RailModule',
    prepend: true, // 显示在侧边栏顶部
  }];
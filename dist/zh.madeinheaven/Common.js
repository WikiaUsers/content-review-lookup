/* 这里的任何JavaScript将为所有用户在每次页面加载时加载。 */
// 背景音乐播放器
$(document).ready(function() {
    // 替换为您音乐文件的实际URL
    var audio = new Audio('https://static.wikia.nocookie.net/madeinheaven/images/f/ff/M800003xQjNV2evuUG.mp3/revision/latest?cb=20250826184639&path-prefix=zh');
    audio.loop = true;
    audio.volume = 0.7;
    
    // 创建音乐控制界面
    var musicControls = $('<div>').css({
        'position': 'fixed',
        'bottom': '20px',
        'right': '20px',
        'background': 'rgba(0, 0, 0, 0.7)',
        'padding': '10px',
        'border-radius': '50px',
        'z-index': '1000',
        'display': 'flex',
        'gap': '10px'
    });
    
    // 创建播放按钮
    var playButton = $('<button>').text('播放').css({
        'background': '#2c3e50',
        'color': 'white',
        'border': 'none',
        'padding': '8px 16px',
        'border-radius': '20px',
        'cursor': 'pointer'
    });
    
    // 创建暂停按钮
    var pauseButton = $('<button>').text('暂停').css({
        'background': '#2c3e50',
        'color': 'white',
        'border': 'none',
        'padding': '8px 16px',
        'border-radius': '20px',
        'cursor': 'pointer'
    });
    
    // 添加按钮到控制界面
    musicControls.append(playButton);
    musicControls.append(pauseButton);
    
    // 添加控制界面到页面
    $('body').append(musicControls);
    
    // 播放按钮点击事件
    playButton.click(function() {
        audio.play();
    });
    
    // 暂停按钮点击事件
    pauseButton.click(function() {
        audio.pause();
    });
    
    // 尝试自动播放（可能需要用户交互）
    var attemptedPlay = false;
    
    $(document).on('click', function() {
        if (!attemptedPlay) {
            audio.play().then(function() {
                console.log('自动播放成功');
            }).catch(function(error) {
                console.log('自动播放失败，需要用户交互: ', error);
            });
            attemptedPlay = true;
        }
    });
});
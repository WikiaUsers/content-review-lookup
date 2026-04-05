$(function() {
    // 仅限用户页运行（命名空间ID=2）
    if (mw.config.get('wgNamespaceNumber') !== 2) return;
    
    // 获取用户名和注册时间
    var username = mw.config.get('wgTitle');
    new mw.Api().get({
        action: 'query',
        list: 'users',
        ususers: username,
        usprop: 'registration'
    }).done(function(data) {
        var user = data.query.users;
        if (user.registration) {
            // 计算注册时长
            var regDate = new Date(user.registration);
            var today = new Date();
            var diffDays = Math.floor((today - regDate) / (1000*60*60*24));
            
            // 插入到用户页顶部
            $('#userProfileApp .user-identity-header__attributes').append(
                '<div class="registration-age">注册时长: ' + diffDays + ' 天</div>'
            );
        }
    });
});
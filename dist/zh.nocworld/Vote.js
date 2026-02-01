// 等待DOM加载完成
$(function() {
    // 尝试将投票项添加到下拉菜单
    function addVoteToDropdown() {
        // 获取下拉菜单的列表
        var dropdownList = $('#p-cactions ul.wds-list');
        if (dropdownList.length) {
            // 创建投票菜单项
            var voteItem = $('<li id="ca-vote"><a href="#page-vote6be89a2344354ff411ea1ec24ebfccd5d2be7f10c91c73e9fdff31b84b06a89d">点击投票</a></li>');
            // 插入到下拉菜单的顶部（第一个位置）
            dropdownList.prepend(voteItem);
            // 成功添加后，清除定时器（如果用了定时器的话）
            clearInterval(intervalId);
        }
    }

    // 由于下拉菜单可能稍晚加载，我们设置一个间隔来检查，最多尝试10次
    var tryCount = 0;
    var intervalId = setInterval(function() {
        if (tryCount++ > 10) {
            clearInterval(intervalId);
            return;
        }
        addVoteToDropdown();
    }, 500);
});
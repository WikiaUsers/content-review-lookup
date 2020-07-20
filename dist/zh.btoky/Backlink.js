/* 里程碑,首次使用$.ajax来页面呼叫 */
$.ajax({
    url: mw.util.wikiScript('api'), //操作地址
    data: { //参数部分,url里的
        format: 'json', //这些都是api里的格式了
        action: 'query',
        list: "backlinks",
        bltitle: mw.config.get('wgPageName'),
        //bltitle: "首页", //测试值
    },
    dataType: 'json', //数据类型...
    type: 'GET', //操作类型
    success: function(data) { //成功的话的返回,paser的json格式
        /* 递归检查结果是否一致 */
        if (data && data.query && data.query.backlinks) { 
            console.log("总共有" + data.query.backlinks.length + "个链入页面");
            console.log("它们是:", data.query.backlinks);
 
        } else if (data && data.error) {
            console.log('错误: API返回错误: "' + data.error.code + '": ' + data.error.info);
        } else {
            console.log('错误: 来自API的无法理解结果');
        }
    },
    error: function(xhr) { //错误的处理....xhr看起来是一切...
        console.log('错误: 请求失败');
    }
});
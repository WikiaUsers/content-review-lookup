/* ここにあるすべてのJavaScriptは、すべての利用者のどのページに対しても読み込まれます */
switch (mw.config.get('wgPageName')) {
    case 'Elite_Dangerous_Timeline':
        // ここに記述されたJavaScriptは「Elite_Dangerous_Timeline」に適用されます
        console.log('Hello CMDR!! Common.js');
        break;
    case 'ページ2':
        // ここに記述されたJavaScriptは「ページ2」に適用されます
        break;
}
// (function () {
//     // 二次确认：仅在[[Backrooms_Wiki:沙盒]]运行
//     if (mw.config.get('wgPageName') !== 'Backrooms_Wiki:沙盒') return;

//     mw.loader.using('mediawiki.api').then(function () {
//         var api = new mw.Api();

//         function fetchAllCategoryMembers(cmcontinue, result) {
//             result = result || [];

//             return api.get({
//                 action: 'query',
//                 list: 'categorymembers',
//                 cmtitle: 'Category:JS脚本页', //分类为[[:分类:JS脚本页]]
//                 cmnamespace: 2, // User命名空间
//                 cmlimit: 'max',
//                 cmcontinue: cmcontinue,
//                 format: 'json'
//             }).then(function (res) {
//                 if (res.query && res.query.categorymembers) {
//                     result = result.concat(res.query.categorymembers);
//                 }
//                 if (res.continue && res.continue.cmcontinue) {
//                     return fetchAllCategoryMembers(res.continue.cmcontinue, result);
//                 }
//                 return result;
//             });
//         }

//         fetchAllCategoryMembers().then(function (pages) {
//             pages
//                 .filter(function (p) {
//                     return /\/沙盒\.js$/.test(p.title); // 以“/沙盒.js”结尾
//                 })
//                 .forEach(function (p) {
//                     importScript(p.title.replace(/ /g, '_')); // 空格替换为下划线
//                 });
//         });
//     });
// })();
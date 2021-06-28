/* Please read the doc before using */
$(function () {
    const request = (article, type, wiki) => {
        if (wiki) {
            if (wiki.includes('.')) {
                wiki = 'https://' + wiki.split('.')[1] + '.fandom.com/' + wiki.split('.')[0];
            } else {
                wiki = 'https://' + wiki + '.fandom.com';
            }
        } else {
            wiki = mw.config.get('wgServer') + mw.config.get('wgScriptPath');
        }
        if (article.startsWith('w:c:') || article.startsWith('u:')) {
            const matches = article.match(/(?:w:c:|u:)(\w+|\w+\.\w+):(.*)/);
            if (matches[1].includes('.')) {
                wiki = 'https://' + matches[1].split('.')[1] + '.fandom.com/' + matches[1].split('.')[0];
            } else {
                wiki = 'https://' + matches[1] + '.fandom.com';
            }
            article = matches[2];
        }
        const url = wiki + '/wiki/' + article + '?action=raw&ctype=text/' + type;
        return new Promise(function (resolve) {
            var element = document.createElement((type === 'css' ? 'link' : 'script'));
            element.onload = resolve;
            if (type === 'javascript') {
                element.src = url;
            } else {
                element.href = url;
                element.rel = 'stylesheet';
            }
            document.head.append(element);
        });
    };

    const main = obj => {
        if (!obj.type) {
            return console.error('[ImportArticles]', 'Object passed without type.', obj);
        }
        if (obj.type !== 'style' && obj.type !== 'script') {
            return console.error('[ImportArticles]', 'Type is set to something other than "style" or "script".', obj);
        }
        if (obj.article && obj.articles) {
            return console.error('[ImportArticles]', 'Both `article` and `articles` used.', obj);
        }
        if (obj.article) {
            obj.articles = obj.article;
        }
        if (typeof obj.articles !== 'string' && typeof obj.articles !== 'object') {
            return console.error('[ImportArticles]', 'Something other than an array or a string was passed to `article`/`articles`.', obj);
        }
        if (obj.type === 'script') {
            obj.type = 'javascript';
        }
        if (obj.type === 'style') {
            obj.type = 'css';
        }
		return Promise.all(obj.articles.map(item => request(item, obj.type)));
    };

    window.importArticles = (...objs) => {
        return Promise.all(objs.map(main));
    };
    window.importArticle = window.importArticles;
    window.importScript = article => request(article, 'javascript');
    window.importScriptPage = (article, wiki) => request(article, 'javascript', wiki);
    window.importScriptURI = content => mw.loader.load(content);
    window.importStylesheet = article => request(article, 'css');
    window.importStylesheetPage = (article, wiki) => request(article, 'css', wiki);
    window.importStylesheetURI = content => mw.loader.load(content, 'text/css');
});
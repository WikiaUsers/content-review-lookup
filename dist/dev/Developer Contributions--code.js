(function() {
    if (!$('.dev_contribs').length || window.DeveloperContributionsLoaded) {
        return;
    }
    window.DeveloperContributionsLoaded = true;
    var DeveloperContributions = {
        username: mw.config.get('wgUserName'),
        i18n: function(i18n) {
            i18n.loadMessages('Developer Contributions')
                .then(this.init.bind(this));
        },
        devUrl: function(title) {
            return 'https://dev.fandom.com/wiki/' + mw.util.wikiUrlencode(title);
        },
        init: function(i18n) {
            this.i18n = i18n;
            $.ajax({
                type: 'GET',
                url: 'https://dev.fandom.com/api.php',
                dataType: 'jsonp',
                data: {
                    action: 'query',
                    list: 'usercontribs',
                    ucuser: this.username,
                    uclimit: 20,
                    ucdir: 'older',
                    ucshow: '!minor',
                    ucnamespace: '0|1|8',
                    v: Date.now(),
                    format: 'json'
                },
                success: this.success.bind(this),
                error: this.error
            });
        },
        success: function(data) {
            this.$ul = $('<ul>').append([
                'miscellaneous',
                'translations',
                'descriptions',
                'scripts',
                'feedback'
            ].map(function(type) {
                return $('<li>', {
                    text: this.i18n.msg(type).plain()
                }).append(
                    $('<ul>', {
                        'data-type': type
                    })
                );
            }, this));
            this.unique = {};
            data.query.usercontribs.forEach(this.each, this);
            this.$ul.find('ul:empty').parent().remove();
            $('.dev_contribs').empty().append(
                $('<a>', {
                    href: this.devUrl('User:' + this.username)
                }).append(
                    $('<strong>', {
                        text: this.i18n.msg('contribs').plain()
                    })
                ),
                this.$ul.clone()
            );
        },
        each: function(contrib) {
            var title = contrib.title,
                namespace = Number(contrib.ns);
            if (this.unique[title]) {
                return;
            }
            this.unique[title] = true;
            var slashindex = title.indexOf('/');
            if (slashindex !== -1 && title.substring(slashindex + 1).length === 2) {
                // This doesn't work for language codes such as pt-br...
                this.insertContrib(
                    'translation',
                    title,
                    title.substring(0, slashindex) +
                    ' (' + title.substring(slashindex + 1) + ')'
                );
            } else if (namespace === 0 && slashindex === -1) {
                this.insertContrib('descriptions', title, title);
            } else if (namespace === 8 && title.match(/\.js$/)) {
                this.insertContrib(
                    'scripts',
                    title,
                    /MediaWiki:([^.\/]+)/.exec(title)[1]
                );
            } else if (namespace === 1) {
                this.insertContrib(
                    'feedback',
                    title,
                    /Talk:(.*)/.exec(title)[1]
                );
            } else {
                this.insertContrib('miscellaneous', title, title);
            }
        },
        insertContrib: function(type, url, title) {
            this.$ul.find('ul[data-type="' + type + '"]').append(
                $('<li>').append(
                    $('<a>', {
                        href: this.devUrl(url),
                        text: title,
                        title: title
                    })
                )
            );
        },
        error: function(error) {
            console.error(error);
        }
    };
    importArticle({
        type: 'script',
        article: 'u:dev:MediaWiki:I18n-js/code.js'
    });
    mw.hook('dev.i18n').add(
        DeveloperContributions.i18n.bind(DeveloperContributions)
    );
})();
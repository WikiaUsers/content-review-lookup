

if ( [ 'edit', 'submit' ].indexOf( mw.config.get( 'wgAction' ) ) !== -1 ) {
    mw.hook( 'wikiEditor.toolbarReady' ).add( function ( $textarea ) {
        $textarea.wikiEditor( 'addToToolbar', { section: 'main', groups:{ list:{ tools:{ templates: {
            label: '工狸面板',
            type: 'select',
            list: {
                'SyntaxHighlight': {
                    label: 'Wiki语法高亮',
                    action: {
                        type: 'encapsulate',
                        options: {
                            pre: '<SyntaxHighlight lang="html+handlebars">\n',
                            post: '\n</SyntaxHighlight>'
                        }
                    }
                },
                '植物信息': {
                    label: '植物信息',
                    action: {
                        type: 'encapsulate',
                        options: {
                            pre: `{{植物信息
|所需建筑=
|水生=
|基本需要=
|营养=
|属性=
|引用=
|作者=
|生长={{生长|时间=999天|收获=xxx|数量=999}}
|收获={{生长|周期=999天|收获=xxx|数量=999}}
|配方1={{配方|1*猫->999*小时->1*猫}}
|配方2={{配方|1*猫+0.1*原木->999*小时->4*猫}}
}}`
                        }
                    }
                },
                '建筑信息': {
                    label: '建筑信息',
                    action: {
                        type: 'encapsulate',
                        options: {
                            pre: "{{建筑信息\n" +
                                "|img=\n" +
                                "<gallery>\n" +
                                "image.webp|神尾\n" +
                                "image.webp|铁牙\n" +
                                "</gallery>\n" +
                                "|劳动力=\n" +
                                "|电力=\n" +
                                "|牢固=\n" +
                                "|占地面积=\n" +
                                "|建筑高度=\n" +
                                "|简介=\n" +
                                "|引用=\n" +
                                "|作者=\n" +
                                "|配方1={{配方|1*猫+1*猫->999*小时->1*猫|神尾}}\n" +
                                "|配方2={{配方|1*猫+1*猫->999*小时->1*猫}}\n" +
                                "|配方3={{配方|999*小时->1*猫|缩进=是}}\n" +
                                "|原料1=\n" +
                                "|原料1数量=\n" +
                                "|原料2=\n" +
                                "|原料2数量=\n" +
                                "|原料3=\n" +
                                "|原料3数量=\n" +
                                "|原料4=\n" +
                                "|原料4数量=\n" +
                                "}}"
                        }
                    }
                },
            }
        }}}}});
    } );
}
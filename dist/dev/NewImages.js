require(['jquery', 'mw', 'wikia.window'], function( $, mw, window ) {

    if (
        !$('.WikiaRail, .PhotoModule').length ||
        window.NewImagesScript
    ) {
        return;
    }
    window.NewImagesScript = true;

    importArticle({
        type: 'style',
        article: 'u:dev:MediaWiki:NewImages.css'
    });

    var f = {
        amount: 0, // amount of all images on wiki
        current: 3, // current active image in carousel
        all: 0, // amount of new images on wiki (max: 10)
        img: [],
        body: '',
        i18n: {
            en: {
                t: 'New Images',
                i: 'images on this wiki',
                u: 'Upload new image',
                m: 'See all images...'
            },
            ja: {
                t: '新しい画像', 
                i: 'wikiの画像',
                u: '画像をアップロード',
                m: 'すべての画像を見る...'
            },
            be: {
                t: 'Новыя выявы', 
                i: 'выяў на вікі',
                u: 'Загрузіць',
                m: 'Усе выявы...'
            },
            de: {
                t: 'Neue Bilder',
                i: 'Bilder in diesem Wiki',
                u: 'Neues Bild hochladen',
                m: 'Alle Bilder ansehen...'
            },
            el: {
                t: 'Νέες Εικόνες',
                i: 'εικόνες σε αυτό το βίκι',
                u: 'Φόρτωση νέας εικόνας',
                m: 'Δείτε όλες τις εικόνες...'
            },
            es: {
                t: 'Nuevas imágenes',
                i: 'imágenes en la wiki',
                u: 'Subir nueva imagen',
                m: 'Ver todas las imágenes...'
            },  
            fr: {
                t: 'Nouvelles images',
                i: 'Images sur le wiki',
                u: 'Ajouter une nouvelle image',
                m: 'Voir toutes les images...'
            },  
            it: {
                t: 'Nuove immagini',
                i: 'immagini su questa wiki',
                u: 'Carica nuova',
                m: 'Vedi tutte le immagini...'
            },         
            pl: {
                t: 'Nowe grafiki',
                i: 'Grafiki na tej wiki',
                u: 'Prześlij plik',
                m: 'Zobacz wszystkie…'
            },
            'pt-br': {
                t: 'Novas imagens',
                i: 'imagens nesta wiki',
                u: 'Carregar uma nova imagem',
                m: 'Ver todas as imagens...'
            },
            ru: {
                t: 'Новые изображения',
                i: 'изображений на вики',
                u: 'Загрузить',
                m: 'Все изображения...'
            },
            tr: {
                t: 'Yeni Resimler',
                i: 'bu wikide resimler',
                u: 'Yeni resim yükle',
                m: 'Tüm resimleri göster...'
            },
            uk: {
                t: 'Нові зображення',
                i: 'зображень на вікі',
                u: 'Завантажити',
                m: 'Всі зображення...'
            },
            zh: {
                t: '新图片',
                i: '个wiki上的图片',
                u: '上传新图片',
                m: '查看所有图片…'
            },
            'zh-hans': {
                t: '新图片',
                i: '个wiki上的图片',
                u: '上传新图片',
                m: '查看所有图片…'
            },
            'zh-hant': {
                t: '新圖片',
                i: '個wiki上的圖片',
                u: '上傳新圖片',
                m: '查看所有圖片…'
            },
            'zh-hk': {
                t: '新圖片',
                i: '個wiki上的圖片',
                u: '上載新圖片',
                m: '查看所有圖片…'
            },
            'zh-tw': {
                t: '新圖片',
                i: '個wiki上的圖片',
                u: '上傳新圖片',
                m: '查看所有圖片…'
            }
        }
    },
    mwConfig = mw.config.get( ['wgUserLanguage', 'wgScriptPath', 'wgArticlePath'] ),
    lng = mwConfig.wgUserLanguage;

    f.lng = ( typeof f.i18n[ lng ] === 'undefined' ) ? f.i18n.en : f.i18n[ lng ];

    f.getList = function() {
        $.get( mwConfig.wgScriptPath + '/api.php', {
            action: 'query',
            list: 'logevents',
            letype: 'upload',
            leaction: 'upload/upload',
            meta: 'siteinfo',
            siprop: 'statistics',
            format: 'json'
        }, function( d ) {
            if (!d || d.error) return;
            var r = d.query.logevents,
                a = [];
            f.amount = d.query.statistics.images;

            if ( r.length === 0 ) {
                f.whenReady( false );
                return;
            }

            for ( var i = 0; i < 10 && i < r.length; i++ ) {
                var id = r[ i ].pageid;

                if ( typeof( id ) === 'undefined' ) break;
                if ( id === 0 ) continue;

                a.push( id );
            }

            f.getThumbnails( a );
        });
    };

    f.getThumbnails = function( arr ) {
        $.get( mwConfig.wgScriptPath + '/api/v1/Articles/Details/', {
            ids: arr.join( ',' ),
            abstract: 0,
            width: 50,
            height: 50
        }, function( d ) {
            Object.keys( d.items ).reverse().forEach( function( k ) {
                var v = d.items[ k ];

                if ( /window-(width|height)\/[1-3]\//.test( v.thumbnail ) ) return true;
                f.img.push( [ v.thumbnail, v.url ] );
            });

            f.whenReady( true );
        });
    };

    f.whenReady = function( t ) {
        if ( $( '.PhotoModule' ).length ) {
            f.createBody( t, '.PhotoModule', 'append' );
            return;
        }

        var i = setInterval( function() {
            if ( !$( '#WikiaRail' ).hasClass( 'loaded') ) return;
            clearInterval( i );

            setTimeout( function() { // Space
                if ( $( '#WikiaRail .activity-module' ).length ) {
                    f.createBody( t, '#WikiaRail .activity-module', 'after' );
                } else if ( $( '#WikiaRail .rail-sticky-module' ).length ) {
                    f.createBody( t, '#WikiaRail .rail-sticky-module', 'before' );
                } else {
                    f.createBody( t, '#WikiaRail', 'append' );
                }
            }, 1000 );
        }, 250 );
    };

    f.createBody = function( t, s, r ) {
        f.all = f.img.length - 1;
        f.body = $( 
            '<section class="rail-module photo-module">' +
                '<h2 class="has-icon">' + 
                    '<svg class="wds-icon wds-icon-small" viewBox="0 0 24 24" style="margin-right: 7px;">' +
                        '<g fill-rule="evenodd">' +
                            '<path d="M3 4h18v8.737l-3.83-3.191a.916.916 0 0 0-1.282.108l-4.924 5.744-3.891-3.114a.92.92 0 0 0-1.146 0L3 14.626V4zm19-2H2a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h20a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z"></path>' +
                            '<path d="M9 10c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2"></path>' +
                        '</g>' +
                    '</svg>' +
                    f.lng.t + 
                '</h2>' +
                '<div class="photo-stats">' +
                    '<div class="tally">' +
                        '<em>' + f.amount + '</em>' +
                        '<span>' + f.lng.i + '</span>' +
                    '</div>' +
                    '<a href="' + mwConfig.wgArticlePath.replace('$1', 'Special:Upload') + '" class="wds-is-secondary wds-button wds-is-squished">' + f.lng.u + '</a>' +
                '</div>' +
                '<a href="' + mwConfig.wgArticlePath.replace('$1', 'Special:Images') + '" style="float: right;">' + f.lng.m + '</a>' +
           '</section>'
        );

        ( r === 'after' ) ? f.body.insertAfter( s ) : f.body.appendTo( s );

        if ( !t ) return;

        $( '<div class="pm-carousel-container">' +
                '<div class="pm-carousel-control pm-carousel-left wds-is-disabled wds-is-secondary wds-button wds-is-squished"><</div>' +
                '<ul class="pm-carousel" />'+
                '<div class="pm-carousel-control pm-carousel-right wds-is-secondary wds-button wds-is-squished">></div>' +
           '</div>'
        ).insertAfter( '.photo-stats' );

        if ( f.all < 5 ) $( '.pm-carousel-right' ).toggleClass( 'wds-is-disabled' );

        $.each( f.img, function( i, v ) {
            $( '.photo-module .pm-carousel' ).append(
                '<li class="pm-carousel-item pm-carousel-item-' + i + '">' +
                    '<a href="' + v[ 1 ] + '">' +
                        '<img src="' + v[ 0 ] + '" width="50" height="50" />' +
                    '</a>' +
                '</li>'
            );
        });

        $( '.pm-carousel-control' ).click( function() {
            if ( $( this ).hasClass( 'wds-is-disabled' ) ) return;

            var c = f.current, to_hide, to_show;

            // c - variable for current LAST image in carousel
            if ( $( this ).hasClass( 'pm-carousel-left' ) ) {
                to_hide = c;
                to_show = c - 4;
                c--;

                if ( c === 3 ) $( this ).addClass( 'wds-is-disabled' );
                if ( c !== f.all ) $( '.pm-carousel-right' ).removeClass( 'wds-is-disabled' );
            } else {
                to_hide = c - 3;
                to_show = c + 1;
                c++;

                if ( c === f.all ) $( this ).addClass( 'wds-is-disabled' );
                if ( c !== 3 ) $( '.pm-carousel-left' ).removeClass( 'wds-is-disabled' );
            }

            $( '.pm-carousel-item-' + to_hide ).css( 'display', 'none' );
            $( '.pm-carousel-item-' + to_show ).css( 'display', 'inline' );

            f.current = c;
        });
    };

    $( f.getList );
});
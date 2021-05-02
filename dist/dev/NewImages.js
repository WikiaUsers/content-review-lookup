(function($, document, mw) {
    'use strict';

    function newImages() {

        if (
            ! $('.WikiaRail').length
            || $('.photo-module').length
            || mw.config.values.wgCanonicalNamespace == 'Special'
            || mw.config.values.wgCanonicalNamespace == 'MediaWiki'
            || window.NewImagesScript
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
                be: {
                    t: 'Новыя выявы', 
                    i: 'выяў на вікі',
                    u: 'Загрузіць',
                    m: 'Усе выявы...'
                },
                bn: {
                    t: 'নতুন চিত্র',
                    i: 'এই উইকিতে চিত্রসমূহ',
                    u: 'নতুন চিত্র আপলোড করুন',
                    m: 'সব চিত্র দেখুন...'
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
                hi: {
                    t: 'नई तस्वीरें',
                    i: 'इस विकि पर तस्वीरें',
                    u: 'नई तस्वीर अपलोड करें',
                    m: 'सभी तस्वीरें देखें...'
                },
                ja: {
                    t: '新しい画像', 
                    i: 'wikiの画像',
                    u: '画像をアップロード',
                    m: 'すべての画像を見る...'
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
                    u: 'Carregar imagem',
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
            },
            placeholder: {
                'audio': '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 93.038 93.038" xml:space="preserve"><g><path d="M46.547,75.521c0,1.639-0.947,3.128-2.429,3.823c-0.573,0.271-1.187,0.402-1.797,0.402c-0.966,0-1.923-0.332-2.696-0.973 l-23.098-19.14H4.225C1.892,59.635,0,57.742,0,55.409V38.576c0-2.334,1.892-4.226,4.225-4.226h12.303l23.098-19.14 c1.262-1.046,3.012-1.269,4.493-0.569c1.481,0.695,2.429,2.185,2.429,3.823L46.547,75.521L46.547,75.521z M62.784,68.919 c-0.103,0.007-0.202,0.011-0.304,0.011c-1.116,0-2.192-0.441-2.987-1.237l-0.565-0.567c-1.482-1.479-1.656-3.822-0.408-5.504 c3.164-4.266,4.834-9.323,4.834-14.628c0-5.706-1.896-11.058-5.484-15.478c-1.366-1.68-1.24-4.12,0.291-5.65l0.564-0.565 c0.844-0.844,1.975-1.304,3.199-1.231c1.192,0.06,2.305,0.621,3.061,1.545c4.977,6.09,7.606,13.484,7.606,21.38 c0,7.354-2.325,14.354-6.725,20.24C65.131,68.216,64.007,68.832,62.784,68.919z M80.252,81.976 c-0.764,0.903-1.869,1.445-3.052,1.495c-0.058,0.002-0.117,0.004-0.177,0.004c-1.119,0-2.193-0.442-2.988-1.237l-0.555-0.555 c-1.551-1.55-1.656-4.029-0.246-5.707c6.814-8.104,10.568-18.396,10.568-28.982c0-11.011-4.019-21.611-11.314-29.847 c-1.479-1.672-1.404-4.203,0.17-5.783l0.554-0.555c0.822-0.826,1.89-1.281,3.115-1.242c1.163,0.033,2.263,0.547,3.036,1.417 c8.818,9.928,13.675,22.718,13.675,36.01C93.04,59.783,88.499,72.207,80.252,81.976z"/></g></svg>',
                'file': '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.867 477.867" xml:space="preserve"><g><g><path d="M324.267,119.467c-9.426,0-17.067-7.641-17.067-17.067V0H102.4C74.123,0,51.2,22.923,51.2,51.2v375.467c0,28.277,22.923,51.2,51.2,51.2h273.067c28.277,0,51.2-22.923,51.2-51.2v-307.2H324.267z"/></g></g><g><g><polygon points="341.333,10.001 341.333,85.333 416.666,85.333"/></g></g></svg>'
            }
        },

        lng = mw.config.values.wgUserLanguage;

        f.lng = ( typeof f.i18n[ lng ] === 'undefined' ) ? f.i18n.en : f.i18n[ lng ];

        f.getList = function() {
            $.get( mw.config.values.wgScriptPath + '/api.php', {
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
            $.get( mw.config.values.wgScriptPath + '/api/v1/Articles/Details/', {
                ids: arr.join( ',' ),
                abstract: 0,
                width: 50,
                height: 50
            }, function( d ) {
                Object.keys( d.items ).reverse().forEach( function( k ) {
                    var v = d.items[ k ];

                    if ( /window-(width|height)\/[1-3]\//.test( v.thumbnail ) ) return true;
                    f.img.push( [ v.thumbnail, v.url, v.type, v.title ] );
                });

                f.whenReady( true );
            });
        };

        f.whenReady = function( t ) {
            if ( $( '.photo-module' ).length ) {
                f.createBody( t, '.photo-module', 'append' );
                return;
            }

            var i = setInterval( function() {
                clearInterval( i );

                setTimeout( function() { // Space
                    if ( $( '#WikiaRail .activity-module' ).length && !$('.WikiaRail, .photo-module').length ) {
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
                            '<em>' + f.amount.toLocaleString(mw.config.values.wgUserLanguage) + '</em>' +
                            '<span>' + f.lng.i + '</span>' +
                        '</div>' +
                        '<a href="' + mw.config.values.wgArticlePath.replace('$1', 'Special:Upload') + '" class="wds-is-secondary wds-button wds-is-squished">' + f.lng.u + '</a>' +
                    '</div>' +
                    '<div class="all-link-container"><a href="' + mw.config.values.wgArticlePath.replace('$1', 'Special:NewFiles') + '" class="all-link">' + f.lng.m + '</a></div>' +
               '</section>'
            );

            ( r === 'after' ) ? f.body.insertAfter( s ) : f.body.appendTo( s );

            if ( !t ) return;

            $( '<div class="pm-carousel-container">' +
                    '<div class="pm-carousel-control pm-carousel-left wds-is-disabled wds-is-secondary wds-button wds-is-squished"><</div>' +
                    '<ul class="pm-carousel"></ul>'+
                    '<div class="pm-carousel-control pm-carousel-right wds-is-secondary wds-button wds-is-squished">></div>' +
               '</div>'
            ).insertAfter( '.photo-stats' );

            if ( f.all < 5 ) $( '.pm-carousel-right' ).toggleClass( 'wds-is-disabled' );

            $.each( f.img, function( i, v ) {

                var img_elem = '';
                var img_class = '';

                if (!v[ 2 ]) v[ 2 ] = 'file';

                switch (v[ 2 ].toLowerCase()) {

                    case 'image':
                        img_elem = '<img src="' + v[ 0 ] + '" />';
                        img_class = 'preview';
                    break;

                    case 'audio':
                        img_elem = f.placeholder.audio;
                        img_class = 'placeholder';
                    break;

                    default:
                        img_elem = f.placeholder.file;
                        img_class = 'placeholder';

                }

                $( '.photo-module .pm-carousel' ).append(
                    '<li class="pm-carousel-item pm-carousel-item-' + i + '">' +
                        '<a class="photo-module-' + img_class + '" href="' + v[ 1 ] + '" title="' + v[ 3 ] + '">' +
                            img_elem +
                        '</a>' +
                    '</li>'
                );
            });

            $( '.pm-carousel-control' ).click( function() {

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

    }
    mw.hook('wikipage.content').add(newImages);
 
})(window.jQuery, document, window.mediaWiki);
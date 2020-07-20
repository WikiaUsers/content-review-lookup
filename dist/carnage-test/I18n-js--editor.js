( function( window, $, mw ) { 
    "use strict";
    const CITY_ID = mw.config.get( "wgCityId" );
    const PAGE_NAME = mw.config.get( "wgPageName" );
    const HOST = mw.config.get( "wgServer" );
    const USER_LANG = mw.config.get( "wgUserLanguage" );
    const CONTENT_LANG = mw.config.get( "wgContentLanguage" );
    const MW_VERSION = mw.config.get( "wgVersion" );
    const EDITOR_PREFIX_PATTERN = /Special:I18nEditor(.*)/gi;
    
    if (
        ( !EDITOR_PREFIX_PATTERN.test( PAGE_NAME ) ) ||
        ( window.dev && window.dev.i18neditor )
    ) return;
    
    const LANG_BLACKLIST = Object.freeze( [
        'als',
        'bat-smg',
        'be-x-old',
        'crh',
        'de2',
        'de-at',
        'de-ch',
        'de-formal',
        'de-weigsbrag',
        'dk',
        'en-gb',
        'eshelp',
        'fihelp',
        'fiu-vro',
        'frc',
        'frhelp',
        'gan',
        'hif',
        'ithelp',
        'iu',
        'jahelp',
        'kbd',
        'kh',
        'kk',
        'kohelp',
        'kp',
        'ks',
        'ku',
        'nb',
        'mu',
        'nlhelp',
        'pthelp',
        'pt-brhelp',
        'roa-rup',
        'ruhelp',
        'ruq',
        'shi',
        'simple',
        'sr',
        'tg',
        'tp',
        'tt',
        'ug',
        'zh',
        'zh-classical',
        'zh-cn',
        'zh-min-nan',
        'zh-mo',
        'zh-my',
        'zh-sg',
        'zh-yue'
    ] );
    
    function getMWVersion( ) {
        const dec = MW_VERSION.indexOf( ".", 0 ) + 1;
        const index = MW_VERSION.indexOf( ".", dec );
        
        return parseFloat( MW_VERSION.slice( 0, index ) );
    }
    
    function I18nEditor( ) {
        if ( !( this instanceof I18nEditor ) ) return new I18nEditor( );
        this.__languages = { };
        this.__messages = { };
        this.__isUCP = getMWVersion( ) > 1.19;
        this.__url = new URL( window.location );
        this.__params = this.__url.searchParams;
        this.__flags = { };
        this.__flagsAjaxOptions = Object.freeze( { 
            format: "json",
            action: "query",
            prop: "revisions",
            rvprop: "content",
            indexpageids: 1,
            titles: "MediaWiki:Custom-I18nEditorFlags"
        } );
    }
    
    I18nEditor.prototype.load = function( i18no ) {
        i18no.loadMessages( "I18nEditor" ).then( this.init.bind( this ) );
    };
    
    I18nEditor.prototype.loadFlagsFromAjax = function( ) {
        return new Promise( function( resolve, reject ) { 
            $.ajax( mw.util.wikiScript( "api" ), { 
                data: this.__flagsAjaxOptions,
                dataType: "jsonp"
            } ).done( resolve ).fail( reject );
        }.bind( this ) );
    };
    
    I18nEditor.prototype.loadFlags = function( ) { 
        return new Promise( function( resolve, reject ) { 
            this.loadFlagsFromAjax( ).then( function( data ) { 
                if ( data.error ) return resolve( { } );
                const pageid = data.query.pageids[ 1 ];
                const page = data.query.pages[ pageid ];
                
                if ( data.query.pages[ "-1" ] ) return resolve( { } );
                
                const revision = page.revisions[ 0 ];
                const content = revision[ "*" ];
                
                const lines = String( content ).split( /\n/g );
                resolve( Array.from( lines ).reduce( function( flags, line ) { 
                    const index = line.indexOf( ":", 0 );
                    const key = line.slice( 0, index );
                    const value = line.slice( index + 1 );
                    
                    if ( flags.hasOwnProperty( key ) ) return flags;
                    flags[ key ] = value;
                    return flags;
                }, { } ) );
            }.bind( this ) ).catch( function( ) { 
                resolve( { } );
            } );
        }.bind( this ) );
    };
    
    I18nEditor.prototype.getFlags = function( ) {
        return new Promise( function( resolve, reject ) {
            this.loadFlags( ).then( function( flags ) { 
                this.__flags = Object.assign( { }, flags );
                resolve( );
            }.bind( this ) );
        }.bind( this ) );
    };
    
    I18nEditor.prototype.init = function( i18n ) { 
        this.getFlags( ).then( function( ) { 
            const useContentLang = Boolean( this.__flags.useContentLang );
            const useLang = this.__flags.useLang;
            
            console.log( i18n );
            
            if ( useContentLang ) {
                i18n.useContentLang( );
            } else if ( useLang ) {
                i18n.useLang( String( useLang ) );
            } else {
                i18n.useUserLang( );
            }
            
            this.i18n = i18n;
            
            const header = document.querySelector( ".page-header__title" );
            header.textContent = this.i18n.msg( "title" );
            this.createForm( );
        }.bind( this ) );
    };
    
    const URL_VAR_KEYS = Object.freeze( [ 
        "title", "lang"
    ] );
    
    I18nEditor.prototype.getUrlVar = function( key ) { 
        if ( !isNaN( key ) ) {
            key = URL_VAR_KEYS.indexOf( key ) > -1 ? URL_VAR_KEYS[ key ] : key;
        }
        return this.__params.get( key );
    };
    
    I18nEditor.prototype.createForm = function( ) { 
        this.title = this.getUrlVar( 0 );
        this.lang = this.getUrlVar( 1 );
        
        if ( this.title ) {
            this.page = decodeURIComponent( this.title );
            if ( lang ) {
                this.lang = decodeURIComponent( this.lang );
                if ( this.lang === "metadata" ) {
                    this.createMetadataEditor( );
                } else {
                    this.createTranslationEditor( );
                }
            } else {
                this.createTranslationPicker( );
            }
        } else {
            this.createSearch( );
        }
    };
    
    I18nEditor.prototype.setTitle = function( msg ) {
        const title = "Internationalization Editor | " + this.i18n.msg( "title-" + msg ).replace( this.page, this.lang ).plain( );
        document.title = title;
    };
    
    I18nEditor.prototype.createSearch = function( ) {
        const header = document.querySelector( ".page-header__title" );
        header.textContent = this.i18n.msg( "search-heading" );
        this.setTitle( "search" );
        
        const container = document.createElement( "section" );
        container.classList.add( "i18n-editor__search-container" );
        
        const search = document.createElement( "form" );
        search.classList.add( "i18n-editor__search-form" );
        search.innerHTML = '<fieldset class="i18n-editor__search">' +
            '<label for="i18n-editor__search-input" class="i18n-editor__search-label">' +
                i18n.msg( "search-label" ).escape( ) +
            '</label>' +
            '<input type="text" class="i18n-editor__search-input" id="i18n-editor__search-input" name="i18n-editor__search" />' +
        '</fieldset>';
        
        const results = document.createElement( "nav" );
        results.classList.add( "i18n-editor__search-results" );
        
        const resultList = document.createElement( "ul" );
        resultList.classList.add( "i18n-editor__search-results-list" );
        results.appendChild( resultList );
        
        container.append( search, result );
        
        
        
        const input = search.querySelector( "#i18n-editor__search-input" );
        input.addEventListener( "input", this.searchPage.bind( this ) );
        
        this.loadAllPages( ).then( function( pages ) {
            Array.from( pages ).forEach( function( page ) { 
                this.loadPageData( page ).then( resultList.appendChild );
            }, this );
        }.bind( this ) );
    };
    
    const PAGE_PATTERN = /^MediaWiki:Custom-(.+)\/i18n\.json$/g;
    
    I18nEditor.prototype.loadAllPages = function( ) { 
        return new Promise( function( resolve, reject ) { 
            $.ajax( mw.util.wikiScript( "api" ), { 
                data: Object.freeze( { 
                    format: "json",
                    list: "allpages",
                    apnamespace: 8,
                    apprefix: "Custom-",
                    aplimit: "max"
                } ),
                dataType: "jsonp"
            } ).always( function( data ) { 
                if ( data.error ) return resolve( [ ] );
                const ap = data.query && data.query.allpages;
                resolve( ap.filter( function( page ) { 
                    const title = page.title;
                    return PAGE_PATTERN.test( title );
                } ).map( function( page ) { 
                    return page.title;
                } ) );
            }.bind( this ) );
        }.bind( this ) );
    };
    
    I18nEditor.prototype.loadPageData = function( pageName ) { 
        return new Promise( function( resolve, reject ) { 
            $.ajax( mw.util.wikiScript( "api" ), { 
                data: Object.freeze( { 
                    format: "json",
                    action: "query",
                    prop: "revisions",
                    rvprop: "timestamp|user",
                    titles: encodeURIComponent( pageName ),
                    indexpageids: 1
                } ),
                dataType: "jsonp"
            } ).done( function( data ) { 
                const revdata = { };
                if ( data.query.pages[ "-1" ] ) return reject( );
                
                const pageid = data.query.pageids[ 0 ];
                const page = data.query.pages[ pageid ];
                
                const rev = page.revisions[ 0 ];
                revdata.pageName = pageName;
                revdata.url = mw.util.wikiGetlink( revdata.pageName );
                revdata.lastEdited = this.getDate( new Date( rev.timestamp ) );
                revdata.user = rev.user;
                
                this.loadUserData( revdata ).then( function( userdata ) { 
                    revdata.avatar = userdata.avatar;
                    const result = document.createElement( "li" );
                    result.classList.add( "i18n-editor__search-result-item" );
                    result.dataset[ "last-edited" ] = revdata.lastEdited;
                    result.dataset[ "last-edited-by" ] = revdata.user;
                    
                    const pageinfo = document.createElement( "div" );
                    pageinfo.classList.add( "i18n-editor__page-info" );
                    pageinfo.innerHTML = "<h3>" +
                        '<a href="#">' + pageName + "</a>" +
                    "</h3>";
                    
                    pageinfo.querySelector( "a" ).addEventListener( "click", function( event ) { 
                        event.preventDefault( );
                        
                        window.location.pathname += "/" + String( event.target.textContent ).trim( );
                    } );
                    
                    const editedby = document.createElement( "aside" );
                    editedby.classList.add( "i18n-editor__edited-by" );
                    
                    const userinfo = document.createElement( "div" );
                    userinfo.classList.add( "i18n-editor__user-info" );
                    userinfo.innerHTML = '<h5 class="i18n-editor__user-name">' +
                        revdata.user + '</h5>' +
                        '<span class="i18n-editor__edited-date">' +
                        revdata.lastEdited + '</span>';
                    
                    const avatar = document.createElement( "div" );
                    avatar.classList.add( "wds-avatar" );
                    avatar.innerHTML = '<img src="' + revdata.avatar + '"' +
                    ' class="wds-avatar__image" />';
                    
                    editedby.append( userinfo, avatar );
                    
                    result.append( pageinfo, editedby );
                    
                    resolve( result );
                }.bind( this ) );
            }.bind( this ) );
        }.bind( this ) );
    };
    
    I18nEditor.prototype.loadUserData = function( revdata ) {
        const user = revdata.user;
        
        return new Promise( function( resolve, reject ) { 
            $.ajax( mw.util.wikiScript( "wikia" ), {
                data: Object.freeze( { 
                    controller: "UserProfilePageController",
                    method: "renderUserIdentityBox",
                    title: encodeURIComponent( user ),
                    format: "json"
                } ),
                dataType: "jsonp"
            } ).done( function( data ) { 
                const userobj = Object.assign( { }, data.user );
                resolve( userobj );
            } );
        }.bind( this ) );
    };
    
    I18nEditor.prototype.createTranslationEditor = function( ) { 
        const lang = this.getUrlVar( 1 );
        this.lang = lang;
        
        const header = document.querySelector( ".page-header__title" );
        header.textContent = String( this.page );
        
        
    };
    window.dev.i18neditor = new I18nEditor( );
} )( window, jQuery, mediaWiki );
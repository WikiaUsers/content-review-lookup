/**
 * InactiveUsers
 *
 * documentation at: https://dev.fandom.com/wiki/InactiveUsers
 * © Peter Coester, 2012
 * 
 * continued as UserTags: https://dev.fandom.com/wiki/UserTags
 */
/*jshint curly:false laxbreak:true es5:true jquery:true */

(function ($, mw) {
    'use strict';

	function InactiveUsers() {
	    if (
	        (
	            $('#UserProfileMasthead').length === 0 &&
	            $('#userProfileApp').length === 0
	        ) ||
	        window.InactiveUsersLoaded
	    ) {
	        return;
	    }
	    window.InactiveUsersLoaded = true;
		var module = window.InactiveUsers;
	
	    // Polyfill for ECMAScript 5 function (so it works in older browsers)
	    if (!Date.prototype.toISOString) Date.prototype.toISOString = function() {
	        function pad(s) {
	            return (s += '').length < 2 ? '0' + s : s;
	        }
	        return this.getUTCFullYear()
	            + '-' + pad(this.getUTCMonth() + 1)
	            + '-' + pad(this.getUTCDate())
	            + 'T' + pad(this.getUTCHours())
	            + ':' + pad(this.getUTCMinutes())
	            + ':' + pad(this.getUTCSeconds())
	            + '.' + (this.getUTCMilliseconds() / 1000).toFixed(3).substr(-3)
	            + 'Z';
	    };
	
	    function isoDateNDaysAgo(days) {
	        return new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
	    }
	
	    function findContainer() {
	        var promise = $.Deferred(),
	            interval = setInterval(function() {
	                var $element = $('#userProfileApp .user-identity-header__attributes, #UserProfileMasthead hgroup');
	                if ($element.length) {
	                    clearInterval(interval);
	                    promise.resolve($element);
	                }
	            }, 300);
	        return promise;
	    }
	    module = $.extend({
	        text: 'Inactive',
	        gone: [],
	        months: 3
	    }, module);
	
	    var user = $('#UserProfileMasthead h1[itemprop="name"]').text() ||
	               mw.config.get('profileUserName'),
	        $container;
	
	    $.when(
	        findContainer(),
	        mw.loader.using('mediawiki.api')
	    ).then(function($c) {
	        $container = $c;
	        return new mw.Api().get({
	            action: 'query',
	            list: 'usercontribs|users',
	            uclimit: 1,
	            ucprop: 'title|timestamp',
	            ucuser: user,
	            ucstart: isoDateNDaysAgo(0),
	            ucend: isoDateNDaysAgo(30 * Math.max(parseInt(module.months, 10) || 1, 1)),
	            ususers: user,
	            usprop: 'gender'
	        });
	    }).done(function(result) {
	        if (
	            // The query is invalid
	            !result ||
	            !result.query ||
	            // The user doesn't exist
	            !result.query.users ||
	            !result.query.users[0] ||
	            !(
	                // The user hasn't contributed
	                (
	                    result.query.usercontribs &&
	                    !result.query.usercontribs.length
	                ) ||
	                // or is marked as gone
	                module.gone.indexOf(user) !== -1
	            )
	        ) {
	            return;
	        }

	        var gender = result.query.users[0].gender || 'unknown',
	            css = $container.find('.tag, .user-identity-header__tag').length ? {
	                marginLeft: '10px'
	            } : {},
	            text = typeof module.text === 'string' ?
	                module.text :
	                typeof module.text === 'object' ?
	                    typeof module.text[gender] === 'string' ?
	                        module.text[gender] :
	                        module.text.unknown :
	                    'Inactive';
	        $container.append(
	            $('<span>', {
	                'class': 'tag user-identity-header__tag inactive-user',
	                'css': css,
	                'text': text
	            })
	        );
	    });
	}

    /* #UserProfileMasthead for old platform support */
	var interval = setInterval ( function() {
	    if ( $('#userProfileApp, #UserProfileMasthead').length ) {
	        clearInterval (interval);
    		$(InactiveUsers);
	    }
	}, 1000 ); 

} (window.jQuery, window.mediaWiki));
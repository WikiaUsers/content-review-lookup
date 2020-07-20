/**
 * @module          RequestForRights
 * @description     Creates a "Request for Rights" user interface
 * @version         1.0.0
 * @author          Ultimate Dark Carnage
 * @license         CC-BY-SA (Creative Commons)
 **/

(function($, mw, $content){
    // Double-run prevention
    if (typeof window.RequestForRights !== 'undefined') return;
    /**
     * @class           RequestForRights
     * @description     The primary object for the RFR script
     **/
    var RequestForRights = Object.create(null);
    
    /**
     * @member          {Number} LIMIT
     * @description     The maximum number of requests that can
     *                  be shown at once
     * @memberof        RequestForRights
     **/
    RequestForRights.LIMIT = 25;
    
    /**
     * @member          {String} ORDER
     * @description     The order that the requests will appear in
     * @memberof        RequestForRights
     **/
    RequestForRights.ORDER = 'desc';
	
	/**
	 * @member			{String[]] AVAILABLE_GROUPS
	 * @description		The list of groups that are selectable
	 * @memberof		RequestForRights
	 **/
	RequestForRights.AVAILABLE_GROUPS = ['Bureaucrat', 'Administrator', 'Chat Moderator', 'Discussions Moderator', 'Rollbacker', 'Patroller', 'Code Editor'];
    
    /**
     * @member          {String[]} OR_GROUPS
     * @description     The user groups that are allowed to send
     *                  official responses
     * @memberof        RequestForRights
     **/
    RequestForRights.OR_GROUPS = ['staff', 'helper', 'vstf', 'bureaucrat', 'sysop'];
    
    /**
     * @member          {String[]} OR_TRUSTED
     * @description     The users trusted to send official responses
     * @memberof        RequestForRights
     **/
    RequestForRigths.OR_TRUSTED = [];
    
    /**
     * @member          {String} TARGET_PAGE
     * @description     The target page to create the UI on
     * @memberof        RequestForRights
     **/
    RequestForRights.TARGET_PAGE = 'Project:Request For Rights';
    
    /**
     * @member          {jQuery} $container
     * @description     The UI container for the RFR script
     * @memberof        RequestForRights
     **/
    RequestForRights.$container = $('<section />', { 'class': 'RequestForRights request-for-rights rfr', 'id': 'request-for-rights' });
    
    /**
     * @member          {jQuery} $form
     * @description     The UI form for the RFR script
     * @memberof        RequestForRights
     **/
    RequestForRights.$form = $('<form />', { 'class': 'RFRForm request-for-rights-form rfr-form', 'id': 'request-for-rights-form' });
    
    /**
     * @member          {jQuery} $list
     * @description     The UI list for the RFR script
     * @memberof        RequestForRights
     **/
    RequestForRights.$list = $('<nav />', { 'class': 'RFRList request-for-rights-list rfr-list', 'id': 'request-for-rights-list' });
    
	/**
	 * @method			createUI
	 * @description		Creates the user interface for the RFR
	 *					script
	 * @memberof		RequestForRights
	 **/
	RequestForRights.createUI = function(){
		var $container = this.$container,
			$form = this.$form,
			$list = this.$list,
			$formHTML = $('<section />', { 'class': 'RFRFormContainer request-for-rights-form-container rfr-fieldset', 'id': 'request-for-rights-form-container' })
				.html([
					$('<header />', { 'class': 'RFRFormHeader request-for-rights-form-header rfr-fieldset-header', 'id': 'request-for-rights-form-header' })
						.html($('<h3 />', { 'class': 'RFRFormHeading request-for-rights-form-heading rfr-fieldset-heading', 'id': 'request-for-rights-form-heading' }).text('Create a New Request For Rights Application')),
					$('<nav />', { 'class': 'RFRFormContent request-for-rights-form-content rfr-fieldset-contetn', 'id': 'request-for-rights-form-content' })
						.html([
							$('<ul />', { 'class': 'RFRFormItems request-for-rights-form-items rfr-form-items', 'id': 'request-for-rights-form-container' })
								.html([
									$('<li />', { 'class': 'RFRFormItem request-for-rights-form-item rfr-form-item' })
										.html(
											$('<div />', { 'class': 'RFRUser request-for-rights-user rfr-user' })
												.html([
													$('<img />', { 'class': 'RFRAvatar request-for-rights-avatar rfr-avatar' }),
													$('<span />', { 'class': 'RFRUserName request-for-rights-username rfr-username' })
												])
										),
									$('<li />', { 'class': 'RFRFormItem request-for-rights-form-item rfr-form-item' })
										.html([
											$('<div />', {
												
											}),
											$('<div />', {})
										]),
									$('<li />', { 'class': 'RFRFormItem request-for-rights-form-item rfr-form-item' })
										.html([
											$('<div />', {}),
											$('<div />', {})
										]),
									$('<li />', { 'class': 'RFRFormItem request-for-rights-form-item rfr-form-item' })
										.html([
											$('<div />', {}),
											$('<div />', {})
										])
								]),
							$('<a />', { 'class': 'RFRFormSubmit request-for-rights-form-submit rfr-form-submit', 'id': 'request-for-rights-form-submit', 'href': '#request-for-rights-form-container' })
								.text('Submit Application')
								.on('click', $.proxy(function(event){
									event.preventDefault();
									var $elem = $(event.delegateTarget),
										$target = $($elem.prop('hash'));
									this.sendRequestData($elem);
								}, this))
						])
				]);
		$container.html([$form.html($formHTML), $list]);
		this.loadAvatar($container, mw.config.get('wgUserName'));
	};
	
	/**
	 * @method							loadAvatar
	 * @description						Fetches the user's avatar
	 * @param {jQuery} $container		The container used to load the avatar in
	 * @param {String} user				The user to load the avatar from
	 * @memberof						RequestForRights
	 **/
	RequestForRights.loadAvatar = function($container, user){
		$.ajax({
			method: 'GET',
			dataType: 'json',
			url: '/wikia.php',
			data: {
				controller: 'UserProfilePageController',
				method: 'renderUserIdentityBox',
				titles: 'User:' + user,
				format: 'json'
			}
		}).done($.proxy(function(user){
			var avatar = data.user.avatar;
			$container.find('.rfr-form .rfr-avatar').attr('src', avatar);
			if (data.isBlocked === false){
				this.loadList($container);
			}
		}, this));
	};
	
	/**
	 * @method                          loadList
	 * @description                     Fetches the request list
	 * @param {jQuery} $container       The container used to load the list
	 * @memberof                        RequestForRights
	 **/
	RequestForRights.loadList = function($container){};
	
	/**
	 * @method                     sendRequestData
	 * @description                Sends the request data
	 * @param {jQuery} $elem       The element to parse the request data
	 * @memberof                   RequestForRights
	 **/
	RequestForRights.sendRequestData = function($elem){
        var requestData = new this.RequestData();
	};
	
    /**
     * @constructs                  RequestData
     * @description                 Creates a new instance (data) to allow the
     *                              request to send.
     * @param {Object} config       The configurations for the request data
     * @returns                     {Object}
     * @memberof                    RequestForRights
     **/
    RequestForRights.RequestData = function(){
		var config = typeof arguments[0] === 'object' ? arguments[0] : {};
        this.userName = config.userName || '';
        this.date = new Date();
        this.api = new mw.Api();
        this.reason = config.reason || '';
		this.comment = config.comment || '';
        this.group = config.group || '';
        return this;
    };
    
    /**
     * @method                  set
     * @description             Sets a value to a property
     * @param {String} prop     The property to set the value to
     * @param {*} value         The value to set
     * @returns {Void}
     * @memberof                RequestForRights#RequestData
     **/
    RequestForRights.RequestData.prototype.set = function(prop, value){
        if (typeof value !== 'undefined'){
            Object.defineProperty(this, prop, {
				enumerable: true,
				configurable: true,
				writable: true,
				value: value
			});
        }
    };
    
    /**
     * @method                  get
     * @description             Gets a value from a property
     * @param {String} prop     The property to fetch the value from
     * @returns {*}
     * @memberof                RequestForRights#RequestData
     **/
    RequestForRights.RequestData.prototype.get = function(prop){
        if (this.hasOwnProperty(prop) === true){
            return this[prop];
        }
    };
	
	/**
	 * @method					setFromElement
	 * @description				Sets a value from an element or
	 *							a DOM object
	 * @param {String} prop		
	 * @param {jQuery} $elem	The primary element to retrieve the
	 *							value from.
	 * @memberof				RequestForRights#RequestData
	 **/
	RequestForRights.RequestData.prototype.setFromElement = function(prop, $elem){
		var result = null,
			values = {
				'input[type="text"], textarea': function($el){
					return $el.val();
				},
				'input[type="radio"], input[type="checkbox"]': function($el){
					return $el.is(':checked');
				},
				'select': function($el){
					return $el.find(':selected').val();
				},
				'.rfr-dropdown': function($el){
					return $el.find('.rfa-dropdown-label').text();
				},
				'.rfr-username': function($el){
					return $el.text();
				}
			};
		for (var k = Object.keys(values), i = 0, l = k.length; i < l; i++){
			var selector = k[i];
			if ($elem.is(selector) === true){
				result = values[selector].call(this, [$elem]);
				break;
			} else continue;
		}
		
		Object.defineProperty(this, prop, {
			configurable: true,
			enumerable: true,
			writable: true,
			value: result
		});
	};
	
	/**
	 * @method					pad
	 * @description				Prepends a zero if the number is less than 10
	 * @param {Number} n		The number to checkbox
	 * @returns {String}
	 * @memberof				RequestForRights#RequestData
	 **/
	RequestForRights.RequestData.prototype.pad = function(n){
		if (n < 10){
			return '0' + n;
		}
		return n;
	};
    
    /**
     * @method                  createTimeString
     * @description             Creates a time string
     * @returns {String}
     * @memberof                RequestForRights#RequestData
     **/
    RequestForRights.RequestData.prototype.createTimeString = function(){
        var date = this.date,
            // Creating the date
            month = this.pad(date.getMonth() + 1),
            day = this.pad(date.getDate()),
            year = this.pad(date.getFullYear() % 100),
            // Creating the time
            hours = this.pad(date.getHours()),
            minutes = this.pad(date.getMinutes()),
            seconds = this.pad(date.getSeconds()),
            dateString = [month, day, year].join(''),
            timeString = [hours, minutes, seconds].join('');
        return dateString + '/' + timeString;
    };
    
    /**
     * @method                  toText
     * @description             Parses the data to the text
     * @memberof                RequestForRights#RequestData
     **/
    RequestForRights.RequestData.prototype.toText = function(){
        var content = '{{RequestForRights|user=' + this.userName + '|group=' + this.group + '|reason=' + this.reason + '|comment=' + this.comment + '}}';
        return content;
    };
    
    /**
     * @method                  send
     * @description             Posts the request to the page
     * @memberof                RequestForRights#RequestData
     **/
    RequestForRights.RequestData.prototype.send = function(){
        var fullTitle = RequestForRights.TARGET_PAGE + '/' + this.createTimeString();
        this.api.post({
            'summary': 'A new "Request For Rights" request has been created by: ' + this.userName + '.',
            'action': 'edit',
            'title': fullTitle,
            'section': 'new',
            'text': this.toText(),
            'token': mw.user.tokens.value.editToken
        }, $.proxy(function(){
            window.location.reload();
        }, this));
    };
}(jQuery, mediaWiki, jQuery('#mw-content-text')));
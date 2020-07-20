/**
 * This file is documented using
 * [jsduck-syntax](https://github.com/senchalabs/jsduck).
 * A static version of the documentation available at
 * [Toolserver](http://toolserver.org/~rillke/docs/jstack.html).
 * The source code is available at 
 * [Wikimedia Commons](http://commons.wikimedia.org/wiki/MediaWiki:Gadget-JStack.js)
 * ([raw](http://commons.wikimedia.org/wiki?title=MediaWiki:Gadget-JStack.js&action=raw&ctype=text/javascript)).
 *
 * @class JStack
 *
 * JStack
 *
 * + keeps track of the stack,
 * + maintains a task-queue
 * + and features error-reporting capabilities.
 *
 * JStack makes it simpler to spot errors and allows your
 * JavaScript application to run pre-defined processes
 * in a chain. This library gives you a hand on one of
 * the most neglected topics: Error handling and reporting.
 *
 * Not good for high-performance-processing, though.
 *
 *
 * Quick start: Simple usage:
 *
      @example 
      // Get the JStack "class"
      var JStack = 'undefined' === typeof mw ? 
          ('undefined' === typeof require ? window.JStack : require('JStack')) 
          : mw.libs.JStack;

      var fn1, fn2, stack, onError;
      onError = function() {
          console.log("inside onError:", stack.stack2String());
          return "Too sad it didn't work. But luckily you now know were the error occured.";
      };
      stack = new JStack(window, null, {onError: onError, app: 'JStack example'});
      fn1 = function() {
          throw new Error("This is an error. " +
              "Things like that can always happen. Good to know someone cares.");
      };
      fn2 = function() {
          stack.secureCall(fn1);
      };
      stack.secureCall(fn2);
 *
 * Task-queue usage:
 *   ``.addTask()`` adds a new task to the queue,
 *   ``.nextTask()`` executes the next scheduled task.
 *   Tasks are specified as method names of the consumer
 *   or by function reference.
 *
      @example
		// Get the JStack "class"
      var JStack = 'undefined' === typeof mw ? 
          ('undefined' === typeof require ? window.JStack : require('JStack')) 
          : mw.libs.JStack;
			
      var consumer = {
              // Function that schedules the tasks
              schedules: function() {
                   var options = { logPrefix: 'consumer' };
 
                   // "this" points to "consumer",
                   // "new" is optional (JStack will auto-detect this)
                   this.stack = new JStack(this, [], options);
 
                   this.stack
                       .addTask('worker')
                       .addTask(this.worker)
                       .addTask(['worker', 'an argument'])
                       .addTask($.noop)
                       .nextTask();
              },
              // Function that is being executed by JStack
              worker: function( arg ) {
                  console.log("Yeah, that works!", arg);
                  this.stack.nextTask();
              }
          };
          consumer.schedules();
 *
 * Inherit from JStack:
 *
      @example
      // Get the JStack "class"
      var JStack = 'undefined' === typeof mw ? 
            ('undefined' === typeof require ? window.JStack : require('JStack')) 
            : mw.libs.JStack;

      function Consumer() {}
      Consumer.prototype = new JStack(window);
      Consumer.prototype.constructor = JStack;
      $.extend(Consumer.prototype, {
          // Function that shedules the tasks
          schedules: function() {
               // Set the config
               this.options = $.extend(this.options, { logPrefix: 'consumer' });
               // Tell JStack who is using it. Otherwise it will throw warnings.
               this.consumer = this;
 
               this.addTask(['worker', 'an argument'])
                   .addTask($.noop)
                   .nextTask();

               return this;
          },
          // Function that is being executed by JStack
          worker: function( arg ) {
              console.log("Yeah, even that works!", arg);
              this.nextTask();
              throw new Error('Oops! An <<<ERROR>>>');
          }
      });
		
      var consumer = new Consumer().schedules();
 *
 *
 * @requires jQuery
 * @throws If jQuery cannot be found (Error 4999).
 *
 * @author Rainer Rillke <https://commons.wikimedia.org/wiki/User:Rillke>
 * @author DieBuche <https://commons.wikimedia.org/wiki/User:DieBuche> [idea with the task queue]
 **/

/*
 * @license
 *   The MIT License (MIT) [full text see below]
 *   GNU General Public License, version 3 (GPL-3.0)
 *   Creative Commons Attribution 3.0 (CC-BY-3.0)
 * Choose whichever license of these you like best.
 *
 * @jshint valid
 * <http://jshint.com/>
 */
/*jshint curly:false, smarttabs:true*/
 
/*!
	Copyright (c) 2013 Rainer Rillke <https://commons.wikimedia.org/wiki/User:Rillke>

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
**/
(function (u) {
	if (u === typeof global) global = {};
	if (u === typeof window) global.window = {};
})('undefined');

(function ($, mw, req, mod, console) {
	'use strict';
	var me = 'JStack',
		version = '0.0.4.1',
		noopString, isType, isString, isFunction, isError, functionName, msgs, __msg, __report, defaults, JStack;

	// Basic support for running this in node.js
	if (!$) {
		if (req) {
			$ = req('jQuery');
		}
	}
	if (!$) throw new Error('4999: ' + me + ": jQuery is required.");

	noopString = $.noop.toString ? $.noop.toString() : 'function (){}';
	isType = function(type, x) {
		return Object.prototype.toString.call(x) === '[object ' + type + ']';
	};
	isString = function (st) {
		return 'string' === $.type(st);
	};
	isFunction = function (fn) {
		return 'function' === $.type(fn);
	};
	isError = function (err) {
		return isType('Error', err);
	};
	functionName = function (fn) {
		fn = fn || '';
		fn = (fn.name || fn);
		if (fn.toString) fn = fn.toString();
		if (!isString(fn)) fn = '<unknown>';
		if (noopString === fn) fn = '$.noop';
		return fn.slice(0, 45);
	};
	if (mw) {
		msgs = {
			'js-err-cancel': "Cancel",
			'js-err-retry': "Retry",
			'js-err-send': "Send report",
			'js-err-text': "There was an error executing your requested action. Error description:",
			'js-err-title': "$1 encountered an error",
			'js-err-advanced': "Attach your {{SITENAME}} account preferences and your browser name, " + 
				"language and version to the report (not recommended if not explicitly required).",
			'js-err-reportfailed': "The error could not be automatically reported. [[$1|Please manually report this error]], " + 
				"including the error-message and all information that you think are relevant. If the API servers are currently down, " + 
				"you may paste it into [http://pastebin.com/ a pastebin] and just post the link as soon as the Wikimedia Servers started working again.",
			'js-err-sent': "Your error report was successfully sent.",
			'js-rl-failure': "ResourceLoader failed to load the requested code. " +
				"Either you lost your internet connection, the servers are down or JStack is not properly installed on your wiki. " +
				"If this a persistent issue, please consult [[:commons:MediaWiki talk:Gadget-JStack.js]].",
			'js-stuck': "The current task ($1) is stuck.",
			'js-stuck-info': "You may report this as an error to the software developers or continue waiting."
		};
		mw.messages.set(msgs);

		/**
		 * Retrieve a message for a given key.
		 *
		 * @param {string} key
		 *  Key of the message that should be returned.
		 * @param {string|number} [unlimitedParameterCount]
		 *  As many arguments as required to
		 *  fill the placeholders ($1, ...)
		 * @return {string} parsed message
		 * @private
		 */
		__msg = function ( /*arguments*/ ) {
			var args = Array.prototype.slice.call(arguments, 0);
			args[0] = 'js-' + args[0];
			return mw.message.apply(this, args).parse();
		};

		/**
		 * Report an error to a page specified by
		 * instance.options.reportPage
		 *
		 * @param {string} what
		 *  Text to be reported.
		 * @param {boolean} advanced
		 *  Whether to inlcude user options.
		 * @param {JStack} instance
		 *  The instance of JStack to report the error for.
		 * @return {jQuery.Deferred} a jQuery Deferred
		 *  object that is resolved upon successful
		 *  completion of the reporting
		 * @private
		 */
		__report = function (what, advanced, instance) {
			var now = Math.round($.now() * Math.random() * 256),
				app = instance.options.app,
				$def = $.Deferred(),
				required = ['ext.gadget.libAPI', 'user.tokens'],
				toSend, send, loadAndSend, attachDetails, logOption, rlFailed;
				
			rlFailed = function() {
				$def.reject(__msg('rl-failure'));
			};

			toSend = ['', '== Autoreport by ' + app + ' ' + now + ' ==',
				what, '++++',
				':Task: ' + functionName(instance.currentTask),
				':NextTask: ' + functionName(instance.tasks[0]),
				':LastTask: ' + functionName(instance.tasks[instance.tasks.length - 1]),
				':Page: ' + mw.config.get('wgPageName'),
				':Skin: ' + mw.user.options.get('skin'),
				':Stack: <pre>' + instance.stack2String() + '</pre>',
				'[{{fullurl:Special:Contributions|target=Rillke&offset=20130827184039}} Contribs] ' +
				'[{{fullurl:Special:Log|user=Rillke&offset=20130827184039}} Log] ' + 'before error'
			];
			send = function () {
				toSend = toSend.join('\n');
				mw.loader.using('ext.gadget.libAPI', function () {
					mw.libs.commons.api.editPage({
						cb: $def.resolve,
						errCb: function () {
							// Why that failed is irrelevant now... just pass the information that should have been posted.
							$def.reject(toSend);
						},
						editType: 'appendtext',
						title: instance.options.reportPage,
						text: toSend,
						summary: '[[#Autoreport by ' + app + ' ' + now + '|Reporting ' + app + '-application error.]] n#=' + now,
						minor: true,
						watchlist: 'nochange'
					});
				}, rlFailed);
			};
			loadAndSend = function () {
				mw.loader.using(required, send, rlFailed);
			};
			logOption = function (k, v) {
				toSend.push('::' + k + ': ' + mw.user.options.get(k) + (v || ''));
			};
			attachDetails = function () {
				var toLog = ['cols', 'rows', 'imagesize', 'thumbsize', 'usebetatoolbar', 'usebetatoolbar-cgd', 'wikilove-enabled', 'language'],
					c, l, a = [],
					o = {};
				toSend.push('----');
				toSend.push('OPTIONS');
				$.each(mw.user.options.values, function (key) {
					var gadgetOpt;
					if (/^gadget\-/.test(key)) {
						gadgetOpt = ' -->' + mw.loader.getState('ext.gadget.' + key.replace(/^gadget\-/, ''));
						logOption(key, gadgetOpt);
					} else if ($.inArray(key, toLog) > -1) {
						logOption(key);
					}
				});

				toSend.push('----');
				toSend.push('CLIENT');
				c = $.client.profile();
				toSend.push('Client: ' + c.name + ' || ' + c.version);

				toSend.push('----');
				toSend.push('PROTOTYPES');
				for (l in a) {
					if (!a.hasOwnProperty(l)) toSend.push('Array protype :' + l);
				}
				for (l in o) {
					if (!o.hasOwnProperty(l)) toSend.push('Object protype :' + l);
				}
				for (l in $.fn) {
					toSend.push('jQuery protype :' + l);
				}

				toSend.push('----');
				toSend.push('RL MODULES');
				$.each(mw.loader.getModuleNames(), function (i, n) {
					toSend.push('::' + n + ': ' + mw.loader.getState(n));
				});
				loadAndSend();
			};
			if (advanced) {
				mw.loader.using($.merge([
					'jquery.client', 
					'mediawiki.user', 
					'user.options'], required), attachDetails, rlFailed);
			} else {
				loadAndSend();
			}
			return $def;
		};
	}

	/**
	 * @cfg defaults
	 *  Default configuration for JStack that can be overwritten
	 *  by either supplying the options argument to the constructor
	 *  or by setting ``myStack.options`` where ``myStack`` is an
	 *  instance of JStack or by creating a property labled ``jStackOptions``
	 *  on the consumer object prior to instanciating this class.
	 * @cfg {boolean} [defaults.logEnabled=true]
	 *  Whether to log errors and invocations.
	 * @cfg {String|string} [defaults.logPrefix='JStack']
	 *  The prefix that will appear in front of each log entry.
	 * @cfg {String|string} [defaults.app='An unknown application']
	 *  The application's name that makes use of JStack. Used for
	 *  error-reporting.
	 * @cfg {String|string} [defaults.reportPage='MediaWiki talk:Gadget-JStack.js/errors']
	 *  The page, error reports should be appended to.
	 * @cfg {Function} [defaults.onError=$.noop]
	 *  Function that is called if errors occur.
	 *  Returning false from this function will suppress the
	 *  "we-have-an-error-dialog" otherwise shown to the user.
	 *  Return an object with the same strucure as describled in
	 *  the errorDlgConfig configuration or a string. See method
	 *  "showErrDlg".
	 *  Arguments passed to this function:
	 *    1. raw error object
	 *    2. The JStack instance the error was observed on.
	 * @cfg {Function} [defaults.onErrorHandled=$.noop]
	 *  Function that is called after the user choose one of the options
	 *  in the error-dialog.
	 *  The first argument specifies how the error was dealt with:
	 *    reported|retried|canceled
	 * @cfg {Function} [defaults.onNotAFunction=$.noop]
	 *  Function that is called if there is something in the task-queue
	 *  that cannot be executed because it is not a function.
	 * @cfg {Function} [defaults.onBeforeExecTask=$.noop]
	 *  Callback that is invoked before a task is executed.
	 *  Gat 2 arguments passed:
	 *   1: The task, 2: The length of the task-queue (without that task)
	 * @cfg {number} [defaults.stuckTimeout=2 * 60 * 1000 (2 minutes)]
	 *  Time after which a task is considered being stuck in ms.
	 *  Set this time to 0 to disable this feature.
	 * @cfg {Function} [defaults.onStuck=$.noop]
	 *  Function that is called when it is found that a task is not completed
	 *  within a certain time
	 */
	/**
	 * @property {Object} defaults
	 *  Confer to ``defaults`` configuration.
	 * @private
	 */
	defaults = {
		logEnabled: true,
		logPrefix: 'JStack',
		app: 'An unknown application',
		reportPage: 'MediaWiki talk:Gadget-JStack.js/errors',
		onError: $.noop,
		onErrorHandled: $.noop,
		onNotAFunction: $.noop,
		onBeforeExecTask: $.noop,
		stuckTimeout: 2 * 60 * 1000,
		onStuck: $.noop
	};

	/**
	 * @constructor
	 * Creates a new JStack instance.
	 * @param {Object} consumer
	 *  The object JStack will attempt to call methods on
	 *  if supplied as method names (string)
	 * @param {Array|Function|String|string|undefined|null} [tasks]
	 *  Initial task-queue-content. Cf. "addTask"
	 * @param {Object} [options=defaults]
	 * @throws If invalid arguments are supplied (Error 5000).
	 *
	 */
	JStack = function (consumer, tasks, options) {
		var st = this;

		if (isString(tasks) || isFunction(tasks)) tasks = [tasks];
		if (!tasks) tasks = [];
		if (!$.isArray(tasks)) throw new Error('5000: ' + me + ": Invalid arguments supplied to constructor.");
		if (st instanceof JStack && !st.hasOwnProperty('__constructed')) {
			// Do never delete this property from the JStack object!
			st.__constructed = true;
			st.tasks = tasks;
			st.consumer = consumer;
			if (!consumer) throw new Error('5000: ' + me +  ": No consumer specified.");
			st.options = $.extend({}, defaults, consumer.jStackOptions, options);
		} else {
			return new JStack(consumer, tasks, options);
		}
	};


	JStack.fn = JStack.prototype = {
		constructor: JStack,
		
		/**
		 * @property {String} version
		 *  Version string. Pattern \\d{0,4}\\.\\d{0,4}\\.\\d{0,4}\\.\\d{0,4}
		 * @readonly
		 */
		version: version,
		/**
		 * @property {Object} [consumer={}]
		 *  Confer to constructor, parameter ``consumer``.
		 */
		consumer: {},

		/**
		 * @property {Object} [options=defaults]
		 *  Confer to config ``options``.
		 */
		options: {},

		/**
		 * @property {Array} [tasks=[]]
		 *  Holds the task-queue. The first element is the one
		 *  that will be executed next.
		 * @readonly
		 */
		tasks: [],

		/**
		 * @property {Array} [stack=[]]
		 *  Holds the stack. The last element is the stack's top.
		 *  Not to be changed from external. If neccessary, create a local copy:
		 *  ``var copy = myStack.stack.slice(0);``
		 * @readonly
		 */
		stack: [],

		/**
		 * @property {Function|String|string} [currentTask='']
		 *  The method that was invoked last. It is not cleaned
		 *  after that method returned.
		 * @readonly
		 */
		currentTask: '',

		/**
		 * @property {Function|String|string} [oldTask='']
		 *  The method that was invoked before currentTask.
		 * @readonly
		 */
		oldTask: '',

		/**
		 * @property {Function|String|string} [lastDequedTask='']
		 *  The most recent task that was attempted to be executed
		 *  from the task-queue.
		 * @readonly
		 */
		lastDequedTask: '',

		/**
		 * Method to catch errors and report where they occurred.
		 *
		 * @param {string|String|Function} fn
		 *  fn is either the name of a method in the consumer object (string)
		 *  or a function-reference.
		 * @param [unlimitedParameterCount]
		 *  Arguments that should be supplied to fn.
		 *
		 *     @example
		 *     var fn = function(what, errNumber) {
		 *         console.log('JStack is ' + what + '!');
		 *         throw new Error(errNumber + ": Just a test!");
		 *     };
		 *     new JStack(window).secureCall(fn, 'awesome', 4444);
		 *
		 * @return The value that fn returned.
		 */
		secureCall: function (fn /*, arguments*/ ) {
			var st = this,
				c = st.consumer,
				ret, preExec, postExec;

			if (!(this instanceof JStack) && (this instanceof this.consumer) && mw) {
				mw.log("JStack: Warning! Likely called in wrong context.");
			}
			preExec = function (fn) {
				st.log(functionName(fn));
				st.stack.push(fn);
			};
			postExec = function () {
				st.stack.pop();
			};
			try {
				c.oldTask = c.currentTask;
				c.currentTask = arguments[0];
				if ($.isFunction(fn)) {
					preExec(fn);
					// arguments is not of type array so we can't just write arguments.slice
					ret = fn.apply(c, Array.prototype.slice.call(arguments, 1));
					postExec();
					return ret;
				} else if (isString(fn) && $.isFunction(c[fn])) {
					preExec(fn);
					ret = c[fn].apply(c, Array.prototype.slice.call(arguments, 1));
					postExec();
					return ret;
				} else {
					st.log("This is not a function!", fn);
					st.options.onNotAFunction(fn);
				}
			} catch (ex) {
				st.log("Failure at " + fn, ex);
				st.fail(ex);
			}
		},

		/**
		 * Add a task to the task-queue.
		 *
		 * @param {string|String|Function|Array} task
		 *  A task is either the name of a method in the consumer object (string)
		 *  or a function-reference.
		 *  In case it is an array, its first element (at index 0)
		 *  is one of the previously mentioned types, the remaining parts
		 *  are the arguments to supply to this task.
		 *
		 *     @example
		 *     var t, fn = function(what) {
		 *         console.log('JStack is ' + what + '!');
		 *     };
		 *     t = [fn, 'awesome'];
		 *     new JStack(window).addTask(t).nextTask();
		 *
		 * @chainable
		 * @return {JStack} myself
		 */
		addTask: function (task) {
			this.tasks.push(task);
			return this;
		},
		
		/**
		 * Clears the stuck timeout so JStack does not complain
		 * about a task being stuck
		 *
		 * @chainable
		 * @return {JStack} myself
		 */
		killStickTimeout: function() {
			if ($.isNumeric(this.stickTimeoutID)) clearTimeout(this.stickTimeoutID);
			return this;
		},
		
		/**
		 * Removes the dialog showing a message about
		 * a allegedly stuck task from the user interface
		 *
		 * @chainable
		 * @return {JStack} myself
		 */
		removeStuckDialog: function() {
			if (this.$stuckDialog) this.$stuckDialog.dialog('close');
			return this;
		},
		
		/**
		 * Return the name or the first characters of the
		 * code of the last dequed task
		 *
		 * @chainable
		 * @return {string} 
		 */
		lastDequedTaskName: function() {
			return functionName( $.isArray(this.lastDequedTask) ? this.lastDequedTask[0] : this.lastDequedTask );
		},
		
		/**
		 * Shows a dialog about a stuck task
		 *
		 * @chainable
		 * @return {JStack} myself
		 */
		stuck: function() {
			var info = this.options.onStuck() || '';
			
			this.showErrDlg(__msg('stuck', this.lastDequedTaskName()), {
				showRetry: false,
				showIgnore: false,
				info: __msg('stuck-info') + info,
				exposeAs: '$stuckDialog'
			});
			return this;
		},

		/**
		 * Activity watcher.
		 * Monitors a processes’ activity and features error
		 * reporting capabilities if it finds that a task is stuck.
		 *
		 * To be called after de-queuing a task.
		 *
		 * Sets a configurable timeout after which it
		 * calls ``.stuck()`` if not cleared before through
		 * ``.killStickTimeout()`` 
		 *
		 * Automatically clears the interval previously set 
		 * each time it is called
		 *
		 * @chainable
		 * @return {JStack} myself
		 */
		watchStuck: function() {
			var st = this;
			
			st.killStickTimeout();
			
			if (!st.options.stuckTimeout || !st.tasks.length) return;
			
			st.removeStuckDialog();
			st.stickTimeoutID = setTimeout($.proxy(st.stuck, st), st.options.stuckTimeout);
			return st;
		},

		/**
		 * Removes and invokes the next task from the task-queue.
		 *
		 * @return The value the that task returned.
		 */
		nextTask: function () {
			var st = this,
				task = st.tasks.shift();

			st.lastDequedTask = task;
			st.options.onBeforeExecTask.apply(st.consumer, [task, st.tasks.length]);
			st.watchStuck();
			return ($.isArray(task) ? st.secureCall.apply(st, task) : st.secureCall(task));
		},

		/**
		 * Skip to the last task and empty the task-queue.
		 *
		 * @return The value the last task returned.
		 */
		lastTask: function () {
			var st = this,
				task = st.tasks[st.tasks.length - 1];

			st.emptyQueue();
			st.lastDequedTask = task;
			st.options.onBeforeExecTask.apply(st.consumer, [task, st.tasks.length]);
			st.watchStuck();
			return ($.isArray(task) ? st.secureCall.apply(st, task) : st.secureCall(task));
		},

		/**
		 * Try last de-queued task again.
		 *
		 * @return The value the task to be retried returned.
		 */
		retryTask: function () {
			var st = this,
				task = st.lastDequedTask;

			st.options.onBeforeExecTask.apply(st.consumer, [task, st.tasks.length]);
			st.watchStuck();
			return ($.isArray(task) ? st.secureCall.apply(st, task) : st.secureCall(task));
		},

		/**
		 * Deletes all entries from the task-queue.
		 *
		 * @chainable
		 * @return {JStack} myself
		 */
		emptyQueue: function () {
			this.tasks = [];
			this.watchStuck();
			return this;
		},

		/**
		 * Log something to the console.
		 *
		 * @param {string} key
		 *  key to be used for logging
		 * @param [value]
		 *  anything the console would accept
		 * @chainable
		 * @return {JStack} myself
		 */
		log: function (key, val) {
			// In node.js and other environments, window.console can't be used for testing ...
			if (this.options.logEnabled && console && $.isFunction(console.log)) {
				console.log(this.options.logPrefix + '> ' + key, val);
			}
			return this;
		},

		/**
		 * Log the stack to the console.
		 *
		 * @param {boolean} [raw]
		 *  Whether to log the stack as array or as string.
		 * @chainable
		 * @return {JStack} myself
		 */
		logStack: function (raw) {
			return this.log("stack:", raw ? this.stack : this.stack2String());
		},

		/**
		 * @cfg errorDlgConfig
		 *  Configuration for the "we-have-an-error" dialog.
		 *  Can be set using ``myStack.errorDlgConfig`` or
		 *  individually by passing-in as argument to ``.showErrDlg()`` or
		 *  when returning from ``onError()``.
		 * @cfg {boolean} [errorDlgConfig.showSend=true]
		 *  Whether to show the "report" button.
		 * @cfg {boolean} [errorDlgConfig.showRetry=true]
		 *  Whether to show the "retry" button.
		 * @cfg {boolean} [errorDlgConfig.showIgnore=true]
		 *  Whether to show the "ignore" button.
		 * @cfg {string|String|jQuery} [errorDlgConfig.info='']
		 *  A text that is more descriptive than the
		 *  plain error text generated by the browser or another machine.
		 *  Either wrapped in a jQuery "node" or as plain string.
		 * @cfg {Object} [errorDlgConfig.customButton=null]
		 *  An object with 3 properies:
		 *   1. text: The button label.
		 *   2. click: Funtion that is called when the button is clicked.
		 *   3. iconPrimary:
		 *    A [jQuery ui-icon-class](https://de.wikipedia.org/wiki/Vorlage:Button).
		 *    For example "ui-icon-alert".
		 * @cfg {string|String} [errorDlgConfig.exposeAs='']
		 *  Name under which the dialog will be made available in the stack
		 *  object.
		 */
		/**
		 * @property {Object} [errorDlgConfig=errorDlgConfig]
		 *  Confer to config options ``errorDlgConfig``.
		 */
		errorDlgConfig: {
			showSend: true,
			showRetry: true,
			showIgnore: true,
			info: '',
			customButton: null,
			exposeAs: ''
		},

		/**
		 * UI: Show an error dialog.
		 * Never ever secureCall this method.
		 *
		 * @param {Error} err
		 *  The error object that this message should be about.
		 * @param {Object|string|String} [errorDlgConfig]
		 *  Confer to the errorDlgConfig configuration.
		 *
		 * @chainable
		 * @return {JStack} myself
		 */
		showErrDlg: function (err, errorDlgConfig) {
			var st = this,
				cfg;

			if (isString(errorDlgConfig)) errorDlgConfig = {
				info: errorDlgConfig
			};
			cfg = $.extend({}, st.errorDlgConfig, errorDlgConfig);

			function dependenciesLoaded() {
				var $dlg = $('<div>'),
					$advancedInfo = $('<input id="jstack-err-advanced" type="checkbox"/>'),
					$advancedInfoL = $('<label for="jstack-err-advanced"></label>').text(__msg('err-advanced')),
					dlgBtns = [],
					stErr, method;

				if (isError(err)) {
					stErr = err.message + ' \n\n ' + err.name;
					if (err.lineNumber) stErr += ' @line' + err.lineNumber;
					err = stErr;
				} else if (!isString(err)) {
					return st.log("This is neither an Error nor a String.");
				}

				if (cfg.showSend) {
					dlgBtns.push({
						text: __msg('err-send'),
						click: function () {
							var $dlgWidget = $dlg.closest('div.ui-dialog');
							$dlgWidget.block({
								message: $.createSpinner({
									size: 'large',
									type: 'block'
								})
							});

							__report(err, $advancedInfo[0].checked, st).done(function () {
								$dlg.dialog('close');
								mw.notify(__msg('err-sent'));
								st.options.onErrorHandled.apply(st.consumer, ['reported', 'done']);

							}).fail(function (toReport) {
								// mw.message.parse() throws error for messages with pattern [[$1|abc]]
								// 
								var now = $.now(),
									msgkey = 'err-' + now;
								mw.messages.set('js-' + msgkey, mw.messages.get('js-err-reportfailed').replace('$1', st.options.reportPage));

								$dlgWidget.unblock();
								$dlg.empty().html(__msg(msgkey));
								$('<textarea>')
									.val(toReport)
									.attr('readonly', 'readonly')
									.css({
										height: '5em',
										width: '98%'
									})
									.click(function () {
										$(this).select();
									})
									.appendTo($dlg);
								st.options.onErrorHandled.apply(st.consumer, ['reported', 'fail']);

							});
						},
						iconPrimary: 'ui-icon-circle-check'
					});
				}
				if (cfg.showRetry && st.lastDequedTask) {
					dlgBtns.push({
						text: __msg('err-retry'),
						click: function () {
							$dlg.dialog('close');
							st.retryTask();
							st.options.onErrorHandled.apply(st.consumer, ['retried']);
						},
						iconPrimary: 'ui-icon-arrowrefresh-1-n'
					});
				}
				dlgBtns.push({
					text: __msg('err-cancel'),
					click: function () {
						$dlg.dialog('close');
						st.options.onErrorHandled.apply(st.consumer, ['canceled']);
					},
					iconPrimary: 'ui-icon-circle-close'
				});

				$('<div>').text(__msg('err-text')).appendTo($dlg);
				$.createNotifyArea($('<span>').text(err), 'ui-icon-alert', 'ui-state-error').appendTo($dlg);
				if (cfg.info) {
					method = cfg.info instanceof jQuery ? 'append' : 'text';
					$.createNotifyArea($('<span>')[method](cfg.info), 'ui-icon-info', 'ui-state-highlight').appendTo($dlg);
				}
				if (cfg.showSend) {
					$dlg.append($advancedInfo, $advancedInfoL);
				}

				$dlg.dialog({
					title: __msg('err-title', st.options.app),
					buttons: dlgBtns,
					modal: true,
					height: 'auto',
					width: Math.min($(window).width(), 500),
					open: function () {
						// Look out for http://bugs.jqueryui.com/ticket/6830 / jQuery UI 1.9
						var $buttons = $(this).parent().find('.ui-dialog-buttonpane button');
						$buttons.each(function (i, el) {
							var iconPrimary = dlgBtns[i].iconPrimary;

							if (iconPrimary) {
								$(el).button({
									icons: {
										primary: iconPrimary
									}
								});
							}
						});
					},
					close: function () {
						$dlg.remove();
					}
				});
				if (cfg.exposeAs) st[cfg.exposeAs] = $dlg;
			} // function dependenciesLoaded()

			// Requires jQuery UI, mw.user.tokens, 
			// https://github.com/wikimedia/mediawiki-core/blob/master/resources/jquery/jquery.spinner.js
			// https://commons.wikimedia.org/wiki/MediaWiki:Gadget-libJQuery.js,
			// https://commons.wikimedia.org/wiki/MediaWiki:Gadget-libAPI.js (for reporting)
			// http://jquery.malsup.com/block/
			if (mw && mw.loader && mw.loader.getState('ext.gadget.libJQuery')) {
				mw.loader.using([
					'jquery.ui.dialog',
					'jquery.spinner',
					'mediawiki.jqueryMsg',
					'ext.gadget.libJQuery',
					'ext.gadget.jquery.blockUI'
				], dependenciesLoaded);
			}
			return this;
		},

		/**
		 * Method to be invoked on errors.
		 *
		 * @param {Error} err
		 *  The error object about the error that happened.
		 * @protected
		 * @chainable
		 * @return {JStack} myself
		 */
		fail: function (err) {
			var additionalInfo = this.options.onError.apply(this.consumer, [err, this]);
			if (false === additionalInfo) return;

			this.showErrDlg(err, additionalInfo);
			return this;
		},

		/**
		 * Get the string representation of the current stack.
		 *
		 * If possible, the name of the function is retrieved;
		 * otherwise the first characters of the function signature
		 * are printed
		 * @return {string}
		 */
		stack2String: function () {
			var stck = '';
			$.each(this.stack, function (i, fn) {
				fn = functionName(fn);
				stck += '\n' + i + ': ' + fn;
			});
			return stck;
		}
	};
	if (mw) {
		mw.libs.JStack = JStack;
	} else if (mod) {
		mod.exports = JStack;
	} else {
		window.JStack = JStack;
	}
	return JStack;
})(window.jQuery, window.mediaWiki, global.require, global.module, window.console || global.console);
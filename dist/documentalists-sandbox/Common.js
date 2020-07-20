//<pre>
/*--------------------------------------------------------------------------------------------------
Settings
* DEBUGGING: Only when true:
  * minification (http://en.wikipedia.org/wiki/Minification_(programming)) of the modules is
    disabled.
  * all regression tests are executed on the modules before main() is called,
  * main() displays the test results, and
  * the settings TRACKING, TYPE_CHECKING and OTHER_LOGGING are ignored and assumed to be true.
* TRACKING: Only when true, entering and leaving of functions that are not part of the library is
  logged to the console.
* TRACKING_LIBRARY: Only when both TRACKING and TRACKING_LIBRARY are true, entering and leaving of
  functions that are part of the library is logged to the console.
* TYPE_CHECKING: Only when true, at the begin of a function, the amount and types of the actual
  parameters are checked.
* OTHER_LOGGING: Only when true, all logging to the console other than for DEBUGGING and TRACKING is
  enabled.
Note: These settings are global and therefore influence the behavior of the modules to.           */

var DEBUGGING = false;
var TRACKING = false;
var TRACKING_LIBRARY = false;
var TYPE_CHECKING = false;
var OTHER_LOGGING = false;
var MINIMUM_LOG_ID = 0;
var MAXIMUM_LOG_ID = 1000000

TRACKING = TRACKING || DEBUGGING;
TRACKING_LIBRARY = TRACKING_LIBRARY && TRACKING;
TYPE_CHECKING = TYPE_CHECKING || DEBUGGING;
OTHER_LOGGING = OTHER_LOGGING || DEBUGGING;

/***************************************************************************************************
User-defined object Includer
***************************************************************************************************/
function Includer() {
  'use strict';
  var mNamesOfModulesToInclude = new Array();
  var mIndex = 0; //Index of the next module to be included.
  /*------------------------------------------------------------------------------------------------
  publications:                                                                                   */
  this.includeNextModule = includeNextModule;
  this.moduleIncluded = moduleIncluded;
  this.register = register;
  /*------------------------------------------------------------------------------------------------
  This function includes the next module, if any. Otherwise it calls main().                      */
  function includeNextModule(unexpectedParameter) {
    if (TRACKING) console.log('Entering includeNextModule().');
    if (TYPE_CHECKING) {
      if (typeof unexpectedParameter !== 'undefined') {
        throw new Error('MediaWiki:Common/throw 1: Expected 0 parameters, but got more parameters ' +
          'than that.');
      }
    }
    if (mIndex < mNamesOfModulesToInclude.length) {
      var Module = mNamesOfModulesToInclude[mIndex];
      if (OTHER_LOGGING) console.log('Including module: "' + Module + '".');
      var path = document.URL.slice(String('http://').length, document.URL.indexOf('wiki/') + 5);
//      console.log('path: "' + path + '".');
      importArticle({
        debug: (DEBUGGING? 'true': 'false'),
        type: 'script',
        article: 'url:documentalists-sandbox.wikia.com:' + Module});
    } else {
      if (OTHER_LOGGING) console.log('Including modules completed.');
      /*Delay is to complete this function and unwind the call stack.*/
      window.setTimeout(main, 1);
    }
    if (TRACKING) console.log('Leaving includeNextModule().');
  }
  /*------------------------------------------------------------------------------------------------
  This function logs the revision of the module that's included. This function shall be called as 
  last statement of a module to signal that the module is loaded.                                 */
  function moduleIncluded(revision, unexpectedParameter) {
    if (TRACKING) console.log('Entering moduleIncluded()');
    if (TYPE_CHECKING) {
      if (typeof revision === 'undefined') {
        throw new Error('MediaWiki:Common/throw 2: The parameter "revision" is missing.');
      }
      if (typeof revision !== 'number') {
        throw new Error('MediaWiki:Common/throw 3: Expected that the type of parameter "revision"' +
          ' is "number" but it\'s "' + typeof revision + '".');
      }
      if (typeof unexpectedParameter !== 'undefined') {
        throw new Error('MediaWiki:Common/throw 4: Expected 1 parameter, but got more parameters ' +
          'than that.');
      }
    }
    if (OTHER_LOGGING) {
      console.log('Included module "' + mNamesOfModulesToInclude[mIndex] + '" revision ' + 
        revision + '.');
    }
    ++mIndex;
    window.setTimeout(includeNextModule(), 1);
    if (TRACKING) console.log('Leaving moduleIncluded()');
  }
  /*------------------------------------------------------------------------------------------------
  This function appends the given module to the list of modules to include.                       */
  function register(moduleName, unexpectedParameter) {
    //if (TRACKING) console.log('Entering register()');
    if (TYPE_CHECKING) {
      if (typeof moduleName === 'undefined') {
        throw new Error('MediaWiki:Common/throw 5: The parameter "moduleName" is missing.');
      }
      if (typeof moduleName !== 'string') {
        throw new Error('MediaWiki:Common/throw 6: Expected that the type of parameter "moduleName"'
          + ' is "string" but it\'s "' + typeof moduleName + '".');
      }
      if (typeof unexpectedParameter !== 'undefined') {
        throw new Error('MediaWiki:Common/throw 7: Expected 1 parameter, but got more parameters ' +
          'than that.');
      }
    }
    mNamesOfModulesToInclude.push(moduleName);
    //if (TRACKING) console.log('Leaving register()');
  }
};
var includer = new Includer()

/*--------------------------------------------------------------------------------------------------
Modules to include in this sequence:                                                              */
/*Libraries.*/
includer.register('Validation/dev/imp.js');
includer.register('Track/dev/imp.js');
includer.register('Utilities/dev/imp.js');
includer.register('Localization/dev/imp.js');
//includer.register('HTML/dev/imp.js');
includer.register('CharacterStream/dev/imp.js');
/*Applications.*/
includer.register('SyntaxHighlighter/dev/imp.js');
//includer.register('Instructive Form/dev/imp.js');
//includer.register('Service Desk Front Page (Script)/dev/imp.js');
includer.register('Tutorial/dev/imp.js');
includer.register('Mathematics/dev/imp.js');

if (DEBUGGING) {
  includer.register('Validation/dev/val.js');
  includer.register('Track/dev/val.js');
  includer.register('Utilities/dev/val.js');
  //includer.register('Localization/dev/val.js');
  //includer.register('HTML/dev/val.js');
  //includer.register('Instructive Form/dev/val.js');
  //includer.register('Service Desk Front Page (Script)/dev/val.js');
  //includer.register('Mathematics/dev/val.js');
}

/*--------------------------------------------------------------------------------------------------
This function is called when the modules are included.                                            */
function main() {
  'use strict';
  if (TRACKING) console.log('Entering main()');
  if (DEBUGGING) console.log(validator.getTestResults());
  
  //.. your code goes here ..

  if (TRACKING) console.log('Leaving main()');
}
includer.includeNextModule();
//</pre>
// <nowiki>
/*
 * Test suite for [[I18n-js]].
 *
 * @author Cqm <https://dev.wikia.com/User:Cqm>
 */

/*global mediaWiki, importArticle */

/*jshint bitwise:true, camelcase:true, curly:true, eqeqeq:true, es3:false,
    forin:true, immed:true, indent:4, latedef:true, newcap:true,
    noarg:true, noempty:true, nonew:true, plusplus:true, quotmark:single,
    undef:true, unused:true, strict:true, trailing:true,
    browser:true, devel:false, jquery:true,
    onevar:true
*/

;(function (mw) {
    'use strict';

    var testCases = [
        /* Example:
        {
            message: 'message_name',
            method: 'plain|escape|parse|markdown',
            expected: 'expected output' 
        }
        */
    ];

    function runTests() {
        window.dev.i18n.loadMessages('u:dev:MediaWiki:Custom-I18n-js/test.json').done(function (i18n) {
            var results = {
                passed: 0,
                failed: 0,
                errors: []
            };


            console.log('### Starting I18n-js tests ###');

            testCases.forEach(function (testCase) {
                var output = i18n.msg(testCase.message)[testCase.method]();

                if (output === testCase.expected) {
                    console.log(testCase.message + ': SUCCESS');
                    results.passed += 1;
                } else {
                    console.log(testCase.message + ': FAIL');
                    results.failed += 1;

                    results.errors.push(testCase.message + ': Expected: ' + testCase.expected +
                                        ', Got: ' + output);
                }
            });

            if (results.errors.length) {
                console.log('## Errors');
                console.log(results.errors.join('\n'));
                console.log();
            }

            console.log('## Results');
            console.log('Passed: ' + results.passed);
            console.log('Failed: ' + results.failed);

            console.log('### I18n-js tests completed ###');

        }); 
    }

    mw.hook('dev.i18n').add(runTests);
    importArticle({ type: 'script', article: 'u:dev:I18n-js/code.js' });

}(mediaWiki));
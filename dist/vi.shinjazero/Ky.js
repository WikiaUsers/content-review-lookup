//Source: https://github.com/sindresorhus/ky
/*! MIT License © Sindre Sorhus */

'use strict';

var _slicedToArray = (function() {
    function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true;
            _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function() {
    function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor); } } return function(Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x3, _x4, _x5) { var _again = true;
    _function: while (_again) { var object = _x3,
            property = _x4,
            receiver = _x5;
        _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x3 = parent;
                _x4 = property;
                _x5 = receiver;
                _again = true;
                desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _extends = Object.assign || function(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); }
    subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isObject = function isObject(value) {
    return value !== null && typeof value === 'object';
};
var supportsAbortController = typeof globalThis.AbortController === 'function';
var supportsStreams = typeof globalThis.ReadableStream === 'function';
var supportsFormData = typeof globalThis.FormData === 'function';

var mergeHeaders = function mergeHeaders(source1, source2) {
    var result = new globalThis.Headers(source1 || {});
    var isHeadersInstance = source2 instanceof globalThis.Headers;
    var source = new globalThis.Headers(source2 || {});

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = source[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2);

            var key = _step$value[0];
            var value = _step$value[1];

            if (isHeadersInstance && value === 'undefined' || value === undefined) {
                result['delete'](key);
            } else {
                result.set(key, value);
            }
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
                _iterator['return']();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }

    return result;
};

var deepMerge = function deepMerge() {
    for (var _len = arguments.length, sources = Array(_len), _key = 0; _key < _len; _key++) {
        sources[_key] = arguments[_key];
    }

    var returnValue = {};
    var headers = {};

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = sources[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _source = _step2.value;

            if (Array.isArray(_source)) {
                if (!Array.isArray(returnValue)) {
                    returnValue = [];
                }

                returnValue = [].concat(_toConsumableArray(returnValue), _toConsumableArray(_source));
            } else if (isObject(_source)) {
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    for (var _iterator3 = Object.entries(_source)[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        var _step3$value = _slicedToArray(_step3.value, 2);

                        var key = _step3$value[0];
                        var value = _step3$value[1];

                        if (isObject(value) && key in returnValue) {
                            value = deepMerge(returnValue[key], value);
                        }

                        returnValue = _extends({}, returnValue, _defineProperty({}, key, value));
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                            _iterator3['return']();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                if (isObject(_source.headers)) {
                    headers = mergeHeaders(headers, _source.headers);
                }
            }

            returnValue.headers = headers;
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                _iterator2['return']();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    return returnValue;
};

var requestMethods = ['get', 'post', 'put', 'patch', 'head', 'delete'];

var responseTypes = {
    json: 'application/json',
    text: 'text/*',
    formData: 'multipart/form-data',
    arrayBuffer: '*/*',
    blob: '*/*'
};

var retryMethods = ['get', 'put', 'head', 'delete', 'options', 'trace'];

var retryStatusCodes = [408, 413, 429, 500, 502, 503, 504];

var retryAfterStatusCodes = [413, 429, 503];

var stop = Symbol('stop');

var HTTPError = (function(_Error) {
    _inherits(HTTPError, _Error);

    function HTTPError(response, request, options) {
        _classCallCheck(this, HTTPError);

        // Set the message to the status text, such as Unauthorized,
        // with some fallbacks. This message should never be undefined.
        _get(Object.getPrototypeOf(HTTPError.prototype), 'constructor', this).call(this, response.statusText || String(response.status === 0 || response.status ? response.status : 'Unknown response error'));
        this.name = 'HTTPError';
        this.response = response;
        this.request = request;
        this.options = options;
    }

    return HTTPError;
})(Error);

var TimeoutError = (function(_Error2) {
    _inherits(TimeoutError, _Error2);

    function TimeoutError(request) {
        _classCallCheck(this, TimeoutError);

        _get(Object.getPrototypeOf(TimeoutError.prototype), 'constructor', this).call(this, 'Request timed out');
        this.name = 'TimeoutError';
        this.request = request;
    }

    return TimeoutError;
})(Error);

var delay = function delay(ms) {
    return new Promise(function(resolve) {
        return setTimeout(resolve, ms);
    });
};

// `Promise.race()` workaround (#91)
var timeout = function timeout(request, abortController, options) {
    return new Promise(function(resolve, reject) {
        var timeoutID = setTimeout(function() {
            if (abortController) {
                abortController.abort();
            }

            reject(new TimeoutError(request));
        }, options.timeout);

        /* eslint-disable promise/prefer-await-to-then */
        options.fetch(request).then(resolve)['catch'](reject).then(function() {
            clearTimeout(timeoutID);
        });
        /* eslint-enable promise/prefer-await-to-then */
    });
};

var normalizeRequestMethod = function normalizeRequestMethod(input) {
    return requestMethods.includes(input) ? input.toUpperCase() : input;
};

var defaultRetryOptions = {
    limit: 2,
    methods: retryMethods,
    statusCodes: retryStatusCodes,
    afterStatusCodes: retryAfterStatusCodes
};

var normalizeRetryOptions = function normalizeRetryOptions() {
    var retry = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    if (typeof retry === 'number') {
        return _extends({}, defaultRetryOptions, {
            limit: retry
        });
    }

    if (retry.methods && !Array.isArray(retry.methods)) {
        throw new Error('retry.methods must be an array');
    }

    if (retry.statusCodes && !Array.isArray(retry.statusCodes)) {
        throw new Error('retry.statusCodes must be an array');
    }

    return _extends({}, defaultRetryOptions, retry, {
        afterStatusCodes: retryAfterStatusCodes
    });
};

// The maximum value of a 32bit int (see issue #117)
var maxSafeTimeout = 2147483647;

var Ky = (function() {
    function Ky(input) {
        var _this = this;

        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, Ky);

        this._retryCount = 0;
        this._input = input;
        this._options = _extends({
            // TODO: credentials can be removed when the spec change is implemented in all browsers. Context: https://www.chromestatus.com/feature/4539473312350208
            credentials: this._input.credentials || 'same-origin'
        }, options, {
            headers: mergeHeaders(this._input.headers, options.headers),
            hooks: deepMerge({
                beforeRequest: [],
                beforeRetry: [],
                afterResponse: []
            }, options.hooks),
            method: normalizeRequestMethod(options.method || this._input.method),
            prefixUrl: String(options.prefixUrl || ''),
            retry: normalizeRetryOptions(options.retry),
            throwHttpErrors: options.throwHttpErrors !== false,
            timeout: typeof options.timeout === 'undefined' ? 10000 : options.timeout,
            fetch: options.fetch || globalThis.fetch.bind(globalThis)
        });

        if (typeof this._input !== 'string' && !(this._input instanceof URL || this._input instanceof globalThis.Request)) {
            throw new TypeError('`input` must be a string, URL, or Request');
        }

        if (this._options.prefixUrl && typeof this._input === 'string') {
            if (this._input.startsWith('/')) {
                throw new Error('`input` must not begin with a slash when using `prefixUrl`');
            }

            if (!this._options.prefixUrl.endsWith('/')) {
                this._options.prefixUrl += '/';
            }

            this._input = this._options.prefixUrl + this._input;
        }

        if (supportsAbortController) {
            this.abortController = new globalThis.AbortController();
            if (this._options.signal) {
                this._options.signal.addEventListener('abort', function() {
                    _this.abortController.abort();
                });
            }

            this._options.signal = this.abortController.signal;
        }

        this.request = new globalThis.Request(this._input, this._options);

        if (this._options.searchParams) {
            var textSearchParams = typeof this._options.searchParams === 'string' ? this._options.searchParams.replace(/^\?/, '') : new URLSearchParams(this._options.searchParams).toString();
            var searchParams = '?' + textSearchParams;
            var url = this.request.url.replace(/(?:\?.*?)?(?=#|$)/, searchParams);

            // To provide correct form boundary, Content-Type header should be deleted each time when new Request instantiated from another one
            if ((supportsFormData && this._options.body instanceof globalThis.FormData || this._options.body instanceof URLSearchParams) && !(this._options.headers && this._options.headers['content-type'])) {
                this.request.headers['delete']('content-type');
            }

            this.request = new globalThis.Request(new globalThis.Request(url, this.request), this._options);
        }

        if (this._options.json !== undefined) {
            this._options.body = JSON.stringify(this._options.json);
            this.request.headers.set('content-type', 'application/json');
            this.request = new globalThis.Request(this.request, { body: this._options.body });
        }

        var fn = function fn() {
            var response, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, hook, modifiedResponse;

            return regeneratorRuntime.async(function fn$(context$3$0) {
                while (1) switch (context$3$0.prev = context$3$0.next) {
                    case 0:
                        if (!(this._options.timeout > maxSafeTimeout)) {
                            context$3$0.next = 2;
                            break;
                        }

                        throw new RangeError('The `timeout` option cannot be greater than ' + maxSafeTimeout);

                    case 2:
                        context$3$0.next = 4;
                        return regeneratorRuntime.awrap(delay(1));

                    case 4:
                        context$3$0.next = 6;
                        return regeneratorRuntime.awrap(this._fetch());

                    case 6:
                        response = context$3$0.sent;
                        _iteratorNormalCompletion4 = true;
                        _didIteratorError4 = false;
                        _iteratorError4 = undefined;
                        context$3$0.prev = 10;
                        _iterator4 = this._options.hooks.afterResponse[Symbol.iterator]();

                    case 12:
                        if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                            context$3$0.next = 21;
                            break;
                        }

                        hook = _step4.value;
                        context$3$0.next = 16;
                        return regeneratorRuntime.awrap(hook(this.request, this._options, this._decorateResponse(response.clone())));

                    case 16:
                        modifiedResponse = context$3$0.sent;

                        if (modifiedResponse instanceof globalThis.Response) {
                            response = modifiedResponse;
                        }

                    case 18:
                        _iteratorNormalCompletion4 = true;
                        context$3$0.next = 12;
                        break;

                    case 21:
                        context$3$0.next = 27;
                        break;

                    case 23:
                        context$3$0.prev = 23;
                        context$3$0.t0 = context$3$0['catch'](10);
                        _didIteratorError4 = true;
                        _iteratorError4 = context$3$0.t0;

                    case 27:
                        context$3$0.prev = 27;
                        context$3$0.prev = 28;

                        if (!_iteratorNormalCompletion4 && _iterator4['return']) {
                            _iterator4['return']();
                        }

                    case 30:
                        context$3$0.prev = 30;

                        if (!_didIteratorError4) {
                            context$3$0.next = 33;
                            break;
                        }

                        throw _iteratorError4;

                    case 33:
                        return context$3$0.finish(30);

                    case 34:
                        return context$3$0.finish(27);

                    case 35:

                        this._decorateResponse(response);

                        if (!(!response.ok && this._options.throwHttpErrors)) {
                            context$3$0.next = 38;
                            break;
                        }

                        throw new HTTPError(response, this.request, this._options);

                    case 38:
                        if (!this._options.onDownloadProgress) {
                            context$3$0.next = 44;
                            break;
                        }

                        if (!(typeof this._options.onDownloadProgress !== 'function')) {
                            context$3$0.next = 41;
                            break;
                        }

                        throw new TypeError('The `onDownloadProgress` option must be a function');

                    case 41:
                        if (supportsStreams) {
                            context$3$0.next = 43;
                            break;
                        }

                        throw new Error('Streams are not supported in your environment. `ReadableStream` is missing.');

                    case 43:
                        return context$3$0.abrupt('return', this._stream(response.clone(), this._options.onDownloadProgress));

                    case 44:
                        return context$3$0.abrupt('return', response);

                    case 45:
                    case 'end':
                        return context$3$0.stop();
                }
            }, null, _this, [
                [10, 23, 27, 35],
                [28, , 30, 34]
            ]);
        };

        var isRetriableMethod = this._options.retry.methods.includes(this.request.method.toLowerCase());
        var result = isRetriableMethod ? this._retry(fn) : fn();

        var _iteratorNormalCompletion5 = true;
        var _didIteratorError5 = false;
        var _iteratorError5 = undefined;

        try {
            var _loop = function() {
                var _step5$value = _slicedToArray(_step5.value, 2);

                var type = _step5$value[0];
                var mimeType = _step5$value[1];

                result[type] = function callee$3$0() {
                    var response;
                    return regeneratorRuntime.async(function callee$3$0$(context$4$0) {
                        while (1) switch (context$4$0.prev = context$4$0.next) {
                            case 0:
                                this.request.headers.set('accept', this.request.headers.get('accept') || mimeType);

                                context$4$0.next = 3;
                                return regeneratorRuntime.awrap(result);

                            case 3:
                                response = context$4$0.sent.clone();

                                if (!(type === 'json')) {
                                    context$4$0.next = 13;
                                    break;
                                }

                                if (!(response.status === 204)) {
                                    context$4$0.next = 7;
                                    break;
                                }

                                return context$4$0.abrupt('return', '');

                            case 7:
                                if (!options.parseJson) {
                                    context$4$0.next = 13;
                                    break;
                                }

                                context$4$0.t0 = options;
                                context$4$0.next = 11;
                                return regeneratorRuntime.awrap(response.text());

                            case 11:
                                context$4$0.t1 = context$4$0.sent;
                                return context$4$0.abrupt('return', context$4$0.t0.parseJson.call(context$4$0.t0, context$4$0.t1));

                            case 13:
                                return context$4$0.abrupt('return', response[type]());

                            case 14:
                            case 'end':
                                return context$4$0.stop();
                        }
                    }, null, _this);
                };
            };

            for (var _iterator5 = Object.entries(responseTypes)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                _loop();
            }
        } catch (err) {
            _didIteratorError5 = true;
            _iteratorError5 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion5 && _iterator5['return']) {
                    _iterator5['return']();
                }
            } finally {
                if (_didIteratorError5) {
                    throw _iteratorError5;
                }
            }
        }

        return result;
    }

    _createClass(Ky, [{
        key: '_calculateRetryDelay',
        value: function _calculateRetryDelay(error) {
            this._retryCount++;

            if (this._retryCount < this._options.retry.limit && !(error instanceof TimeoutError)) {
                if (error instanceof HTTPError) {
                    if (!this._options.retry.statusCodes.includes(error.response.status)) {
                        return 0;
                    }

                    var retryAfter = error.response.headers.get('Retry-After');
                    if (retryAfter && this._options.retry.afterStatusCodes.includes(error.response.status)) {
                        var after = Number(retryAfter);
                        if (Number.isNaN(after)) {
                            after = Date.parse(retryAfter) - Date.now();
                        } else {
                            after *= 1000;
                        }

                        if (typeof this._options.retry.maxRetryAfter !== 'undefined' && after > this._options.retry.maxRetryAfter) {
                            return 0;
                        }

                        return after;
                    }

                    if (error.response.status === 413) {
                        return 0;
                    }
                }

                var BACKOFF_FACTOR = 0.3;
                return BACKOFF_FACTOR * Math.pow(2, this._retryCount - 1) * 1000;
            }

            return 0;
        }
    }, {
        key: '_decorateResponse',
        value: function _decorateResponse(response) {
            var _this2 = this;

            if (this._options.parseJson) {
                response.json = function callee$2$0() {
                    return regeneratorRuntime.async(function callee$2$0$(context$3$0) {
                        while (1) switch (context$3$0.prev = context$3$0.next) {
                            case 0:
                                context$3$0.t0 = this._options;
                                context$3$0.next = 3;
                                return regeneratorRuntime.awrap(response.text());

                            case 3:
                                context$3$0.t1 = context$3$0.sent;
                                return context$3$0.abrupt('return', context$3$0.t0.parseJson.call(context$3$0.t0, context$3$0.t1));

                            case 5:
                            case 'end':
                                return context$3$0.stop();
                        }
                    }, null, _this2);
                };
            }

            return response;
        }
    }, {
        key: '_retry',
        value: function _retry(fn) {
            var ms, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, hook, hookResult;

            return regeneratorRuntime.async(function _retry$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        context$2$0.prev = 0;
                        context$2$0.next = 3;
                        return regeneratorRuntime.awrap(fn());

                    case 3:
                        return context$2$0.abrupt('return', context$2$0.sent);

                    case 6:
                        context$2$0.prev = 6;
                        context$2$0.t0 = context$2$0['catch'](0);
                        ms = Math.min(this._calculateRetryDelay(context$2$0.t0), maxSafeTimeout);

                        if (!(ms !== 0 && this._retryCount > 0)) {
                            context$2$0.next = 42;
                            break;
                        }

                        context$2$0.next = 12;
                        return regeneratorRuntime.awrap(delay(ms));

                    case 12:
                        _iteratorNormalCompletion6 = true;
                        _didIteratorError6 = false;
                        _iteratorError6 = undefined;
                        context$2$0.prev = 15;
                        _iterator6 = this._options.hooks.beforeRetry[Symbol.iterator]();

                    case 17:
                        if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
                            context$2$0.next = 27;
                            break;
                        }

                        hook = _step6.value;
                        context$2$0.next = 21;
                        return regeneratorRuntime.awrap(hook({
                            request: this.request,
                            options: this._options,
                            error: context$2$0.t0,
                            retryCount: this._retryCount
                        }));

                    case 21:
                        hookResult = context$2$0.sent;

                        if (!(hookResult === stop)) {
                            context$2$0.next = 24;
                            break;
                        }

                        return context$2$0.abrupt('return');

                    case 24:
                        _iteratorNormalCompletion6 = true;
                        context$2$0.next = 17;
                        break;

                    case 27:
                        context$2$0.next = 33;
                        break;

                    case 29:
                        context$2$0.prev = 29;
                        context$2$0.t1 = context$2$0['catch'](15);
                        _didIteratorError6 = true;
                        _iteratorError6 = context$2$0.t1;

                    case 33:
                        context$2$0.prev = 33;
                        context$2$0.prev = 34;

                        if (!_iteratorNormalCompletion6 && _iterator6['return']) {
                            _iterator6['return']();
                        }

                    case 36:
                        context$2$0.prev = 36;

                        if (!_didIteratorError6) {
                            context$2$0.next = 39;
                            break;
                        }

                        throw _iteratorError6;

                    case 39:
                        return context$2$0.finish(36);

                    case 40:
                        return context$2$0.finish(33);

                    case 41:
                        return context$2$0.abrupt('return', this._retry(fn));

                    case 42:
                        if (!this._options.throwHttpErrors) {
                            context$2$0.next = 44;
                            break;
                        }

                        throw context$2$0.t0;

                    case 44:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [
                [0, 6],
                [15, 29, 33, 41],
                [34, , 36, 40]
            ]);
        }
    }, {
        key: '_fetch',
        value: function _fetch() {
            var _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, hook, result;

            return regeneratorRuntime.async(function _fetch$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        _iteratorNormalCompletion7 = true;
                        _didIteratorError7 = false;
                        _iteratorError7 = undefined;
                        context$2$0.prev = 3;
                        _iterator7 = this._options.hooks.beforeRequest[Symbol.iterator]();

                    case 5:
                        if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
                            context$2$0.next = 18;
                            break;
                        }

                        hook = _step7.value;
                        context$2$0.next = 9;
                        return regeneratorRuntime.awrap(hook(this.request, this._options));

                    case 9:
                        result = context$2$0.sent;

                        if (!(result instanceof Request)) {
                            context$2$0.next = 13;
                            break;
                        }

                        this.request = result;
                        return context$2$0.abrupt('break', 18);

                    case 13:
                        if (!(result instanceof Response)) {
                            context$2$0.next = 15;
                            break;
                        }

                        return context$2$0.abrupt('return', result);

                    case 15:
                        _iteratorNormalCompletion7 = true;
                        context$2$0.next = 5;
                        break;

                    case 18:
                        context$2$0.next = 24;
                        break;

                    case 20:
                        context$2$0.prev = 20;
                        context$2$0.t0 = context$2$0['catch'](3);
                        _didIteratorError7 = true;
                        _iteratorError7 = context$2$0.t0;

                    case 24:
                        context$2$0.prev = 24;
                        context$2$0.prev = 25;

                        if (!_iteratorNormalCompletion7 && _iterator7['return']) {
                            _iterator7['return']();
                        }

                    case 27:
                        context$2$0.prev = 27;

                        if (!_didIteratorError7) {
                            context$2$0.next = 30;
                            break;
                        }

                        throw _iteratorError7;

                    case 30:
                        return context$2$0.finish(27);

                    case 31:
                        return context$2$0.finish(24);

                    case 32:
                        if (!(this._options.timeout === false)) {
                            context$2$0.next = 34;
                            break;
                        }

                        return context$2$0.abrupt('return', this._options.fetch(this.request.clone()));

                    case 34:
                        return context$2$0.abrupt('return', timeout(this.request.clone(), this.abortController, this._options));

                    case 35:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [
                [3, 20, 24, 32],
                [25, , 27, 31]
            ]);
        }

        /* istanbul ignore next */
    }, {
        key: '_stream',
        value: function _stream(response, onDownloadProgress) {
            var totalBytes = Number(response.headers.get('content-length')) || 0;
            var transferredBytes = 0;

            return new globalThis.Response(new globalThis.ReadableStream({
                start: function start(controller) {
                    var reader, read;
                    return regeneratorRuntime.async(function start$(context$3$0) {
                        while (1) switch (context$3$0.prev = context$3$0.next) {
                            case 0:
                                read = function read() {
                                    var _ref, done, value, percent;

                                    return regeneratorRuntime.async(function read$(context$4$0) {
                                        while (1) switch (context$4$0.prev = context$4$0.next) {
                                            case 0:
                                                context$4$0.next = 2;
                                                return regeneratorRuntime.awrap(reader.read());

                                            case 2:
                                                _ref = context$4$0.sent;
                                                done = _ref.done;
                                                value = _ref.value;

                                                if (!done) {
                                                    context$4$0.next = 8;
                                                    break;
                                                }

                                                controller.close();
                                                return context$4$0.abrupt('return');

                                            case 8:

                                                if (onDownloadProgress) {
                                                    transferredBytes += value.byteLength;
                                                    percent = totalBytes === 0 ? 0 : transferredBytes / totalBytes;

                                                    onDownloadProgress({ percent: percent, transferredBytes: transferredBytes, totalBytes: totalBytes }, value);
                                                }

                                                controller.enqueue(value);
                                                context$4$0.next = 12;
                                                return regeneratorRuntime.awrap(read());

                                            case 12:
                                            case 'end':
                                                return context$4$0.stop();
                                        }
                                    }, null, this);
                                };

                                reader = response.body.getReader();

                                if (onDownloadProgress) {
                                    onDownloadProgress({ percent: 0, transferredBytes: 0, totalBytes: totalBytes }, new Uint8Array());
                                }

                                context$3$0.next = 5;
                                return regeneratorRuntime.awrap(read());

                            case 5:
                            case 'end':
                                return context$3$0.stop();
                        }
                    }, null, this);
                }
            }));
        }
    }]);

    return Ky;
})();

var validateAndMerge = function validateAndMerge() {
    for (var _len2 = arguments.length, sources = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        sources[_key2] = arguments[_key2];
    }

    var _iteratorNormalCompletion8 = true;
    var _didIteratorError8 = false;
    var _iteratorError8 = undefined;

    try {
        for (var _iterator8 = sources[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
            var _source2 = _step8.value;

            if ((!isObject(_source2) || Array.isArray(_source2)) && typeof _source2 !== 'undefined') {
                throw new TypeError('The `options` argument must be an object');
            }
        }
    } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion8 && _iterator8['return']) {
                _iterator8['return']();
            }
        } finally {
            if (_didIteratorError8) {
                throw _iteratorError8;
            }
        }
    }

    return deepMerge.apply(undefined, [{}].concat(sources));
};

var createInstance = function createInstance(defaults) {
    var ky = function ky(input, options) {
        return new Ky(input, validateAndMerge(defaults, options));
    };

    var _iteratorNormalCompletion9 = true;
    var _didIteratorError9 = false;
    var _iteratorError9 = undefined;

    try {
        var _loop2 = function() {
            var method = _step9.value;

            ky[method] = function(input, options) {
                return new Ky(input, validateAndMerge(defaults, options, { method: method }));
            };
        };

        for (var _iterator9 = requestMethods[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
            _loop2();
        }
    } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion9 && _iterator9['return']) {
                _iterator9['return']();
            }
        } finally {
            if (_didIteratorError9) {
                throw _iteratorError9;
            }
        }
    }

    ky.HTTPError = HTTPError;
    ky.TimeoutError = TimeoutError;
    ky.create = function(newDefaults) {
        return createInstance(validateAndMerge(newDefaults));
    };
    ky.extend = function(newDefaults) {
        return createInstance(validateAndMerge(defaults, newDefaults));
    };
    ky.stop = stop;

    return ky;
};

var ky = createInstance();

window.ky = ky;

// eslint-disable-next-line no-await-in-loop

// If `onDownloadProgress` is passed, it uses the stream API internally
/* istanbul ignore next */

// eslint-disable-next-line no-await-in-loop

// If `stop` is returned from the hook, the retry process is stopped

// eslint-disable-next-line no-await-in-loop
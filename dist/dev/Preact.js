/**
 * Preact ⚛️
 *
 * Brings Preact to Dev as a library exposed via mw.hook
 * You can build stateful UIs and let Preact diff and update the DOM for you
 *
 * @author Dorumin
 */

(function() {
    // Double firing the hook would be catastrophic
    if (window.dev && window.dev.preact) {
        return;
    }
    
    // The library will live here... eventually.
    window.dev.preact = {};

    function importScript(args) {
        return new Promise(function(resolve) {
            var script = document.createElement('script');
            // The async attribute does not block the main thread
            // It simply assures that scripts loaded are executed in order
            // However, they are loaded in parallel
            // The `onload` callback is called on execution, not load
            script.async = false;
            script.onload = resolve;
            script.crossOrigin = 'anonymous';
            script.integrity = args.hash;
            script.src = args.url;

            document.head.appendChild(script);
        });
    }

    // Import base preact library and preactHooks
    // Both will be registered under `window.`
    // They will be loaded in parallel, but they're forced to execute in order
    // This is because of the script.async property being `false`
    // This does not block user interactions or block the main thread
    // The SHA384 hashes were generated with the following command:
    // curl <URL> -s | openssl dgst -sha384 -binary | openssl base64 -A
    importScript({
        url: 'https://unpkg.com/preact@10.5.14/dist/preact.min.js',
        hash: 'sha384-auG6x/Zk8r65Rlt+ny4jxUDnUdeT0kRCHjtVQnASpXOD4rl0slc2biB0nPJE+ofU'
    });
    importScript({
        url: 'https://unpkg.com/preact@10.5.14/hooks/dist/hooks.umd.js',
        hash: 'sha384-amHxNcED3Tgh59sXnRYw4uyDgATk8SUABATAxSA/biQCwTIwH6tveEplPo6Jdpef'
    }).then(function() {
        var preact = window.preact;
        var hooks = window.preactHooks;

        delete window.preact;
        delete window.preactHooks;

        var exports = {
            _preact: preact,
            _hooks: hooks
        };

        // We start with custom code here!
        // Dev facilities, for flattening, simplifying, and easier ES3 code

        // createElement wrapper that lets you use child: instead of children:
        // for single-child elements
        // We don't have to turn varargs children to props here!
        // Preact is cool, so it lets us do that by itself
        function createElement() {
            var props = arguments[1];
            if (
                // Props is an object and not null
                typeof props === 'object'
                && props !== null
                // It sets child: but no children:
                && 'child' in props
                && !('children' in props)
            ) {
                props.children = [props.child];
                delete props.child;
            }

            return preact.createElement.apply(null, arguments);
        }

        exports.createElement = createElement;
        exports.h = createElement;

        // Internal comparison function for props
        // It returns true if two objects compare different shallowly
        function shallowDifferent(o, t) {
            for (var e in o) {
                if (!(e in t)) {
                    return true;
                }
            }

            for (var r in t) {
                if (o[r] !== t[r]) {
                    return true;
                }
            }

            return false;
        }

        exports.memo = function(Component, cmp) {
            cmp = cmp || shallowDifferent;

            return function Memo(props) {
                var prevComp = exports.useRef(null);
                var prevProps = exports.useRef(null);

                if (prevComp.current === null || cmp(prevProps.current, props)) {
                    prevComp.current = createElement(Component, props);
                    prevProps.current = props;
                }

                return prevComp.current;
            };
        };

        // Tag shorthands that depend on ES6 features
        var tagBindCache = {};
        exports.tags = new Proxy({}, {
            get: function(_, prop) {
                if (tagBindCache.hasOwnProperty(prop)) {
                    return tagBindCache[prop];
                }

                if (prop.charAt(0).toLowerCase() !== prop.charAt(0)) {
                    throw new Error('Found a capitalized HTML tag. Is this a typo?');
                }

                tagBindCache[prop] = createElement.bind(null, prop);

                return tagBindCache[prop];
            }
        });

        // h(Fragment, { children }) shorthand
        exports.frag = function(children) {
            return createElement(preact.Fragment, {
                children: children
            });
        };

        // useState and useReducer versions that don't require destructuring
        exports.useState = function(initialState) {
            var state = hooks.useState(initialState);

            return {
                value: state[0],
                set: state[1]
            };
        };
        exports.useReducer = function(reducer, initialArg, init) {
            var handle = hooks.useReducer(reducer, initialArg, init);

            return {
                state: handle[0],
                dispatch: handle[1]
            };
        };
        exports.useErrorBoundary = function(report) {
            var boundary = hooks.useErrorBoundary(report);

            return {
                error: boundary[0],
                reset: boundary[1]
            };
        };

        // Just copy these, no destructuring
        exports.useEffect = hooks.useEffect;
        exports.useContext = hooks.useContext;
        exports.useMemo = hooks.useMemo;
        exports.useCallback = hooks.useCallback;
        exports.useRef = hooks.useRef;
        exports.useLayoutEffect = hooks.useLayoutEffect;
        // exports.useImperativeHandle = hooks.useImperativeHandle;
        // exports.useDebugValue = hooks.useDebugValue;

        // As well as these
        exports.render = preact.render;
        exports.Fragment = preact.Fragment;
        exports.createContext = preact.createContext;
        exports.cloneElement = preact.cloneElement;
        exports.toChildArray = preact.toChildArray;

        // Expose as a dev global and mw.hook
        window.dev = window.dev || {};
        window.dev.preact = exports;

        if (typeof mw === 'object' && typeof mw.hook === 'function') {
            mw.hook('dev.preact').fire(exports);
        }
    });
})();
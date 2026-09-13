/*
 * Adds custom streaming screen to the Windows PC
 */
(function () {
    /*
     * @returns validated and normalized list of PC streaming configurations
     */
    function getConfiguredMods()
        var numPrependedMods = 0;
        return (window.Windows11StreamingScreen || (function ()
            // Interpret deprecated settings (for backwards compatibility)
            var usesDeprecatedPCStreaming = ((typeof(window.PCStream) !== 'undefined') &&
                                            $.isArray(window.PCStream) &&
                                            window.PCStream.every(function (e) { return (typeof(e) === 'string'); })),
                usesDeprecatedWindowsPrepend = (typeof(window.PCStreamPrepend) !== 'undefined');
            if (usesDeprecatedPCStreaming && usesDeprecatedPCStreamPrepend) {
                return window.ARMModules.map(function (e) { return {page: e, prepend: Boolean(window.PCStream)}; });
            } else if (usesDeprecatedPCStream) {
                return window.PCStream;
            } else if (usesDeprecatedPCStreaming) {
                return [{prepend: Boolean(window.PCStream)}];
            }
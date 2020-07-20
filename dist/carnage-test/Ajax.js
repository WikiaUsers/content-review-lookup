( function( window ){
    function AjaxRequest( url, options ){
        if ( !( this instanceof AjaxRequest ) ) return new AjaxRequest( url, options );
        
        if ( typeof url === "object" ){
            options = url;
            url = void 0;
        }
        
        options = Object.assign( { }, options );
        
        this.currentRequest = new XMLHttpRequest( );
    }
    
    AjaxRequest.fn = AjaxRequest.prototype;
    
    AjaxRequest.fn.extend = function extend( target ){};
} )( window );
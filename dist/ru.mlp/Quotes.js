var QuotesTransformer = function( elem ) {
    this._textArea = document.getElementById( 'wpTextbox1');
    var toolbar = document.getElementById( 'cke_toolbar_source_1') || document.getElementById( 'toolbar');
    this._textArea.addEventListener( 'keypress', this._quoteTransform.bind(this) );
    this._controlButton = document.createElement( 'div' );
    this._controlButton.classList.add( 'editButton_quotes' );
    if ( localStorage.getItem('editor_quotes_guillemets') ) {
        this._active = true;
        this._controlButton.textContent = '« »';
        this._controlButton.classList.add( 'editButton_quotes_active' );
    } else {
        this._active = false;
        this._controlButton.textContent = '" "';
        this._controlButton.classList.add( 'editButton_quotes_inactive' );
    }
    toolbar.appendChild( this._controlButton );
    this._controlButton.addEventListener( 'click', this._activeSwitch.bind(this) );
    console.log( 'quotes create' );
};
QuotesTransformer.prototype._quoteTransform = function( e ) {
    if ( !this._active )
        return;
    if ( e.which < 32 || String.fromCharCode(e.which) !== '"' )
        return;
    setTimeout(function() {
        this._quoteReplace();
    }.bind(this), 1);
};
QuotesTransformer.prototype._quoteReplace = function( e ) {
    var area = this._textArea;
    var val = area.value;
    var cursor = area.selectionStart;
    var newQuote;
    if ( cursor === 1 || /\s/.test(val[cursor - 2]) ) {
        newQuote = '«';
    } else {
        newQuote = '»';
    }
    if ( cursor === 0 ){
        this.area.value = newQuote + val.slice( 0 );
    } else {
        area.value = val.slice( 0, cursor - 1 ) + newQuote + val.slice( cursor );
    }
    area.selectionStart = cursor;
    area.selectionEnd = cursor;
};
QuotesTransformer.prototype._activeSwitch = function() {
    if ( this._active ) {
        this._active = false;
        this._controlButton.textContent = '" "';
        this._controlButton.classList.remove( 'editButton_quotes_active' );
        this._controlButton.classList.add( 'editButton_quotes_inactive' );
        localStorage.removeItem( 'editor_quotes_guillemets' );
    } else {
        this._active = true;
        this._controlButton.textContent = '« »';
        this._controlButton.classList.remove( 'editButton_quotes_inactive' );
        this._controlButton.classList.add( 'editButton_quotes_active' );
        localStorage.setItem( 'editor_quotes_guillemets', 'true' );
    }
};

if ( document.querySelector( 'body.ns-0 #EditPageHeader' ) || document.querySelector( 'body.ns-0.action-edit' ) ) {
    setTimeout(function() {
        new QuotesTransformer();
    }, 1);
}
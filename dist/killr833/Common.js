$(function() {
    if ( wgPageName == 'Fibonacci_test' ) {
        var fibonacciNumbersSpan = document.getElementsByClassName( 'fibonacciTestJavaScript' )[0],
        numbersArray = [ 0, 1 ],
        data = '';
            for ( var i = 0; i < 10001; i++ ) {
                data += '<span title="' + i + '">' + numbersArray[ 0 ] + ' <\/span>';
                numbersArray = [ numbersArray[ 1 ], numbersArray[ 0 ] + numbersArray[ 1 ] ];
            }
        fibonacciNumbersSpan.innerHTML = data;
    }
});
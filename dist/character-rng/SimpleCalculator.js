$(function() {

    // Function to calculate the percentage difference
    function percentageDifference(a, b) {
        return (Math.min(a, b) / Math.max(a, b)) * 100;
    }

    // Function to calculate 5% of the larger number, round up, and format it with commas (no decimals)
    function calculateFivePercentOfLarger(a, b) {
        var largerNumber = Math.max(a, b);
        var fivePercentValue = largerNumber * 0.05;
        var roundedValue = Math.ceil(fivePercentValue);
        return roundedValue;
    }

    // Function to format the input value with commas and keep cursor position correctly
    function formatInputField(field) {
        // Get initial cursor position and count commas before the cursor
        var selectionStart = field.selectionStart;
        var valueWithoutCommas = field.value.replace(/,/g, '');
        var oldCommasBeforeCursor = (field.value.substring(0, selectionStart).match(/,/g) || []).length;
    
        // Format the value with commas
        field.value = formatNumberWithCommas(valueWithoutCommas);
    
        // Calculate new cursor position
        var newCommasBeforeCursor = (field.value.substring(0, selectionStart).match(/,/g) || []).length;
        var commaDifference = newCommasBeforeCursor - oldCommasBeforeCursor;

        // Adjust cursor position based on comma differences
        var newCursorPos = selectionStart + commaDifference;
        field.setSelectionRange(newCursorPos, newCursorPos);
    }

    // Function to format number with commas
    function formatNumberWithCommas(value) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // Function that handles calculation and updating result
    function calculateTheValues() {
        var spanToWriteResult = $("#calculator-result")[0];
        var fivePercentDisplay = $("#five-percent-result")[0];
        var firstNumber = $("#calculator-value-1")[0].value.replace(/,/g, '');
        var secondNumber = $("#calculator-value-2")[0].value.replace(/,/g, '');
        var resultText = "0.00%";
        var fivePercentText = ""; 

        if (isNaN(firstNumber) || firstNumber === "" || isNaN(secondNumber) || secondNumber === "") {
            resultText = "0.00%";
            spanToWriteResult.style.color = "gray";
            fivePercentDisplay.style.opacity = "0"; // Hide the five-percent result
        } else {
            var percentage = percentageDifference(Number(firstNumber), Number(secondNumber)).toFixed(2);
            resultText = percentage + "%";

            if (percentage >= 5.00) {
                spanToWriteResult.style.color = "green";
                fivePercentDisplay.style.opacity = "0"; // Hide the five-percent result
            } else {
                spanToWriteResult.style.color = "red";
                var fivePercentValue = calculateFivePercentOfLarger(Number(firstNumber), Number(secondNumber));
                var currentValue = Math.min(Number(firstNumber), Number(secondNumber));
                var remainingValueNeeded = fivePercentValue - currentValue;
                remainingValueNeeded = remainingValueNeeded > 0 ? remainingValueNeeded : 0;

                fivePercentText = '5% value needed is ' + formatNumberWithCommas(fivePercentValue);
                var remainingValueText = '<br>Remaining value needed is ' + formatNumberWithCommas(remainingValueNeeded);

                fivePercentDisplay.innerHTML = fivePercentText + remainingValueText;
                fivePercentDisplay.style.opacity = "1"; // Show the five-percent result
            }
        }

        spanToWriteResult.innerHTML = resultText;
    }

    // Function to check and insert controls
    function checkSpan() {
        var spanToInsertControls = $("#calculator-inputs")[0];
        if (spanToInsertControls !== undefined) {
            var spanText = $("#calculator-inputs")[0].innerText;
            if (spanText !== "") {
                spanToInsertControls.innerHTML = "";
            }

            $('<input id="calculator-value-1" type="text" placeholder="Trade value 1">').appendTo(spanToInsertControls);
            $('<span id="calculator-result" style="margin: 0 10px; font-weight: bold;">0.00%</span>').appendTo(spanToInsertControls);
            $('<input id="calculator-value-2" type="text" placeholder="Trade value 2">').appendTo(spanToInsertControls);
            $('<br><div id="five-percent-result" style="margin-top: 10px; font-size: 16px; color: black; opacity: 0;">5% value needed is</div>').appendTo(spanToInsertControls);
            $('#calculator-value-1, #calculator-value-2').on('input', function() {
                formatInputField(this);
                calculateTheValues();
            });
        } else {
            timeUntilNewCheck += 2000;
            if (currentCheck != maxChecksForCalcSpan) {
                currentCheck += 1;
                setTimeout(checkSpan, timeUntilNewCheck);
            }
        }
    }

    // Start by checking the span
    checkSpan();
});
function formatNumber(str, glue) {
            if(isNaN(str)) {
                return NaN;
            }
            var glue= (typeof glue== 'string') ? glue: ',';
            var digits = str.toString().split('.');
            var integerDigits = digits[0].split("");
            var threeDigits = [];
            while (integerDigits.length > 3) {
                threeDigits.unshift(integerDigits.splice(integerDigits.length - 3, 3).join(""));
            }
            threeDigits.unshift(integerDigits.join(""));
            digits[0] = threeDigits.join(glue);
            return digits.join(".");
        }
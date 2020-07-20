/* This is a prime-testing code. The page will only load on specific pages that
are meant to be shown. See Common.js for details.  */

$('<div style="float: right; font-size:0.5em">Enter a number to test primality: <input type="text" id="myNumber" size="14" maxlength="15"><input type="button" value="Calculate" onclick="calculate(form)"><input type="text" id="myResult" name="result" size="55" value="" readonly placeholder="Enter a prime number here for testing! (Limit: 15 digits)"></div>').appendTo('#PrimeTest_tag');
 
function calculate(form) {
   var num = document.getElementById("myNumber").value; 
   num = num.replace(/\,/g,'');  //Removing possible commas or spaces inside
   num = parseInt(num,10);       //If parsing fails, the number is NaN
   var prime = "no";             //Set "prime" to no. If it is unaltered, it's prime.
   var x=Math.sqrt(num);         //Testing is only necessary up to square root of said number
   var result;                   //Defining result to return
   var e = Math.floor((Math.random() * 10) + 1); //Just for random num curios
   var y = 1;                    //For numbers up to 12 digits. User may abort (then y = 0)
   var i;                        //Incrementing divisor.
    
    if (isNaN(num) || num < 0) {
    document.getElementById("myResult").value=("This is not a valid number! Please try again.");
    return;
    }
   
   //Switch block starts
   switch (num) {
   case 0:
      result=("Uh......are you sure about number 0?");
      break;
   case 1:
      result=("1 is not prime by definition. It has only 1 factor.");
      break;
   case 2:
      result=("2 is a prime number! The only even one, sadly.");
      break;
   case 3:
      if (e == 8) {
        result=("3 is a prime number! It's 3primetime3's favorite prime!");
      } else {
        result=("3 is prime!");
      }
      break;
   case 37:
      if (e == 8) {
        result=("You found an easter egg! It's Blueeighthnote's favorite prime!");
      } else {
        result=("37 is prime!");
      }
      break;
   case 83:
      if (e == 8) {
        result=("83 is a prime number! It's Minipop56's favorite prime!");
      } else {
        result=("83 is prime!");
      }
      break;
      
   default: 
   //Detect squares early if it turns out to be the case
   if (x % 1 === 0) {
       result = (num + " is not prime. It is a square of " + x + ".");
       break;
       }
   else if (num % 2 === 0) {
       result = (num + " is not prime. It is divisible by 2. (Even Number)");
       break;
       }
   else if (num % 5 === 0) {
       result = (num + " is not prime. It is divisible by 5. (Ends with 5 or 0)");
       break;
       }
   else {
   //Begin Prime Test Check Loop
   for (i=3;i<=x;) {
       //Condition was set to activate the message if the number is above 62.5 billion: A prompt is made to ask if the calculation should stop.
         if (i == 99997 && x >= 316227) {
            document.getElementById("myResult").value = "Testing a number larger than 12 digits......";
            var r = confirm("The number has no factors below 99991. Do you want to continue? It might take up to 30 seconds to check if it is prime, during which the browser would be unresponsive.");
            if (r === false) {y = 0; break;}      
         }
         if (num % i === 0) {
         prime="yes";
         break;
         }
         if (i % 30 === 1 ||i % 30 === 23) i += 6;
         else if (i % 30 === 7 || i % 30 === 13 ||i % 30 === 19) i += 4;
         else i += 2;
      }
   }
   //End Loop
   if (y === 0) {result=("Calculation aborted. " + num + " has no factors below 99999.");}
   else if (prime == "yes"){
   result=(num + " is not prime.  It is divisible by " + i + ".");
   }
   else if (prime == "no"){
   result=(num + " is prime!");
   }
   else {result = "Unknown error. If this message occurs, that means the code has a bug somehow."}
   }
   //End Switch block
   document.getElementById("myResult").value = result;
}
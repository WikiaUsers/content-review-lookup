/* Any JavaScript here will be loaded for all users on every page load. */
(function() {
  var calculator = $('#ikea-calculator'); // get container. #id should match what you have in above wiki code.
  if (!calculator.length) return; // element doesn't exist, exit early.
  calculator.empty(); // clear
  calculator.css("background-image", "url(https://static.wikia.nocookie.net/shadovia-rpg/images/6/60/Weld.png/revision/latest/scale-to-width-down/120?cb=20231217015803)");
  calculator.css("border", "3px solid black");
  calculator.css("border-radius", "3px");
  calculator.css("background-size", "7.5%");
  calculator.css("width", "fit-content");
  // make elements.
  var dc = $('<input type="number" placeholder="Drop Chance" style="margin: 0 5px 0 5px;border: 3px solid black;border-radius: 3px" name="dc" step="0.1" min="0" required>');
  var k = $('<input type="number" placeholder="Kills" style="margin: 5px;border: 3px solid black;border-radius: 3px" name="k" step="0.01" min="0" required>');
  var p = $('<input type="button" value="Results" style="border: 3px solid black;border-radius: 3px;margin-right: 5px">');
  var r = $('<div style="text-align: center;">Your Total Chance is..</div>');
  var h = $('<div style="border-bottom: 3px solid black;background-image: url(https://static.wikia.nocookie.net/shadovia-rpg/images/a/af/Stud3.png/revision/latest?cb=20231216180805);text-align: center;font-size: 18px;font-weight: bold;background-size: 7.5%">Pity Calculator</div>');
  // add click handler.  
  p.click(calculatePity);
  // add elements to the container.
  calculator.append([h,dc, k, p, r]);
  function calculatePity() {
    var drop = dc.val();
    var kills = k.val();
     if (drop > 0.1 && kills >= 1) {
        var res = drop * Math.max(1.1, kills * 0.1);
        r.css("color", "lime");
        r.text("Your Total Chance is " + res.toFixed(2) + "%!"); // set the text to result.
    } else {
        r.css("color", "red");
        r.text("Please enter valid numbers in both fields."); // Show error message
    }
  }
})();
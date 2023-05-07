/* Any JavaScript here will be loaded for all users on every page load. */

let targetValue = 5;

if (targetValue == 3)
{
	console.log("nope, it's 3");
}
else if (targetValue == 4)
{
	console.log("nope, it's 4");
}
else if (targetValue == 5)
{
	console.log("yes, target hit: " + targetValue);
}
else
{
	console.log("not 3, 4 or 5");
}
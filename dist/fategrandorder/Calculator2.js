
var initlvl;
var endlvl;
var total = 0;
var expneeded = 0;
var expneededp = 0;

if (initlvl <= endlvl)
{
    for (i = initlvl; i < endlvl; i++) {
        expneeded = 100 + ((i - 1)*100) + expneededp;
        expneededp = expneeded;
        total += expneeded;
    }
}
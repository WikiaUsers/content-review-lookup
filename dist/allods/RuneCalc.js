$(".submit").live("click", function() {
    var rl = Number($(".rl").val());
    var am = Number($(".am").val());
    var priceg = Number($(".priceg").val());
    var exc = Number($(".exc").val());
    var exd = Number($(".exd").val());
    var rex = $(".rex").val();
    var rexes = rex.split(";");
    var rexarr = [];
    var am1 = ["", "a", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "multiple", "s"];
    var bsldr = [];
    var cons = document.getElementById('cons').checked;
    
    var arrcst = [];
    var arrchp = [];
    var arrcstb = [];
    var arrchpb = [];
    var bsldrxl = [];
    var bsldrxlcmp = [];
    var bsldrxlcmpsldrs = [];
    
    function bsl(a)
    {
        for (t = 2; t <= rl; t++)
        {
            for (o = 0; o <= 14; o++)
            {
                var arrsldr = (o - 7);
                var basechps = Math.round(Math.round(10 * Math.pow(1.5,t-2)) * Math.pow(1.1,arrsldr));
                var basedst = Math.round(Math.round(100 * Math.pow(1.5,t-2)) * Math.pow(2,-arrsldr));
                var bslcstnew = Math.ceil((basechps*priceg + basedst*0.0095)* 100)/100;
                arrchp[o + (t-2)*15] = basechps;
                arrcst[o + (t-2)*15] = bslcstnew;
                
                if (o === 0)
                    {
                        bslcst = bslcstnew;
                        bsldr[t - 2] = arrsldr;
                        arrchpb[t-2] = basechps;
                        arrcstb[t-2] = bslcstnew;
                    }
                    else if (bslcstnew < bslcst)
                    {
                        bslcst = bslcstnew;
                        bsldr[t - 2] = arrsldr;
                        arrchpb[t-2] = basechps;
                        arrcstb[t-2] = bslcstnew;
                    }
            }
        }
        return bsldr[a];
    }
    
    var dfrnccst;
    var dfrncchp;
    
    function bslxl(k)
    {
        for (l = 2; l <= rl; l++)
        {
            for (m = 0; m <= 14; m++)
            {
                if (arrcst[m + (l-2)*15] <= (arrcstb[l - 2] * 1.03) && arrchpb[l - 2] > arrchp[m + (l-2)*15])
                {
                    dfrnccst = arrcst[m + (l-2)*15] - arrcstb[l - 2];
        
                    dfrncchp = (arrchpb[l - 2] - arrchp[m + (l-2)*15]) * priceg;
                    
                        if (dfrncchp > dfrnccst)
                        {
                            bsldrxlcmp[m + (l-2)*15] = dfrncchp;
                            bsldrxlcmpsldrs[m + (l-2)*15] = m - 7;
                        }
                }
            }
            
            for (n = 0; n <= 14; n++)
            {
                if (bsldrxlcmp[n + (l-2)*15] > 0)
                {   
                    bsldrxl[l - 2] = bsldrxlcmpsldrs[n + (l-2)*15] ;
                    break;
                }
                else
                {
                    bsldrxl[l - 2] = bsldr[l - 2];
                }
            }
            
        }
    return bsldrxl[k];
    }
   
    var bsla = bsl(0);
    var bslb = bslxl(0);
   
    function chps(d)
    {
        var ttlc = 0;
        var ttld = 0;
        var sldr;
        
            for (u=0;u<=d;u++)
            {
                if (cons === true)
                {
                sldr = bsldrxl[d - u - 2];
                }
                else
                {
                sldr = bsldr[d - u - 2];
                }
            
                    ttlc = ttlc + (Math.pow(2,u)*(Math.round(Math.round(10 * Math.pow(1.5,d-u-2))*Math.pow(1.1,sldr))));
                    ttld = ttld + (Math.pow(2,u)*(Math.round(Math.round(100 * Math.pow(1.5,d-u-2))*Math.pow(2,-sldr))));
                    if (d-u-2===0)
                    {
                    break;
                    }
            }
    return {ttlc : ttlc, ttld : ttld};
    }
        
    var rexc = 0;
    var rexd = 0;
    var rexr = 0;  
    
    if (rex !== 0)
    {
        for (v=0;v<rexes.length;v++)
        {
            rexarr[v] = parseInt(rex.split(";")[v],10);
        }
            for (w=0;w<rexarr.length;w++)
            {
                if (rexarr[w] > 1)
                {
                    var b = chps(rexarr[w]);
                    rexc = rexc + b.ttlc;
                    rexd = rexd + b.ttld;
                    rexr = rexr + Math.pow(2, rexarr[w] - 1);
                }
            }
    }

    var ttlchps;
    var chpover = "";
    var ttldst;
    var dstover = "";
    var ttlrns;
    var runeover = "";
    
    if (chps(rl).ttlc * am <= (exc + rexc))
    {
    ttlchps = 0;
    }
    else
    {
    ttlchps = chps(rl).ttlc * am - exc - rexc;
    }
   
    if (exc + rexc > 0)
    {
    chpover = " (out of required " + (chps(rl).ttlc * am) + ")";
    }
   
    if (chps(rl).ttld * am <= exd + rexd)
    {
    ttldst = 0;
    }
    else
    {
    ttldst = chps(rl).ttld * am - exd - rexd;
    }

    if (Math.pow(2, rl - 1) * am <= rexr)
    {
    ttlrns = 0;
    }
    else
    {
    ttlrns = Math.pow(2, rl - 1) * am - rexr;
    }

    if (exd + rexd > 0)
    {
    dstover = " (out of required " + (chps(rl).ttld * am) + ")";
    }

    if (rexr > 0)
    {
    runeover = " (out of required " + (Math.pow(2, rl - 1) * am) + ")";
    }
    
    var ttlprice = Math.ceil((ttlchps * priceg + ttldst * 0.0095 + ttlrns * 0.475) * 100)/100;

    function list(p)
    {
        var p1 = 0;
        var p2 = 0;

            if (cons === true)
            {
                for (s=1;s<p;s++)
                {
                    p1 = "Combining Level " + s + " runes: " + bslxl(s-1);
                    if (p2 === 0)
                    {
                    p2 = p1;
                    }
                    else
                    {
                    p2 = p2 + "<br /><br />" + p1;
                    }
                }
            }
            else
            {
                for (s=1;s<p;s++)
                {
                    p1 = "Combining Level " + s + " runes: " + bsl(s-1);
                    if (p2 === 0)
                    {
                    p2 = p1;
                    }
                    else
                    {
                    p2 = p2 + "<br /><br />" + p1;
                    }  
                }
            }
    return p2;
    }

    function amount(q)
    {
        var amnt;
        if (q > 0 && q < 11)
        {
        amnt = am1[q];
        }
        else
        {
        amnt = am1[11];
        }
    return amnt;
    }

    function plural(r)
    {
        var pl = am1[0];
        if (r > 1)
        {
        pl = am1[12];
        }
    return pl;
    }
 
    var print1;

    var ex = "";
   
    if (exc > 0 || exd > 0 || rexr !== 0)
    {
        ex = " You already have ";
        if (exc > 0)
        {
        ex = ex + exc + " Crystal Chips";
            if (exd > 0 && Number(rex) !== 0)
            {
            ex = ex + ", " + exd + " Gold Dust flakes";
                if (Number(rex) !== 0)
                {
                ex = ex + " and " + amount(rexarr.length) + " rune" + plural(rexarr.length) + " that will be used in the reaction.";
                }
            }
        
            else if (exd > 0)
            {
            ex = ex + " and " + exd + " Gold Dust flakes that will be used in the reaction.";
            }
        
            else if (Number(rex) !== 0)
            {
            ex = ex + " and " + amount(rexarr.length) + " rune" + plural(rexarr.length) + " that will be used in the reaction.";
            }
            else
            {
            ex = ex + " that will be used in the reaction.";
            }
        }
        else if (exd > 0)
        {
        ex = ex + exd + " Gold Dust flakes";
            if (Number(rex) !== 0)
            {
            ex = ex + " and " + amount(rexarr.length) + " rune" + plural(rexarr.length) + " that will be used in the reaction.";
            }
            else
            {
            ex = ex + " that will be used in the reaction.";
            }
        }
        else
        {   
        ex = ex + amount(rexarr.length) + " rune" + plural(rexarr.length) + " that will be used in the reaction.";
        }    
    }

    if (priceg === 0)
    {
    print1 = "You have set the price of each chip to 0. The calculator will assume that you can get unlimited chips for free.<br /><br />";
    }
    else if (priceg < 0)
    {
    print1 = "You have set the price of each chip to a negative number. The calculator will assume that someone gives you unlimited chips for free and pays you for accepting them... or something...<br /><br />";
    }     
    else
    {
    print1 = "";
    }
    
    var cond;
    
    if (cons === true)
    {
    cond = "<br /><br />This is not the lowest possible cost (since Conserve Chips was selected), but it's a bit more efficient.";
    }
    else
    {
    cond = "<br /><br />This is the lowest possible cost (since the Chip Price is set to " + priceg + " gold pieces per chip).";
    }
    
    var print2 = "You are trying to make " + amount(am) + " Level " + rl + " rune" + plural(am) + "." + ex + "<br /><br />You will need to get " + ttlchps + " Crystal Chips" + chpover + ", " + ttldst + " Gold Dust flakes" + dstover + ", and " + ttlrns + " Level 1 runes" + runeover + ".<br /><br />";
   
    var print3 = "The Crystal Chips will cost " + Math.ceil(ttlchps * priceg * 100)/100 + " gold, the Gold Dust will cost " + Math.ceil(ttldst * 0.0095 * 100)/100 + " gold, and the Level 1 runes will cost " + Math.ceil((Math.pow(2, rl - 1) * am - rexr) * 0.475 * 100)/100 + " gold.<br />" + '<span style="font-weight:bold; letter-spacing:1px;">Total: ' + ttlprice + " gold pieces.</span>";
        
    var print4 = cond + "<br /><br />Set the slider to the following positions:<br /><br />" + list(rl);

    document.getElementById('result').innerHTML = print1 + print2 + print3 + print4;

 });
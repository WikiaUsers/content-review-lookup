// Script fait à l'occas' du 1er avril, merci de ne pas y toucher pour la journée
alert("PA:activé");

function verifjs()
    {
    return window.confirm('Aujourd\'hui est un beau jour, non ? (clique pas sur sur ok !!)'); 
    }
var date = new Date();
//var minutes = 30;
//date.setTime(date.getTime() + (minutes * 60 * 1000));
//$.cookie('PoissonAvril', 'PoissonAvril', { expires: date });

if (!$.cookie('PoissonAvril')) 
{
    if ( verifjs() === false)
        {
            alert("mdrrrr, t'y as cru ? PTDR");
            $(".chat-name").replaceWith('<p>Tchat non dispo <img src="http://sournoishack.com/uploads/1065465496c..png"/></p>');
            $(".chat-join button").hide();
        }
    else
        {
            alert("Ouais bon, t'es maso quand même mdrrrrr");
            $("body").before('<p style="font-size:30px;background: white !important; color:black !important;text-align:center;">Maître Oda aime le poisson <img src="http://sournoishack.com/uploads/1065465496c..png"/></p>');
        }
    $.cookie('PoissonAvril', true);
}

if ( wgTransactionContext.action != "edit" )
{
var i = 0;
var malheur = 0;
var txt_nb_42 = '<div style="border:5px inset green; color: blue; margin-left: 30%; margin-top: 10%; width: 36%;">Entre 1 et 1000 milliards, il a fallut que ça tombe sur 42, tant pis pour toi <3</div>';
var txt_nb_666 = '<div style="border:20px groove red; color: darkred; margin-left: 30%; margin-top: 10%;width: 14%;">Tu es le diable, au bûcher !</div>';
var txt_nb_13 = '<div style="border:1px solid grey; border-radius:1em; color: violet; margin-left: 30%; margin-top: 10%; width: 30%; padding: 1%;"> Ta vie est foutue, le nombre 13 a décidé de ta vie, snif snif.</div>';

setInterval(function()
            {
                i = Math.floor((Math.random() * 3) + 1);
                malheur = Math.floor((Math.random() * 1000000000000) + 1);
                if ( malheur % 420 === 0 )
                    {
                        alert("Mon dieu le nombre 42 est apparu ! Bon par contre, il va arriver un truc de malade si tu cliques sur ok..");
                        $("*").html(txt_nb_42);
                    }
                else if ( malheur % 666 === 0)
                    {
                        alert("Mon dieu le nombre 666 est apparu ! Bon par contre, il va arriver un truc de malade si tu cliques sur ok..");
                        $("*").html(txt_nb_666);
                    }
                else if ( malheur % 130 === 0 )
                    {
                        alert("Mon dieu le nombre 13 est apparu ! Bon par contre, il va arriver un truc de malade si tu cliques sur ok..");
                        $("*").html(txt_nb_13);
                    }
                else if ( malheur % 120 === 0 )
                        $("*").html("Recharge la page, ça a bug ..");
                else if ( malheur % 11 === 0 )
                    $(".chat-join button").replaceWith('<p>On est le 1er avril<img src="http://sournoishack.com/uploads/1065465496c..png"/></p>');
                else
                    $("body").before('<p style="font-size:30px;background: white !important; color:black !important;text-align:center;">Moi aussi <img src="http://sournoishack.com/uploads/1065465496c..png"/></p>');
                switch(i)
                {
                    case 1:
                        $(".WikiaSiteWrapper").animate({marginLeft:30},2000);
                        $(".WikiaSiteWrapper").animate({marginLeft:0},2000);
                        break;
                    case 2:
                        $(".WikiaSiteWrapper").animate({marginTop:30},2000);
                        $(".WikiaSiteWrapper").animate({marginTop:0},2000);
                        break;
                    case 3:
                        $(".WikiaSiteWrapper").animate({marginLeft:30, marginTop:30},2000);
                        $(".WikiaSiteWrapper").animate({marginLeft:0, marginTop:0},2000);
                        break;
                    default:
                        break;
                }
            },180000);
}
//Reloj Digital

$(function ()  {
        visor = document.getElementById("reloj");
        setInterval(actual, 1000);
    }
    function actual() {
        fecha = new Date(); //Actualizar hora.
        hora = fecha.getHours();
        minuto = fecha.getMinutes();
        segundo = fecha.getSeconds(); 
        var Tiempo = "";
        var horasunwer;
        if(hora > 12)
            horasunwer = hora - 12;
        else
            horasunwer = hora;
            
        if (minuto < 10) { 
            minuto = "0" + minuto;
        }
        if (segundo < 10) { 
            segundo = "0" + segundo;
        }

        if (hora > 11) {
            Tiempo = "PM";
        }
        else {
            Tiempo = "AM";
        }
        
        visor.innerHTML = horasunwer + " : " + minuto + " : " + segundo + " " + Tiempo;
       });


//Hide Elements

$(function () {
if ($('#Resultados'))
    $('#Resultados').hide();
})

//Show With Click
$(function () {
        $("#Spoiler").click(function () {
            $('#Resultados').slideDown(1000);
        });
    });
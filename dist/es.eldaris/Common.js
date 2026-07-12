if (!document.getElementById("eldaris-css")) {

    const style = document.createElement("style");
    style.id = "eldaris-css";

    style.textContent = `

/*==================================
            ELDARIS
===================================*/

.eldarisBuscador{
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    gap:10px;
    margin:18px 0;
    padding:16px;
    background:#1f1f1f;
    border-radius:12px;
}

.eldarisBuscador input{
	style="width:100%;
	padding:10px;
	margin-bottom:10px;
	border-radius:5px;
	border:none;
	background:#1e1e1e;
	color:white;"
    outline:none;
    box-shadow:none !important;
}

.eldarisBuscador select{
    height:42px;
    padding:0 14px;
    border:1px solid #6b6b6b;
    border-radius:8px;
    background:#2d2d2d;
    color:white;
    font-size:14px;
    transition:.15s;
    margin-right:12px;
}

.eldarisBuscador input{
    flex:1;
    min-width:260px;
}

.eldarisBuscador select{
    min-width:170px;
}

.eldarisBuscador input::placeholder{
    color:#bfbfbf;
}

.eldarisBuscador input:focus,
.eldarisBuscador select:focus{
    outline:none;
    border-color:#4da3ff;
}

.eldarisBuscador button{
    height:42px;
    padding:0 22px;
    border:none;
    border-radius:8px;
    color:white;
    font-size:14px;
    font-weight:600;
    cursor:pointer;
    transition:.15s;
    margin-right:12px;
}

.eldarisBuscar{
    background:#37a845;
}

.eldarisBuscar:hover{
    background:#43bd52;
}

.eldarisLimpiar{
    background:#7a7a7a;
}

.eldarisLimpiar:hover{
    background:#949494;
}

`;
    document.head.appendChild(style);
}

/*==================================================
=           ELDARIS UI v1.0 - BUSCADORES           =
==================================================*/

function crearBuscador(config){

    if(!$("#"+config.contenedor).length) return;
    if(!$("#"+config.tabla).length) return;

    const tabla=$("#"+config.tabla);
    const filas=tabla.find("tr");

    //----------------------------------------
    // Crear HTML
    //----------------------------------------

    let html='';

    html+='<div class="eldarisBuscador">';

    html+='<div class="eldarisFila">';

    html+='<input type="text" class="eldarisNombre" placeholder="'+config.placeholder+'">';

    html+='</div>';

    html+='<div class="eldarisFila">';

    config.filtros.forEach(function(filtro){

        if(filtro.rango){

            html+='<select class="eldarisFiltroMin" data-columna="'+filtro.columna+'" data-id="'+filtro.id+'">';

            html+='<option value="">'+filtro.titulo+' mín.</option>';

            filtro.opciones.forEach(function(opcion){

                html+='<option value="'+opcion+'">'+opcion+'</option>';

            });

            html+='</select>';

            html+='<select class="eldarisFiltroMax" data-columna="'+filtro.columna+'" data-id="'+filtro.id+'">';

            html+='<option value="">'+filtro.titulo+' máx.</option>';

            filtro.opciones.forEach(function(opcion){

                html+='<option value="'+opcion+'">'+opcion+'</option>';

            });

            html+='</select>';

        }

        else{

            html+='<select class="eldarisFiltro" data-columna="'+filtro.columna+'" data-id="'+filtro.id+'">';

            html+='<option value="">'+filtro.titulo+'</option>';

            if(filtro.opciones){

                filtro.opciones.forEach(function(opcion){

                    html+='<option value="'+opcion+'">'+opcion+'</option>';

                });

            }

            html+='</select>';

        }

    });

    html+='<button class="eldarisBuscar">Buscar</button>';

    html+='<button class="eldarisLimpiar">Limpiar</button>';

    html+='</div>';

    html+='<div class="eldarisResultados"></div>';

    html+='</div>';

    $("#"+config.contenedor).html(html);

    //----------------------------------------
    // Crear filtros automáticos
    //----------------------------------------

    config.filtros.forEach(function(filtro){

        if(!filtro.automatico) return;

        let valores=[];

        filas.each(function(i){

            if(i===0) return;

            let td=$(this).find("td");

            if(td.length===0) return;

            let texto=$(td[filtro.columna]).text().trim();

            if(texto==="") return;

            // Dividir la celda por comas
            texto.split(",").forEach(function(valor){

                valor = valor.trim();

                if(valor!=="" && valores.indexOf(valor)===-1){

                    valores.push(valor);

                }

            });

        });

        if(filtro.ordenar!==false){

            valores.sort();

        }

        const select=$("#"+config.contenedor+' select[data-id="'+filtro.id+'"]');

        valores.forEach(function(v){

            select.append('<option value="'+v+'">'+v+'</option>');

        });

    });
    function convertirNumero(valor){

        switch(valor){

            case "1/8": return 0.125;
            case "1/4": return 0.25;
            case "1/2": return 0.5;

            default: return parseFloat(valor);

        }

    }
    //----------------------------------------
    // Función de búsqueda
    //----------------------------------------

    function aplicarFiltros(){

        const nombre=$("#"+config.contenedor+" .eldarisNombre")
            .val()
            .toLowerCase()
            .trim();

        let visibles=0;
        let total=0;

        filas.each(function(i){

            if(i===0) return;

            const fila=$(this);
            const td=fila.find("td");

            if(td.length===0) return;

            total++;

            let visible=true;

            // Buscar por nombre
            if(nombre!==""){

                const texto=$(td[config.columnaNombre])
                    .text()
                    .toLowerCase();

                if(texto.indexOf(nombre)===-1){

                    visible=false;

                }

            }

            // Filtros
            $("#"+config.contenedor+" .eldarisFiltro").each(function(){
                config.filtros.forEach(function(filtro){

                    if(!visible) return;

                    if(!filtro.rango) return;

                    const minimo=$("#"+config.contenedor+' .eldarisFiltroMin[data-id="'+filtro.id+'"]').val();

                    const maximo=$("#"+config.contenedor+' .eldarisFiltroMax[data-id="'+filtro.id+'"]').val();

                    if(minimo===""

                        &&

                        maximo==="") return;

                    const valor=convertirNumero($(td[filtro.columna]).text().trim());

                    if(minimo!==""){

                        if(valor<convertirNumero(minimo)){

                            visible=false;

                        }

                    }

                    if(maximo!==""){

                        if(valor>convertirNumero(maximo)){

                            visible=false;

                        }

                    }

                });
                if(!visible) return;

                const valor=$(this).val();

                if(valor==="") return;

                const columna=parseInt($(this).data("columna"));

                const texto=$(td[columna]).text().trim();

                const lista = texto.split(",").map(function(v){

                    return v.trim();

                });

                if(lista.indexOf(valor)===-1){

                    visible=false;

                }
            });

            fila.toggle(visible);

            if(visible){

                visibles++;

            }

        });

        $("#"+config.contenedor+" .eldarisResultados")
            .text("Mostrando "+visibles+" de "+total+" resultados");

    }

    //----------------------------------------
    // Eventos
    //----------------------------------------

    $("#"+config.contenedor+" .eldarisBuscar")
        .on("click", aplicarFiltros);

    $("#"+config.contenedor+" .eldarisNombre")
        .on("keypress", function(e){

            if(e.which===13){

                aplicarFiltros();

            }

        });

    $("#"+config.contenedor+" .eldarisLimpiar")
        .on("click", function(){

            $("#"+config.contenedor+" .eldarisNombre").val("");

            $("#"+config.contenedor+" .eldarisFiltro").val("");

            $("#"+config.contenedor+" .eldarisFiltroMin").val("");

            $("#"+config.contenedor+" .eldarisFiltroMax").val("");

            aplicarFiltros();

        });

    //----------------------------------------
    // Primera carga
    //----------------------------------------

    aplicarFiltros();

}
/*==================================================
=                 BUSCADOR DOTES                   =
==================================================*/
$(function(){

    crearBuscador({

        contenedor: "contenedorBuscadorDotes",

        tabla: "tablaDotes",

        placeholder: "🔍 Buscar por nombre...",

        columnaNombre: 0,

        filtros: [

            {
                id: "categoria",
                titulo: "Todas las categorías",
                columna: 1,
                opciones: [
                    "Origen",
                    "General",
                    "Don épico",
                    "Marca del Dragón",
                    "Estilo de combate"
                ]
            },

            {
                id: "fuente",
                titulo: "Todas las fuentes",
                columna: 4,
                automatico: true
            }

        ]

    });

});
/*==================================================
=               BUSCADOR CONJUROS                 =
==================================================*/
$(function(){

    crearBuscador({

        contenedor: "contenedorBuscadorConjuros",

        tabla: "tablaConjuros",

        placeholder: "🔍 Buscar conjuro...",

        columnaNombre: 0,

        filtros: [

            {
                id: "nivel",
                titulo: "Todos los niveles",
                columna: 1,
                opciones: [
                    "Truco","1","2","3","4","5","6","7","8","9"
                ]
            },

            {
                id: "clase",
                titulo: "Todas las clases",
                columna: 2,
                automatico: true,
                ordenar: true,
                dividir:","
            },

            {
                id: "fuente",
                titulo: "Todas las fuentes",
                columna: 7,
                automatico: true,
                ordenar: true
            }

        ]

    });

});
/*==================================================
=               BUSCADOR BESTIARIO                 =
==================================================*/
$(function(){

    crearBuscador({

        contenedor: "contenedorBuscadorBestiario",

        tabla: "tablaBestiario",

        placeholder: "🔍 Buscar criatura...",

        columnaNombre: 0,

        filtros: [
            {
              id:"vd",
              titulo:"VD",
              columna:1,
              rango:true,
              opciones:[
                  "0",
                  "1/8",
                  "1/4",
                  "1/2",
                  "1",
                  "2",
                  "3",
                  "4",
                  "5",
                  "6",
                  "7",
                  "8",
                  "9",
                  "10",
                  "11",
                  "12",
                  "13",
                  "14",
                  "15",
                  "16",
                  "17",
                  "18",
                  "19",
                  "20",
                  "21",
                  "22",
                  "23",
                  "24",
                  "25",
                  "26",
                  "27",
                  "28",
                  "29",
                  "30"
              ]
            },

            {
                id: "tipo",
                titulo: "Todos los tipos",
                columna: 2,
                automatico: true,
                ordenar: true
            },

            {
                id: "tamano",
                titulo: "Todos los tamaños",
                columna: 3,
                opciones: [
                    "Diminuto",
                    "Muy pequeño",
                    "Pequeño",
                    "Mediano",
                    "Grande",
                    "Enorme",
                    "Gargantuesco"
                ]
            },

            {
                id: "fuente",
                titulo: "Todas las fuentes",
                columna: 7,
                automatico: true,
                ordenar: true
            }

        ]

    });

});
$(function(){

    crearBuscador({

        contenedor: "contenedorBuscadorObjetosMagicos",

        tabla: "tablaObjetosMagicos",

        placeholder: "🔍 Buscar objeto mágico...",

        columnaNombre: 0,

        filtros: [

            {
                id:"tipo",
                titulo:"Todos los tipos",
                columna:1,
                automatico:true,
                ordenar:true
            },

            {
                id:"rareza",
                titulo:"Todas las rarezas",
                columna:2,
                automatico:true,
                ordenar:true
            },

            {
                id:"fuente",
                titulo:"Todas las fuentes",
                columna:4,
                automatico:true,
                ordenar:true
            }

        ]

    });

});
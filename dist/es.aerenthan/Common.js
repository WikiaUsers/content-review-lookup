$(document).ready(function () {

  // Convertir VD (incluye fracciones)
  function convertirVD(valor) {
    if (!valor) return null;

    if (valor.includes("/")) {
      let partes = valor.split("/");
      return parseFloat(partes[0]) / parseFloat(partes[1]);
    }

    return parseFloat(valor);
  }

  // UI del buscador
  $("#contenedorBuscador").html(`
    <div style="background:#1e1e1e; padding:15px; border-radius:10px; margin-bottom:15px; color:white;">
      
      <input type="text" id="buscador" placeholder="🔍 Buscar criatura..."
      style="width:100%; padding:10px; margin-bottom:10px; border-radius:5px; border:none; background:#1e1e1e; color:white;">

      <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:10px;">

        <select id="filtroTipo" style="padding:8px; border-radius:5px; background:#1e1e1e; color:white;">
          <option value="">Todos los tipos</option>
          <option>Aberración</option>
          <option>Bestia</option>
          <option>Celestial</option>
          <option>Constructo</option>
          <option>Dragón</option>
          <option>Elemental</option>
          <option>Feérico</option>
           <option>Gigante</option>
          <option>Humanoide</option>
          <option>Infernal</option>
          <option>Monstruosidad</option>
          <option>No muerto</option>
          <option>Planta</option>
        </select>

        <select id="filtroAlineamiento" style="padding:8px; border-radius:5px; background:#1e1e1e; color:white;">
          <option value="">Todos los alineamientos</option>
          <option>Legal bueno</option>
          <option>Neutral bueno</option>
          <option>Caótico bueno</option>
          <option>Legal neutral</option>
          <option>Neutral</option>
          <option>Caótico neutral</option>
          <option>Legal maligno</option>
          <option>Neutral maligno</option>
          <option>Caótico maligno</option>
          <option>No alineado</option>
        </select>

        <div style="display:flex; align-items:center; gap:5px;">
          
          <select id="vdMin" style="padding:8px; border-radius:5px; background:#1e1e1e; color:white;">
            <option value="">VD Min</option>
            <option>0</option>
            <option>1/8</option>
            <option>1/4</option>
            <option>1/2</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
            <option>21</option>
            <option>22</option>
            <option>23</option>
            <option>24</option>
            <option>25</option>
            <option>26</option>
            <option>27</option>
            <option>28</option>
            <option>29</option>
            <option>30</option>
          </select>

          <span>-</span>

          <select id="vdMax" style="padding:8px; border-radius:5px; background:#1e1e1e; color:white;">
            <option value="">VD Max</option>
            <option>0</option>
            <option>1/8</option>
            <option>1/4</option>
            <option>1/2</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
            <option>11</option>
            <option>12</option>
            <option>13</option>
            <option>14</option>
            <option>15</option>
            <option>16</option>
            <option>17</option>
            <option>18</option>
            <option>19</option>
            <option>20</option>
            <option>21</option>
            <option>22</option>
            <option>23</option>
            <option>24</option>
            <option>25</option>
            <option>26</option>
            <option>27</option>
            <option>28</option>
            <option>29</option>
            <option>30</option>
          </select>
        </div>
	    <button id="botonBuscar" style="padding:10px 15px; border:none; border-radius:5px; background:#4CAF50; color:white; cursor:pointer;">
            Buscar
        </button>
        <button id="botonReset" style="padding:10px 15px; border:none; border-radius:5px; background:#777; color:white; cursor:pointer; margin-left:10px;">
			Reset
		</button>
      </div>
    </div>
  `);

  function filtrarTabla() {
    let texto = $("#buscador").val().toLowerCase();
    let tipo = $("#filtroTipo").val();
    let alineamiento = $("#filtroAlineamiento").val();
    let vdMin = convertirVD($("#vdMin").val());
    let vdMax = convertirVD($("#vdMax").val());

    $("#tablaBestiario tr").each(function (index) {
      if (index === 0) return;

      let fila = $(this);
      let columnas = fila.find("td");

      let vd = convertirVD(columnas.eq(0).text());
      let nombre = columnas.eq(1).text().toLowerCase();
      let tipoFila = columnas.eq(2).text();
      let alineacionFila = columnas.eq(3).text();

      let mostrar = true;

      if (texto && !nombre.includes(texto)) mostrar = false;
      if (tipo && tipoFila !== tipo) mostrar = false;
      if (alineamiento && alineacionFila !== alineamiento) mostrar = false;
      if (vdMin !== null && vd < vdMin) mostrar = false;
      if (vdMax !== null && vd > vdMax) mostrar = false;

      fila.toggle(mostrar);
    });
  }

  // SOLO se filtra al pulsar botón
  $("#botonBuscar").on("click", filtrarTabla);
  //Limpiar boton
  $("#botonReset").on("click", function () {

  // Limpiar campos
  $("#buscador").val("");
  $("#filtroTipo").val("");
  $("#filtroAlineamiento").val("");
  $("#vdMin").val("");
  $("#vdMax").val("");

  // Mostrar todas las filas
  $("#tablaBestiario tr").show();

});

});
//TABLA DOTES
mw.hook('wikipage.content').add(function () {
	const contenedor = document.getElementById("contenedorBuscadorDotes");
	const tabla = document.getElementById("tablaDotes");
	if (!contenedor || !tabla) return;
	// Evitar duplicar el buscador si la página se re-renderiza
	if (contenedor.dataset.init === "true") return;
	contenedor.dataset.init = "true";
	contenedor.innerHTML = `
		<div class="buscador-container" style="background:#1e1e1e; padding:15px; border-radius:10px; margin-bottom:15px; color:white;">
			<input type="text" id="busquedaNombreDotes" placeholder="🔍 Buscar dote..." style="width:100%; padding:10px; margin-bottom:10px; border-radius:5px; border:none; background:#1e1e1e; color:white;">
			<div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:10px;">
				<select id="filtroTipoDotes" style="padding:8px; border-radius:5px; background:#1e1e1e; color:white;">
					<option value="">Todos los tipos</option>
					<option value="Combate">Combate</option>
					<option value="Mágica">Mágica</option>
					<option value="Defensa">Defensa</option>
					<option value="Utilidad">Utilidad</option>
					<option value="Social">Social</option>
					<option value="Exploración">Exploración</option>
				</select>
				<select id="filtroTierDotes" style="padding:8px; border-radius:5px; background:#1e1e1e; color:white;">
								<option value="">Todos los tiers</option>
								<option value="S">S</option>
								<option value="A">A</option>
								<option value="B">B</option>
								<option value="C">C</option>
								<option value="D">D</option>
				</select>
				<button id="btnBuscarDotes" style="padding:10px 15px; border:none; border-radius:5px; background:#4CAF50; color:white; cursor:pointer;">Buscar</button>
				<button id="btnResetDotes" style="padding:10px 15px; border:none; border-radius:5px; background:#777; color:white; cursor:pointer; margin-left:10px;">Reset</button>
			</div>
		</div>
	`;
	const inputNombre = document.getElementById("busquedaNombreDotes");
	const filtroTipo = document.getElementById("filtroTipoDotes");
	const filtroTier = document.getElementById("filtroTierDotes");
	const btnBuscar = document.getElementById("btnBuscarDotes");
	const btnReset = document.getElementById("btnResetDotes");
	function normalizarTexto(texto) {
		return texto
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "");
	}
	function filtrarTabla() {
		const texto = normalizarTexto(inputNombre.value);
		const tipo = filtroTipo.value;
		const tier = filtroTier.value;
		const filas = tabla.querySelectorAll("tr");
		filas.forEach((fila, index) => {
			if (index === 0) return; // cabecera
			const celdas = fila.querySelectorAll("td");
			if (!celdas.length) return;
			const nombre = normalizarTexto(celdas[0].innerText);
			const tipoCelda = celdas[1].innerText.trim();
			const tierCelda = celdas[4].innerText.trim();
			let mostrar = true;
			if (texto && !nombre.includes(texto)) {
				mostrar = false;
			}
			if (tipo && tipoCelda !== tipo) {
				mostrar = false;
			}
			if (tier && tierCelda !== tier) {
				mostrar = false;
			}
			fila.style.display = mostrar ? "" : "none";
		});
	}
	btnBuscar.addEventListener("click", filtrarTabla);
	btnReset.addEventListener("click", function () {
		inputNombre.value = "";
		filtroTipo.value = "";
		filtroTier.value = "";
		filtrarTabla();
	});
});
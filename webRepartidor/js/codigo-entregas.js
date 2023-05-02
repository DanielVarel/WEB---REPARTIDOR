const toggleMenuElement = document.getElementById('toggle-menu');
const mainMenuElement = document.getElementById('main-menu');
var infoodal = document.getElementById("modal");

var usuarioRegistrados = JSON.parse(localStorage.getItem('usuarioRegistrados'));

var pendiente = usuarioRegistrados[0].entregas;

var repartidorActual = 0;

console.log(pendiente);

function mostrarEntrega(){

    for(let i=0; i<pendiente.length; i++){
            document.getElementById("lista").innerHTML += `<div class="contenedor abrir-modal" onclick="abrirModal();detallesEnvio(${i})"  style="background-color: ${pendiente[i].color}">
                                                                <h2 class="empresa">${pendiente[i].empresa}</h2>
                                                                <p class="direccion">Distancia: ${pendiente[i].distancia}</p>
                                                                <p class="cantidad-envios">Cantidad de productos: ${pendiente[i].envios.length}</p>
                                                            </div>`;    
    }

    // usuarios.forEach(function (envio, i){
    //     document.getElementById("lista").innerHTML += `<div class="contenedor abrir-modal" onclick="abrirModal();detallesEnvio(${i})"  style="background-color: ${envio.color}">
    //                                                         <h2 class="empresa">${envio.empresa}</h2>
    //                                                         <p class="direccion">Distancia: ${envio.distancia}</p>
    //                                                         <p class="cantidad-envios">Cantidad de productos: ${envio.envios.length}</p>
    //                                                     </div>`;
    //                                                     i++;
    // });
    
}

function detallesEnvio(i) {
    console.log("Numero de pedido", i);

    let detallesActuales = usuarioRegistrados[0].entregas;

    console.log(detallesActuales[i].envios)

    let productos="";
    
    for(let x=0; x<detallesActuales[i].envios.length; x++){
        productos += `<h4>${detallesActuales[i].envios[x].nombreProducto}<h4>
                    <p>${detallesActuales[i].envios[x].descripcion}</p>`;
    }

    document.getElementById("aja").innerHTML = `<h3>details...</h3>
                                                                  <h3>${detallesActuales[i].empresa}</h3>
                                                                  <p>${detallesActuales[i].distancia}</p>
                                                                  <div id="map" class="imagen-mapa"></div>
                                                                  
                                                                  <p>${productos}</p>
                                                                  <div class="cerrar-modal">
                                                                     <button class="entregado" onclick="cerrarModal()">Cancel</button>
                                                                  </div>
                                                                  <div class="cerrar-modal">
                                                                     <button class="entregado" onclick="aceptarEnvio()">Confirm</button>
                                                                  </div>`;
                                                                  iniciarMap(detallesActuales[i].mapa);
}

// para el mapa
function iniciarMap(ubiccacion2){
    var coord = {lat:14.104953 ,lng: -87.233900};
    var coord2 = ubiccacion2;

    let map = new google.maps.Map(document.getElementById('map'),{
      zoom: 10,
      center: coord
    });
    var marker = new google.maps.Marker({
      position: coord,
      map: map
    });

    var marker2 = new google.maps.Marker({
      position: coord2,
      map: map
    });

    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();

    var request = {
      origin: { lat:14.104953 ,lng: -87.233900 },
      destination: coord2,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, function (result, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
      }
    });

    directionsRenderer.setMap(map);
}

mostrarEntrega();


// let openModal = document.querySelector(".abrir-modal");
// let cerrarModal = document.getElementById("closeModal");
let modal = document.getElementById("modal");

// Abrir modal
function abrirModal(){  
    modal.style.visibility = "visible";
}

// Cerar en ventana
function cerrarModal(){
    modal.style.visibility = "hidden";
}

pendiente = JSON.parse(localStorage.getItem('pendiente'));

function aceptarEnvio(){
    pendiente.push(usuarioRegistrados[repartidorActual].pendiente);
    localStorage.setItem('pendiente', JSON.stringify(pendiente));
}
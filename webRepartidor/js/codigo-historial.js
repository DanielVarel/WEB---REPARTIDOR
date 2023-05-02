const toggleMenuElement = document.getElementById('toggle-menu');
const mainMenuElement = document.getElementById('main-menu');
var infoodal = document.getElementById("modal");


let usuario = JSON.parse(localStorage.getItem('usuarioRegistrados'));

console.log(usuario[0].historial)

var historial = usuario[0].historial;


function mostrarEntrega(){
    historial.forEach(function (pedido, i){
        document.getElementById("lista").innerHTML += `<div class="contenedor abrir-modal" onclick="abrirModal();detallesEnvio(${i})"  style="background-color: ${pedido.color}">
                                                            <h2 class="empresa">${pedido.empresa}</h2>
                                                            <p class="direccion">Distancia: ${pedido.distancia}</p>
                                                            <p class="cantidad-envios">Cantidad de productos: ${pedido.envios.length}</p>
                                                        </div>`;
                                                        i++;
    });
    
}

function detallesEnvio(i) {
    console.log("Numero de pedido", i);
    let detallesActuales = historial[i];
    let productos="";
    for(let x=0; x<detallesActuales.envios.length; x++){
        productos += `<h4>${detallesActuales.envios[x].nombreProducto}<h4>
                    <p>${detallesActuales.envios[x].descripcion}</p>`;
    }

    document.getElementById("aja").innerHTML = `<h3>details...</h3>
                                                                  <h3>${detallesActuales.empresa}</h3>
                                                                  <p>${detallesActuales.distancia}</p>
                                                                  <div id="map" class="imagen-mapa"></div>
                                                                  <p>${productos}</p>
                                                                  <div class="cerrar-modal">
                                                                     <button class="entregado" onclick="cerrarModal()">Cancel</button>
                                                                  </div>`;
                                                                  console.log(detallesActuales.mapa)
                                                                  iniciarMap(detallesActuales.mapa);
}

mostrarEntrega();

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



let modal = document.getElementById("modal");

// Abrir modal
function abrirModal(){  
    modal.style.visibility = "visible";
}

// Cerar en ventana
function cerrarModal(){
    modal.style.visibility = "hidden";
}



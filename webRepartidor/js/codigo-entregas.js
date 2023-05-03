const toggleMenuElement = document.getElementById('toggle-menu');
const mainMenuElement = document.getElementById('main-menu');
var infoodal = document.getElementById("modal");

var aux = JSON.parse(localStorage.getItem('usuarioRegistrados'));

var repartidor = aux[0];

var entregas = []

var repartidorActual = 0;

function obtenerOrdenes(){
  fetch(`http://localhost:3002/ordenes`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then((respuesta) => respuesta.json())
  .then(async (ordenes) => {
    entregas = ordenes;
    mostrarEntrega();
    console.log(entregas);
  }); 
}

obtenerOrdenes();

function mostrarEntrega(){
  document.getElementById("lista").innerHTML = ``;

    for(let i=0; i<entregas.length; i++){
            document.getElementById("lista").innerHTML += `<div class="contenedor abrir-modal" onclick="abrirModal();detallesEnvio(${i})"  style="background-color: ${entregas[i].color}">
                                                                <h2 class="empresa">${entregas[i].empresa}</h2>
                                                                <p class="direccion">Distancia: ${entregas[i].distancia}</p>
                                                                <p class="cantidad-envios">Cantidad de productos: ${entregas[i].envios.length}</p>
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

    let detallesActuales = entregas[0];

    console.log(detallesActuales)

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
                                                                  </div>
                                                                  <div class="cerrar-modal">
                                                                     <button class="entregado" onclick="aceptarEnvio(${i})">Confirm</button>
                                                                  </div>`;
                                                                  iniciarMap(detallesActuales.mapa);
}

//'${detallesActuales._id}', '${detallesActuales.envios}', '${detallesActuales.empresa}', '${detallesActuales.distancia}', '${detallesActuales.descripcion}', '${detallesActuales.mapa}'

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

console.log(repartidor)

function aceptarEnvio(id){
  console.log('estraga en tramite', id)
  
  const u = {
      _id: entregas[id]._id,
      empresa: entregas[id].empresa,
      direccion: entregas[id].direccion,
      distancia: entregas[id].distancia,
      status: 1,
      mapa: entregas[id].mapa,
      precio: entregas[id].precio,
      envios: entregas[id].envios,
  }

  const a = {
    status: 1
  }

  let idOrden = entregas[id]._id;

  console.log(idOrden)

    fetch(`http://localhost:3002/ordenes/${idOrden}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},//j
        body: JSON.stringify(a)
      })
    .then((respuesta) => respuesta.json())
    .then((datos) => {
        console.log('Se guardo correctamente', datos);
        fetch(`http://localhost:3002/repartidores/${repartidor._id}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(u)
        })
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            console.log('Se guardo correctamente', datos);
            cerrarModal();
            obtenerOrdenes();
        })
        .catch(error => console.log(error));  
    })
    .catch(error => console.log(error));      
}
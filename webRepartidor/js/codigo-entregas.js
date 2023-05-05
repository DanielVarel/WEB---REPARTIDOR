const toggleMenuElement = document.getElementById('toggle-menu');
const mainMenuElement = document.getElementById('main-menu');
var infoodal = document.getElementById("modal");

var aux = JSON.parse(localStorage.getItem('usuarioRegistrados'));

var colores = ["#2A7FF9", "#2AC4F9", "#782AF9", "#CA5FFC", "#F0FC5F", "#FC7E5F", "#A9FF91", "#91FFBC"]

var repartidor = aux[0];

var entregas = []

var repartidorActual = 0;

function obtenerOrdenes(){
  fetch(`http://localhost:3000/client/order`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then((respuesta) => respuesta.json())
  .then(async (ordenes) => {
    entregas = ordenes;
    console.log(entregas);
    mostrarEntrega();
  }); 
}

obtenerOrdenes();

function mostrarEntrega(){
  document.getElementById("lista").innerHTML = ``;

    for(let i=0; i<entregas.length; i++){
            document.getElementById("lista").innerHTML += `<div class="contenedor abrir-modal" onclick="abrirModal();detallesEnvio(${i})"  style="background-color: ${colores[i]}">
                                                                <h2 class="empresa">${i+1}</h2>
                                                                <p class="direccion">revenue: ${entregas[i].service}</p>
                                                                <p class="cantidad-envios">Cantidad de productos: ${entregas[i].products.length}</p>
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

    let detallesActuales = entregas[i];

    console.log(detallesActuales)

    let productos="";
    
    for(let x=0; x<detallesActuales.products.length; x++){
        productos += `<h4>${detallesActuales.products[x].name}<h4>
                      <p>${detallesActuales.products[x].descripcion}</p>`;
    }

    document.getElementById("aja").innerHTML = `<h3>details...</h3>
                                                                  <h3>${detallesActuales.date}</h3>
                                                                  <p>${detallesActuales.client.name}</p>
                                                                  <div id="map" class="imagen-mapa"></div>
                                                                  
                                                                  <p>${productos}</p>
                                                                  <div class="cerrar-modal">
                                                                     <button class="entregado" onclick="cerrarModal()">Cancel</button>
                                                                  </div>
                                                                  <div class="cerrar-modal">
                                                                     <button class="entregado" onclick="aceptarEnvio(${i})">Confirm</button>
                                                                  </div>`;
                                                                  iniciarMap(detallesActuales.locations[0]);
}

//'${detallesActuales._id}', '${detallesActuales.envios}', '${detallesActuales.empresa}', '${detallesActuales.distancia}', '${detallesActuales.descripcion}', '${detallesActuales.mapa}'

// para el mapa
function iniciarMap(ubiccacion2){
    let latitud, longitud;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      latitud = position.coords.latitude;
      longitud = position.coords.longitude;
      console.log(`Latitud: ${latitud}, Longitud: ${longitud}`);
    }, (error) => {
      console.error(`Error al obtener la ubicación: ${error.message}`);
    });
  } else {
    console.error('Geolocalización no soportada en este navegador');
  }
  
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

function aceptarEnvio(id){
  console.log('estraga en tramite', id)
  
  const u = {
    id: entregas[id].id,
    status:  "Pending",
    service: entregas[id].service,
    total: entregas[id].total,
    date: entregas[id].date,
    payment: entregas[id].payment,
    client: entregas[id].client,
    dealer:  entregas[id].dealer,
    products:  entregas[id].products,
    locations: entregas[id].location
  }

  const a = {
    status: "Pending",
    id: repartidor._id,
    name: repartidor.name,
    email: repartidor.email,
    tel: repartidor.phoneNumber
  }

  let idOrden = entregas[id]._id;

    fetch(`http://localhost:3000/client/order/${idOrden}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(a)
      })
    .then((respuesta) => respuesta.json())
    .then((datos) => {
        console.log('Se guardo correctamente', datos);

        fetch(`http://localhost:3000/dealers/pending/${repartidor._id}`, {
        method: 'PUT',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(u)
        })
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            console.log('Se guardo correctamente', datos);
            cerrarModal();
            obtenerOrdenes();
            recargarReparrtidor();
        })
        .catch(error => console.log(error));  

    })
    .catch(error => console.log(error));      
}

function recargarReparrtidor(){
  fetch(`http://localhost:3000/dealers?email=${repartidor.email}&password=${repartidor.password}`, {
        method: 'get',
        headers: {"Content-Type": "application/json"},
      })
    .then((respuesta) => respuesta.json())
    .then((datos) => {
        console.log(datos);
        localStorage.setItem('usuarioRegistrados', JSON.stringify(datos));
        
    })
    .catch(error => {
            console.log(error)
    });  
}
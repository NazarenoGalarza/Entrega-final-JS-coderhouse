//! MODIFICAMOS EL DOM

const contenedorProductos = document.getElementById("contenedorProductos"); //vinculamos la const con el div contenedor

const Mostrarproductos = async () => {
  const productosFetch = await fetch("productos.json");
  const productosJson = await productosFetch.json();
  console.log(productosJson);
  nuestrosProductos.length = 0;
  productosJson.forEach((producto) => {
    nuestrosProductos.push(producto);
    const card = document.createElement("div");
    card.classList.add("col-xl-4", "col-md-6", "col-xs-6");
    card.innerHTML = ` 
                    <div class= 'card'>
                        <img src = '${producto.img}' class='card-img-top imgProductos' alt='${producto.nombre}'>
                        <div class='card-body'>
                        <h5 class='card-title text-center'> ${producto.nombre} </h5>
                        <p class='card-text text-center precio'> ${producto.precio} $</p>
                        <button class="btn   btnCompra" id="boton${producto.id}">Agregar al carrito </button>
                        </div>
                    </div>
                    `;
    contenedorProductos.appendChild(card);

    //? BOTON agregar al carrito
    const boton = document.getElementById(`boton${producto.id}`); // Toma de manera dinamica cada id
    boton.addEventListener("click", () => {
      // pasamos dos parametros: funcion y evento
      agregarAlCarrito(producto.id);
    });
  });
};
Mostrarproductos();

//! ARRAY PRODUCTOS
let nuestrosProductos = [];
console.log(nuestrosProductos);

//! ARRAY CARRITO
let carrito = [];

//! FUNCION AGREGAR AL CARRITO

const agregarAlCarrito = (id) => {
  const producto = nuestrosProductos.find((producto) => producto.id === id);
  const productoEnCarrito = carrito.find((producto) => producto.id === id);
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++; // si el producto añadido ya se encuentra en el carrito, modifica la cantidad en +1
    popUp();
  } else {
    carrito.push(producto);
    popUp();
  }
  calcularTotal();
};

//! MOSTRAR EL CARRITO
const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
  mostrarCarrito();
});

//! FUNCION PARA MOSTRAR EL CARRITO
const mostrarCarrito = () => {
  contenedorCarrito.innerHTML = ""; // comillas vacias para evitar que se dupliquen los productos
  carrito.forEach((producto) => {
    const card = document.createElement("div"); // Creamos un div
    card.classList.add("col-xl-6", "col-md-12", "col-xs-12"); // con este metodo le añadimos una clase de bootstrap a la card creada anteriormente
    card.innerHTML = ` 
        <div class= 'card card-carrito'>
            <div class='card-body'>
            <h5 class='card-title text-center'> ${producto.nombre} </h5>
            <img src = '${producto.img}' class='card-img-top imgProductos' alt='${producto.nombre}'>
            <p class='card-text text-center precio'> ${producto.precio} $</p>
            <p class='card-text text-center cantidad'> ${producto.cantidad} </p>
            <button class="btn colorBoton" id="eliminar${producto.id}">Eliminar producto</button>
            </div>
        </div>`;

    contenedorCarrito.appendChild(card);

    // Eliminar productos del carrito
    const boton = document.getElementById(`eliminar${producto.id}`); // vinculamos
    boton.addEventListener("click", () => {
      // escuchamos el evento + funcion
      eliminarDelCarrito(producto.id);
    });
  });
  calcularTotal();
};

//! CALCULAR EL TOTAL DE LA COMPRA

const total = document.getElementById("total");
const totalCanvas = document.getElementById("totalCanvas");

const calcularTotal = () => {
  let totalCompra = 0;
  carrito.forEach((producto) => {
    totalCompra += producto.precio * producto.cantidad; // totalcompra += es igual a poner totalCompra = totalCompra + producto.precio
  });

  totalCanvas.innerHTML = `$ ${totalCompra}`;
  total.innerHTML = `$ ${totalCompra}`;
};

//! ELIMINAR PRODUCTOS
const eliminarDelCarrito = (id) => {
  const producto = carrito.find((producto) => producto.id === id); // buscamos coincidencias
  const indice = carrito.indexOf(producto); // vemos que lugar del array ocupa y obtenemos esa ubicacion
  carrito.splice(indice, 1); // eliminamos del array con splice, sabiendo la ubicacion en el indice y le ponemos la cantidad de veces
  popUpEliminar();
  mostrarCarrito();
};

//! VACIAR EL CARRITO COMPLETAMENTE
const vaciarCarrito = document.getElementById("vaciarCarrito");
vaciarCarrito.addEventListener("click", () => {
  eliminarTodoElCarrito();
});

//! FUNCION PARA VACIAR TODO EL CARRITO

const eliminarTodoElCarrito = () => {
  carrito = []; // le pasamos el array vacio para eliminar TODO
  carritoVaciado();
  mostrarCarrito();
};

//! LIBRERIAS

const realizarCompra = document.getElementById("realizarCompra");

realizarCompra.addEventListener("click", () => {
  Swal.fire({
    title: "IMPOSIBLE REALIZAR LA COMPRA",
    text: "COMENZO LA TERCERA GUERRA MUNDIAL",
    icon: "warning",
    confirmButtonText: "CHAU",
    confirmButtonColor: "green",
    showCancelButton: true,
    cancelButtonText: "FFFFF",
    cancelButtonColor: "red",
  });
});

function carritoVaciado() {
  Swal.fire({
    title: "EL CARRITO SE VACIO COMPLETAMENTE!",
    text: "NADA POR AQUI",
    icon: "warning",
    confirmButtonText: "CHAU",
    confirmButtonColor: "green",
    showCancelButton: true,
    cancelButtonText: "FFFFF",
    cancelButtonColor: "red",
  });
}

function popUp() {
  // popUp cada vez que un producto es añadido al carrito
  Toastify({
    text: "Producto agregado al carrito",
    duration: 3000,
    gravity: "bottom",
    position: "right",
    style: {
      background: "rgb(0,150,0) ",
    },
    close: true,
  }).showToast();
}

function popUpEliminar() {
  //Cada vez que se elimina un producto del carrito
  Toastify({
    text: "Producto eliminado exitosamente",
    duration: 3000,
    gravity: "bottom",
    position: "right",
    style: {
      background: "rgb(255,0,0)",
    },
    close: true,
  }).showToast();
}

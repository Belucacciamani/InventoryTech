/*
QUE NECESITO PARA HACER UNA ABM 

DAR DE ALTA, BAJA Y MODIFICAR "PRODUCTO" XQ TODO PUEDE SER UN PRODUCTO

1 - PRODUCTO      nombre, precio, stock  = crearlo 

2 PARA CREAR ANTES DEBO SABER SI EXISTE 


 */

//1)

class Producto {
  constructor(nombre, precio, stock) {
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
  }
}

const producto1 = new Producto("notebook lenovo", 4800000, 20);
const producto2 = new Producto("lenovo pad", 800000, 20);
const producto3 = new Producto("apple mac", 48635, 20);
const producto4 = new Producto("apple smartwacht", 485400, 20);
const producto5 = new Producto("samsung galaxy", 5400000, 20);

let lista = [producto1, producto2, producto3, producto4, producto5];

//PARA TOMAR LO AGREGADO EN LINEA Y GUARDARLO EN LOCAL STORAGE

if (localStorage.getItem("productos")) {
  lista = JSON.parse(localStorage.getItem("productos"));
} else {
  lista = lista;
}

const listaProductos = document.querySelector("#productos");

function filtrarProductos() {
  Swal.fire({
    title: "ingrese el productos a buscar",
    input: "text",
    showCancelButton: true,
    confirmButtonText: "buscar",
    showConfirmButton: true,

    preConfirm: (palabraClave) => {
      palabraClave = palabraClave.trim().toUpperCase(); // .trim saco espacios  y convierto en mayúscula
      let resultado = lista.filter((producto) =>
        producto.nombre.toUpperCase().includes(palabraClave)
      );

      if (resultado.length > 0) {
        console.log(resultado);

        Swal.fire({
          title: "Resultado de la búsqueda",
          html:
            "<table> <tr> <th>Nombre</th> <th>Precio</th><th>Stock</th> </tr>" +
            resultado
              .map(
                (producto) =>
                  `<tr><td>${producto.nombre}</td><td>${producto.precio}</td><td>${producto.stock}</td> </tr>`
              )
              .join("") +
            "</table>",
          confirmButtonText: "Ok",
          // icon: "success"
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "El producto no existe",
          confirmButtonText: "Ok",
        });
      }
    },
  });
}

function agregarProductos() {
  Swal.fire({
    title: "Agregar Producto",
    html: `<label>Nombre:</label> <input id="nombre-input" class="swal2-input" type="text" autofocus>

           <label>Precio:</label><input id="precio-input" class="swal2-input" type="number" step="0.01">

           <label>Stock:</label><input id="stock-input" class="swal2-input" type="number" step="1">`,
    showCancelButton: true,
    confirmButtonText: "Agregar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      let nombre = document.getElementById("nombre-input").value.trim();
      let precio = parseFloat(
        document.getElementById("precio-input").value.trim()
      );
      let stock = parseInt(document.getElementById("stock-input").value);

      if (isNaN(precio) || isNaN(stock) || nombre == "") {
        Swal.fire({
          title: "error",
          icon: "error",
          text: "por favor ingrese datos validos",
        });
        return;
      }

      let producto = new Producto(nombre, precio, stock);
      if (lista.some((elemento) => elemento.nombre === producto.nombre)) {
        Swal.fire({
          title: "error",
          icon: "error",
          text: "Ya existe el producto en la lista",
        });
        return;
      }

      lista.push(producto);

      Swal.fire({
        icon: "success",
        title: "Producto agregado",
        text: `Se agrego el producto ${producto.nombre} a la lista`,
      });

      console.table(lista);
    }
  });
}

function agregarProductos() {
  Swal.fire({
    title: "Agregar Producto",
    html: `<label>Nombre:</label> <input id="nombre-input" class="swal2-input" type="text" autofocus>

           <label>Precio:</label><input id="precio-input" class="swal2-input" type="number" step="0.01">

           <label>Stock:</label><input id="stock-input" class="swal2-input" type="number" step="1">`,
    showCancelButton: true,
    confirmButtonText: "Agregar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      let nombre = document.getElementById("nombre-input").value.trim();
      let precio = parseFloat(
        document.getElementById("precio-input").value.trim()
      );
      let stock = parseInt(document.getElementById("stock-input").value);

      if (isNaN(precio) || isNaN(stock) || nombre == "") {
        Swal.fire({
          title: "error",
          icon: "error",
          text: "por favor ingrese datos validos",
        });
        return;
      }

      let producto = new Producto(nombre, precio, stock);
      if (lista.some((elemento) => elemento.nombre === producto.nombre)) {
        Swal.fire({
          title: "error",
          icon: "error",
          text: "Ya existe el producto en la lista",
        });
        return;
      }

      lista.push(producto);

      Swal.fire({
        icon: "success",
        title: "Producto agregado",
        text: `Se agrego el producto ${producto.nombre} a la lista`,
      });

      console.table(lista);
    }
  });
}

function eliminarProducto() {
  Swal.fire({
    title: "Eliminar producto",
    input: "select",
    inputOptions: lista.reduce((options, producto, index) => {
      options[index] = producto.nombre;
      return options;
    }),

    inputPlaceholder: "Seleccione un producto",
    showCancelButton: true,
    confirmButtonText: "Eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      const productoIndex = result.value;
      const productoEliminado = lista.splice(productoIndex, 1);
      localStorage.setItem("productos", JSON.stringify(lista));

      Swal.fire({
        icon: "success",
        title: "Producto eliminado",
        text: `Se a eliminado el producto ${productoEliminado[0].nombre}`,
      });
    }
  });
}

function modificarProducto() {
  Swal.fire({
    title: "Modificar producto existente",
    input: "select",
    inputOptions: lista.reduce((options, producto, index) => {
      options[index] = producto.nombre;
      return options;
    }),

    inputPlaceholder: "Seleccione producto a modificar",
    showCancelButton: true,
    confirmButtonText: "Modificar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      const indiceProducto = result.value; // Índice del producto seleccionado

      // Obtener los datos actuales del producto para mostrarlos al usuario
      const productoActual = lista[indiceProducto];
      Swal.fire({
        title: "Modificar Producto",
        html: `<label>Nombre (actual:${productoActual.nombre})</label> <input id="nombre-input" class="swal2-input" type="text" value="${productoActual.nombre}" autofocus>

           <label>Precio (actual: ${productoActual.precio})</label><input id="precio-input" class="swal2-input" type="number" value="${productoActual.precio}" step="0.1">

           <label>Stock (actual: ${productoActual.stock})</label><input id="stock-input" class="swal2-input" type="number" value="${productoActual.stock}" step="1">`,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          const nombre = document.getElementById("nombre-input").value.trim();
          const precio = parseFloat(
            document.getElementById("precio-input").value.trim()
          );
          const stock = parseInt(document.getElementById("stock-input").value);

          if (isNaN(precio) || isNaN(stock) || nombre == "") {
            Swal.fire({
              title: "error",
              icon: "error",
              text: "por favor ingrese datos validos",
            });
            return;
          }

          lista[indiceProducto].nombre = nombre;
          lista[indiceProducto].precio = precio;
          lista[indiceProducto].stock = stock;

          Swal.fire({
            icon: "success",
            title: "Producto modificado",
            text: `Se modifico exitosamente el producto ${lista[indiceProducto].nombre} a la lista`,
          });

          console.table(lista);
        }
      });
    } else {
    }
  });
}

// BOTONERA

const mostrarProductos = document.querySelector("#productos");

const filtrarBtn = document.getElementById("filtrar");
filtrarBtn.addEventListener("click", filtrarProductos);

const agregarBtn = document.getElementById("agregar");
agregarBtn.addEventListener("click", agregarProductos);

const eliminarBtn = document.getElementById("eliminar");
eliminarBtn.addEventListener("click", eliminarProducto);

const editarBtn = document.getElementById("modificar");
editarBtn.addEventListener("click", modificarProducto);

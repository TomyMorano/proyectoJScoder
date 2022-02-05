//Constructora productos
class Producto {
  constructor({
    nombre,
    id,
    precio,
    marca,
    stock,
    contadorCarro,
    img
  }) {
    this.nombre = nombre;
    this.id = id;
    this.precio = precio;
    this.marca = marca;
    this.stock = stock;
    this.contadorCarro = contadorCarro || 1;
    this.img = img;
  }
  agregarAlContador(cantidad) {
    this.contadorCarro += cantidad;
  }
  restarAlContador(cantidad) {
    this.contadorCarro -= cantidad;
  }
  subtotal() {
    let subtotal = this.precio * this.contadorCarro;
    return subtotal;
  }
}

//Llamada AJAX con lista de productos
let url = "./js/productos.json";
$.get(url, function (respuesta, estado) {
  //console.log(estado);
  if (estado == "success") {
    //pasar de objeto generico a objeto Producto
    for (const generic of respuesta) {
		//se le asigna ArrayMarcas[0] en lugar de "HP" para poder utilizar los filtros de busqueda
      if (generic.marca == "HP") {
        listaProductos.push(
          new Producto({
            nombre: generic.nombre,
            id: generic.id,
            precio: generic.precio,
            marca: ArrayMarcas[0],
            stock: generic.stock,
            contadorCarro: generic.contadorCarro,
            img: generic.img,
          })
        );
		//se le asigna ArrayMarcas[1] en lugar de "Logitech" para poder utilizar los filtros de busqueda
      } else if (generic.marca == "Logitech") {
        listaProductos.push(
          new Producto({
            nombre: generic.nombre,
            id: generic.id,
            precio: generic.precio,
            marca: ArrayMarcas[1],
            stock: generic.stock,
            contadorCarro: generic.contadorCarro,
            img: generic.img,
          })
        );
		//se le asigna ArrayMarcas[2] en lugar de "Redragon" para poder utilizar los filtros de busqueda
      } else if (generic.marca == "Redragon") {
        listaProductos.push(
          new Producto({
            nombre: generic.nombre,
            id: generic.id,
            precio: generic.precio,
            marca: ArrayMarcas[2],
            stock: generic.stock,
            contadorCarro: generic.contadorCarro,
            img: generic.img,
          })
        );
      }
    }
    //imprimir los productos
    displayProductos(listaProductos);
  } else {
    console.log("no se cargaron bien los datos");
  }
});

setStorage("Productos", listaProductos);
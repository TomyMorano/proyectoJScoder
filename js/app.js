//Se ejecuta al cargar el dom
$(document).ready(function () {
    //condicional para cargar los productos dentro del localStorage
    if ("carrito" in localStorage) {
        let productosGenericos = JSON.parse(localStorage.getItem("carrito"));
        for (const i of productosGenericos) {
            listaCarrito.push(
                new Producto({
                    nombre: i.nombre,
                    id: i.id,
                    precio: i.precio,
                    marca: i.marca,
                    stock: i.stock,
                    contadorCarro: i.contadorCarro,
                })
            );
        }
        displayProductos(listaCarrito);
    }
    //Se muestran los filtros en pantalla
    Displayfiltros(ArrayMarcas);

    //Función para que solo se pueda seleccionar 1 categoría (checkbox) al mismo tiempo
    $(function () {
		let chks = $(".form-check-input")
		chks.on("change", function () {
			if (this.checked) {
				let me = this
				chks.each(function (i) {
					if (me.id != this.id) {
						$(this).prop("checked", false)
					}
				})
			}
		})
	})    
});









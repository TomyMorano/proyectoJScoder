//Guardar en local storage
const setStorage = (nombre, valor) => {
	localStorage.setItem(nombre, JSON.stringify(valor));
};
//Tomar de local storage
const getStorage = (valor) => {
	let productoLocalStorage = localStorage.getItem(valor);
	if (productoLocalStorage) {
		productoLocalStorage = JSON.parse(localStorage.getItem(valor));
	} else {
		productoLocalStorage = [];
	}
	return productoLocalStorage;
};

//Funcion Mostrar Productos (pide un array para recorrer)
const displayProductos = (lista,) => {
    //Display de carrito de compras
    if (lista === listaCarrito) {
        for (const i of lista) {
		//Cards de los productos del carrito
		
        cardsCarrito.innerHTML += `    
            <div class="card mt-3" style="width: 18rem;">    
            <span class="badge bg-secondary">${i.contadorCarro}</span>
            <a class="btn btn-danger btnBorrarDelCarro" id="${i.id}">x</a> 
            <a class="btn btn-secondary btnAgregar" id="${i.id}">+</a> 
            <a class="btn btn-secondary btnRestar" id="${i.id}">-</a>
            <div class="card-header">${i.nombre}</div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Precio: $${i.precio}</li>
                    <li class="list-group-item">Subtotal: $${i.precio * i.contadorCarro}</li>
                </ul>
            </div>`;
			$("#divCarrito").append(cardsCarrito);

        //Boton para borrar/agregar/restar productos del carrito
        $(".btnBorrarDelCarro").on("click", borrarDelCarro);
        $(".btnAgregar").on("click", addCarro);
        $(".btnRestar").on("click", subCarro);
    }
  }
    //Display de Productos Estaticos
    else if (lista === listaProductos) {
        $("#divProductos").HTML=""
		cardsEstaticas.setAttribute("class", "row row-cols-2");
        for (const i of lista) {
            cardsEstaticas.innerHTML += `
            <div class="row justify-content-center no-gutters">
                <div class="card col-sm-12 col-md-6 mt-5 ">
                    <img class="img-fluid" src="${i.img}" class="card-img-top" alt="">
                    <div class="card-body">
                        <h3 class="card-title">${i.nombre}</h3>
                        <h5 class="card-title">$${i.precio}</h5>
                        <p class="card-text">Producto marca ${i.marca}, actualmente contamos con ${i.stock} unidades en stock</p>
                        <button type="button" class="btn btn-outline-secondary btnAgregarCarro" id="${i.id}">Agregar al carro de compras</button>
                    </div>
                </div>
            </div>`;
        $("#divProductos").append(cardsEstaticas);
        $(".btnAgregarCarro").on("click", (e) => {AgregarAlCarro(e);});
    }
  	}else if(lista === filtradosPorMarca ){  
		for (const i of lista) {
			cardsEstaticas.innerHTML += `
			<div class="row justify-content-center no-gutters">
				<div class="card col-sm-12 col-md-6 mt-5 ">
					<img class="img-fluid" src="${i.img}" class="card-img-top" alt="">
					<div class="card-body">
						<h3 class="card-title">${i.nombre}</h3>
						<h5 class="card-title">$${i.precio}</h5>
						<p class="card-text">Producto marca ${i.marca}, actualmente contamos con ${i.stock} unidades en stock</p>
						<button type="button" class="btn btn-outline-secondary btnAgregarCarro" id="${i.id}">Agregar al carro de compras</button>
					</div>
				</div>
			</div>`;
			$("#divProductos").append(cardsFiltro);
		$(".btnAgregarCarro").on("click", (e) => {AgregarAlCarro(e);});
		}
	}else if(lista ===filtradosPorPrecio){
        for (const i of lista) {
			cardsEstaticas.innerHTML += `
			<div class="row justify-content-center no-gutters">
				<div class="card col-sm-12 col-md-6 mt-5 ">
					<img class="img-fluid" src="${i.img}" class="card-img-top" alt="">
					<div class="card-body">
						<h3 class="card-title">${i.nombre}</h3>
						<h5 class="card-title">$${i.precio}</h5>
						<p class="card-text">Producto marca ${i.marca}, actualmente contamos con ${i.stock} unidades en stock</p>
						<button type="button" class="btn btn-outline-secondary btnAgregarCarro" id="${i.id}">Agregar al carro de compras</button>
					</div>
				</div>
			</div>`;
			$("#divProductos").append(cardsFiltro);
		$(".btnAgregarCarro").on("click", (e) => {AgregarAlCarro(e);});
		}
    }
};


//Función para agregar los productos al carro de compras e imprimirlos
const AgregarAlCarro = (e) => {
	e.preventDefault();
	cardsCarrito.innerHTML = "";
	const idProd = e.target.id;

	const yaEstaEnElCarro = listaCarrito.find(
		(producto) => producto.id == idProd
	);
	if (yaEstaEnElCarro == undefined) {
		const productoSeleccionado = listaProductos.find(
			(producto) => producto.id == idProd
		);
		listaCarrito.push(productoSeleccionado);
	} else if (yaEstaEnElCarro !== undefined) {
		yaEstaEnElCarro.agregarAlContador(1);
	}
	displayProductos(listaCarrito);
	$("#divProductos").HTML=""
	setStorage("carrito", listaCarrito);
};

//Función para borrar los productos del carrito de compras
function borrarDelCarro(e) {
	//la posición del producto dentro del array se guarda en la variable y luego se usa el metodo splice para quitarlo de la lista
	let position = listaCarrito.findIndex((producto) => producto.id == e.target.id);
	listaCarrito.splice(position, 1);
	//se imprime en pantalla el nuevo array con el producto elminado.
	cardsCarrito.innerHTML = "";
	displayProductos(listaCarrito);

	setStorage("carrito", listaCarrito);
}

//Función para agregar cantidad en el carrito de compras
function addCarro(e) {
	let productoEncontrado = listaCarrito.find((p) => p.id == e.target.id);
	productoEncontrado.agregarAlContador(1);

	$(this).parent().children()[0].innerHTML = productoEncontrado.contadorCarro;
	$(this).parent().children().children()[1].innerHTML = `Subtotal: $${productoEncontrado.subtotal()}`;

	setStorage("carrito", listaCarrito);
}

//Función para disminuír cantidad en el carrito de compras
function subCarro(e) {
	let productoEncontrado = listaCarrito.find((p) => p.id == e.target.id);
	productoEncontrado.restarAlContador(1);
	//si el valor es mayor a 0, disminuye la cantidad del contador
	if (productoEncontrado.contadorCarro > 0) {
		$(this).parent().children()[0].innerHTML = productoEncontrado.contadorCarro;
		$(this).parent().children().children()[1].innerHTML = `Subtotal: $${productoEncontrado.subtotal()}`;
	}
	//si el valor es menor a 1 desaparece el producto del carrito
	else if (productoEncontrado.contadorCarro < 1) {
		let position = listaCarrito.findIndex((producto) => producto.id == e.target.id);
		listaCarrito.splice(position, 1);
		cardsCarrito.innerHTML = "";
		displayProductos(listaCarrito);
	}
	setStorage("carrito", listaCarrito);
}

function terminarCompra() {
    listaCarrito.splice(0,listaCarrito.length)
    cardsCarrito.innerHTML=""
    console.log(listaCarrito);
    localStorage.removeItem("carrito")


    $("#mensaje").fadeIn(500)
    $("#mensaje").fadeOut(4000)
}

$("#btnTerminarCompra").on("click",terminarCompra)

//				Filtros

//Función para renderizar los filtros
function Displayfiltros(lista) {
	//Filtro por marca
    divInsertarFiltros.innerHTML = `<h4 class="text-secondary">Por marca</h4>`;
	//Filtro por precio
    divInsertarFiltros.innerHTML = `
    <div class="card px-2">
            <h2 class="text-center">Filtrar por Precio</h2>
            <hr>
            <h4>Price:</h4>
        <div class="card-body">
            <form id="price-range-form">
                <label for="precioMinimo" class="form-label">Precio Minimo: </label>
                <span id="precioMinimo-txt">$0</span>
                <input type="range" class="form-range" min="0" max="42998" id="precioMinimo" step="1" value="0">
            <label for="precioMaximo" class="form-label">Precio Máximo: </label>
            <span id="precioMaximo-txt">$42999</span>
            <input type="range" class="form-range" min="1" max="42999" id="precioMaximo" step="1" value="42999">
            </form>
        </div>
    </div>`

    for (const marca of lista) {
        divInsertarFiltros.innerHTML += `
		  <div class="mb-3 form-check class="justify-content-center">
			  <input type="checkbox" value="${marca}" class="form-check-input" id="${marca}">
			  <label class="form-check-label" for="${marca}">${marca}</label>
		  </div>`;
        $("#divFiltro").append(divInsertarFiltros);
    }
    $(".form-check-input").on("change", (e) => {
        filtroMarca(e)
    })

	//Filtro por precio
	let precioMinimo = 0;
	let precioMaximo = 42999;
        //Mostrar en pantalla la seleeción de precio 
    $("#precioMinimo").on("change mousemove", function () {
        precioMinimo = parseInt($('#precioMinimo').val())

        $('#precioMinimo-txt').text('$' + precioMinimo)
        mostrarFiltradosPrecio()
    })
    $("#precioMaximo").on("change mousemove", function () {
        precioMaximo = parseInt($('#precioMaximo').val())

        $('#precioMaximo-txt').text('$' + precioMaximo)
        mostrarFiltradosPrecio()
    })
	//Función para filtrar por precio
	function mostrarFiltradosPrecio() {

        for (let i = 0; i < listaProductos.length; i++) {
            filtradosPorPrecio = listaProductos.filter(p => p.precio <= precioMaximo && p.precio >= precioMinimo);
            //console.log(filtradosPorPrecio)
            if (filtradosPorPrecio.length < 10) {
                cardsEstaticas.innerHTML = ""
                return displayProductos(filtradosPorPrecio)
            }

        }

    }
    
}

//Funcion para buscar por nombre en input de tipo texto
$("#barraBusqueda").on("keyup", (e) => {
    buscarEnBarraBusqueda(e);
});
function buscarEnBarraBusqueda(e) {
    let inputBusqueda = e.target.value.toLowerCase();
    let h3 = document.getElementsByTagName("h3");

    for (let i = 0; i < h3.length; i++) {
        a = h3[i];
        let txtValue = a.textContent || a.innerText;

        if (txtValue.toLowerCase().indexOf(inputBusqueda) > -1) {
            h3[i].parentElement.parentElement.style = "visible";
        } else {
            h3[i].parentElement.parentElement.style.display = "none";
        }
    }
}

//  Filtro por Marcas
function filtroMarca(e) {
    let element = e.target
    let checkboxes = $(".form-check-input")
    for (let i = 0; i < checkboxes.length; i++) {

        if (element.checked == false) {
            cardsEstaticas.innerHTML = ""
            return displayProductos(listaProductos)
        } else {
            if (checkboxes[i].id.toLowerCase() == element.value.toLowerCase()) {
                if (element.checked == true) {
                    filtradosPorMarca = listaProductos.filter(p => p.marca == checkboxes[i].id)
                    cardsEstaticas.innerHTML = ""
                    return displayProductos(filtradosPorMarca)
                }
                if (element.checked == false) {
                    cardsEstaticas.innerHTML = ""
                    return displayProductos(listaProductos)
                }
            }
        }
    }
	
}


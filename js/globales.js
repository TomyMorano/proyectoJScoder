//Variables Globales
const listaProductos = [];
let ArrayMarcas = ["HP", "Logitech", "Redragon"];

//Arrays donde se guardan los productos agregados al carro de compras
let listaCarrito = [];
let productoAgregadoAlCarro=[]

//Array de productos Filtrados por precio
let filtradosPorPrecio =[]

//Array de productos filtrados por marca
let filtradosPorMarca =[]

//Contenedores de los productos Estaticos
let divContenedorProductos = $("#divProductos");

//Cards que presentan los productos
let cardsFiltro = document.createElement("div");
let cardsEstaticas = document.createElement("div");
let cardsCarrito = document.createElement("div");

//Contenedor de filtros de busqueda:
let divInsertarFiltros = document.createElement("div");

var resultados = document.querySelector("#resultados");
var resultadosInv = document.querySelector("#resultadosInv");
var busquedaResult = document.querySelector("#busquedaResult");
var acciones = document.querySelector("#acciones");

var btnAgregar = document.querySelector("#btnAgregar");
var btnBorrar = document.querySelector("#btnBorrar");
var btnBuscar = document.querySelector("#btnBuscar");
var btnListar = document.querySelector("#btnListar");
var btnListarInv = document.querySelector("#btnListarInv");
var btnInsertarPos = document.querySelector("#btnInsertarPos");

class Producto {
    constructor(name, id, description, amount, price) {
        this.producto = {
            codigo: id,
            nombre: name,
            descripcion: description,
            cantidad: amount,
            precio: price,
            valorM: parseFloat(amount) * parseFloat(price)
        }
        this.siguiente = null;
        this.anterior = null;
    }
}

class Inventario {
    constructor() {
        this.inicio = null;
        this.cola = null;
        this.tamaño = 0;
    }

    verProductos() {
        return this.inicio;
    }

    verProductosAlReves() {
        return this.cola;
    }

    añadirProducto(nuevoProducto) {
        if (this.cola) {
            nuevoProducto.anterior = this.cola;
            this.cola.siguiente = nuevoProducto;
            this.cola = nuevoProducto;
        } else {
            this.cola = nuevoProducto;
            this.inicio = nuevoProducto;
        }
        this.tamaño++;
    }

    eliminarInicio() {
        if (this.inicio == null) return false;

        if (this.inicio == this.cola) {
            this.inicio = null;
            this.cola   = null;
        } else {
            this.inicio = this.inicio.siguiente;
            this.inicio.anterior = null;
        }
        this.tamaño--;
        return true;
    }

    eliminarUltimo() {
        if (this.cola == null) return false;

        if (this.cola == this.inicio) {
            this.cola   = null;
            this.inicio = null;
        } else {
            this.cola = this.cola.anterior;
            this.cola.siguiente = null;
        }
        this.tamaño--;
        return true;
    }

    eliminarProducto(codigo) {
        let actual = this.inicio;
        let aux   = null;
        
        while (actual != null) {
            if (actual.producto.codigo == codigo) {
                if (aux == null) {
                    return this.eliminarInicio();
                } else if(actual.siguiente == null) {
                    return this.eliminarUltimo();
                } else {
                    aux.siguiente = actual.siguiente;
                    actual.siguiente.aux = aux;
                }
                this.tamaño--;
                return true;
            }
            aux = actual;
            actual = actual.siguiente;
        }

        return false;
    }

    buscarProducto(codigo) {
        let actual = this.inicio;
        let aux = null;

        while (actual != null) {
            if (actual.producto.codigo == codigo) {
                if (aux == null) {
                    return this.inicio;
                }
                else if (actual.siguiente == null) {
                    return this.cola;
                }
                else {
                    return actual;
                }
            } 
            aux = actual;
            actual = actual.siguiente;
        }
        return false;
    }

    añadirEn(nuevoProducto, pos) {
        if (pos > this.tamaño || pos < 1 ) return false

        let actual = this.inicio;
        let aux;

        if (pos == 1) {
            nuevoProducto.siguiente = actual;
            actual.anterior = nuevoProducto;
            this.inicio = nuevoProducto;
        } else {
            for (let i = 1; i <= pos; i++) {
                aux = actual;
                actual = actual.siguiente;
            }
            nuevoProducto.siguiente = actual;
            nuevoProducto.anterior = aux;
            actual.anterior = nuevoProducto;
            aux.siguiente = nuevoProducto;
        }
        this.tamaño++;
        return true;
    }
}

const todosPro = new Inventario();

btnAgregar.addEventListener("click", function () {
    let nom = document.querySelector("#nom").value;
    let cod = document.querySelector("#cod").value;
    let desc = document.querySelector("#desc").value;
    let cant = document.querySelector("#cant").value;
    let cost = document.querySelector("#cost").value;

    let productoNuevo = new Producto(nom, cod, desc, cant, cost);
    todosPro.añadirProducto(productoNuevo);
    acciones.innerHTML += "<p>Se agrego un nuevo producto</p>";
    return;
});
btnListar.addEventListener("click", function () {
    resultados.innerHTML = " ";
    let proTotales = todosPro.verProductos();
    let actual = proTotales;
    
    resultados.innerHTML = "<ul style='border: 1px solid'>";

    while (actual.siguiente !== null) {
        resultados.innerHTML += "<ul style='border: 1px solid'><li>Nombre: " + actual.producto.nombre + "</li><li>Codigo: " + actual.producto.codigo + "</li>" +
        "<li>Descripcion: " + actual.producto.descripcion + "</li><li>Cantidad: " + actual.producto.cantidad + "</li><li>Costo: " + actual.producto.precio + "</li><li>Valor mercancia: " + actual.producto.valorM + "</li></ul>";
        
        actual = actual.siguiente;
    }
    resultados.innerHTML += "<ul style='border: 1px solid'><li>Nombre: " + actual.producto.nombre + "</li><li>Codigo: " + actual.producto.codigo + "</li>" +
    "<li>Descripcion: " + actual.producto.descripcion + "</li><li>Cantidad: " + actual.producto.cantidad + "</li><li>Costo: " + actual.producto.precio + "</li><li>Valor mercancia: " + actual.producto.valorM + "</li></ul>";
});
btnListarInv.addEventListener("click", function () {
    resultadosInv.innerHTML = " ";
    let proTotales = todosPro.verProductosAlReves();
    let actual = proTotales;
    
    resultadosInv.innerHTML = "<ul style='border: 1px solid'>";

    while (actual.anterior !== null) {
        resultadosInv.innerHTML += "<ul style='border: 1px solid'><li>Nombre: " + actual.producto.nombre + "</li><li>Codigo: " + actual.producto.codigo + "</li>" +
        "<li>Descripcion: " + actual.producto.descripcion + "</li><li>Cantidad: " + actual.producto.cantidad + "</li><li>Costo: " + actual.producto.precio + "</li><li>Valor mercancia: " + actual.producto.valorM + "</li></ul>";
        
        actual = actual.anterior;
    }
    resultadosInv.innerHTML += "<ul style='border: 1px solid'><li>Nombre: " + actual.producto.nombre + "</li><li>Codigo: " + actual.producto.codigo + "</li>" +
    "<li>Descripcion: " + actual.producto.descripcion + "</li><li>Cantidad: " + actual.producto.cantidad + "</li><li>Costo: " + actual.producto.precio + "</li><li>Valor mercancia: " + actual.producto.valorM + "</li></ul>";
});

btnBorrar.addEventListener("click", function () {
    let codigoBorrar = document.querySelector("#borrarCodigo").value;
    let fueborrado = todosPro.eliminarProducto(codigoBorrar);
    if (fueborrado) {
        acciones.innerHTML += "<p>Se elimino un producto</p>";
    }
    else {
        alert("Codigo no encontrado");
    }
});
btnBuscar.addEventListener("click", function () {
    busquedaResult.innerHTML = " ";
    let codigoBuscar = document.querySelector("#buscarPorCodigo").value;
    let proEncontrado = todosPro.buscarProducto(codigoBuscar);
    if (proEncontrado) {
        acciones.innerHTML += "<p>Se encontro el producto buscado</p>";
        busquedaResult.innerHTML += "<ul style='border: 1px solid'><li>Nombre: " + proEncontrado.producto.nombre + "</li><li>Codigo: " + proEncontrado.producto.codigo + "</li>" +
            "<li>Descripcion: " + proEncontrado.producto.descripcion + "</li><li>Cantidad: " + proEncontrado.producto.cantidad + "</li><li>Costo: " + proEncontrado.producto.precio + "</li><li>Valor mercancia: " + proEncontrado.producto.valorM + "</li></ul>";
    }
    else {
        alert("Codigo no encontrado");
    }
});
btnInsertarPos.addEventListener("click", function () {
    let nom = document.querySelector("#nom").value;
    let cod = document.querySelector("#cod").value;
    let desc = document.querySelector("#desc").value;
    let cant = document.querySelector("#cant").value;
    let cost = document.querySelector("#cost").value;
    let posicion = document.querySelector("#indicar").value;

    let productoNuevo = new Producto(nom, cod, desc, cant, cost);
    let fueInsertado = todosPro.añadirEn(productoNuevo, posicion);
    if (fueInsertado) {
        acciones.innerHTML += "<p>Se agrego un nuevo producto con la posicion deseada</p>";
    }
});
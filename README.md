### Control de inventario con listas enlazadas dobles
Crear una interfaz en HTML para manipular un INVENTARIO ORDENADO de productos, para almacenar la información debemos usar una lista doblemente enlazada. {anterior,siguiente}
La información de cada producto debe permitir guardar el código, el nombre, una descripción breve, cantidad y el costo, además calcular el valor de mercancía que sería un valor calculado por la cantidad y el costo.

En la interfaz (una sola pantalla) tener los inputs para cada dato, los botones para las tareas a realizar que se describen a continuación y un div para ir describiendo las actividades que se van realizando y sus resultados.
Considerar que los productos se irán ordenando de acuerdo al código de manera ascendente y tratar de aprovechar esta ventaja en los procesos que vamos a realizar.
Botones :
-Agregar nuevo producto 
-Eliminar un producto por código
-Buscar un producto por código
-Recuperar todos los productos //listar 
-Recuperar todos los productos en orden inverso //listar inverso
-Eliminar el primero
Los métodos de eliminar se deben trabajar de forma que además de eliminar el elemento de la lista, devuelvan el objeto que esta siendo eliminado, en caso de no existir, deberán devolver null.
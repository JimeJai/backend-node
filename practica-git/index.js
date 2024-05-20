const booksController = require("../controllers/books-controller.js")

function processArguments(mensaje) {
    // EL MENSAJE TIENE LA SIGUIENTE FORMA:
    // { action: "", body: {} }
    // la propiedad "action" hace referencia a lo que quiere hacer: leer, crear, eliminar, modificar
    // En la propiedad "body" es donde el cliente va a enviar informacion que se va a guardar en la base de datos (es decir, cuando quiera crear un libro, modificarlo)
    const data = JSON.parse(mensaje)

    if (!data.action) {
        return "No me mandaste ninguna accion"
    }

    // VERIFICO SI LA ACCION ES READ (OBTENER TODOS LOS LIBROS) Y HAGO ALGO EN CONSECUENCIA
    if (data.action == "read") {
        console.log("VOY A LLAMAR A LA FUNCION READBOOKS DEL CONTROLADOR");
        return booksController.readBooks()

    } else if (data.action == "create") { // VERIFICO SI LA ACCION ES CREATE (CREAR LIBRO) Y HAGO ALGO EN CONSECUENCIA
        return booksController.addBook(data.body)
    }
    else if (data.action == "readOne") { // VERIFICO SI LA ACCION ES readOne (BUSCAR UN LIBRO POR ID) Y HAGO ALGO EN CONSECUENCIA
        const book = booksController.findById(data.body.id)

        return book
    } else {
        return "Accion invalida"
    }
}

module.exports = {
    processArguments: processArguments
}
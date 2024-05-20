const net = require("net")
const views = require("./views/index.js")

// LOGICA PARA CREAR UN SERVIDOR
const server = net.createServer()

const port = 3000
const callback = () => {
    console.log("SERVIDOR ESCUCHANDO EN EL PUERTO " + port);
}

// LA CALLBACK QUE SE ENVÍA CÓMO SEGUNDO PARÁMETRO AL MÉTODO ON SE VA A EJECUTAR --EXCLUSIVAMENTE-- 
//CUANDO UN CLIENTE SE CONECTE A NUESTRO SERVIDOR

server.on("connection", (clienteConectado) => {
    console.log("Se conecto un cliente");

    // LA CALLBACK QUE SE LE PASA AL EVENTO DATA SE VA A EJECTUAR EXCLUSIVAMENTE CUANDO EL CLIENTE ENVÍE UN MENSAJE A NUESTRO SERVIDOR
    clienteConectado.on("data", (mensajeCliente) => {
        // TRANSFORMO EL MENSAJE DEL CLIENTE(BUFFER ==> STRING)
        const mensajeTexto = mensajeCliente.toString();

        // VERIFICO EL MENSAJE DEL CLIENTE PARA VER QUE ACCIÓN VOY A REALIZAR
        const datoAEnviarJs = views.processArguments(mensajeTexto)
        console.log("PROCESÉ LOS ARGUMENTOS Y LE ENVIO LA INFO AL CLIENTE");
        const datoAEnviarJson = JSON.stringify(datoAEnviarJs)

        // ENVÍO LA INFORMACIÓN AL CLIENTE
        clienteConectado.write(datoAEnviarJson)
    })
})

// LEVANTO EL SERVIDOR EN EL PUERTO ESPECIFICADO Y EJECUTO LA CALLBACK CUANDO SE HAYA LEVANTADO CORRECTAMENTE
server.listen(port, callback)

// SOLICITUD DEL CLIENTE ==> VISTAS <=> CONTROLADOR <=> MODELO
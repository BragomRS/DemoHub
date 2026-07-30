/*=========================================================
                FLUJO 3
        CLIENTE PROACTIVO - ITACAMBA
        PARTE 1
=========================================================*/
let flujo3_puntos = 3250;
function flujo3_iniciar(){

    
    escribir(`
        Hola 👋<br><br>

        Bienvenido al programa de fidelización de <b>Itacamba</b>.<br><br>

        Para comenzar necesito validar tu identidad.


    `);
    flujo3_validarCodigo();

}

/*=========================================================
            VALIDACIÓN DE IDENTIDAD
=========================================================*/

async function flujo3_validarCodigo(){

  /*  escribir("Ingresar código de ferretería","user");*/

    await responder(`
        Por favor escribe tu código de ferretería.
    `);

    escribir(`

        <div class="buttons">

            <button onclick="flujo3_codigoIngresado('12345')">
                Código: 12345
            </button>

        </div>

    `);

}

/*=========================================================
            CÓDIGO INGRESADO
=========================================================*/

async function flujo3_codigoIngresado(codigo){

    escribir(codigo,"user");

    await responder("Validando información...");

    mostrarTyping();

    await esperar(1800);

    ocultarTyping();

    await responder("✅ Código validado correctamente.");

    await esperar(500);

    flujo3_menuPrincipal();

}

/*=========================================================
                MENÚ PRINCIPAL
=========================================================*/

function flujo3_menuPrincipal(){

    escribir(`

        🤖 <b>Hola, Ferretería X</b>

        <br><br>

        Soy el Bot de Itacamba.

        <br><br>

        ¿Qué deseas hacer hoy?

        <div class="buttons">

            <button onclick="flujo3_verPuntos()">
                🔍 Ver mis puntos acumulados
            </button>

            <button onclick="flujo3_reportarProblema()">
                ⚠️ Reportar un problema
            </button>

            <button onclick="flujo3_canjearPuntos()">
                🎁 Canjear mis puntos
            </button>

            <button onclick="flujo3_sinSeleccion()">
                ❌ No hacer nada
            </button>

        </div>

    `);

}

/*=========================================================
            SIN SELECCIÓN
=========================================================*/

async function flujo3_sinSeleccion(){

    escribir("No seleccionar ninguna opción","user");

    await responder("Entendido.");

    await responder("El flujo ha finalizado.");

    await responder("Gracias por comunicarte con Itacamba 😊");

}

/*=========================================================
                VER MIS PUNTOS
=========================================================*/

async function flujo3_verPuntos(){

    escribir("Ver mis puntos acumulados","user");

    await responder("Un momento, consultaré tu saldo de puntos.");

    mostrarTyping();

    await esperar(2500);

    ocultarTyping();

    await responder(`
        ⭐ <b>Estos son tus puntos acumulados</b>

        <br><br>

        <h2 style="margin:10px 0;color:#f5b301;">
            1.250 puntos
        </h2>

        Puedes utilizarlos para realizar canjes.
    `);

    await responder("¿Qué deseas hacer ahora?");

    escribir(`

        <div class="buttons">

            <button onclick="flujo3_menuPrincipal()">
                🔍 Ver menú
            </button>

            <button onclick="flujo3_canjearPuntos()">
                🎁 Canjear puntos
            </button>

        </div>

    `);

}

/*=========================================================
                VOLVER AL MENÚ
=========================================================*/

async function flujo3_volverMenu(){

    escribir("Volver al menú","user");

    await responder("Perfecto.");

    flujo3_menuPrincipal();

}

/*=========================================================
                CANJEAR PUNTOS
=========================================================*/

async function flujo3_canjearPuntos(){

    escribir("Canjear mis puntos","user");

    await responder("Estos son los productos disponibles para canjear con tus puntos.");

    await esperar(800);

    escribir(`

        <div class="buttons">

            <button onclick="flujo3_seleccionarProducto('Martillo',500)">
                🔨 Martillo<br>
                <small>500 puntos</small>
            </button>

            <button onclick="flujo3_seleccionarProducto('Set de herramientas',1500)">
                🧰 Set de herramientas<br>
                <small>1.500 puntos</small>
            </button>

            <button onclick="flujo3_seleccionarProducto('Taladro',3000)">
                🛠 Taladro<br>
                <small>3.000 puntos</small>
            </button>

            <button onclick="flujo3_verMasProductos()">
                ➕ Ver más productos
            </button>

        </div>

    `);

}

/*=========================================================
            VER MÁS PRODUCTOS
=========================================================*/

async function flujo3_verMasProductos(){

    escribir("Ver más productos","user");

    await responder("Próximamente tendremos más productos disponibles para canje.");

    escribir(`

        <div class="buttons">

            <button onclick="flujo3_canjearPuntos()">
                🔙 Volver al catálogo
            </button>

            <button onclick="flujo3_menuPrincipal()">
                🏠 Menú principal
            </button>

        </div>

    `);

}

/*=========================================================
            PRODUCTO SELECCIONADO
=========================================================*/

async function flujo3_seleccionarProducto(producto,puntos){

    escribir(producto,"user");

    await responder(`

        Has seleccionado:

        <br><br>

        <b>${producto}</b>

        <br>

        Costo: <b>${puntos} puntos</b>

        <br><br>

        ¿Deseas confirmar el canje?

    `);

    escribir(`

        <div class="buttons">

            <button onclick="flujo3_confirmarCanje('${producto}',${puntos})">
                ✅ Confirmar
            </button>

            <button onclick="flujo3_canjearPuntos()">
                ❌ Cancelar
            </button>

        </div>

    `);

}

/*=========================================================
                CONFIRMAR CANJE
=========================================================*/

async function flujo3_confirmarCanje(producto,puntos){

    escribir("Confirmar","user");

    await responder("Validando disponibilidad...");

    mostrarTyping();

    await esperar(2000);

    ocultarTyping();

    if(puntos > 1250){

        await responder("❌ No cuentas con puntos suficientes para realizar este canje.");

        escribir(`

            <div class="buttons">

                <button onclick="flujo3_canjearPuntos()">
                    🔙 Elegir otro producto
                </button>

                <button onclick="flujo3_menuPrincipal()">
                    🏠 Menú principal
                </button>

            </div>

        `);

        return;

    }

    await flujo3_ejecutarCanje(producto,puntos);

}

/*=========================================================
                EJECUTAR CANJE
=========================================================*/

async function flujo3_ejecutarCanje(producto,puntos){

    await responder("Procesando tu solicitud...");

    mostrarTyping();

    await esperar(2500);

    ocultarTyping();

    const saldo = 1250 - puntos;

    await responder(`

        🎉 <b>¡Canje realizado con éxito!</b>

        <br><br>

        Producto:

        <b>${producto}</b>

        <br>

        Puntos utilizados:

        <b>${puntos}</b>

        <br>

        Saldo actual:

        <b>${saldo} puntos</b>

        <br><br>

        Gracias por ser parte de Itacamba 🙌

    `);

    escribir(`

        <div class="buttons">

            <button onclick="flujo3_menuPrincipal()">
                🏠 Ver menú
            </button>

        </div>

    `);

}

/*=========================================================
                REPORTAR UN PROBLEMA
=========================================================*/

async function flujo3_reportarProblema(){

    escribir("Reportar un problema","user");

    await responder(`
        Entiendo.

        <br><br>

        ¿Cuál es el problema que deseas reportar?
    `);

    escribir(`

        <div class="buttons">

            <button onclick="flujo3_tipoProblema('No se sumaron mis puntos')">
                ⭐ No se sumaron mis puntos
            </button>

            <button onclick="flujo3_tipoProblema('No recibí mi premio')">
                🎁 No recibí mi premio
            </button>

            <button onclick="flujo3_tipoProblema('No puedo ingresar')">
                🔐 No puedo ingresar
            </button>

            <button onclick="flujo3_tipoProblema('Otro problema')">
                ❓ Otro problema
            </button>

        </div>

    `);

}

/*=========================================================
            TIPO DE PROBLEMA
=========================================================*/

async function flujo3_tipoProblema(problema){

    escribir(problema,"user");

    await responder("Voy a revisar tu información.");

    mostrarTyping();

    await esperar(2500);

    ocultarTyping();

    switch(problema){

        case "No se sumaron mis puntos":

            await responder(`
                Verifiqué tu cuenta.

                <br><br>

                Es necesario que un ejecutivo revise tu caso.
            `);

        break;

        case "No recibí mi premio":

            await responder(`
                Revisaré el estado de tu solicitud de canje.

                <br><br>

                Un ejecutivo continuará con tu atención.
            `);

        break;

        case "No puedo ingresar":

            await responder(`
                Necesitamos validar algunos datos.

                <br><br>

                Te comunicaré con un ejecutivo.
            `);

        break;

        default:

            await responder(`
                Gracias por la información.

                <br><br>

                Un ejecutivo revisará tu caso.
            `);

        break;

    }

    await flujo3_derivarEjecutivo();

}

/*=========================================================
            DERIVAR A EJECUTIVO
=========================================================*/

async function flujo3_derivarEjecutivo(){

    mostrarTyping();

    status.innerHTML = "Conectando con ejecutivo...";

    await esperar(3000);

    ocultarTyping();

    status.innerHTML = "María - Ejecutiva";

    escribir(`
        👩 <b>María - Ejecutiva</b>

        <br><br>

        Hola.

        Mi nombre es María y continuaré con tu atención.

        <br><br>

        Ya tengo la información enviada por el bot.

        <br><br>

        Revisaré tu caso personalmente.
    `);

    await responder("Esto puede tomar unos minutos.");

    await responder("Te contactaré apenas tenga una respuesta.");

    escribir(`

        <div class="buttons">

            <button onclick="flujo3_confirmarSeguimiento()">
                👍 Entendido
            </button>

        </div>

    `);

}

/*=========================================================
            CONFIRMACIÓN DEL CLIENTE
=========================================================*/

async function flujo3_confirmarSeguimiento(){

    escribir("Entendido","user");

    await responder("Muchas gracias por tu paciencia.");

    await responder("Tu caso quedó registrado correctamente.");

    await responder("Recibirás una respuesta a la brevedad.");

    escribir(`

        <div class="buttons">

            <button onclick="flujo3_menuPrincipal()">
                🏠 Volver al menú principal
            </button>

            <button onclick="flujo3_finalizar()">
                ❌ Finalizar conversación
            </button>

        </div>

    `);

}

/*=========================================================
                FINALIZAR CHAT
=========================================================*/

async function flujo3_finalizar(){

    escribir("Finalizar conversación","user");

    await responder("Gracias por comunicarte con Itacamba.");

    await responder("Esperamos haberte ayudado.");

    await responder("¡Que tengas un excelente día! 👋");

    status.innerHTML = "Desconectado";

}
function iniciarFlujo2(){

    limpiarChat();

    mostrarChat();


    agregarMensajeBot(
        "Hola 👋 Bienvenido al flujo 2"
    );


    // Aquí empezaremos a construir
    // el flujo de Consulta y gestión de puntos

}


/*=========================================================
    FLUJO ITACAMA
    PARTE 1 - Inicio + Consulta de Puntos
=========================================================*/

function iniciarFlujo2(){

    escribir(`
        Hola 👋<br><br>

        Bienvenido al programa de fidelización de <b>ITACAMA</b>.<br><br>

        ¿Qué deseas hacer?

        <div class="buttons">

            <button onclick="menuConsultarPuntos()">
                ⭐ Consultar mis puntos
            </button>

            <button onclick="menuCanjearPuntos()">
                🎁 Canjear puntos
            </button>

            <button onclick="menuReportarProblema()">
                ⚠️ Reportar un problema
            </button>

        </div>
    `);

}

/*=========================================================
                    CONSULTAR PUNTOS
=========================================================*/

async function menuConsultarPuntos(){

    escribir("Consultar mis puntos","user");

    await responder("Con gusto.");

    await responder("Antes necesito validar tu identidad.");

    escribir(`
        Ingresa tu código de ferretería.

        <div class="buttons">

            <button onclick="validarCodigoFerreteria()">
                Ingresar código
            </button>

        </div>
    `);

}

/*=========================================================
                VALIDACIÓN DE IDENTIDAD
=========================================================*/

async function validarCodigoFerreteria(){

    escribir("Código de ferretería","user");

    await responder("Validando información...");

    mostrarTyping();

    await esperar(2000);

    ocultarTyping();

    await responder("Identidad validada correctamente ✅");

    await consultarPuntos();

}

/*=========================================================
                CONSULTA DE PUNTOS
=========================================================*/

async function consultarPuntos(){

    await responder("Consultando tus puntos acumulados...");

    mostrarTyping();

    await esperar(2500);

    ocultarTyping();

    await responder(`
        ⭐ <b>Puntos disponibles</b>

        <br><br>

        <h2>1.250 puntos</h2>

        <br>

        Puedes utilizarlos para realizar un canje.
    `);

    await responder("¿Deseas realizar otra acción?");

    escribir(`
        <div class="buttons">

            <button onclick="menuCanjearPuntos()">
                🎁 Canjear puntos
            </button>

            <button onclick="menuReportarProblema()">
                ⚠️ Reportar problema
            </button>

            <button onclick="volverMenuPrincipal()">
                🏠 Menú principal
            </button>

            <button onclick="finalizarConversacion()">
                ❌ Finalizar
            </button>

        </div>
    `);

}

/*=========================================================
                MENÚ PRINCIPAL
=========================================================*/

function volverMenuPrincipal(){

    escribir("Volver al menú","user");

    iniciarFlujo2();

}

/*=========================================================
                FINALIZAR CHAT
=========================================================*/

async function finalizarConversacion(){

    escribir("Finalizar","user");

    await responder("Muchas gracias por comunicarte con ITACAMA.");

    await responder("Ha sido un gusto ayudarte 😊");

    await responder("¡Hasta pronto!");

}

/*=========================================================
                CANJEAR PUNTOS
=========================================================*/

async function menuCanjearPuntos(){

    escribir("Canjear mis puntos","user");

    await responder("Perfecto.");

    await responder("Primero validaré tu identidad.");

    escribir(`
        Ingresa tu código de ferretería.

        <div class="buttons">

            <button onclick="validarCanje()">
                Ingresar código
            </button>

        </div>
    `);

}

/*=========================================================
                VALIDACIÓN
=========================================================*/

async function validarCanje(){

    escribir("Código de ferretería","user");

    await responder("Validando información...");

    mostrarTyping();

    await esperar(2000);

    ocultarTyping();

    await responder("Identidad validada correctamente ✅");

    await consultarPuntosCanje();

}

/*=========================================================
                CONSULTA DE PUNTOS
=========================================================*/

async function consultarPuntosCanje(){

    await responder("Consultando tus puntos disponibles...");

    mostrarTyping();

    await esperar(2500);

    ocultarTyping();

    await responder(`
        ⭐ Actualmente tienes

        <h2>1.250 puntos</h2>

        disponibles para canjear.
    `);

    await mostrarCatalogo();

}

/*=========================================================
                CATÁLOGO
=========================================================*/

async function mostrarCatalogo(){

    await responder("Estos son los premios disponibles:");

    escribir(`

        <div class="buttons">

            <button onclick="seleccionarProducto('Martillo',150)">
                🔨 Martillo
                <br>
                150 pts
            </button>

            <button onclick="seleccionarProducto('Wincha',300)">
                📏 Wincha
                <br>
                300 pts
            </button>

            <button onclick="seleccionarProducto('Taladro',450)">
                🛠 Taladro
                <br>
                450 pts
            </button>

            <button onclick="seleccionarProducto('Caja de Herramientas',900)">
                🧰 Caja de Herramientas
                <br>
                900 pts
            </button>

        </div>

    `);

}

/*=========================================================
                SELECCIÓN
=========================================================*/

async function seleccionarProducto(nombre,puntos){

    escribir(nombre,"user");

    await responder(`
        Has seleccionado:

        <br><br>

        <b>${nombre}</b>

        <br>

        Valor: <b>${puntos} puntos</b>
    `);

    escribir(`

        ¿Deseas confirmar el canje?

        <div class="buttons">

            <button onclick="confirmarCanje('${nombre}',${puntos})">
                ✅ Confirmar
            </button>

            <button onclick="mostrarCatalogo()">
                ↩ Elegir otro
            </button>

        </div>

    `);

}

/*=========================================================
                CONFIRMACIÓN
=========================================================*/

async function confirmarCanje(nombre,puntos){

    escribir("Confirmar canje","user");

    await responder("Registrando tu solicitud...");

    mostrarTyping();

    await esperar(3000);

    ocultarTyping();

    await responder("✅ Tu solicitud fue registrada correctamente.");

    await responder(`
        Premio solicitado:

        <b>${nombre}</b>

        <br><br>

        Puntos utilizados:

        <b>${puntos}</b>
    `);

    await responder("En las próximas horas recibirás la confirmación de entrega.");

    escribir(`

        <div class="buttons">

            <button onclick="menuCanjearPuntos()">
                🎁 Otro canje
            </button>

            <button onclick="volverMenuPrincipal()">
                🏠 Menú principal
            </button>

            <button onclick="finalizarConversacion()">
                ❌ Finalizar
            </button>

        </div>

    `);

}

/*=========================================================
                REPORTAR PROBLEMA
=========================================================*/

async function menuReportarProblema(){

    escribir("Reportar un problema","user");

    await responder("Lamento que estés teniendo inconvenientes.");

    await responder("Voy a derivarte con uno de nuestros ejecutivos.");

    mostrarTyping();

    status.innerHTML = "Conectando con ejecutivo...";

    await esperar(3000);

    ocultarTyping();

    status.innerHTML = "Carlos - Ejecutivo";

    escribir(`
        👨 <b>Carlos - Ejecutivo</b>

        <br><br>

        Hola.

        Mi nombre es Carlos y continuaré con tu atención.

        ¿Sobre qué necesitas ayuda?
    `);

    escribir(`

        <div class="buttons">

            <button onclick="problema('No aparecen mis puntos')">
                ⭐ No aparecen mis puntos
            </button>

            <button onclick="problema('Problema con un canje')">
                🎁 Problema con un canje
            </button>

            <button onclick="problema('No puedo ingresar')">
                🔑 No puedo ingresar
            </button>

            <button onclick="problema('Otro problema')">
                ❓ Otro problema
            </button>

        </div>

    `);

}

/*=========================================================
                DETALLE DEL PROBLEMA
=========================================================*/

async function problema(texto){

    escribir(texto,"user");

    await responder("Gracias por la información.");

    await responder("Permíteme revisar tu caso.");

    mostrarTyping();

    await esperar(3500);

    ocultarTyping();

    await responder("He revisado la información.");

    switch(texto){

        case "No aparecen mis puntos":

            await responder("Verifiqué que existe un retraso en la actualización.");

            await responder("Tus puntos serán sincronizados durante las próximas horas.");

        break;

        case "Problema con un canje":

            await responder("Encontré tu solicitud de canje.");

            await responder("El pedido está siendo procesado por nuestro equipo.");

        break;

        case "No puedo ingresar":

            await responder("Procederemos a restablecer tu acceso.");

            await responder("En unos minutos recibirás un correo con las instrucciones.");

        break;

        default:

            await responder("Registraré el detalle para que sea revisado.");

        break;

    }

    await responder("¿Puedo ayudarte en algo más?");

    escribir(`

        <div class="buttons">

            <button onclick="volverMenuPrincipal()">
                🏠 Menú principal
            </button>

            <button onclick="finalizarConversacion()">
                ❌ Finalizar conversación
            </button>

        </div>

    `);

}

/*=========================================================
                REINICIAR CONVERSACIÓN
=========================================================*/

function reiniciarChat(){

    messages.innerHTML = "";

    status.innerHTML = "En línea";

    iniciarFlujo2();

}

/*=========================================================
                INICIO AUTOMÁTICO
=========================================================*/

// Llama a esta función en lugar de iniciar()
// iniciarItacama();
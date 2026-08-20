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

            <button onclick="menuSoyFerreteria()">
                🏪 Soy ferretería
            </button>

            <button onclick="menuDistribuidor()">
                🧑‍💼 Soy distribuidor
            </button>

            <button onclick="menuReportarProblema()">
                ⚠️ Reportar un problema
            </button>

        </div>
    `);

}

/*=========================================================
                    SOY FERRETERÍA
=========================================================*/

async function menuSoyFerreteria(){

    escribir("Soy ferretería","user");

    await responder("Perfecto 👍");

    await responder("Para identificarte como ferretería necesito validar tus datos.");

    escribir(`
        Ingresa el código de tu ferretería.

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

    escribir("35945621","user");

    await responder("Validando información...");

    mostrarTyping();

    await esperar(2000);

    ocultarTyping();

    await responder("Identidad validada correctamente ✅");

    await mostrarMenuFerreteria();

}

/*=========================================================
                MENÚ EXCLUSIVO FERRETERÍA
=========================================================*/

async function mostrarMenuFerreteria(){

    await responder("Este es tu menú de ferretería. ¿Qué deseas hacer?");

    escribir(`
        <div class="buttons">

            <button onclick="consultarPuntos()">
                ⭐ Consultar mis puntos
            </button>

            <button onclick="consultarPuntosCanje()">
                🎁 Canjear puntos
            </button>

            <button onclick="menuConsultarCompras()">
                🛒 Consultar mis compras
            </button>

            <button onclick="menuComprasPendientes()">
                📦 Mis compras pendientes de entrega
            </button>

        </div>
    `);

}

/*=========================================================
                CONSULTAR MIS COMPRAS
=========================================================*/

async function menuConsultarCompras(){

    escribir("Consultar mis compras","user");

    await responder("Puedo mostrarte tus compras del mes actual o de un mes específico que elijas.");

    escribir(`
        <div class="buttons">

            <button onclick="consultarComprasMes('Agosto 2026')">
                📅 Compras de este mes
            </button>

            <button onclick="pedirMesCompras()">
                🗓 Elegir otro mes
            </button>

        </div>
    `);

}

/*=========================================================
                SELECCIONAR MES DE COMPRAS
=========================================================*/

function pedirMesCompras(){

    escribir("Elegir otro mes","user");

    escribir(`
        Selecciona el mes que deseas consultar.

        <div class="buttons">

            <button onclick="consultarComprasMes('Julio 2026')">
                Julio 2026
            </button>

            <button onclick="consultarComprasMes('Junio 2026')">
                Junio 2026
            </button>

            <button onclick="consultarComprasMes('Mayo 2026')">
                Mayo 2026
            </button>

        </div>
    `);

}

/*=========================================================
                DETALLE DE COMPRAS POR MES
=========================================================*/

const comprasPorMes = {

    "Agosto 2026": {
        cantidad: 3,
        monto: "Bs 4.320",
        detalle: `
            🔸 <b>Compra N°9012</b> — 15 bolsas de Cemento de Uso General
            <br>
            Fecha: 05/08/2026

            <br><br>

            🔸 <b>Compra N°9034</b> — 8 bolsas de Cemento de Uso Estructural
            <br>
            Fecha: 12/08/2026

            <br><br>

            🔸 <b>Compra N°9051</b> — 20 bolsas de Cemento de Uso General
            <br>
            Fecha: 19/08/2026
        `
    },

    "Julio 2026": {
        cantidad: 3,
        monto: "Bs 6.150",
        detalle: `
            🔸 <b>Compra N°8760</b> — 25 bolsas de Cemento de Uso General
            <br>
            Fecha: 03/07/2026

            <br><br>

            🔸 <b>Compra N°8791</b> — 10 bolsas de Cemento de Uso Estructural
            <br>
            Fecha: 15/07/2026

            <br><br>

            🔸 <b>Compra N°8815</b> — 12 bolsas de Cemento de Uso General
            <br>
            Fecha: 27/07/2026
        `
    },

    "Junio 2026": {
        cantidad: 2,
        monto: "Bs 2.980",
        detalle: `
            🔸 <b>Compra N°8590</b> — 18 bolsas de Cemento de Uso Estructural
            <br>
            Fecha: 09/06/2026

            <br><br>

            🔸 <b>Compra N°8612</b> — 10 bolsas de Cemento de Uso General
            <br>
            Fecha: 22/06/2026
        `
    },

    "Mayo 2026": {
        cantidad: 2,
        monto: "Bs 5.410",
        detalle: `
            🔸 <b>Compra N°8420</b> — 20 bolsas de Cemento de Uso General
            <br>
            Fecha: 04/05/2026

            <br><br>

            🔸 <b>Compra N°8455</b> — 15 bolsas de Cemento de Uso Estructural
            <br>
            Fecha: 18/05/2026
        `
    }

};

async function consultarComprasMes(mes){

    escribir(mes === "Agosto 2026" ? "Compras de este mes" : mes,"user");

    await responder("Consultando tus compras...");

    mostrarTyping();

    await esperar(2500);

    ocultarTyping();

    const info = comprasPorMes[mes];

    await responder(`
        🛒 <b>Historial de compras</b>

        <br><br>

        🗓 <b>Período:</b> ${mes}
        <br>
        🧾 <b>Cantidad de compras:</b> ${info.cantidad}
        <br>
        💰 <b>Monto total:</b> ${info.monto}

        <br><br>

        ${info.detalle}
    `);

    await responder("¿Deseas realizar otra consulta?");

    escribir(`
        <div class="buttons">

            <button onclick="menuConsultarCompras()">
                🛒 Consultar otro mes
            </button>

            <button onclick="mostrarMenuFerreteria()">
                🏪 Menú ferretería
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
        MIS COMPRAS PENDIENTES DE ENTREGA
=========================================================*/

async function menuComprasPendientes(){

    escribir("Mis compras pendientes de entrega","user");

    await responder("Consultando tus compras pendientes de entrega...");

    mostrarTyping();

    await esperar(2200);

    ocultarTyping();

    await responder(`
        📦 <b>Compras pendientes de entrega</b>

        <br><br>

        🔸 <b>Compra N°9058</b> — 20 bolsas de Cemento de Uso General
        <br>
        Entrega estimada: 22/08/2026

        <br><br>

        🔸 <b>Compra N°9061</b> — 12 bolsas de Cemento de Uso Estructural
        <br>
        Entrega estimada: 25/08/2026

        <br><br>

        🔸 <b>Compra N°9067</b> — 10 bolsas de Cemento de Uso General
        <br>
        🔸 <b>Compra N°9067</b> — 5 bolsas de Cemento de Uso Estructural
        <br>
        Entrega estimada: 28/08/2026
    `);

    await responder("¿Deseas realizar otra consulta?");

    escribir(`
        <div class="buttons">

            <button onclick="mostrarMenuFerreteria()">
                🏪 Menú ferretería
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

            <button onclick="consultarPuntosCanje()">
                🎁 Canjear puntos
            </button>

            <button onclick="mostrarMenuFerreteria()">
                🏪 Menú ferretería
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

            <button onclick="consultarPuntosCanje()">
                🎁 Otro canje
            </button>

            <button onclick="mostrarMenuFerreteria()">
                🏪 Menú ferretería
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
                SOY DISTRIBUIDOR
=========================================================*/

async function menuDistribuidor(){

    escribir("Soy distribuidor","user");

    await responder("Perfecto 👍");

    await responder("Para identificarte como distribuidor necesito registrar tus datos.");

    escribir(`
        Ingresa tu código de distribuidor.

        <div class="buttons">

            <button onclick="validarDistribuidor()">
                Ingresar código
            </button>

        </div>
    `);

}

/*=========================================================
                VALIDACIÓN DE DISTRIBUIDOR
=========================================================*/

async function validarDistribuidor(){

    escribir("4821","user");

    await responder("Validando datos del distribuidor...");

    mostrarTyping();

    await esperar(2000);

    ocultarTyping();

    await responder("Distribuidor identificado correctamente ✅");

    await responder(`
        👤 <b>Distribuidor:</b> Distribuidor JPerez
        <br>
        🏷 <b>Código:</b> DIST-4821
        <br>
        📍 <b>Zona:</b> Santa Cruz
    `);

    await mostrarMenuDistribuidor();

}

/*=========================================================
                MENÚ EXCLUSIVO DISTRIBUIDOR
=========================================================*/

async function mostrarMenuDistribuidor(){

    await responder("Este es tu menú exclusivo de distribuidor. ¿Qué deseas consultar?");

    escribir(`
        <div class="buttons">

            <button onclick="menuReporteVentas()">
                📊 Reporte de ventas diario
            </button>

            <button onclick="menuPedidosDistribuidor()">
                📦 Mis pedidos pendientes
            </button>

            <button onclick="menuPromocionesDistribuidor()">
                🎉 Promociones vigentes
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
                REPORTE DE VENTAS DIARIO
=========================================================*/

async function menuReporteVentas(){

    escribir("Reporte de ventas diario","user");

    await responder("Claro, puedo mostrarte el reporte de hoy o el de otra fecha que elijas.");

    escribir(`
        <div class="buttons">

            <button onclick="consultarVentasDia('Hoy')">
                📅 Ventas de hoy
            </button>

            <button onclick="pedirFechaVentas()">
                🗓 Elegir una fecha
            </button>

        </div>
    `);

}

/*=========================================================
                SELECCIONAR FECHA
=========================================================*/

function pedirFechaVentas(){

    escribir("Elegir una fecha","user");

    escribir(`
        Indícame la fecha que deseas consultar.

        <br><br>

        Formato: <b>DD/MM/AAAA</b>
        <br>
        Ejemplo: <b>15/08/2026</b>

        <div class="buttons">

            <button onclick="consultarVentasDia('15/08/2026')">
                Ingresar fecha
            </button>

        </div>
    `);

}

/*=========================================================
                CONSULTA DE VENTAS
=========================================================*/

async function consultarVentasDia(fecha){

    escribir(fecha === "Hoy" ? "Ventas de hoy" : fecha,"user");

    await responder("Consultando información de ventas...");

    mostrarTyping();

    await esperar(2500);

    ocultarTyping();

    const periodo = fecha === "Hoy" ? "Hoy, 17/08/2026" : fecha;

    await responder(`
        📊 <b>Reporte de ventas</b>

        <br><br>

        🗓 <b>Período:</b> ${periodo}
        <br>
        🧾 <b>Cantidad de ventas:</b> 18 pedidos
        <br>
        💰 <b>Monto total vendido:</b> Bs 12.450

        <br><br>

        Datos actualizados según el último corte del sistema.
    `);

    await responder("¿Deseas realizar otra consulta?");

    escribir(`
        <div class="buttons">

            <button onclick="menuReporteVentas()">
                📊 Consultar otra fecha
            </button>

            <button onclick="mostrarMenuDistribuidor()">
                📋 Menú distribuidor
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
                MIS PEDIDOS
=========================================================*/

async function menuPedidosDistribuidor(){

    escribir("Mis pedidos","user");

    await responder("Consultando tus pedidos pendientes por entregar...");

    mostrarTyping();

    await esperar(2200);

    ocultarTyping();

    await responder(`
        📦 <b>Pedidos pendientes por entregar</b>

        <br><br>

        🔸 <b>Pedido N°8452</b> — 20 bolsas de Cemento de Uso General
        <br>
        Entrega estimada: 18/08/2026

        <br><br>

        🔸 <b>Pedido N°8460</b> — 10 bolsas de Cemento de Uso Estructural
        <br>
        Entrega estimada: 19/08/2026

        <br><br>

        🔸 <b>Pedido N°8471</b> — 50 bolsas de Cemento de Uso Estructural
        <br>
        🔸 <b>Pedido N°8471</b> — 20 bolsas de Cemento de Uso General
        <br>
        Entrega estimada: 20/08/2026
    `);

    await responder("¿Deseas realizar otra consulta?");

    escribir(`
        <div class="buttons">

            <button onclick="mostrarMenuDistribuidor()">
                📋 Menú distribuidor
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
                PROMOCIONES VIGENTES
=========================================================*/

async function menuPromocionesDistribuidor(){

    escribir("Promociones vigentes","user");

    await responder("Estas son las promociones vigentes para distribuidores:");

    mostrarTyping();

    await esperar(2000);

    ocultarTyping();

    await responder(`
        🎉 <b>Promociones vigentes</b>

        <br><br>

        🔹 <b>2x1 en cemento</b> — Válido hasta 31/08/2026
        <br><br>

        🔹 <b>15% de descuento</b> en compras mayores a Bs 5.000
        <br><br>

        🔹 <b>Envío gratis</b> en pedidos dentro de la ciudad
    `);

    await responder("¿Deseas realizar otra consulta?");

    escribir(`
        <div class="buttons">

            <button onclick="mostrarMenuDistribuidor()">
                📋 Menú distribuidor
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
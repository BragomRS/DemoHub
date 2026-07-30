const messages = document.getElementById("messages");
const typing = document.getElementById("typing");
const status = document.getElementById("status");

function hora() {
    const d = new Date();
    return d.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

function scrollBottom() {
    messages.scrollTop = messages.scrollHeight;
}

function escribir(texto, tipo = "bot", botones = "") {

    const div = document.createElement("div");
    div.className = "message " + tipo;

    div.innerHTML = `
        <div class="bubble">
            ${texto}

            ${botones}

            <span class="time">
                ${hora()}
                ${tipo === "user" ? " ✔✔" : ""}
            </span>

        </div>
    `;

    messages.appendChild(div);

    scrollBottom();

}

function mostrarTyping() {

    typing.style.display = "block";

    status.innerHTML = "Escribiendo...";

    scrollBottom();

}

function ocultarTyping() {

    typing.style.display = "none";

    status.innerHTML = "En línea";

}

function esperar(ms) {

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}

async function responder(texto) {

    mostrarTyping();

    await esperar(1800);

    ocultarTyping();

    escribir(texto);

}

function iniciar() {

    escribir(
        `
Hola 👋<br><br>

Se ha generado tu pedido
<b>N°12345</b>.<br><br>

¿Es correcto este pedido?

<div class="buttons">

<button onclick="confirmar()">
Sí
</button>

<button onclick="rechazar()">
No
</button>

</div>

`
    );

}

async function confirmar() {

    escribir("Sí", "user");

    await responder("Perfecto 🎉");

    await responder("Estamos registrando la confirmación de tu pedido...");

    await responder("Tus puntos fueron acreditados correctamente.");

    await responder("¡Gracias por tu compra!🎉");

    await responder("Esperamos verte nuevamente 😊");

}

async function rechazar() {

    escribir("No", "user");

    await responder("Lamentamos el inconveniente.");

    await responder("Estamos notificando a un ejecutivo...");

    mostrarTyping();

    status.innerHTML = "Conectando con ejecutivo...";

    await esperar(2500);

    ocultarTyping();

    status.innerHTML = "Carlos - Ejecutivo";

    escribir(
        `👨 <b>Carlos</b><br><br>
Hola.

Mi nombre es Carlos y continuaré con tu atención.

¿Podrías indicarme qué dato del pedido es incorrecto?
`
    );

    escribir(
        `
<div class="buttons">

<button onclick="opcion('Cantidad incorrecta')">

Cantidad incorrecta

</button>

<button onclick="opcion('Producto incorrecto')">

Producto incorrecto

</button>

<button onclick="opcion('Otro problema')">

Otro problema

</button>

</div>
`
    );

}

async function opcion(texto){

    escribir(texto,"user");

    await responder("Gracias por la información.");

    await responder("Voy a revisar tu pedido.");

    await responder("Un momento por favor...");

}

function toggleProjectMenu(id){

    document.querySelectorAll(".project-dropdown")
    .forEach(menu=>{
        if(menu.id !== id){
            menu.style.display="none";
        }
    });


    let menu=document.getElementById(id);


    menu.style.display =
    menu.style.display==="block"
    ? "none"
    : "block";

}





function verProyecto(proyecto){

    cerrarMenus();

    console.log("Abriendo proyecto:", proyecto);

    // Aquí colocarás los enlaces de GitHub o documentación

}



function cerrarMenus(){

    document.querySelectorAll(".project-dropdown")
    .forEach(menu=>{
        menu.style.display = "none";
    });

}

document.addEventListener("click", function(event){

    // Verifica si el clic fue dentro de un botón o menú de proyecto
    const dentroDelMenu = event.target.closest(".project-item");

    // Si hizo clic fuera, cierra los selectores
    if(!dentroDelMenu){

        cerrarMenus();

    }

});

function iniciarFlujo1(){

    iniciar();

}


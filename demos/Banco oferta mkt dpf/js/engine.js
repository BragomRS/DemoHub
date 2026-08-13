/*
    ENGINE BASE DEL DEMO (WhatsApp simulado)

    Este archivo NO conoce el flujo de conversación de ningún proyecto en
    particular. Solo se encarga de la mecánica común: pintar mensajes,
    manejar el menú lateral, el input y el reinicio del demo.

    Cada proyecto define su propio flujo en su archivo flujo.js
    implementando estos dos "hooks" que el engine espera encontrar:

        function iniciarFlujo()           -> primer mensaje/opciones del bot
        function manejarEntradaUsuario(t)  -> procesa texto libre del input
                                              (return true si lo manejó)
*/

const chat = document.getElementById("chat");
const phone = document.getElementById("phone");
const flowView = document.getElementById("flowView");

/*
    TIEMPO DE RESPUESTA SIMULADO

    Devuelve un valor aleatorio (en ms) entre 1 y 2.5 segundos. Se usa en
    todos los setTimeout que preceden a un mensaje del bot para que la
    conversación no se sienta instantánea.
*/

function tiempoRespuesta() {

    return Math.floor(1000 + Math.random() * 1500);

}

/* MENÚ DEL PROYECTO */

function verFlujo() {

    phone.classList.add("hidden");
    flowView.classList.add("active");

}

/* AMPLIAR IMAGEN DEL FLUJO */

flowView.querySelector("img").addEventListener("click", () => {
    flowView.classList.toggle("expanded");
});

function iniciarDemo() {

    flowView.classList.remove("active");
    flowView.classList.remove("expanded");
    phone.classList.remove("hidden");

    chat.innerHTML = "";

    setTimeout(() => {

        iniciarFlujo();

    }, tiempoRespuesta());

}

/* REINICIAR DEMO */

function reiniciarDemo() {

    chat.innerHTML = "";

    setTimeout(() => {

        iniciarFlujo();

    }, tiempoRespuesta());

}

/* HORA */

function getCurrentTime() {

    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    minutes = minutes < 10 ? "0" + minutes : minutes;

    return `${hours}:${minutes}`;
}

/* CREAR MENSAJE */

function addMessage(text, type) {

    const message = document.createElement("div");

    message.classList.add("message", type);

    message.innerHTML = `
        ${text}
        <span class="time">${getCurrentTime()}</span>
    `;

    chat.appendChild(message);

    chat.scrollTop = chat.scrollHeight;
}

/* MENSAJE USUARIO */

function addUserMessage(text) {

    addMessage(text, "sent");

}

/* TIENES OTRAS CONSULTAS? */

function otraConsultaFlow() {

    setTimeout(() => {

        const message = document.createElement("div");

        message.classList.add("message", "received");

        message.innerHTML = `
            <b>¿Deseas realizar otra consulta?</b>

            <div class="option-buttons">

                <button onclick="nuevaConsultaFlow()">
                    ✅ Sí, tengo otra consulta
                </button>

                <button onclick="despedida()">
                    ❌ Terminar
                </button>

            </div>

            <span class="time">${getCurrentTime()}</span>
        `;

        chat.appendChild(message);

        chat.scrollTop = chat.scrollHeight;

    }, tiempoRespuesta());

}

/* DESPEDIDA */

function despedida() {

    setTimeout(() => {

        const message = document.createElement("div");

        message.classList.add("message", "received");

        message.innerHTML = `
            👋 Gracias por contactarte con nosotros.<br><br>

            <div class="option-buttons">

                <button onclick="reiniciarDemo()">
                    🔄 Reiniciar demo
                </button>

            </div>

            <span class="time">${getCurrentTime()}</span>
        `;

        chat.appendChild(message);

        chat.scrollTop = chat.scrollHeight;

    }, tiempoRespuesta());

}

/* INPUT NORMAL */

function sendMessage() {

    const input = document.getElementById("messageInput");

    const text = input.value.trim();

    if (text === "") return;

    addMessage(text, "sent");

    input.value = "";

    manejarEntradaUsuario(text);

}

/* ENTER */

document
    .getElementById("messageInput")
    .addEventListener("keypress", function (event) {

        if (event.key === "Enter") {
            sendMessage();
        }

    });

/* INICIO AUTOMÁTICO */

setTimeout(() => {

    iniciarFlujo();

}, tiempoRespuesta());

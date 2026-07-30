function verFlujo(proyecto){

    cerrarMenus();

    document.getElementById("messages").style.display="none";

    let flowView = document.getElementById("flowView");

    flowView.style.display="flex";

    if(proyecto === "flujo1"){

        flowView.innerHTML = `
            <img src="images/Confirmacion%20de%20pedido%20FLUJO1.png"
                 alt="Flujo 1">
        `;

    }

    if(proyecto === "flujo2"){

        flowView.innerHTML = `
            <img src="images/Consulta%20y%20gestion%20de%20puntos%20FLUJO2.png"
                 alt="Flujo 2">
        `;

    }

    if(proyecto === "flujo3"){

        flowView.innerHTML = `
            <img src="images/Cliente%20proactivo%20FLUJO3.png"
                 alt="Flujo 3">
        `;

    }

    const img = flowView.querySelector("img");

    img.addEventListener("click", ampliarImagen);

}

function verProyecto(proyecto){

    cerrarMenus();

    if(proyecto === "flujo1"){
        cargarFlujo(iniciarFlujo1);
    }

    if(proyecto === "flujo2"){
        cargarFlujo(iniciarFlujo2);
    }

    if(proyecto === "flujo3"){
        cargarFlujo(flujo3_iniciar);
    }

}

function ampliarImagen(event){

    const img = event.target;

    img.classList.toggle("expandida");

}


function ampliarImagen(){

    document
        .getElementById("flowView")
        .classList
        .toggle("expandido");

}
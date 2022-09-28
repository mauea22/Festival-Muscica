document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp() {
    crearGaleria();
}


function crearGaleria() {
    //constante que selecciona el div con la clase 'galeria-imagenes', para seleccionar esa clase usar el "."
    const galeria = document.querySelector('.galeria-imagenes');

    //
    for(let i = 1; i <= 12; i++){
        //creo los 12 tags picture para plasmar las imagenes
        const imagen = document.createElement('picture');

        imagen.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="/build/img/thumb/${i}.jpg" alt="imagen galeria">
        `;

        //cuando hago click en la imagen, esta callback manda a llamar a la funcion mostrarImagen() con el parametro i
        imagen.onclick = function () {
            mostrarImagen(i)
        }

        galeria.appendChild(imagen)
    }
}

//la funcion recisbe el parametro del numero de la foto o sea (i)
function mostrarImagen(id) {
    const imagen = document.createElement('picture');

    imagen.innerHTML = `
    <source srcset="build/img/grande/${id}.avif" type="image/avif">
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="/build/img/grande/${id}.jpg" alt="imagen galeria">
    `;

    //crea un div
    const overlay = document.createElement('div');
    //en este div inserta la imagen
    overlay.appendChild(imagen);
    //le damos una clase para configurar la vista
    overlay.classList.add('overlay');

    //? MOSTRAR EL DIV QUE CONTIENE LA IMAGEN EN EL BODY
    //tomamos el body mediante su etiqueta
    const body = document.querySelector('body');
    //insertamos en el body, el div que contiene la imagen
    body.appendChild(overlay);
}
document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp() {
    navegacionBarraFija();
    crearGaleria();
    scrollNav();
}

//? Fijar la barra de navegacion cuando hacemos scroll desde la seccion sobre-festival
function navegacionBarraFija() {
    //selecciono el header
    const barra = document.querySelector('.header');

    //sellecciono la seccion desde donde va a quedar fija la barra
    const sobreFestival = document.querySelector('.sobre-festival');

    //escucho el evento scroll
    window.addEventListener('scroll', function(){
        //datos de donde esta el elemento
        console.log(sobreFestival.getBoundingClientRect());
        //si el elemento esta en ese lugar
        if (sobreFestival.getBoundingClientRect().bottom < 0) {
            //agrego la clase 'fijo' al header mediante la variable barra
            barra.classList.add('fijo');
        } else {
            barra.classList.remove('fijo');
        }
    });
}

//? funcion scroll 
function scrollNav() {
    //selecciono todos los elementos (a) dentro de la clase .navegacion-principal
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    //itero sobre ellos 
    enlaces.forEach(enlace => {
        //escucho el evento click
        enlace.addEventListener('click', function(e){
            //prevengo el comportamiento por default
            e.preventDefault();

            //obtengo el value en una variable
            const seccionScroll = e.target.attributes.href.value;

            //selecciono ese href
            const seccion = document.querySelector(seccionScroll);

            //llamo al metodo scrollIntoView() y le paso el objeto con el par {behavior:'smooth'} que es el efecto deseado
            seccion.scrollIntoView({behavior:'smooth'})
        });
    });

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

    //? CREAR LA GALERIA
    // crea un div en la constante overlay
    const overlay = document.createElement('div');
    //en este div inserta la imagen
    overlay.appendChild(imagen);
    //le damos una clase para configurar la vista
    overlay.classList.add('overlay');
    overlay.onclick = function () {
        const body = document.querySelector('body');
        //remover la clase que deja el body sin scroll
        body.classList.remove('fijar-body')
        //eliminar el overlay
        overlay.remove()
    }

    //? MOSTRAR EL DIV QUE CONTIENE LA IMAGEN EN EL BODY
    //tomamos el body mediante su etiqueta
    const body = document.querySelector('body');
    //insertamos en el body, el div que contiene la imagen
    body.appendChild(overlay);
    
    //aplicar clase para sacar el scroll cuando esta la imagen abierta
    body.classList.add('fijar-body')


    //? cerrar el modal
    const cerrarModal = document.createElement('p');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');

    //cerrar la ventana modal
    cerrarModal.onclick = function () {
        const body = document.querySelector('body');
        //remover la clase que deja el body sin scroll
        body.classList.remove('fijar-body')
        //eliminar el overlay
        overlay.remove()
    }

    //agregamos al overlay el cerrarModal
    overlay.appendChild(cerrarModal);
}
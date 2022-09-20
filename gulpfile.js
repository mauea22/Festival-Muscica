/* function tarea( done) {
    console.log('Mi primer tarea');
    done();
}

exports.primerTarea = tarea; */

const {src, dest, watch, parallel} = require("gulp");

//css
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');

//imagenes
const webp = require('gulp-webp');


//? FUNCION QUE IDENTIFICA, COMPILA Y ALMACENA TODOS LOS ARCHIVOS SCSS A CSS

function css(done)  {
    // Identificar el archivo sass
    src('src/scss/**/*.scss') //los **/* hace que de forma recursiva se compilen todos los archivos scss
    .pipe(plumber())
    //compilarlo
    .pipe( sass())
    //almacena en el disco duro
    .pipe(dest('build/css'));

    done();//callback que avisa a gulp que llegamos al final
}

//? OBSERVA TODOS LOS ARCHIVOS SCSS Y LLAMA LA FUNCION (CSS)
function dev(done) {
    watch('src/scss/**/*.scss', css)

    done();
}


//? FUNCION PARA AUTOMATIZAR LA CONVERSION DE IMAGENES AL FORMATO WEBP

function versionWebp(done) {
    //opciones de calidad para las imagenes (va de 0 a 100)
    const opciones = {
        quality:50
    }

    //scr es la ruta donde estan todas las imagenes
    src('src/img/**/*.{jpg,png}')
    .pipe( webp(opciones)) //paso opciones como parametro para que toma la quality
    .pipe( dest('/build/img')) //destino donde se guardan las imagenes

    done() //avisa que la funcion terminó
}

exports.css = css;
exports.dev = parallel(versionWebp, dev); //paralell ejecuta las tareas en paralelo 
exports.versionWebp = versionWebp;
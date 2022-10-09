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
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');


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

//? FUNCION QUE IDENTIFICA LOS ARCHIVOS .JS
function javascript(done) {
    src('src/js/**/*.js')
        .pipe(dest('build/js'));
    done()
}

//? OBSERVA TODOS LOS ARCHIVOS SCSS Y LLAMA LA FUNCIÓN (CSS) y (javascript)
function dev(done) {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', javascript)

    done();
}


//? FUNCION PARA AUTOMATIZAR LA CONVERSION DE IMÁGENES AL FORMATO WEBP

function versionWebp(done) {
    //opciones de calidad para las imágenes (va de 0 a 100)
    const opciones = {
        quality:50
    }

    //scr es la ruta donde están todas las imágenes
    src('src/img/**/*.{jpg,png}')
    .pipe( webp(opciones)) //paso opciones como parámetro para que toma la quality
    .pipe( dest('build/img')) //destino donde se guardan las imagenes

    done() //avisa que la funcion terminó
}


//? FUNCION PARA ALIGERAR LAS IMAGENES

function imagenes(done){
    const opciones = {
        optimizationLevel: 3
    }
    //scr es la ruta donde estan todas las imagenes
    src('src/img/**/*.{jpg,png}')
    .pipe( cache(imagemin(opciones))) //paso opciones como parametro para que toma la quality
    .pipe( dest('build/img')) //destino 

    done()
}

function versionAvif(done){
    const opciones = {
        quality: 50
    }
    //scr es la ruta donde estan todas las imagenes
    src('src/img/**/*.{jpg,png}')
    .pipe( avif(opciones)) //paso opciones como parametro para que toma la quality
    .pipe( dest('build/img')) //destino 

    done()
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(versionAvif,imagenes,versionWebp,javascript, dev); //paralell ejecuta las tareas en paralelo 
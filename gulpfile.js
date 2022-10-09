/* function tarea( done) {
    console.log('Mi primer tarea');
    done();
}

exports.primerTarea = tarea; */

const {src, dest, watch, parallel} = require("gulp");

//css
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer'); //asegura el navegador que indiquemos
const cssnano = require('cssnano'); //comprime el código css
const postcss = require('gulp-postcss');  // transforma por medio de prefixer y cssnano
const sourcemaps = require('gulp-sourcemaps'); // genera un archivo que permite poder leer el css comprimido

//imágenes
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');

//JavaScript
const terser = require('gulp-terser-js');



//? FUNCIÓN QUE IDENTIFICA, COMPILA Y ALMACENA TODOS LOS ARCHIVOS SCSS A CSS

function css(done)  {
    // Identificar el archivo sass
    src('src/scss/**/*.scss') //los **/* hace que de forma recursiva se compilen todos los archivos scss
    .pipe(sourcemaps.init() )
    .pipe(plumber())
    //compilarlo
    .pipe( sass())
    .pipe( postcss([autoprefixer(),cssnano()]))
    //almacena en el disco duro
    .pipe(sourcemaps.write('.')) // escribe el archivo map de css
    .pipe(dest('build/css'));

    done();//callback que avisa a gulp que llegamos al final
}

//? FUNCIÓN QUE IDENTIFICA LOS ARCHIVOS .JS
function javascript(done) {
    src('src/js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));
    done()
}

//? OBSERVA TODOS LOS ARCHIVOS SCSS Y LLAMA LA FUNCIÓN (CSS) y (javascript)
function dev(done) {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', javascript)

    done();
}


//? FUNCIÓN PARA AUTOMATIZAR LA CONVERSION DE IMÁGENES AL FORMATO WEBP

function versionWebp(done) {
    //opciones de calidad para las imágenes (va de 0 a 100)
    const opciones = {
        quality:50
    }

    //scr es la ruta donde están todas las imágenes
    src('src/img/**/*.{jpg,png}')
    .pipe( webp(opciones)) //paso opciones como parámetro para que toma la quality
    .pipe( dest('build/img')) //destino donde se guardan las imágenes

    done() //avisa que la función terminó
}


//? FUNCIÓN PARA ALIGERAR LAS IMÁGENES

function imagenes(done){
    const opciones = {
        optimizationLevel: 3
    }
    //scr es la ruta donde están todas las imágenes
    src('src/img/**/*.{jpg,png}')
    .pipe( cache(imagemin(opciones))) //paso opciones como parámetro para que toma la quality
    .pipe( dest('build/img')) //destino 

    done()
}

function versionAvif(done){
    const opciones = {
        quality: 50
    }
    //scr es la ruta donde están todas las imágenes
    src('src/img/**/*.{jpg,png}')
    .pipe( avif(opciones)) //paso opciones como parámetro para que toma la quality
    .pipe( dest('build/img')) //destino 

    done()
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(versionAvif,imagenes,versionWebp,javascript, dev); //paralell ejecuta las tareas en paralelo 
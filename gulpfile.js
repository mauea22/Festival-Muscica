/* function tarea( done) {
    console.log('Mi primer tarea');
    done();
}

exports.primerTarea = tarea; */

const {src, dest, watch} = require("gulp");
const sass = require('gulp-sass')(require('sass'))

function css(done)  {
    // Identificar el archivo sass
    src('src/scss/app.scss')
    //compilarlo
    .pipe( sass())
    //almacena en el disco duro
    .pipe(dest('build/css'));

    done();//callback que avisa a gulp que llegamos al final
}

function dev(done) {
    watch('src/scss/app.scss', css)

    done();
}

exports.css = css;
exports.dev = dev;
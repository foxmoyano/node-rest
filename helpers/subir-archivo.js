const path = require('path');
const { v4: uuidv4 } = require('uuid');

const subirArchivo = ( files, extensionesValidas = ['jpg', 'jpeg', 'png', 'gif'], carpeta = '' ) => {
    return new Promise( (resolve, reject) => {        
        const { archivo } = files;
        const archivoCortado = archivo.name.split(".");    
        const extension = archivoCortado[ archivoCortado.length - 1 ]
        
        if ( !extensionesValidas.includes( extension ) ) {
            return reject(`La extension ${extension} no es permitida / ${extensionesValidas}`);
        }
    
        const nombreTemp = uuidv4() + '.' + extension;    
        const uploadPath = path.join( __dirname, '../uploads/', carpeta, nombreTemp);
    
        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }
    
            resolve( nombreTemp );            
        });    
    });
}

const obtenerPlaceHolder = () => {
    return path.join(__dirname, '../assets', 'no-Image.jpg');
}

module.exports = {
    subirArchivo,
    obtenerPlaceHolder
}
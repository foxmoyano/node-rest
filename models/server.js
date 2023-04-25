const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload = require('express-fileupload');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            usuarios:   '/api/users',
            categorias: '/api/categories',
            productos: '/api/products',
            busqueda: '/api/searchs',
            subidas: '/api/uploads'  
        };

        // Base Datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de la aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio público
        this.app.use( express.static('public') );

        this.app.use( fileUpload ({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuarios, require('../routes/user'));
        this.app.use(this.paths.categorias, require('../routes/categories'));
        this.app.use(this.paths.productos, require('../routes/products'));
        this.app.use(this.paths.busqueda, require('../routes/searchs'));
        this.app.use(this.paths.subidas, require('../routes/uploads'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running in port', this.port);
        });        
    }
}

module.exports = Server;
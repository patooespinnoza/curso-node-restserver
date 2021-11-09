const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {

    constructor(){
        this.app = express();
        this.port = 8080;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos'
        }


        //conectar a db
        this.conectarDB();

        //Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }

    async conectarDB(){
        
        try {
            await dbConnection();
        } catch (error) {
            throw new Error ('Error a la hora de lanzar la bd');
        }

    }


    routes(){

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));

    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("servidor corriendo en puerto", this.port);
        });
    }

    middlewares(){
        //CORS
        this.app.use(cors());

        // Parseo y lectura BODY
        this.app.use(express.json());

        //Directorio Publico
        this.app.use(express.static('public'));


    }
}

module.exports = Server;
const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

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

        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));

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
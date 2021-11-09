const mongoose = require('mongoose');

const dbConnection = async() => {
    
    try {

        await mongoose.connect("mongodb+srv://user_node_cafe:VwhvqT587J2LQrqb@miclustercafe.zrc9u.mongodb.net/cafeDB", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        } );

        console.log('Base De Datos Redy');

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }


}

module.exports = {
    dbConnection
}
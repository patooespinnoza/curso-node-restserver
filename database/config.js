const mongoose = require('mongoose');

const dbConnection = async() => {
    
    try {

// <<<<<<< HEAD
        // await mongoose.connect("mongodb+srv://user_node_cafe:VwhvqT587J2LQrqb@miclustercafe.zrc9u.mongodb.net/cafeDB", {
// =======
        await mongoose.connect( 'mongodb+srv://user_node_cafe:VwhvqT587J2LQrqb@miclustercafe.zrc9u.mongodb.net/cafeDB', {
// >>>>>>> cbb566aeb7196759603797dfc04a59e20b4a7e4c
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
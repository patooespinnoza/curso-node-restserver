const jwt = require('jsonwebtoken');


const generarJWT = (uid = '') => {

    return new Promise((resolve, reject) => {
        
        const payload = { uid };

<<<<<<< HEAD
        jwt.sign(payload, "eST03SMyPub1ck3y23", {
=======
        jwt.sign(payload, 'eST03SMyPub1ck3y23@913', {
>>>>>>> cbb566aeb7196759603797dfc04a59e20b4a7e4c
            expiresIn: '4h'
        }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        })


    })

}

module.exports = {
    generarJWT
}
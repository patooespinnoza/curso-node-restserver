const jwt = require('jsonwebtoken');


const generarJWT = (uid = '') => {

    return new Promise((resolve, reject) => {
        
        const payload = { uid };

        jwt.sign(payload, "eST03SMyPub1ck3y23", {
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
const {OAuth2Client} = require('google-auth-library');

const client = new OAuth2Client('503853083731-mip5jojj2tt1lb0978b4mpoo379303sa.apps.googleusercontent.com');

const googleVerify = async( idToken = '') => {

  const ticket = await client.verifyIdToken({
      idToken,
      audience: '503853083731-mip5jojj2tt1lb0978b4mpoo379303sa.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const { name : nombre, picture : img, email : correo } = payload;
  const userid = payload['sub'];

  return {nombre, img, correo};
}

module.exports = {
    googleVerify
}
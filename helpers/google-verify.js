// const {OAuth2Client} = require('google-auth-library');

<<<<<<< HEAD
// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
=======
const client = new OAuth2Client('503853083731-mip5jojj2tt1lb0978b4mpoo379303sa.apps.googleusercontent.com');
>>>>>>> cbb566aeb7196759603797dfc04a59e20b4a7e4c

// const googleVerify = async( idToken = '') => {

<<<<<<< HEAD
//   const ticket = await client.verifyIdToken({
//       idToken,
//       audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
//       // Or, if multiple clients access the backend:
//       //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//   });
//   const payload = ticket.getPayload();
//   const { name : nombre, picture : img, email : correo } = payload;
//   const userid = payload['sub'];
=======
  const ticket = await client.verifyIdToken({
      idToken,
      audience: '503853083731-mip5jojj2tt1lb0978b4mpoo379303sa.apps.googleusercontent.com',  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();
  const { name : nombre, picture : img, email : correo } = payload;
  const userid = payload['sub'];
>>>>>>> cbb566aeb7196759603797dfc04a59e20b4a7e4c

//   return {nombre, img, correo};
// }

// module.exports = {
//     googleVerify
// }
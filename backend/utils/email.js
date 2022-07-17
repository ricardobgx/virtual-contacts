const sgMail = require("@sendgrid/mail");

async function sendEmailVerification(
  SENDGRID_API_KEY,
  HOST,
  PORT,
  token,
  toEmail,
  fromEmail
) {
  sgMail.setApiKey(SENDGRID_API_KEY);

  const msg = {
    to: toEmail,
    from: fromEmail,
    subject: "Verificação de e-mail",
    text: "Clique no botão abaixo para verificar seu e-mail",
    html: `
      <div style="display: flex; flex-direction: column; width: 350px; height: max-content; color: #ffffff; background: #757bc8; border-radius: 10px; padding: 20px; margin: 0 auto;">
      <h2 style="font-size: 25px; margin-bottom: 15px; text-align: center; font-family: sans-serif; box-sizing: border-box;">Email verification</h1>
      <p style="color: #ffffff; margin: 10px 0 30px 0; text-align: center; font-size: 15px; font-family: sans-serif; box-sizing: border-box;">
        This is a verification email for the account you created in the Contacts
        app, click the button below to activate your account
      </p>
      <a
      style="text-align: center; padding: 10px 50px; text-decoration: none; color: #757bc8; background: #ffffff; border-radius: 5px; font-size: 15px; font-family: sans-serif; box-sizing: border-box;"
        href="${HOST}/users/verify?token=${token}"
        >Verify email</a
      >
    </div>
      `,
  };

  sgMail
    .send(msg)
    .then(() => {
      console.log("E-mail enviado");
    })
    .catch((error) => {
      console.error(error);
    });
}

function verificationEmailPage(responseMessage, responseColor, iconCode) {
  const template = `
        <!DOCTYPE html>
        <html lang="pt-br">
          <head>
            <meta charset="utf-8" />
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width,initial-scale=1.0" />
            <link
              href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
              rel="stylesheet"
            />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link
              href="https://fonts.googleapis.com/css2?family=Secular+One&display=swap"
              rel="stylesheet"
            />
            <style>
              * {
                margin: 0;
                padding: 0;
              }
              div {
                display: flex;
                flex-direction: column;
                min-height: 100vh;
                justify-content: center;
                align-items: center;
                color: ${responseColor};
              }
              h2 {
                font-family: 'Secular One', sans-serif;
                font-size: 1.85rem;
                font-weight: lighter;
                margin-bottom: 15px;
              }
              p {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 50px;
                height: 50px;
                color: #ffffff;
                background: ${responseColor};
                border-radius: 50%;
              }
              span {
                font-size: 40px;
              }
            </style>
            <title>Contacts - Verificação de e-mail</title>
          </head>
          <body>
            <div>  
              <h2>${responseMessage}</h2>
              <p><span class='material-icons-outlined'>${iconCode}</span></p>
            </div>
          </body>
        </html>
      `;

  return template;
}

module.exports = {
  sendEmailVerification,
  verificationEmailPage,
};

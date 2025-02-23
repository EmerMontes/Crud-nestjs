import * as nodemailer from 'nodemailer' 

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
});
   
export const  recoverPasswordEmail = async (email: string, link: string) => {

    await transporter.sendMail({
        from: `BROERS ${process.env.EMAIL}`,
        to: email,
        subject: "Recover password",
        html: `
        <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Envio de correo Electronico con NestJS</title>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@600&display=swap"
            rel="stylesheet" />
          <style>
            html {
              height: 100%;
            }
            body {
              position: absolute;
              bottom: 0;
              right: 0;
              font-family: "Instrument Sans", sans-serif;
            }
            .content {
              top: 0;
              margin: 0 auto;
              width: 90%;
              height: 100vh;
              background-color: #f2f4f8;
            }
            .logo {
              position: absolute;
              bottom: 0;
              right: 0;
              margin: 10px;
              width: 150px;
              margin-right: 50px;
            }
            h1 {
              color: #22b5a0;
              padding: 30px 5px;
            }
            h3 {
              text-align: center;
            }
            section {
              padding: 5px 50px;
            }
            p {
              text-align: justify;
              color: #666 !important;
            }
            hr {
              border: 1px solid #eee;
            }
            .btn-blue {
           display: inline-block;
           padding: 12px 24px;
           background-color: #1e88e5;
           color: white;
           font-family: Arial, sans-serif;
           font-size: 16px;
           font-weight: 500;
           text-decoration: none;
           border-radius: 6px;
           border: none;
           cursor: pointer;
           transition: all 0.3s ease;
           box-shadow: 0 2px 5px rgba(0,0,0,0.2);
           text-align: center;
           min-width: 120px;
         }
         
         .btn-blue:hover {
           background-color: #1565c0;
           box-shadow: 0 4px 8px rgba(0,0,0,0.3);
           transform: translateY(-2px);
         }
         
         .btn-blue:active {
           transform: translateY(1px);
           box-shadow: 0 1px 3px rgba(0,0,0,0.2);
         }
          </style>
        </head>
        <body>
          <div class="content">
          
            <h1 style="text-align: center">
              BROERS
              <hr />
            </h1>
    
            <section>
              <h3>
                This email is for you to retrieve your password, please do not share.
              </h3>
              <br />
              <a href=${link} class="btn-blue">Click Here!</a>
            </section>
    
           <img
            class="logo"
            src="https://www.broers.com.co/wp-content/uploads/2024/10/Logo-Eslogan-Horizontal-Black-105.png"
            alt="broers-Viera Logo" />
    
          </div>
        </body>
      </html>`
      });
}


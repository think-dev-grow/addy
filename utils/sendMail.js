var { SendMailClient } = require("zeptomail");
const date = require("date-and-time");

const url = "api.zeptomail.com/";
const token =
  "Zoho-enczapikey wSsVR61w/xT1Xah0lDD8Lr86kQhQA130EEV/31en4yL6Hf7Ep8dvlUHOBAauSKUYRDVsFTBHoOgpmxYHh2Bcidwpn1ACDiiF9mqRe1U4J3x17qnvhDzOX2VfkRuKLokAxghtn2hmGsEk+g==";

let client = new SendMailClient({ url, token });

const today = new Date();

//Verification mail
const sendVerificationMail = (to, value) => {
  client
    .sendMail({
      bounce_address: "NOREPLY@bounce.ardilla.africa",
      from: {
        address: "noreply@ardilla.africa",
        name: "Ardilla",
      },
      to: [
        {
          email_address: {
            address: `${to}`,
            name: "",
          },
        },
      ],
      subject: "Email verifaction",
      htmlbody: `<body style="background-image: url(https://i.postimg.cc/mk1r2tHZ/Backgrounds-3.png); width: 1440px; height: 1032; margin-top: -2px;background-size:cover;padding-bottom: 50px;">
      <img style="width: 104.06px;height: 38.77px; margin-left:740.47px; margin-top: 77px;" src="https://i.postimg.cc/NjcpQcYP/Logo-1.png" alt="Logo">
      <hr style="width: 743px;top:77.77px;color: gray/300;margin-left: 425px;margin-top: 39.09px;border: 1px solid #D1D5DB">
      <img style="margin-top: 70px; margin-left: 740.47px;" src="https://i.postimg.cc/GtXGRFmK/Mask-group.png" alt="illustration">
      <h3 style="margin-top: 25.64px;margin-left: 710px;font-family: 'ubuntu',sans-serif;font-size: 40px;line-height: 52.16px;color: #4B5563;width: 233px;left: 200px;font-style: normal;">Hi Matthew,</h3>
      <p style="width: 633px;line-height: 26.08px;font-size: 20px;font-weight: 500;font-family: 'ubuntu',sans-serif;text-align: center;margin-left: 510px;color:#4B5563;">Welcome to Ardilla! Your number one wealth-building platform.<br>
  
          <br>At Ardilla, we did the hard work, so you don’t have to because we believe wealth building should be easy for everyone.<br>

          ${value}
          
          <br>Continue your wealth-building journey on our app. We have got you covered.
      </p>
      <p style="color: #4B5563;font-family: 'ubuntu',sans-serif;font-style: normal;font-size: 19.96px;font-weight: 500;line-height: 26.02px;margin-top: 83px;margin-left: 790px;"">Have Fun</p>
      <p style="color: #4B5563;width: 141px;height: 26px;font-size: 18.2px;font-weight: 600;line-height: 26px;margin-left: 760px;">The Ardilla Team</p>
      <p style="width: 374px;font-size: 17.86px;color: #6B7280;font-weight: 500;font-family: 'ubunt',sans-serif;height: 25px;font-style: normal;margin-left: 655px;">Copyright © 2022 Ardilla. All rights reserved.</p>
  </body>`,
    })
    .then((resp) => console.log("success", resp))
    .catch((error) => console.log("error", error));
};

//Reset password mail
const resetPassword = (to, name, username, token) => {
  client
    .sendMail({
      bounce_address: "NOREPLY@bounce.ardilla.africa",
      from: {
        address: "noreply@ardilla.africa",
        name: "Ardilla",
      },
      to: [
        {
          email_address: {
            address: `${to}`,
            name: `${username}`,
          },
        },
      ],
      subject: "Reset password",
      htmlbody: `<table
      cellSpacing="0"
      cellPadding="0"
      style="background-color: #F2F2F2; border: 1px solid #eee; width: 100%;"
    >
      <tbody>
        <tr>
          <td>
            <div style="background-color: #fff; border: 1px solid #eee; border-bottom: 4px solid #027EE6; box-sizing: border-box; font-family: Lato, Helvetica, 'Helvetica Neue', Arial, 'sans-serif'; padding: 40px 50px; margin: 40px auto; max-width: 600px;  width: 600px;">
              <div style="display: flex; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 20px; margin-bottom: 30px;">
                <div style="background-image: url(https://static.zohocdn.com/zeptomail/assets/images/resetPwd.35d5b474ceb78229f2a4.svg); background-repeat: no-repeat; background-position: center; height: 40px; width: 40px; margin-right: 10px;"></div>
                <h4 style="font-weight: normal; font-size: 24px; margin: 0;">
                  Password Reset Instructions
                </h4>
              </div>
              <h2 style="color: #253745; font-size: 20px; font-weight: normal; margin: 0; margin-bottom: 30px;">
                Hi
               ${name},
              </h2>
              <p style="color: #253745; font-size: 14px; margin: 0; margin-bottom: 30px; line-height: 22px;">
                You have requested for a password reset for your
                <strong>Ardilla</strong>
                account with the KodeHex
                <strong>${username}.</strong>
              </p>
              <p style="color: #253745; font-size: 14px; margin: 0; line-height: 22px;">
                Click on the below link to reset your password.
              </p>
              <a
                href="https://ardilla.herokuapp.com/ardilla/api/auth/reset-password/${token}"
                style="border: none; border-radius: 4px; color: #fff; cursor: pointer; display: inline-block; font-size: 16px; padding: 15px 30px; background-color: #027EE6; text-decoration: none; margin: 25px 0;"
              >
                Password Reset
              </a>
              <p style="color: #253745; font-size: 14px; margin: 0; margin-bottom: 30px; line-height: 22px;">
                This link will only be valid for the next
                <strong>24 hours.</strong>
                If you did not initiate the password reset, ignore this email.
              </p>
              <p style="color: #253745; font-size: 14px; margin: 0; margin-bottom: 30px; line-height: 22px;">
                If you'd like to know more about
                <span style="color: #027EE6;">Ardilla</span>
                or want to get in touch with us, get in touch with our customer
                support team.
              </p>
              <p style="color: #253745; font-size: 14px; margin: 0; margin-bottom: 30px; line-height: 22px;">
                If you're looking for immediate help, take a look at our help
                documentation and view our latest updates in our blog.
              </p>
              <p style="color: #253745; font-size: 14px; margin: 0; line-height: 22px;">
                Thank you.
              </p>
              
            </div>
          </td>
        </tr>
      </tbody>
    </table>`,
    })
    .then((resp) => console.log("success", resp))
    .catch((error) => console.log("error", error));
};

//complete profile mail
const sendCompleteProfile = (to, name) => {
  client
    .sendMail({
      bounce_address: "NOREPLY@bounce.ardilla.africa",
      from: {
        address: "noreply@ardilla.africa",
        name: "Ardilla",
      },
      to: [
        {
          email_address: {
            address: `${to}`,
            name: `${name}`,
          },
        },
      ],
      subject: "Profile completeion",
      htmlbody: `<table
      cellSpacing="0"
      cellPadding="0"
      style="background-color: #F2F2F2; border: 1px solid #eee; width: 100%;"
    >
      <tbody>
        <tr>
          <td>
          <div style="background-color: #fff; border: 1px solid #eee;  box-sizing: border-box; font-family: Lato, Helvetica, 'Helvetica Neue', Arial, 'sans-serif'; padding: 40px 50px; margin: 40px auto; max-width: 600px;  width: 600px;">
              <div style="display: flex; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 20px; margin-bottom: 30px;">

             

                <div style="text-align: center;">

                <img src="https://i.postimg.cc/wBWk35pJ/Logo-copy.png" alt=""  style="padding: 30px 0px; width: 120px;">

                <hr>
                <br>

                <img src="https://i.postimg.cc/rmtXJNqX/illustration.png " alt="" style="width: 100px">
                
                <h4 style="font-weight: normal; font-size: 24px; margin: 0;">
                   Hi ${name}
                  </h4>
                 
                 
                  <h6 style="color: #041D05; font-size: 18px; font-weight: 500; line-height: 26px; margin-top: 20px;">
                  Welcome to Ardilla! Your number one wealth-building platform.

                  At Ardilla, we did the hard work, so you don’t have to because we believe wealth building should be easy for everyone.
                  
                  Continue your wealth-building journey on our app. We have got you covered.
                  </h6>
                 
                  <h3 style="color: #041D05; font-size: 19px; font-weight: 600; line-height: 26px; margin-top: 70px;">
                  Have fun
                  </h3>
                  <h3 style="color: #041D05; font-size: 19px; font-weight: 600; line-height: 26px; margin-top: 70px;">- The Ardilla Team</h3>
                  <small style="color: #041D05; font-size: 17px; font-weight: 500; line-height: 26px;  margin-top: 20px;">Copyright © 2022 Ardilla. All rights reserved </small>
                </div>
              
              
              
              </div>
                
         </td>
        </tr>
      </tbody>
    </table>
      `,
    })
    .then((resp) => console.log("success", resp))
    .catch((error) => console.log("error", error));
};

const ceoMail = (to, name) => {
  client
    .sendMail({
      bounce_address: "NOREPLY@bounce.ardilla.africa",
      from: {
        address: "noreply@ardilla.africa",
        name: "Ardilla",
      },
      to: [
        {
          email_address: {
            address: `${to}`,
            name: `${name}`,
          },
        },
      ],
      subject: "CEO of Ardilla",
      htmlbody: `<table
      cellSpacing="0"
      cellPadding="0"
      style="background-color: #F2F2F2; border: 1px solid #eee; width: 100%;"
    >
      <tbody>
        <tr>
          <td>
          <div style="background-color: #fff; border: 1px solid #eee; box-sizing: border-box; font-family: Lato, Helvetica, 'Helvetica Neue', Arial, 'sans-serif'; padding: 40px 50px; margin: 40px auto; max-width: 600px;  width: 600px;">
              <div style="display: flex; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 20px; margin-bottom: 30px;">

             

                <div style="text-align: center;">

                <img src="https://i.postimg.cc/wBWk35pJ/Logo-copy.png" alt=""  style="padding: 30px 0px; width: 120px;">

                <hr>
                <br>

                <img src="https://i.postimg.cc/rmtXJNqX/illustration.png " alt="" style="width: 100px">
                
                <h4 style="font-weight: normal; font-size: 24px; margin: 0;">
                   Hi ${name}
                  </h4>

                  <p>My name is Onyinye Cheryl Dallas, the CEO of Ardila.</p>
                 
                 
                  <h6 style="color: #041D05; font-size: 18px; font-weight: 500; line-height: 26px; margin-top: 20px;">
                 
Having you on board the Ardila community means so much to the team. We are eager to help you start your journey to building wealth.

Freedom means different things to everyone, but at Ardila, it means making smart financial decisions today so that we live tomorrow without restrictions.

There are quite a number of tools on the Ardila platform, including savings, investments, and financial education, that allows you take charge of your future now.
                  </h6>
                 
                  <h3 style="color: #041D05; font-size: 19px; font-weight: 600; line-height: 26px; margin-top: 30px;">
                  I look forward to your journey. I am sure it will be great.
                  </h3>

                  <h3 style="color: #041D05; font-size: 19px; font-weight: 600; line-height: 26px;">Please do not hesitate to contact our team if you need assistance. We are available to you 24/7.</h3>


                  <h3 style="color: #041D05; font-size: 19px; font-weight: 600; line-height: 26px; margin-top: 70px;">- The Ardilla Team</h3>
                  <small style="color: #041D05; font-size: 17px; font-weight: 500; line-height: 26px;  margin-top: 20px;">Copyright © 2022 Ardilla. All rights reserved </small>
                </div>
              
              
              
              </div>
                
         </td>
        </tr>
      </tbody>
    </table>
      `,
    })
    .then((resp) => console.log("success", resp))
    .catch((error) => console.log("error", error));
};

const supportMail = (to, name) => {
  client
    .sendMail({
      bounce_address: "NOREPLY@bounce.ardilla.africa",
      from: {
        address: "noreply@ardilla.africa",
        name: "Ardilla",
      },
      to: [
        {
          email_address: {
            address: `${to}`,
            name: `${name}`,
          },
        },
      ],
      subject: "Glad to have you onboard",
      htmlbody: `<table
      cellSpacing="0"
      cellPadding="0"
      style="background-color: #F2F2F2; border: 1px solid #eee; width: 100%;"
    >
      <tbody>
        <tr>
          <td>
          <div style="background-color: #fff; border: 1px solid #eee;  box-sizing: border-box; font-family: Lato, Helvetica, 'Helvetica Neue', Arial, 'sans-serif'; padding: 40px 50px; margin: 40px auto; max-width: 600px; width: 600px;">
              <div style="display: flex; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 20px; margin-bottom: 30px;">

             

                <div style="text-align: center;">

                <img src="https://i.postimg.cc/wBWk35pJ/Logo-copy.png" alt=""  style="padding: 30px 0px; width: 120px;">

                <hr>
                <br>

                <img src="https://i.postimg.cc/rmtXJNqX/illustration.png " alt="" style="width: 100px">
                
                <h4 style="font-weight: normal; font-size: 24px; margin: 0;">
                   Hi ${name}
                  </h4>

                  <p>Welcome to Ardila, the pathway to financial freedom.<br/>
                  What you can expect from Ardilla?</p>


                  <p style="color: #041D05; font-size: 40px; font-weight: 700; line-height: 76px; margin-top: 20px;">Saving</p>
                 
                 
                  <h6 style="color: #041D05; font-size: 18px; font-weight: 500; line-height: 26px; margin-top: 10px;">
                 
                  We help you save your money daily, weekly, or monthly. No pressure. We work at your pace.
                  </h6>

                  <p style="color: #041D05; font-size: 40px; font-weight: 700; line-height: 76px; margin-top: 20px;">Investment</p>
                 
                 
                  <h6 style="color: #041D05; font-size: 18px; font-weight: 500; line-height: 26px; margin-top: 10px;">
                 
                  We provide multiple, easy to understand investment opportunities for you. Yes, saving is great but investing is so much better.
                  </h6>

                  <p style="color: #041D05; font-size: 40px; font-weight: 700; line-height: 76px; margin-top: 20px;">Financial literacy</p>
                 
                 
                  <h6 style="color: #041D05; font-size: 18px; font-weight: 500; line-height: 26px; margin-top: 10px;">
                 
                  At Ardilla, we believe financial freedom begins with the right information. Ardila offers wealth-building tips from great financial minds to help you get to where you need to be.
                
                  </h6>


                  <p> To enjoy your Ardilla experience, log in and complete your KYC.</p>


                 
              
                  <h3 style="color: #041D05; font-size: 19px; font-weight: 600; line-height: 26px;">I am …….. Your customer support personnel. Don't hesitate to click on contact if you need help.</h3>


                  <h3 style="color: #041D05; font-size: 19px; font-weight: 600; line-height: 26px; margin-top: 70px;">- The Ardilla Team</h3>
                  <small style="color: #041D05; font-size: 17px; font-weight: 500; line-height: 26px;  margin-top: 20px;">Copyright © 2022 Ardilla. All rights reserved </small>
                </div>
              
              
              
              </div>
                
         </td>
        </tr>
      </tbody>
    </table>
      `,
    })
    .then((resp) => console.log("success", resp))
    .catch((error) => console.log("error", error));
};

const loginMail = (to, name, devicePlat, deviceOs, city, countryCode) => {
  client
    .sendMail({
      bounce_address: "NOREPLY@bounce.ardilla.africa",
      from: {
        address: "noreply@ardilla.africa",
        name: "Ardilla",
      },
      to: [
        {
          email_address: {
            address: `${to}`,
            name: `${name}`,
          },
        },
      ],
      subject: "New device log in",
      htmlbody: `<table
      cellSpacing="0"
      cellPadding="0"
      style="background-color: #F2F2F2; border: 1px solid #eee; width: 100%;"
    >
      <tbody>
        <tr>
          <td>
          <div style="background-color: #fff; border: 1px solid #eee;  box-sizing: border-box; font-family: Lato, Helvetica, 'Helvetica Neue', Arial, 'sans-serif'; padding: 40px 50px; margin: 40px auto; max-width: 600px; width: 600px;">
              <div style="display: flex; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 20px; margin-bottom: 30px;">

             

                <div style="text-align: center;">

                <img src="https://i.postimg.cc/wBWk35pJ/Logo-copy.png" alt=""  style="padding: 30px 0px; width: 120px;">

                <hr>
                <br>
                
                 
                  <img src="https://i.postimg.cc/rmtXJNqX/illustration.png " alt="" style="width: 100px">

                  <h6 style="color: #041D05; font-size: 16px; font-weight: 500; line-height: 26px; margin-top: 20px;">
                  We noticed a new sign-in to your account using ${devicePlat} on ${deviceOs} at ${today}  in ${city},${countryCode},If you signed in recently, no need to worry, you can disregard this message.
                  </h6>

                  <h6 style="color: #041D05; font-size: 16px; font-weight: 500; line-height: 26px; margin-top: 10px;">If that wasn't you or you don't recognize this sign-in, we strongly recommend that you change your password as soon as possible and do not hesitate to contact us if you need any further assistance.</h6>
                
                  
                  <h3 style="color: #041D05; font-size: 16px; font-weight: 600; line-height: 26px; margin-top: 70px;">- The Ardilla Team</h3>
                  <small style="color: #041D05; font-size: 14px; font-weight: 500; line-height: 26px;  margin-top: 20px;">Copyright © 2022 Ardilla. All rights reserved </small>
                </div>

               
              
              
              
              </div>
                
         </td>
        </tr>
      </tbody>
    </table>
      `,
    })
    .then((resp) => console.log("success", resp))
    .catch((error) => console.log("error", error));
};

module.exports = {
  sendVerificationMail,
  resetPassword,
  sendCompleteProfile,
  ceoMail,
  supportMail,
  loginMail,
};

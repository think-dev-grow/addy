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
      htmlbody: `<html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="CEO.css">
          <title>CEO Profile mail</title>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Ubuntu">
       <style>
          body{background-image: url(img/Backgrounds\ .svg);background-size: cover;height: 2351px;width: 1440px;top: -2px;}
      
          .Logo{width: 104.06px;height: 38.77px;margin-left:760.47px;margin-top: 77px;}
      
          .line-1{width: 743px;top:77.77px;color: gray/300;margin-left: 420px;margin-top: 39.09px;border: 1px solid #D1D5DB;}
      
          .Text-1{width: 233px;height: 39px;top: 166px;margin-top:88.23px;font-size: 30px;font-weight: 500;font-family: 'ubuntu',sans-serif;color: #4B5563;line-height: 130.4px;font-style: normal;text-align: center;margin-left:415.67px;}
      
          #container-1{display: flex;flex-direction: row;}

         
      
          .Frame-1{ width: 284..44px;height: 234px;top: 52px;margin-top: 136px;margin-left: 375.45px;}
      
          #Text-2{width: 488px;height: 234px;top: 52px;font-size: 20px;line-height: 26.08px;font-weight: 500;color:#4B5563;font-style: normal;font-family: 'ubuntu',sans-serif;margin-left: 44px;margin-top: 136px;}
      
          #Mask{top: -5px;left: 367px;margin-left:-120px;margin-top:90px;}
      
          #container-2{display: flex;flex-direction: row;}
      
          .Text-3{top: 68.5px;font-size: 20px;line-height: 26.08px;font-weight: 500;font-family: 'ubuntu',sans-serif;text-align: left;color: #4B5563;font-style: normal;margin-left:370.45px;margin-top:138.5px}
      
          .Frame-2{width: 292.34px;height: 241px;left: 539px;margin-left: 51px;margin-top: 70px;}
      
          .Text-4{width: 586px;height: 78px;top: 10px;font-weight: 500;line-height: 26.08px;text-align: center;color: #4B5563;margin-top: 80px;font-size: 20px;font-family: normal;text-align: center;margin-left: 490px; font-family: 'ubuntu',sans-serif;}
      
          #container-3{display:flex;background-image: url(img/Background\ 2.svg);background-color: #3D0072;width: 693px;height:225.63px;border-radius: 11.94px;margin-left: 430px;margin-top: 61px;}
      
          .Text-5{width: 238.16px;font-weight: 700;color: #FFFFFF;font-size: 25px;font-style: normal;padding-top: 35px;padding-left: 45px;font-family: Arial, Helvetica, sans-serif;}
      
          .button-1{background-color: #FFFFFF;color: #3D0072;height: 29.25px;border-radius: 4.78px;padding: 15px,20px;gap: 5.97px; align-items: center;border: none;cursor: pointer;margin-left: 45px;}
      
          .button-1:hover{background-color: lightseagreen;}
      
          .phone{width: 257.76px;height: 157.6px;top: 10px;padding-top: 68px;margin-left: 90px;}
      
          .Text-6{width: 389px;font-size: 16px;height: 18px;font-weight: 500;font-family: 'ubuntu',sans-serif;text-align: center;line-height: 18px;color: gray/600;margin-left: 620px;margin-top: 55px;}
      
          #icon{margin-left: 745.48px;left: 294.5px;width: 120px;height: 30px;display: flex;flex-direction: row;margin-top: 45px;} 
          
          .linkedin{padding-left: 20px;}
          
          .twitter{padding-left: 20px;}
      
          .Text-7{color: #4B5563;width: 709px;height: 72px;top: 170px;font-size: 16px;font-weight: 500;line-height: 24px;margin-left: 450px;margin-top: 60.02px;text-align: center;font-family: 'ubuntu',sans-serif;}
      
          .Text-8{width: 374px;font-size: 17.86px;color: #6B7280;font-weight: 500;font-family:Arial, Helvetica, sans-serif;height: 25px;font-style: normal;margin-left: 740px;margin-top: 136px;}
      
          .Text-9{width: 374px;height: 25px;top: 50.79;font-size: 17.86px;line-height: 20.52px;font-style: normal;color: gray/500;font-family:'ubuntu',sans-serif;margin-top: 24.79px;margin-left: -130px;font-weight: 500;padding-bottom: 20px;}
       </style>
           </head>
      <body>
          
          <img class="Logo" src="img/Logo.svg" alt="Logo">
          
          <hr class="line-1">
          <p class="Text-1">Hi Mathew,</p>
          ${value}
          <div id="container-1">
              <img class="Frame-1" src="img/Frame 1.svg" alt="Frame-1">
              <div>
              <div id="Text-2">
              
                 <h3 style="color: black">My name is Onyinye Cheryl Dallas,
                  <br>CEO of Ardilla.<br></h3>
      
                  <p><b><br>Having you on board in the Ardilla community means<br> so much to the team. We are eager to help you start
                  <br> your journey to building wealth.<br>
                  Freedom means different things to everyone, but at<br> Ardilla, it means making smart financial decisions<br> today so that we live tomorrow without restrictions.</p>
                 </div>
              </div> 
              <div id="Mask">
                  <img src="img/Mask group (1).svg" alt="Mask">
              </div>       
          </div>
          <div id="container-2">
              <p class="Text-3">
               <b> There are quite a number of tools on the Ardilla<br> platform, including savings, investments, and<br> financial education, that allows you take charge of<br> your future now.
              </p>
              <img class="Frame-2" src="img/Frame 2.svg" alt="Frame-2">
          </div>
          <p class="Text-4">
              <b>I look forward to your journey. I am sure it will be great. Please<br> do not hesitate to contact our team if you need assistance. We are available to you 24/7.
          </p>
      
          <div id="container-3">
              <div>
                  <h3 class="Text-5">Download for free Start saving Today</h3>
                  <input class="button-1" type="button" value="Download for free">
              </div>
                  <img class="phone" src="img/Phone .svg" alt="Phone">
          </div>
          <h3 class="Text-6"><b>Ardilla, 33B, Ogundana street, Allen, Ikeja, Lagos</h3>
          <div id="icon">
              <a href="#"><img  class="facebook" src="img/Facebook logo.svg" alt="Facebook-icon"></a>
              <a href="#"><img class="linkedin" src="img/linkedin logo.svg" alt="Linkedin-icon"></a>
              <a href="#"><img class="twitter" src="img/twitter logo.svg" alt="Twitter-icon"></a>
           </div>
               <h3 class="Text-7"><b>You are receiving this message because you signed up on Ardilla.  If you would like to stop<br> receiving tips on financial literacy, you can opt out by clicking unsubscribe. For more <br>information about how we process data please see our Privacy Policy </h3>
             
      
          <h3 class="Text-8"><b>The Ardilla Team<h3p>
          <p class="Text-9">Copyright © 2022 Ardilla. All rights reserved.</p>
          
          
      </body>
      </html>`,
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

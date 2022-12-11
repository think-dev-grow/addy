var { SendMailClient } = require("zeptomail");
const date = require("date-and-time");

const url = "api.zeptomail.com/";
const token =
  "Zoho-enczapikey wSsVR61w/xT1Xah0lDD8Lr86kQhQA130EEV/31en4yL6Hf7Ep8dvlUHOBAauSKUYRDVsFTBHoOgpmxYHh2Bcidwpn1ACDiiF9mqRe1U4J3x17qnvhDzOX2VfkRuKLokAxghtn2hmGsEk+g==";

let client = new SendMailClient({ url, token });

// profile comp.
// ceo mail
// reset pass (name , username)  href="https://ardilla.herokuapp.com/ardilla/api/auth/reset-password/${token}
//new device login

//  <a

// style="border: none; border-radius: 4px; color: #fff; cursor: pointer; display: inline-block; font-size: 16px; padding: 15px 30px; background-color: #027EE6; text-decoration: none; margin: 25px 0;"
// >
// Password Reset
// </a>

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
      htmlbody: `<table
      cellSpacing="0"
      cellPadding="0"
      style="background-image: url(https://i.postimg.cc/g0B05pW5/background-6.png); border: 1px solid #eee; width: 100%;"
    >
      <tbody>
        <tr>
          <td>

          <div style=background-image: url(https://i.postimg.cc/pXgHF8bN/Background-2.png); border: 1px solid #eee;  box-sizing: border-box; font-family: Lato, Helvetica, 'Helvetica Neue', Arial, 'sans-serif'; padding: 40px 50px; margin: 40px auto; max-width: 600px;  width: 600px;">

            <div style="display: flex; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 20px; margin-bottom: 30px;">

              <div style="text-align: center;">

                <img src="https://i.postimg.cc/wBWk35pJ/Logo-copy.png" alt=""  style="padding: 30px 0px; width: 120px;">

                <hr>
                <br>

                <img src="https://i.postimg.cc/rmtXJNqX/illustration.png " alt="" style="width: 100px">

                <h6 style="color: #041D05; font-size: 18px; font-weight: 500; line-height: 26px; font-family: 'Ubuntu'; margin-top: 20px;">Please use the OTP code below to complete your account setup:</h6>

                <p style="color: #041D05; font-size: 38px; font-weight: 500; line-height: 76px; font-family: 'Ubuntu'; margin-top: 20px;">${value}</p>

                <h3 style="color: #041D05; font-size: 19px; font-weight: 600; line-height: 26px; font-family: 'Ubuntu'; margin-top: 70px;">- The Ardilla Team</h3>

                <small style="color: #041D05; font-size: 17px; font-weight: 500; line-height: 26px; font-family: 'Ubuntu'; margin-top: 20px;">Copyright © 2022 Ardilla. All rights reserved </small>

              </div>
              
            </div>

          </div>         
              </td>
            </tr>
          </tbody>
        </table>`,
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
      style="background-image: url(https://i.postimg.cc/g0B05pW5/background-6.png); border: 1px solid #eee; width: 100%;">
      <tbody>
        <tr>
          <td>
            
            <div style="background-image: url(https://i.postimg.cc/pXgHF8bN/Background-2.png); border: 1px solid #eee; box-sizing: border-box; font-family: 'ubuntu',sans-serif; padding: 90px 50px; margin: 40px auto; max-width: 600px;  width: 600px;">
              <div style="display: flex; align-items: center; padding-bottom: 285px; margin-bottom: 30px;"> 
             
                <div class="text-center" style="height: 493.78570556640625px; width: 633px; margin-top: -75px;">
                  
                  <img style="width: 104.06px;height: 38.77px; margin-top: 70px;" src="https://i.postimg.cc/NjcpQcYP/Logo-1.png" alt="Logo">
                  <hr style="color: gray/300;margin-top: 39.09px;border: 1px solid black">
                  <img style="margin-top: 40px;" src="https://i.postimg.cc/GtXGRFmK/Mask-group.png" alt="illustration">
                  <p style="margin-top: 38.79px; height: 93px;top: 344.32px; font-weight: 500;font-size: 16.71px; color: gray/600;font-family: 'ubuntu',sans-serif;text-align: center;">We received a password reset request from your account. If you  did not make this request, please contact our customer support team at hello@ardilla.africa or call 01345261<br> 
                    <br> Click the button below to reset your password:
                  </p>
                 <a href="https://ardilla.herokuapp.com/ardilla/api/auth/reset-password/${token}" style="width: 377.36px; height: 55.98px; border-radius: 93.3px;padding: 10.19px;gap: 10.19px;background-color: #8807F7; justify-content: center;align-items: center; font-size: 15.55px; line-height: 17.87px;font-weight: 700;font-family: 'ubuntu',sans-serif;margin-top: 50.68px;border: none; color: white;cursor: pointer; text-decoration: none;" >Reset password</a>
                 
                 <p style=" height: 94px; left: 116px;font-weight: 500;font-family: 'ubuntu',sans-serif;text-align: center;font-size: 16.71px;color:#4B5563;font-style: normal;margin-top: 41px;">Please note that this link will expire after 1hour.<br><br>Thank you for choosing ardilla. Your access to More butter, More bread, & More money
                 </p>
                  <p style="color: #4B5563;height: 26px;font-size: 14.2px;font-weight: 600; margin-top: 45px; ">The Ardilla Team</p>
                  <p style="font-size: 12.86px;color: #6B7280;font-weight: 500;font-family: 'ubuntu',sans-serif;height: 25px;font-style: normal; margin-top: 25px;">Copyright © 2022 Ardilla. All rights reserved.</p>

 
                  
                 
   
                </div>

              
              </div>
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
      style="background-image: url(https://i.postimg.cc/g0B05pW5/background-6.png); border: 1px solid #eee; width: 100%; padding-bottom: 25px;">
      <tbody>
        <tr>
          <td>
          
            <div style="background-image: url(https://i.postimg.cc/pXgHF8bN/Background-2.png); border: 1px solid #eee; box-sizing: border-box; font-family: 'ubuntu',sans-serif; padding: 90px 50px; margin: 40px auto; max-width: 600px;  width: 600px;">
              <div style="display: flex; align-items: center; padding-bottom: 190px; margin-bottom: 30px;"> 
             
                <div class="text-center" style="height: 493.78570556640625px; width: 633px; margin-top: -75px;">
                 
                  <img style="width: 104.06px;height: 38.77px; margin-top: 70px;" src="https://i.postimg.cc/NjcpQcYP/Logo-1.png" alt="Logo">
                  <hr style="color: gray/300;margin-top: 39.09px;border: 1px solid black">
                  <img style="margin-top: 40px;" src="https://i.postimg.cc/GtXGRFmK/Mask-group.png" alt="illustration">
                  <h3 style="margin-top: 25.64px;font-family: 'ubuntu',sans-serif;font-size:20px;color: #4B5563; font-weight:600;font-style: normal;">Hi ${name},</h3>
                  <p style="font-size: 16px;font-weight: 500;font-family: 'ubuntu',sans-serif;text-align: center;color:#4B5563; margin-top: 41px;">Welcome to Ardilla! Your number one wealth-building platform.<br>

                    <br>At Ardilla, we did the hard work, so you don’t have to because we believe wealth building should be easy for everyone.<br>
                    
                    <br>Continue your wealth-building journey on our app. We have got you covered.
                 </p>
                  <p style="color: #4B5563;font-family: 'ubuntu',sans-serif;font-style: normal;font-size: 16px;font-weight: 500;margin-top: 30px;"">Have Fun</p>
                  <p style="color: #4B5563;height: 26px;font-size: 14.2px;font-weight: 600;line-height: 26px; margin-top: 28px;">The Ardilla Team</p>
                  <p style="font-size: 12.86px;color: #6B7280;font-weight: 500;font-family: 'ubunt',sans-serif;height: 25px;font-style: normal; margin-top: 20px;">Copyright © 2022 Ardilla. All rights reserved.</p>

 
                 
                 
   
                </div>

              
              </div>
              </div>
          </td>
        </tr>
      </tbody>
    </table>`,
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
      htmlbody: `  <table
      cellSpacing="0"
      cellPadding="0"
      style="background-image: url(https://i.postimg.cc/g0B05pW5/background-6.png); border: 1px solid #eee; width: 100%; padding-bottom: 25px;">
      <tbody>
        <tr>
          <td>
         
            <div style="background-image: url(https://i.postimg.cc/pXgHF8bN/Background-2.png); border: 1px solid #eee; box-sizing: border-box; font-family: 'ubuntu',sans-serif; padding: 90px 50px; margin: 40px auto; max-width: 600px;  width: 600px;">
              <div style="display: flex; align-items: center; padding-bottom: 750px; margin-bottom: 30px;"> 
             
                <div class="text-center" style="height: 493.78570556640625px; width: 633px; margin-top: -75px;">
                
                  <img style="width: 104.06px;height: 38.77px; margin-top: 70px;" src="https://i.postimg.cc/NjcpQcYP/Logo-1.png" alt="Logo">
                  <hr style="color: gray/300;margin-top: 39.09px;border: 1px solid black">
                  <p style="margin-top:88.23px;font-size: 20px;font-weight: 500;font-family: 'ubuntu',sans-serif;color: #4B5563; text-align:justify">Hi ${name},</p>
                  <div style="display: flex;flex-direction: row; justify-content: center;align-items: center;">
                        <img style=" width: 190px; height:150px;" src="https://i.postimg.cc/vTvKrNHz/Frame-388.png" alt="Frame-1">
                    
                            <div style="font-size: 15px;font-weight: 500;color:#4B5563;font-family: 'ubuntu',sans-serif;margin-top: 57px;">
                            
                                <h3 style="color: black;font-size: 15px;"><b>My name is Onyinye Cheryl Dallas,
                                    <br>CEO of Ardilla.</h3>
                                 
                                    <p style=" padding-left: 25px; font-size: 12px; text-align: left; ">Having you on board in the Ardilla community means so much to the team. We are eager to help you start
                                    your journey to building wealth.<br>
                                    Freedom means different things to everyone, but at Ardilla, it means making smart financial decisions today so that we live tomorrow without restrictions.</p>     
                            </div>
                           <div >
                              <img width="90px" height="90px" style="margin-top: -127px;" src="https://i.postimg.cc/HLJdwKPH/Mask-group-1.png" alt="Mask"> 
                           </div>
                  </div>
    
                  <div style="display: flex;flex-direction: row; ">
                    <p style="font-size: 12px;font-weight: 500;font-family: 'ubuntu',sans-serif;text-align: left;color: #4B5563;margin-top:70px">
                     <b> There are quite a number of tools on the Ardilla platform, including savings, investments, and <br> financial education, that allows you take charge of your future now.
                    </p>
                    <div style="float: inline-end;">
                       <img width="170px" height="160px" style="margin-top: 35px;" src="https://i.postimg.cc/6QC1xf8n/Frame-407.png" alt="Frame-2">
                    </div>
                  </div>
                  <p style="font-weight: 500;text-align: center;color: #4B5563;margin-top: 60px;font-size: 13px;font-family: normal;font-family: 'ubuntu',sans-serif;">
                   <b>I look forward to your journey. I am sure it will be great. Please do not hesitate to contact our team if you need assistance. We are available to you 24/7.</p>
                  <div style="display:flex;flex-direction: row;align-items: center; background-image: url(https://i.postimg.cc/zBXmdhV5/Background-4.png);background-color: #3D0072;width: 503px;height:140.63px;border-radius: 11.94px;margin-top: 30px; text-align: center;">
                      <div>
                          <h3 style="font-weight: 700;color: #FFFFFF;font-size: 18px;font-style: normal;padding-top: 26px;padding-left:35px;font-family: Arial, Helvetica, sans-serif; text-align: left;">Download for free<br> Start saving Today</h3>
                          <input style=" font-size:13px;height: 29.25px; background-color: #FFFFFF;color: #3D0072;border-radius: 4.78px;padding: 20px,30px;border: none;cursor: pointer;"  type="button" value="Download for free">
                      </div>
                          <img  width="180px" height="90px" style="margin-top: 50px; margin-left: 90px;" src="https://i.postimg.cc/nzY4Lsks/Phone.png" alt="Phone">
                  </div> 
                  <h3 style="font-size: 13px;font-weight: 500;font-family: 'ubuntu',sans-serif;text-align: center;color: gray/600;margin-top: 30px;"><b>Ardilla, 33B, Ogundana street, Allen, Ikeja, Lagos</h3>
                    <div style="display: flex;flex-direction: row;margin-top: 40px; justify-content: center; align-items: center;" >
                        <a href="#"><img  src="https://i.postimg.cc/GhQbjbMk/Facebook-logo.png" alt="Facebook-icon"></a>
                        <a href="#"><img style="padding-left: 15px;"  src="https://i.postimg.cc/8cZnjXHr/linkedin-logo.png" alt="Linkedin-icon"></a>
                        <a href="#"><img style="padding-left: 15px;"  src="https://i.postimg.cc/pX9BfdVS/twitter-logo.png" alt="Twitter-icon"></a>
                     </div>
    
                    <h3 style="color: #4B5563;font-size: 13px;font-weight: 500;margin-top: 60.02px;text-align:center;font-family: 'ubuntu',sans-serif;"><b>You are receiving this message because you signed up on Ardilla.  If you would like to stop receiving tips on financial literacy, you can opt out by clicking unsubscribe. For more information about how we process data please see our Privacy Policy </h3>
       
                
                  <p style="color: #4B5563;height: 26px;font-size: 14.2px;font-weight: 600;line-height: 26px; margin-top: 28px; text-align: center;">The Ardilla Team</p>
                  <p style="font-size: 12.86px;color: #6B7280;font-weight: 500;font-family: 'ubunt',sans-serif;height: 25px;font-style: normal; margin-top: 20px;text-align: center;">Copyright © 2022 Ardilla. All rights reserved.</p>
    
    
      
                 
    
                </div>
    
              
              </div>
              </div>
          </td>
        </tr>
      </tbody>
      </table>`,
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
      style="background-image: url(https://i.postimg.cc/g0B05pW5/background-6.png); border: 1px solid #eee; width: 100%;">
      <tbody>
        <tr>
          <td>
      
            <div style="background-image: url(https://i.postimg.cc/pXgHF8bN/Background-2.png); border: 1px solid #eee; box-sizing: border-box; font-family: 'ubuntu',sans-serif; padding: 90px 50px; margin: 40px auto; max-width: 600px;  width: 600px;">
              <div style="display: flex; align-items: center; padding-bottom: 285px; margin-bottom: 30px;"> 
             
                <div class="text-center" style="height: 493.78570556640625px; width: 633px; margin-top: -75px;">
               
                  <img style="width: 104.06px;height: 38.77px; margin-top: 70px;" src="https://i.postimg.cc/NjcpQcYP/Logo-1.png" alt="Logo">
                  <hr style="color: gray/300;margin-top: 39.09px;border: 1px solid black">
                  <img style="margin-top: 40px;" src="https://i.postimg.cc/GtXGRFmK/Mask-group.png" alt="illustration">
                  <p style="margin-top: 64px; height: 93px;top: 344.32px; font-weight: 500;font-size: 16.71px; color: gray/600;font-family: 'ubuntu',sans-serif;text-align: center;"> 
                  We noticed a new sign-in to your account using ${devicePlat} on ${deviceOs} at ${today}  in ${city},${countryCode}, If you signed in recently, no need to worry, you can disregard this message.<br><br>If that wasn't you or you don't recognize this sign-in, we strongly recommend that you change your password as soon as possible and do not hesitate to <a href="#" style="color: #4B5563;">contact us</a> if you need any further assistance.</p>
                  
                 <input style="width: 377.36px; height: 55.98px; border-radius: 93.3px;padding: 10.19px;gap: 10.19px;background-color: #8807F7; justify-content: center;align-items: center; font-size: 15.55px; line-height: 17.87px;font-weight: 700;font-family: 'ubuntu',sans-serif;margin-top: 150px;border: none; color: white;cursor: pointer;" type="button" value="Change Your Password">
                 
                  <p style="color: #4B5563;height: 26px;font-size: 14.2px;font-weight: 600; margin-top: 45px; ">The Ardilla Team</p>
                  <p style="font-size: 12.86px;color: #6B7280;font-weight: 500;font-family: 'ubuntu',sans-serif;height: 25px;font-style: normal; margin-top: 25px;">Copyright © 2022 Ardilla. All rights reserved.</p>
      
      
                
                 
      
                </div>
      
              
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

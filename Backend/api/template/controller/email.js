
var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//   service: 'gmail',

//   auth: {
//     user: "zouhairbegdar98@gmail.com",
//     pass: "Parkour@@2061"
//   }
// });

var transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ca9fa94c9ab547",
    pass: "38b106ff674f48"
  }
});

module.exports = email = {
  mail: (emailto) =>
  {
    console.log("emailto", emailto);
    var mailOptions = {
      from: 'credit.maroc@gmail.com',
      to: emailto.email,
      subject: emailto.subject,
      html: `<h2>Hello ${emailto.fullName}  :: ${emailto.subject}</h2>
              Go to <a href="http://localhost:3001/compte">Your compte</a>
                <p>${emailto.subject}</p>`,
      
      
    };

transporter.sendMail(mailOptions, function (error, info)
{
  if (error)
  {
    console.log("error mok",error);
  } else
  {
    console.log('Email sent: ' + info.response);
  }
});
  },
};




// var transporter = nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "ca9fa94c9ab547",
//     pass: "38b106ff674f48"
//   }
// });


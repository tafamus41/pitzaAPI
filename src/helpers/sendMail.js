"use strict"
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// sendMail(to, title, message):

//* EMAIL * NODEMAILER
// $ npm i nodemailer
// https://www.nodemailer.com/

const nodemailer = require('nodemailer')

module.exports = function (to, title, message) {

    // Create a new Test Account (fake email):
    // nodemailer.createTestAccount().then((data => console.log(data)))
    /*
    {
      user: 'exoe2cg3fxqstvtf@ethereal.email',
      pass: 'Dz5ArmcywUcbjTVHY2',
      smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },
      imap: { host: 'imap.ethereal.email', port: 993, secure: true },
      pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },
      web: 'https://ethereal.email',
      mxEnabled: false
    }
    */

    // // Connection to MailServer/SMTP:
    // const transporter = nodemailer.createTransport({
    //   // SMTP:
    //   host: 'smtp.ethereal.email',
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: 'exoe2cg3fxqstvtf@ethereal.email',
    //     pass: 'Dz5ArmcywUcbjTVHY2'
    //   }
    // })
    // // console.log(transporter)

    // // SendMail:
    // transporter.sendMail({

    //   from: 'exoe2cg3fxqstvtf@ethereal.email', // Yazılması mecburi değil.
    //   to: 'qadir@clarusway.com', // 'abc@xyz.com, def@xyz.com'
    //   subject: 'Hello', // Mail başlığı
    //   text: 'Hello there. How are you?', // Mail içeriği (Düz metin)
    //   html: '<h2>Hello there.</h2> <p>How are you?</p>', // Mail içeriği (Düz metin)

    // }, function(error, success) {

    //   success ? console.log('SUCCESS:', success) : console.log('ERROR:', error)

    // })

    //* GoogleMail (gmail.com)
    //* Google -> AccountHome -> Security -> Two-Step-Verify -> App-Passwords
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'qadir@clarusway.com',
        pass: 'fqky kolp zjdq aozd'
      }
    })

    //* YandexMail (yandex)
    // const transporter = nodemailer.createTransport({
    //     service: 'yandex',
    //     auth: {
    //         user: 'test@yandex.com',
    //         pass: '11' // your email-password
    //     }
    // })

    transporter.sendMail({

      from: 'qadir@clarusway.com', // tavsiye: gönderen mail adresinin from içinde belirtilmesidir.
      to: to, // 'abc@xyz.com, def@xyz.com'
      subject: title, // Mail başlığı
      text: message, // Mail içeriği (Düz metin)
      html: message, // Mail içeriği (Düz metin)

    }, function(error, success) {
      success ? console.log('SUCCESS:', success) : console.log('ERROR:', error)
    })

}
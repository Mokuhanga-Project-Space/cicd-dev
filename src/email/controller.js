const nodemailer = require('nodemailer')

let transporter = undefined

function init(config) {
    transporter = nodemailer.createTransport(config.mail)
}

async function confirmApllication(toAddress, name) {
    try {
        console.log("mail sent")
        return
        await transporter.sendMail({
            from: 'info@mokuhangaprojectspace.com',
            to: toAddress,
            bcc: "matt@loumagnuson.com, info@mokuhangaprojectspace.com, takemoto@whitman.edu, lbsealey@icloud.com",
            subject: "Application Recieved for " + name,
            text: `
            Thank you so much for your application to the 2020 Mokuhanga Project Space Workshop.
            We will be contacting your in the coming months with the result of your application.

            Sincerly,
            MPS
            `
        })
    }
    catch (error) {
        console.log(error)
    }
}

exports.confirmAplication = confirmApllication
exports.init = init
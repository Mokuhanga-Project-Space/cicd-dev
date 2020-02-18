const nodemailer = require('nodemailer')

let transporter = undefined

function init(config) {
    transporter = nodemailer.createTransport(config.mail)
}

async function confirmApllication(toAddress, name) {
    try {
        await transporter.sendMail({
            from: 'info@mokuhangaprojectspace.com',
            to: toAddress,
            bcc: "matt@loumagnuson.com, info@mokuhangaprojectspace.com, takemoto@whitman.edu, lbsealey@icloud.com",
            subject: "Application Received for " + name,
            html: `
            <p> Thank you so much for your application to the 2020 Mokuhanga Project Space Workshop. </p>
            <p> We will be contacting you March 2nd with the result of your application and further instructions. </p>
            <br>
            Sincerely,
            <br>
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
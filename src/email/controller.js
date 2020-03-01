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
            subject: "Waitlist Registration Received for " + name,
            html: `
            <p> Thank you so much for your registration to the 2020 Mokuhanga Project Space Workshop waitlist. </p>
            <p> Should a position become available, you will be contacted straightaway. </p>
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
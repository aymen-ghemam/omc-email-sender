require('dotenv').config();
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');
const receivers = require('./list.json');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const emailString = fs.readFileSync('./email.html');
if(!emailString) throw new Error('error reading email template');
const template = handlebars.compile(emailString + "");
const alreadySent = [];
const failed = [];
send();

async function send() {
    let retry = 0;
    let count = 0;
    while (count < receivers.length && retry < 7) {
        const member = receivers[count];
        if(alreadySent.includes(member.email.toLocaleLowerCase())) {
            count++;
            continue;
        }; 
        try {
            const res = await transporter.sendMail({
                from: process.env.SENDER,
                to: member.email,
                subject: process.env.SUBJECT,
                html: template({
                    name: member.name 
                    ? member.name.
                        toLowerCase()
                        .replace(/./, (x) => x.toUpperCase())
                        .replace(/[^']\b\w/g, (y) => y.toUpperCase())
                    : ""
                }),
            });
            if(!res || !res.accepted.length){
                throw new Error("Error sending to: ", member.email);
            }
            console.log("sent to ", member.email);
            alreadySent.push(member.email.toLocaleLowerCase());
            count++;
        } catch (error) {
            console.log(`${retry+1} retry sending to: , ${member.email}`);
            retry++;
        }
    }

    if (retry > 6) {
        console.log("\n\nFailed!");
        return;
    }
    console.log("\n\nAll good!");
}
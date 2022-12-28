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

async function send(){
    for(member of receivers){
        if(alreadySent.find(e => e === member.email.toLocaleLowerCase())) continue; 
        try {
            await transporter.sendMail({

                // ################################
                from: 'OpenMindsClub',
                to: member.email,
                subject: "SUBJECT!",
                html: template({
                    // DATA TO REPLACE IN THE TEMPLATE
                    name: member.name 
                }),

                // IF YOU HAVE ATTACHEMENTS
                attachments: [
                    // {
                    //   filename: "filename.pdf",
                    //   path: __dirname + `/attachements/${member.filename}.pdf`,
                    // },
                ],
                // ################################

            });
            alreadySent.push(member.email.toLocaleLowerCase());

        } catch (error) {
            console.log("Failed: " + member.email);
            failed.push(member);
        }
        if(!failed.length) {
            console.log('All good !');
            return;
        }
        fs.writeFileSync('./failed.json', failed);
        console.log(`\nSome emails couldn't be sent! check the file: failed.json`);
        console.log(`You can copy the content of failed.json to list.json and run the script again.`);
    }
}
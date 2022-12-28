# Email Sender
### Installation
After cloning the repo run:
```bash
npm install
```
### Configure
Create a `.env` file like the following:
```
SMTP_EMAIL="openmindsclub@gmail.com"
SMTP_PASSWORD="gmail_app_password"
```
### Run
```bash
npm start
```

### What to replace !
- Edit `email.html` template with your content.
- In `index.js` edit the code between `############`
- To add attachements:
    ```
    attachments: [
        {
           filename: "filename.pdf",
           path: 'full path or url of the file',
        },
    ],
    ```
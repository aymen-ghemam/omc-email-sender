# Email Sender
### Installation
After cloning the repo run:
```bash
npm install
```
### Configure
Create a `.env` file like the following:
```
SMTP_EMAIL="email@gmail.com"
SMTP_PASSWORD="gmail_app_password"

# Sender name
SENDER = "OpenMindsClub"
# Subject of the email
SUBJECT = "Subject"
```
### Run
```bash
npm start
```

### What to replace !
- Edit `email.html` template with your content.
- To add attachements:
    ```
    attachments: [
        {
           filename: "filename.pdf",
           path: 'full path or url of the file',
        },
    ],
    ```

- Add the list of receivers to `list.json`:
    ```
    [
        {
        "email": "example1@example.com",
        "name": "Soy Dev1"
        },
        {
        "email": "example2@example.com",
        "name": "Soy Dev2"
        }
    ]
    ```
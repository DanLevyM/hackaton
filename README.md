# Wired Beauty - MEAN Project for 2022 Hackaton

## Frontend - Angular

ng serve
localhost://4200

## Backend - NodeJS MongoDB Express

npm start

## Mailer Mailtrap.io + nodemailer

To register, a user has to do a request through our register form which send a mail to the admin. In the dashboard the admin can accept or not the client/tester request to create an account.

### Data fixtures

- In backend:
  Create fixtures: node seeder -i
  Delete fixtures: node seeder -d

- Creds to log as:
  Admin: admin1@gmail.com - pwdpwd
  Client: client1@gmail.com - pwdpwd
  Tester: tester1@gmail.com - pwdpwd

All features are working but

- You can not test the forgot password as the reset password email is sent to mailtrap. We will do a demo in our presentation movie.
- Same issue for register a new member

const loginModel = require('../../models/dashboard');
const nodemailer = require('nodemailer');
const UIDGenerator = require('uid-generator');
const uidgen = new UIDGenerator();
var _ = require('lodash');
// const mailer = require('pug-mailer');
var xoauth2 = require('xoauth2');

module.exports = () => {
    return {
        login: (req, res) => {

            loginModel.find({ 'email': req.body.email }, (err, data) => {

                if (err) {
                    res.status(400).send(err);
                }
                else {

                    if (data.length == 0) {
                        res.status(401).send('invalid email');
                    } else {
                        if (data[0].password != req.body.password) {
                            res.status(401).status('invalid password');
                        }
                        else {
                            res.status(200).send({'data': data[0].name,'id': data[0].id});
                        }
                    }

                }

            });
        },
        register: (req, res) => {

            loginModel.find({ 'email': req.body.email }, function (err, data) {
                if (data.length) {
                    res.status(400).send('email exists already');

                } else {

                    if (data.length == 0) {

                        loginModel.create(req.body, (err, registerdata) => {
                            if (err) {
                                res.status(400).send(err);
                            }
                            else {

                                res.status(200).send(data);

                            }

                        });
                    }

                }
            });


        },
        forgotPassword: (req, res) => {

            loginModel.find({ 'email': req.body.email }, (err, data) => {
              
                if (err) {
                  
                    res.status(500).send(err);
                } else if (_.isEmpty(data)) {
                    
                    res.status(401).send('Invalid email')
                } else {
                    const generatedUid = uidgen.generateSync();
                    loginModel.findOneAndUpdate({ 'email': req.body.email }, { $set: { password: generatedUid } }, (err, result) => {
                        if (err) {
                           
                            res.status(500).send(err);
                        } else {
                            
                            var transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: 'salonikotharicitm@gmail.com',
                                    pass: 'sai@ram12345'
                                }
                            });

                            var mailOptions = {
                                from: 'salonikotharicitm@gmail.com',
                                to: req.body.email,
                                subject: 'Application New Password ',
                                text: 'You have forgot the password for login.Please use below password to login '+ ' ' + generatedUid
                                 


                            };

                            transporter.sendMail(mailOptions, function (error, info) {
                                if (error) {
                                    res.status(400).send(err);
                                 
                                } else {
                                   
                                    res.send("email successfully sent");
                                }
                            })
                        }
                    });
                }
            });


        },
        getAll: (req, res) => {

            loginModel.find({}, (err, data) => {
              
                if (err) {
                    res.status(400).send(err);
                }
                else {
                    res.status(200).send(data);
                }

            });
        },
        changePassword:(req,res) =>{

            loginModel.findById({'_id': req.params.id}, (err, oldPass) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    if (oldPass.password != req.body.password) {
                        res.status(400).send('Password mismatch')
                    } else {
                        loginModel.findByIdAndUpdate({'_id': req.params.id}, {"$set":{"password":req.body.newpassword}}, (err, data) => {
                            if (err) {
                                res.status(500).send(err);
                            } else {
                                res.status(200).send({'message': 'updated successfully'});
                            }    
                        });    
                    }
                }
            })
   
          
        }


    }
}


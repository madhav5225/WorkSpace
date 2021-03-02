const axios = require('axios');
const jwt = require('jsonwebtoken');
const { sha256, generateKeyPair, createCipherAes } = require('../Encryption.js/encryption');

const activationController = async (req, res) => {
    const token = req.query.token;
    console.log(token);
    if (token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, async (err, decodedData) => {
            if (err) {
                console.log('Activation error: ' + err);
                return res.send("Error Verifying token");
            }
            else {
                const { email, name, gender, password } = decodedData;
                const passPhrase = await sha256(email + password);
                const { public_key,private_key } = await generateKeyPair();
                console.log("passPhrase: "+passPhrase);
                console.log("public: "+ public_key);
                console.log("private: "+ private_key);
                
                const encrypted_private_key=createCipherAes(passPhrase,private_key);
                console.log("encrypted private key: " + encrypted_private_key);

                axios({
                    method:'post',
                    url: process.env.CLIENT_URL + '/register',
                    data: {
                        email: email,
                        name: name,
                        gender: gender,
                        password: password,
                        encrypted_private_key:encrypted_private_key,
                        public_key:public_key
                    },
                    headers: {
                        'Content-Type' : 'application/json'
                    }
                })
                    .then(async (response) => {
                        if (response.data.msg === "success") {

                            req.session.user = response.data.user;
                          
                            req.session.passPhrase=passPhrase;
                            return res.redirect('/dashboard');
                        }
                        else {
                            return res.send(response.data.msg);
                        }
                    });

             }
         })
    }
    else {
        res.send("invalid token: " + token);
    }
}


module.exports = activationController;
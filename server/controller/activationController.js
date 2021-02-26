const axios = require('axios');
const jwt = require('jsonwebtoken');

const activationController = async (req, res) => {
    const token = req.query.token;
    console.log(token);
    if (token) {
        jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, (err, decodedData) => {
            if (err) {
                console.log('Activation error: ' + err);
                return res.send("Error Verifying token");
            }
            else {
                const { email, name, gender, password } = decodedData;
                axios({
                    method:'post',
                    url: process.env.CLIENT_URL + '/register',
                    data: {
                        email: email,
                        name: name,
                        gender: gender,
                        password: password
                    },
                    headers: {
                        'Content-Type' : 'application/json'
                    }
                })
                    .then((response) => {
                        if (response.data.msg === "success") {
                            req.session.user = response.data.user;
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
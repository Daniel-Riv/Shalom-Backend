const jwt = require('jsonwebtoken');

const generateJWT = (id, name, lastName, email, city, address, phone, role) => {
    return new Promise((resolve, reject) => {
        const payload = { id, name, lastName, email, city, address, phone, role };
        jwt.sign(payload, process.env.SECRET_JWT, {
            expiresIn: '2h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject('Error to generate JWT');
            }
            resolve(token);
        })
    })
}

module.exports = {
    generateJWT
}
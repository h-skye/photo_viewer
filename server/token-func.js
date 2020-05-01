const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');


// PRIVATE and PUBLIC key 
const privateKey = fs.readFileSync(path.join(__dirname, './keys/private.key'), 'utf-8')
const publicKey = fs.readFileSync(path.join(__dirname, './keys/public.key'), 'utf-8');


// VIEW options
let viewOptions = {
    issuer: 'YYH',
    audience: 'user@gmail.com',
    expiresIn: '1hr',
    algorithm: 'RS256'
}


module.exports = {
    sign: (payload, email) => {
        let signOptions = {
            issuer: 'YYH',
            audience: email, // email to sign in token i.e. user@gmail.com
            expiresIn: '1hr',
            algorithm: 'RS256'
        }

        return jwt.sign(payload, privateKey, signOptions)
    },

    verify:(token) => {
        let verifyOptions = {
            issuer: 'YYH',
            expiresIn: '1hr',
            algorithm: ['RS256']
        }

        try {
            return jwt.verify(token, publicKey, verifyOptions)
        } catch(err) {
            console.log('error in verifying token: ' + err)
            return false
        }
    }
}
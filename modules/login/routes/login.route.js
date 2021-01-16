const express = require('express');
const jwt = require('jsonwebtoken')
const UserModel = require('../../../models/user.model')

const user_black = new UserModel(process.env.ACCOUNT_USERNAME_BLACK, process.env.ACCOUNT_PASSWORD_BLACK, process.env.APP_UID)
const user_red = new UserModel(process.env.ACCOUNT_USERNAME_RED, process.env.ACCOUNT_PASSWORD_RED, process.env.APP_UID)
const user_blue = new UserModel(process.env.ACCOUNT_USERNAME_BLUE, process.env.ACCOUNT_PASSWORD_BLUE, process.env.APP_UID)

let route = express();

route.post('/', (req,res) => {

    const user = new UserModel( req.body )

    if( user.equal( user_black )
        || user.equal( user_red )
        || user.equal( user_blue )
        ) {

        console.log(`[Login] like ${user.username} at ${formatTimestamp(Date.now())}`)
        const token = jwt.sign(
            { user: user, timestamp: Date.now() },
            process.env.TOKEN_SECRET,
            {
                expiresIn: parseInt(process.env.EXPIRE_JWT, 10) || 1440
            }
        )

        res.json({
            response: "Autenticación correcta",
            token
        });

    } else {
        res.status(401).send('Acceso invalido')
    }
});

function formatTimestamp(date) {
    var d = new Date(date)
    month = '' + (d.getMonth() + 1)
    day = '' + d.getDate()
    year = d.getFullYear()
    hour = '' + d.getHours()
    minutes = '' + d.getMinutes()
    seconds = '' + d.getSeconds()

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return `${year}${month}${day} ${hour}:${minutes}:${seconds}`;
}

module.exports = { route };
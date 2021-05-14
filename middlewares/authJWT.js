const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');
const db = require('../models/index');
const User = db.user;

const verifyToken = async (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({
            message: 'No token provided!'
        });
    }

    jwt.verify(token, authConfig.secret, (err, decode) => {
        if (err) {
            res.status(401).send({
                message: 'Unauthorized !'
            });
        }
        req.userId = decode.id;
        next();
    });
}

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        if(!!user) {
            const roleLists = user.getRoles();
            console.log('roleList: ', roleLists, null, 2 );
            for(let i = 0; i < roleLists.length; i++) {
                if(roleLists[i] === 'admin') {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: 'Failed ! Require admin role '
            });
            return;
        }
    }
    catch (err) {
        console.log(err);
    }
}


const isModerator = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.userId);
        if(!!user) {
            const roleLists = user.getRoles();
            for(let i = 0; i < roleLists.length; i++) {
                if(roleLists[i] === 'moderator') {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: 'Failed ! Require moderator role '
            });
            return;
        }
    }
    catch (err) {
        console.log(err);
    }
}

const isModeratorOrAdmin = async (req, res, next ) => {
    try {
        const user = await User.findByPk(req.userId);
        if(!!user) {
            const roleLists = user.getRoles();
            for(let i = 0; i < roleLists.length; i++) {
                if(roleLists[i] === 'moderator' || roleLists[i] === 'admin') {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: 'Failed ! Require Moderator or Admin Role! '
            });
            return;
        }
    }
    catch(err) {
        console.log(err);
    }
}

const authJWT = {
    isAdmin,
    isModerator, 
    isModeratorOrAdmin,
    verifyToken
};

module.exports = authJWT;
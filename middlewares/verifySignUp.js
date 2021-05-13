
const db = require('../models/index');
const { Op } = require('sequelize');
const User = db.user;

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    try {
        const userByUsername = await User.findOne({
            where: {
                username: req.body.username
            }
        });
        if(userByUsername) {
            res.status(400).send({
                message: 'Failed! User is already existing !'
            });
            return;
        }

        const userByEmail = await User.findOne({
            where: {
                email: {
                    [Op.is]: req.body.email 
                }
            }
        });
        
        if(userByEmail) {
            res.status(400).send({
                message: 'Failed! Email is already existing '
            });
            return;
        }
        next();
    }
    catch(err) {
         console.log(err);
    }
}
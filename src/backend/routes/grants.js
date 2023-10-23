const express = require('express')
const router = express.Router();

exports.renderLogin = (req,res) => {
    res.render('main',{title:'Grants'});
}

module.exports=router;
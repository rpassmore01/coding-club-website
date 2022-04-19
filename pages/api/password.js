const bcrypt = require("bcrypt");

export default function handler(req, res) {
    switch (req.method) {
      case "POST": {
        return checkPassword(req, res);
      }
    }
  }

function checkPassword(req, res){
    if(req.body.password){
        bcrypt.compare(req.body.password, process.env.PASSWORD, (err, result) => {
            if(err){
                return res.status(500).json({
                    success: false,
                    message: err
                })
            }
            else {
                if(result){
                    return res.status(200).json({
                        success: true
                    })
                }
                else {
                    return res.status(200).json({
                        success: false
                    })
                }
            }
        })
    }
    else {
        return res.status(400).json({
            success: false,
            message: new Error("Bad Submission: Request has no attribute for password")
        })
    }
  }
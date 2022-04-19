const bcrypt = require("bcrypt");

export default async function handler(req, res) {
    switch (req.method) {
      case "POST": {
        return await checkPassword(req, res);
      }
    }
  }

async function checkPassword(req, res){
    if(req.body.password){
        const result = await bcrypt.compare(req.body.password, process.env.PASSWORD);
                if(result){
                    return res.status(200).json({
                        success: true
                    })
                }
                else {
                    return res.status(401).json({
                        success: false
                    })
                }
    }
    else {
        return res.status(400).json({
            success: false,
            message: new Error("Bad Submission: Request has no attribute for password")
        })
    }
  }

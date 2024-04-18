const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    const token = req.headers["token"]
    jwt.verify(token, "2030405010", (err, decoded) => {
        if (err) {
            return res.status(401).json({
                status: "fail",
                message: "Unauthorized"
            })
        }
        else{
            const email = decoded.data
            req.headers.email = email
            next()
        }
    })
}
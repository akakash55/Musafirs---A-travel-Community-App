import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.SECRET;


// user wants to delete a post
// click the delete button => auth middleware(next) => delete controller..

const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];  // token array mein 2nd position mein hai -> res.status(200).json({ result: oldUser, token }); (../controllers/user.js)
        let decodedData;
        if (token) {
            decodedData = jwt.verify(token, secret);
            req.userId = decodedData.id;
        }
        next();

    } catch (error) {
        console.log(error);
    }
};

export default auth;
import jwt from "jsonwebtoken"

// wants to like a post
// click the like button => auth middleware (NEXT) => like controller..

const auth = (req, res, next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500
        // if length > 500 then  it is google auth
        let decodedData
        if(token && isCustomAuth){
            decodedData = jwt.verify(token)
            req.userId = decodedData?.id
        }else{
            decodedData = jwt.verify(token, "test");
            req.userId = decodedData?.sub
        }
        next()
    } catch (err) {
        console.log(err);
    }
}

export default auth;
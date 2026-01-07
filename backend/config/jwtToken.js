import jwt from "jsonwebtoken"

export const generateToken = (userId,res)=>{

    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'7d'})

    const cookieOptions={
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite:'strict',
        secure:process.env.NODE_ENV!=="development"
    }

    res.cookie("jwt",token,cookieOptions)
    return token;
}


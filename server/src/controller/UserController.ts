import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../model/UserModel";
import bcrypt from "bcrypt"


interface SignUpBody{
    username?: string;
    email?: string;
    password?: string;
}

export const signUp: RequestHandler<unknown, unknown, SignUpBody, unknown> = async(req, res, next) => {

    try {
        const username = req.body.username;
        const email = req.body.email;
        const passwordRaw = req.body.password;


        if(!username || !email || !passwordRaw){
            throw createHttpError(400, "Parameters missing")
        }

        const existingUserName = await UserModel.findOne({username: username}).exec();

        if(existingUserName){
            throw createHttpError(400, "Username already exists")
        }


        const existingEmail = await UserModel.findOne({email: email}).exec();

        if(existingEmail){
            throw createHttpError(400, "Email already exists")
        }


        const passwordHash = await bcrypt.hash(passwordRaw, 10);

        const newUser = await UserModel.create({
            username: username,
            email: email,
            password: passwordHash
        })

        req.session.userId = newUser._id;

        res.status(201).json(newUser)
          

    } catch (error) {
        next(error)
    }

}



interface LoginBody{
    username?: string,
    password?: string
}



export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async(req, res, next) => {
    
       try {
        const username = req.body.username;
        const password = req.body.password;

        if(!username || !password){
            throw createHttpError(400, "Parameters missing");
        }

        const existingUser = await UserModel.findOne({username: username}).select("+password +email").exec();

        if(!existingUser){
            throw createHttpError(401, "Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(password, existingUser.password);

        if(!passwordMatch){
            throw createHttpError(401, "Invalid credentials");
        }

        req.session.userId = existingUser._id;

        res.status(201).json(existingUser)

       } catch (error) {
        next(error)
       }

}



export const getAuthenticatedUser: RequestHandler = async(req, res, next) => {

    try {
        const authenticatedUserId = req.session.userId;

        if(!authenticatedUserId){
            throw createHttpError(401, "User not authenticated")
        }

        const user = await UserModel.findById(authenticatedUserId).select("+email").exec();

        res.status(200).json(user)


    } catch (error) {
        next(error)
    }
   
}



export const logout: RequestHandler = async(req, res, next) => {
  
        req.session.destroy(error => {
            if(error){
                next(error)
            }else{
                res.sendStatus(200)
            }
        });
    } 

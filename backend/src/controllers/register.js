import { request, response } from 'express';
import userModal from '../modals/users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const registerUser = async (request, response) => {
    const { username, email, password } = request.body;
    try {
        const isUserExits = await userModal.findOne({ email });
        if (isUserExits) {
            return response.status(400).json({ message: "User already exists" });
        }
        const hashed = await bcrypt.hash(password, 10);
        const newUser = new userModal({ username, email, password: hashed });
        await newUser.save();
        return response.status(201).json({ message: "User registered successfully" });

    } catch (err) {
        console.error('Error registering user:', err);
        return response.status(500).json({ message: "Internal Server Error" });
    }


}

const getAllUsers = async (request, response) => {
    try{
        const {email,password} = request.body;
        const user = await userModal.findOne({email});
        if(!user){
            return response.status(404).json({message:"User not found"});
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return response.status(401).json({message:"Invalid credentials"});
        }
        const jwtToken = jwt.sign({id:user._id,email:user.email},process.env.JWT_SECRET,{expiresIn:'1h'});

        return response.status(200).json({token:jwtToken,message:"Login successful"});

    }catch(err){
        console.error('Error fetching users:', err);
        return response.status(500).json({ message: "Internal Server Error" });
    }
}

const listOfUsers = async (request, response) => {
    try{
        // Get the current user ID from the JWT token
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return response.status(401).json({ message: "No token provided" });
        }

        const token = authHeader.split(' ')[1]; // Remove "Bearer " prefix
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const currentUserId = decoded.id;
        const users = await userModal.find({ _id: { $ne: currentUserId } }).select('-password');
        
        return response.status(200).json({
            success: true,
            users: users,
            message: "Users fetched successfully"
        });
    }catch(err){
        console.error('Error fetching users:', err);
        return response.status(500).json({ message: "Internal Server Error" });
    }
}


export {registerUser,getAllUsers,listOfUsers};
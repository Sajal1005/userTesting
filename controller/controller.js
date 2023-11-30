import User from "../model/model.js";
import bcrypt from "bcrypt";

export const create = async(req, res)=>{
    try {

        const encpass = await bcrypt.hash(req.body.password,10);
        // console.log(encpass)
        // req.body.password=encpass;

        console.log(await bcrypt.compare(req.body.password,encpass));

        const userData = new User(req.body);

        if(!userData){
            return res.status(404).json({msg: "user data not found"});
        }

        await userData.save();
        res.status(200).json({msg: "user created successfully"});

    } catch (error) {
        res.status(500).json({error: error});
    }
}

export const login = async(req, res)=>{
    try {

        const emailf = req.query.email;
        const passf = req.query.password;
        const userData = await User.find({email: emailf});
        // console.log(userData[0].password)
        if(!userData){
            return res.status(404).json({msg:"user data not found"});
        }

        if(await bcrypt.compare(passf,userData[0].password)){
            res.status(200).json(userData);
        }else{
            res.status(200).json({msg: "wrong password"});
        }

     
     
 } catch (error) {
     res.status(500).json({error: error});
 }
}


export const getAll = async(req, res) =>{
    try {
           const userData = await User.find();

        if(!userData){
            return res.status(404).json({msg:"user data not found"});
        }

        res.status(200).json(userData);
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const getOne = async(req, res) =>{
    try {

        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg: "user not found"});
        }
        res.status(200).json(userExist);
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const update = async(req, res) =>{
    try {

        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(401).json({msg:"user not found"});
        }

        const updatedData = await User.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json({msg: "user updated successfully"});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}


export const deleteuser = async(req, res) =>{
    try {

        const id = req.params.id;
        const userExist = await User.findById(id);
        if(!userExist){
            return res.status(404).json({msg: "user not exist"});
        }
        await User.findByIdAndDelete(id);
        res.status(200).json({msg: "user deleted successfully"});
        
    } catch (error) {
        res.status(500).json({error: error});
    }
}
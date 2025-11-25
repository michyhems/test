const express = require("express");
const router = express.Router();
const Model = require("./../models/");

//Get all
router.get("/", async(req,res)=>{
    try{
        const entries = await Model.find();
        res.json(entries);
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
})

//Create
router.post("/", async(req,res)=>{
    const entry = new Model({
        //new schema object
    })
    try{}
    catch(err){
        res.status(400).json({ message: err.message });
    }
})

//Update
router.patch("/:id", getTask, async (req, res) =>{
    //update object here
    try{
        const newEntry = await res.entry.save();
        res.json(newEntry);
    }
    catch(err){
        res.status(400).json({ message: err.message });
    }
})

//Delete
router.delete("/:id", getTask, async (req, res) => {
    try{
        await res.entry.deleteOne();
        res.json({ message: "deleted entry" });
    }
    catch(err){
        res.status(500).json({ message: err.message });
    }
})

//Middleware
async function getTask(req, res, next){
    let entry;
    try{
        entry = await Model.findById(req.params.id);
        if(entry===null){
            return res.status(404).json({ message: "Cannot find entry" });
        }
    }catch(err){
         return res.status(500).json({ message: err.message });
    }
    res.entry = entry;
    next();
}

module.exports = router;
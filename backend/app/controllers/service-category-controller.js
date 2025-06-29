import Service from "../models/service-category-model.js";

const serviceCategoryController={};

// controller for create service category 
serviceCategoryController.create = async (req,res)=>{
    const {name,description,imageUrl} = req.body;
    try{
        const category = await Service.create({name,description,imageUrl});
        return res.status(201).json(category);
    }catch(error){
        return res.status(500).json({message:"Something went wrong"});
    }
};

// controller for list all the category
serviceCategoryController.list = async(req,res)=>{
  
    try{
        const categories = await Service.find();
        return res.json(categories);
    }catch(error){
        return res.status(500).json({error:"Something went wrong"});
    }
};

// service category update controller
serviceCategoryController.update = async(req,res)=>{
    const id = req.params.id;
    const {name,description,imageUrl} = req.body;
    try{
        const category = await Service.findByIdAndUpdate(id,{name,description,imageUrl},{new:true});
        if(!category){
            return res.status(404).json({error:"Service Category is not found"});
        }
        return res.json(category);
    }catch(error){
        return res.status(500).json({error:"Something went wrong"});
    }
}

// service category delete controller
serviceCategoryController.remove = async(req,res)=>{
    const id = req.params.id;
    try{
        const category = await Service.findByIdAndDelete(id,{new:true});
        if(!category){
            return res.status(404).json({error:"Service Category is not found"});
        }
        return res.json(category);
    }catch(error){
        return res.status(500).json({message:"Something went wrong"});
    }
};


export default serviceCategoryController;
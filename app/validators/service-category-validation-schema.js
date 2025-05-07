import Service from "../models/service-category-model.js"

//Service category validation schema
export const serviceCategoryValidation = {

    //validation for name field
    name:{
        in:['body'],
        exists:{
            errorMessage:'name field is required'
        },
        notEmpty:{
            errorMessage:'name field should not be empty'
        },
        trim:true,
        custom:{
            options:async function(value){
                try{
                    const service = await Service.findOne({name:value});
                    if(service){
                        throw new Error('service category already exists');
                    }
                }catch(error){
                    throw new Error(error.message);
                }
                return true;
            }
        }
    },

    //validation for description field
    description:{
        in:['body'],
        exists:{
            errorMessage:'description field is required'
        },
        notEmpty:{
            errorMessage:'description field should not be empty'
        }
    }

};


export const serviceUpdateValidation = {
    //validation for name field
    name:{
        in:['body'],
        exists:{
            errorMessage:'name field is required'
        },
        notEmpty:{
            errorMessage:'name field should not be empty'
        },
        trim:true,
        custom:{
            options: async function (value,{req}) {
                try{
                    const service = await Service.findOne({name:value});
                    if(service && service._id.toString() !== req.params.id){
                        throw new Error('Category already exists');
                    }  
                }catch(error){
                    throw new Error(error.message);
                }
                return true
                
            }
        }
    },

    //validation for description field
    description:{
        in:['body'],
        exists:{
            errorMessage:'description field is required'
        },
        notEmpty:{
            errorMessage:'description field should not be empty'
        }
    }

}
//review rating validation schema
export const reviewRatingValidationSchema = {

    //validation for serviceProvider field
    serviceProvider:{
        in:['body'],
        exists:{
            errorMessage:'serviceProvider filed is required'
        },
        notEmpty:{
            errorMessage:'serviceProvider field should not be empty'
        },
        isMongoId:{
            errorMessage:'Please provide valid MongoId'
        }
    },

     //validation for jobProvider field
    jobProvider:{
        in:['body'],
        exists:{
            errorMessage:'jobProvider filed is required'
        },
        notEmpty:{
            errorMessage:'jobProvider field should not be empty'
        },
        isMongoId:{
            errorMessage:'Please provide valid MongoId'
        }
    },

     //validation for jobId field
    jobId:{
        in:['body'],
        exists:{
            errorMessage:'jobId filed is required'
        },
        notEmpty:{
            errorMessage:'jobId field should not be empty'
        },
        isMongoId:{
            errorMessage:'Please provide valid MongoId'
        }
    },

    //validation for rating field
    rating:{
        in:['body'],
        exists:{
            errorMessage:'rating filed is required'
        },
        notEmpty:{
            errorMessage:'rating field should not be 0'
        },
    }
}
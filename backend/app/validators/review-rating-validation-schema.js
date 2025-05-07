//review rating validation schema
export const reviewRatingValidation = {

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
};


export const moreReviewValidation = {
    name:{
        in:['body'],
        exists:{
            errorMessage:'name filed is required'
        },
        notEmpty:{
            errorMessage:'name field should not be 0'
        },
    },
    message:{
        in:['body'],
        exists:{
            errorMessage:'message filed is required'
        },
        notEmpty:{
            errorMessage:'message field should not be 0'
        },
    },
    profileImage:{
        in:['body'],
        exists:{
            errorMessage:'profileImage filed is required'
        },
        notEmpty:{
            errorMessage:'profileImage field should not be 0'
        },
    }
};

export const updateReviewValidation = {
    message:{
        in:['body'],
        exists:{
            errorMessage:'message filed is required'
        },
        notEmpty:{
            errorMessage:'message field should not be 0'
        },
    }
}
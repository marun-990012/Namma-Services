//job post validation schema
export const jobPostValidationSchema = {

    //validation for title field
    title:{
        in:['body'],
        exists:{
            errorMessage:'title field is required'
        },
        notEmpty:{
            errorMessage:'title field should not be empty'
        }, 
    },

    //validation for description field
    description:{
        in:['body'],
        exists:{
            errorMessage:'description field is required'
        },
        notEmpty:{
            errorMessage:'description field should not be empty'
        }, 
    },

    //validation for salary field
    salary:{
        in:['body'],
        exists:{
            errorMessage:'salary field is required'
        },
        notEmpty:{
            errorMessage:'salary field should not be empty'
        }, 
    },
}
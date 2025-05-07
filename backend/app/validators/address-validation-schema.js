export const addressValidation = {

    //validation for street field
    street:{
        in:['body'],
        exists:{
            errorMessage:'street field is required'
        },
        notEmpty:{
            errorMessage:'street field should not be empty'
        },

    },

    //validation for city field
    city:{
        in:['body'],
        exists:{
            errorMessage:'city field is required'
        },
        notEmpty:{
            errorMessage:'city field should not be empty'
        }   
    },

    //validation for state field
    state:{
        in:['body'],
        exists:{
            errorMessage:'state field is required'
        },
        notEmpty:{
            errorMessage:'state field should not be empty'
        }  
    },

    //validation for postalCode field
    postalCode:{
        in:['body'],
        exists:{
            errorMessage:'postalCode field is required'
        },
        notEmpty:{
            errorMessage:'postalCode field should not be empty'
        }  
    },

    //validation for country field
    country:{
        in:['body'],
        exists:{
            errorMessage:'country field is required'
        },
        notEmpty:{
            errorMessage:'country field should not be empty'
        }  
    }
}
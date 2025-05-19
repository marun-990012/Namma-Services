//job post validation schema
export const jobPostValidation = {

    //validation for title field
    title:{
        in:['body'],
        exists:{
            errorMessage:'title field is required'
        },
        notEmpty:{
            errorMessage:'title field should not be empty'
        }, 
        isLength:{
            options:{min:5,max:200},
            errorMessage:'title should be between 5 to 200 character'
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
        }, 
        isLength:{
            options:{min:30,max:360},
            errorMessage:'description should be between 30 to 360 character'
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

    address:{
        in:['body'],
        exists:{
            errorMessage:'address field is required'
        },
        notEmpty:{
            errorMessage:'address field should not be empty'
        },
        isLength:{
            options:{min:20,max:360},
            errorMessage:'address should be between 20 to 360 character'
        },
       
    },

    postalCode:{
        in:['body'],
        exists:{
            errorMessage:'postalCode field is required'
        },
        notEmpty:{
            errorMessage:'postalCode field should not be empty'
        },
    }
};


export const jobRequestValidation = {
    serviceProvider: {
      in: ['body'],
      exists: {
        errorMessage: 'serviceProvider field is required',
      },
      notEmpty: {
        errorMessage: 'serviceProvider field should not be empty',
      },
    },
    messages: {
      in: ['body'],
      exists: {
        errorMessage: 'message field is required',
      },
      notEmpty: {
        errorMessage: 'message field should not be empty',
      },
    },
  };


  export const sendMessageValidation = {
    requestId: {
        in: ['body'],
        exists: {
            errorMessage: 'requestId field is required',
        },
        notEmpty: {
            errorMessage: 'requestId field should not be empty',
        },
        isMongoId: {
            errorMessage: 'Invalid requestId format',
        }
    },
    message: {
        in: ['body'],
        exists: {
            errorMessage: 'message field is required',
        },
        notEmpty: {
            errorMessage: 'message field should not be empty',
        },
        isObject: {
            errorMessage: 'message should be an object',
        },
        custom: {
            options: (value) => {
                // Check if textMessage, name, and profileImage are present in the message object
                if (!value.textMessage || !value.name || !value.profileImage) {
                    throw new Error('message object is missing required fields (textMessage, name, profileImage)');
                }
                return true;
            },
        }
    }
};


export const sendMessageReplyValidation = {
    serviceProvider:{
        in: ['body'],
        exists: {
            errorMessage: 'serviceProvider field is required',
        },
        notEmpty: {
            errorMessage: 'serviceProvider field should not be empty',
        },
        isMongoId: {
            errorMessage: 'Invalid requestId format',
        }
    },
    reply:{
        in: ['body'],
        exists: {
          errorMessage: 'reply field is required',
        },
        notEmpty: {
          errorMessage: 'reply field should not be empty',
        },
    }
};


export const considerationValidation = {
    serviceProvider:{
        in: ['body'],
        exists: {
            errorMessage: 'requestId field is required',
        },
        notEmpty: {
            errorMessage: 'requestId field should not be empty',
        },
        isMongoId: {
            errorMessage: 'Invalid requestId format',
        }
    }
}



export const selectServiceProviderValidation = {
    serviceProvider:{
        in: ['body'],
        exists: {
            errorMessage: 'requestId field is required',
        },
        notEmpty: {
            errorMessage: 'requestId field should not be empty',
        },
        isMongoId: {
            errorMessage: 'Invalid requestId format',
        }
    }
}
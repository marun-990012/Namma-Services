export const idValidationSchema = {
    id:{
        in:['params'],
        exists:{
            errorMessage:'id field is required'
        },
        notEmpty:{
            errorMessage:'id field should not be empty'
        },
        isMongoId:{
            errorMessage:'Please provide valid MongoId'
        }
    }
}

export const reviewIdValidation = {
    id: {
        in: ['params'],
        exists:{
            errorMessage:'id field is required'
        },
        notEmpty:{
            errorMessage:'id field should not be empty'
        },
        isMongoId: {
          errorMessage: 'Invalid review document ID',
        },
      },
      reviewid: {
        in: ['params'],
        exists:{
            errorMessage:'reviewid field is required'
        },
        notEmpty:{
            errorMessage:'reviewid field should not be empty'
        },
        isMongoId: {
          errorMessage: 'Invalid review subdocument ID',
        },
      },
}

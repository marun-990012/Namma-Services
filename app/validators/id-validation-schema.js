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
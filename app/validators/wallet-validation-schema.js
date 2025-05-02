//Wallet validation schema
export const walletValidationSchema = {
    amountPaid:{
        in:['body'],
        exists:{
            errorMessage:'amountPaid field is required'
        },
        notEmpty:{
            errorMessage:'amountPaid field should not be empty'
        }
    }
}
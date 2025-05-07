export const paymentOrderValidation = {
    amount:{
        in:['body'],
        exists:{
            errorMessage:'amount field is required'
        },
        notEmpty:{
            errorMessage:'amount field should not be empty'
        }
    }
};

export const paymentVerificationValidation = {
  razorpay_order_id:{
    in:['body'],
    exists:{
        errorMessage:'razorpay_order_id field is required'
    },
    notEmpty:{
        errorMessage:'razorpay_order_id field should not be empty'
    }
  }, 
  razorpay_payment_id:{
    in:['body'],
    exists:{
        errorMessage:'razorpay_payment_id field is required'
    },
    notEmpty:{
        errorMessage:'razorpay_payment_id field should not be empty'
    }
  }, 
  razorpay_signature:{
    in:['body'],
    exists:{
        errorMessage:'razorpay_signature field is required'
    },
    notEmpty:{
        errorMessage:'razorpay_signature field should not be empty'
    }
  },
  amount:{
    in:['body'],
    exists:{
        errorMessage:'amount field is required'
    },
    notEmpty:{
        errorMessage:'amount field should not be empty'
    }
  }
}
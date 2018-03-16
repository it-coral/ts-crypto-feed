const Joi = require('joi');

export default {
  
  requestSinglePayment: {
    body: Joi.object({
      message: Joi.string(),

      amount: Joi.number().required(),
      exchange_rate: Joi.string().required(),
      card_amount: Joi.string().required(),
      discount: Joi.string().required(),
      crypto_amount: Joi.string().required(),

      customer: Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required()
      }).required()
    }).unknown(true)
  },

  requestReloadPayment: {
    body: Joi.object({
      message: Joi.string(),

      amount: Joi.number().required(),
      exchange_rate: Joi.string().required(),
      card_amount: Joi.string().required(),
      discount: Joi.string().required(),
      crypto_amount: Joi.string().required(),

      customer: Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().required(),
        phone_home: Joi.string().required(),
        title: Joi.string().required(),
      }),

      user: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6),
        username: Joi.string(),
        first_name: Joi.string(),
        last_name: Joi.string(),
        google_id: Joi.string(),
        facebook_id: Joi.string()
      }).unknown(false).xor('facebook_id', 'google_id', 'password')
    }).unknown(true)
  },
  // // POST auth/login
  // login: {
  //   body: Joi.object({
  //     email: Joi.string().email().required(),
  //     password: Joi.string().required().min(6)
  //   }).unknown(false)
  // },

};
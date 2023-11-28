import * as Yup from "yup"
Yup.setLocale({
    mixed: {
      required: 'Required',
    },
  });


export const addProductSchema=Yup.object().shape({
    name:Yup.string().min(4,"must be at least 4 characters").required(),
    categoryId:Yup.number().integer().required(),
    unitPrice:Yup.number().integer().required(),
    unitInStock:Yup.number().integer().required(),
    quantity:Yup.number().integer().required(),
})
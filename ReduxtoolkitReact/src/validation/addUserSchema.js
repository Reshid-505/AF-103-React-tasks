import * as Yup from "yup"
Yup.setLocale({
    mixed: {
      required: 'Required',
    },
  });


export const addUserSchema=Yup.object().shape({
    name:Yup.string().min(4,"must be at least 4 characters").required(),
    password:Yup.string().min(8,"must be at least 8 characters").required(),
})
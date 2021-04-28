import * as yup from "yup";

export const registerSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup
    .string()
    .matches(
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
      "A senha deve conter no mínimo 8 caracteres, pelos menos uma letra maiúscula, uma letra minúscula, em número e um caractere especial"
    )
    .required(),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senha devem ser iguais")
    .required(),
  firstName: yup.string().required(),
  surName: yup.string().required(),
});

import * as Yup from "yup";

const regex = {
  name: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'-]+$/,
  cellphone: /^\+?[0-9]+$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
};

const userInfoSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Muy Corto!")
    .max(70, "Muy largo!")
    .matches(regex.name, "El nombre solo puede contener letras y espacios")
    .required("El campo no puede estar vacío"),

  last_name: Yup.string()
    .min(5, "Muy Corto!")
    .max(70, "Muy largo!")
    .matches(regex.name, "El apellido solo puede contener letras y espacios")
    .required("El campo no puede estar vacío"),

  cellphone: Yup.string()
    .min(10, "Muy Corto!")
    .max(20, "Muy largo!")
    .matches(regex.cellphone, "El número de celular solo puede contener números"),
});

const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Muy Corto!")
    .max(70, "Muy largo!")
    .matches(regex.name, "El nombre solo puede contener letras y espacios")
    .required("El campo no puede estar vacío"),

  lastName: Yup.string()
    .min(5, "Muy Corto!")
    .max(70, "Muy largo!")
    .matches(regex.name, "El apellido solo puede contener letras y espacios")
    .required("El campo no puede estar vacío"),
  
  email: Yup.string()
    .matches(regex.email, 'El correo ingresado no es válido')
    .required('El correo es obligatorio'),
  
  password: Yup.string()
    .matches(regex.password, "La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un caracter especial (!'&+-,./-@?:;)")
    .required('Debe ingresar una contraseña'),
  
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Debe repetir su contraseña'),
})

export const updatePasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .matches(regex.password, "La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un caracter especial (!'&+-,./-@?:;)")
    .required('Debe ingresar una contraseña'),
})

export { userInfoSchema, registerSchema };

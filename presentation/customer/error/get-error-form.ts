import * as Yup from "yup";

const regex = {
  name: /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s'-]+$/,
  cellphone: /^\+?[0-9]+$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
  id: /^[0-9]+$/
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
    .matches(
      regex.cellphone,
      "El número de celular solo puede contener números"
    ),
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
    .email("El correo ingresado no es válido")
    .required("El correo es obligatorio"),

  password: Yup.string()
    .matches(
      regex.password,
      "La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un caracter especial (!'&+-,./-@?:;)"
    )
    .required("Debe ingresar una contraseña"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Las contraseñas no coinciden")
    .required("Debe repetir su contraseña"),
});

export const updatePasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .matches(
      regex.password,
      "La contraseña debe tener mínimo 8 caracteres, una mayúscula, un número y un caracter especial (!'&+-,./-@?:;)"
    )
    .required("Debe ingresar una contraseña"),
});

export const contactInfoSchema = Yup.object().shape({
  companyName: Yup.string()
    .required("El nombre de la empresa es obligatorio"),

  ruc: Yup.string()
    .matches(regex.id, "El RUC solo debe contener números")
    .min(10, "El RUC debe tener al menos 10 caracteres")
    .required("El RUC es obligatorio"),

  establishmentType: Yup.string()
    .required("El tipo de establecimiento es obligatorio"),

  foodType: Yup.string()
    .required("El tipo de comida es obligatorio"),

  address: Yup.string()
    .required("La dirección es obligatoria"),

  phone: Yup.string()
    .matches(regex.cellphone, "El teléfono solo debe contener números"),

  email: Yup.string()
    .email("Correo electrónico inválido"),

  contactName: Yup.string()
    .required("El nombre del contacto es obligatorio"),

  contactLastName: Yup.string()
    .required("El apellido del contacto es obligatorio"),

  contactId: Yup.string()
    .matches(regex.id, "La cédula solo debe contener números")
    .min(10, "La cédula debe tener al menos 10 caracteres")
    .required("La cédula es obligatoria"),

  contactPosition: Yup.string()
    .required("El cargo del contacto es obligatorio"),

  contactPhone: Yup.string()
    .matches(regex.cellphone, "El teléfono del contacto solo debe contener números")
    .required("El teléfono del contacto es obligatorio"),

  contactEmail: Yup.string()
    .email("Correo electrónico de contacto inválido")
    .required("El correo electrónico del contacto es obligatorio"),
});

export { userInfoSchema, registerSchema };

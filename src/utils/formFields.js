const getFormFields = (listType, options) => {
  switch (listType) {
    case "/inscripciones":
      return [
        {
          name: "inscription",
          label: "Inscripción",
          rules: [{ required: true, message: "El Inscripción es obligatorio" }],
          placeholder: "Inscripción",
          inputType: "select",
          options: options,
          initialValue: "",
        },
        {
          name: "first_name",
          label: "Nombres",
          rules: [{ required: true, message: "El nombre es obligatorio" }],
          placeholder: "Nombre del joven",
          inputType: "text",
          initialValue: "",
        },
        {
          name: "last_name",
          label: "Apellidos",
          rules: [{ required: true, message: "El apellido es obligatorio" }],
          placeholder: "Apellidos del joven",
          inputType: "text",
          initialValue: "",
        },
        {
          name: "national_id",
          label: "DNI",
          rules: [
            {
              required: false,
              min: 8,
              max: 8,
            },
          ],
          placeholder: "Número de DNI",
          inputType: "number",
          initialValue: "",
        },
        {
          name: "email",
          label: "Email",
          rules: [
            {
              type: "email",
              message: "El E-mail no es válido.!",
            },
            { required: false },
          ],
          placeholder: "mi_nombre@example.com",
          inputType: "email",
          initialValue: "",
        },
        {
          name: "phone_number",
          label: "Teléfono",
          rules: [
            {
              required: false,
              min: 9,
              max: 9,
            },
          ],
          placeholder: "999888777",
          inputType: "tel",
          initialValue: "",
        },
        {
          name: "birthday",
          label: "Cumpleaños",
          rules: [
            {
              required: false,
            },
          ],
          placeholder: "",
          inputType: "date",
          initialValue: "",
        },
        {
          name: "illness",
          label: "Enfermedades/Alergias",
          rules: [{ required: false }],
          placeholder:
            "Agrega aquí las enfermedades o alergias separadas por comas.",
          inputType: "textArea",
          initialValue: "",
        },
        {
          name: "baptism",
          label: "Bautizo",
          rules: [
            {
              required: false,
            },
          ],
          placeholder: "Lugar de bautizo",
          inputType: "text",
          initialValue: "",
        },
        {
          name: "communion",
          label: "Comunión",
          rules: [
            {
              required: false,
            },
          ],
          placeholder: "Lugar de tu primera comunión",
          inputType: "text",
          initialValue: "",
        },
        {
          name: "t_shirt_size",
          label: "Talla",
          rules: [
            {
              required: false,
              min: 1,
              max: 3,
            },
          ],
          placeholder: "XS, S, M, L, XL, XXL",
          inputType: "text",
          initialValue: "",
        },
        {
          name: "additional_notes",
          label: "Datos adicionales",
          rules: [
            {
              required: true,
              message: "Ingrese datos adicionales, como los del apoderado.",
            },
          ],
          placeholder: "Datos adicionales.",
          inputType: "textArea",
          initialValue:
            "Nombres: \nApellidos: \nDNI: \nCelular: \nSacramentos: \nCondición (Matrimonio religioso, civil, soltero, viudez): \nNúmero de operación: ",
        },
        {
          name: "user_type",
          label: "Tipo de usuario",
          rules: [
            {
              required: true,
              message: "El tipo de usuario es obligatorio",
            },
          ],
          placeholder: "Tipo de usuario",
          inputType: "hidden",
          initialValue: "CH",
        },
      ];
    case "/grupos":
      return [];
    default:
      return [];
  }
};

export default getFormFields;

const getFormFields = (listType, options) => {
    switch (listType) {
      case "/inscripciones":
        return [
          {
            name: "inscription",
            label: "Inscripción",
            rules: [
              { required: true, message: "El Inscripción es obligatorio" },
            ],
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
                required: true,
                message: "El número de DNI es obligatorio",
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
            rules: [{ required: true, message: "El email es obligatorio" }],
            placeholder: "mi_nombre@example.com",
            inputType: "email",
            initialValue: "",
          },
          {
            name: "phone_number",
            label: "Teléfono",
            rules: [
              {
                required: true,
                message: "El número de teléfono es obligatorio",
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
                required: true,
                message: "La fecha de cumpleaños es obligatoria",
              },
            ],
            placeholder: "",
            inputType: "date",
            initialValue: "",
          },
          {
            name: "baptism",
            label: "Bautizo",
            rules: [
              {
                required: true,
                message: "El lugar de bautizo es obligatorio",
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
                required: true,
                message: "El lugar de primera comunión es obligatorio",
              },
            ],
            placeholder: "Lugar de tu primera comunión",
            inputType: "text",
            initialValue: "",
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
}

export default getFormFields;

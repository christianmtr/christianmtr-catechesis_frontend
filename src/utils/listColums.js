const getColums = listType => {
    switch (listType) {
      case "/inscripciones":
        return [
          {
            title: "Nombre",
            dataIndex: "first_name",
            key: "first_name",
          },
          {
            title: "Apellido",
            dataIndex: "last_name",
            key: "last_name",
          },
          {
            title: "DNI",
            dataIndex: "national_id",
            key: "national_id",
          },
          {
            title: "Email",
            dataIndex: "email",
            key: "email",
          },
          {
            title: "Teléfono",
            dataIndex: "phone_number",
            key: "phone_number",
          },
          {
            title: "Fecha de nacimiento",
            dataIndex: "birthday",
            key: "birthday",
          },
          {
            title: "Bautizo",
            dataIndex: "baptism",
            key: "baptism",
          },
          {
            title: "Comunión",
            dataIndex: "communion",
            key: "communion",
          },
        ];
      case "/grupos":
        return [];
      default:
        return [];
    }
};

export default getColums;

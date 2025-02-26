const getColums = (listType) => {
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
          title: "Dirección",
          dataIndex: "address",
          key: "address",
        },
        {
          title: "Fecha de nacimiento",
          dataIndex: "birthday",
          key: "birthday",
          responsive: ["md"],
        },
        {
          title: "Bautizo",
          dataIndex: "baptism",
          key: "baptism",
          responsive: ["md"],
        },
        {
          title: "Comunión",
          dataIndex: "communion",
          key: "communion",
          responsive: ["md"],
        },
      ];
    case "/grupos":
      return [];
    default:
      return [];
  }
};

export default getColums;

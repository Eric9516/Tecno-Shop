const moment = require("moment");

export const calculoEdad = (fechaNacimiento) => {
    // const myVar = "1995/08/14";
    const hoy = moment();
    const cumpleaños = moment(fechaNacimiento);
    const edad = hoy.diff(cumpleaños, "years");
    return edad;
};

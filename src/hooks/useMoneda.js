import React, { Fragment, useState } from "react";

const useMoneda = label => {
  //State de nuestro custom hook

  const [state, actualizarState] = useState("");

  const Seleccionar = () => (
    <Fragment>
      <label>{label}</label>
      <select>
        <option value="MXN">Peso Mexicano</option>
      </select>
    </Fragment>
  );

  //Retornar state, interfaz y fn que modifica el state
  return [state, Seleccionar, actualizarState];
};

export default useMoneda;

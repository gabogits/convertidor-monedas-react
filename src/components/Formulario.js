import React, {useState, useEffect} from "react";
import styled from "@emotion/styled";
import Error from './Error';
import useMoneda from "./../hooks/useMoneda";
import useCriptomoneda from "./../hooks/useCriptomoneda";
import axios from "axios";

const Boton = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`;

const Formulario = ({guardarMoneda, guardarCriptomoneda, }) => {

  //state del listado de criptomonedas 

  const [listacripto, guardarCriptomonedas ] = useState([])
  const [error, guardarError] = useState(false);

  const MONEDAS = [
    {codigo: 'USD', nombre: 'Dolar de Estados Unidos'},
    {codigo: 'MXN', nombre: 'Peso Mexicano'},
    {codigo: 'EUR', nombre: 'Euro'},
    {codigo: 'GBP', nombre: 'Libra Esterlinas'},
  ]

  //utilizar usemoneda
  const [moneda, SelectMonedas] = useMoneda("Elige tu Moneda", '', MONEDAS); //la funcion que cambia en el estado se encuentra en el hook useMoneda

   // utilizar useCriptomoneda
  const [criptomoneda, SelectCripto] = useCriptomoneda('Elige tu Criptomoneda', '', listacripto)

  //Ejecutar llamado a la API
  useEffect(() => {
    const consultarAPI = async () => {
        const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
        const resultado = await axios.get(url);
        guardarCriptomonedas(resultado.data.Data);
    }
    consultarAPI();
  }, [])
  //cuando el usuario hace submit 

  const cotizarMoneda = e => {
    e.preventDefault();
    //validar si ambos campos estan llenos
    if(moneda === '' || criptomoneda === '' ) {
      guardarError(true);
      return;
    }

    //pasar los datos al componente principal
    guardarError(false);
    guardarMoneda(moneda);
    guardarCriptomoneda(criptomoneda) //ojo con el singular ya que se puede confundir  con guardarCriptomonedas que es la respuesta que se guarda de la api
  }
  return (
    <form onSubmit={cotizarMoneda}>
      {error ? <Error mensaje={'Todos los campos son obligatorios'} /> : null}
      <SelectMonedas />
      <SelectCripto />
      <Boton type="submit" value="Calcular"></Boton>
    </form>
  );
};

export default Formulario;

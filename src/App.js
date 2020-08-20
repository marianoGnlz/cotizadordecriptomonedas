import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import image from './cryptomonedas.png';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';
import Spinner from './components/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;
const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;
const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700px;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  @media (max-width: 768px){
    font-size: 45px;
  }
  @media (max-width: 400px){
    font-size: 40px;
  }

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
  }
`;

function App() {

  const [ moneda, setMoneda ] = useState('');
  const [ criptomoneda, setCriptomoneda ] = useState('');
  const [ resultado, setResultado ] = useState({});
  const [ cargando, setCargando ] = useState(false)

  useEffect(() => {

    const cotizarCriptomoneda = async () => {

      if(moneda === '') return;

      const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(URL);

      setCargando(true);

      setTimeout(() => {
          const { [criptomoneda] : 
            { [moneda] : cotizacion } 
          } = resultado.data.DISPLAY;

          setResultado(cotizacion);
          setCargando(false)
      }, 2000)
    };
    cotizarCriptomoneda();

  }, [moneda, criptomoneda]);

  const componente = cargando ? <Spinner /> : <Cotizacion resultado={resultado} />

  return (
    <Contenedor>
      <div>
        <Image 
          src={image}
          alt="Imagen crypto"
        />
      </div>
      <div>
        <Heading>Cotiza Criptomonedas al instante</Heading>
        <Formulario
          setCriptomoneda={setCriptomoneda}
          setMoneda={setMoneda}
        />
        {componente}

      </div>
    </Contenedor>
  );
}

export default App;

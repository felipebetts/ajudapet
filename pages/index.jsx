import { Layout, Flex } from "../components/Containers"
import { H2, H3, Parag } from "../components/Text"
import Header from "../components/Header"
import { Favorite } from "@material-ui/icons";
import GroupButton from "../components/DonationButtonGroup"
import TextField from "../components/TextField"
import Carousel from "../components/Carousel"
import Link from "next/link"

import { useState } from "react";
import Button from "../components/Button"
import Indicators from "../components/Indicators";

const Main = () => {

  const [currentValue, setCurrentValue] = useState(50)

  const onChange = (value) => {
    const reg = /^[0-9\b]+$/;

    if (value === '' || reg.test(value)) {
      setCurrentValue(value)
    }
}

  return (
    <Layout>
      <Header />
      <Flex column>
        <Flex column>
          <H2>Selecione um valor para doar.</H2>
          <TextField
            value={currentValue}
            onChange={(e) => onChange(e.target.value)}
            type="number"
            donation
          />
        </Flex>
        <Flex margin="10px 0px">
          <GroupButton
            value={currentValue}
            onClick={(e) => setCurrentValue(e)}
          />
        </Flex>
        {/* <p>Selecione um valor para doar.</p> */}
        <Flex margin="30px 0px 0px 0px">
          <Link 
            href={{
              pathname: '/login',
              query: { valor: currentValue },
            }}
          >
            <Button isLoading={false} variant="contained">Doar</Button>
          </Link>
        </Flex>
        <Flex>
          <H3 secondary>Seu </H3><Favorite style={{ margin: "0rem 0.5rem", color: "#eee" }} /><H3 secondary> faz a diferença.</H3>
        </Flex>
      </Flex>
      <Flex>
        <Carousel />
      </Flex>
      <Flex column>
        <H2>O que é o DOE AjudaPet?</H2>
        <Parag>Pessoas doando para Pets que precisam</Parag>
        <Parag>Pets que precisam sendo direcionados para receber tratamento</Parag>
        <Parag>Clínicas e Petshops associadas recebendo essas demandas</Parag>
      </Flex>
      <Indicators />
    </Layout>
  )
}

export default Main
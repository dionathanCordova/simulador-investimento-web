import React from "react";
import { FiFacebook, FiInstagram, FiTwitter } from 'react-icons/fi';

import { Container, Content, MidiaContent, InfoContent, InfoGroup } from "./styles";

const Footer: React.FC = () => {
   return (
      <Container>
         <Content>
            <MidiaContent>
               <FiFacebook size={52}/>
               <FiInstagram  size={52}/>
               <FiTwitter size={52}/>
            </MidiaContent>

            <InfoContent>
               <InfoGroup>
                  <h2> Sobre nós </h2>
                  <p>Quem somos</p>
                  <p>Nossa história</p>
                  <p>Nossos Resultados</p>
               </InfoGroup>

               <InfoGroup>
                  <h2> Primeiros Passos </h2>
                  <p> Preços </p>
                  <p> Quiz de perfil </p>
               </InfoGroup>

               <InfoGroup>
                  <h2> Investimentos </h2>
                  <p> CDB </p>
               </InfoGroup>

            </InfoContent>
           
         </Content>
      </Container>
   );
};

export default Footer;

import React, {useCallback, useContext, useEffect} from "react";
import { FiLogOut } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import icon from "../../assets/investimentoIcone.png";
import AuthContext from "../../contexts/Authcontext";

import { Container, Content, BoxSign } from "./styles";

const Header = () => {
   const history = useHistory();
   const { user, SignOut } = useContext(AuthContext);

   const handleGoToPage = useCallback((page) => {
      history.push(page);
   }, [history]);

   return (
      <Container>
         <Content>
            <img src={icon} alt="" />

            <BoxSign>
               
               {user?.name && <button> {user.name} </button>}
                  
               {!user && <button onClick={() => handleGoToPage('/signin')}>Investidor</button>}
               <button onClick={SignOut}><FiLogOut /> </button>
            </BoxSign>

         </Content>
      </Container>
   );
};

export default Header;

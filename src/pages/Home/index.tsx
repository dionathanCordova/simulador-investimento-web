import React, { InputHTMLAttributes, useCallback, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import Header from "../../components/HeaderHome";
import icon from '../../assets/icon-preview2.png';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import swal from "sweetalert";

import { 
   Container, 
   Content,
   BoxInfo,
   BoxImage,
   SimuladorContent,
   EntrarContent
} from "./styles";

import Footer from "../../components/Footer";
import Simulacoes from '../../components/Simulacoes';
import AuthContext from "../../contexts/Authcontext";
import api from "../../services/api";

const Home = () => {
   const history = useHistory();

   const { user, signed, UpdateUser } = useContext(AuthContext);

   const [ mesesInvestimento, setmesesInvestimento ] = useState(0); 
   const [ valorInvestimentoInicial, setValorInvestimentoInicial ] = useState(0);
   const [ valorMensal, setValorMensal ] = useState(0);
   const [ valorInvestido, setValorInvestido ] = useState(0);

   const [ taxaCDBDI, setTaxaCDBDI ] = useState(123.5);
   const [ taxaDI, settaxaDI ] = useState(6.39); 
   
   const [ taxaSelic, setTaxaSelic ] = useState(2.25);
   const [ taxaPoupanca, setTaxaPoupanca ] = useState(0);

   const [ valorFinalBrutoCDB, setValorFinalBrutoCDB ] = useState(0);
   const [ valorFinalPoupanca, setValorFinalPoupanca ] = useState(0);

   const [ countSimulacoes, setCountSimulacoes ] = useState(0); 

   useEffect(() => {
      setCountSimulacoes(user?.qtd_simulacoes ? user.qtd_simulacoes : 0);
      handleRetornoRendimentoCDB();
      handleRetornoPoupanca();
   }, [user, mesesInvestimento, valorFinalBrutoCDB, valorInvestido, valorInvestimentoInicial, valorMensal, valorFinalBrutoCDB, valorFinalPoupanca, countSimulacoes]);

   const handleSaveSimulacao = useCallback(async () => {
      const simulacao = await api.post('/simulacao/create', {
         valor_inicial: valorInvestimentoInicial,
         valor_mensal: valorMensal,
         meses_investimento: mesesInvestimento,
         total_investido: valorInvestido,
         total_rendimento_cdb: valorFinalBrutoCDB,
         taxa_percentual_CDI: taxaCDBDI,
         taxa_DI: taxaDI,
         total_rendimento_poupanca: valorFinalPoupanca,
         taxa_poupanca: taxaPoupanca,
         taxa_selid: taxaSelic,
         user_id: user.id
      });

      if(simulacao.status === 200) {
         setCountSimulacoes(simulacao.data.user.qtd_simulacoes);
         UpdateUser(simulacao.data.user);

         swal({
            title: "Investidor!",
            text: "Simulação de investimento armazenada com sucesso!",
            icon: "success",
         });
      }

   }, [valorInvestimentoInicial, valorMensal, mesesInvestimento, valorInvestido, valorFinalBrutoCDB, taxaCDBDI, taxaDI, valorFinalPoupanca, taxaPoupanca, taxaSelic, user, countSimulacoes])

   const handleGoToPage = useCallback((page) => {
      history.push(page);
   }, [history]);

   const handleAddTempo = useCallback((e) => {
      const meses = e.target.value;
      const valorInvestimento = valorInvestimentoInicial + (valorMensal * meses);

      setValorInvestido(valorInvestimento);
      setmesesInvestimento(meses);

      const dias = 30.41 * mesesInvestimento / 1;
   }, [mesesInvestimento, valorInvestimentoInicial, valorMensal, valorInvestido, valorFinalBrutoCDB, valorFinalPoupanca]);

   const handleRetornoRendimentoCDB = useCallback(() => {
         
      const periodoInvestimentoDias = 30.41 * mesesInvestimento / 1;
      const taxaCDI = 110 / 100;
      const taxaAnual = taxaCDI * taxaDI;
      const taxaMensal= taxaAnual / 12;
      const rendimentoMensal = ((valorInvestido * taxaMensal) / 100) * mesesInvestimento;
      const valorTotalLiquido = valorInvestido + rendimentoMensal;

      let imposto = 0;
      if(periodoInvestimentoDias <= 180) {
         imposto = 22.50;
      }

      if(periodoInvestimentoDias > 180 && periodoInvestimentoDias <= 360) {
         imposto = 20;
      }

      if(periodoInvestimentoDias > 360 && periodoInvestimentoDias <= 720) {
         imposto = 17.50;
      }

      if(periodoInvestimentoDias > 720) {
         imposto = 15;
      }

      let valor = valorTotalLiquido - (rendimentoMensal * (imposto / 100));
      
      setValorFinalBrutoCDB(valor);
     
   }, [mesesInvestimento, valorFinalBrutoCDB, valorInvestido])

   const handleRetornoPoupanca = useCallback(() => {
      const percentualSobreSelic = 70 * taxaSelic / 100;
      const percentRendimentoAoMes = ((percentualSobreSelic / 12) / 100) * mesesInvestimento;

      setTaxaPoupanca(percentualSobreSelic);

      setValorFinalPoupanca((valorInvestido * percentRendimentoAoMes) + valorInvestido);
   }, [valorFinalPoupanca, mesesInvestimento, valorInvestido])

   const handleInvestimentoInicial = useCallback((operacao: string) => {
      switch (operacao) {
         case '+':
            const valorInvestimento = valorInvestimentoInicial + 250 + (valorMensal * mesesInvestimento);
           
            setValorInvestido(valorInvestimento);
            setValorInvestimentoInicial(valorInvestimentoInicial + 250);
            break;
         case '-':
            if(valorInvestimentoInicial - 250 >= 0) {
               const valorInvestimento = valorInvestimentoInicial - 250 + (valorMensal * mesesInvestimento);
               setValorInvestido(valorInvestimento);
               setValorInvestimentoInicial(valorInvestimentoInicial - 250);
            }
            break;
      }
   }, [valorInvestimentoInicial, valorMensal, mesesInvestimento, valorFinalBrutoCDB, valorFinalPoupanca])

   const handleInvestimentoMensal = useCallback((operacao: string) => {
      switch (operacao) {
         case '+':
            const valorInvestimento = valorInvestimentoInicial + ((valorMensal + 100) * mesesInvestimento);
            setValorInvestido(valorInvestimento);

            setValorMensal(valorMensal + 100);
            break;
         case '-':
            if(valorMensal - 100 >= 0) {
               const valorInvestimento = valorInvestimentoInicial + ((valorMensal - 100) * mesesInvestimento);
               setValorInvestido(valorInvestimento);
               setValorMensal(valorMensal - 100);
            }
      }
   }, [valorInvestimentoInicial, valorMensal, mesesInvestimento, valorFinalBrutoCDB, valorFinalPoupanca])

   return (
      <Container>
         <Header />
         <Content>
            <BoxInfo>
               <p className="title">
                  Simule seus 
                  <span> Investimentos</span>
               </p>

               <p className="description">
                  Conheça o simulador de investimento comparando o rendimento entre CDB e a poupança e descubra qual terá a melhor rentabilidade.
               </p>
            </BoxInfo>

            <BoxImage>
               <img src={icon} alt="" width="80%"/>
            </BoxImage>
         </Content>

         {signed && 
            <SimuladorContent>
               <div className="simulador">
                  <div className="boxSimulacaoData">
                     <h4>Deposito inicial</h4>

                     <div className="valores">
                        <p>R$</p>
                        <p>{valorInvestimentoInicial.toFixed(2)}</p>
                        <div>
                           <button onClick={() => handleInvestimentoInicial('-')}> - </button>
                           <button onClick={() => handleInvestimentoInicial('+')}> + </button>
                        </div>
                     </div>

                     <h4>Deposito mensal</h4>

                     <div className="valores">
                        <p>R$</p>
                        <p>{valorMensal.toFixed(2)}</p>
                        <div>
                           <button onClick={() => handleInvestimentoMensal('-')}> - </button>
                           <button onClick={() => handleInvestimentoMensal('+')}> + </button>
                        </div>
                     </div>

                     <h4>Tempo de investimento</h4>
                     <p>{mesesInvestimento} meses </p> 
                     <RangeSlider
                        value={mesesInvestimento}
                        onChange={e => handleAddTempo(e)}
                     />
                  </div>
               
                  <div className="boxSimulacaoResultado">
                     <h4>Total investidos</h4>

                     <div className="valores">
                        <p>R$</p>
                        <p>{valorInvestido.toFixed(2)}</p>
                     </div>

                     <h4>Na Poupança renderia <span>com taxa de {taxaPoupanca} % a.a</span></h4>

                     <div className="valores">
                        <p>R$</p>
                        <p>{valorFinalPoupanca.toFixed(2)}</p>
                     </div>

                     <h4>No CDB renderia  <small> com CDI de {taxaCDBDI} % a.a </small></h4>

                     <div className="valores">
                        <p>R$</p>
                        <p>{valorFinalBrutoCDB.toFixed(2)}</p>
                     </div>
                  
                  </div><br/>
               </div>
              
               <EntrarContent>
                  <button onClick={handleSaveSimulacao}>
                     Registrar simulação
                  </button>
               </EntrarContent>
            </SimuladorContent>
         }

         {!signed && 
            <EntrarContent>
               <button onClick={() => handleGoToPage('/signin')}>
                  Fazer simulações
               </button>
            </EntrarContent>
         }

         {user && 
            <Simulacoes qtd_simulacao={countSimulacoes}/>
         }

         <Footer />
      </Container>
   );
};

export default Home;

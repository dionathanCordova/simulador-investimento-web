import React, { useCallback, useContext, useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";
import AuthContext from "../../contexts/Authcontext";
import api from "../../services/api";

import { Container, Content, CardSimulacao } from "./styles";

interface SimulacaoProps {
   created_at: Date;
   id: string;
   meses_investimento: number;
   taxa_DI: number;
   taxa_percentual_CDI: number;
   taxa_poupanca: number;
   taxa_selid: number;
   total_investido: number;
   total_rendimento_cdb: number;
   total_rendimento_poupanca: number;
   updated_at: number;
   user_id: number;
   valor_inicial: number;
   valor_mensal: number;
}

interface Props {
   qtd_simulacao: number;
}

const Simulacoes: React.FC<Props> = ({qtd_simulacao}: Props) => {
   const { user } = useContext(AuthContext);
   const [ simulacoes, setSimulacoes ] = useState([]);

   const formatMoney = useCallback((value: number) => {
      const numberFormat = new Intl.NumberFormat('pt-BR', {
         style: 'currency',
         currency: 'BRL',
         minimumFractionDigits: 2
      }).format(value);

      return numberFormat;
   }, [])

   useEffect(() => {
      async function getSimulacoes() {
         if(user) {
            handleFindSimulacoesUser();
         }
      } 
      getSimulacoes();
   }, [user, qtd_simulacao])

   const handleFindSimulacoesUser = useCallback(async () => {
      const simulacao = await api.get(`simulacao/find/${user.id}`);

      if(simulacao.status === 200) {
         setSimulacoes(simulacao.data);
      }
   }, [simulacoes])

   const handleRemoveSimulacao = useCallback(async (simulacao_id: string) => {
      const remove = await api.delete(`simulacao/remove/${simulacao_id}/${user.id}`);

      if(remove.status === 200) {
         handleFindSimulacoesUser();
      }
   }, [])
   
   
   return (
      <Container>
         <Content>
            <h1>Minhas simulações registradas</h1>
            {qtd_simulacao > 0 && 
               <CardSimulacao>
                  {simulacoes.map((simulacao: SimulacaoProps) => {
                     const data = new Date(simulacao.created_at);
                     return (
                        <div className="simulacao" key={simulacao.id}>
                           <div className="headerCard">
                              <h3>Dados</h3> 
                              <button onClick={() => handleRemoveSimulacao(simulacao.id)}>
                                 <FiTrash />
                              </button>
                           </div>
                           <p>Data: {`${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`}</p>
                           <p>Valor inicial: {formatMoney(simulacao.valor_inicial)}</p>
                           <p>Valor mensal: {formatMoney(simulacao.valor_mensal)}</p>
                           <p>Total investimento: {formatMoney(simulacao.total_investido)}</p>
                           <p>Meses de investimento: {simulacao.meses_investimento}</p><br/><hr/><br/>

                           <h3>Rendimento CDB</h3>
                           <p>Total rendimento: {formatMoney(simulacao.total_rendimento_cdb)}</p>
                           <p>Taxa DI: {simulacao.taxa_DI} a.a</p>
                           <p>Taxa Percentual CDB: {simulacao.taxa_percentual_CDI} %</p><br/><hr/><br/>

                           <h3>Rendimento Poupança</h3>
                           <p>Total rendimento: {formatMoney(simulacao.total_rendimento_poupanca)}</p>
                           <p>Taxa poupança: {simulacao.taxa_poupanca}</p>
                           <p>Taxa selic: {simulacao.taxa_selid}</p>
                        </div>
                     )
                  })}
               </CardSimulacao>
            }

            {qtd_simulacao <= 0 &&
               <div className='emptySimulations'>
                  <h3>Nenhuma simulação registrada no momento</h3>
               </div>
            }
         </Content>
      </Container>
   );
};

export default Simulacoes;

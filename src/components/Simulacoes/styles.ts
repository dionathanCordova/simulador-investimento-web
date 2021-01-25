import styled from 'styled-components';

export const Container = styled.div`
   display: flex;
   flex-direction: row;
   align-items: center;
   justify-content: center;
`;

export const Content = styled.div`
   display: flex;
   flex-direction: column;
   width: 80%;

   h1{
      font-family: 'Amaranth', sans-serif;
      border-bottom: 1px solid #333;
   }

   .emptySimulations{
      display: flex;
      align-items: center;
      justify-content: center;

      margin: 50px;
   }
`

export const CardSimulacao = styled.div`
   width: 100%;

   display: grid;
   grid-template-columns: 1fr 1fr 1fr 1fr;
   grid-column-gap: 20px;

   margin: 40px 0;

   .simulacao{
      margin-top: 20px;
      font-size: 16px;
      padding: 20px;
      background: #fcfcff;
      border-radius: 8px;
      border: 0;
      box-shadow: 10px 10px 23px -17px rgba(0,0,0,0.75);

      h3{
         font-family: 'Amaranth', sans-serif;
      }

      .headerCard{
         display: flex;
         flex-direction: row;
         justify-content: space-between;
         margin-bottom: 20px;

         button{
            border: 0;
            border-radius: 50%;
         }
      }
   }
`

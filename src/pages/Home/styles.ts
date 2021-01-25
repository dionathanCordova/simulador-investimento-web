import styled from 'styled-components';

export const Container = styled.div`
   height: 100vh;
`

export const Content = styled.div`
   display: flex;
   flex-direction: row;
   align-items:center;
   justify-content:center;
   /* justify-content: space-around; */
`

export const SimuladorContent = styled.div`
   display: flex;
   flex-direction: column;
 
   font-family: 'Amaranth', sans-serif;
   margin-bottom: 50px;

   .simulador{
      display: flex;
      flex-direction: row;
      align-items:flex-start;
      justify-content:space-between;

      .boxSimulacaoResultado{
         text-align: start;
         display: flex;
         flex-direction: column;
         font-size: 20px;
         margin-right: auto;
         width: 100%;

         h4 {
            margin-top: 20px;
         }

         .valores{
            display: flex;
            flex-direction: row;

            button{
               border:0;
               margin-left: 20px;
               border-radius:50%;
               width: 35px;
               height: 35px;
               border: 1px solid #333;
               align-self: flex-end;
            }

            .btnIncrementDecrement{
               background:red;
            }

            width: 20rem;

            p {
               color: #3b87d5;
               margin-top: 20px;
               margin-right: 20px;
            }
         }
      }

      .boxSimulacaoData{
         padding: 0 20%;

         border-left: 1px solid #ccc;

         display: flex;
         flex-direction: column;
         font-size: 20px;

         h4 {
            margin-top: 20px;
         }

         .valores{
            display: flex;
            flex-direction: row;
            align-items:center;
            justify-content: space-between;

            button{
               border:0;
               margin-left: 20px;
               border-radius:50%;
               width: 35px;
               height: 35px;
               border: 1px solid #333;
               margin-top: 20px;
            }

            width: 20rem;

            p {
               color: #3b87d5;
               margin-top: 20px;
               margin-right: 20px;
            }
         }
      }

      button{
         width: 200px;
      }
   }
`

export const BoxInfo = styled.div`
   width: 100rem;
   font-size: 60px;
   margin: auto;
   margin-top: 1%;
   line-height: 70px;
   /* font-family: 'Padauk', sans-serif; */
   font-family: 'Andika New Basic', sans-serif;
   margin-bottom: 50px;


   z-index: 999;

   .title {
      padding: 0 20%;
      width: 100%;

      span{
         font-weight: bold;
         font-size: 80px;
         width: 10px;
      }
   }

   .description{
      padding-left: 20%;
      font-size: 30px;
      width: 80%;
      line-height: 40px;

   }
`

export const BoxImage = styled.div`
   width: 100rem;
   margin-bottom: 50px;
`

export const EntrarContent = styled.div`
   width: 100%;
   display: flex;

   align-items: center;
   justify-content: center;

   button {
      margin: 40px;
      font-size: 22px;
      font-family: 'Amaranth', sans-serif;
      margin-left: 20px;
      height: 40px;
      padding: 0 40px;
      background: #fcfcff;
      border-radius: 20px;
      border: 0;
      box-shadow: 10px 10px 53px -17px rgba(0,0,0,0.75);

      :hover{
         background: #e97b3d;
         color: #fcfcff;
      }
   }
`
import styled from 'styled-components';

export const Container = styled.div`
   background: #333;
   width: 100%;
   height: 400px;
`;

export const Content = styled.div`
   display: flex;
   flex-direction: column;

   align-items: center;
   justify-content: space-around;

   color: #FFF;
`

export const MidiaContent = styled.div`
   margin: 40px;
   display: flex;
   flex-direction: row;

   align-items: center;
   justify-content: space-between;

   svg {
      border: 1px solid #ccc;
      border-radius: 50%;
      margin: 40px;
      padding: 10px;
   }
`

export const InfoContent = styled.div`
   display: flex;
   width: 50%;

   justify-content: space-between;
`

export const InfoGroup = styled.div`
   display: flex;
   flex-direction: column;

   H2 {
      font-weight: bold;
      font-family: 'Amaranth', sans-serif;
      margin-bottom: 5px;
   }

   p{
      font-family: Arial, Helvetica, sans-serif;
      line-height: 30px;
   }
`

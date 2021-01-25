import React, { useCallback, useContext, useRef } from "react";
import { FiChevronLeft, FiMail, FiLock, FiUser, FiPhone } from "react-icons/fi";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import getValidationError from "../../utils/getValidationErrors";
import AuthProvider from "../../contexts/Authcontext";
import swal from "sweetalert";

import { Container, Content, Background } from "./styles";

import api from "../../services/api";
import { useHistory } from "react-router-dom";
interface DataProps {
   email: string;
   name: string;
   telefone: string;
}

const Sigin = () => {
   const formRef = useRef<FormHandles>(null);
   const { SignIn } = useContext(AuthProvider);
   const history = useHistory();

   const handleSubmit = useCallback(
      async (data: DataProps) => {
         try {
            const { email, name, telefone } = data;

            const schema = Yup.object().shape({
               email: Yup.string()
                  .email("Digite um email valido")
                  .required("Email é obrigatorio"),
               name: Yup.string().required('Nome é obrigatório'),
               telefone: Yup.string().required('Telefone é obrigatório')
            });

            await schema.validate(data, {
               abortEarly: false,
            });

            try {
               const user = await api.post("/users/create", {
                  email,
                  name,
                  telefone
               });

               if (user.data.statusCode === 200) {
                  const email = user.data.user.user.email;
                  await SignIn(email);
                  history.push("/");
               }
            } catch (error) {
               console.log(error);
               swal({
                  title: "Ops!",
                  text: "Algo errado no sistema.",
                  icon: "warning",
               });
            }
            
         } catch (error) {
            console.log(error);
            const errorInner = JSON.stringify(error.inner);

            const errors = getValidationError(errorInner);
            formRef.current?.setErrors(errors);
         }
      },
      [SignIn, history]
   );

   return (
      <Container>
         <Content>
            <Form ref={formRef} onSubmit={handleSubmit}>
               Cadastre seu dados
               <h1>Informações do investidor</h1>

               <Input name="name" placeholder="Nome completo" icon={FiUser} type="text"/>
               <Input name="email" placeholder="E-mail" icon={FiMail} type="E-mail"/>
               <Input name="telefone" placeholder="Telefone" icon={FiPhone} type="text"/>
               <Button type="submit">Cadastrar</Button>
            </Form>

            <a href="/">
               <FiChevronLeft />
               Voltar
            </a>
         </Content>
         <Background></Background>
      </Container>
   );
};

export default Sigin;

import React, { createContext, useCallback, useState } from 'react';
import api from '../services/api';

interface UserProps {
   id: string;
   name: string;
   email: string;
   whatsapp: string;
   qtd_simulacoes: number;
}

interface ResponseSigin {
   user: UserProps;
   token: string;
   statusCode?: number | boolean;
}

interface SignedResult {
   status: boolean;
}

interface AuthContextData {
   signed: boolean;
   user: UserProps;
   SignIn(
      email: string
   ): Promise<{status: boolean}>;
   SignOut: any;
   UpdateUser(user: UserProps): void
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
   const [ user, setUser ] = useState<UserProps>({} as UserProps);
   const [ signed, setSigned ] = useState(false);

   const [ data, setData ] = useState<ResponseSigin>(() => {
      const storageUser    = localStorage.getItem('@EQI:user');
      const storageToken   = localStorage.getItem('@EQI:token');

      if(storageUser && storageToken) {
         return { user: JSON.parse(storageUser), token: storageToken};
      }

      return {} as ResponseSigin;
   })

   async function SignIn(email: string):Promise<SignedResult> {
      try {
         const response = await api.post<ResponseSigin>('auth', {
            email, 
         })
         const { user, token, statusCode } = response.data;
         
         if(statusCode === 200) {
            localStorage.setItem("@EQI:user", JSON.stringify(user));
            localStorage.setItem("@EQI:token", token);

            setUser(user);
            setSigned(true);
            setData({user, token });
            
            return { status : true}
         }
         
         setSigned(false);
         setUser({} as UserProps);
         setData({} as ResponseSigin);
   
         return { status: false};
      } catch (error) {
         return { status: false};     
      }
   }

   async function SignOut() {
      localStorage.removeItem('@EQI:user');
      localStorage.removeItem('@EQI:token');

      setUser({} as UserProps);
      setSigned(false);
      setData({} as ResponseSigin);

      return { signed: false};
   }

   const UpdateUser = useCallback((user: UserProps) => {
      localStorage.setItem("@EQI:user", JSON.stringify(user));

      setData({
         token: data.token,
         user
      });

   }, [data.token])

   return (
      <AuthContext.Provider value={{ 
         user: data.user,
         signed: !!data.user,
         SignIn,
         SignOut,
         UpdateUser
      }}>
         {children}
      </AuthContext.Provider>
   )
}

export default AuthContext;
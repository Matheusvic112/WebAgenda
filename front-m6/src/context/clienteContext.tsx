import { toast } from "react-toastify";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { iLogin } from "../interfaces/login";
import { iRegister } from "../interfaces/register";
import { api } from "../services/request";
import { errorLogin, RegisterError, RegisterSucesso, sucessoLogin } from "../toast";

export const apiProvider = createContext({} as any);

export default function ApiContext({ children }:any) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();



async function onSubmitLogin(data:iLogin) {
  await api.post("/login", data)
    .then((res) => {
      
      localStorage.setItem("@kenzie:token", res.data.token);
      navigate("/");
      setUser(res.data.user);
      sucessoLogin();
    })
    .catch((_) => {
      errorLogin();
    });
}
      async function onSubmitRegisterUser(data:iRegister) {
        await api.post("/cliente", data)
        .then((res) => {
          navigate("/ladingpage");
          RegisterSucesso();
          console.log(res)
        })
          .catch((_) => {
            RegisterError();
          });
      }

return(
<apiProvider.Provider value={{ onSubmitLogin, onSubmitRegisterUser }}>
    {children}
</apiProvider.Provider>
)
};



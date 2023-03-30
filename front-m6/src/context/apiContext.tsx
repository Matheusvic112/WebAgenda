import { createContext, useContext, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { iLogin } from "../interfaces/login";
import { iRegister } from "../interfaces/register";
import { api } from "../services/request";
import {
  createContact,
  errorLogin,
  RegisterError,
  RegisterSucesso,
  sucessoDelete,
  sucessoEdit,
  sucessoLogin,
} from "../toast";
import { iContact, iUser } from "../interfaces/dashboard";

interface iApiProvider {
  user: iUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<iUser | undefined>>;
  setContacts: React.Dispatch<React.SetStateAction<iContact[]>>;
  contacts: iContact[] | undefined;
  navigate: NavigateFunction;
  onSubmitLogin(data: iLogin): Promise<void>;
  onSubmitRegisterUser(data: iRegister): Promise<void>;
  handleDeleteContato(id: string): void;
  setCurrentContact: React.Dispatch<React.SetStateAction<iContact | undefined>>;
  currentContact: iContact | undefined;
  getNew(): Promise<void>;
  handleAddContato: (onClose: () => void) => Promise<void>;
}
export const apiContext = createContext<iApiProvider>({} as iApiProvider);

function ApiProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<iUser>();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<iContact[]>([]);
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [currentContact, setCurrentContact] = useState<iContact>();

  async function onSubmitLogin(data: iLogin) {
    await api
      .post("/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
        setUser(res.data.user);
        sucessoLogin();
    
      })
      .catch((_) => {
        errorLogin();
      });
  }
  async function onSubmitRegisterUser(data: iRegister) {
    await api
      .post("/client", data)
      .then((res) => {
        navigate("/");
        RegisterSucesso();
        console.log(res);
      })
      .catch((_) => {
        RegisterError();
      });
  }

  async function handleDeleteContato(id: string) {
    const token = localStorage.getItem("token");
    try {
      await api.delete(`/contact/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      sucessoDelete();
      getNew();
    } catch (error) {
      console.error(error);
    }
  }


  async function handleAddContato(onClose: () => void) {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/contact",
        {
          nome_completo: nomeCompleto,
          email: email,
          telefone: telefone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNomeCompleto("");
      setTelefone("");
      setEmail("");
      createContact();
      onClose();
      getNew();
    } catch (error) {
      console.error(error);
    }
  }

  async function getNew() {
    const token = localStorage.getItem("token");

    try {
      const res = await api.get<iUser>("/contact", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setContacts(res.data.contatos);
      setUser(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <apiContext.Provider
      value={{
        user,
        setUser,
        navigate,
        onSubmitLogin,
        onSubmitRegisterUser,
        contacts,
        handleDeleteContato,
        setContacts,
        setCurrentContact,
        currentContact,
        getNew,
        handleAddContato,
      }}
    >
      {children}
    </apiContext.Provider>
  );
}

export const userClienteContext = () => useContext(apiContext);
export { ApiProvider };

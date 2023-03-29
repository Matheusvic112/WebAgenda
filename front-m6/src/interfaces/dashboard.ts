import { Key } from "react";

export interface iUser {
  id: string;
  nome_completo: string;
  telefone: string;
  password: string;
  email: string;
  contatos: iContact[];
}
export interface iContact {
  nome: any;
  id: string;
  nome_completo: string;
  telefone: string;
  email: string;
  
}

export interface NovoContatoModalProps {
  isOpen: boolean;
}

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface EditarModalProps {
  isOpen: boolean;
  onClose: () => void;
  contato: {
    id?: string;
  };
}

export interface IModalProps {
  isOpen: boolean;
  onClose: () => void;
}

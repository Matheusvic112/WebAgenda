export interface iRegister{
    preventDefault(): unknown;
    target: { name: any; value: any }
    email:string
    password:string
    nome_completo:string
    telefone:string
}
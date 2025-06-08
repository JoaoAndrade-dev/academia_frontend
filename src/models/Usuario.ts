import { type Aluno } from "./Aluno";

export interface Usuario {
  id: number;
  nome: string;
  usuario: string;
  senha: string;
  foto?: string;
  tipoUsuario: string;
  aluno?: Aluno[];
}
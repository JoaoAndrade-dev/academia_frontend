import type { Usuario } from "./Usuario";

export interface Aluno {
  id?: number;
  nome: string;
  endereco: string;
  telefone: string;
  dataMatricula?: string;
  peso: number;
  altura: number;

  usuario?: Usuario;

  imc?: number;
  classificacaoImc?: string;
}

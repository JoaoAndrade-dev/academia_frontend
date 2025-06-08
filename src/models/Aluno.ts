// src/models/Aluno.ts
import { type Treino } from "./Treino";
import { type Usuario } from "./Usuario"; // se precisar

export interface Aluno {
  id?: number;
  nome: string;
  endereco: string;
  telefone: string;
  dataMatricula?: string;
  peso: number;
  altura: number;
  treino?: Treino;
  usuario?: Usuario;

  imc?: number;
  classificacaoImc?: string;
}

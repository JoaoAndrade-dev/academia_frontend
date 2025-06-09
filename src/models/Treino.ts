import { type Aluno } from "./Aluno";

export interface Treino {
  id?: number;
  descricao: string;
  diaSemanaTreino: string;
  tipoTreino: string;
  status: string;
  aluno?: Aluno;
}

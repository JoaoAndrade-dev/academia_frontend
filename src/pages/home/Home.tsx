import { Link } from 'react-router-dom'
import ListarTreinos from '../../components/treino/listartreino/ListarTreino'
import DetalheAluno from '../../components/aluno/alunoIMC/AlunoIMC'


export default function Home() {

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Painel do Sistema</h1>
      
      <DetalheAluno />

      <ListarTreinos />

      <div className="flex gap-4 mt-6">
        <Link
          to="/treinos/form"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Cadastrar Treino
        </Link>

        <Link
          to="/alunos/form"
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Cadastrar Aluno
        </Link>

        <Link
          to="/meus-treinos"
          className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded"
        >
          Meus Treinos
        </Link>

      </div>
    </div>
  )
}
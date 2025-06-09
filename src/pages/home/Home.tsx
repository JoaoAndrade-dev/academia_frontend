import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ListarTreinos from '../../components/treino/listartreino/ListarTreino'
import { AuthContext } from '../../contexts/AuthContext'
import { buscar } from '../../services/Service'
import { type Aluno } from '../../models/Aluno'

export default function Home() {
  const { usuario } = useContext(AuthContext)
  const [aluno, setAluno] = useState<Aluno | null>(null)
  const [erro, setErro] = useState('')

  useEffect(() => {
    if (usuario.token && usuario.id) {
      buscar(`/alunos/${usuario.id}`, setAluno, {
        headers: {
          Authorization: usuario.token
        }
      }).catch(() => {
        setErro('Erro ao buscar aluno')
      })
    }
  }, [usuario])

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      <h1 className="text-3xl font-bold mb-4">Painel do Sistema</h1>

      {aluno && (
        <div className="bg-slate-800 p-4 rounded mb-6 shadow">
          <h2 className="text-xl font-semibold mb-2">Informações do Aluno</h2>
          <p><strong>Nome:</strong> {aluno.nome}</p>
          <p><strong>Peso:</strong> {aluno.peso} kg</p>
          <p><strong>Altura:</strong> {aluno.altura} m</p>

          {aluno.imc !== undefined && aluno.classificacaoImc && (
            <>
              <p><strong>IMC:</strong> {aluno.imc.toFixed(2)}</p>
              <p><strong>Classificação:</strong> {aluno.classificacaoImc}</p>
            </>
          )}
        </div>
      )}

      {erro && <p className="text-red-500">{erro}</p>}

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
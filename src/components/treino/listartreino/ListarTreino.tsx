import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { buscar, atualizar } from '../../../services/Service'
import { AuthContext } from '../../../contexts/AuthContext'
import { type Treino } from '../../../models/Treino'
import { type Aluno } from '../../../models/Aluno'

export default function ListarTreinos() {
  const [treinos, setTreinos] = useState<Treino[]>([])
  const [aluno, setAluno] = useState<Aluno | null>(null)
  const { usuario, handleLogout } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (usuario.token) {
      // Buscar treinos
      buscar('/treinos/get-all', setTreinos, {
        headers: { Authorization: usuario.token }
      }).catch((error) => {
        console.error('Erro ao buscar treinos:', error)
        if (error.toString().includes('403')) {
          handleLogout()
        }
      })

      // Buscar alunos
      buscar('/alunos/get-all', (listaAlunos: Aluno[]) => {
        // Filtra aluno que pertence ao usuário logado, verificando se usuario existe
        const alunoDoUsuario = listaAlunos.find(
          (a) => a.usuario?.id === usuario.id
        )
        if (alunoDoUsuario) setAluno(alunoDoUsuario)
      }, {
        headers: { Authorization: usuario.token }
      }).catch((error) => {
        console.error('Erro ao buscar alunos:', error)
        if (error.toString().includes('403')) {
          handleLogout()
        }
      })
    }
  }, [usuario, handleLogout])

  async function adicionarTreino(treinoSelecionado: Treino) {
    if (!aluno) {
      alert('Aluno não encontrado para o usuário logado.')
      return
    }

    try {
      // Atualiza o aluno com o treino selecionado
      const alunoAtualizado = { ...aluno, treino: treinoSelecionado }

      await atualizar('/alunos/atualizar', alunoAtualizado, setAluno, {
        headers: { Authorization: usuario.token }
      })

      alert(`Treino "${treinoSelecionado.descricao}" adicionado ao aluno ${aluno.nome} com sucesso!`)

      // Atualiza localmente o aluno com o novo treino
      setAluno(alunoAtualizado)
    } catch (error) {
      alert('Erro ao adicionar treino ao aluno.')
      console.error(error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded text-gray-900">
      <h2 className="text-2xl font-bold mb-4">Lista de Treinos</h2>

      {aluno && (
        <p className="mb-4 font-semibold">
          Aluno: <span className="text-blue-600">{aluno.nome}</span>
        </p>
      )}

      {treinos.length === 0 ? (
        <p>Nenhum treino encontrado.</p>
      ) : (
        <ul className="space-y-3">
          {treinos.map((treino) => (
            <li
              key={treino.id}
              className="p-4 bg-gray-100 rounded shadow hover:bg-gray-200 transition flex justify-between items-center"
            >
              <div>
                <p><strong>Descrição:</strong> {treino.descricao}</p>
                <p><strong>Dia da Semana:</strong> {treino.diaSemanaTreino}</p>
                <p><strong>Tipo:</strong> {treino.tipoTreino}</p>
                <p><strong>Status:</strong> {treino.status}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => navigate(`/treinos/form/${treino.id}`)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => navigate(`/treinos/deletar/${treino.id}`)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                >
                  Deletar
                </button>
                <button
                  onClick={() => adicionarTreino(treino)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                  title="Adicionar treino ao aluno"
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { buscar } from '../../services/Service'
import { AuthContext } from '../../contexts/AuthContext'
import { type Treino } from '../../models/Treino'
import { type Aluno } from '../../models/Aluno'

export default function MeusTreinos() {
  const [treinos, setTreinos] = useState<Treino[]>([])
  const [aluno, setAluno] = useState<Aluno | null>(null)
  const { usuario, handleLogout } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!usuario.token) return

    buscar('/treinos/get-all', setTreinos, {
      headers: { Authorization:usuario.token }
    }).catch((error) => {
      console.error('Erro ao buscar treinos:', error)
      if (error.toString().includes('403')) handleLogout()
    })

    buscar('/alunos/get-all', (listaAlunos: Aluno[]) => {
      const alunoDoUsuario = listaAlunos.find(
        (a) => a.usuario?.id === usuario.id
      )
      if (alunoDoUsuario) setAluno(alunoDoUsuario)
    }, {
      headers: { Authorization:usuario.token }
    }).catch((error) => {
      console.error('Erro ao buscar alunos:', error)
      if (error.toString().includes('403')) handleLogout()
    })
  }, [usuario, handleLogout])

  const treinosDoAluno = treinos.filter(
    (treino) => treino.aluno?.id === aluno?.id
  )

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      <h2 className="text-2xl font-bold mb-4">Meus Treinos</h2>

      {aluno && (
        <p className="mb-4 font-semibold">
          Aluno: <span className="text-blue-400">{aluno.nome}</span>
        </p>
      )}

      {treinosDoAluno.length === 0 ? (
        <p>Você ainda não possui treinos cadastrados.</p>
      ) : (
        <ul className="space-y-3">
          {treinosDoAluno.map((treino) => (
            <li
              key={treino.id}
              className="p-4 bg-slate-800 rounded shadow hover:bg-slate-700 transition"
            >
              <p><strong>Descrição:</strong> {treino.descricao}</p>
              <p><strong>Dia da Semana:</strong> {treino.diaSemanaTreino}</p>
              <p><strong>Tipo:</strong> {treino.tipoTreino}</p>
              <p><strong>Status:</strong> {treino.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

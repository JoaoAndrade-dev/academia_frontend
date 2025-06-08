import { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import { buscar, deletar } from '../../../services/Service'
import { type Treino } from '../../../models/Treino'

function DeletarTreino() {
  const [treino, setTreino] = useState<Treino>({} as Treino)
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const { usuario, handleLogout } = useContext(AuthContext)
  const token = usuario.token

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado')
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    if (id) {
      buscar(`/treinos/${id}`, setTreino, {
        headers: { Authorization: token }
      })
    }
  }, [id, token])

  async function confirmarExclusao() {
    try {
      await deletar(`/treinos/deletar/${id}`, {
        headers: { Authorization: token }
      })
      alert('Treino deletado com sucesso')
      navigate('/home')
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout()
      } else {
        alert('Erro ao deletar treino')
      }
    }
  }

  function cancelar() {
    navigate('/home')
  }

  return (
    <div className="container mx-auto flex flex-col items-center mt-8 bg-white p-6 rounded shadow max-w-md">
      <h1 className="text-2xl mb-4 font-bold text-center">Deseja realmente deletar o treino?</h1>

      <div className="border border-gray-300 rounded p-4 w-full mb-4">
        <p><strong>ID:</strong> {treino.id}</p>
        <p><strong>Descrição:</strong> {treino.descricao}</p>
        <p><strong>Tipo:</strong> {treino.tipoTreino}</p>
        <p><strong>Dia:</strong> {treino.diaSemanaTreino}</p>
        <p><strong>Status:</strong> {treino.status}</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={confirmarExclusao}
          className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
        >
          Confirmar
        </button>
        <button
          onClick={cancelar}
          className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}

export default DeletarTreino

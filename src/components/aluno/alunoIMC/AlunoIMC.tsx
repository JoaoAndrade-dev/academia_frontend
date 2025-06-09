import { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { buscar } from '../../../services/Service'
import { AuthContext } from '../../../contexts/AuthContext'
import { type Aluno } from '../../../models/Aluno'

export default function DetalheAluno() {
  const { id } = useParams()
  const { usuario } = useContext(AuthContext)
  const [aluno, setAluno] = useState<Aluno | null>(null)
  const [erro, setErro] = useState('')

  useEffect(() => {
    if (id) {
      buscar(`/alunos/${id}`, setAluno, {
        headers: {
          Authorization: usuario.token
        }
      }).catch(() => {
        setErro('Erro ao buscar aluno')
      })
    }
  }, [id, usuario.token])

  if (erro) {
    return <p className="text-red-600">{erro}</p>
  }

  if (!aluno) {
    return <p>Carregando aluno...</p>
  }

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-slate-800 rounded-xl text-slate-100 shadow-md">
      <h2 className="text-2xl font-bold mb-4">Detalhes do Aluno</h2>

      <p><strong>Nome:</strong> {aluno.nome}</p>
      <p><strong>Endereço:</strong> {aluno.endereco}</p>
      <p><strong>Telefone:</strong> {aluno.telefone}</p>
      <p><strong>Peso:</strong> {aluno.peso} kg</p>
      <p><strong>Altura:</strong> {aluno.altura} m</p>

      {aluno.imc !== undefined && aluno.classificacaoImc && (
        <>
          <p><strong>IMC:</strong> {aluno.imc.toFixed(2)}</p>
          <p><strong>Classificação:</strong> {aluno.classificacaoImc}</p>
        </>
      )}
    </div>
  )
}

import { type ChangeEvent, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { buscar, cadastrar, atualizar } from '../../services/Service'
import { type Aluno } from '../../models/Aluno'

function FormAluno() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { usuario } = useContext(AuthContext)

const [aluno, setAluno] = useState<Aluno>({
  nome: '',
  endereco: '',
  telefone: '',
  peso: 0,
  altura: 0,
  usuario: undefined,
})

  useEffect(() => {
    if (id !== undefined) {
      buscar(`/alunos/${id}`, setAluno, {
        headers: { Authorization: usuario.token }
      })
    }
  }, [id, usuario.token])

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setAluno({
      ...aluno,
      [e.target.name]: e.target.value,
    })
  }

 async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()

  try {
    const alunoParaEnviar = {
      ...aluno,
      treino: {id:4},
      usuario: { id: usuario.id }
    }

    if (id !== undefined) {
      await atualizar("/alunos/atualizar", alunoParaEnviar, setAluno, {
        headers: { Authorization: usuario.token }
      });
      alert("Aluno atualizado com sucesso!");
    } else {
      await cadastrar("/alunos/criar", alunoParaEnviar, setAluno, {
        headers: { Authorization: usuario.token }
      });
      alert("Aluno cadastrado com sucesso!");
    }

    navigate('/home')
  } catch (error) {
    alert('Erro ao salvar o aluno. Verifique os dados.')
  }
}

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-slate-800 rounded-xl shadow-md text-slate-100">
      <h2 className="text-2xl font-bold mb-4">
        {id ? 'Editar Aluno' : 'Cadastrar Aluno'}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={aluno.nome}
          onChange={handleInputChange}
          className="p-2 rounded bg-slate-100 text-slate-900"
          required
        />

        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          value={aluno.endereco}
          onChange={handleInputChange}
          className="p-2 rounded bg-slate-100 text-slate-900"
          required
        />

        <input
          type="tel"
          name="telefone"
          placeholder="Telefone"
          value={aluno.telefone}
          onChange={handleInputChange}
          className="p-2 rounded bg-slate-100 text-slate-900"
          required
        />

        <input
          type="number"
          name="peso"
          placeholder="Peso (kg)"
          value={aluno.peso}
          onChange={handleInputChange}
          step="0.1"
          className="p-2 rounded bg-slate-100 text-slate-900"
          required
        />

        <input
          type="number"
          name="altura"
          placeholder="Altura (m)"
          value={aluno.altura}
          onChange={handleInputChange}
          step="0.01"
          className="p-2 rounded bg-slate-100 text-slate-900"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        >
          {id ? 'Atualizar' : 'Cadastrar'}
        </button>
      </form>
    </div>
  )
}

export default FormAluno

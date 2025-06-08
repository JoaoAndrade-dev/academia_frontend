import { useState, useEffect, useContext, type ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { type Treino } from "../../../models/Treino";

function FormTreino() {
  const [treino, setTreino] = useState<Treino>({} as Treino);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  useEffect(() => {
    if (token === '') {
      alert('Você precisa estar logado');
      navigate('/');
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscar(`/treinos/${id}`, setTreino, {
        headers: { Authorization: token }
      });
    }
  }, [id]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setTreino({
      ...treino,
      [e.target.name]: e.target.value
    });
  }

  async function enviarTreino(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (id !== undefined) {
        await atualizar("/treinos/atualizar", treino, setTreino, {
          headers: { Authorization: token }
        });
        alert("Treino atualizado com sucesso!");
      } else {
        await cadastrar("/treinos/criar", treino, setTreino, {
          headers: { Authorization: token }
        });
        alert("Treino cadastrado com sucesso!");
      }
      navigate('/home');
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout();
      } else {
        alert("Erro ao salvar o treino");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{
      maxWidth: '600px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        {id ? "Editar Treino" : "Cadastrar Treino"}
      </h2>

      <form onSubmit={enviarTreino} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label htmlFor="descricao" style={{ display: 'block', marginBottom: '0.5rem' }}>Descrição</label>
          <input
            type="text"
            name="descricao"
            id="descricao"
            required
            value={treino.descricao}
            onChange={atualizarEstado}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label htmlFor="tipoTreino" style={{ display: 'block', marginBottom: '0.5rem' }}>Tipo do Treino</label>
          <input
            type="text"
            name="tipoTreino"
            id="tipoTreino"
            required
            value={treino.tipoTreino}
            onChange={atualizarEstado}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div>
          <label htmlFor="diaSemanaTreino" style={{ display: 'block', marginBottom: '0.5rem' }}>Dia da Semana</label>
          <select
            name="diaSemanaTreino"
            id="diaSemanaTreino"
            required
            value={treino.diaSemanaTreino}
            onChange={atualizarEstado}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="">Selecione</option>
            <option value="Segunda">Segunda</option>
            <option value="Terça">Terça</option>
            <option value="Quarta">Quarta</option>
            <option value="Quinta">Quinta</option>
            <option value="Sexta">Sexta</option>
            <option value="Sábado">Sábado</option>
            <option value="Domingo">Domingo</option>
          </select>
        </div>

        <div>
          <label htmlFor="status" style={{ display: 'block', marginBottom: '0.5rem' }}>Status</label>
          <select
            name="status"
            id="status"
            required
            value={treino.status}
            onChange={atualizarEstado}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
          >
            <option value="">Selecione</option>
            <option value="INCOMPLETO">Incompleto</option>
            <option value="COMPLETO">Completo</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={{
            marginTop: '1rem',
            padding: '0.75rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontWeight: 'bold',
            cursor: 'pointer'
          }}
        >
          {isLoading ? "Salvando..." : id ? "Atualizar" : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}

export default FormTreino;

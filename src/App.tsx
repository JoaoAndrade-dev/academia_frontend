import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import FormTreino from './components/treino/formtreino/FormTreino'
import DeletarTreino from './components/treino/deletartreino/DeletarTreino'
import FormAluno from './components/aluno/FormAluno'
import AlunoIMC from "./components/aluno/alunoIMC/AlunoIMC"
import TreinosDoAluno from './pages/treinosUsuario/TreinosUsuarios'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-[80vh] bg-slate-950">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/treinos/form" element={<FormTreino />} />
            <Route path="/treinos/deletar/:id" element={<DeletarTreino />} />
            <Route path="/treinos/form/:id" element={<FormTreino />} />
            <Route path="/alunos/form" element={<FormAluno />} />
            <Route path="/alunos/form/:id" element={<FormAluno />} />
            <Route path="/alunos/detalhe/:id" element={<AlunoIMC />} />
            <Route path="/meus-treinos" element={<TreinosDoAluno />} />

          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App

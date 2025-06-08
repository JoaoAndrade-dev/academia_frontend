import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { useContext, useEffect, useState, type ChangeEvent } from 'react'
import { RotatingLines } from 'react-loader-spinner'
import type UsuarioLogin from '../../models/UsuarioLogin'

function Login() {
  const navigate = useNavigate()

  const { usuario, handleLogin, isLoading } = useContext(AuthContext)

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(
    {} as UsuarioLogin
  )

  useEffect(() => {
    if (usuario.token !== '') {
      navigate('/home')
    }
  }, [usuario, navigate])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    })
  }

  function login(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    handleLogin(usuarioLogin)
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-slate-900 text-slate-100 px-4">
      <form onSubmit={login} className="w-full max-w-sm flex flex-col gap-4 bg-slate-800 p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <div>
          <label htmlFor="usuario" className="block mb-1">Usuário</label>
          <input
            type="text"
            id="usuario"
            name="usuario"
            value={usuarioLogin.usuario}
            onChange={atualizarEstado}
            className="w-full p-2 rounded bg-slate-100 text-slate-900"
            required
          />
        </div>

        <div>
          <label htmlFor="senha" className="block mb-1">Senha</label>
          <input
            type="password"
            id="senha"
            name="senha"
            value={usuarioLogin.senha}
            onChange={atualizarEstado}
            className="w-full p-2 rounded bg-slate-100 text-slate-900"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded w-full flex justify-center items-center"
        >
          {isLoading ? (
            <RotatingLines
              strokeColor="white"
              strokeWidth="5"
              animationDuration="0.75"
              width="24"
              visible={true}
            />
          ) : (
            'Entrar'
          )}
        </button>

        <p className="text-sm text-center">
          Não tem conta?{' '}
          <Link to="/cadastro" className="underline text-blue-300 hover:text-blue-400">
            Cadastre-se
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login

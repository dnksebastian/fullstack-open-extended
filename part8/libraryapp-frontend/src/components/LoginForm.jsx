import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import { redirect } from "react-router-dom";

import { LOGIN } from "../queries"

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState("johndoe")
  const [password, setPassword] = useState("secret")

  const [ login, result ] = useMutation(LOGIN, {
    onError: (err) => {
        console.log(err)
    }
  })

  useEffect(() => {
    if (result.data) {
        const token = result.data.login.value
        setToken(token)
        localStorage.setItem('userToken', token)
    }
}, [result.data])// eslint-disable-line

const submit = async (e) => {
    e.preventDefault()
    
    login({ variables: { username, password }})

    redirect('/')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username{" "}
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password{" "}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm

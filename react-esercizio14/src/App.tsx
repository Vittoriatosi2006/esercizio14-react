import { useCounter } from "./useCounter";
import { useForm } from "./useForm";
import { useGithubUser } from "./useGithubUser";
import { useCurrentLocation } from "./useCurrentLocation";
import { useState } from "react";

export default function App() {
  const [counter, { onIncrement, onDecrement, onReset }] = useCounter();

  return (
    <div>
      <h1>Contatore</h1>
      <p>Valore: {counter}</p>
      <button onClick={onIncrement}>+</button>
      <button onClick={onDecrement}>-</button>
      <button onClick={onReset}>Reset</button>

      <LoginForm />
      <GithubUserTest />
      <LocationComponent />
    </div>
  );
}
function LoginForm() {
  const { data, handleInputChange } = useForm();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input
          name="username"
          value={data.username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={data.password}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

function GithubUserTest() {
  const [username, setUsername] = useState("");
  const { user, loading, error, fetchUser } = useGithubUser();

  return (
    <div>
      <input
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <button onClick={() => fetchUser(username)}>Cerca</button>

      {loading && <p>Caricamento...</p>}
      {error && <p>Errore: {error}</p>}
      {user && (
        <div>
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
          <img src={user.avatar_url} alt={user.name} />
        </div>
      )}
    </div>
  );
}

function LocationComponent() {
  const { position, loading, error, getCurrentLocation } = useCurrentLocation();

  return (
    <div>
      <button onClick={getCurrentLocation}>Mostra posizione</button>

      {loading && <p>Calcolo posizione...</p>}
      {error && <p>Errore: {error}</p>}
      {position && (
        <p>
          Latitudine: {position.latitude}, Longitudine: {position.longitude}
        </p>
      )}
    </div>
  );
}

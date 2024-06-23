import "./RegistroComponent.css";

function RegistroComponent() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [edad, setEdad] = useState(0);
  

  const sendData = () => {
    const dataToSend = {
      user: user,
      email: email,
      password: password,
      edad: edad,
      idrol: '6650a8b092965c07ccb68d18' // Valor por defecto para idrol
    };

    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };

    fetch("http://localhost:4000/users", settings)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || "Error en la solicitud");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta: ", data);
        alert("Datos enviados exitosamente");
        window.location.href = "/login"; // Redirigir al usuario
      })
      .catch((error) => {
        console.error("Error: ", error.message);
        alert(`Error: ${error.message}`);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let error = false;

    if (user.length < 5) {
      error = true;
      alert("No olvides introducir correctamente tu nombre y apellido");
    }

    if (password.length < 5) {
      error = true;
      alert("La contraseña debe tener al menos 5 caracteres");
    }

    if (!error) {
      sendData();
    }
  };

  return (
    <div className="login-page">
      <div className="formR">
        <form onSubmit={handleSubmit}>
          <div className="img-sm">
            <img src={LogoSinFondo} alt="LogoL" />
          </div>
          <div>
            <input
              type="text"
              name="user"
              id="inputNombre"
              placeholder="Usuario"
              value={user}
              onChange={(event) => setUser(event.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              id="inputCorreo"
              placeholder="Correo"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="number"
              name="edad"
              id="inputEdad"
              placeholder="Edad"
              value={edad}
              onChange={(event) => setEdad(event.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="inputPassword"
              placeholder="Contraseña"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          {/* Campo invisible para idrol */}
          <input
            type="hidden"
            name="idrol"
            value="6650a8b092965c07ccb68d18"
          />
          <div className="buttons">
            <button className="button-regis" type="submit">Crear</button>
          </div>
          <p className="message">¿Ya estás registrado? <a href="/login">Inicia sesión</a></p>
        </form>
      </div>
    </div>
  );
}

export default RegistroComponent;
import Carrito from "../Carrito";
import "./PeliculasComponent.css";
import { useState } from "react";

function PeliculasComponent() {
	const [Selecciongenero, setSelecciongenero] = useState([]);
	const [Seleccionclasificacion, setSeleccionclasificacion] = useState([]);

	// Función para manejar el cambio en los checkboxes de géneros
	const handleGeneroChange = (event) => {
		const genero = event.target.value;
		setSelecciongenero(
			Selecciongenero.includes(genero)
				? Selecciongenero.filter(g => g !== genero)
				: [...Selecciongenero, genero]
		);
	};

	// Función para manejar el cambio en los checkboxes de clasificación
	const handleClasificacionChange = (event) => {
		const rating = event.target.value;
		setSeleccionclasificacion(
			Seleccionclasificacion.includes(rating)
				? Seleccionclasificacion.filter(r => r !== rating)
				: [...Seleccionclasificacion, rating]
		);
	};

	return (
		<div className="container-movie">
			<div className="sidebar-movie">
				<h2>Filtrado</h2>
				<div className="filter-group">
					<h3>Géneros</h3>
					<label>
						<input type="checkbox" value="Accion" onChange={handleGeneroChange} />
						Acción
					</label>
					<label>
						<input type="checkbox" value="Comedia" onChange={handleGeneroChange} />
						Comedia
					</label>
					<label>
						<input type="checkbox" value="Drama" onChange={handleGeneroChange} />
						Drama
					</label>
					<label>
						<input type="checkbox" value="Horror" onChange={handleGeneroChange} />
						Terror
					</label>
				</div>

				<div className="filter-group">
					<h3>Clasificación</h3>
					<label>
						<input type="checkbox" value="A" onChange={handleClasificacionChange} />
						A
					</label>
					{/* <label>
						<input type="checkbox" value="AA" onChange={handleClasificacionChange} />
						AA
					</label> */}
					<label>
						<input type="checkbox" value="B12" onChange={handleClasificacionChange} />
						B12
					</label>
					<label>
						<input type="checkbox" value="C" onChange={handleClasificacionChange} />
						C
					</label>
					{/* <label>
						<input type="checkbox" value="D" onChange={handleClasificacionChange} />
						D
					</label> */}
				</div>
			</div>

			<div className="main-content">
        <Carrito
          Selecciongenero={Selecciongenero}
          Seleccionclasificacion={Seleccionclasificacion}
        />
      </div>
      </div>
	);
}

export default PeliculasComponent;

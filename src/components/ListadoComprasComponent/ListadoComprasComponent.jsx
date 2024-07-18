import React, { useState, useEffect } from 'react';
import NavbarComponent from '../NavbarComponent/NavbarComponent';
import './ListadoComprasComponent.css';



function ListadoComprasComponent() {
  const [compras, setCompras] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCompras = async () => {
      try {
        const response = await fetch('http://localhost:4000/compra');
        const data = await response.json();
        setCompras(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener las compras:', error);
        setIsLoading(false);
      }
    };

    fetchCompras();
  }, []);

  return (
    <div>
      <NavbarComponent />
      <div className="App-compra">
        <header className="App-header-compra">
          <h1 className="title-compra-2">Compras</h1>
        </header>
        <div className="table-container-compra table-wrapper-compra">
          {isLoading ? (
            <p>Cargando...</p>
          ) : (
            <table className="table-compra">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Usuario</th>
                  <th>Película</th>
                  <th>Total</th>
                  <th>Fecha</th>
                </tr>
              </thead>
              <tbody>
                {compras.map((compra) => (
                  <tr key={compra._id}> 
                    <td>{compra._id}</td>
                    <td>{compra.userInfo?.user}</td> 
                    <td>{compra.movInfo?.nombre}</td> 
                    <td>{compra.total}</td>
                    <td>{new Date(compra.fecha).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default ListadoComprasComponent;

// import React, { useState, useEffect } from 'react';
// import NavbarComponent from '../NavbarComponent/NavbarComponent';
// import './ListadoComprasComponent.css';

// function ListadoComprasComponent() {
//   const [compras, setCompras] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchCompras = async () => {
//       try {
//         const response = await fetch('http://localhost:4000/compra');
//         const data = await response.json();
//         setCompras(data);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error al obtener las compras:', error);
//         setIsLoading(false);
//       }
//     };

//     fetchCompras();
//   }, []);

//   return (
//     <div>
//       <NavbarComponent />
//       <div className="App-compra">
//         <header className="App-header-compra">
//           <h1 className="title-compra-2">Compras</h1>
//         </header>
//         <div className="table-container-compra table-wrapper-compra">
//           {isLoading ? (
//             <p>Cargando...</p>
//           ) : (
//             <table className="table-compra">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Usuario</th>
//                   <th>Película</th>
//                   <th>Total</th>
//                   <th>Fecha</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {compras.map((compra) => (
//                   <tr key={compra._id}>
//                     <td>{compra._id}</td>
//                     <td>{compra.userInfo?.user}</td>
//                     <td>{compra.movInfo ? compra.movInfo.nombre : 'Información no disponible'}</td>
//                     <td>{compra.total}</td>
//                     <td>{new Date(compra.fecha).toLocaleDateString()}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ListadoComprasComponent;
import { useState } from 'react';
import { Header } from '../components/Header';
import { ProductList } from '../components/ProductList';

const Carrito = ({ Selecciongenero, Seleccionclasificacion }) => {
	const [allProducts, setAllProducts] = useState([]);
	const [total, setTotal] = useState(0);
	const [countProducts, setCountProducts] = useState(0);

	return (
		<>
			<Header
				allProducts={allProducts}
				setAllProducts={setAllProducts}
				total={total}
				setTotal={setTotal}
				countProducts={countProducts}
				setCountProducts={setCountProducts}
			/>
			<ProductList
				allProducts={allProducts}
				setAllProducts={setAllProducts}
				total={total}
				setTotal={setTotal}
				countProducts={countProducts}
				setCountProducts={setCountProducts}
				Selecciongenero={Selecciongenero}
				Seleccionclasificacion={Seleccionclasificacion}
			/>
		</>
	);
};

export default Carrito;


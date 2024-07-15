import { data } from '../data';

export const ProductList = ({
	allProducts,
	setAllProducts,
	countProducts,
	setCountProducts,
	total,
	setTotal,
	Selecciongenero,
	Seleccionclasificacion,
}) => {
	const onAddProduct = product => {
		if (allProducts.find(item => item.id === product.id)) {
			const products = allProducts.map(item =>
				item.id === product.id
					? { ...item, quantity: item.quantity + 1 }
					: item
			);
			setTotal(total + product.price * product.quantity);
			setCountProducts(countProducts + product.quantity);
			return setAllProducts([...products]);
		}

		setTotal(total + product.price * product.quantity);
		setCountProducts(countProducts + product.quantity);
		setAllProducts([...allProducts, product]);
	};

	// Filtrar productos por género y clasificación seleccionados
	const filteredProducts = data.filter(product =>
		(Selecciongenero.length === 0 || Selecciongenero.includes(product.genero)) &&
		(Seleccionclasificacion.length === 0 || Seleccionclasificacion.includes(product.clasificacion))
	);

	return (
		<div className='container-items'>
			{filteredProducts.map(product => (
				<div className='item' key={product.id}>
					<figure>
						<img src={product.img} alt={product.nameProduct} />
					</figure>
					<div className='info-product'>
						<h2>{product.nameProduct}</h2>
						<p className='genero-movie'>{product.descripcion}</p>
                        <p className='genero-movie'>{product.genero}</p>
						<p className='price'>${product.price}</p>
						<button onClick={() => onAddProduct(product)}>
							Añadir al carrito
						</button>
					</div>
				</div>
			))}
		</div>
	);
};
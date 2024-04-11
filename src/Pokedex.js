import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Pokedex.css";
function Pokedex() {
	const [pageN, setPageN] = useState(0);
	const [loading, setLoading] = useState(true);
	const [pokemons, setPokemons] = useState([]);
	const [imagesLoaded, setImagesLoaded] = useState(true);
	useEffect(() => {
		setLoading(true);
		const getData = async () => {
			const response = await fetch(
				`https://pokeapi.co/api/v2/pokemon?offset=${
					pageN * 20
				}&limit=20`
			);
			const data = await response.json();
			const loadImage = async () => {
				const imagePromises = data.results.map(async (p) => {
					const image = new Image();
					image.src = `https://img.pokemondb.net/sprites/black-white/anim/normal/${p.name}.gif`;
					await image.decode();
				});
				await Promise.all(imagePromises);
				setImagesLoaded(true);
			};
			setPokemons(data.results);
			loadImage();
			setLoading(false);
		};

		getData();
	}, [pageN, setPokemons, setLoading]);

	const handleClick = (newPage) => {
		if (newPage < 0) return;
		setPageN(newPage);
	};

	return (
		<>
			<h1>Pokedex</h1>

			<div className="Pokedex-container">
				{imagesLoaded &&
					pokemons.map((pokemon) => (
						<Link
							style={{ textDecoration: "none" }}
							to={`/pokemon/${pokemon.name}`}
							className="Pokedex-card"
							key={pokemon.name}
						>
							<h3>{pokemon.name}</h3>
							<img
								src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemon.name}.gif`}
								alt={pokemon.name}
							/>
						</Link>
					))}
			</div>
			<div className="Pokedex-nav">
				<button
					className="Pokedex-btn"
					onClick={() => handleClick(pageN - 1)}
				>
					Previous
				</button>
				<button
					className="Pokedex-btn"
					onClick={() => handleClick(pageN + 1)}
				>
					Next
				</button>
				{loading && <p>Loading...</p>}
			</div>
		</>
	);
}

export default Pokedex;

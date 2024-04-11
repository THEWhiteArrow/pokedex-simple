import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Pokemon() {
	const [pokemon, setPokemon] = useState({});
	const [loading, setLoading] = useState(true);
	const { pokemonName } = useParams();

	useEffect(() => {
		const getPokemon = async () => {
			const response = await fetch(
				`https://pokeapi.co/api/v2/pokemon/${pokemonName}`
			);
			const data = await response.json();
			setPokemon(data);
			setLoading(false);
		};

		getPokemon();
	}, [pokemonName, setPokemon, setLoading]);

	const pokemonDiv = (
		<div>
			<img
				src={`https://img.pokemondb.net/sprites/black-white/anim/normal/${pokemonName}.gif`}
				alt={pokemonName}
			/>
			<h3>Height: {pokemon.height}</h3>
			<h3>Weight: {pokemon.weight}</h3>
			<h3>Types:</h3>
			<ul>
				{pokemon.types?.map((type) => (
					<li key={type.slot}>{type.type.name}</li>
				))}
			</ul>
			{/* abilities */}
			<h3>Abilities:</h3>
			<ul>
				{pokemon.abilities?.map((ability) => (
					<li key={ability.slot}>{ability.ability.name}</li>
				))}
			</ul>
			{/* Moves */}
			<h3>Moves:</h3>
			<ul style={{ height: "200px", overflow: "scroll" }}>
				{pokemon.moves?.map((move) => (
					<li key={move.move.name}>{move.move.name}</li>
				))}
			</ul>
		</div>
	);

	return (
		<>
			<h1>{pokemonName}</h1>
			{loading && <h1>Loading...</h1>}
			{!loading && pokemonDiv}
			<Link to="/">Back to Pokedex</Link>
		</>
	);
}

export default Pokemon;

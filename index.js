// console.log("prueba");

// Requisitos
// -Obtener lista pokedex y guardar en variable
// -Obtener el listado de todos los pokemons
// -Obtener todos los pokemons individuales uno a uno
// -Para obtener todos los pokemons, me dice el ejercicio que debo iterar uno por uno.
// -Añadir al DOM los pokemons, dentro del div pokedex.

const pokedex$$ = document.querySelector("#pokedex");
const ALL_POKEMONS_INFO = [];
const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

function getAllPokemons() {
  return fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
    .then((response) => response.json())
    .then((response) => {
      return response.results;
    })
    .catch((error) =>
      console.log("Error obteniendo todos los pokemons", error)
    );
}

function getOnePokemon(url) {
  return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((error) =>
      console.log("Error obteniendo pokemon individual", error)
    );
}

const colorsSetter = (type, html$$) => {
  html$$.style.backgroundColor = typeColors[type];
};

const displayStats = () => {
  const allCardsArray = document.querySelectorAll(".card");

  for (const cards of allCardsArray) {
    cards.addEventListener("mouseover", function () {
      cards.innerHTML = "";
      cards.className = "card-stats";
      //funcion que trae las stats
    });
    cards.addEventListener("mouseout", function () {
      pokedex$$.innerHTML = "";
      renderPokemons(ALL_POKEMONS_INFO);
      displayStats();
    });
  }
};

function renderPokemons(pokemonsArray) {
  pokemonsArray.forEach((pokemon) => {
    const li$$ = document.createElement("li");
    li$$.classList.add("card");

    const img$$ = document.createElement("img");
    img$$.src = pokemon.sprites.front_default;
    img$$.alt = pokemon.name;

    const p$$ = document.createElement("p");
    p$$.classList.add("card-title");
    p$$.textContent = pokemon.name;

    const typesContainer$$ = document.createElement("div");
    typesContainer$$.classList.add("types-container");

    li$$.appendChild(img$$);
    li$$.appendChild(p$$);

    for (const type in pokemon.types) {
      // console.log("Se crea div");
      const div$$ = document.createElement("div");
      // console.log("Se le añade clase al div");
      div$$.classList.add("card-subtitle");
      // console.log("Se le aplica el contenido del div");
      div$$.textContent = pokemon.types[type].type.name;

      // console.log("Entra dentro de la funcion colorSetter");
      colorsSetter(pokemon.types[type].type.name, div$$);

      typesContainer$$.appendChild(div$$);
    }

    li$$.appendChild(typesContainer$$);

    pokedex$$.appendChild(li$$);
  });
  console.log("Se renderizan los pokemons");
}

//Funcion para buscar un pokemon
function searchOnePokemon() {
  const buttonSubmit$$ = document.querySelector(".submit");

  buttonSubmit$$.addEventListener("click", function () {
    const inputSearcher = document.querySelector(".inputPokemonNames");
    var inputContent = inputSearcher.value;
    inputContent = inputContent.toLowerCase();
    // console.log("Deberia de estar en minusculas" , inputContent);

    for (const pokemon of ALL_POKEMONS_INFO) {
      if (inputContent == pokemon.name) {
        pokedex$$.innerHTML = "";
        const searchedPokemon = ALL_POKEMONS_INFO.filter(
          (poke) => poke.name === pokemon.name
        );
        renderPokemons(searchedPokemon);
        inputSearcher.value = "";
      } else if (inputContent == "") {
        location.reload();
      }
    }
  });
}

// Funcion que arranca la web
async function init() {
  console.log("Cargado mi DOM, ejecuto JS");

  const allPokemons = await getAllPokemons();
  // console.log("allPokemons" , allPokemons)

  for (const pokemon of allPokemons) {
    const pokemonIndividualInfo = await getOnePokemon(pokemon.url);
    ALL_POKEMONS_INFO.push(pokemonIndividualInfo);
  }

  console.log("ALL_POKEMONS_INFO: ", ALL_POKEMONS_INFO);

  //Desplegar todos los pokemons almacenados en el array traidos de la API
  renderPokemons(ALL_POKEMONS_INFO);

  //Buscar un pokemon
  searchOnePokemon();

  //Desplegar stat
  displayStats();
}

window.onload = init;

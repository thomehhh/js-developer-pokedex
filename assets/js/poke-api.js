
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    pokemon.weight = pokeDetail.weight
    return pokemon
}

function convertPokeOne(pokeOneDetail) {
    var pokeone = new Pokeone()

    pokeone.number = pokeOneDetail.id
    pokeone.name = pokeOneDetail.name
    pokeone.weight = pokeOneDetail.weight
    pokeone.hp = pokeOneDetail.stats[0].base_stat
    pokeone.atk = pokeOneDetail.stats[1].base_stat
    pokeone.def = pokeOneDetail.stats[2].base_stat
    pokeone.satk = pokeOneDetail.stats[3].base_stat
    pokeone.sdef = pokeOneDetail.stats[4].base_stat
    pokeone.spd = pokeOneDetail.stats[5].base_stat
    pokeone.pic = pokeOneDetail.sprites.other.home.front_default
    const types = pokeOneDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokeone.types = types
    pokeone.type = type
    return pokeone
}



pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

pokeApi.getOnePokemon = async (name) => {
    const urlone = `https://pokeapi.co/api/v2/pokemon/${name}`
   
    const response = await fetch(urlone);
    const pokeDetail = await response.json();
    const pokemonDetail = await convertPokeOne(pokeDetail);
    console.log(pokeDetail.weight);
    return pokemonDetail;

}        

// pokeApi.getOnePokemon = (name) => {
//   const urlone = `https://pokeapi.co/api/v2/pokemon/${name}`

 
//   return fetch(urlone)
//       .then((resposta) => resposta.json())
//       .then(convertPokeOne)
// }        

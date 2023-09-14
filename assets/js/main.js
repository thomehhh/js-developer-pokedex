const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 1021
const limit = 20
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type} newpoke">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml

        document.querySelectorAll('.newpoke').forEach(item => {
            item.addEventListener('click', event => {
                abrirPokemon(item)
            })
          })


    })
}

async function abrirPokemon(item) {
    pokeOneName = item.querySelector('.name').innerHTML;
    pokePronto = await pokeApi.getOnePokemon(pokeOneName);
    loadPokeDetails(pokePronto);
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

async function loadPokeDetails(pokePronto) {
    const hp = await pokePronto.hp / 255 * 10;
    const atk = await pokePronto.atk / 255 * 10;
    const def = await pokePronto.def / 255 * 10;
    const satk = await pokePronto.satk / 255 * 10;
    const sdef = await pokePronto.sdef / 255 * 10;
    const spd = await pokePronto.spd / 255 * 10;
    document.getElementById('detailscontainer').innerHTML = await `
    <div class="blackcurtain" id="blackcurtain">
        <div class="pokedetails ${pokePronto.type}">
            <div class="pokedetails-top">
            <button type="button" class="close" id="close">X</button>
            <img src="${pokePronto.pic}" class="pokepic">
            </div>
            <div class="pokedetails-btm">
                <span class="pokedetailname">${pokePronto.name}</span>
                <ol class="types detailtypes">
                ${pokePronto.types.map((type) => `<li class="detailtype ${type}">${type}</li>`).join('')}
                </ol>
                <div class="statuscontainer">
                    <div class="stsline"><span class="stslbl">HP</span><div class="stsbar ${pokePronto.type}" style="width: ${hp}rem">${pokePronto.hp}</div></div>
                    <div class="stsline"><span class="stslbl">Attack</span><div class="stsbar ${pokePronto.type}" style="width: ${atk}rem">${pokePronto.atk}</div></div>
                    <div class="stsline"><span class="stslbl">Defense</span><div class="stsbar ${pokePronto.type}" style="width: ${def}rem">${pokePronto.def}</div></div>
                    <div class="stsline"><span class="stslbl">Sp. Attack</span><div class="stsbar ${pokePronto.type}" style="width: ${satk}rem">${pokePronto.satk}</div></div>
                    <div class="stsline"><span class="stslbl">Sp. Defense</span><div class="stsbar ${pokePronto.type}" style="width: ${sdef}rem">${pokePronto.sdef}</div></div>
                    <div class="stsline"><span class="stslbl">Speed</span><div class="stsbar ${pokePronto.type}" style="width: ${spd}rem">${pokePronto.spd}</div></div>
                </div>
            </div>
        </div>
    </div>
    `
    const closeButton = await document.getElementById('close');

    closeButton.addEventListener('click', () => {
        const divtchau = document.querySelector('detailscontainer');
        detailscontainer.innerHTML = '';
    })
}

const pokesearch = document.getElementById('pokesearch')

pokesearch.addEventListener('change', event => {
    pokeSearch(pokesearch.value.toLowerCase())
})

async function pokeSearch(pokeOneName) {
    try {
    pokePronto = await pokeApi.getOnePokemon(pokeOneName);
    loadPokeDetails(pokePronto);
    }
    catch { 
        pokesearch.value = "";
        pokesearch.placeholder = "pokémon não encontrado...";
    }
}
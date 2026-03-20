const baseUri = "https://pokeapi.co/api/v2/pokemon/?limit=100"


Vue.createApp({
    Data() {
        return {
            pokemons: [],
            pokemonUrls: [],
            error: null,
        }
    },
    async created() {
        console.log("created method called")
        this.getPokemons(baseUri)
        await this.getUrls(baseUri)
        await this.getPhotos()
    },
    methods: {
        async getPokemons(uri) {
            try {
                const response = await axios.get(uri)
                this.pokemons = response.data.results
                this.error = null
                console.log(this.pokemons)
            } catch (ex) {
                this.pokemons = []
                this.error = ex.message
            }
        },
        async getUrls(uri) {
            const response = await axios.get(uri)
            this.pokemonUrls = response.data.results.map(pokemon => pokemon.url)
            console.log(this.pokemonUrls)
        },
        async getPhotos() {
            const requests = this.pokemonUrls.map(url => axios.get(url))
            const responses = await Promise.all(requests)
            this.pokemons = responses.map(response => ({
                name: response.data.name,
                image: response.data.sprites.front_default
            }))
        },
        cleanList() {
            this.pokemons = []
            this.error = null
        },
        async getByPokemonId(id) {
            if (id == null || id == "") {
                this.error == "There is no Pokemon with that ID";
                this.pokemons = [];
            } else {
                const uri = baseUrl + "?userId=" + id;
                this.getPokemons(uri);
            }
        }
    }
}).mount("#app")
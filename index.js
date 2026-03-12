const baseUri = "https://pokeapi.co/api/v2/pokemon/?limit=100"


Vue.createApp({
    data(){
        return{
            pokemons: [],
            error: null,
        }
    },
    async created(){
        console.log("created method called")
        this.getPokemons(baseUri)
    },
    methods: {
        async getPokemons(uri){
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
        cleanList(){
            this.pokemons = []
            this.error = null
        },
        async getByPokemonId(id){
            if(id == null || id == ""){
                this.error == "There is no Pokemon with that ID";
                this.pokemons = [];
            } else{
                const uri = baseUrl + "?userId=" + id;
                this.getPokemons(uri);
            }
        }
    }
}).mount("#app")
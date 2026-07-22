const app = Vue.createApp({
    data(){
        return {
            giocatori : [],
            nuovoGiocatore : "",
            ruoliSpeciali : {lupo : 0, veggente : 0, dottore : 0, puttana : 0},
            fase : "inserimento"
        }
    },

    methods: {}

});
app.mount("#app")
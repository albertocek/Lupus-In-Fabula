const app = Vue.createApp({
    data(){
        return {
            giocatori : [],
            nuovoGiocatore : "",
            ruoliSpeciali : {lupo : 0, veggente : 0, dottore : 0, puttana : 0},
            fase : "inserimento"
        }
    },

    methods: {
        aggiungiGiocatore(){
            if (this.nuovoGiocatore != ""){
                this.giocatori.push({nome : this.nuovoGiocatore, ruolo : null, vivo : true})
                this.nuovoGiocatore=""
            }
        },

        rimuoviGiocatore(index){
            this.giocatori.splice(index, 1)
        }
    }

});
app.mount("#app")
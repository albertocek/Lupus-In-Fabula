const app = Vue.createApp({
    data(){
        return {
            giocatori : [],
            nuovoGiocatore : "",
            ruoliSpeciali : {lupo : 0, veggente : 0, dottore : 0, puttana : 0},
            fase : "inserimentoGiocatori"
        }
    },

    methods: {
        aggiungiGiocatore(){
            if (this.nuovoGiocatore != ""){
                this.giocatori.push({nome : this.nuovoGiocatore, ruolo : null, vivo : true});
                this.nuovoGiocatore="";
            }
        },

        rimuoviGiocatore(index){
            this.giocatori.splice(index, 1);
        },

        sceltaRuoli(){
            this.fase='sceltaRuoli';
        },

        tornaInserimentoGiocatori(){
            this.fase='inserimentoGiocatori';
            for(let ruolo in this.ruoliSpeciali){
                this.ruoliSpeciali[ruolo] = 0;
            }
        },

        incrementaRuolo(ruolo){
            if(this.totaleContadini > 0) this.ruoliSpeciali[ruolo]++
        },

        decrementaRuolo(ruolo){
            if(this.ruoliSpeciali[ruolo] > 0) this.ruoliSpeciali[ruolo]--
        },

        cominciaPartita(){

        }
    },

    computed: {
        totaleRuoliSpeciali(){
            return Object.values(this.ruoliSpeciali).reduce((somma, valore) => somma + valore, 0);
        },

        totaleContadini(){
            return this.giocatori.length - this.totaleRuoliSpeciali;
        }
    }

});
app.mount("#app")
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

            mazzo = []
            for (let i = 0; i < this.ruoliSpeciali.lupo; i++) mazzo.push("Lupo");
            for (let i = 0; i < this.ruoliSpeciali.dottore; i++) mazzo.push("Dottore");
            for (let i = 0; i < this.ruoliSpeciali.veggente; i++) mazzo.push("Veggente");
            for (let i = 0; i < this.ruoliSpeciali.puttana; i++) mazzo.push("Puttana");
            for (let i = 0; i < this.totaleContadini; i++) mazzo.push("Contadino");
            for (let i = mazzo.length - 1; i > 0; i--){
                const j = Math.floor(Math.random() * (i + 1));
                [mazzo[i], mazzo[j]] = [mazzo[j], mazzo[i]];
            }
            for(let i = 0; i < mazzo.length; i++){
                this.giocatori[i].ruolo = mazzo[i];
            }

            this.fase = "loopRivelazioneRuoli"
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
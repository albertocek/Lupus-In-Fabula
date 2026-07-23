const app = Vue.createApp({
    data(){
        return {
            giocatori : [],
            nuovoGiocatore : "",
            ruoliSpeciali : {lupo : 0, veggente : 0, dottore : 0, puttana : 0},
            fase : "inserimentoGiocatori",
            indiceGiocatoreAttuale : 0,
            ruoloVisibile : false,
            giocatoreSelezionato : null
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
            this.indiceGiocatoreAttuale = 0;
            this.ruoloVisibile = false;
        },

        incrementaRuolo(ruolo){
            if(this.totaleContadini > 0) this.ruoliSpeciali[ruolo]++
        },

        decrementaRuolo(ruolo){
            if(this.ruoliSpeciali[ruolo] > 0) this.ruoliSpeciali[ruolo]--
        },

        cominciaPartita(){
            let mazzo = []
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
        },

        passaAlProssimo() {
            if (this.ruoloVisibile) {
                this.ruoloVisibile = false;
                
                this.indiceGiocatoreAttuale++;

                if (this.indiceGiocatoreAttuale >= this.giocatori.length) {
                    this.fase = 'schermataNarratore';
                }
            }
        },

        selezionaGiocatore(index){
            if(this.giocatoreSelezionato == index)
                    this.giocatoreSelezionato = null;
            else this.giocatoreSelezionato = index
        },

        uccidiGiocatore(index){
            if(this.giocatori[index].vivo){
                this.giocatori[index].vivo = false;
                this.giocatoreSelezionato = null;
            }
        },
        salvaStato(){
            const statoPartita = {
                giocatori : this.giocatori,
                ruoliSpeciali : this.ruoliSpeciali,
                fase : this.fase,
                indiceGiocatoreAttuale : this.indiceGiocatoreAttuale
            }
            localStorage.setItem('statoPartita', JSON.stringify(statoPartita))
        }
    },

    computed: {
        totaleRuoliSpeciali(){
            return Object.values(this.ruoliSpeciali).reduce((somma, valore) => somma + valore, 0);
        },

        totaleContadini(){
            return this.giocatori.length - this.totaleRuoliSpeciali;
        },

        totaleVivi() {
            return this.giocatori.filter(g => g.vivo).length;
        },
        totaleMorti() {
            return this.giocatori.filter(g => !g.vivo).length;
        }
    },
    watch: {
        giocatori: {
            handler: 'salvaStato',
            deep: true
        },
        ruoliSpeciali: {
            handler: 'salvaStato',
            deep: true
        },
        fase: 'salvaStato',
        indiceGiocatoreAttuale: 'salvaStato'
    },

    mounted() {
    const datiSalvati = localStorage.getItem('statoPartita');
    
        if (datiSalvati) {
            try {
                const stato = JSON.parse(datiSalvati);
                this.giocatori = stato.giocatori;
                this.ruoliSpeciali = stato.ruoliSpeciali;
                this.fase = stato.fase;
                this.indiceGiocatoreAttuale = stato.indiceGiocatoreAttuale;
            } catch (errore) {
                console.error("Dati corrotti nel LocalStorage, avvio partita pulita.");
                localStorage.removeItem('lupus_dati');
            }
        }
    }

});
app.mount("#app")
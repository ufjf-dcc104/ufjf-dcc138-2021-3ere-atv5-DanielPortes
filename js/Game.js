export default class Game
{
    constructor(canvas, assets, input)
    {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.assets = assets;
        this.input = input;
        this.cenas = new Map();
        this.cena = null;
    }

    adicionarCena(chave, cena)
    {
        this.cenas.set(chave, cena);
        cena.game = this;
        cena.canvas = this.canvas;
        cena.ctx = this.ctx;
        cena.assets = this.assets;
        cena.input = this.input;
        if (this.cena === null)
        {this.cena = cena;}
    }

    selecionaCena(chave)
    {
        if (this.cenas.has(chave))
        {
            this.parar();
            this.cena = this.cenas.get(chave);
            this.preparar();
            this.iniciar();
        }

    }

    iniciar()
    {
        this.rodando = true;
        this.cena?.iniciar();
    }

    parar()
    {
        this.rodando = false;

        this.cena?.parar();
    }

    preparar()
    {

    }

};
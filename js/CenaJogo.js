import Cena from "./Cena.js";
import Mapa from "./Mapa.js";
import modeloMapa1 from "../maps/mapa1.js";
import Sprite from "./Sprite.js";

export default class CenaJogo extends Cena {
    quandoColidir(a, b) {
        if (!this.aRemover.includes(a)) {
            this.aRemover.push(a);
            if (this.enemies.includes(a)) {
                const idx = this.enemies.indexOf(a);
                this.enemies.splice(idx, 1);
            }
        }
        if (!this.aRemover.includes(b)) {
            this.aRemover.push(b);
            if (this.enemies.includes(b)) {
                const idx = this.enemies.indexOf(b);
                this.enemies.splice(idx, 1);
            }

        }
        if (a.tags.has("pc") && b.tags.has("enemy")) {
            this.game.selecionaCena("fim");
        }
        if (this.enemies.length === 0) {
            this.game.selecionaCena("fim");
        }
    }

    preparar() {
        super.preparar();

        const mapa1 = new Mapa(22, 20, 32);
        mapa1.carregaMapa(modeloMapa1);
        this.configuraMapa(mapa1);

        const pc = new Sprite({x: 300, y: 600, vx: 1000});
        pc.tags.add("pc");
        const cena = this;
        pc.controlar = function (dt) {
            if (cena.input.comandos.get("MOVE_ESQUERDA")) {
                this.vx = -200;
            } else if (cena.input.comandos.get("MOVE_DIREITA")) {
                this.vx = +200;
            } else {
                this.vx = 0;
            }
            if (cena.input.comandos.get("ATIRA")) {
                this.atirar(this.x, this.y);
                cena.input.comandos.set("ATIRA", false);
            }

        };
        this.adicionar(pc);

        this.enemies = [];
        for (let i = 2; i < 10; i++) {
            for (let j = 2; j < 10; j++) {
                const enemy = new Sprite({
                    x: (j * 64), y: (i * 32), vx: 100, vy: 15, color: "red", tags: ["enemy"],
                });
                this.adicionar(enemy);
                this.enemies.push(enemy);
            }
        }

        // const en1 = new Sprite({
        //     x: 100, y: 100, vx: 100, color: "red", controlar: perseguePC, tags: ["enemy"],
        // });
        // this.adicionar(en1);
        /*
                this.adicionar(new Sprite({
                    x: 200, y: 150, vy: 10, color: "red", controlar: perseguePC, tags: ["enemy"],
                }));
                this.adicionar(new Sprite({
                    x: 300, y: 100, vy: 10, color: "red", controlar: perseguePC, tags: ["enemy"],
                }));
                this.adicionar(new Sprite({
                    x: 100, y: 250, vy: 10, color: "red", controlar: perseguePC, tags: ["enemy"],
                }));
            */

    }
};
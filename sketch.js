let itens = [];
let jogador;
let pontos = 0;
let tempo = 60;
let jogoAtivo = true;

function setup() {
  createCanvas(600, 400);
  jogador = new Jogador();
  for (let i = 0; i < 8; i++) {
    itens.push(new Item());
  }
  frameRate(60);
}

function draw() {
  background(120, 200, 100);

  if (jogoAtivo) {
    fill(255);
    textSize(18);
    text("Pontos: " + pontos, 20, 30);
    text("Tempo: " + tempo, 500, 30);

    jogador.mostrar();
    jogador.mover();

    for (let i = 0; i < itens.length; i++) {
      itens[i].cair();
      itens[i].mostrar();

      if (itens[i].atinge(jogador)) {
        if (itens[i].tipo === "bom") {
          pontos += 10;
        } else {
          pontos -= 5;
        }
        itens[i] = new Item(); // reposiciona o item
      }

      if (itens[i].y > height) {
        itens[i] = new Item(); // reposiciona se sair da tela
      }
    }

    if (frameCount % 60 === 0 && tempo > 0) {
      tempo--;
    }

    if (tempo === 0) {
      jogoAtivo = false;
    }
  } else {
    background(50, 150, 50);
    fill(255);
    textAlign(CENTER);
    textSize(32);
    text("Fim de Jogo", width / 2, height / 2 - 30);
    textSize(24);
    text("Pontuação final: " + pontos, width / 2, height / 2 + 10);
    text("Pressione R para reiniciar", width / 2, height / 2 + 50);
  }
}

function keyPressed() {
  if (key === 'R' || key === 'r') {
    pontos = 0;
    tempo = 60;
    jogoAtivo = true;
    itens = [];
    for (let i = 0; i < 8; i++) {
      itens.push(new Item());
    }
  }
}

class Jogador {
  constructor() {
    this.x = width / 2;
    this.y = height - 40;
    this.largura = 60;
    this.altura = 20;
  }

  mostrar() {
    fill(0, 100, 200);
    rect(this.x, this.y, this.largura, this.altura);
  }

  mover() {
    if (keyIsDown(LEFT_ARROW) && this.x > 0) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW) && this.x < width - this.largura) {
      this.x += 5;
    }
  }
}

class Item {
  constructor() {
    this.x = random(20, width - 20);
    this.y = random(-200, -20);
    this.velocidade = random(2, 5);

    let sorteio = random();
    if (sorteio < 0.6) {
      this.tipo = "bom";
      this.nome = random(["Milho", "Cenoura", "Papel"]);
      this.cor = color(255, 215, 0);
    } else {
      this.tipo = "ruim";
      this.nome = random(["Plástico", "Lata", "Lixo eletrônico"]);
      this.cor = color(200, 0, 0);
    }
  }

  mostrar() {
    fill(this.cor);
    ellipse(this.x, this.y, 30, 30);
    fill(0);
    textSize(10);
    textAlign(CENTER);
    text(this.nome, this.x, this.y + 20);
  }

  cair() {
    this.y += this.velocidade;
  }

  atinge(jogador) {
    return (
      this.y > jogador.y &&
      this.y < jogador.y + jogador.altura &&
      this.x > jogador.x &&
      this.x < jogador.x + jogador.largura
    );
  }
}

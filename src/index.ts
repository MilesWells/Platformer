import { Physics, vec } from 'excalibur';
import { Game } from 'Game';

Physics.acc = vec(0, 800);

const game = new Game();
game.start();

import { Physics, vec } from 'excalibur';
import { Game } from 'game';

Physics.acc = vec(0, 800);

const game = new Game();
game.start().then(() => {
	game.goToScene('levelOne');
});

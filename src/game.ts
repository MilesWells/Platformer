import { Engine, DisplayMode, Loader } from 'excalibur';
import { Player } from 'actors/player/player';
import { Resources } from 'resources';
import { LevelOne } from 'scenes/level-one/level-one';

export class Game extends Engine {
	private player: Player;
	private levelOne: LevelOne;

	constructor() {
		super({ displayMode: DisplayMode.FitScreen });
	}

	public start() {
		this.levelOne = new LevelOne();
		this.player = new Player();
		this.levelOne.add(this.player);

		this.add('levelOne', this.levelOne);

		const loader = new Loader(Object.values(Resources));

		return super.start(loader);
	}
}

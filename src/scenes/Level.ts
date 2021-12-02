import { Goal, Floor, Player } from 'actors';
import { Scene } from 'excalibur';
import { Game } from 'Game';

export interface LevelConstructorOptions {
	goal?: Goal;
	sceneKey: string;
	platforms: Floor[];
}

export class Level extends Scene {
	constructor(options: LevelConstructorOptions) {
		super();

		this.#platforms = options.platforms;
		this.#goal = options.goal;

		this.sceneKey = options.sceneKey;
	}

	#platforms;
	#goal?;
	sceneKey;

	public onInitialize(engine: Game) {
		super.onInitialize(engine);
		this.add(new Player());

		this.#platforms.forEach(this.add.bind(this));
		if (this.#goal) this.add(this.#goal);
	}
}

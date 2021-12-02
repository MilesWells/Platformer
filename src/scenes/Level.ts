import { Goal, SolidBarrier, Player } from 'actors';
import { Scene, Vector } from 'excalibur';
import { Game } from 'Game';

export interface LevelConstructorOptions {
	goal?: Goal;
	platforms: SolidBarrier[];
	sceneKey: string;
	startingPosition: Vector;
}

export class Level extends Scene {
	constructor(options: LevelConstructorOptions) {
		super();

		this.#platforms = options.platforms;
		this.#goal = options.goal;
		this.#startingPosition = options.startingPosition;

		this.sceneKey = options.sceneKey;
	}

	#platforms;
	#goal?;
	#startingPosition;
	sceneKey;

	public onInitialize(engine: Game) {
		super.onInitialize(engine);
		const player = new Player(this.#startingPosition);
		player.vel = Vector.Zero;
		this.add(player);
		this.#platforms.forEach(this.add.bind(this));
		if (this.#goal) this.add(this.#goal);
	}
}

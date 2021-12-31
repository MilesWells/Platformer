import { Goal, SolidBarrier, Player } from 'actors';
import { Sword } from 'actors/weapons/Sword';
import { Actor, Scene, Vector } from 'excalibur';
import Game from 'Game';

export interface LevelConstructorOptions {
	actors?: Actor[];
	platforms: SolidBarrier[];
	sceneKey: string;
	startingPosition: Vector;
}

export class Level extends Scene {
	constructor(options: LevelConstructorOptions) {
		super();

		this.#platforms = options.platforms;
		this.#actors = options.actors ?? [];
		this.#startingPosition = options.startingPosition;

		this.sceneKey = options.sceneKey;
	}

	#platforms;
	#actors;
	#startingPosition;
	sceneKey;

	public onInitialize(engine: Game) {
		super.onInitialize(engine);
		const player = new Player({
			startingPosition: this.#startingPosition,
			weapon: new Sword(),
		});
		player.vel = Vector.Zero;
		this.add(player);
		this.#platforms.forEach(this.add.bind(this));
		this.#actors.forEach(this.add.bind(this));
	}
}

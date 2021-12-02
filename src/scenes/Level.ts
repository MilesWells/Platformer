import { Floor } from 'actors/floor';
import { Engine, Scene } from 'excalibur';

export interface LevelConstructorOptions {
	name: string;
	platforms: Floor[];
}

export class Level extends Scene {
	constructor(options: LevelConstructorOptions) {
		super();
		this.#platforms = options.platforms;
		this.name = options.name;
	}

	#platforms: Floor[];
	name: string;

	public onInitialize(engine: Engine) {
		super.onInitialize(engine);
		this.#platforms.forEach(this.add.bind(this));
	}
}

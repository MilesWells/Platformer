import { Engine, DisplayMode, Loader } from 'excalibur';
import { Player } from 'actors/player/player';
import { Resources } from 'resources';
import levelOptions from './scenes';
import { Level } from 'scenes/Level';

export class Game extends Engine {
	#player: Player;
	#scenes: Level[];

	constructor() {
		super({ displayMode: DisplayMode.FitScreen });
	}

	public async start() {
		this.#player = new Player();
		this.#scenes = levelOptions.map(options => new Level(options));
		this.#scenes[0].add(this.#player);
		this.#scenes.forEach(scene => this.add(scene.name, scene));

		const loader = new Loader(Object.values(Resources));
		await super.start(loader);
		this.goToScene(this.#scenes[0].name);
	}
}

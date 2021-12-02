import { Engine, DisplayMode, Loader } from 'excalibur';
import { Resources } from 'resources';
import levelOptions from './scenes';
import { Level } from 'scenes/Level';

export class Game extends Engine {
	#scenes: Level[];

	constructor() {
		super({ displayMode: DisplayMode.FitScreen });
	}

	public async start() {
		this.#scenes = levelOptions.map(options => new Level(options));
		this.#scenes.forEach(scene => this.add(scene.sceneKey, scene));

		const loader = new Loader(Object.values(Resources));
		await super.start(loader);
		this.goToScene(this.#scenes[0].sceneKey);
	}
}

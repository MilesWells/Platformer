import { Floor } from 'actors/floor';
import { Engine, Scene } from 'excalibur';

export class LevelOne extends Scene {
	public onInitialize(engine: Engine) {
		this.add(new Floor(0, 500, 1000));
	}
	public onActivate() {}
	public onDeactivate() {}
}

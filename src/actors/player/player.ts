import { Actor, Color, Engine, Input, vec } from 'excalibur';
import { Resources } from '../../resources';

const BASE_SPEED = 250;

export class Player extends Actor {
	constructor() {
		super({
			pos: vec(150, 150),
			width: 25,
			height: 25,
			color: new Color(255, 255, 255),
		});
	}

	#speed = BASE_SPEED;

	onInitialize() {
		this.graphics.use(Resources.Sword.toSprite());
	}

	update(engine: Engine, delta: number) {
		super.update(engine, delta);

		const keyIsDownLeft = engine.input.keyboard.isHeld(Input.Keys.Left);
		const keyIsDownRight = engine.input.keyboard.isHeld(Input.Keys.Right);

		if (keyIsDownLeft) this.vel.x = -this.#speed;
		if (keyIsDownRight) this.vel.x = this.#speed;
		if (!keyIsDownRight && !keyIsDownLeft) this.vel.x = 0;
	}
}

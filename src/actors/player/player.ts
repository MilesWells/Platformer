import {
	Actor,
	CollisionType,
	Color,
	Engine,
	Input,
	PostCollisionEvent,
	Shape,
	Side,
	vec,
} from 'excalibur';
import { Resources } from 'resources';

const BASE_SPEED = 250;
const BASE_JUMP_POWER = -600;
const FRICTION = 0.9;

export class Player extends Actor {
	constructor() {
		super({
			name: 'Player',
			pos: vec(150, 150),
			width: 25,
			height: 25,
			color: new Color(255, 255, 255),
			collisionType: CollisionType.Active,
			collider: Shape.Box(50, 50),
		});
	}

	#speed = BASE_SPEED;
	#jumpPower = BASE_JUMP_POWER;
	#jumped = false;

	onInitialize() {
		this.graphics.use(Resources.Sword.toSprite());

		this.on('postcollision', this.#onPostCollision);
	}

	#onPostCollision(evt: PostCollisionEvent) {
		this.#handleFloorCollisions(evt);
	}

	#handleFloorCollisions(evt: PostCollisionEvent) {
		const collidedWithFloor = evt.other.name === 'Floor';
		const collidedWithTop = evt.side === Side.Bottom;

		if (collidedWithFloor && collidedWithTop) this.#jumped = false;
	}

	onPreUpdate(engine: Engine, delta: number) {
		super.onPreUpdate(engine, delta);
		this.#handleArrowControls(engine, delta);
	}

	#handleArrowControls(engine: Engine, delta: number) {
		const keyIsDownLeft = engine.input.keyboard.isHeld(Input.Keys.Left);
		const keyIsDownRight = engine.input.keyboard.isHeld(Input.Keys.Right);
		const keyIsDownUp = engine.input.keyboard.isHeld(Input.Keys.Up);

		if (keyIsDownLeft) this.vel.x = -this.#speed;
		if (keyIsDownRight) this.vel.x = this.#speed;

		if (!keyIsDownRight && !keyIsDownLeft) {
			const shouldStop = Math.abs(this.oldVel.x) <= 10;
			this.vel.x = shouldStop ? 0 : this.oldVel.x * FRICTION;
		}

		if (keyIsDownUp && !this.#jumped) {
			this.vel.y = this.oldVel.y + this.#jumpPower;

			this.#jumped = true;
		}
	}
}

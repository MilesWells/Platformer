import {
	Actor,
	CollisionStartEvent,
	CollisionType,
	Color,
	Engine,
	Vector,
} from 'excalibur';

export interface SwitchConstructorOptions {
	color?: Color;
	onToggle: () => void;
	position: Vector;
	size?: number;
}

const DEFAULT_SIZE = 25;
const DEFAULT_COLOR = Color.Violet;

export class Switch extends Actor {
	constructor(options: SwitchConstructorOptions) {
		super({
			name: 'Switch',
			pos: options.position,
			width: options.size ?? DEFAULT_SIZE,
			height: options.size ?? DEFAULT_SIZE,
			color: options.color ?? DEFAULT_COLOR,
			collisionType: CollisionType.Passive,
		});

		this.#onToggle = options.onToggle;
	}

	#isToggled = false;
	#onToggle;

	onInitialize(engine: Engine) {
		super.onInitialize(engine);

		this.on('collisionstart', this.#onCollisionStart);
	}

	#onCollisionStart(evt: CollisionStartEvent) {
		const collidedWithPlayer = evt.other.name === 'Player';

		if (collidedWithPlayer && !this.#isToggled) this.#onToggle();
		if (collidedWithPlayer) this.#isToggled = true;
	}
}

import {
	Actor,
	ActorArgs,
	Direction,
	Engine,
	Sprite,
	Timer,
	Vector,
} from 'excalibur';

export interface AttackConstructorOptions {
	actorArgs?: ActorArgs;
	attackArgs: {
		position: Vector;
		timeToDieMs: number;
	};
}

export abstract class Attack extends Actor {
	constructor(options: AttackConstructorOptions) {
		super({
			pos: options.attackArgs.position,
			...options.actorArgs,
		});

		this.#dieTimer = new Timer({
			fcn: () => this.actions.die(),
			interval: options.attackArgs.timeToDieMs,
		});
	}

	abstract direction: Direction;
	abstract graphic: Sprite;
	abstract graphicOffsetX: number;
	abstract graphicOffsetY: number;
	abstract timeToDieMs: number;

	#dieTimer;

	onInitialize(engine: Engine) {
		super.onInitialize(engine);

		this.scene.addTimer(this.#dieTimer);
		this.#dieTimer.start();

		this.graphic.flipHorizontal = this.direction === Direction.RightToLeft;
		this.graphics.show(this.graphic);
	}
}

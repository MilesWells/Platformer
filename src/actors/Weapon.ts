import { Player } from 'actors';
import { Actor, ActorArgs, Engine, Sprite, Timer, vec } from 'excalibur';

export interface WeaponConstructorOptions {
	actorArgs?: ActorArgs;
	weaponArgs?: {
		cooldown?: number;
	};
}

const DEFAULT_WEAPON_COOLDOWN = 500;

export abstract class Weapon extends Actor {
	constructor(options?: WeaponConstructorOptions) {
		super(options?.actorArgs);

		this.#cooldownTimer = new Timer({
			fcn: () => {
				console.log('weapon cooldown complete');
			},
			interval: options?.weaponArgs?.cooldown ?? DEFAULT_WEAPON_COOLDOWN,
		});
	}

	#cooldownTimer;
	#player: Player;
	#direction: 'left' | 'right' = 'right';
	#oldDirection: 'left' | 'right' = 'right';

	abstract graphic: Sprite;
	abstract graphicOffsetX: number;
	abstract graphicOffsetY: number;

	abstract animate(): void;

	onInitialize(engine: Engine) {
		super.onInitialize(engine);

		this.#player = <Player>this.getAncestors().find(a => a.name === 'Player');

		this.scene.addTimer(this.#cooldownTimer);

		this.graphics.show(this.graphic, {
			offset: vec(this.graphicOffsetX, this.graphicOffsetY),
		});
	}

	onAttack() {
		if (!this.#cooldownTimer.complete) return;
		this.#cooldownTimer.start();
		this.animate();
	}

	onPreUpdate(engine: Engine, delta: number) {
		super.onPreUpdate(engine, delta);
		this.#updateGraphic();
	}

	#updateGraphic() {
		const movingLeft = this.#player.vel.x < 0;
		const movingRight = this.#player.vel.x > 0;

		this.#direction = movingLeft ? 'left' : 'right';
		if (this.#player.vel.x === 0) this.#direction = this.#oldDirection;

		if (movingLeft)
			this.graphics.use(this.graphic, {
				offset: vec(-this.graphicOffsetX, this.graphicOffsetY),
			});
		if (movingRight)
			this.graphics.use(this.graphic, {
				offset: vec(this.graphicOffsetX, this.graphicOffsetY),
			});

		this.graphic.flipHorizontal = this.#direction === 'left';
		this.#oldDirection = this.#direction;
	}
}

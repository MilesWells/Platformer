import {
	Actor,
	clamp,
	CollisionType,
	Color,
	Engine,
	Input,
	PostCollisionEvent,
	Side,
	Timer,
	Vector,
} from 'excalibur';
import { Weapon } from 'actors';

const BASE_SPEED = 250;
const BASE_JUMP_POWER = -400;
const MAX_Y_SPEED_ABS = 600;
const FRICTION = 0.9;
const JUMP_COOLDOWN_MS = 500;
const GLOBAL_ATTACK_COOLDOWN_MS = 500;
const FLOATY_JUMP_THRESHOLD = 75;

export interface PlayerConstructorOptions {
	startingPosition: Vector;
	weapon: Weapon;
}

export class Player extends Actor {
	constructor(options: PlayerConstructorOptions) {
		super({
			name: 'Player',
			pos: options.startingPosition,
			width: 25,
			height: 25,
			color: new Color(255, 255, 255),
			collisionType: CollisionType.Active,
		});

		this.#jumpCooldownTimer = new Timer({
			interval: JUMP_COOLDOWN_MS,
		});

		this.#globalAttackCooldownTimer = new Timer({
			interval: GLOBAL_ATTACK_COOLDOWN_MS,
		});

		this.#weapon = options.weapon;
	}

	#jumpCooldownTimer;
	#globalAttackCooldownTimer;

	#speed = BASE_SPEED;
	#jumpPower = BASE_JUMP_POWER;
	#jumped = false;
	#hasWallJump = true;

	#weapon;

	onInitialize(engine: Engine) {
		super.onInitialize(engine);
		this.scene.addTimer(this.#jumpCooldownTimer);
		this.scene.addTimer(this.#globalAttackCooldownTimer);
		this.#jumpCooldownTimer.start();
		this.#globalAttackCooldownTimer.start();

		this.scene.add(this.#weapon);
		this.addChild(this.#weapon);

		this.on('postcollision', this.#onPostCollision);
	}

	#onPostCollision(evt: PostCollisionEvent) {
		this.#handleFloorCollisions(evt);
	}

	#handleFloorCollisions(evt: PostCollisionEvent) {
		const collidedWithFloor = evt.other.name === 'Floor';
		const collidedWithTop = evt.side === Side.Bottom;
		const collidedWithSide = [Side.Left, Side.Right].includes(evt.side);

		if (collidedWithFloor && collidedWithTop) this.#jumped = false;
		if (collidedWithFloor && collidedWithSide && this.#hasWallJump)
			this.#jumped = false;
	}

	onPreUpdate(engine: Engine, delta: number) {
		super.onPreUpdate(engine, delta);
		this.#handleArrowControls(engine);
		this.#handleAttack(engine);
		this.#lessFloatyJump();
		this.#clampYVelocity();
	}

	#handleArrowControls(engine: Engine) {
		const keyIsDownLeft = engine.input.keyboard.isHeld(Input.Keys.Left);
		const keyIsDownRight = engine.input.keyboard.isHeld(Input.Keys.Right);
		const keyIsDownUp = engine.input.keyboard.isHeld(Input.Keys.Up);

		if (keyIsDownLeft) this.vel.x = -this.#speed;
		if (keyIsDownRight) this.vel.x = this.#speed;

		if (!keyIsDownRight && !keyIsDownLeft) {
			const shouldStop = Math.abs(this.oldVel.x) <= 10;
			this.vel.x = shouldStop ? 0 : this.oldVel.x * FRICTION;
		}

		if (keyIsDownUp && !this.#jumped && this.#jumpCooldownTimer.complete) {
			this.vel.y = this.oldVel.y + this.#jumpPower;

			this.#jumped = true;
			this.#jumpCooldownTimer.start();
		}
	}

	#handleAttack(engine: Engine) {
		if (!this.#globalAttackCooldownTimer.complete) return;

		const keyisDownAttack = engine.input.keyboard.isHeld(Input.Keys.Q);
		if (!keyisDownAttack) return;

		this.#globalAttackCooldownTimer.start();
		this.#weapon.onAttack();
	}

	#lessFloatyJump() {
		const yAbs = Math.abs(this.vel.y);
		const isUnderThreshold = yAbs < FLOATY_JUMP_THRESHOLD;
		const isSlowing = yAbs < Math.abs(this.oldVel.y);
		if (this.#jumped && isUnderThreshold && isSlowing) this.vel.y = 0;
	}

	#clampYVelocity() {
		const clampedAbsVelocity = clamp(Math.abs(this.vel.y), 0, MAX_Y_SPEED_ABS);
		this.vel.y = this.vel.y < 0 ? -clampedAbsVelocity : clampedAbsVelocity;
	}
}

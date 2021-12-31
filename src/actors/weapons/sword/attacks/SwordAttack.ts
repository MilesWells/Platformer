import { Attack, AttackConstructorOptions } from 'actors/weapons';
import { ActorArgs, CollisionType, Direction, Engine, Vector } from 'excalibur';
import { Sprites } from 'resources';

export interface SwordAttackConstructorOptions {
	actorArgs?: ActorArgs;
	attackArgs: {
		position: AttackConstructorOptions['attackArgs']['position'];
	};
	swordAttackArgs: {
		direction: Direction;
	};
}

const ATTACK_MOVE_SPEED = 600;
const TIME_TO_DIE = 300;

export class SwordAttack extends Attack {
	constructor(options: SwordAttackConstructorOptions) {
		super({
			attackArgs: {
				timeToDieMs: TIME_TO_DIE,
				...options.attackArgs,
			},
			actorArgs: {
				collisionType: CollisionType.Passive,
				...options.actorArgs,
			},
		});

		this.direction = options.swordAttackArgs.direction;

		const sign = this.direction === Direction.RightToLeft ? -1 : 1;
		this.vel.x = ATTACK_MOVE_SPEED * sign;
	}

	direction: Direction;
	graphic = Sprites.SwordAttack;
	graphicOffsetX = 0;
	graphicOffsetY = 0;
	timeToDieMs = TIME_TO_DIE;
}

import { Weapon } from 'actors/weapons';
import { Direction } from 'excalibur';
import { Sprites } from 'resources';
import { SwordAttack } from './attacks/SwordAttack';

export class Sword extends Weapon {
	graphicOffsetX = 20;
	graphicOffsetY = 0;
	graphic = Sprites.Sword;

	attack() {
		this.#animate();
		this.#addAttackActor();
	}

	#animate() {
		// TODO: animate this better
		this.actions.rotateTo(Math.PI / 2, Math.PI * 3).rotateTo(0, Math.PI);
	}

	#addAttackActor() {
		this.scene.add(
			new SwordAttack({
				attackArgs: {
					position: this.player.pos,
				},
				swordAttackArgs: {
					direction:
						this.direction === 'left'
							? Direction.RightToLeft
							: Direction.LeftToRight,
				},
			}),
		);
	}
}

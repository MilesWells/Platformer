import { Weapon } from 'actors';
import { swordSprite } from 'resources';

export class Sword extends Weapon {
	graphicOffsetX = 20;
	graphicOffsetY = 0;
	graphic = swordSprite;
	animate() {}
}

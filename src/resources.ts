import { ImageSource } from 'excalibur';
import sword from 'images/sword.png';
import swordAttack from 'images/sword-attack.png';

export const Resources = {
	Sword: new ImageSource(sword),
	SwordAttack: new ImageSource(swordAttack),
};

export const Sprites = {
	Sword: Resources.Sword.toSprite(),
	SwordAttack: Resources.SwordAttack.toSprite(),
};

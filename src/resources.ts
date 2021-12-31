import { ImageSource } from 'excalibur';
import sword from 'images/sword.png';

export const Resources = {
	Sword: new ImageSource(sword),
};

export const swordSprite = Resources.Sword.toSprite();

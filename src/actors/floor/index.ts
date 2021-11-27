import { Actor, CollisionType, Color, vec } from 'excalibur';

export class Floor extends Actor {
	constructor(x: number, y: number, width = 400, height = 50) {
		super({
			name: 'Floor',
			pos: vec(x, y),
			width,
			height,
			color: Color.Black,
			collisionType: CollisionType.Fixed,
		});
	}
}

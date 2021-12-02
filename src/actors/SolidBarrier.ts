import { Actor, CollisionType, Color, vec } from 'excalibur';

export class SolidBarrier extends Actor {
	constructor(x: number, y: number, width: number, height: number) {
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

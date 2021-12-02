import {
	Actor,
	CollisionType,
	Color,
	Engine,
	PostCollisionEvent,
	Vector,
} from 'excalibur';

export class Goal extends Actor {
	constructor(position: Vector, targetSceneKey: string) {
		super({
			name: 'Goal',
			pos: position,
			width: 50,
			height: 50,
			color: new Color(0, 255, 0),
			collisionType: CollisionType.Fixed,
		});

		this.targetSceneKey = targetSceneKey;
	}

	targetSceneKey;

	onInitialize(engine: Engine) {
		super.onInitialize(engine);

		this.on('postcollision', this.#onPostCollision);
	}

	#onPostCollision(evt: PostCollisionEvent) {
		this.#handleFloorCollisions(evt);
	}

	#handleFloorCollisions(evt: PostCollisionEvent) {
		const collidedWithPlayer = evt.other.name === 'Player';

		if (collidedWithPlayer) {
			evt.other.kill();
			this.scene.engine.goToScene(this.targetSceneKey);
		}
	}
}

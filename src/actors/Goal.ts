import {
	Actor,
	CollisionStartEvent,
	CollisionType,
	Color,
	Engine,
	Rectangle,
	Vector,
} from 'excalibur';

const ACTIVE_COLOR = Color.Green;
const INACTIVE_COLOR = Color.Red;

export class Goal extends Actor {
	constructor(position: Vector, targetSceneKey: string) {
		super({
			name: 'Goal',
			pos: position,
			width: 50,
			height: 50,
			collisionType: CollisionType.Passive,
		});

		this.targetSceneKey = targetSceneKey;
		this.#goalGraphic = new Rectangle({
			color: INACTIVE_COLOR,
			height: 50,
			width: 50,
		});
	}

	targetSceneKey;
	canComplete = false;
	#goalGraphic;

	onInitialize(engine: Engine) {
		super.onInitialize(engine);

		this.graphics.add(this.#goalGraphic);

		this.on('collisionstart', this.#onCollisionStart);
	}

	#onCollisionStart(evt: CollisionStartEvent) {
		const collidedWithPlayer = evt.other.name === 'Player';

		if (collidedWithPlayer && this.canComplete) {
			evt.other.kill();
			this.scene.engine.goToScene(this.targetSceneKey);
		}
	}

	onPreUpdate(engine: Engine, delta: number) {
		super.onPreUpdate(engine, delta);

		this.#goalGraphic.color = this.canComplete ? ACTIVE_COLOR : INACTIVE_COLOR;
	}
}

import { Goal, Switch } from 'actors';
import { vec } from 'excalibur';
import { LevelConstructorOptions } from 'scenes/Level';
import { SCENE_KEYS, BOX } from 'scenes/utilities';

const goal = new Goal(vec(300, 200), SCENE_KEYS.level2);
const activateGoalSwitch = new Switch({
	onToggle: () => (goal.canComplete = true),
	position: vec(500, 800),
});

const options: LevelConstructorOptions = {
	actors: [goal, activateGoalSwitch],
	platforms: [...BOX],
	sceneKey: SCENE_KEYS.level1,
	startingPosition: vec(200, 800),
};

export default options;

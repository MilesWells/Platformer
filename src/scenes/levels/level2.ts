import { vec } from 'excalibur';
import { LevelConstructorOptions } from 'scenes/Level';
import { BOX, SCENE_KEYS } from 'scenes/utilities';

const options: LevelConstructorOptions = {
	platforms: [...BOX],
	sceneKey: SCENE_KEYS.level2,
	startingPosition: vec(200, 800),
};

export default options;

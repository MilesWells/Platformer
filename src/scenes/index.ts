import { SolidBarrier, Goal } from 'actors';
import { vec } from 'excalibur';
import {
	FLOOR_DEFAULT_WIDTH,
	FLOOR_DEFAULT_LENGTH,
	GAME_HEIGHT,
	GAME_WIDTH,
} from 'utilities';
import { LevelConstructorOptions } from './Level';

const BOX = [
	new SolidBarrier(
		GAME_WIDTH / 2,
		GAME_HEIGHT - FLOOR_DEFAULT_WIDTH / 2,
		GAME_WIDTH,
		FLOOR_DEFAULT_WIDTH,
	),
	new SolidBarrier(
		GAME_WIDTH / 2,
		FLOOR_DEFAULT_WIDTH / 2,
		GAME_WIDTH,
		FLOOR_DEFAULT_WIDTH,
	),
	new SolidBarrier(
		FLOOR_DEFAULT_WIDTH / 2,
		GAME_HEIGHT / 2,
		FLOOR_DEFAULT_WIDTH,
		GAME_HEIGHT,
	),
	new SolidBarrier(
		GAME_WIDTH - FLOOR_DEFAULT_WIDTH / 2,
		GAME_HEIGHT / 2,
		FLOOR_DEFAULT_WIDTH,
		GAME_HEIGHT,
	),
];

const options: LevelConstructorOptions[] = [
	{
		goal: new Goal(vec(300, 200), 'Level_2'),
		platforms: [...BOX],
		sceneKey: 'Level_1',
		startingPosition: vec(200, 800),
	},
	{
		platforms: [...BOX],
		sceneKey: 'Level_2',
		startingPosition: vec(200, 800),
	},
];

export default options;

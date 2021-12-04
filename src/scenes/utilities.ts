import { SolidBarrier } from 'actors';
import { GAME_WIDTH, GAME_HEIGHT, FLOOR_DEFAULT_WIDTH } from 'utilities';

export const SCENE_KEYS = {
	level1: 'Level_1',
	level2: 'Level_2',
};

export const BOX = [
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

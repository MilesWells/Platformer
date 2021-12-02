import { Floor } from 'actors/floor';
import { Goal } from 'actors/Goal';
import { vec } from 'excalibur';
import { LevelConstructorOptions } from './Level';

const options: LevelConstructorOptions[] = [
	{
		goal: new Goal(vec(100, 200), 'Level_2'),
		sceneKey: 'Level_1',
		platforms: [new Floor(0, 500, 1000), new Floor(0, 0, 50, 1000)],
	},
	{
		sceneKey: 'Level_2',
		platforms: [new Floor(0, 500, 1000)],
	},
];

export default options;

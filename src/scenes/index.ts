import { Floor } from 'actors/floor';

export default [
	{
		name: 'Level_1',
		platforms: [new Floor(0, 500, 1000), new Floor(0, 0, 50, 1000)],
	},
];

import { SongsController } from '@/songs/songs.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('SongsController', () => {
	let controller: SongsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [SongsController],
		}).compile();

		controller = module.get<SongsController>(SongsController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});

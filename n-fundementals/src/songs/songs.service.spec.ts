import { Test, TestingModule } from '@nestjs/testing';
import { SongsService } from '@/songs/songs.service';

describe('SongsService', () => {
	let service: SongsService;

	/**
	 * Sets up the testing module and initializes the `SongsService` before each test.
	 */
	beforeEach(async () => {
		// Create a testing module with `SongsService` as a provider
		const module: TestingModule = await Test.createTestingModule({
			providers: [SongsService],
		}).compile();

		// Retrieve the instance of `SongsService` from the testing module
		service = module.get<SongsService>(SongsService);
	});

	/**
	 * Test to check if the `SongsService` is properly defined.
	 */
	it('should be defined', () => {
		// Verify that the service has been successfully instantiated
		expect(service).toBeDefined();
	});
});

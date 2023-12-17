import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import { Connection } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity';
import { Coffee } from './entities/coffee.entity';

describe('CoffeesService', () => {
  let service: CoffeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        { provide: Connection, useValue: {} },
        { provide: getRepositoryToken(Flavor), useValue: {} },
        { provide: getRepositoryToken(Coffee), useValue: {} }
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    // IF YOU WANT TO RETRIEVE REQUEST SCOPE OR TRANSIENT SCOP PROVIDERS, USE THE RESOLVE INSTEAD OF GET
    // sevice = await module.resolve(CoffeesService)
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

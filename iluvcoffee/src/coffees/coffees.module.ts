import { Injectable, Module, Scope } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constant';


class MockCoffeeService {
    findAll() {
        return 'mock-coffees';
    }
}

class ConfigService { }
class DevelopmentConfigService { }
class ProductionConfigService { }

@Injectable()
class CoffeeBrandsFactory {
    create() {
        return ['buddy brew', 'nescafe'];
    }
}
@Module({
    imports: [
        // MAKE TYPEORM MODULE AWARE OF THE ENTITIES
        TypeOrmModule.forFeature([Coffee, Flavor, Event])
    ],
    controllers: [CoffeesController],
    providers: [
        CoffeesController,
        // CoffeesService,
        {
            provide: CoffeesService,
            useValue: new MockCoffeeService
        },
        {
            provide: COFFEE_BRANDS,
            useValue: ['buddy brew', 'nescafe'],
            // scope: Scope.DEFAULT  // A new instance of the provider is created each time it is requested. This is similar to the behavior of a singleton, but it doesn't persist across different modules
            // scope: Scope.REQUEST // A new instance of the provider is created for each incoming HTTP request.
            // scope: Scope.TRANSIENT // A new instance of the provider is created every time it is injected.
        },
        {
            provide: ConfigService,
            useClass: process.env.NODE_ENV === 'development' ? DevelopmentConfigService : ProductionConfigService
        },
        CoffeeBrandsFactory,
        {
            provide: 'COFFEE_BRANDS_FACTORY',
            useFactory: (brandsFactory: CoffeeBrandsFactory) => brandsFactory.create(),
            inject: [CoffeeBrandsFactory],
        },
        {
            provide: 'ASYNC_COFFEE_BRAND',
            useFactory: async (): Promise<string[]> => {
                const coffeeBrand = await Promise.resolve(['buddy', 'nestcoffee'])
                return coffeeBrand
            }
        }
    ],
    exports: [CoffeesService]
})
export class CoffeesModule { }

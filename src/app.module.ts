
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ApiProductCORSMiddleware } from './cors.middleware';
import { HealthCheckerService } from './server/health-checker/health-checker.service';
import { HealthCheckerController } from './server/health-checker/health-checker.controller';
import { ProductModule } from './module/product/product.module';

@Module({
    imports: [ProductModule],
    controllers: [HealthCheckerController],
    providers: [HealthCheckerService],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(ApiProductCORSMiddleware).forRoutes('/**');
    }
}
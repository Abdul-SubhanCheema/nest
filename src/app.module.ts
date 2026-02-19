import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { LoggerMiddleware } from './Middleware/logger/logger.middleware';
import { ConfigService } from './Providers/ConfigService';
import { Type } from 'class-transformer';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { User } from 'src/user/entity/user.entity';
import { Product } from 'src/product/entity/product.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { CustomerModule } from './customer/customer.module';
import { SaleModule } from './sale/sale.module';

@Module({
  imports: [
    ProductModule,
    TypeOrmModule.forRootAsync({
      inject: [],
      imports: [],
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'Mtbc@19283$',
        database: 'NEST-POS',
        // entities: [User, Product],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UserModule,
    AuthModule,
    CategoryModule,
    CustomerModule,
    SaleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: ConfigService,
      useClass: ConfigService,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('product');
  }
}

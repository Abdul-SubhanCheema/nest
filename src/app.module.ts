import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { LoggerMiddleware } from './Middleware/logger/logger.middleware';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { CustomerModule } from './customer/customer.module';
import { SaleModule } from './sale/sale.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

// const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ProductModule,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
        /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
        const dbType = (configService.get<string>('DATABASE_TYPE') ??
          'postgres') as 'postgres';
        const dbHost =
          configService.get<string>('DATABASE_HOST') ?? 'localhost';

        const dbPort = Number(
          configService.get<string>('DATABASE_PORT') ?? '5432',
        );
        const dbUsername =
          configService.get<string>('DATABASE_USERNAME') ?? 'postgres';
        const dbPassword = configService.get<string>('DATABASE_PASSWORD') ?? '';
        const dbName = configService.get<string>('DATABASE') ?? 'test';

        console.log('DB Config:', {
          type: dbType,
          host: dbHost,
          port: dbPort,
          username: dbUsername,
          password: dbPassword,
          database: dbName,
        });
        return {
          type: dbType,
          host: dbHost,
          port: dbPort,
          username: dbUsername,
          password: dbPassword,
          database: dbName,
          autoLoadEntities: true,
          synchronize: true,
        };
        /* eslint-enable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access */
      },
    }),
    UserModule,
    AuthModule,
    CategoryModule,
    CustomerModule,
    SaleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('product');
  }
}

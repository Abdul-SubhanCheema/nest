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
import { AppConfig } from './Config/app.config'; 
import databaseConfig from './Config/database.config';
import envValidations from './Config/env.validations';

// const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ProductModule,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load:[AppConfig,databaseConfig],
      validationSchema:envValidations
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => {
       
        const dbType = (configService.get<string>('database.type') ??
          'postgres') as 'postgres';
        const dbHost =
          configService.get<string>('database.host') ?? 'localhost';

        const dbPort = Number(
          configService.get<string>('database.port') ?? '5432',
        );
        const dbUsername =
          configService.get<string>('database.username') ?? 'postgres';
        const dbPassword = configService.get<string>('database.password') ?? '';
        const dbName = configService.get<string>('database.database') ?? 'test';
        const dbautoload=configService.get('database.autoLoadEntities');
        const dbsync=configService.get('database.synchronize');

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
          autoLoadEntities: dbautoload,
          synchronize: dbsync,
        };
    
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

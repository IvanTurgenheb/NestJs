import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from './posts/entities/posts.entity';
import { UsersModule } from './users/users.module';
import { UsersModel } from './users/entities/users.entity';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    PostsModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        // forRoot는 typeorm 연결 역할에 사용
        type: 'postgres', // DB type
        host: 'localhost',
        port: configService.get('DB_PORT'),
        username: configService.get('DB_NAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB'),
        entities: [PostsModel, UsersModel],
        synchronize: true, // typeorm과 database의 싱크를 자동으로 맞출건지
        timezone: 'Asia/Seoul',
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModel } from './posts/entities/posts.entity';

@Module({
  imports: [
    PostsModule,
    TypeOrmModule.forRoot({
      // forRoot는 typeorm 연결 역할에 사용
      type: 'postgres', // DB type
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [PostsModel],
      synchronize: true, // typeorm과 database의 싱크를 자동으로 맞출건지
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

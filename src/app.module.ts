import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CompaniesModule } from './companies/companies.module';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { JobsModule } from './jobs/jobs.module';


@Module({
  imports: [
    // MongooseModule.forRoot('mongodb+srv://miyamuradesuu_db_user:natsum!lucy@cluster0.5awld8x.mongodb.net/'),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URL'),
        connectionFactory: (connection) => {
          connection.plugin(softDeletePlugin);
          return connection;
        }
      }),
      inject: [ConfigService],
    }),
 
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule, 
    AuthModule, 
    CompaniesModule, JobsModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService,
    // {
    // provide: APP_GUARD,
    // useClass: JwtAuthGuard,
    // },

  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@shared/guards/auth.guard';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CampusModule } from './campus/campus.module';
import { CareerModule } from './career/career.module';
import { IntentionsModule } from './intentions/intentions.module';
import { InterestModule } from './interest/interest.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CampusModule,
    CareerModule,
    IntentionsModule,
    InterestModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class ApiModule {}

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@shared/guards/auth.guard';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CampusModule } from './campus/campus.module';
import { CareerModule } from './career/career.module';
import { IntentionsModule } from './intentions/intentions.module';
import { InterestModule } from './interest/interest.module';
import { SongsModule } from './songs/songs.module';
import { PhotosModule } from './photos/photos.module';
import { SupabaseModule } from '@libs/supabase/supabase.module';

@Module({
  imports: [
    SupabaseModule,
    AuthModule,
    UserModule,
    CampusModule,
    CareerModule,
    IntentionsModule,
    InterestModule,
    SongsModule,
    PhotosModule,
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

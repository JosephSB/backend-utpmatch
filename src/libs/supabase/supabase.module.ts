import { Global, Module } from '@nestjs/common';
import { SupabaseService } from './supabase.service';

export const SUPABASE_MODULE_KEY = 'SUPABASE_MODULE_KEY';

@Global()
@Module({
  providers: [
    {
      provide: SUPABASE_MODULE_KEY,
      useClass: SupabaseService,
    },
  ],
  exports: [SUPABASE_MODULE_KEY],
})
export class SupabaseModule {}

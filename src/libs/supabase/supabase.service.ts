import { Injectable, Scope } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import config from '@config/index';

@Injectable({ scope: Scope.REQUEST })
export class SupabaseService {
  private clientInstance: SupabaseClient;

  getClient() {
    if (this.clientInstance) {
      return this.clientInstance;
    }

    this.clientInstance = createClient(
      config.SUPABASE.URL,
      config.SUPABASE.KEY,
    );

    return this.clientInstance;
  }
}

import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ProfileModule } from './modules/profile/profile.module';

@Module({
    imports: [
        AuthModule,
        UserModule,
        ProfileModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {  }



import { Module } from '@nestjs/common';
import { S3Service } from './s3.service';
import { EncryptorService } from './encryptor.service';
import { ConfigService } from '@nestjs/config';

@Module({
    controllers: [],
    providers: [S3Service, EncryptorService],
    exports: [S3Service, EncryptorService]
})
export class CommonModule {

}

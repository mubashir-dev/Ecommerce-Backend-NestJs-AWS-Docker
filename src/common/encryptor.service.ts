import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';


@Injectable()
export class EncryptorService {

    async encrypt(text: string, salt: number): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            resolve(bcrypt.hash(text, salt))
        })
    }

    async decrypt(text: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {

        })
    }

    async compareEncrypted(text: string, hash: string): Promise<Boolean> {
        return new Promise<Boolean>((resolve, reject) => {
            resolve(bcrypt.compare(text, hash));
        })
    }

}

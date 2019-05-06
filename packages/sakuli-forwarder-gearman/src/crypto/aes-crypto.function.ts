import { createCipheriv, createCipher, randomBytes, createHash, createDecipheriv } from "crypto";
import { secret, Algorithm } from '@nut-tree/secrets';

export const generateRandom = (params: { byteLength: number } = {
    byteLength: 16,
}): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        randomBytes(params.byteLength, (err, buffer) => {
            if (err) {
                reject(err);
            } else {
                resolve(buffer);
            }
        });
    });
};

export async function encrypt(text: string, password: string, size:number = 32, algorithm: Algorithm = Algorithm.AES256ECB): Promise<string> {
    const pw = Buffer.alloc(size, 0);
    Buffer.from(password).copy(pw);
    return secret.encrypt(
        text,
        pw.toString('base64'),
        algorithm,
    )
}

/*
export async function decrypt(text: string, password: string, size:number = 32, algorithm: Algorithm = Algorithm.AES256ECB): Promise<string> {
    return secret.decrypt(
        text, password, Algorithm.AES256ECB
    )
}
*/

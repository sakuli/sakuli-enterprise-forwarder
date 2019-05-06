import {secret, Algorithm} from '../../node_modules/@nut-tree/secrets/dist';
import {encrypt} from './aes-crypto.function'

describe('crypto', () => {

    const realEncoded = "QvWtruGUJUbnbkMGi1juz93oNJhtw0jdEDvGPeZ7DpnaOngzr2fnYCEqXcqfsi8q0OJtPNZherJhx4gQtIWHtrEjD4bgRTln83tXi+xL0l6lFeYOP4FptN/+iHZPs5k6FV5yjGj0XGPDfWwm7dK2wpRcsAXdGGHqSkO+en+MfLfqVoDfCA5Nqv34b46NjcruNY49JM7BJNAqH091eCUsKhfHWJEEKwsCYoBKpHP37CuYFQVCdSTT2PFs84fszNKE+8TLTMFnXuTYdNC+uxGM5HlDxyosoAEZNLZqQ7PI513rmSpzxV1Vv+34+vjRmdfYu/mXHR07pGKmkuieY6RsAjrZbp5Ly6koDImD/BtWdYkQ5QXlCzzoqY04YxYvVPi7uLXNRKarz/Fgi2sNEFJr+MjVFrhxGclT+dOD2stlgt2zRThF1D5Q2/TDaR8ZGBHBiSPNcWbg80SxOlKk9TRg3laXU4xZWzXDwGWtfWXraua8MHAbfXiOS6COyirDGCMqntYacj2fFm7oXF6yV2rcZ0oNwAWbABBGpVkRkLw+6odYdPf2xUKz6DfyQDtNWHEcSbgUuFh51JzgVEsI6dzd4LEdsmv5rNgk39ilq24pRnSSrq2q5OnoBbTntRfHx8qGvIe7EEsfLjOqI5adXRBZrlGVZwRkwMJ7CWDtCUHr9nl/AnhNvSnpSSH5hbSihTXUMMWsosC06/RAgkeZlND8R5/UtW1Zx47+wR2bKuijl391ADAFhpG/M038GLd3/+v3R57l0kHv6SXBvS65owNK5BVwFAUZuLoE8HGCc6QzyonJbCRhKzt31t+sFkYPbOZUdWjSjeDMAD+nF2NLMPsWHTvmkN7OL5ZzVyT0QodOB+nEOqcYDhMynyQPEkc9yRU8swFrQJ/h9xUTRqI5Pdj5q+F+7iAl5nGVpbsuU0kcuq4ar1beV5BGdWMPCwTJv+Li4xXCbVLK3cwdqFEcsFRA1NoUmewJMu8k/x0FGcxS0rOndZ0jN1oTfNhkOAN2gcrcx1zDe7UH7vRIM+TSragKOEwpPRJQG7MrHPYd7fl4kUpbWBZ1ouX+3aD+0+pFqS3JibQsJgez3+ru1D6SrJGPHtIywZvxU6Xm8RZokYPjgIObRD3jB5wm3dVCnqQgUI12MIqFSwaF5lZLBr8c4r/U9e3pgx3PuxDy/nX216YwtjoL8Ion/yLVI3p0Iz+tm1EZoER3zt0U0CTzR+I+Km5cF3UIba/NtZuitRCBDToHckgv+Js0t9HupV/uXP1y11/hhhykBDLLcV8MwXlZf4XreMB/TuanltoCAgpiOnOGQtyOhS989JkylMv+Ncv6HouaKuF+60x7kbwOiz1GCifBwo96tg+VY5jClycX1ZzPqKWfvYlMAdDRYMOpipmNVqbnOXAwvgYhzUPu5+4bCHQlHesulH6ad66k5dTcxat1oxKpCHyI/xO2wt+ELhY0GTfoz6VPZg8KfiKoqzdhIT9utlR/SFi6PRlT7bqocbDSmSeY6noVuIHgiZGrLWUZKF+vhy8hDgetlmKG+r1Fex7X5bWXS6SIywGwgh4HEDYcaimQf8lSjT0gj0x37XHZbPvZ6ABw64hpwgbfzhGGRYvx5MmMDlVuqUJ6Rfjy/riAY8Ewzo80/6kyxy6G51s5GrVd2e8POxzzV9mfLOyCrrfIhOVzb0dzd8glOGMkAMCikdI68tRJQjixUbSJgNXiuLiWRPccN0RxH674R3lBCPnDTWxbKohLVDR1s4o4MJ0RVGwkk0dO2A9fDwVeL1EeXpLw2mIpHon3brVhWtYTkfFVhxJtjHuPnEPWfjud7XB8JAmQ49wZE0GMwvWhP3ITz/Mf";
    const realPlainText = "type=passive\n" +
    "host_name=sakuli_client\n" +
    "start_time=1555063208.996\n" +
    "finish_time=1555063212.059\n" +
    "return_code=0\n" +
    "service_description=example_xfce_case1_Test_Sahi_landing_page\n" +
    "output=[OK] Step \"Test_Sahi_landing_page\" in case \"case1\" of Sakuli suite \"example_xfce\" ok (3.06s). (Last test step run: 12.04.19 10:00:12)\\n<style>.modalDialog {width: 640px;}.modalDialog:target {width: auto;margin: 20px auto;overflow: scroll;position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 99999;opacity: 1;pointer-events: auto;}.modalDialog:target .close {display: block;}.modalDialog:target .screenshot {width: 100%;border: 2px solid #333;}.screenshot {width: 98%;border: 2px solid  gray;display: block;margin-left: auto;margin-right: auto;margin-bottom: 4px;cursor: -webkit-zoom-in;cursor: -moz-zoom-in;}.close {display: none;background: #aaa;color: #fff;line-height: 25px;position: absolute;right: 10px;text-align: center;top: 25px;width: 65px;text-decoration: none;font-weight: bold;-webkit-border-radius: 12px;-moz-border-radius: 12px;border-radius: 12px;}.close:hover {background: #333;}</style><table style=\"border-collapse: collapse;\"><tr valign=\"top\"><td class=\"serviceOK\">[OK] Step \"Test_Sahi_landing_page\" in case \"case1\" ok (3.06s) . (Last suite run: 12.04.19 10:00:12)</td></tr></table>| suite_example_xfce=0;;;; graph_type_step=0;;;; s_001_Test_Sahi_landing_page=3.06s;50;;; [check_sakuli]\n";

    it('should encode with key-length 32', async () => {
        const algorithm = Algorithm.AES256ECB;
        const keySize = 32;
        await expect(encrypt(realPlainText, 'sakuli_secret', keySize, algorithm)).resolves.toEqual(realEncoded);
    })

    describe.each`
        value                       | password                                                                                 | encrypted
        ${'Secret text to encrypt'} | ${'encryptor_secret_key'}                                                                | ${'NCC64tvdrOdDJRTAIWOYEz9o2KqukmdFC3eaa7lfqMc='}
        ${'Secret text to encrypt'} | ${'x'}                                                                                   | ${'dGxoOqphwaGflpwEstig7SjWzofc65ZJeK7wmTEaeOQ='}        
        ${'Secret text to encrypt'} | ${'xyxyxyxyxyxyxyxyxyxyxyxyxyxyxyxyxyxyxyxyxyxyxyxyxyxyxyxyxyxyxyxyxyxyxyxyxyxyxyxyxyx'} | ${'QBcopjh2RIVQAeu01TBbxpgp6Zpcseu7B8t+Hk2GXIA='}
    `('"$value":"$password"', ({value, password, encrypted}) => {
        
        const algorithm = Algorithm.AES128ECB;
        const keySize = 16;

        it(`should encrypt ${value} with ${password} to ${encrypted}`, async () => {            
            await expect(encrypt(value, password, keySize, algorithm)).resolves.toEqual(encrypted);
        })

    })

})
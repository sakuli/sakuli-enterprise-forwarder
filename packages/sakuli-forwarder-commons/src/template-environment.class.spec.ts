import { TemplateEnvironment } from "./template-environment.class";
import { promises as fs } from "fs";
import { tmpdir } from 'os'
import { join, sep } from "path";

describe.only('TemplateEnvironment', () => {

    let tplEnv: TemplateEnvironment;
    let tempDir: string;
    beforeEach(async () => {
        tempDir = await fs.mkdtemp(join(tmpdir(), 'rts'));
        await fs.writeFile(join(tempDir, 'hello_name.twig'), 'Hello {{ name }}');
        await fs.writeFile(join(tempDir, 'spaceless.twig'),
        `{% spaceless %}
            <div>
                <strong>$whitespace$foo$newline$</strong>
            </div>
        {% endspaceless %}`);
        tplEnv = new TemplateEnvironment(tempDir);
    });

    afterEach(async () => {
        if(tempDir) {
            await fs.unlink(tempDir).catch(() => {});
        }
    })

    it('should remove spacess while preserving $newline$ and $whitespace$', () => {
        const tpl = tplEnv.getTemplate('spaceless.twig');
        expect(tpl.render({}))
            .toEqual('<div><strong> foo\n</strong></div>')
    })

    it('should resolve a rendered string', () => {
        const tpl = tplEnv.getTemplate('hello_name.twig');
        expect(tpl.render({
            name: 'World'
        })).toEqual('Hello World')
    })

})
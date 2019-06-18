import {TwingEnvironment, TwingLoaderFilesystem, TwingTemplateWrapper, TwingFilter, TwingFunction, TwingExtension} from 'twing';
import {TwigSakuliExtension} from './twig-extensions';

export class TemplateEnvironment {
    loader: TwingLoaderFilesystem;
    twingEnv: TwingEnvironment;
    constructor(
        readonly rootPath: string = process.cwd()
    ) {
        this.loader = new TwingLoaderFilesystem(rootPath);
        this.twingEnv = new TwingEnvironment(this.loader, {
            autoescape: false
        });
        this.twingEnv.addExtension(new TwigSakuliExtension);
    }

    getTemplate(path: string): TwingTemplateWrapper {
        return this.twingEnv.load(path);
    }
}

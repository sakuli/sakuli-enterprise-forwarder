import { TwingExtension, TwingFunction } from 'twing';
import { ExtendedTwingTokenParserSpaceless } from './extendend-spaceless-token-parser.class';
import { abbreviate } from './abbreviate.function';
import { convertToUnixTimestamp } from './convert-to-unix-timestamp.function';
import { empty } from './empty.function';
import { extractScreenshot } from './extract-screenshot.function';
import { format } from './format.function';
import { getOutputDuration } from './get-output-duration.function';
import { getOutputState } from './get-output-state.function';
import { getTestDataEntityType } from './get-test-data-entity-type.function';
import { isBlank } from './is-blank.function';

export * from './get-output-state.function';
export * from './get-test-data-entity-type.function';
export * from './abbreviate.function';
export * from './empty.function';
export * from './get-output-duration.function';
export * from './format.function';
export * from './extract-screenshot.function';
export * from './convert-to-unix-timestamp.function';
export * from './is-blank.function';

export class TwigSakuliExtension extends TwingExtension {
    
    readonly functions: TwingFunction[] = [
        abbreviate,
        convertToUnixTimestamp,
        empty,
        extractScreenshot,
        format,
        getOutputDuration,
        getOutputState,
        getTestDataEntityType,
        isBlank
    ]

    getTokenParsers() {
        return [new ExtendedTwingTokenParserSpaceless()];
    }

    getFunctions() {
        const functions = new Map<string | number, TwingFunction>();
        this.functions.forEach(fn => functions.set(fn.getName(), fn));
        return functions;
    }
}
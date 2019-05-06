import { TwingToken, TwingNode, TwingNodeSpaceless, TwingTokenParserSpaceless, TwingCompiler } from "twing";

export class ExtendedTwingTokenParserSpaceless extends TwingTokenParserSpaceless {
    parse(token: TwingToken): TwingNode {
        let lineno = token.getLine();
        let columnno = token.getColumn();

        this.parser.getStream().expect(TwingToken.BLOCK_END_TYPE);
        let body = this.parser.subparse([this, this.decideSpacelessEnd], true);
        this.parser.getStream().expect(TwingToken.BLOCK_END_TYPE);

        return new ExtendendTwingNodeSpaceless(body, lineno, columnno, this.getTag());
    }

}

class ExtendendTwingNodeSpaceless extends TwingNodeSpaceless {
    compile(compiler: TwingCompiler) {
        console.log('Running extended spaceless');

        //.replaceAll("(?m)^[\\s\\t]+|\\n|\\r", "")
        const runTimeOperations = [
            ".obGetClean()",
            ".replace(/>\\s+</g, '><')",
            ".trim()",
            ".replace(/^\\s+|\\s+$/gm, '')",
            ".replace(/\\$whitespace\\$/g, ' ')",
            ".replace(/\\$newline\\$/g, '\\n')",
        ].join('');

        console.log('RT: ', runTimeOperations);
        compiler
            .addDebugInfo(this)
            .addSourceMapEnter(this)
            .write("Runtime.obStart();\n")
            .subcompile(this.getNode('body'))
            .write(`Runtime.echo(Runtime${runTimeOperations});\n`)
            .addSourceMapLeave()
    }
}
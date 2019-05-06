import { TwingFunction } from "twing";
import { readFileSync } from "fs";
import uuid from 'uuid/v4';

const template = ({id, format, base64Screenshot}: {id: string, format: string, base64Screenshot: string}) => `
<div id="${id}">
    <div id="openModal_${id}" class="modalDialog">
        <a href="#close" title="Close" class="close">Close X</a>
        <a href="#openModal">
            <img class="screenshot" src="data:image/${format};base64,${base64Screenshot}" />
        </a>
    </div>
</div>
`;


export const extractScreenshot = new TwingFunction('extractScreenshot', (error: any | {screeshot:string}) => {
    if(error != null && "screenshot" in error) {
        const format = error.screenshot.split('.').pop();
        const screeShotFile = readFileSync(error.screenshot)
        const base64Screenshot = new Buffer(screeShotFile).toString('base64');        
        return template({
            id: uuid(),
            base64Screenshot,
            format
        })
    } else {
        return ''
    }

});
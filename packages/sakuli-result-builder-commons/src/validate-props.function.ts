import {validate} from "class-validator";

export const validateProps = async <T extends Object>(props: T) => {
    const validationErrors = await validate(props);
    if (validationErrors.length) {
        throw Error(validationErrors.map(e => e.toString()).join("\n"))
    }
};
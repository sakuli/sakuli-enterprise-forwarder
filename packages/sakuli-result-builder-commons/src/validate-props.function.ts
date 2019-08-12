import {validate} from "class-validator";

export const validateProps = async <T>(props: T) => {
    const validationErrors = await validate(props);
    if (validationErrors.length) {
        throw Error(validationErrors.map(e => e.toString()).join("\n"))
    }
};
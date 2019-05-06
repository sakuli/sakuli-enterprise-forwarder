import { TwingFunction } from "twing";
import { format as sprintf } from "util";

export const format = new TwingFunction('format', sprintf)
/**
 * Contains the libjame node that the graphical input nodes use
 */

import Node from "libjame/src/Node";
import {PORT_TYPES, PORT_DIRECTIONS} from "libjame/src/Port";

export enum INPUT_TYPES {
    BUTTON = "button",
    CHECKBOX = "checkbox",
    NUMBER = "number",
    SLIDER = "range"
};

type BorkInputNodeParams = {
    id?: any,
    type: INPUT_TYPES,
    min?: number,
    max?: number,
    name: string,
};

export default class BorkInputNode extends Node {
    constructor(params: BorkInputNodeParams) {
        super(params);

        // let ports = [];

        if (params.type === "button") {
            this._addPort({
                id: "trigger",
                type: PORT_TYPES.TRIGGER,
                direction: PORT_DIRECTIONS.OUT,
                name: "Trigger from button"
            });
        } else {
            this._addPort({
                id: "value",
                type: PORT_TYPES.PARAM,
                direction: PORT_DIRECTIONS.OUT,
                name: "Input Value"
            });
        }
    }
}

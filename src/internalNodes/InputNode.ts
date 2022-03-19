/**
 * Contains the libjame node that the graphical input nodes use
 */

import Node from "libjame/src/Node";
import Port, {PORT_TYPES, PORT_DIRECTIONS, buildPortObj} from "libjame/src/Port";

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
            // ports.push(new Port("trigger", null, PORT_TYPES.TRIGGER, null, null, PORT_DIRECTIONS.OUT, "Trigger from button"));
            this._addPort({
                id: "trigger",
                type: PORT_TYPES.TRIGGER,
                direction: PORT_DIRECTIONS.OUT,
                name: "Trigger from button"
            });
        } else {
            // ports.push(new Port("value", null, PORT_TYPES.PARAM, null, null, PORT_DIRECTIONS.OUT, "Input Value"));
            this._addPort({
                id: "value",
                type: PORT_TYPES.PARAM,
                direction: PORT_DIRECTIONS.OUT,
                name: "Input Value"
            });
        }

        // this.ports = buildPortObj(ports, this.id);

        this.__isInputNode = true;
    }
}

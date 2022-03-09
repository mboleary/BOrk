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

        let ports = [];

        if (params.type === "button") {
            ports.push(new Port("trigger", null, PORT_TYPES.TRIGGER, null, null, PORT_DIRECTIONS.OUT, "Trigger from button"));
        } else {
            ports.push(new Port("value", null, PORT_TYPES.PARAM, null, null, PORT_DIRECTIONS.OUT, "Input Value"));
        }

        this.ports = buildPortObj(ports, this.id);

        this.type = params.type;
        this.min = params.min || null;
        this.max = params.max || null;
        this.name = params.name || "";
    }
}

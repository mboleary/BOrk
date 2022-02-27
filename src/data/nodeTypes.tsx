/**
 * Contains all of the defined nodes that should appear in the UI
 */

import {AudioOutputNode, AudioPlayerNode, FilterNode} from "libjame/src/nodes";

const nodeArr = [
    AudioOutputNode,
    AudioPlayerNode,
    FilterNode
];
const types: object = {};

for (const item of nodeArr) {
    if (item.constructor) {
        let cname = item.constructor.name;
        // types[cname] = {
        //     constructor: 
        // }
    }

}

export default types;
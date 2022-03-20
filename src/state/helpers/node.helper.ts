/**
 * Contains functions to help with connecting nodes
 */

import { environment } from "../slices/nodes";

import type {Connection} from "react-flow-renderer";

// type ConnectionObject = {
//     source: string,
//     sourceHandle: string,
//     target: string,
//     targetHandle: string
// };

export function canConnect(connection: Connection) {
    // Find source and target ports

    const sourceNode = environment.getNodeByID(connection.source);
    const targetNode = environment.getNodeByID(connection.target);

    let sourcePort = null;
    let targetPort = null;

    if (connection.sourceHandle && sourceNode && sourceNode.ports.out[connection.sourceHandle]) {
        sourcePort = sourceNode.ports.out[connection.sourceHandle];
    }

    if (connection.targetHandle && targetNode && targetNode.ports.in[connection.targetHandle]) {
        targetPort = targetNode.ports.in[connection.targetHandle];
    }

    console.log({sourceNode, targetNode, sourcePort, targetPort});

    if (sourcePort && targetPort) {
        return sourcePort.type === targetPort.type;
    }

    return false;
}
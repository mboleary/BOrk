/**
 * Contains functions to help with connecting nodes
 */

import store from "../store";

import type {Connection} from "react-flow-renderer";

// type ConnectionObject = {
//     source: string,
//     sourceHandle: string,
//     target: string,
//     targetHandle: string
// };

export function canConnect(connection: Connection) {
    const state = store.getState();

    console.log({state});

    // Find source and target ports

    let sourcePort = null, targetPort = null;

    return true;
}
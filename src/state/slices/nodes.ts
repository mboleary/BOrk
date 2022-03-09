/**
 * Contains the slice for nodes
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type {RootState} from "../store";

interface NodeState {
    nodes: Array<any>,
    graphElements: Array<any>,
    graphEdges: Array<any>
};

interface EdgePayload {
    source: string,
    sourcePort: string,
    target: string,
    targetPort: string
};

interface ReduxAction<T> {
    type: string,
    payload: T
}

const initialState: NodeState = {
    nodes: [],
    graphElements: [],
    graphEdges: [],
};

export const nodeSlice = createSlice({
    name: 'nodes',
    initialState,
    reducers: {
        addNode: (state, action) => {
            const node = action.payload.node;
            const position = action.payload.position;
            // Add node to libjame nodes
            state.nodes.push(node);

            // Add graphNode for displaying in the UI
            if (node.constructor.name === "BorkInputNode") {
                state.graphElements.push({
                    id: node.id,
                    type: "Input",
                    data: node,
                    position
                });
            } else {
                state.graphElements.push({
                    id: node.id,
                    type: "Node",
                    data: node,
                    position
                });
            }

        },
        addEdge: (state, action: ReduxAction<EdgePayload>) => {
            // find libjame node to attach edge to

            let sourceNode = null, destNode = null;
            let sourcePort = null, destPort = null;

            for (let i = 0; i < state.nodes.length; i++) {
                if (state.nodes[i].id === action.payload.source) {
                    sourceNode = state.nodes[i];
                } else if (state.nodes[i].id === action.payload.target) {
                    destNode = state.nodes[i];
                }
            }

            if (sourceNode) {
                // Look for output port (the signal source)
                if (sourceNode.ports.out[action.payload.sourcePort]) {
                    sourcePort = sourceNode.ports.out[action.payload.sourcePort];
                }
            }

            if (destNode) {
                // Look for input port (the signal target)
                if (sourceNode.ports.in[action.payload.targetPort]) {
                    destPort = sourceNode.ports.in[action.payload.targetPort];
                }
            }

            if (sourcePort && destPort) {

            }

            state.graphEdges.push({
                id: `e${action.payload.source}-${action.payload.target}`,
                source: action.payload.source,
                target: action.payload.target,
                animated: false
            });
        },
        removeEdge: (state, action) => {

        },
        removeNode: (state, action) => {
            // Remove node
            let node = null;
            for (let i = 0 ; i < state.nodes.length; i++) {
                if (state.nodes[i].id === action.payload) {
                    node = state.nodes[i];
                    state.nodes.splice(i, 1);
                    break;
                }
            }

            if (node) {
                node.onDestroy();
            }

            // Remove graphNode
            for (let i = 0; i < state.graphElements.length; i++) {
                if (state.graphElements[i].id === action.payload) {
                    state.graphElements.splice(i, 1);
                    break;
                }
            }

            // Remove edges from the graphEdges
            for (let i = 0; i < state.graphEdges.length; i++) {
                if (state.graphEdges[i].source === action.payload || state.graphEdges[i].target === action.payload) {
                    state.graphEdges.splice(i, 1);
                    i--;
                }
            }
        }
    }
});

export default nodeSlice.reducer;

/**
 * Contains the slice for nodes
 */

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Environment from "libjame/src/Environment";
import type {AppDispatch, RootState} from "../store";
import type {ThunkDispatch, } from "redux-thunk";
import type {AnyAction, CombinedState} from "redux";

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

interface NodePayload {
    id: string,
    // node: any,
    position: any,
    type?: string
};

interface NodePosition {
    x: Number,
    y: Number
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

export const environment = new Environment();

export const nodeSlice = createSlice({
    name: 'nodes',
    initialState,
    reducers: {
        addNode: (state, action: ReduxAction<NodePayload>) => {
            // const node = action.payload.node;
            const position = action.payload.position;
            const type = action.payload.type || "Node";
            // Add node to libjame nodes
            // state.nodes.push(node);
            // environment.addNode(node);

            // Add graphNode for displaying in the UI
            // if (node.__isInputNode) {
            //     state.graphElements.push({
            //         id: node.id,
            //         type: "Input",
            //         data: node,
            //         position
            //     });
            // } else {
            //     state.graphElements.push({
            //         id: node.id,
            //         type: "Node",
            //         data: node,
            //         position
            //     });
            // }

            state.graphElements.push({
                id: action.payload.id,
                type: type,
                data: null,
                position
            });

        },
        addEdge: (state, action: ReduxAction<EdgePayload>) => {
            // find libjame node to attach edge to

            console.log({action});

            let sourceNode = null, destNode = null;
            let sourcePort = null, destPort = null;

            // for (let i = 0; i < state.nodes.length; i++) {
            //     if (state.nodes[i].id === action.payload.source) {
            //         sourceNode = state.nodes[i];
            //     } else if (state.nodes[i].id === action.payload.target) {
            //         destNode = state.nodes[i];
            //     }
            // }

            sourceNode = environment.getNodeByID(action.payload.source);
            destNode = environment.getNodeByID(action.payload.target);

            if (sourceNode) {
                // Look for output port (the signal source)
                if (sourceNode.ports.out[action.payload.sourcePort]) {
                    sourcePort = sourceNode.ports.out[action.payload.sourcePort];
                }
            }

            if (destNode) {
                // Look for input port (the signal target)
                if (destNode.ports.in[action.payload.targetPort]) {
                    destPort = destNode.ports.in[action.payload.targetPort];
                }
            }

            console.log("AddEdge:", sourceNode, sourcePort, destNode, destPort);

            if (sourcePort && destPort) {
                sourcePort.connect(destPort);
                console.log("Connected SourcePort:", sourcePort);
            }

            state.graphEdges.push({
                id: `edge_${action.payload.source}_${action.payload.sourcePort}-${action.payload.target}_${action.payload.targetPort}`,
                source: action.payload.source,
                sourceHandle: action.payload.sourcePort,
                target: action.payload.target,
                targetHandle: action.payload.targetPort,
                animated: false
            });
        },
        removeEdge: (state, action) => {

        },
        removeNode: (state, action) => {
            // Remove node
            // let node = null;
            // for (let i = 0 ; i < state.nodes.length; i++) {
            //     if (state.nodes[i].id === action.payload) {
            //         node = state.nodes[i];
            //         state.nodes.splice(i, 1);
            //         break;
            //     }
            // }

            // if (node) {
            //     node.onDestroy();
            // }

            environment.removeNode(action.payload);

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

export const addNode = (node: any, position: NodePosition, type: string = "Node"): ThunkDispatch<void, RootState, AnyAction> =>
    async (dispatch: any) => {
        environment.addNode(node);
        dispatch(nodeSlice.actions.addNode({
            id: node.id,
            // node: null,
            position: position,
            type: type
        }));
    }

export function removeNode(nodeId: String) {
    return (dispatch: AppDispatch, getState: RootState) => {
        environment.removeNode(nodeId);
        dispatch(nodeSlice.actions.removeNode(nodeId));
    }
}

export default nodeSlice.reducer;
export const {addEdge, removeEdge} = nodeSlice.actions;
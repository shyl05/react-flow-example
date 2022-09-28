import { createSlice } from '@reduxjs/toolkit';
import {addEdge, applyEdgeChanges, applyNodeChanges ,updateEdge, MarkerType } from 'react-flow-renderer';

const initialNodes = [
    {
      id: 'A',
      type: 'group',
      position: { x: 0, y: 0 },
      style: {
        width: 200,
        height: 140,
        borderColor: 'blue',
      },
    },
    {
      id: 'A-1',
      type: 'inputTextNode',
      data: { label: 'Text Node' },
      position: { x: 10, y: 10 },
      parentNode: 'A',
      extent: 'parent',
    },
    {
      id: 'A-2',
      data: { label: 'Node A2' },
      position: { x: 10, y: 90 },
      parentNode: 'A',
      extent: 'parent',
    },
    {
      id: 'B',
      type: 'output',
      position: { x: -175, y: 195 },
      data: null,
      style: {
        width: 180,
        height: 180,
        backgroundColor: 'rgba(240,240,240,0.25)',
        borderColor: 'blue',
      },
    },
    {
      id: 'B-1',
      data: { label: 'Node B1' },
      position: { x: 60, y: 0 },
      parentNode: 'B',
      extent: 'parent',
      style: {
        width: 60,
      },
    },
    {
      id: 'B-2',
      data: { label: 'Node B2' },
      position: { x: 0, y: 100},
      parentNode: 'B',
      extent: 'parent',
      style: {
        width: 60,
      },
    },
    {
      id: 'B-3',
      data: { label: 'Node B3' },
      position: { x: 100, y: 100 },
      parentNode: 'B',
      extent: 'parent',
      style: {
        width: 60,
      },
    },
    {
      id: 'C',
      type: 'iconNode',
      position: { x: 55, y: 250 },
      data: { label: 'Node C',},
      style: {
        width: 55,
      },
    },
    {
      id: 'D',
      type: 'popoverNode',
      position: { x: 220, y: 200 },
      data: { label: 'Node D'},
      style: {
        width: 55,
      },
    },
];

const initialEdges = [
    { id: 'a1-a2', source: 'A-1', target: 'A-2', label:'edge1', type: 'smoothstep'},
    { id: 'a2-b', source: 'A-2', target: 'B', label:'edge2', type: 'smoothstep' },
    { id: 'a2-c', source: 'A-2', target: 'C' , label:'edge3' , type: 'smoothstep'},
    { id: 'a2-d', source: 'A-2', target: 'D' , type: 'custom', data: { text: 'custom edge' },markerEnd: {type: MarkerType.ArrowClosed,}, style:{stroke: 'red'}},
    { id: 'b1-b2', source: 'B-1', target: 'B-2', label:'edge5', type: 'smoothstep' },
    { id: 'b1-b3', source: 'B-1', target: 'B-3', label: 'edge6', type: 'smoothstep' },
];

const initialState = {
    nodes: initialNodes,
    edges: initialEdges,
    edgeUpdateSuccessful: true,
}

export const FlowSlice = createSlice({
    name: 'flow',
    initialState,
    reducers: {
      onNodesChange : (state,changes) => {state.nodes.push(...applyNodeChanges(changes))},
      onEdgesChange : (state,changes) => {state.edges.push(...applyEdgeChanges(changes))},
      onConnect : (connection, state) => {state.edges = addEdge(connection)},
      onEdgeUpdateStart : (state) => {state.edgeUpdateSuccessful = false},
      onEdgeUpdate : (oldEdge, newConnection, state) => {
          state.edgeUpdateSuccessful = true
          state.edges((els) => updateEdge(oldEdge, newConnection, els))
      },
      onEdgeUpdateEnd : (_, edge, state) => {
          if (!state.edgeUpdateSuccessful) {
            state.edges((eds) => eds.filter((e) => e.id !== edge.id));
          }
          state.edgeUpdateSuccessful = true;
      },
    }
});

export const { onEdgesChange, onNodesChange, onConnect, onEdgeUpdateStart, onEdgeUpdate, onEdgeUpdateEnd } = FlowSlice.actions;

export const nodes = (state) => state.flow.nodes;
export const edges = (state) => state.flow.edges;

export default FlowSlice.reducer;

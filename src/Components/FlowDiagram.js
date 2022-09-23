import { useCallback, useState, useRef } from 'react';
import ReactFlow, {  ReactFlowProvider, useReactFlow ,addEdge, applyEdgeChanges, applyNodeChanges, Controls ,updateEdge } from 'react-flow-renderer';

import TextNode from './TextNode.js';
import './FlowDiagram.css'

import './TextNode.css';

const rfStyle = {
  backgroundColor: 'skyblue',
};

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
    data: { label: 'Child Node' },
    position: { x: 10, y: 90 },
    parentNode: 'A',
    extent: 'parent',
  },
  {
    id: 'B',
    type: 'output',
    position: { x: -100, y: 200 },
    data: null,
    style: {
      width: 170,
      height: 140,
      backgroundColor: 'rgba(240,240,240,0.25)',
      borderColor: 'blue',
    },
  },
  {
    id: 'B-1',
    data: { label: 'Child 1' },
    position: { x: 50, y: 10 },
    parentNode: 'B',
    extent: 'parent',
    style: {
      width: 60,
    },
  },
  {
    id: 'B-2',
    data: { label: 'Child 2' },
    position: { x: 10, y: 90 },
    parentNode: 'B',
    extent: 'parent',
    style: {
      width: 60,
    },
  },
  {
    id: 'B-3',
    data: { label: 'Child 3' },
    position: { x: 100, y: 90 },
    parentNode: 'B',
    extent: 'parent',
    style: {
      width: 60,
    },
  },
  {
    id: 'C',
    type: 'output',
    position: { x: 100, y: 200 },
    data: { label: 'Node C' },
  },
];

const initialEdges = [
  { id: 'a1-a2', source: 'A-1', target: 'A-2', label:'edge1'},
  { id: 'a2-b', source: 'A-2', target: 'B', label:'edge2' },
  { id: 'a2-c', source: 'A-2', target: 'C' , label:'edge3' },
  { id: 'b1-b2', source: 'B-1', target: 'B-2', label:'edge4' },
  { id: 'b1-b3', source: 'B-1', target: 'B-3', label:'edge5' },
];

// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { inputTextNode : TextNode };

function Flow() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const edgeUpdateSuccessful = useRef(true);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const reactFlowInstance = useReactFlow();

  let nodeId = 0;

  const onClick = useCallback(() => {
    const id = `${++nodeId}`;
    const newNode = {
      id,
      position: {
        x: Math.random() * 500,
        y: Math.random() * 500,
      },
      data: {
        label: `Node ${id}`,
      },
    };
    reactFlowInstance.addNodes(newNode);
  }, [nodeId, reactFlowInstance]);


  return (
      <>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onEdgeUpdate={onEdgeUpdate}
          onEdgeUpdateStart={onEdgeUpdateStart}
          onEdgeUpdateEnd={onEdgeUpdateEnd}
          fitView
          style={rfStyle}
        >
          <Controls />
        </ReactFlow>
        <button onClick={onClick} className="btn-add" style={{position: 'absolute',zIndex: '10',top: '20px',left: '20px', backgroundColor:'blue', color:'skyblue', height:'50px', width:'100px'}}>
          Add Node
        </button>
      </>
  );
}

const FlowDiagram = () =>{
  return(
    <ReactFlowProvider>
      <Flow />
    </ReactFlowProvider>
  );
}

export default FlowDiagram;
import { useCallback, useState, useRef } from 'react';
import ReactFlow, {  ReactFlowProvider, useReactFlow ,addEdge, applyEdgeChanges, applyNodeChanges, Controls ,updateEdge } from 'react-flow-renderer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import TextNode from './TextNode.js';
import IconNode from './IconNode.js';
import PopOverNode from './PopoverNode.js';
import './FlowDiagram.css'
import './CustomNodes.css'

const rfStyle = {
  backgroundColor: 'skyblue',
};
// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { inputTextNode : TextNode, iconNode: IconNode, popoverNode : PopOverNode };

function Flow() {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      position: { x: -100, y: 200 },
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
      position: { x: 100, y: 250 },
      data: { label: 'Node C', handleClick :()=>handleShow() },
      style: {
        width: 55,
      },
    },
    {
      id: 'D',
      type: 'popoverNode',
      position: { x: 200, y: 250 },
      data: { label: 'Node D'},
      style: {
        width: 55,
      },
    },
  ];

  const initialEdges = [
    { id: 'a1-a2', source: 'A-1', target: 'A-2', label:'edge1'},
    { id: 'a2-b', source: 'A-2', target: 'B', label:'edge2' },
    { id: 'a2-c', source: 'A-2', target: 'C' , label:'edge3' },
    { id: 'a2-d', source: 'A-2', target: 'D' , label:'edge4' },
    { id: 'b1-b2', source: 'B-1', target: 'B-2', label:'edge5' },
    { id: 'b1-b3', source: 'B-1', target: 'B-3', label:'edge6' },
  ];

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

  // Create New Node

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
        
        {/* Model form */}
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
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
import { useCallback} from 'react';
import useStore from '../Features/store';
import ReactFlow, {  ReactFlowProvider, useReactFlow, Controls} from 'react-flow-renderer';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import TextNode from './CustomNodes/TextNode';
import IconNode from './CustomNodes/IconNode';
import PopOverNode from './CustomNodes/PopoverNode';
import CustomEdge from './CustomEdges/CustomEdge';
import './FlowDiagram.css'
import './CustomNodes/CustomNodes.css'

const rfStyle = {
  backgroundColor: 'yellow',
};
// we define the nodeTypes outside of the component to prevent re-renderings
// you could also use useMemo inside the component
const nodeTypes = { inputTextNode : TextNode, iconNode: IconNode, popoverNode : PopOverNode };
const edgeTypes = {
  custom: CustomEdge,
};
function Flow() {

  const { nodes, edges, modelShow, onEdgesChange, onNodesChange, onConnect, onEdgeUpdateStart, onEdgeUpdate, onEdgeUpdateEnd ,onModelHide } = useStore();
  //const onmodelShow = onModelShow;
  const onmodelHide = onModelHide;
  const reactFlowInstance = useReactFlow();

  // // To use without State Management : Zustand // //

  //const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // const onNodesChange = useCallback(
  //   (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
  //   [setNodes]
  // );
  // const onEdgesChange = useCallback(
  //   (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
  //   [setEdges]
  // );
  // const onConnect = useCallback(
  //   (connection) => setEdges((eds) => addEdge(connection, eds)),
  //   [setEdges]
  // );

  // const onEdgeUpdateStart = useCallback(() => {
  //   edgeUpdateSuccessful.current = false;
  // }, []);

  // const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
  //   edgeUpdateSuccessful.current = true;
  //   setEdges((els) => updateEdge(oldEdge, newConnection, els));
  // }, []);

  // const onEdgeUpdateEnd = useCallback((_, edge) => {
  //   if (!edgeUpdateSuccessful.current) {
  //     setEdges((eds) => eds.filter((e) => e.id !== edge.id));
  //   }

  //   edgeUpdateSuccessful.current = true;
  // }, []);

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
          edgeTypes={edgeTypes}
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
        <Modal show={modelShow} onHide={onmodelHide} centered>
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
              <Button variant="secondary" onClick={onmodelHide}>
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
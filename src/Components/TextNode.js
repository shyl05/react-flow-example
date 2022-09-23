import { useCallback } from 'react';
import { Handle, Position } from 'react-flow-renderer';

const handleStyle = { left: 10 };

function TextNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Top} />
      <div>
        <input id="text" className='inputBox' name="text" placeholder='Type...' onChange={onChange} />
      </div>
      <Handle type="source" position={Position.Bottom} id="a" style={handleStyle} />
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default TextNode;

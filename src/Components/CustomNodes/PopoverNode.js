import { useCallback } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass } from '@fortawesome/free-solid-svg-icons'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

function PopOverNode({ data }) {
  const onClickBtn = useCallback((evt) => {
    console.log(data.label)
  }, [data]);

  return (
    <div className="icon-updater-node">
      <Handle type="target" position={Position.Top} />
      <div>
      <OverlayTrigger
          trigger='focus'
          placement='bottom'
          overlay={
            <Popover id={`popover-positioned-bottom`}>
              <Popover.Header as="h3">{data.label}</Popover.Header>
              <Popover.Body>
                <strong>Holy guacamole!</strong> Check this info.
              </Popover.Body>
            </Popover>
          }
        >
            <button onClick={onClickBtn} className='btn'>
                <FontAwesomeIcon className='iconBtn-faCompass' icon={faCompass} />
            </button>
        </OverlayTrigger>
      </div>
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default PopOverNode;

import { useCallback } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import useStore from '../../Features/store';

function IconNode({ data }) {
  const {onModelShow} = useStore();
  const onClickBtn = useCallback((evt) => {
    onModelShow();
  }, [onModelShow]);

  return (
    <div className="icon-updater-node">
      <Handle type="target" position={Position.Top} />
      <div>
        <button onClick={onClickBtn} className='btn'>
            <FontAwesomeIcon className='icon-faPenToSquare' icon={faPenToSquare} />
        </button>
      </div>
      <Handle type="source" position={Position.Bottom} id="b" />
    </div>
  );
}

export default IconNode;

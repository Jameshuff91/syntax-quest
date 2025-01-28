// src/components/HintModal.tsx

import React from 'react';
import { Hint } from '../data/challenges';

interface HintModalProps {
  hint: Hint;
  onClose: () => void;
  onAcceptPartialCode: () => void;
}

const HintModal: React.FC<HintModalProps> = ({ hint, onClose, onAcceptPartialCode }) => {
  return (
    <div className="hint-modal-backdrop" style={styles.backdrop}>
      <div className="hint-modal-content" style={styles.modal}>
        <p style={{ color: 'black' }}>{hint.message}</p>
        {hint.revealCode && (
          <div>
            <p>Need a bit more help? Click below to accept partial solution.</p>
            <button onClick={onAcceptPartialCode} style={styles.button}>
              Accept Partial Code
            </button>
          </div>
        )}
        <button onClick={onClose} style={styles.button}>
          Close
        </button>
      </div>
    </div>
  );
};

const styles = {
  backdrop: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '400px',
    textAlign: 'center' as 'center',
  },
  button: {
    marginTop: '10px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
};

export default HintModal;

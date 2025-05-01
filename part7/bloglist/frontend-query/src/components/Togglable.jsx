import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div className="mb-6">
      <div style={hideWhenVisible} className="mb-4">
        <button
          onClick={toggleVisibility}
          className="px-4 py-2 bg-black text-white rounded-md text-sm font-medium hover:bg-gray-800 cursor-pointer"
        >
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button
          onClick={toggleVisibility}
          className="mt-3 px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable';

export default Togglable;

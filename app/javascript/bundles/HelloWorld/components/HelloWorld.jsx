import PropTypes from 'prop-types';
import React, {useState} from 'react';
import style from './HelloWorld.module.css';

const HelloWorld = ({name}) => {
  const [firstName, setFirstName] = useState(name);

  return (
    <div>
      <h3>Hello, {firstName}!</h3>
      <hr/>
      <form>
        <label className={style.bright} htmlFor='name'>
          Hi there
          <input id='name' type='text' value={firstName} onChange={({target: {value}}) => setFirstName(value)}/>
        </label>
      </form>
    </div>
  );
};

HelloWorld.propTypes = {
  name: PropTypes.string.isRequired, // this is passed from the Rails view
};

export default HelloWorld;

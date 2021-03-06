import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import StartStopButton from './StartStopButton';
import { setIisAction } from '../../actions/actions';


const flatten = list => list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

const ActionsButtons = (props) => {
  const onSet = () => props.set(props, props.url);
  return (
      <StartStopButton running={props.running} click={onSet} />
  );
};

const mapDispatchToProps = dispatch => ({
  set: (item, url) => {
    const data =
    {
      appPools: item.apps ? flatten(item.apps.map(x => x.name)): [item.name],
      condition: item.running
    };
    dispatch(setIisAction(data,url));
  }
});

ActionsButtons.propTypes = {
  running: PropTypes.bool.isRequired,
  set: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(ActionsButtons);

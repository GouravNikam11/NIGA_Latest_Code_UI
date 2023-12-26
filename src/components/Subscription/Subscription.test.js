import React from 'react';
import { shallow, render, mount } from 'enzyme';
import Subscription from './Subscription';

describe('Subscription', () => {
  let props;
  let shallowSubscription;
  let renderedSubscription;
  let mountedSubscription;

  const shallowTestComponent = () => {
    if (!shallowSubscription) {
      shallowSubscription = shallow(<Subscription {...props} />);
    }
    return shallowSubscription;
  };

  const renderTestComponent = () => {
    if (!renderedSubscription) {
      renderedSubscription = render(<Subscription {...props} />);
    }
    return renderedSubscription;
  };

  const mountTestComponent = () => {
    if (!mountedSubscription) {
      mountedSubscription = mount(<Subscription {...props} />);
    }
    return mountedSubscription;
  };  

  beforeEach(() => {
    props = {};
    shallowSubscription = undefined;
    renderedSubscription = undefined;
    mountedSubscription = undefined;
  });

  // Shallow / unit tests begin here
 
  // Render / mount / integration tests begin here
  
});

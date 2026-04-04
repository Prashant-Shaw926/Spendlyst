const React = require('react');

function createMockComponent(name) {
  function MockComponent(props) {
    return React.createElement(name, props, props.children);
  }

  MockComponent.displayName = name;
  return MockComponent;
}

module.exports = {
  BarChart: createMockComponent('BarChart'),
  PieChart: createMockComponent('PieChart'),
};

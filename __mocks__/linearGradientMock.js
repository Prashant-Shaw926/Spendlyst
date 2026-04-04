const React = require('react');

function LinearGradientMock({ children }) {
  return React.createElement('LinearGradient', null, children);
}

module.exports = LinearGradientMock;
module.exports.default = LinearGradientMock;

import React, { PureComponent } from 'react';

const styles = {
  span: {
    position: 'relative',
    display: 'inline-block',
    verticalAlign: 'middle',
    marginRight: 12,
    width: 150,
  },
  select: {
    fontSize: 14,
    color: '#fff',
    fontFamily: 'Lato',
    height: 40,
    paddingLeft: 13,
    width: '100%',
    backgroundColor: '#313131',
    borderWidth: 0,
    margin: 0,
    borderRadius: 3,
    MozAppearance: 'none',
    WebkitAppearance: 'none',
    appearance: 'none',
  },
  downArrow: {
    position: 'absolute',
    right: 18,
    top: 8,
    color: '#fff',
    pointerEvents: 'none',
  },
};

class Dropdown extends PureComponent {
  render() {
    return (
      <span style={styles.span}>
        <select style={styles.select}>
          <option>Sort Articles</option>
        </select>
        <span style={styles.downArrow}>{'\u25BE'}</span>
      </span>
    );
  }
}

export default Dropdown;

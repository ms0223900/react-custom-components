import React from 'react'

const getReactChildren = (children, props) => React.Children.map(
  children, child => (React.cloneElement(child, props))
)

class TodoListItem extends React.Component {
  static ListText = ({ display, children }) => display ? children : null
  static ListShowButton = ({ display, toggleDisplay }) => <button onClick={ toggleDisplay }>{ !display ? 'show' : 'hide' }</button>
  static defaultProps = {
    onToggleDisplay: () => {}
  }
  state = {
    display: true,
  }
  toggleDisplay = () => {
    this.setState(({ display }) => ({
      display: !display,
    }), () => this.props.onToggleDisplay(this.state.display))
  }
  //
  render() {
    const props = {
      display: this.state.display,
      toggleDisplay: this.toggleDisplay,
    }
    const children = getReactChildren(this.props.children, props)
    return (
      <div>{ children }</div>
    );
  }
}

export default () => {
  return (
    <TodoListItem onToggleDisplay={ (display) => console.log('display: ', display)}>
      <TodoListItem.ListShowButton />
      <TodoListItem.ListText>
        { 'hey do something' }
      </TodoListItem.ListText>
    </TodoListItem>
  )
}
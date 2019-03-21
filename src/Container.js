import React from 'react';
import observable from 'mobx';
import observer from 'mobx-react';
import './Container.css';

@observer
class Container extends React.Component {
    containers = observable([])
    render() {
        const appState = observable({
            boxColor: null
        })
        return (
            <Box color={this.appState.boxColor}/>
        );
    }
}
export default Container;

@observer
class Box extends React.Component {
    render() {
        if (!this.props.color) {
            this.props.color = defaultBoxColor;
        }
        
        return (
            <button className="square" style={this.props.color} onClick={this.changeColor}>
                {this.props.value}
            </button>
        );
    }
    
    changeColor = () => {
        this.props.color = {
            backgroundColor: '#ffff',
            borderColor: '#ff9933'
        }
    }
}

const defaultBoxColor = {
    backgroundColor: '#ffe6cc',
    borderColor: '#ff9933'
}
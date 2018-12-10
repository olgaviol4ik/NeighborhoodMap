import React, { Component } from 'react';
import ListItem from './ListItem';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            waterparks: []
        }
    }
    render() {
        return (
            <ul className='waterparks-list'>
            {this.state.waterparks.map((waterpark, key)=><ListItem key={key} waterpark={waterpark}></ListItem>)}
                </ul>
        );
    }
}

export default List;
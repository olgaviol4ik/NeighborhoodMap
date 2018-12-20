import React, { Component } from 'react';

class ListItem extends Component {
    
    render() {
        return (
            <li onClick={()=>this.itemClickHover()}>
            {this.props.waterpark.name}
                </li>
                
        );
    }
    itemClickHover(){
        var self = this;
        this.props.waterpark.marker.setAnimation(window.google.maps.Animation.BOUNCE);
        
        setTimeout(function(){
            self.props.waterpark.marker.setAnimation(null);
            new window.google.maps.event.trigger(self.props.waterpark.marker, 'click' );
        }
            , 1000);
    }

     

}

export default ListItem;
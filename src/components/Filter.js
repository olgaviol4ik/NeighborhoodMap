import React, { Component } from "react";
class Filter extends Component {
  render() {
    return (
      <div className="filter">
        <label>
          Min price  
          <input id="min-price" aria-label="minimum price" tabindex="1"/>
        </label>
        <label>
          Max price
          <input id="max-price" aria-label="maximum price" tabindex="2" />
        </label>
        <input aria-label="filter" tabindex="3" type="submit" value="Filter" onClick={(event)=>window.pullWaterparks(true)} />
      </div>
    );
  }
}

export default Filter;

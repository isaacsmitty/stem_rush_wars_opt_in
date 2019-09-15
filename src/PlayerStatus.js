import React from "react";

export function PlayerStatus(props) {

    const id = props.status.id;
    const index = props.index

  return (
    <tr>
        <td>{props.status.id}</td>
      <td>{props.status.player}</td>
      
      <td>
        <input type="checkbox"  onClick={() => {props.toggleStatus(id, index)}} defaultChecked={props.status.status} />
      </td>
    </tr>
  );
} 
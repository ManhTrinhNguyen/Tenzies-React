import React from "react"

export default function Dice(props) {
    
    const styles = {
        backgroundColor: props.isHeld && "#59E391"
    }
    return(
        <div onClick={() => props.holdDice(props.id)} style={styles} className="dice-face">
            <h2 className="dice-num">{props.value}</h2>
        </div>
    )
}
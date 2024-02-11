import React from 'react'

export default function HomeButton(props) {
  return (
    <div>
    <button
        type="button"
        className="btn btn-login"
    >
        {props.text}
    </button>
    
</div>
  )
}

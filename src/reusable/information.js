import React, { useState } from "react"
// import image from '../s_image.jpg'
function Information({children, info}){
    const [isOpen, setIsOpen] = useState(true)

    return(
        <div className="information">
            <div className="clicktab" onClick={()=>setIsOpen(!isOpen)}>
                <p>{info} Information</p>
            </div>
            <div>
                {isOpen ? children : null}
            </div>
        </div>
    )
}
export default Information
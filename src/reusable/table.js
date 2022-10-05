import React, {useState, useEffect} from "react"
// import image from '../s_image.jpg'
function Table({info}){
    return(        
        <div className="table">
            <div>
                <table>
                    <thead>
                        <td>SN</td>
                        <td>Payment Title</td>
                        <td>Payment RRR</td>
                        <td>Status</td>
                    </thead>
                    {}
                    {info.map(({teller_id, description},i)=>(
                    <tbody>
                        <td>{i+1}</td>
                        <td>{description}</td>
                        <td>{teller_id}</td>
                        <td>Paid</td>
                    </tbody>
                    
                    ))}
                </table>
            </div>
        </div>
    )
}
export default Table
import React from "react"
// import image from '../s_image.jpg'
function Table({info}){
    console.log(info);
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
                    {info.map(({rrr, purpose},i)=>(
                    <tbody>
                        <td>{i+1}</td>
                        <td>{purpose}</td>
                        <td>{rrr}</td>
                        <td>Paid</td>
                    </tbody>
                    
                    ))}
                </table>
            </div>
        </div>
    )
}
export default Table
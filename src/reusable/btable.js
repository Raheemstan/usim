import React from "react"
// import image from '../s_image.jpg'
function Table({info}){
    return(        
        <div className="btable">
            <div>
                <table>
                    <thead>
                        <td>SN</td>
                        <td>Book ISBN</td>
                        <td>Date borrowed</td>
                        <td>Date returned</td>
                        <td>Status</td>
                    </thead>
                    {info.map(({isbn, date1, date2},i)=>(
                    <tbody>
                        <td>{i+1}</td>
                        <td>{isbn}</td>
                        <td>{date1}</td>
                        <td>{date2}</td>
                        <td>{date2 === '' ? 'Not returned' : 'Returned'}</td>
                    </tbody>
                    
                    ))}
                </table>
            </div>
        </div>
    )
}
export default Table
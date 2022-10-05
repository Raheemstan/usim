import Loading from '../loading.gif'
const Loader = () => {
    return(
        <div style={{width:'100%',height:'100%', position:'fixed', top:'0', left:'0', backgroundColor:'white', display:'grid', justifyContent:'center', alignItems:'center'}}>
            <div style={{width:'100px', height:'100px'}}>
                <img src={Loading} alt="" style={{width:'100%'}}/>
            </div>
        </div>
    )
}
export default Loader
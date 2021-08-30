import React from 'react'

const Mobileinfo = () => {
    return (
        <>
        <div className='my-5' style={{borderBottom:'2px solid grey'}}>
        <div className="card mb-3" style ={{border:'none'}}>
        <h1 className= 'card-title' style={{ marginTop: '5px', textAlign: 'center', color:'#0072bc'}}> Why Make a Will?</h1>
        <div className="embed-responsive embed-responsive-16by9" style={{ display:'flex',justifyContent: 'center'}}>
                <iframe width='550px' height='300px' title="Embeds Page" className="embed-responsive-item" src="https://youtu.be/uoTAVsSeMnY"
                    allowFullScreen style={{ marginTop: '15px', borderRadius: '13px' }}></iframe>


            </div>
<div className="card-body">

<p className="card-text"  style={{ marginTop: '5px', textAlign: 'center',justifyContent:'center',color:'grey', marginLeft:'10px', marginRight:'10px', fontSize:'17px', fontWeight: 'normal'}}> <h6>A person should make a WILL, as it not only helps to
                    distribute his property according to his wishes but also
                    ensures the interest of the people you care about is
                    taken care of after your death.</h6></p>
                    <p className="card-text"  style={{ marginTop: '5px', textAlign: 'center',justifyContent:'center',color:'grey'}}>     <h6>      PANDEMIC has shown that life is uncertain, therefore
                    it is necessary to define who should inherit your hardened
                    belongings and assets after you pass away.</h6> </p>

</div>
</div>
        </div>
       
    </>
    )
}

export default Mobileinfo

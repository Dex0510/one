import React ,{ useState } from 'react'
import TermsConditions from './TermsConditions';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import './mobilehome.css';
import Index from '../../static/index.jpg'
import { Link, Redirect, Route } from 'react-router-dom';
function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          Terms & Conditions
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TermsConditions/>
        </Modal.Body>
        <Modal.Footer>
        <small>By clicking 'Accept' you are agreeing to our terms and conditions.</small>
          <Button onClick={props.onHide}>Accept</Button>
        </Modal.Footer>
      </Modal>
    );
  }



const Mobilehome = () => {


  const [validtick ,setValidtick] = useState(false);
  const [validName ,setValidName] = useState(false);
  const [validPhone ,setValidPhone] = useState(false);
  const [validemail ,setValidEmail] = useState(false);
  const [errName, setErrName] = useState(' ');
  const [errPhone,setErrphone] = useState('');
  const [errEmail, setErremail]= useState('   ');
  const [hemail,setEmail] =useState('')   
  const [hname,setName] =useState('')   
  const [hphone,setPhone] =useState('')   
  const [ticked, setTicked] = useState(false);
  const [tickerr,setTickerr] = useState('    ')
  const [modalShow, setModalShow] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const toggleTick = (event) => {
    let t = !ticked
    let errors = err
    setTicked(t);
    if (!t){
      errors.ticked = 'Please Accept Terms and Condition'
      setErr(errors)
    }
    else{
    errors.ticked =''
    setErr(errors)
    }
  }
  const [err,setErr] = useState({
    fullname:'0',
    email:'0',
    phoneno:'0',
    ticked : '0'
  })

  const handleChange =(e) => {
    e.preventDefault();
    const {name, value} = e.target
    let errors = err
    switch(name){
      case 'fullname':
        setName(value)
        errors.fullname = value.match(/^[a-zA-Z]+ [a-zA-Z]+$/)?'':'Enter Valid Full Name E.g. Ankit Verma';
        break
      case 'email':
        setEmail(value)
        errors.email = value.match(/\S+@\S+\.\S+/)? '': 'Enter Valid Email id ';
        break
      case 'phoneno':
        if(value.length=== 11){
          break
        }
        setPhone(value)
        errors.phoneno = value.match(/^\d{10}$/) ? '':'Enter Valid Phone no.';
        setErr(errors)
        break
      // case 'tick':
      //   let t = !ticked
      //   setTicked(t)
      //   errors.tick = t?'':'Please Accept Terms and Condition';
      default:
        break
    }
    setErr(errors)
  }

  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if(validateForm(err)) {
      console.info('Valid Form')
      setSubmitted(true)
    }else{
      setSubmitted(false)
      console.error('Invalid Form')
    }
  }

    return (
     
        <div>
            <main class="header" style={{marginTop:'80px'}}>

  <header class="header" style = {{ paddingTop: '50px', backgroundColor:'#0072bc'}} >
    <h1 style = {{ color:'white' , textAlign:'center' , fontWeight:'bold'}}> Will Creator </h1>
    <h6  style={{fontSize:'17px', color:'white' , textAlign:'center' , marginRight:'10%', marginLeft:'10%'}}>  “Secure your dear ones. Express your wishes so that your loved ones stay protected.”</h6>
     <img src = {Index}  alt = 'alt' style={{ transform: 'scale(0.6)', borderRadius: '50%' , justifyContent:'center', marginTop:'-30px', marginRight:'10px' }} ></img>                  
     
  </header>
  
 
</main>
<div className='col-lg-4 order-2 order-lg-2 d-flex flex-column justify-content-center content' style={{ backgroundColor: 'white', marginTop:'50px', borderRadius: '13px' ,padding:'10px 16px' }}>
                  <form onSubmit={handleSubmit} style={{ paddingTop: '40px' }}>
                    <div class="mb-3">
                      <label class="form-label">Full Name <span className='required' style={{ color: '#db2f23' }}>*</span></label>
                      <input autoComplete="off" class="form-control"type="name" name="fullname" onChange={handleChange} value={hname } required />
                  {err.fullname.length >1 && (
                    <span className="text-danger">{err.fullname}</span>
                  )}
                      {/* {submitted && !values.fullname ? <span className="text-danger">please enter the fullname</span> : null} */}
                      {/* {submitted && !namevalid ?  <span className="text-danger">please enter only characters</span> : null} */}
                    </div>
                    <div class="mb-3">
                      <label for="phoneNo" class="form-label">Contact No. <span className='required' style={{ color: '#db2f23' }}>*</span></label>
                      <input autoComplete="off" class="form-control"type="phoneno" name="phoneno" onChange={handleChange} value={hphone } required />
                  {err.phoneno.length > 1 && (
                    <span className="text-danger">{err.phoneno}</span>
                  )}
                      {/* {submitted && !values.phone ? <span className="text-danger">please enter the phone number</span> : null}
                      {submitted && phonevalid ? <span className="text-danger">please enter the valid phone number</span> : null} */}
                    </div>
                    <div class="mb-3">
                      <label for="email" class="form-label ">Email address <span className='required' style={{ color: '#db2f23' }}>*</span></label>
                      <input autoComplete="off" class="form-control"type="email" name="email" onChange={handleChange} value={hemail } required />
                  {err.email.length >1 && (
                    <span className="text-danger">{err.email}</span>
                  )}
                      {/* <input type='email' id='email' name='email' className={`input ${errors.email && 'is-danger'}`}  class="form-control" name = 'email'
                        onChange={handleChange}
                      /> */}

                      {/* {(submitted && !emailvalid) ? <span className="text-danger">please enter the valid email</span> : null} */}


                    </div>

                    <div class="mb-3 form-check">
                      <input type="checkbox" class="form-check-input" id="exampleCheck1" onClick={toggleTick} value={ticked} required name= 'tick' />
                      <p class="form-check-label" for="exampleCheck1"> I accept all <a className='button' style={{ textDecoration: 'none', cursor: 'pointer' }} onClick={() => setModalShow(true)} >Terms and Conditions</a></p>
                      <MyVerticallyCenteredModal
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                      /> 
                      {err.ticked.length > 1 && (
                    <span className="text-danger" style = {{display:'inline-block'}}>{err.ticked}</span>
                  )} 
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'center' }}>

                      <button type="submit" id="next-btn" style={{ justifyContent: 'center' , alignSelf:'center'}}  onClick={handleSubmit} >
                        Create Will

                        {submitted ? <Redirect to='/will-creator-tool'></Redirect> : null}
                      </button>
                    </div>
                  </form>
                </div>
        </div>
   
    )
}

export default Mobilehome

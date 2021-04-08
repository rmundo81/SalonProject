// To capture billing details and initiate payment.
import React from "react";
import { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import  { ApiInitiatePayment } from "../backend/Api";

const GetBillingDetails = (props) => {

    const [ form, setForm ] = useState({}); 
    const [ formError, setFormError ] = useState({});
     // const phoneRegEx = /^[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-/\s.]?[0-9]{4}$/;
    
    // const [fields, setFields] = useState(
    //     { "firstName": "", 
    //     "lastName": "", 
    //     "email":"", 
    //     "phone": "" }
    // );
    // const [ errors, setErrors ] = useState(
    //     { "firstName": "", 
    //     "lastName": "", 
    //     "email":"", 
    //     "phone": "" }
    const {slotId, serviceId} = useParams();
    // );
    let formIsValid = true;

    console.log(props); 

    // Update fields
    const setField = (field, value) => {
        setForm({
          ...form,
          [field]: value
        })

        // Check errors
        if (!!formError[field]) {
            setFormError({...formError, [field]:null})
        }
      }

    // function handleValidation() {    
    //     formIsValid = true;
    //     // const { firstName, lastName, email, phoneNumber } = form
    //     // const newErrors = {}
    //     // // name errors
    //     // if ( !name || name === '' ) newErrors.name = 'cannot be blank!'
    //     // else if ( name.length > 30 ) newErrors.name = 'name is too long!'
    //     // // food errors
    //     // if ( !food || food === '' ) newErrors.food = 'select a food!'
    //     // // rating errors
    //     // if ( !rating || rating > 5 || rating < 1 ) newErrors.rating = 'must assign a rating between 1 and 5!'
    //     // // comment errors
    //     // if ( !comment || comment === '' ) newErrors.comment = 'cannot be blank!'
    //     // else if ( comment.length > 100 ) newErrors.comment = 'comment is too long!'
    
    //     // return newErrors
    //     //FirsrtName
    //     if(!fields.firstName){
    //         formIsValid = false;
    //         errors.firstName = "Cannot be empty";
    //     }

    //         // if(typeof fields["firstName"] !== "undefined"){
    //         //     if(!fields["firstName"].match(/^[a-zA-Z]+$/)){
    //         //         formIsValid = false;
    //         //         errors["firstName"] = "Only letters";
    //         //     }        
    //         // }

    //     //LastName
    //     if(!fields["lastName"]){
    //         formIsValid = false;
    //         errors["lastName"] = "Cannot be empty";
    //     }

    //     // if(typeof fields["lastName"] !== "undefined"){
    //     //     if(!fields["lastName"].match(/^[a-zA-Z]+$/)){
    //     //         formIsValid = false;
    //     //         errors["lastName"] = "Only letters";
    //     //     }        
    //     // }

    //     // //Email
    //     // if(!fields["email"]){
    //     //     formIsValid = false;
    //     //     errors["email"] = "Cannot be empty";
    //     //  }
   
    //     //  if(typeof fields["email"] !== "undefined"){
    //     //     let lastAtPos = fields["email"].lastIndexOf('@');
    //     //     let lastDotPos = fields["email"].lastIndexOf('.');

    //     //     if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
    //     //        formIsValid = false;
    //     //        errors["email"] = "Email is not valid";
    //     //      }
    //     // } 

    //     // //PhoneNumber
    //     // if(!fields["phone"]){
    //     //     formIsValid = false;
    //     //     errors["phone"] = "Cannot be empty";
    //     // }
    //     return formIsValid;
    // }   

    const errorsForm = () => {
        const {firstName, lastName, phone, email} = form;
        const newErrors = {};
        formIsValid = false;
        // firstName
        if ( !firstName || firstName === '' ) newErrors.firstName = 'First name cannot be blank!'
        else if ( firstName.length > 30 ) newErrors.firstName = 'The first name is too long!'

        //if(!firstName.match(/^[a-zA-Z]+$/)) newErrors.firstName = "Only letters";

        // lastName
        if ( !lastName || lastName === '' ) newErrors.lastName = 'Last cannot be blank!'
        else if ( lastName.length > 30 ) newErrors.lastName = 'The last name is too long!'

        //if(!lastName.match(/^[a-zA-Z]+$/)) newErrors.lastName = "Only letters";

        // email
        if ( !email || email === '' ) newErrors.email = 'Email cannot be blank!'
        
        
        // phoneNumber
        if ( !phone || phone === '' ) newErrors.phone = 'Phone cannot be blank!'
        // if(!phone.match(phoneRegEx)) newErrors.phone = "Only numbers";

        return newErrors

    }  
    // const urlParam = "/api/payments/initiate";
    // async function postApiInitiatePayment() {


    //     console.log("postApiInitiatePayment");
    //     console.log("slotId");
    //     console.log(slotId);
    //     console.log("serviceId");
    //     console.log(serviceId);

    //     console.log("form.firstName");
    //     console.log(form.firstName);
    //     console.log("form.phon");
    //     console.log(form.phone);

    //     const response = await fetch(urlParam, {
    //         method:'POST',
    //         mode: 'cors',
    //         cache: 'no-cache',
    //         credentials: 'same-origin',        
    //         headers: {  
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         },
    //         body: JSON.stringify(
    //             {
    //                 'slotID' : slotId,
    //                 'salonServiceDetailID' : serviceId,
    //                 'firstName' : form.firstName,
    //                 'lastName' : form.lastName,
    //                 'email' : form.email,
    //                 'phoneNumber' : form.phone,
    //             }
    //         )
    //     });
    //     console.log(response.json());
    //     return response.json();

    // }

    const handleSummit = (event) => {    
        console.log(props);
        event.preventDefault();
        // get our new errors
        // const newErrors = handleValidation()
        formIsValid = true;
        const newErrors = errorsForm();
        console.log("newErrors");
        console.log(newErrors);
        
        if ( Object.keys(newErrors).length > 0 ) {
            // We got errors!
            
            setFormError(newErrors)    
        } else {
            console.log("ApiInitiatePayment Props:");
            console.log(props);
            ApiInitiatePayment(
                slotId,
                serviceId,  
                form.firstName,
                form.lastName,
                form.phone, 
                form.email
                )
                .then(res => res.json())                
                .then(results => props.handlePaymentInit(results.id,results.secretID))
                .catch(error => {
                    console.error('There has been a problem with fetch operation', error);
                })
        }
     }

    return( 
         <Fragment>  
            <div>
                <h2>Enter Billing Details</h2>
                <form onSubmit={handleSummit}>
                    <div className="form-group">
                        <label >First Name</label>
                        <input 
                            type="text" 
                            required
                            onChange={e => setField('firstName', e.target.value)} 
                            // onChange={e => setField({...fields, firstName: e.target.value})} 
                            className="form-control" 
                            placeholder="ex: John"
                        />
                        { formIsValid ? <div style={{fontSize:12, color:"red"}}>
                            {formError.firstName}
                        </div> :<div></div>}
                    </div>
                    <div className="form-group">
                        <label >Last Name</label>
                        <input  
                            type="text" 
                            required
                            onChange={e => setField('lastName', e.target.value)} 
                            className="form-control" 
                            placeholder="ex: Smith"
                        />
                        { formIsValid ? <div style={{fontSize:12, color:"red"}}>
                            {formError.lastName}
                        </div> :<div></div>}
                    </div>
                    <div className="form-group">
                        <label >Email Address</label>
                        <input  
                            type="text" 
                            required
                            onChange={e => setField('email', e.target.value)} 
                            className="form-control" 
                            aria-describedby="emailHelp" 
                            placeholder="ex: toto@yahoo.fr"
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else !</small>
                        { formIsValid ? <div style={{fontSize:12, color:"red"}}>
                            {formError.email}
                        </div> :<div></div>}
                    </div>
                    <div className="form-group">
                        <label >Phone Number</label>
                        <input 
                            type="number" 
                            required
                            onChange={e => setField('phone', e.target.value)}
                            className="form-control" 
                            placeholder="ex: 00324532345"   
                        />
                        { formIsValid ? <div style={{fontSize:12, color:"red"}}>
                            {formError.phone}
                        </div> :<div></div>}
                    </div>
                    <button type="button" onClick={handleSummit} className="btn btn-primary">Make Payment</button>
                </form>
            </div>
        </Fragment>
    );
}

export default GetBillingDetails;
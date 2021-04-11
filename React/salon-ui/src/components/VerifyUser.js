import React, {Fragment, useState, useEffect, useRef} from "react";
import { Button, Grid } from "@material-ui/core";
import QrReader from "react-qr-reader"
import moment from 'moment';

function VerifyUser() {
    const [userInfo, setUserInfo] = useState({
        name: '',
        firstName: '',
        email: '',
        zipcode: '',
        phone: '' 
    })
    const [ticketInfo, setTicketInfo] = useState({
        ticketUrl:'',
        selectedServiceName: '',
        dateSlotFor: '',
        slotStylistName: '' 
    })

    const [scanResultFile, setScanResultFile] = useState('');
    const [scanResultWebCam, setScanResultWebCam ] = useState('');
    const [loadData, setLoadData] = useState(true);
    const qrRef = useRef(null)

    const handleErrorFile = (error) => {
        console.log(error);
    }

    const handleScanFile = (result)=> {
        if (result) {
            console.log("handleScanFile result");
            console.log(result);
            setScanResultFile(result);
            fetchTicketDetails(result);
        }
    }

    const onScanFile = () => {
        qrRef.current.openImageDialog();
    }

    const handleErrorWebCam = (error) => {
        console.log(error);
    }

    const handleScanWebCam = (result) => {
        if (result) {
            console.log("handleScanFile result");
            console.log(result);
            setScanResultWebCam(result);
            fetchTicketDetails(result);
        }
    }

    const onCameraScanFile = () => {
        qrRef.current.openImageDialog();
    }

    // useEffect(() => {
    //     onCameraScanFile();
    // },[])

    const requestOptions = {
        method: 'GET',
        cache: 'no-cache',
        mode: 'no-cors',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
         },
    }; 
    function fetchTicketDetails(result) {
        console.log("fetchTicketDetails...");
        console.log("scanResultFile... result");
        console.log(result);
        // Extract ticketID from url QrCode encoded : ex :'http://localhost:8080/api/services/api/tickets/82'
        var match = result.match(/tickets\/(\d+)/);
        if (match) {
            var ticketID = match[1];
            console.log("ticketID = ");
            console.log(ticketID);
        }
        const url = "/api/tickets/"+ticketID;
        fetch(url , requestOptions)
        .then(async response =>{
            try {
                const data = await response.json()
                console.log('response data?', data)
                setLoadData(true)
                onTicketDetailsValided(data)
            } catch (error) {
                setLoadData(false);
                // handleNewErrorNotification(error)
                console.error("An error occured while confirming the QrCode : ", error);                
            }
        })
    }
    // useEffect(() => {
    //     console.log("VerifyUser...useEffect");
           
    //     const url = "/api/tickets/";
    //     const ticketID = 79;
       
    //    // fetchTicketDetails();
    // },[]);

    function onTicketDetailsValided(ticketDetails) {   
        console.log("VerifyUser...onTicketDetailsValided() ticketDetails");
        console.log(ticketDetails);
        var confirmDateSlotFor = new Date(ticketDetails.payment.slot.slotFor);
        const dateSlotFormated = moment(confirmDateSlotFor).format("ddd, MMMM D YYYY");
        setUserInfo(
            {
                ...userInfo,
                name: ticketDetails.payment.lastName,
                firstName: ticketDetails.payment.firstName,
                email: ticketDetails.payment.email,
                zipcode: ticketDetails.payment.id,
                phone: ticketDetails.payment.phoneNumber    
            });
        setTicketInfo(
            {
                ...ticketInfo,
                ticketUrl: 'http://localhost:8080/api/services/api/tickets/' + ticketDetails.id,
                selectedServiceName: ticketDetails.payment.selectedService.name,
                dateSlotFor: dateSlotFormated,
                slotStylistName: ticketDetails.payment.slot.stylistName
            } 
            );
    }

    return( 
        
        <Fragment>   
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                <Button className="classes.btn" variant="contained" color="secondary" onClick={onScanFile} >Scan QrCode</Button>    
                <QrReader 
                    ref={qrRef}
                    delay={300}
                    style={{with:'100%'}}
                    onError={handleErrorFile}
                    onScan={handleScanFile}
                    legacyMode
                /> 
            </Grid>
            <h3>Scanned Code: {scanResultFile}</h3>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                <h3>QrCode Scan by WebCam</h3>
                <Button className="classes.btn" variant="contained" color="primary" onClick={onCameraScanFile} >Camera Scan QrCode</Button>    
                <QrReader 
                    ref={qrRef}
                    delay={300}
                    style={{with:'100%'}}
                    onError={handleErrorWebCam}
                    onScan={handleScanWebCam}
                /> 
            </Grid>    
        { !loadData ? <div/> :
        <div>                
            <div>
                <h2> Details</h2>
                <div className="row">
                    <div className="col-6">
                        <strong> Service Details </strong>
                        {ticketInfo.selectedServiceName} @ {ticketInfo.dateSlotFor} by {ticketInfo.slotStylistName}
                        <hr/>
                        <br/>
                        <strong>User Information</strong>                                
                        <div> {userInfo.firstName} {userInfo.name} </div>                          
                        <div> {userInfo.email} </div>                        
                        <div> Zip {userInfo.zipcode} </div>                       
                        <div>Phone {userInfo.phone} </div>                                                    
                    </div>
                    {/* <div className="col-6">                   */}
                        {/* <Button className="classes.btn" variant="contained" color="secondary" onClick={onCameraScanFile} >Scan QrCode</Button> */}
                        {/* <Button className="classes.btn" variant="contained" color="secondary" onClick={onScanFile} >Scan QrCode</Button> */}
                    {/* </div> */}
                </div>                
            </div>
        </div>
        }
        
    </Fragment>
    );
}

export default VerifyUser;
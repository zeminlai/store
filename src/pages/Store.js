import {Button, Row} from 'react-bootstrap'
import ProductCard from '../components/ProductCard';
import { useState,useEffect } from 'react';

const Store = () => {
    const [venue, setVenue] = useState('KTDI') 
    const [date, setDate] = useState('')
    const [timestart, setTimestart] = useState('12')
    const [duration, setDuration] = useState('1')
    const [sport, setSport] = useState('badminton')
    const [bookedCourt, setBookedCourt] = useState('')
    const [venueInfo, setVenueInfo] = useState([])
    const [availableCourts, setAvailableCourts] = useState([])

    let searchCourt = {venue, sport, date, timestart}

    // function to post data when filterbar contents is submittted
    const handleSubmit = (e) => {
        e.preventDefault();
        searchCourt = {venue, sport, date, timestart}

        console.log(searchCourt)

        fetch('/booking', {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(searchCourt)
        }).then(response => {
            return response.json();
        }).then( data => {
             setBookedCourt(data.bookedCourt.bookedCourt)
             setVenueInfo(data.venueInfo.venueInfo[0])
        })
    }

    useEffect(() =>{
        setCourts()
    },[bookedCourt,venueInfo])

    const setCourts = () => {
        setAvailableCourts([])
        let booked = [];

        for (let x in bookedCourt){
            booked.push(bookedCourt[x].court)
        }

        for(let i = 1; i <= venueInfo.max_courts; i++){
            if (!booked.includes(i)){
                setAvailableCourts(availableCourts => [
                    ...availableCourts, {searchCourt, courtNum: i} 
                ])
            }
        }
        console.log(availableCourts)
    }
    return ( 
        
    
        <div>
            <h1 align="center" className="p-3">Search Courts</h1>
            <div className="body">
            <div className="book-background">
                <div className="book-container">
                <div className="bcolumn">
                            <div className="word">
                                <h2 className="title">Find Court</h2>
                            </div>
                        <form className="brow" onSubmit={handleSubmit}>
                            

                    
                                <div className="venue">
                                    <label className="form-label" style={{fontWeight: 500}}>Venue</label>
                                    <div className="bckselect">
                                    <select className="select" id="venue" name="venue" value={venue} onChange={e => setVenue(e.target.value)}>
                                
                                        <option value="KTDI">KTDI</option>
                                        <option value="KTHO">KTHO</option>
                                        <option value="K9/K10">K9/K10</option>
                                    </select>
                                    </div>
                                    
                                </div>

                                
                                <div className="sport">
                                    <label className="form-label" style={{fontWeight: 500}}>Sport</label>
                                    <select className="select" id="sport" name="sport" value={sport} onChange={e => setSport(e.target.value)}>
                            
                                    <option value="badminton">Badminton</option>
                                    <option value="basketball">Basketball</option>
                                    <option value="futsal">Futsal</option>
                                    </select>
                                </div>

                    
                                <div className="date">
                                    <label className="form-label" style={{fontWeight: 500}}>Date</label>
                                    <input type="date" className="form-control" name="date" min={new Date().toISOString().split('T')[0]} required id="datePickerId" value={date} onChange={e => setDate(e.target.value)}/>
                                </div>

                    
                                <div className="time">
                                        <label className="form-label" style={{fontWeight: 500}}>Time</label>
                                        <select className="select" id="time" name="timestart" required value={timestart} onChange={e => setTimestart(e.target.value)}>
                                            <option value="12">12:00pm</option>
                                            <option value="13">1:00pm</option>
                                            <option value="14">2:00pm</option>
                                            <option value="15">3:00pm</option>
                                            <option value="16">4:00pm</option>
                                            <option value="17">5:00pm</option>
                                            <option value="18">6:00pm</option>
                                            <option value="19">7:00pm</option>
                                            <option value="20">8:00pm</option>
                                            <option value="21">9:00pm</option>
                                            <option value="22">10:00pm</option>
                                        </select>
                                    </div>

                    
                                    <div className="hour">
                                    <label className="form-label" style={{fontWeight: 500}}>Hours</label>
                                    <select className="select" name="duration" id="duration" required>
                                
                                        <option value="1">1 hour</option>
                                    </select>
                                    </div>

                                    <div className="find">
                                        <button type="submit" className="find-btn"><i className="fa-solid fa-right-long"></i></button>
                                    </div>
                            
                        </form>
                    </div>
                </div>
            </div>
    </div>
            


            <Row className='gy-3 m-5'>
                {availableCourts.map((court, index) => (
                    <div key={index}>
                        <ProductCard court={court} price={venueInfo.price}/>
                    </div>
                ))}
            </Row>
        </div>
     );
}
 
export default Store;
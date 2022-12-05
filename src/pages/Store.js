import {Button, Row} from 'react-bootstrap'
import { productsArray } from '../productStore';
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

    const handleSubmit = (e) => {
        e.preventDefault();
        searchCourt = {venue, sport, date, timestart}

        console.log(searchCourt)

        fetch('http://localhost:4000', {
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

    const testingFunc = () => {
        console.log(bookedCourt)
        console.log(venueInfo)
        console.log(searchCourt)

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
        <>
            <h1 align="center" className="p-3">Search Courts</h1>
            
            <div align="center" className="m-5">
            <p>One hour interval only</p>
            <form onSubmit={handleSubmit}>
                <label for="venue">Choose a venue:</label>
                <select id="venue" name="venue" value={venue} onChange={e => setVenue(e.target.value)}>
                    <option value="KTDI">KTDI</option>
                    <option value="KTHO">KTHO</option>
                    <option value="KTC">KTC</option>
                    <option value="K9K10">K9/K10</option>
                </select>
                <label for="sport">Sport:</label>
                <select id="sport" name="sport" value={sport} onChange={e => setSport(e.target.value)}>
                    <option value="badminton">Badminton</option>
                    <option value="basketball">Basketball</option>
                    <option value="futsal">Futsal</option>
                    
                </select>
                <label for="date">Date:</label>
                <input type="date" name="date" required id="datePickerId" value={date} onChange={e => setDate(e.target.value)}/>
                <label for="time-start">Start time</label>
                <select id="time" name="timestart" required value={timestart} onChange={e => setTimestart(e.target.value)}>
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
                <select name="duration" id="duration" required>
                    <option value="1">1 hour</option>
                </select>
                
                <input type="submit" value="Find!"></input>
            </form>
            <p>{date}</p>
        </div>

        <Button onClick={testingFunc}>Show booked courts</Button>

            
        {availableCourts.map((court, index) => (

            <div key={index}>
                <ProductCard court={court} price={venueInfo.price}/>
            </div>
        ))}
            {/* <Row className='g-3'>
                {productsArray.map((product, index) => (
                    <div key={index}>
                        <ProductCard product={product} />
                    </div>
                ))}

            </Row> */}
        </>
     );
}
 
export default Store;
import Carousel from 'react-bootstrap/Carousel'
import './style.css'

const Home = () => {

    return (
        <div>
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100 carousel-img"
                        src="/cards/0.jpg"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h1>Welcome to Cobomax Academy </h1>
                        <h3> Reaching every student with excellent STEM education!</h3>
                    </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 carousel-img"
                            src="/cards/1.jpg"
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h1> Cobomax's FLL Team #37864, The Martians </h1>
                            <h3>1st Place Robot Design and the 1st Place Robot Performance, in 2018 FIRST LEGO League (FLL) Qualifier Tournament</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

            <div className="about-content"> 
                <div className="inline">
                    <h1>ABOUT US</h1> <br/>Cobomax Academy is a nonprofit organization dedicated to expanding access to Science, Technology, Engineering and Mathematics (STEM) education for young students in Ontario.
                    <h1>OUR VISION</h1> <br/>A strong STEM education has been recognized as a key driver of lifetime opportunity. Our vision is to provide every student feasible opportunity to excellent STEM education.
                </div>
            </div>

            <div className="program-content">
                <div className="program-block" style={{backgroundColor:'#ee4035'}}>
                    <h1>Robotics Program</h1> <br/>
                    LEGO EV3 Robotics Level 1 <br/><br/>
                    LEGO EV3 Robotics Level 2 <br/><br/>
                    FLL Robotics Club 
                </div>
                <div className="program-block" style={{backgroundColor:'#f37736'}}>
                    <h1>Coding Program</h1><br/>
                    Scratch Coding for Kids <br/><br/>
                    Python Coding for Kids <br/><br/>
                    Advanced Coding Club 
                </div>
                <div className="program-block" style={{backgroundColor:'#7bc043'}}>
                    <h1>Math Program</h1><br/>
                    Junior Progressive Math<br/><br/>
                    Senior Progressive Math <br/><br/>
                    Advanced Math Club 
                </div>
                <div className="program-block" style={{backgroundColor:'#0392cf'}}>
                    <h1>Summer Camp</h1><br/>
                    During Summer Vacation, <br/>
                    Cobomax offers exciting <br/>
                    Summer Camps for kids with <br/>
                    special interests in STEM<br/> <br/>
                </div>
            </div>
        
            <div className="help-content">
                <h2>   How To Help</h2>
                <h3>   Donate</h3>     
                Every dollar you donate to Cobomax, will let our students go farther on their path in learning STEM.
                <br/>
                Please consider a donation!   
                <h3>      Volunteer</h3> 
                There is always a way to make contribution. 
                <br/>
                Volunteer to teach or mentor students, or to be a guest
                speaker in our STEM club!
                <h3>     Sponsor </h3>       
                Sponsoring an event or a Cobomax club is a great form of charitable giving. 
                <br/>
                We are grateful to the following sponsors: 
                <div className="sponsors">
                    <img src="/sponsor/1.png" alt='img'/>  
                    <img src="/sponsor/2.png" alt='img'/>  
                    <img src="/sponsor/3.png" alt='img'/>  
                    <img src="/sponsor/4.jpg" alt='img'/>  
                </div>
            </div>
            
            <div className="text-center center-block footer">
                <p>Copyright © 2019. Cobomax Academy all rights reserved.</p>
                <p > Powered by Yuwen Zheng    </p>
            </div>              
        </div>
    )
}

export default Home;
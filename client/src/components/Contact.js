import './style.css'

const Contact = () => 
{
    return(
        <div className="contact-content contact">
            <h3>Email</h3>
            info@cobomax.org   
            <h3>Address</h3>
            999 Collip Circle, Suite 116, <br/> Western University Research Park, London, ON N6G 0J3
            <a role="button"  className="btn btn-primary" href="https://www.google.com/maps/place/Western+Research+Parks/@43.015282,-81.28013,13z/data=!4m5!3m4!1s0x0:0x4b96ce9d8ab4b261!8m2!3d43.0152816!4d-81.2801303?hl=en-US">
                Map</a>
            <h3>Facebook</h3>
            <a  href="http://facebook.com/pg/Cobomax-Academy-360778581461731">Cobomax Academy</a>
        </div>
    )
}

export default Contact
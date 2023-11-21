import "./index.css"
import { BsPhone } from "react-icons/bs";

function Main() {
  return (
    <main>
      <section className="whatWeOffer container">
          <h2>Stylish Portfolio is the perfect theme for your next project!</h2>
          <h3>This theme features a flexible, UX friendly sidebar menu and stock photos from our friends at <a href="#">Unsplash</a> !</h3>
          <button>What We Offer</button>
      </section>
      <section className="services">
        <div className="container">
          <p>SERVICES</p>
          <h4>What We Offer</h4>   
          <div className="row">
            <div className="col-3 col-md-6 col-sm-12 card">
              <div className="icon">
                <BsPhone style={{color:"#1D809F",fontSize:"36px"}} />
              </div>
              <h5>Responsive</h5>
              <h6>Looks great on any screen size!</h6>
            </div>
            <div className="col-3 col-md-6 col-sm-12 card">
              <div className="icon">
                <BsPhone style={{color:"#1D809F",fontSize:"36px"}} />
              </div>
              <h5>Responsive</h5>
              <h6>Looks great on any screen size!</h6>
            </div>
            <div className="col-3 col-md-6 col-sm-12 card">
              <div className="icon">
                <BsPhone style={{color:"#1D809F",fontSize:"36px"}} />
              </div>
              <h5>Responsive</h5>
              <h6>Looks great on any screen size!</h6>
            </div>
            <div className="col-3 col-md-6 col-sm-12 card">
              <div className="icon">
                <BsPhone style={{color:"#1D809F",fontSize:"36px"}} />
              </div>
              <h5>Responsive</h5>
              <h6>Looks great on any screen size!</h6>
            </div>
          </div>
        </div>
      </section>
      <section className="download">
        <div className="container">
          <h2>Welcome to <i>your</i> next website!</h2>
          <button>Download Now!</button>
        </div>
      </section>
      <section className="portfolio">
        <div className="container">
          <p>PORTFOLIO</p>
          <h4>Recent Projects</h4>
          <div className="row">
            <div className="col-6 col-md-12">
              <div className="card">
                <div className="overlay"></div>
              </div>
                <div className="texts">              
                  <h2>STATIONARY</h2>
                  <h3>A yellow pencil with envelopes on a clean, blue backdrop!</h3>
                </div>
            </div>
            <div className="col-6 col-md-12">
              <div className="card">
                <div className="overlay"></div>
              </div>
              <div className="texts">              
                  <h2>STATIONARY</h2>
                  <h3>A yellow pencil with envelopes on a clean, blue backdrop!</h3>
                </div>
            </div>
            <div className="col-6 col-md-12">
              <div className="card">
                <div className="overlay"></div>
              </div>
              <div className="texts">              
                  <h2>STATIONARY</h2>
                  <h3>A yellow pencil with envelopes on a clean, blue backdrop!</h3>
                </div>
            </div>
            <div className="col-6 col-md-12">
              <div className="card">
                <div className="overlay"></div>
              </div>
              <div className="texts">              
                  <h2>STATIONARY</h2>
                  <h3>A yellow pencil with envelopes on a clean, blue backdrop!</h3>
                </div>
            </div>
          </div>
        </div>
      </section>
      <section className="theButtons">
        <div className="container">
          <h4>The buttons below are impossible to resist...</h4>
          <div className="buttons">
            <button>Click me!</button>
            <button>Look at Me!</button>
            
          </div>
        </div>
        
      </section>
    </main>
  )
}

export default Main

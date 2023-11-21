// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faBars } from '@fortawesome/free-solid-svg-icons'

import "./index.css"
function Header() {
  return (
    <>
        <header>
          <div className="container">
            <div className="burgerMenu">
                <svg className="bars" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"></path></svg>
                {/* <FontAwesomeIcon icon={faBars} style={{color: "#ffffff",}} /> */}
            </div>
            <h1>Stylish Portfolio</h1>
            <h3>A Free Bootstrap Theme by Start Bootstrap</h3>
            <button>Find Out More</button>
          </div>
        </header>
    </>
  )
}

export default Header

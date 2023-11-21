import "./index.css"
import { FiFacebook } from "react-icons/fi";
import { SlSocialGithub,SlSocialTwitter } from "react-icons/sl";


function Footer() {
  return (
    <footer>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1243184.3233960792!2d13.3803927!3d52.513631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a8513c4f251d4f%3A0xe229c8801b2fa179!2sHistorical%20location%20of%20the%20%22F%C3%BChrerbunker!5e0!3m2!1str!2saz!4v1700602143353!5m2!1str!2saz" width="100%" height="480" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
      <div className="bottomFooter">
        <div className="icons">
          <div className="icon">
            <FiFacebook style={{color:"#FFF",fontSize:"24px"}} />
          </div>
          <div className="icon">
            <SlSocialTwitter style={{color:"#FFF",fontSize:"24px"}} />
          </div>
          <div className="icon">
            <SlSocialGithub style={{color:"#FFF",fontSize:"24px"}} />
          </div>
        </div>
        <div className="copyright">
          Copyright © Your Website 2023
        </div>
        
      </div>
    </footer>
  )
}

export default Footer

import { Link } from "react-router-dom"
import {FaMapMarkerAlt} from 'react-icons/fa'
import {GiRotaryPhone} from 'react-icons/gi'
import {AiFillMail, AiFillSkype} from "react-icons/ai"
import {BsFacebook, BsInstagram, BsLinkedin, BsTelegram, BsTwitter} from "react-icons/bs"
import './style.css'

const Footer = () => (
    <div className="footer-container">
        <div className="footer-top">
            <h2>ĐĂNG KÝ NHẬN THÔNG TIN</h2>
            <div className="email-register">
                <input type="text" placeholder="Email..."/>
                <button className="btn-register">ĐĂNG KÝ</button>
            </div>
        </div>

        {/* pc */}
        <div className="footer-main-pc">
            <div className="contact-info-pc">
                <h3>THÔNG TIN LIÊN HỆ</h3>
                <div className="contact">
                    <FaMapMarkerAlt className="ic" /> <span>Nguyen Trai, Thanh Xuan, Ha Noi</span>
                </div>

                <div className="contact">
                    <GiRotaryPhone className="ic" /> <span>0965218207</span>
                </div>

                <div className="contact">
                    <AiFillMail className="ic" /> <span>nguyenkhuongduy2008@gmail.com</span>
                </div>

                <div className="contact">
                    <AiFillSkype className="ic" /> <span>Khuong Duy Nguyen</span>
                </div>

                <div className="contact">
                    <BsFacebook className="ic-facebook"/>
                    <BsInstagram className="ic-instagram"/>
                    <BsTwitter className="ic-twitter"/>
                    <BsTelegram className="ic-telegram"/>
                    <BsLinkedin className="ic-linkedin"/>
                </div>
            </div>
            <div className="link">
                <h3>LIÊN KẾT</h3>
                <p><Link to='/'>Giới thiệu</Link></p>
                <p><Link to='/'>SmartWatch</Link></p>
                <p><Link to='/'>Blogs</Link></p>
                <p><Link to='/'>Liên hệ</Link></p>
            </div>
            <div className="support">
                <h3>HỖ TRỢ</h3>
                <p>Hướng dẫn mua hàng</p>
                <p>Hướng dẫn thanh toán</p>
                <p>Chính sách bảo hành</p>
                <p>Chính sách đổi trả</p>
                <p>Tư vấn khách hàng</p>
            </div>
            <div className="dowload-app">
                <h3>TẢI ỨNG DỤNG</h3>
                <p>
                    Ứng dụng Mona Watch hiện có sẵn trên Google Play & App Store. Tải nó ngay.
                </p>
                <img src="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/img-googleplay.jpg" alt="" />
                <img src="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/img-appstore.jpg" alt="" />
            </div>
        </div>
        
        {/* tablet */}
        <div className="footer-main-tablet">
            <div className="contact-info-tablet">
            <div className="contact-info">
                <h3>THÔNG TIN LIÊN HỆ</h3>
                <div className="contact">
                    <FaMapMarkerAlt className="ic" /> <span>Nguyen Trai, Thanh Xuan, Ha Noi</span>
                </div>

                <div className="contact">
                    <GiRotaryPhone className="ic" /> <span>0965218207</span>
                </div>

                <div className="contact">
                    <AiFillMail className="ic" /> <span>nguyenkhuongduy2008@gmail.com</span>
                </div>

                <div className="contact">
                    <AiFillSkype className="ic" /> <span>Khuong Duy Nguyen</span>
                </div>

                <div className="contact">
                    <BsFacebook className="ic-facebook"/>
                    <BsInstagram className="ic-instagram"/>
                    <BsTwitter className="ic-twitter"/>
                    <BsTelegram className="ic-telegram"/>
                    <BsLinkedin className="ic-linkedin"/>
                </div>
            </div>
            <div className="link">
                <h3>LIÊN KẾT</h3>
                <p><Link to='/'>Giới thiệu</Link></p>
                <p><Link to='/'>SmartWatch</Link></p>
                <p><Link to='/'>Blogs</Link></p>
                <p><Link to='/'>Liên hệ</Link></p>
            </div>
            <div className="support">
                <h3>HỖ TRỢ</h3>
                <p>Hướng dẫn mua hàng</p>
                <p>Hướng dẫn thanh toán</p>
                <p>Chính sách bảo hành</p>
                <p>Chính sách đổi trả</p>
                <p>Tư vấn khách hàng</p>
            </div>
            </div>
            <div className="dowload-app">
                <h3>TẢI ỨNG DỤNG</h3>
                <p>
                    Ứng dụng Mona Watch hiện có sẵn trên Google Play & App Store. Tải nó ngay.
                </p>
                <img src="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/img-googleplay.jpg" alt="" />
                <img src="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/img-appstore.jpg" alt="" />
            </div>
        </div>

        {/* mobile */}
        <div className="footer-main-mobile">
            <div className="contact-info">
                <h3>THÔNG TIN LIÊN HỆ</h3>
                <div className="contact">
                    <FaMapMarkerAlt className="ic" /> <span>Nguyen Trai, Thanh Xuan, Ha Noi</span>
                </div>

                <div className="contact">
                    <GiRotaryPhone className="ic" /> <span>0965218207</span>
                </div>

                <div className="contact">
                    <AiFillMail className="ic" /> <span>nguyenkhuongduy2008@gmail.com</span>
                </div>

                <div className="contact">
                    <AiFillSkype className="ic" /> <span>Khuong Duy Nguyen</span>
                </div>

                <div className="contact">
                    <BsFacebook className="ic-facebook"/>
                    <BsInstagram className="ic-instagram"/>
                    <BsTwitter className="ic-twitter"/>
                    <BsTelegram className="ic-telegram"/>
                    <BsLinkedin className="ic-linkedin"/>
                </div>
            </div>
            <div className="link-support">
                <div className="link">
                    <h3>LIÊN KẾT</h3>
                    <p><Link to='/'>Giới thiệu</Link></p>
                    <p><Link to='/'>SmartWatch</Link></p>
                    <p><Link to='/'>Blogs</Link></p>
                    <p><Link to='/'>Liên hệ</Link></p>
                </div>
                <div className="support">
                    <h3>HỖ TRỢ</h3>
                    <p>Hướng dẫn mua hàng</p>
                    <p>Hướng dẫn thanh toán</p>
                    <p>Chính sách bảo hành</p>
                    <p>Chính sách đổi trả</p>
                    <p>Tư vấn khách hàng</p>
                </div>
            </div>
            <div className="dowload-app">
                <h3>TẢI ỨNG DỤNG</h3>
                <p>
                    Ứng dụng Mona Watch hiện có sẵn trên Google Play & App Store. Tải nó ngay.
                </p>
                <img src="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/img-googleplay.jpg" alt="" />
                <img src="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/img-appstore.jpg" alt="" />
            </div>
        </div>

        {/* pc */}
        <div className="footer-bottom-pc">
            <h3>&copy; Bản quyền thuộc về người thiết kế website &hearts; Nguyễn Khương Duy</h3>
            <img src="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/img-payment.png" alt="" />
        </div>
        {/* tablet + mobile */}
        <div className="footer-bottom-tablet-mobile">
            <img src="http://mauweb.monamedia.net/donghohaitrieu/wp-content/uploads/2019/07/img-payment.png" alt="" />
            <h3>&copy; Bản quyền thuộc về người thiết kế website &hearts; Nguyễn Khương Duy</h3>
        </div>
    </div>
)

export default Footer
import React, { useState } from "react";
import "../Assets/Styles/auth.css";
import SignInForm from "../Components/Auth/SignIn";
import SignUpForm from "../Components/Auth/SignUp";
import logo from "../Assets/logo.png";
import who from "../Assets/who.jpg";

const Auth = () => {
  const [type, setType] = useState("signIn");
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
    
  return (
    <div>
      {/* Header with Logo and Title */}
      <center>  
        <header className="site-header">
          <div className="header-content">
            <div className="logo-container">
              <img src={logo} alt="Logo" className="site-logo" />
            </div>
          </div>
        </header>
      </center>

      <div className="main-content">
        {/* Background div */}
        <div className="dental-background"></div>
        
        {/* Auth Container - Updated structure */}
        <div className="registration">
          <div className={containerClass} id="container">
            <SignUpForm />
            <SignInForm />
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>تمتلك حساب بالفعل؟</h1>
                  <p className="overlay-description">
                    قم بتسجيل الدخول للوصول إلى ملفك الشخصي ومتابعة رحلة صحة فمك
                  </p>
                  <button
                    className="ghost btn-dental"
                    id="signIn"
                    onClick={() => handleOnClick("signIn")}
                  >
                    تسجيل الدخول
                  </button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1>كولجريت</h1>
                  <p className="overlay-description">
                    انضم إلينا اليوم واكتشف عالماً من العناية الصحية المتطورة
                  </p>
                  <button
                    className="ghost btn-dental"
                    id="signUp"
                    onClick={() => handleOnClick("signUp")}
                  >
                    إنشاء حساب جديد
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Gallery */}
        <div className="services-gallery">
          <h2 className="section-title">خدماتنا العلاجية</h2>
          <div className="gallery-grid">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="gallery-item">
                <img src={logo} alt={`Dental Service ${item}`} />
                <div className="gallery-overlay">
                  <h3>خدمة علاجية {item}</h3>
                  <p>وصف مختصر للخدمة العلاجية</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About Us Section */}
        <div className="about-section">
          <div className="about-content">
            <h2 className="section-title animate-fade-in">من نحن</h2>
            <div className="about-grid">
              <div className="about-text animate-slide-right">
                <div className="about-image-container">
                  <img src={who} alt="Our Team" className="about-image" />
                </div>
                <p>نحن فريق متخصص من أطباء الأسنان والمبرمجين، نسعى لتقديم تجربة رعاية صحية فريدة تجمع بين الخبرة الطبية والتكنولوجيا المتقدمة.</p>
                <ul className="about-list">
                  <li>✓ خبرة تزيد عن 15 عاماً</li>
                  <li>✓ فريق طبي متخصص</li>
                  <li>✓ تقنيات حديثة ومتطورة</li>
                </ul>
              </div>
              <div className="about-stats animate-slide-left">
                <div className="stat-card">
                  <h3>+1000</h3>
                  <p>مريض سعيد</p>
                </div>
                <div className="stat-card">
                  <h3>+50</h3>
                  <p>طبيب متخصص</p>
                </div>
                <div className="stat-card">
                  <h3>24/7</h3>
                  <p>دعم متواصل</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="testimonials-section">
          <h2 className="section-title">آراء المرضى</h2>
          <div className="testimonials-grid">
            {[1, 2, 3].map((item) => (
              <div key={item} className="testimonial-card">
                <img src={logo} alt={`Patient ${item}`} className="patient-image" />
                <p className="testimonial-text">تجربة رائعة مع الفريق الطبي...</p>
                <h4 className="patient-name">اسم المريض</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src={logo} alt="Logo" className="footer-logo-image" />
          </div>
          <div className="footer-contact">
            <h3>تواصل معنا</h3>
            <p>📞 الهاتف: xxx-xxx-xxxx</p>
            <p>📧 البريد الإلكتروني: info@example.com</p>
          </div>
          <div className="footer-social">
            <h3>تابعنا على</h3>
            <div className="social-links">
              {/* Add your social media icons/links here */}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Auth;

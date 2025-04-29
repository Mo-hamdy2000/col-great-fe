import React, { useState, useEffect } from "react";
import "../Assets/Styles/auth.css";
import SignInForm from "../Components/Auth/SignIn";
import SignUpForm from "../Components/Auth/SignUp";
import logo from "../Assets/logo.png";
import who1 from "../Assets/who_1.jpg";
import who2 from "../Assets/who_2.jpg";
import who3 from "../Assets/who_3.jpg";
import serv1 from "../Assets/serv_1.jpg";
import serv2 from "../Assets/serv_2.jpg";
import serv3 from "../Assets/serv_3.jpg";
import serv4 from "../Assets/serv_4.jpg";
import serv5 from "../Assets/serv_5.jpg";
import serv6 from "../Assets/serv_6.jpg";

const Auth = () => {
  const [type, setType] = useState("signIn");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const images = [who1, who2, who3];
  const services = [
    {
      title: "غسيل الأسنان",
      description: "نقدم خدمات غسيل الأسنان بأحدث التقنيات.",
      image: serv1
    },
    {
      title: "نصائح غذائية",
      description: "استشارات غذائية لتحسين صحتك العامة.",
      image: serv2
    },
    {
      title: "صحة الفم",
      description: "نساعدك في الحفاظ على صحة فمك وجمال ابتسامتك.",
      image: serv3
    },
    {
      title: "تحديات صحية",
      description: "نقدم برامج لتحسين صحة الفم والتغذية.",
      image: serv4
    },
    {
      title: "فيديوهات توضيحية",
      description: "شاهد فيديوهات تعليمية حول العناية بالفم.",
      image: serv5
    },
    {
      title: "بيئة تنافسية",
      description: "نساعد الشباب على التواصل وتحقيق أهدافهم.",
      image: serv6
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [images.length]);

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
    
  return (
    <div className="auth-page">
      {/* Header with Logo and Title */}
      <header className="site-header">
        <div className="header-content">
          <div className="logo-container">
            <img src={logo} alt="Logo" className="site-logo" />
          </div>
        </div>
      </header>

      <div className="main-content">
        {/* Background div */}
        <div className="dental-background"></div>
        
        {/* Auth Container - Updated structure */}
        <div className="registration">
          {isMobile && (
            <div className="mobile-toggle-container">
              <button 
                className={`mobile-toggle-button ${type === "signIn" ? "active" : ""}`}
                onClick={() => handleOnClick("signIn")}
              >
                تسجيل الدخول
              </button>
              <button 
                className={`mobile-toggle-button ${type === "signUp" ? "active" : ""}`}
                onClick={() => handleOnClick("signUp")}
              >
                إنشاء حساب
              </button>
            </div>
          )}
          <div className={containerClass} id="container">
            <SignUpForm />
            <SignInForm />
            {!isMobile && (
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
            )}
          </div>
        </div>

        {/* About Us Section */}
        <div className="about-section">
          <div className="about-content">
            <h2 className="section-title animate-fade-in">من نحن</h2>
            <div className="about-grid">
              <div className="about-text animate-slide-right">
                <div className="about-image-container">
                  <img src={images[currentImageIndex]} alt="Our Team" className="about-image" />
                </div>
                <p>نحن خريجو جامعة الإسكندرية من كليتي طب الأسنان والهندسة، ونسعى لتقديم تجربة رعاية صحية فريدة تجمع بين الخبرة الطبية والتكنولوجيا المتقدمة.</p>
                <p>فريقنا يتكون من 12 شخصاً، وهدفنا هو نشر الوعي بصحة الفم والتغذية بين المراهقين.</p>
                <ul className="about-list">
                  <li>✓ فريق طبي متخصص</li>
                  <li>✓ تقنيات حديثة ومتطورة</li>
                </ul>
              </div>
              <div className="about-stats animate-slide-left">
                <div className="stat-card">
                  <h3>التقنيات الحديثة</h3>
                  <p>استخدام أحدث التقنيات في الرعاية الصحية</p>
                </div>
                <div className="stat-card">
                  <h3>الوعي الصحي</h3>
                  <p>نشر الوعي بصحة الفم والتغذية</p>
                </div>
                <div className="stat-card">
                  <h3>24/7</h3>
                  <p>دعم متواصل</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Gallery */}
        <div className="services-gallery">
          <h2 className="section-title">خدماتنا العلاجية</h2>
          <div className="gallery-grid">
            {services.map((item, index) => (
              <div key={index} className="gallery-item">
                <img src={item.image} alt={`Dental Service ${item.title}`} />
                <div className="gallery-overlay">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="testimonials-section">
          <h2 className="section-title">آراء الخبراء</h2>
          <div className="testimonials-grid">
            {[
              {
                id: 1,
                name: "د. مرام",
                title: "طبيبة أسنان",
                text: "نحن نقدم أفضل خدمات العناية بالفم باستخدام أحدث التقنيات."
              },
              {
                id: 2,
                name: "د. مريم",
                title: "أخصائية تغذية",
                text: "التغذية السليمة تلعب دورًا كبيرًا في صحة الفم. نحن هنا لمساعدتك."
              },
              {
                id: 3,
                name: "د. مارك",
                title: "أخصائي صحة فم",
                text: "نحن نؤمن بأهمية التوعية الصحية ونقدم برامج مخصصة لذلك."
              }
            ].map((item) => (
              <div key={item.id} className="testimonial-card">
                <p className="testimonial-text">"{item.text}"</p>
                <h4 className="patient-name">{item.name}</h4>
                <p className="patient-title">{item.title}</p>
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
            <p>📧 البريد الإلكتروني: col.great.help@gmail.com</p>
          </div>
          <div className="footer-social">
            <h3>تابعنا على</h3>
            <div className="social-links">
              <a href="https://www.facebook.com/profile.php?id=61575567788545" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-facebook-f white-icon"></i>
                <span>Facebook</span>
              </a>
              <a href="https://www.instagram.com/colgreatdent?igsh=MWR3MGczZnA1YTdrMw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="social-link">
                <i className="fab fa-instagram white-icon"></i>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Auth;

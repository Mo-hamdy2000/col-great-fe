import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const [challenges, setChallenges] = useState([]);

  // Video data - replace with your actual video sources
  const videos = [
    { id: 1, url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', title: 'Video 1' },
    { id: 2, url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', title: 'Video 2' },
    // Add more videos as needed
  ];

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    // Fetch challenges from your API
    const fetchChallenges = async () => {
      try {
        const response = await fetch('your-api-endpoint');
        const data = await response.json();
        setChallenges(data);
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };

    // fetchChallenges();
  }, []);

  const handleChallengeClick = (challengeId) => {
    // Handle challenge button click
    console.log('Challenge clicked:', challengeId);
    // Add your logic here
  };

  return (
    <>
      <div className="content-section">
        {/* Video Slider Section */}
        <div className="video-slider">
          <Slider {...sliderSettings}>
            {videos.map((video) => (
              <div key={video.id} className="video-slide">
                <video src={video.url} controls>
                  Your browser does not support the video tag.
                </video>
              </div>
            ))}
          </Slider>
        </div>

        {/* Challenges Grid */}
        <div className="content-grid">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="challenge-card">
              <h3>{challenge.title}</h3>
              <button 
                onClick={() => handleChallengeClick(challenge.id)}
                className="challenge-button"
              >
                Start Challenge
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;

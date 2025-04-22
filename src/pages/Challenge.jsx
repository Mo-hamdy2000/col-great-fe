import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Challenge() {
  const [challenges, setChallenges] = useState([]);
  const [userStats, setUserStats] = useState({
    points: 1250,
    rank: 55, // leaderboard position
    totalUsers: 1200,
    percentile: 95, // top 5%
    username: "أحمد", // Add username to state
    avatar: "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg" // Add avatar URL to state
  });

  const [challengeDetails, setChallengeDetails] = useState({
    title: "تحدي تنظيف الأسنان",
    description: "تحدي لمدة 7 أيام لتحسين صحة الأسنان من خلال التنظيف المنتظم",
    totalPoints: 350,
    daysCompleted: 5,
    totalDays: 7,
    currentStreak: 3
  });

  const [dailyTask, setDailyTask] = useState({
    text: "قم بتنظيف أسنانك لمدة دقيقتين على الأقل",
    image_url: null,
    video_url: null,
    is_completed: false,
    upload_required: false
  });

  const [mcqQuestion, setMcqQuestion] = useState({
    question: "ما هي المدة المثالية لتنظيف الأسنان؟",
    choices: [
      "30 ثانية",
      "دقيقة واحدة",
      "دقيقتان",
      "3 دقائق"
    ],
    status: "not_answered" // can be "not_answered", "answered_correct", "answered_wrong"
  });

  // Video data - replace with your actual video sources
  const videos = [
    { id: 1, url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', title: 'Video 1' },
    { id: 2, url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', title: 'Video 2' },
    // Add more videos as needed
  ];

  const statusMapper = {
    enrolled_in: 'مشترك',
    finished: 'تم الانتهاء',
    not_started: 'لم يبدأ'
  }

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    // Mock API response
    const mockChallenges = [
      {
        id: 1,
        title: "تنظيف الأسنان",
        image_url: "https://cdn-prod.medicalnewstoday.com/content/images/articles/315/315992/flossing.jpg",
        status: "enrolled_in",
        can_enroll: true,
        tracker_info: {
          days_completed: 5,
          total_days: 7,
          current_streak: 5,
          highest_streak: 8
        }
      },
      {
        id: 2,
        title: "تنظيف بالفرشاة",
        image_url: "data:image/jpeg;base64,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",
        status: "finished",
        can_enroll: false
      },
      {
        id: 3,
        title: "نظام عذائي",
        image_url: "https://gravity.fitness/cdn/shop/articles/7_diet_rules_for_a_fit_and_healthy_life.jpg?v=1673869325&width=2048",
        status: "not_started",
        can_enroll: true
      }
    ];

    setChallenges(mockChallenges);
  }, []);

  const handleChallengeClick = (challengeId) => {
    // Handle challenge button click
    console.log('Challenge clicked:', challengeId);
    // Add your logic here
  };

  const renderProgressBar = (trackerInfo) => {
    const percentage = (trackerInfo.days_completed / trackerInfo.total_days) * 100;
    return (
      <div className="tracker-info">
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${percentage}%` }}>
            <span className="progress-text">
              {trackerInfo.days_completed}/{trackerInfo.total_days} أيام
            </span>
          </div>
        </div>
        <div className="streak-info">
          <span className="streak-flame">🔥</span>
          <span className="streak-count">{trackerInfo.current_streak} أيام متتالية!</span>
          <span className="highest-streak">
            الأعلى: {trackerInfo.highest_streak} أيام
          </span>
        </div>
      </div>
    );
  };

  const handleTaskComplete = () => {
    setDailyTask(prev => ({ ...prev, is_completed: true }));
  };

  const handlePhotoUpload = (event) => {
    // Handle photo upload logic
    console.log('Photo uploaded:', event.target.files[0]);
  };

  const handleMcqSubmit = (selectedChoice) => {
    // Handle MCQ submission logic
    setMcqQuestion(prev => ({ ...prev, status: "answered_correct" }));
  };

  return (
    <div className="content-section">
      {/* Challenge Header */}
      <div className="challenge-header">
        <h1>{challengeDetails.title}</h1>
        <p>{challengeDetails.description}</p>
      </div>

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

      {/* Daily Task Section */}
      <div className="daily-task-section">
        <h2>مهمة اليوم</h2>
        <div className="task-content">
          <p>{dailyTask.text}</p>
          {dailyTask.image_url && (
            <img src={dailyTask.image_url} alt="Task illustration" />
          )}
          {dailyTask.video_url && (
            <video src={dailyTask.video_url} controls />
          )}
          <div className="task-actions">
            <button 
              onClick={handleTaskComplete}
              disabled={dailyTask.is_completed}
              className={`task-button ${dailyTask.is_completed ? 'completed' : ''}`}
            >
              {dailyTask.is_completed ? '✓ تم الإنجاز' : 'إتمام المهمة'}
            </button>
            {dailyTask.upload_required && (
              <div className="upload-section">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handlePhotoUpload}
                  disabled={dailyTask.is_completed}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MCQ Section */}
      {mcqQuestion.status === "not_answered" && (
        <div className="mcq-section">
          <h2>سؤال اليوم</h2>
          <p>{mcqQuestion.question}</p>
          <div className="choices">
            {mcqQuestion.choices.map((choice, index) => (
              <button 
                key={index}
                onClick={() => handleMcqSubmit(choice)}
                className="choice-button"
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Challenge Progress Section */}
      <div className="challenge-progress">
        <div className="progress-stats">
          <div className="stat-item">
            <span className="stat-value">{challengeDetails.totalPoints}</span>
            <span className="stat-label">النقاط المكتسبة</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">{challengeDetails.currentStreak} 🔥</span>
            <span className="stat-label">أيام متتالية</span>
          </div>
        </div>
        <div className="challenge-progress-bar">
          <div 
            className="progress-fill" 
            style={{ 
              width: `${(challengeDetails.daysCompleted / challengeDetails.totalDays) * 100}%` 
            }}
          />
          <span className="progress-text">
            {challengeDetails.daysCompleted}/{challengeDetails.totalDays} أيام
          </span>
        </div>
      </div>
    </div>
  );
}

export default Challenge;

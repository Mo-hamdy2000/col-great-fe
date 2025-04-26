import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { makeAuthenticatedRequest } from '../utils/makeAuthenticatedRequest';
import { useParams } from 'react-router-dom';
import { computeStyles } from '@popperjs/core';

function Challenge() {
  const BLANK_CHALLENGE_OBJECT = { title: "", videos: [], description: "", totalPoints: "", daysCompleted: "", totalDays: "", currentStreak: "" }
  const BLANK_TASK_OBJECT = { id: 0, text: "", image_url: null, video_url: null, is_completed: false, upload_required: false }
  const BLANK_MCQ_OBJECT = { id: 0, question: "", choices: [], correct_answer: "", user_answer: null, status: "not_answered" }
  const BLANK_TRACKER_OBJECT = { days_completed: 0, total_days: 0, current_streak: 0, highest_streak: 0, earned_points: 0 }

  const { id } = useParams();
  const [challengeDetails, setChallengeDetails] = useState(BLANK_CHALLENGE_OBJECT);
  const [dailyTask, setDailyTask] = useState(BLANK_TASK_OBJECT);
  const [mcqQuestion, setMcqQuestion] = useState(BLANK_MCQ_OBJECT);
  const [tracker, setTracker] = useState(BLANK_TRACKER_OBJECT);
  const [timeUntilNextTask, setTimeUntilNextTask] = useState('');

  // Slider settings
  const sliderSettings = {
    dots: true,
    infinite: challengeDetails.videos.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: true,
    focusOnSelect: false,
    swipeToSlide: true,
    arrows: challengeDetails.videos.length > 1,
    beforeChange: (current, next) => {
      const videos = document.querySelectorAll('.video-player');
      videos.forEach(video => video.pause());
    }
  };

  const extractTaskEntity = (task) => {
    
    setDailyTask({
      user_task_progress_id: task.id,
      text: task.content,
      image_url: task.image_url,
      video_url: task.video_url,
      is_completed: task.is_completed,
      upload_required: task.upload_required,
      points: task.points_to_earn
    });
  }

  const extractMcqEntity = (data) => {
    setMcqQuestion({
      user_task_progress_id: data.user_task_progress_id,
      question: data?.task_mcq?.question || "",
      choices: data?.task_mcq?.options || [],
      user_answer: data?.answer || "",
      correct_answer: data?.task_mcq?.correct_answer || "",
      status: data?.answer ? "answered" : "not_answered",
      points: data?.question_points_to_earn || 0
    });
  }
  

  const extractChallengeEntities = (challenge) => {
    const challengeDetails = {
      title: challenge.title,
      description: challenge.description,
      image_url: challenge.image_url,
      videos: challenge.intoductory_videos.map((url, index) => ({
          url: url,
          id: index
      })),
      status: challenge.status
    };

    extractTaskEntity(challenge.current_task ? challenge.current_task : BLANK_TASK_OBJECT);
    extractMcqEntity(challenge.current_task ? challenge.current_task : BLANK_MCQ_OBJECT);

    const tracker = {
      days_completed: challenge.tracker_info.last_completed_task_day,
      total_days: challenge.tracker_info.total_days,
      current_streak: challenge.tracker_info.streak,
      highest_streak: challenge.tracker_info.highest_streak,
      earned_points: challenge.tracker_info.earned_points
    }

    setChallengeDetails(challengeDetails);
    setTracker(tracker);
  }

  useEffect(() => {
    const fetchChallengeDetails = async () => {
      console.log("Hey");
      const data = await makeAuthenticatedRequest(
        `challenges/${id}/join`,
        { method: 'POST' });
      const challenge = data.challenge;
      extractChallengeEntities(challenge);
    };

    fetchChallengeDetails();
  }, [1]);

  const handleGainingPoints = (points, streak) => {
    const popup = document.createElement('div');
    popup.className = 'points-popup animate-points';
    popup.innerHTML = `+${points} نقطة`;
    document.body.appendChild(popup);
    setTimeout(() => popup.remove(), 2000);
    setTracker(prev => ({
      ...prev,
      earned_points: prev.earned_points + points,
      current_streak: streak ? streak : prev.streak
    }));
  }

  const handleTaskComplete = async () => {
    try {
      const response = await makeAuthenticatedRequest(
        `user_task_progresses/${dailyTask.user_task_progress_id}/mark_as_completed`,
        { method: 'POST' }
      );
      
      if (response.success) {
        extractTaskEntity(response.user_task_progress);
        handleGainingPoints(dailyTask.points, response.user_task_progress.streak);
      }
    } catch (error) {
      console.error('Error marking task as completed:', error);
    }
  };

  const handlePhotoUpload = (event) => {
    // Handle photo upload logic
    console.log('Photo uploaded:', event.target.files[0]);
  };

  const handleMcqSubmit = async (selectedChoice) => {
    const response = await makeAuthenticatedRequest(
      `user_task_progresses/${dailyTask.user_task_progress_id}/answer_question`,
      { method: 'POST', body: JSON.stringify({ answer: selectedChoice }) }
    );
    extractMcqEntity(response.user_task_progress);
    const isCorrect = mcqQuestion.user_answer === mcqQuestion.correct_answer;

    if (isCorrect) {
      handleGainingPoints(mcqQuestion.points, tracker.current_streak);
    }
  };

  const updateTimeUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);
    const diff = midnight - now;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    setTimeUntilNextTask(`${hours} ساعة و ${minutes} دقيقة و ${seconds} ثانية`);
  };

  useEffect(() => {
    if (dailyTask.is_completed) {
      updateTimeUntilMidnight();
      const timer = setInterval(updateTimeUntilMidnight, 1000); // Update every second instead of minute
      return () => clearInterval(timer);
    }
  }, [dailyTask.is_completed]);

  return (
    <div className="content-section">
      {/* Challenge Header */}
      <div className="challenge-header">
        <div className="challenge-header-content">
          <h1 className="challenge-title">{challengeDetails.title}</h1>
          <p className="challenge-description">{challengeDetails.description}</p>
        </div>
        {challengeDetails.image_url && (
          <div className="challenge-detailed-image-container">
            <img 
              src={challengeDetails.image_url} 
              alt={challengeDetails.title}
              className="challenge-detailed-image"
            />
          </div>
        )}
      </div>

      {/* Video Slider Section */}
      {challengeDetails.videos.length > 0 && (
        <div className="video-slider">
          <Slider {...sliderSettings}>
            {challengeDetails.videos.map((video) => (
              <div key={video.id} className="video-slide">
                <iframe
                  src={video.url}
                  className="video-player"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  frameBorder="0"
                >
                  Your browser does not support iframes.
                </iframe>
              </div>
            ))}
          </Slider>
        </div>
      )}

      {challengeDetails.status === 'completed' ? (
        <div className="challenge-completion">
          <div className="completion-content glass-effect">
            <div className="completion-icon">🎉</div>
            <h2 className="completion-title gradient-text">مبروك! لقد أكملت هذا التحدي بنجاح</h2>
            <div className="completion-stats content-grid">
              <div className="stat-card glass-effect">
                <span className="stat-card-value">{tracker.earned_points}</span>
                <span className="stat-card-label">مجموع النقاط</span>
              </div>
              <div className="stat-card glass-effect">
                <span className="stat-card-value">{tracker.highest_streak} 🔥</span>
                <span className="stat-card-label">أعلى تتابع</span>
              </div>
              <div className="stat-card glass-effect">
                <span className="stat-card-value">{tracker.total_days} ✅</span>
                <span className="stat-card-label">الأيام المكتملة</span>
              </div>
            </div>
            <div className="completion-trophy">
              <span className="trophy-icon">🏆</span>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Daily Task Section */}
          <div className="daily-task-section">
            <h2>مهمة اليوم</h2>
            <div className="task-content">
              <p className="task-text">{dailyTask.text}</p>
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
          <div className="mcq-section">
            <h2>سؤال اليوم</h2>
            <p className="mcq-question">{mcqQuestion.question}</p>
            <div className="choices">
              {mcqQuestion.choices.map((choice, index) => {
                let buttonClassName = "choice-button";
                
                if (mcqQuestion.user_answer) {
                  if (choice === mcqQuestion.correct_answer) {
                    buttonClassName += " correct-answer";
                  }
                  if (choice === mcqQuestion.user_answer && choice !== mcqQuestion.correct_answer) {
                    buttonClassName += " incorrect-answer";
                  }
                }

                return (
                  <button 
                    key={index}
                    onClick={() => handleMcqSubmit(choice)}
                    className={buttonClassName}
                    disabled={mcqQuestion.user_answer}
                  >
                    {choice}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Challenge Progress Section */}
          <div className="challenge-progress">
            <div className="progress-stats">
              <div className="stat-item">
                <span className="stat-value">{tracker.earned_points}</span>
                <span className="stat-label">النقاط المكتسبة</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">{tracker.current_streak} 🔥</span>
                <span className="stat-label">أيام متتالية</span>
              </div>
            </div>
            <div className="challenge-progress-bar">
              <div 
                className="progress-fill" 
                style={{ 
                  width: `${(tracker.days_completed / tracker.total_days) * 100}%` 
                }}
              />
              <span className="progress-text">
                {tracker.days_completed}/{tracker.total_days} أيام
              </span>
            </div>
          </div>

          {/* Footer Message */}
          {dailyTask.is_completed && (
            <div className="challenge-footer-message">
              <p>المهمة القادمة ستكون متاحة خلال {timeUntilNextTask}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Challenge;

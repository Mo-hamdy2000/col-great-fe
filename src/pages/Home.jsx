import { useEffect, useState } from 'react';
import { makeAuthenticatedRequest } from '../utils/makeAuthenticatedRequest';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const AVATAR_URL = "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg"
  const BLANK_USER_OBJECT = { points: "", rank: "", totalUsers: "", percentile: "", username: "" }
  const [challenges, setChallenges] = useState([]);
  const [userStats, setUserStats] = useState(BLANK_USER_OBJECT);

  const statusMapper = {
    active: 'مشترك',
    completed: 'تم الانتهاء',
    not_started: 'لم يبدأ'
  }

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const data = await makeAuthenticatedRequest('challenges');
        const challenges = data.challenges.map(challenge => ({
          id: challenge.id,
          title: challenge.title,
          image_url: challenge.image_url,
          status: challenge.status,
          can_enroll: challenge.can_join,
          tracker_info: challenge.tracker_info ? {
            days_completed: challenge.tracker_info.last_completed_task_day,
            total_days: challenge.tracker_info.total_days,
            current_streak: challenge.tracker_info.streak,
            highest_streak: challenge.tracker_info.highest_streak
          } : null
        }));
        setChallenges(challenges);
      } catch (error) {
        console.error('Failed to fetch user stats:', error);
      }
    };

    fetchChallenges();
  }, []);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const data = await makeAuthenticatedRequest('users/me');
        const user = data.user;
        setUserStats({
          points: user.points,
          rank: user.rank,
          totalUsers: user.total_users,
          percentile: user.percentile,
          username: user.name
        });
      } catch (error) {
        console.error('Failed to fetch user stats:', error);
      }
    };

    fetchUserStats();
  }, []);

  const handleChallengeClick = (challengeId) => {
    navigate(`/challenge/${challengeId}`);
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

  return (
    <>
      <div className="user-stats-container">
        <div className="stats-card">
          <div className="points-section">
            <div className="points-circle">
              <span className="points-number">{userStats.points}</span>
              <span className="points-label">نقطة</span>
            </div>
          </div>
          <div className="rank-section">
            <div className="rank-info">
              <div className="rank-number">
                <span className="rank-hash">#</span>
                <span className="rank-value">{userStats.rank}</span>
              </div>
              <div className="rank-details">
                <span className="rank-label">من {userStats.totalUsers} مستخدم</span>
                <span className="rank-percentile">متصدر على {userStats.percentile}%</span>
              </div>
            </div>
          </div>

          <div className="user-info">
            <span className="username">{userStats.username}</span>
            <img 
              src={AVATAR_URL} 
              alt={userStats.username} 
              className="user-avatar"
            />
          </div>
        </div>
      </div>

      <div className="content-section">
        <div className="content-grid">
          {challenges.map((challenge) => (
            <div 
              key={challenge.id} 
              className={`challenge-card ${challenge.status === 'completed' ? 'dimmed' : ''}`}
            >
              <img 
                src={challenge.image_url} 
                alt={challenge.title} 
                className="challenge-image"
              />
              <h3>{challenge.title}</h3>
              <div className="challenge-status">
                {statusMapper[challenge.status]}
              </div>
              {challenge.tracker_info && (
                renderProgressBar(challenge.tracker_info)
              )}
              {challenge.can_enroll && (
                <button 
                  onClick={() => handleChallengeClick(challenge.id)}
                  className="challenge-button"
                >
                  {challenge.status === 'active' ? 'اكمل' : 'ابدأ الآن'}
                </button>
              )}
              {!challenge.can_enroll && challenge.status === 'completed' && (
                <button 
                onClick={() => handleChallengeClick(challenge.id)}
                className="challenge-button"
              >
                استعراض
              </button>
              )}
              {!challenge.can_enroll && challenge.status === 'not_started' && (
                <div className="challenge-message highest-streak">
                  متاح للبدء بعد الانتهاء من التحدي الحالي
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;

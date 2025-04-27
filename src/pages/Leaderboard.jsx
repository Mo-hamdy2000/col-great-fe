import { useState, useEffect } from 'react';
import { makeAuthenticatedRequest } from '../utils/makeAuthenticatedRequest';

function Leaderboard() {
  const AVATAR_URL = "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg"
  const BLANK_USER_OBJECT = { points: "", rank: "", totalUsers: "", percentile: "", username: "" }
  const [userStats, setUserStats] = useState(BLANK_USER_OBJECT);

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

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  let offset = currentPage - 1 * usersPerPage;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await makeAuthenticatedRequest(`users?items=${usersPerPage}&page=${currentPage}`);
        const users = response.users;
        setUsers(users);
        setTotalPages(response.total_pages);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };

    fetchUsers();
    
  }, [currentPage]);

  return (
    <div className="fade-in">
      {/* User Stats Section */}
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
            <img src={AVATAR_URL} alt={userStats.username} className="user-avatar" />
          </div>
        </div>
      </div>

      {/* Leaderboard List Section */}
      <div className="leaderboard-list">
        <h2>قائمة المتصدرين</h2>
        { console.log(offset = (currentPage - 1) * usersPerPage) }
        {users.map((user, index) => (
          <div key={user.id} className="leaderboard-row">
            <div className="rank">#{offset + index + 1}</div>
            <div className="user-details-leaderboard">
              <img src={AVATAR_URL} alt={user.name} className="user-avatar" />
              <span className="username">{user.name}</span>
            </div>
            <div className="leaderboard-stats">
              <div className="leaderboard-points">
                <span className="leaderboard-points-value">{user.points}</span>
                <span className="leaderboard-points-label">نقطة</span>
              </div>
              <div className="leaderboard-streak">
                <span className="streak-flame">🔥</span>
                <span>{user.streak}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div className="leaderboard-pagination">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            السابق
          </button>
          <span className="page-info">
            صفحة {currentPage} من {totalPages}
          </span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            التالي
          </button>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;

import { useState, useEffect } from 'react';

function Leaderboard() {
  const [userStats, setUserStats] = useState({
    points: 1250,
    rank: 55,
    totalUsers: 1200,
    percentile: 95,
    username: "أحمد",
    avatar: "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg"
  });

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    // Mock API call to get leaderboard data
    const mockUsers = Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      username: `مستخدم ${i + 1}`,
      points: Math.floor(Math.random() * 2000) + 500,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
      streak: Math.floor(Math.random() * 30) + 1,
    })).sort((a, b) => b.points - a.points);

    setUsers(mockUsers);
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);

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
            <img src={userStats.avatar} alt={userStats.username} className="user-avatar" />
          </div>
        </div>
      </div>

      {/* Leaderboard List Section */}
      <div className="leaderboard-list">
        <h2>قائمة المتصدرين</h2>
        {currentUsers.map((user, index) => (
          <div key={user.id} className="leaderboard-row">
            <div className="rank">#{indexOfFirstUser + index + 1}</div>
            <div className="user-details-leaderboard">
              <img src={user.avatar} alt={user.username} className="user-avatar" />
              <span className="username">{user.username}</span>
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

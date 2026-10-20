// Learning path page (pages/LearningPath.tsx). Page title: common.nav.path
const path = {
  subtitle: 'Học theo thứ tự — mỗi bài mở khóa sau khi bạn hoàn thành bài trước (đạt ≥ {{pct}}% bài kiểm tra cuối bài).',
  lessonsCount_one: '{{done}}/{{count}} bài',
  lessonsCount_other: '{{done}}/{{count}} bài',
  /** Short day marker in the lesson circle ("N3" = Ngày 3) */
  dayShort: 'N{{day}}',
  inProgress: 'Đang học',
  next: 'Tiếp theo',
  best: 'Cao nhất {{pct}}%',
  unlockHint: 'Hoàn thành Ngày {{day}} để mở khóa',
  comingSoon: 'Sắp có',
  planned: 'Bài học dự kiến (chưa mở trong bản MVP)',
  plannedDay: 'Ngày {{day}}:',
  /** Page title. {{name}} = course name */
  title: 'Lộ trình học {{name}}',
  frameworkNote: 'Lộ trình được sắp xếp theo trình độ tăng dần cho người mới bắt đầu, theo khung {{framework}}. Cấp độ ghi ở mỗi giai đoạn chỉ mang tính định hướng: nội dung chưa được đối chiếu chính thức với giáo trình/kỳ thi {{framework}}.',
};

export default path;

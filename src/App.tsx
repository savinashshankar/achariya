import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import MyCourses from './pages/student/MyCourses';
import MyTasks from './pages/student/MyTasks';
import MyProgress from './pages/student/MyProgress';
import MyClasses from './pages/teacher/MyClasses';
import LessonPlanTracker from './pages/teacher/LessonPlanTracker';
import EvidenceUpload from './pages/teacher/EvidenceUpload';
import CourseProgress from './pages/teacher/CourseProgress';
import Dashboard from './pages/admin/Dashboard';
import CourseOverview from './pages/admin/CourseOverview';
import AtRiskStudents from './pages/admin/AtRiskStudents';
import TeacherCoverage from './pages/admin/TeacherCoverage';
import Layout from './components/Layout';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />

                {/* Student Routes */}
                <Route element={<Layout role="student" />}>
                    <Route path="/student/courses" element={<MyCourses />} />
                    <Route path="/student/tasks" element={<MyTasks />} />
                    <Route path="/student/progress" element={<MyProgress />} />
                </Route>

                {/* Teacher Routes */}
                <Route element={<Layout role="teacher" />}>
                    <Route path="/teacher/classes" element={<MyClasses />} />
                    <Route path="/teacher/lesson-plans" element={<LessonPlanTracker />} />
                    <Route path="/teacher/evidence" element={<EvidenceUpload />} />
                    <Route path="/teacher/progress" element={<CourseProgress />} />
                </Route>

                {/* Admin Routes */}
                <Route element={<Layout role="admin" />}>
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/admin/courses" element={<CourseOverview />} />
                    <Route path="/admin/at-risk" element={<AtRiskStudents />} />
                    <Route path="/admin/coverage" element={<TeacherCoverage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;

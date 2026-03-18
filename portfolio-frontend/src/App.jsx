import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";

import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ProjectManagement from "./pages/admin/ProjectManagement";
import BlogManagement from "./pages/admin/BlogManagement";
import SkillManagement from "./pages/admin/SkillManagement";
import ExperienceManagement from "./pages/admin/ExperienceManagement";
import EducationManagement from "./pages/admin/EducationManagement";
import ProfileManagement from "./pages/admin/ProfileManagement";
import ContactManagement from "./pages/admin/ContactManagement";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// A simple wrapper to conditional render header/footer
const MainLayout = ({ children }) => {
  const location = window.location.pathname;
  const isAdmin = location.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <ThemeProvider>
          <BrowserRouter>
            <MainLayout>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/contact" element={<Contact />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="projects" element={<ProjectManagement />} />
                  <Route path="blog" element={<BlogManagement />} />
                  <Route path="skills" element={<SkillManagement />} />
                  <Route path="experience" element={<ExperienceManagement />} />
                  <Route path="education" element={<EducationManagement />} />
                  <Route path="profile" element={<ProfileManagement />} />
                  <Route path="contacts" element={<ContactManagement />} />
                </Route>
              </Routes>
            </MainLayout>
            <ToastContainer position="top-right" autoClose={3000} />
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;

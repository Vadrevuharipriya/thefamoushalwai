import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage/HomePage';
import OccasionPage from '../pages/OccasionPage/OccasionPage';
import MenuPage from '../pages/MenuPage/MenuPage';
import AboutPage from '../pages/AboutPage/AboutPage';
import EnquiryPage from '../pages/EnquiryPage/EnquiryPage';
import TestimonialsPage from '../pages/TestimonialsPage/TestimonialsPage';
import PartnerPage from '../pages/PartnerPage/PartnerPage';
import PartnerRegisterPage from '../pages/PartnerRegisterPage/PartnerRegisterPage';
import PackagesPage from '../pages/PackagesPage/PackagesPage';
import CloudKitchenPage from '../pages/CloudKitchenPage/CloudKitchenPage';
import BhajiPage from '../pages/BhajiPage/BhajiPage';
import VenuePage from '../pages/VenuePage/VenuePage';
import ChutneysPage from '../pages/ChutneysPage/ChutneysPage';
import PicklePage from '../pages/PicklePage/PicklePage';
import TiffinPage from '../pages/TiffinPage/TiffinPage';
import CityPage from '../pages/CityPage/CityPage';
import ProfessionalsPage from '../pages/ProfessionalsPage/ProfessionalsPage';
import ChefDetailPage from '../pages/ChefDetailPage/ChefDetailPage';
import ViewMenuCartPage from '../pages/ViewMenuCartPage/ViewMenuCartPage';
import BlogPage from '../pages/BlogPage/BlogPage';
import BlogDetailPage from '../pages/BlogDetailPage/BlogDetailPage';

// Admin pages
import AdminLayout from '../components/AdminLayout/AdminLayout';
import AdminLoginPage from '../pages/AdminDashboard/AdminLoginPage';
import AdminDashboard from '../pages/AdminDashboard/AdminDashboard';
import AdminPanelUsersPage from '../pages/AdminDashboard/AdminPanelUsersPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/"                      element={<HomePage />} />
      <Route path="/our-menu"              element={<MenuPage />} />
      <Route path="/about"                 element={<AboutPage />} />
      <Route path="/services/:occasion"    element={<OccasionPage />} />
      <Route path="/enquiry"               element={<EnquiryPage />} />
      <Route path="/partner"               element={<PartnerPage />} />
      <Route path="/partner/register"      element={<PartnerRegisterPage />} />
      <Route path="/our-packages"          element={<PackagesPage />} />
      <Route path="/cloud-kitchen"         element={<CloudKitchenPage />} />
      <Route path="/bhaji"                 element={<BhajiPage />} />
      <Route path="/venue"                 element={<VenuePage />} />
      <Route path="/chutney-services"      element={<ChutneysPage />} />
      <Route path="/pickle-achhar"         element={<PicklePage />} />
      <Route path="/tiffin-services"       element={<TiffinPage />} />
      <Route path="/city/:slug"            element={<CityPage />} />
      <Route path="/professionals"         element={<ProfessionalsPage />} />
      <Route path="/professionals/:slug"   element={<ChefDetailPage />} />
      <Route path="/testimonials"        element={<TestimonialsPage />} />
      <Route path="/view-menu-cart"    element={<ViewMenuCartPage />} />
      <Route path="/blog"              element={<BlogPage />} />
      <Route path="/blog/:slug"        element={<BlogDetailPage />} />

      {/* Admin routes */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="panel-user" element={<AdminPanelUsersPage />} />
        <Route path="settings" element={<div className="admin-placeholder">Settings page coming soon</div>} />
      </Route>
    </Routes>
  );
}

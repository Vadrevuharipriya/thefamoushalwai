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

export default function AppRoutes() {
  return (
    <Routes>
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
    </Routes>
  );
}

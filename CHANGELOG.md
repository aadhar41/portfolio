# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Complete Tailwind CSS redesign for the personal developer portfolio.
- Redesigned Admin Panel with modern dashboard, statistics cards, and quick actions.
- Shared `Pagination` component in Admin with numbered page navigation.
- Topbar user dropdown menu in Admin with profile, dashboard, and logout links.
- Collapsible message cards for Contact Management.
- Glassmorphic login page for Admin.
- Progress indicator / Loading Overlay for admin actions.
- Support for `FullPage` loader on the frontend.

### Changed

- Migrated frontend from vanilla CSS to Tailwind CSS.
- Updated all management pages (Projects, Blogs, Skills, Experience, Education) to use Tailwind.
- Improved sidebar navigation behavior (sticky on desktop, overlay on mobile).
- Enhanced SEO with dynamic meta tags for projects and blogs.

### Fixed

- Admin sidebar overflow issue on smaller screens.
- API resolution for file uploads.
- Smooth scroll behavior for footer quick links.
- Sidebar logout button clipping on long pages.

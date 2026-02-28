# Portfolio — Full Stack Application

A full-stack personal portfolio application built with a **Laravel 12 REST API** backend and a **React** frontend (coming soon).

---

## Project Structure

```
portfolio/
├── portfolio-backend/      # Laravel 12 REST API
├── portfolio-frontend/     # React frontend (coming soon)
├── documentation/          # Project documentation
├── .gitignore
└── README.md
```

---

## Tech Stack

### Backend (`portfolio-backend`)
| Layer | Technology |
|---|---|
| Framework | Laravel 12 |
| Language | PHP 8.2+ |
| Auth | Laravel Sanctum |
| Image Processing | Intervention Image 3 |
| Cache / Queue | Redis (Predis) |
| Testing | PHPUnit 11 |
| Dev Tools | Laravel Telescope, Pail, Pint, Sail |

### Frontend (`portfolio-frontend`)
> Coming soon — React-based SPA

---

## Database Schema

### `profiles`
Stores personal/professional profile information.

### `skills`
| Column | Type | Notes |
|---|---|---|
| name | string | Skill name |
| category | string | `frontend` \| `backend` \| `database` \| `tools` |
| level | integer | Proficiency 1–100 (default: 80) |
| sort_order | integer | Display ordering |

### `experiences`
| Column | Type | Notes |
|---|---|---|
| company | string | Employer name |
| position | string | Job title |
| description | text | Role description |
| start_date | string | Start date |
| end_date | string | nullable — end date |
| is_current | boolean | Currently working here |
| technologies | json | nullable — tech used |

### `educations`
| Column | Type | Notes |
|---|---|---|
| institution | string | School/University |
| degree | string | Degree title |
| field_of_study | string | Major/Specialization |
| start_year | string | Start year |
| end_year | string | nullable |
| grade | string | nullable — GPA/grade |

### `projects`
| Column | Type | Notes |
|---|---|---|
| title | string | Project name |
| description | text | Short description |
| long_description | longText | nullable — detailed write-up |
| image | string | nullable — cover image path |
| live_url | string | nullable — deployed URL |
| github_url | string | nullable — repository URL |
| technologies | json | Tech stack used |
| category | string | `web` \| `mobile` \| `api` |
| featured | boolean | Highlight on homepage |
| sort_order | integer | Display ordering |

### `blogs`
| Column | Type | Notes |
|---|---|---|
| title | string | Post title |
| slug | string | unique — URL-friendly key |
| excerpt | text | Short preview |
| content | longText | Full post content |
| cover_image | string | nullable |
| tags | json | nullable |
| status | enum | `draft` \| `published` |
| published_at | timestamp | nullable |
| read_time | integer | Estimated minutes (default: 5) |

### `contacts`
| Column | Type | Notes |
|---|---|---|
| name | string | Sender name |
| email | string | Sender email |
| subject | string | nullable |
| message | text | Message body |
| is_read | boolean | Read status (default: false) |

### `settings`
Global application settings as key–value pairs.

---

## Getting Started

### Prerequisites
- PHP 8.2+
- Composer
- Node.js & npm
- MySQL / PostgreSQL
- Redis

### Backend Setup

```bash
cd portfolio-backend

# Install dependencies
composer install

# Copy and configure environment
cp .env.example .env
php artisan key:generate

# Configure your DB credentials in .env, then run migrations
php artisan migrate

# Install frontend assets
npm install && npm run build
```

### Running Locally

```bash
cd portfolio-backend

# Start all services (server + queue + logs + vite)
composer run dev
```

The API will be available at `http://localhost:8000`.

### Running Tests

```bash
cd portfolio-backend
composer run test
```

---

## API Authentication

This project uses **Laravel Sanctum** for token-based API authentication.

---

## License

This project is open-sourced under the [MIT license](https://opensource.org/licenses/MIT).

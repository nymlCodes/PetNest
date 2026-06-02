# 🐾 Pet Adoption Platform

## Purpose
A full-stack Pet Adoption Platform built with the MERN Stack. The system allows users to explore pets available for adoption (dogs, cats, birds, rabbits, etc.), view detailed pet profiles, and submit adoption requests. Pet owners and shelters can manage listings, approve or reject adoption requests, and handle the full adoption workflow — all backed by secure authentication and a REST API.

---

## 🌐 Live URL
[https://your-live-site-url.vercel.app](https://assignment-9-ten-gules.vercel.app/)

---

## ✨ Features

- **Browse All Pets** — Publicly accessible page showing all available pets with search by name, filter by species, and sorting using MongoDB `$regex` and `$in` operators.
- **Detailed Pet Profiles** — Each pet has a full details page showing breed, age, gender, health status, vaccination status, location, adoption fee, and description.
- **Adoption Requests** — Authenticated users can submit adoption requests with a pickup date and message; default status is "Pending" and updates to Approved or Rejected by the owner.
- **Owner Dashboard** — Pet owners can add new pet listings, update or delete existing ones, and manage all incoming adoption requests through a dedicated modal — including approving or rejecting them.
- **JWT Authentication** — Token-based authentication with JWT stored in HTTPOnly cookies, protected private routes, and Google login support alongside email/password registration.
- **Adoption Control** — Pet owners cannot adopt their own pets; once a request is approved, the pet is marked as adopted and no further requests are accepted.
- **My Requests Page** — Authenticated users can track all their submitted adoption requests, view their status (Pending / Approved / Rejected), and cancel any pending request.
- **Responsive Design** — Fully responsive across mobile, tablet, and desktop with toast notifications for all user actions.

---

## 📦 NPM Packages Used

### Client
| Package | Purpose |
|---|---|
| `Next js` | UI library |
| `better auth` | Google OAuth authentication |
| `react-hot-toast` | Toast/UI-based notifications |
| `react-hook-form` | Form handling and validation |
| `tailwindcss` | Utility-first CSS styling |
| `react-icons` | Icon components |
| `swiper` | Hero banner slider |
| `framer-motion` | Page and component animations |

### Server
| Package | Purpose |
|---|---|
| `express` | Web server framework |
| `mongodb` | MongoDB native driver |
| `jsonwebtoken` | JWT token generation and verification |
| `cors` | Cross-Origin Resource Sharing config |
| `dotenv` | Securing environment variables |

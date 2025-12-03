# SlideLink

A modern, minimal platform for managing and sharing class presentation slides. Built for academic environments with a focus on simplicity, security, and real-time collaboration.

---

## 🚀 Features

- **Create Slide Collections**: Instantly set up password-protected collections for any class or section.
- **Join Collections**: Students and instructors can join collections with a simple password—no registration required.
- **Live Submissions**: Real-time updates as teams submit their slides.
- **Auto Cleanup**: Collections automatically delete after 24 hours to keep things organized.
- **QR Code Sharing**: Instantly generate and share QR codes for easy access.
- **Dashboard Analytics**: View platform statistics—total collections, submissions, and active collections.
- **Recent Collections**: Explore active and recent collections across all departments.
- **Contact & Support**: Built-in support and contact options for help and feedback.
- **Minimal UI/UX**: Clean, dark-themed interface with glass morphism, smooth gradients, and DM Sans font.

---

## 🛠️ Tech Stack

**Frontend:**
- Next.js 15
- React 19
- Tailwind CSS 4
- Lucide React Icons
- DM Sans font

**Backend:**
- Node.js
- Express.js 4
- MongoDB 6

**Other:**
- RESTful API
- Environment variables for backend URL
- QR code generation via external API

---

## 📦 Project Structure

```
slidelink-backend/
  db.js
  package.json
  server.js
  controllers/
    collectionController.js
  routes/
    collectionRoutes.js
slidelink-frontend/
  components.json
  eslint.config.mjs
  jsconfig.json
  next.config.mjs
  package.json
  postcss.config.mjs
  README.md
  public/
  src/
    app/
      globals.css
      layout.js
      page.js
      collections/
        [username]/
          page.js
      contact/
        page.js
      create/
        page.js
      join/
        page.js
    components/
      CollectionPage/
        authentication-form.js
        collection-header.js
        collection-page.js
        loading-spinner.js
        submissions-list.js
        submit-form.js
        tab-navigation.js
      CreateCollection/
        create-form.js
        loading-spinner.js
        success-view.js
      HomePage/
        Contact.js
        dashboard.js
        Feature.js
        Footer.js
        Hero.js
        Navbar.js
        recent-collection.js
    hooks/
      use-animated-number.js
    lib/
      notifications.js
      utils.js
```

---

## 📝 How It Works

1. **Create a Collection**: Instructor sets up a new collection for a class, specifying section, course code, semester, department, team count, and password.
2. **Share Access**: Share the collection link or QR code with students.
3. **Join & Submit**: Students join the collection using the password and submit their slides.
4. **View Submissions**: Instructor and students can view all submissions in real time.
5. **Auto Cleanup**: Collections and submissions are automatically deleted after 24 hours.

---

## 🌐 Setup & Run

**Backend:**
```bash
cd slidelink-backend
npm install
npm start
```

**Frontend:**
```bash
cd slidelink-frontend
npm install
npm run dev
```

Set `NEXT_PUBLIC_BACKEND_URL` in `.env` for frontend to connect to backend.

---

## 📄 License

MIT

---

## ✨ Credits

Developed by KhandakerSamin and contributors.

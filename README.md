# AIO Productivity Tracker

AIO Productivity Tracker (Productiv) — a lightweight React + Redux productivity app with tasks, habits, day review, and gamified health/level features.

This repository contains a small app built with Vite and React. Features added:

- Dark / Light theme toggle
- Export / Import full app state (JSON)
- Browser notifications (Notification API)
- Basic client-side authentication (Redux-managed)
- Recurring tasks (simple repeat field)
- Statistics panel and health bar

Getting started

```bash
# install dependencies
npm install

# start dev server
npm run dev
```

Pushing to GitHub

You can create a new GitHub repository and push this project. Example using the GitHub CLI:

```bash
# from project root
gh repo create YOUR_USERNAME/AIO-productivity-tracker --public --source=. --remote=origin --push
```

Or manually create an empty repo on GitHub and then run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/AIO-productivity-tracker.git
git branch -M main
git push -u origin main
```

Notes

- Authentication is currently client-side only. For secure multi-device sync, integrate Firebase/Auth0 or a custom backend.
- Recurrence logic is minimal; can be extended to handle due dates and scheduled reminders.

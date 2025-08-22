# TS Securitys ChatIA - Backend Server

This directory contains the backend server for the ChatIA application. Its primary purpose is to securely handle sending notifications to Telegram when a new quote is generated, solving the browser's CORS (Cross-Origin Resource Sharing) security limitations.

## Why a Backend is Necessary

Browsers block web pages from making direct requests to external APIs (like Telegram's) for security reasons. This backend acts as a trusted intermediary:

1.  The **Frontend** (your chat widget) sends the quote data to this **Backend**.
2.  The **Backend** securely sends the notification to the **Telegram API**.
3.  This also keeps your secret API keys (like the Telegram Bot Token) safe on the server, instead of exposing them in the frontend code.

---

## 🚀 Quick Start Guide

Follow these steps to get the backend running and start receiving Telegram notifications.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or later recommended) installed on your system.

### Step 1: Install Dependencies

Open your terminal, navigate to the project's root directory (where this `README.md` file is), and run the following command to install the required packages:

```bash
npm install
```

### Step 2: Configure Environment Variables

1.  Find the file named `.env.example` in the project directory.
2.  Make a copy of this file and rename the copy to `.env`.
3.  Open the new `.env` file and fill in your actual API keys and your Telegram Chat ID. The file includes detailed instructions for each variable.

**Important:** The `TELEGRAM_CHAT_ID` is the most common point of failure. Follow the instructions in the `.env` file carefully to get the correct ID.

### Step 3: Run the Server

Once your `.env` file is configured, start the backend server with this command:

```bash
npm start
```

If everything is set up correctly, you will see a confirmation message in your terminal:

```
✅ Backend server running on http://localhost:3001
Waiting for quote notifications from the frontend...
```

**That's it!** The backend is now running. Keep this terminal window open. When you generate a quote in the chat application, you should now receive a notification in your Telegram chat.

# 🤖 Labubu AI Workspace

Labubu is a high-fidelity, advanced AI Agent Workspace built with the latest `@lobehub/ui` components. It features a premium chat interface, a sophisticated local session management system, and a robust Go backend integration.

## ✨ Features

- **Advanced UI**: Premium LobeChat visual style using `@lobehub/ui`.
- **Sophisticated Input**: Feature-rich input area with action bars, file upload placeholders, and expanded modes.
- **Dynamic Messaging**: High-end bubble layouts, user/assistant avatars, and smooth interactions.
- **Session Management**: Full conversation history kept in local state with search and premium profiles.
- **Go Backend**: Integrated with a Go-based echo server for high-performance API handling.
- **Light Mode Optimized**: Designed for clarity and a professional look.

---

## 🚀 Local Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Go](https://golang.org/) (v1.20+)
- `npm` or `pnpm`

### Step 1: Clone and Setup Frontend
```bash
# Clone the repository (if separate)
# cd labubu

# Install dependencies
npm install
```

### Step 2: Setup Go Backend
```bash
cd backend
# No extra dependencies needed for the echo server
```

---

## 🛠 Running the Project

### Terminal 1: Go Backend
```bash
cd labubu/backend
go run main.go
```
The backend will start at `http://localhost:8080`.

### Terminal 2: Vite Frontend
```bash
cd labubu
npm run dev
```
Open **`http://localhost:5173`** to see your workspace in action.

---

## 🔄 Keeping Up-to-Date (Upstream Sync)

One of the key benefits of Labubu is its use of `@lobehub/ui`. To keep your project updated with the main LobeChat ecosystem without disrupting your local customizations, follow these strategies:

### 1. Update UI Components
We use `@lobehub/ui` as an npm dependency. To get the latest UI fixes and features:
```bash
npm update @lobehub/ui @lobehub/icons
```
Since your components are custom-built wrappers around these library items, you benefit from internal library updates (styling fixes, accessibility) while keeping your high-level layout (`LeftRail`, `TopHeader`) intact.

### 2. Manual Component Sync
If the main LobeHub repo introduces a new advanced component (like a new `ChatInputArea` sub-component):
1. Locate the source in the main `lobehub/src/features` directory.
2. Copy the relevant logic/styling patterns into your `src/components` files.
3. Because your components are decoupled from the main app's routing/DB logic, this sync is a simple "copy-paste-refine" process.

### 3. Dependency Shielding
We use a separate `package.json` for Labubu. This ensures that breaking changes in the main LobeHub monorepo's internal packages (like `@lobechat/database` or `@lobechat/agent-runtime`) **do not affect** Labubu, as we only depend on the stable, published UI packages.

---

## 📁 Project Structure

```text
labubu/
├── src/
│   ├── components/
│   │   ├── layout/        # LeftRail, SessionList, TopHeader
│   │   ├── chat/          # MessageList, InputArea
│   │   └── shared/        # ModelSelector
│   ├── hooks/             # useChat (API logic), useSessions (Local state)
│   ├── types/             # Shared TypeScript definitions
│   ├── data/              # Model configurations
│   ├── App.tsx            # Application entry & Layout assembly
│   └── main.tsx           # React bootstrap
├── backend/
│   └── main.go            # Go Echo API Server
└── vite.config.ts         # Dev Proxy Configuration
```

---

## 📝 Configuration
- **Backend URL**: Controlled via `.env.local` (`VITE_BACKEND_URL`).
- **Proxy**: Vite is pre-configured to proxy `/api` requests to the Go backend on port `8080` to avoid CORS issues.

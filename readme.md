# Speecher UI

[![React][React.js]][React-url]<br>
A React-based frontend for the Speecher application.

![SpeecherUI-Screenshot](https://a4mmc7pg4m.ufs.sh/f/ceoH2hzLMEl0zKb954HsjGw4SrdhmEglIkQPcAuLv7RBFpqW)


## Features

- YouTube video URL processing
- Real-time transcription updates
- Custom prompt input for specific extraction requirements
- Cyberpunk-themed UI with glitch effects
- Real-time event logging and status updates
- Copy and save functionality for extracted text
- WebSocket integration for live updates

## Tech Stack

- React 18.3
- Vite 5.4
- WebSocket (react-use-websocket)
- Custom CSS with cyberpunk styling

## Prerequisites

- Node.js (Latest LTS version recommended)
- npm or yarn package manager
- Backend service running (separate repository)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/speecher-ui.git
cd speecher-ui
```

2. Install dependencies:
```bash
npm install
```


3. Create a `.env` file in the root directory with the following variables:
```env
VITE_API_URL=your_api_url
VITE_BACKEND_HOST=localhost
VITE_BACKEND_PORT=8000
```

4. Run the development server:
```bash
npm run dev
```
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
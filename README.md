# Guardian AI - Base MiniApp

Your AI-powered safety net, always vigilant. Guardian AI is a Base MiniApp that uses artificial intelligence to detect health emergencies and automatically alert pre-set contacts.

## Features

### 🤖 AI Fall Detection & Alerting
- Utilizes device sensors and AI algorithms to detect sudden falls
- Triggers automated alert sequence to pre-defined emergency contacts
- Reduces response time when users cannot self-alert

### 🚨 Sudden Incapacitation Monitoring
- Continuously monitors subtle changes in user activity patterns
- Detects potential loss of consciousness or severe distress
- Provides silent protection against unforeseen medical events

### 📱 Manual Emergency Contact Trigger
- Prominent, one-tap emergency button within the MiniApp
- Quick and accessible way to request help in any situation
- Works even when AI detection is not triggered

### 👥 Customizable Emergency Contacts & Messages
- Add, remove, and prioritize emergency contacts
- Customize alert message content
- Support for SMS, WhatsApp, and Farcaster notifications

## Technology Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via MiniKit)
- **UI Components**: OnchainKit
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **TypeScript**: Full type safety

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MiniKit API key
- OnchainKit API key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/guardian-ai-miniapp.git
cd guardian-ai-miniapp
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your API keys:
```env
NEXT_PUBLIC_MINIKIT_API_KEY=your_minikit_api_key_here
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Setting Up Emergency Contacts

1. Navigate to the "Contacts" tab
2. Click "Add Contact" to add emergency contacts
3. Enter contact name, phone number, and preferred notification method
4. Save the contact

### Enabling Monitoring

1. Go to the "Dashboard" tab
2. Toggle the monitoring switch to "Active"
3. Grant necessary permissions for device sensors
4. The app will now monitor for falls and health emergencies

### Manual Emergency Alert

1. Tap the large red "EMERGENCY" button on the dashboard
2. Confirm the alert when prompted
3. All emergency contacts will be notified immediately

## Subscription Tiers

### Free Tier
- Basic fall detection
- Manual emergency alerts
- Up to 3 emergency contacts
- SMS notifications

### Premium Tier ($5/month)
- Advanced AI health monitoring
- Incapacitation detection
- Unlimited emergency contacts
- Custom alert messages
- Multiple notification methods
- Priority support

## Development

### Project Structure

```
├── app/                    # Next.js App Router pages
├── components/            # React components
├── lib/                   # Utilities and services
│   ├── types.ts          # TypeScript type definitions
│   ├── store.ts          # Zustand state management
│   ├── fallDetection.ts  # Fall detection service
│   ├── utils.ts          # Utility functions
│   └── constants.ts      # App constants
├── public/               # Static assets
└── README.md
```

### Key Components

- **AppShell**: Main app layout wrapper
- **EmergencyButton**: Large emergency alert trigger
- **HealthStatus**: Monitoring status dashboard
- **ContactManager**: Emergency contact management
- **AlertHistory**: Alert history and status
- **SubscriptionTier**: Subscription management

### Services

- **FallDetectionService**: Handles device sensor monitoring and fall detection
- **GuardianStore**: Zustand store for app state management

## Deployment

### Base MiniApp Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy to your preferred hosting platform (Vercel, Netlify, etc.)

3. Configure your MiniApp manifest for Base App discovery

4. Submit for review in the Base App ecosystem

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@guardian-ai.app or join our community Discord.

## Disclaimer

Guardian AI is designed to assist in emergency situations but should not be relied upon as the sole means of emergency communication. Always ensure you have multiple ways to contact emergency services and loved ones.

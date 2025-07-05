# 🏢 SplitBill - Enterprise Restaurant Management Platform

[![React Native](https://img.shields.io/badge/React%20Native-0.79.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-53.0.17-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue.svg)](https://www.typescriptlang.org/)
[![NativeBase](https://img.shields.io/badge/NativeBase-3.0.0-purple.svg)](https://nativebase.io/)
[![Zustand](https://img.shields.io/badge/Zustand-4.0.0-orange.svg)](https://zustand-demo.pmnd.rs/)
[![License](https://img.shields.io/badge/License-Proprietary-red.svg)](LICENSE)

> **SplitBill** is an enterprise-grade restaurant management application designed to revolutionize the dining experience through intelligent QR-based ordering, seamless payment processing, and real-time order tracking.

**© 2025 Batuhan Salkım. All rights reserved.**  
This project has been completely developed and coded by Batuhan Salkım.  
All code, design, and intellectual property rights belong 100% to Batuhan Salkım.

## 🎯 Overview

SplitBill addresses the common challenges faced by restaurants and customers during group dining experiences:

- **Eliminates Order Confusion**: Each customer manages their own order independently
- **Streamlines Payment Process**: Individual payments reduce checkout time by 80%
- **Enhances Customer Experience**: Real-time order tracking and status updates
- **Improves Restaurant Efficiency**: Reduces staff workload and order errors

## ✨ Key Features

### 🎫 QR Code Integration
- **Instant Table Connection**: Scan QR codes to connect to specific tables
- **Manual Code Entry**: Alternative connection method for accessibility
- **Secure Validation**: QR code verification and validation

### 📱 Smart Menu System
- **Category-based Navigation**: Organized product categories with icons
- **Real-time Search**: Instant product search and filtering
- **Product Details**: Comprehensive product information and pricing
- **Stock Management**: Real-time availability status

### 🛒 Intelligent Cart Management
- **Individual Cart**: Each user maintains their own cart
- **Quantity Controls**: Easy quantity adjustment and removal
- **Custom Notes**: Special instructions for each item
- **Real-time Totals**: Automatic price calculations

### 💳 Seamless Payment Processing
- **Multiple Payment Methods**: Credit card, mobile payment, cash
- **Coupon Integration**: Discount code application
- **Secure Processing**: PCI-compliant payment handling
- **Split Payment Support**: Group bill splitting capabilities

### 📊 Real-time Order Tracking
- **Live Status Updates**: Order preparation progress
- **Estimated Times**: Accurate delivery time estimates
- **Status Notifications**: Real-time order status changes
- **Order History**: Complete order tracking and history

## 🏗️ Architecture

### Technology Stack
- **Frontend**: React Native with Expo
- **UI Framework**: NativeBase for enterprise-grade components
- **State Management**: Zustand for lightweight state management
- **Navigation**: Expo Router for file-based routing
- **Language**: TypeScript for type safety
- **Storage**: AsyncStorage for local data persistence

### Design Patterns
- **Feature-based Architecture**: Organized by business features
- **Component Composition**: Reusable and composable components
- **Unidirectional Data Flow**: Predictable state management
- **Layered Architecture**: Clear separation of concerns

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/splitbill.git
   cd splitbill
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Run on device/simulator**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   
   # Web
   npm run web
   ```

### Environment Setup

Create a `.env` file in the root directory:

```env
# API Configuration
API_BASE_URL=https://api.splitbill.com
API_TIMEOUT=30000

# Payment Configuration
PAYMENT_GATEWAY=stripe
STRIPE_PUBLISHABLE_KEY=pk_test_...

# Analytics Configuration
ANALYTICS_ENABLED=true
FIREBASE_PROJECT_ID=splitbill-prod

# Feature Flags
QR_SCANNING_ENABLED=true
PAYMENT_PROCESSING_ENABLED=true
REAL_TIME_TRACKING_ENABLED=true
```

## 📁 Project Structure

```
splitbill/
├── 📱 app/                    # Expo Router screens
├── 🎨 components/             # Reusable UI components
│   ├── 🧩 common/            # Shared components
│   ├── 🎯 features/          # Feature-specific components
│   └── 📱 screens/           # Screen components
├── 🏪 stores/                # State management
│   ├── 📊 slices/            # Zustand store slices
│   └── 🔧 middleware/        # Store middleware
├── 🎨 themes/                # Design system
├── 🛠️ utils/                 # Utility functions
│   ├── 📊 helpers/           # Helper functions
│   ├── 🔐 validators/        # Form validation
│   └── 📱 hooks/             # Custom React hooks
├── 📊 types/                 # TypeScript definitions
├── 🗄️ data/                  # Data layer
│   ├── 📋 models/            # Data models
│   ├── 🔌 services/          # API services
│   └── 📦 mock/              # Mock data
├── 🔧 config/                # Configuration
├── 📚 docs/                  # Documentation
├── 🧪 tests/                 # Test files
└── 📦 assets/                # Static assets
```

## 🧪 Testing

### Running Tests
```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Test coverage
npm run test:coverage
```

### Test Structure
- **Unit Tests**: Individual component and function testing
- **Integration Tests**: Component interaction testing
- **E2E Tests**: Full user journey testing
- **Performance Tests**: Load and stress testing

## 📦 Building for Production

### iOS Build
```bash
# Build for iOS
expo build:ios

# Build for App Store
expo build:ios --release-channel production
```

### Android Build
```bash
# Build for Android
expo build:android

# Build for Play Store
expo build:android --release-channel production
```

### Web Build
```bash
# Build for web
expo build:web
```

## 🔧 Configuration

### App Configuration
The application can be configured through the `app.json` file:

```json
{
  "expo": {
    "name": "SplitBill",
    "slug": "splitbill",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.splitbill.app"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      },
      "package": "com.splitbill.app"
    },
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}
```

## 📊 Analytics and Monitoring

### Analytics Integration
- **User Behavior Tracking**: Monitor user interactions and flows
- **Performance Metrics**: Track app performance and load times
- **Error Tracking**: Capture and analyze application errors
- **Business Metrics**: Monitor key business indicators

### Monitoring Tools
- **Firebase Analytics**: User behavior and performance tracking
- **Sentry**: Error monitoring and crash reporting
- **Performance Monitoring**: Real-time performance metrics

## 🔐 Security

### Security Measures
- **Input Validation**: Comprehensive input sanitization
- **Data Encryption**: Sensitive data encryption in storage
- **QR Code Validation**: Secure QR code processing
- **Payment Security**: PCI-compliant payment handling
- **Session Management**: Secure user session handling

### Authentication (Future)
- **JWT Tokens**: Secure authentication token system
- **Refresh Tokens**: Automatic token renewal
- **Role-based Access**: Granular permission system
- **Multi-factor Authentication**: Enhanced security measures

## 🤝 Contributing

**This is proprietary software. No contributions are accepted from the community.**

This project is the exclusive property of Batuhan Salkım. All development, modifications, and improvements are handled internally by the copyright holder.

### Development Information
- **TypeScript**: All code is written in TypeScript
- **ESLint**: Code follows strict ESLint validation
- **Prettier**: Code is formatted with Prettier
- **Tests**: Comprehensive testing is implemented

### Collaboration
For collaboration opportunities, licensing inquiries, or custom development requests, please contact:
- **Email**: [Contact information to be added]
- **GitHub**: [GitHub profile to be added]
- **LinkedIn**: [LinkedIn profile to be added]

## 📄 License

**PROPRIETARY SOFTWARE - ALL RIGHTS RESERVED**

**Copyright (c) 2025 Batuhan Salkım. All rights reserved.**

This project (SplitBill) is the original work of the author and subject to copyright protection.
First published on: July 5, 2025

This project has been completely developed and coded by Batuhan Salkım.
All code, design, and intellectual property rights belong 100% to Batuhan Salkım.

### ⚠️ IMPORTANT: UNAUTHORIZED USE IS STRICTLY PROHIBITED

**This software is proprietary and confidential. Unauthorized use, copying, distribution, modification, or reproduction of this software is strictly prohibited without express written permission from the copyright holder.**

### License Terms
- **Proprietary Software**: All rights reserved, no open source license
- **Copyright Protection**: All rights reserved to Batuhan Salkım
- **Original Work**: This is the author's original creation
- **Unauthorized Use Prohibited**: Any use without permission is illegal
- **Commercial Use**: Strictly prohibited without licensing
- **Educational Use**: Strictly prohibited without licensing
- **Personal Use**: Strictly prohibited without licensing

### Commercial Licensing
For licensing inquiries and commercial use, please contact:
- **Email**: [Contact information to be added]
- **GitHub**: [GitHub profile to be added]
- **LinkedIn**: [LinkedIn profile to be added]

### Available Packages

| Package | Price | Features |
|---------|-------|----------|
| **Starter** | $1,500 | Basic features, 1 restaurant, email support |
| **Professional** | $3,500 | Full features, 5 restaurants, priority support |
| **Enterprise** | $10,000+ | Custom development, unlimited restaurants, 24/7 support |

### What's Included
- ✅ Complete source code
- ✅ Installation guide
- ✅ Technical documentation
- ✅ Customization support
- ✅ Training materials
- ✅ 1 year of updates

### Legal Notice
This software is protected by copyright laws and international treaties. Unauthorized reproduction or distribution of this software, or any portion of it, may result in severe civil and criminal penalties, and will be prosecuted to the maximum extent possible under the law.

## 🆘 Support

### Documentation
- [Architecture Guide](docs/ARCHITECTURE.md)
- [API Documentation](docs/API.md)
- [Component Library](docs/COMPONENTS.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

### Getting Help
- **Issues**: [GitHub Issues](https://github.com/your-org/splitbill/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/splitbill/discussions)
- **Email**: support@splitbill.com

### Community
- **Discord**: [SplitBill Community](https://discord.gg/splitbill)
- **Twitter**: [@SplitBillApp](https://twitter.com/SplitBillApp)
- **Blog**: [SplitBill Blog](https://blog.splitbill.com)

## 🙏 Acknowledgments

- **React Native Team**: For the amazing cross-platform framework
- **Expo Team**: For the excellent development platform
- **NativeBase Team**: For the enterprise UI component library
- **Zustand Team**: For the lightweight state management solution

---

**SplitBill** - Revolutionizing the restaurant experience, one table at a time. 🍽️✨

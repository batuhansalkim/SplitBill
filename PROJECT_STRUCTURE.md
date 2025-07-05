# 🏢 SplitBill Enterprise Project Structure

## 📋 Overview

SplitBill follows an enterprise-level project structure designed for scalability, maintainability, and team collaboration. This structure supports a 10-person development team with clear separation of concerns and modular architecture.

## 🏗️ Directory Structure

```
splitbill/
├── 📱 app/                          # Expo Router screens
│   ├── _layout.tsx                  # Root layout with providers
│   ├── (tabs)/                      # Tab-based navigation
│   │   ├── _layout.tsx              # Tab layout
│   │   ├── index.tsx                # Home screen
│   │   └── explore.tsx              # Explore screen
│   ├── menu.tsx                     # Menu screen
│   ├── cart.tsx                     # Cart screen
│   ├── payment.tsx                  # Payment screen
│   ├── order-tracking.tsx           # Order tracking screen
│   └── +not-found.tsx               # 404 screen
│
├── 🎨 components/                   # Reusable UI components
│   ├── 🧩 common/                   # Shared components
│   │   ├── Button/                  # Button components
│   │   │   ├── SplitButton.tsx      # Main button component
│   │   │   └── index.ts             # Button exports
│   │   ├── Input/                   # Input components
│   │   ├── Modal/                   # Modal components
│   │   ├── Loading/                 # Loading components
│   │   └── ErrorBoundary/           # Error handling
│   │
│   ├── 🎯 features/                 # Feature-specific components
│   │   ├── Menu/                    # Menu-related components
│   │   │   ├── ProductCard.tsx      # Product display card
│   │   │   ├── CategoryTab.tsx      # Category selection tab
│   │   │   └── index.ts             # Menu component exports
│   │   ├── Cart/                    # Cart-related components
│   │   ├── Payment/                 # Payment-related components
│   │   ├── OrderTracking/           # Order tracking components
│   │   └── QRScanner/               # QR scanning components
│   │
│   └── 📱 screens/                  # Screen components
│       ├── HomeScreen/              # Home screen components
│       ├── MenuScreen/              # Menu screen components
│       ├── CartScreen/              # Cart screen components
│       └── PaymentScreen/           # Payment screen components
│
├── 🏪 stores/                       # State management
│   ├── 📊 slices/                   # Zustand store slices
│   │   ├── userSlice.ts             # User and session state
│   │   ├── menuSlice.ts             # Menu and product state
│   │   ├── cartSlice.ts             # Shopping cart state
│   │   └── orderSlice.ts            # Order management state
│   │
│   ├── 🔧 middleware/               # Store middleware
│   │   ├── persistence.ts           # Data persistence
│   │   ├── logging.ts               # State logging
│   │   └── analytics.ts             # Analytics tracking
│   │
│   └── index.ts                     # Centralized store exports
│
├── 🎨 themes/                       # Design system
│   ├── colors.ts                    # Color palette
│   ├── typography.ts                # Typography system
│   ├── spacing.ts                   # Spacing system
│   ├── shadows.ts                   # Shadow system
│   └── index.ts                     # Theme configuration
│
├── 🛠️ utils/                        # Utility functions
│   ├── 📊 helpers/                  # Helper functions
│   │   ├── formatters.ts            # Data formatting utilities
│   │   ├── calculators.ts           # Business logic calculations
│   │   ├── validators.ts            # Form validation
│   │   └── constants.ts             # Application constants
│   │
│   ├── 🔐 validators/               # Validation utilities
│   │   ├── formValidators.ts        # Form validation rules
│   │   ├── inputValidators.ts       # Input validation
│   │   └── businessValidators.ts    # Business rule validation
│   │
│   └── 📱 hooks/                    # Custom React hooks
│       ├── useQRScanner.ts          # QR scanning hook
│       ├── usePayment.ts            # Payment processing hook
│       ├── useOrderTracking.ts      # Order tracking hook
│       └── useAnalytics.ts          # Analytics hook
│
├── 📊 types/                        # TypeScript definitions
│   ├── api.ts                       # API type definitions
│   ├── components.ts                # Component prop types
│   ├── stores.ts                    # Store type definitions
│   ├── navigation.ts                # Navigation types
│   └── global.ts                    # Global type definitions
│
├── 🗄️ data/                         # Data layer
│   ├── 📋 models/                   # Data models
│   │   ├── User.ts                  # User model
│   │   ├── Product.ts               # Product model
│   │   ├── Order.ts                 # Order model
│   │   └── Payment.ts               # Payment model
│   │
│   ├── 🔌 services/                 # API services
│   │   ├── apiClient.ts             # API client configuration
│   │   ├── userService.ts           # User API service
│   │   ├── menuService.ts           # Menu API service
│   │   ├── orderService.ts          # Order API service
│   │   └── paymentService.ts        # Payment API service
│   │
│   └── 📦 mock/                     # Mock data
│       ├── mockData.ts              # Mock data exports
│       ├── mockUsers.ts             # Mock user data
│       ├── mockProducts.ts          # Mock product data
│       └── mockOrders.ts            # Mock order data
│
├── 🔧 config/                       # Configuration
│   ├── app.config.ts                # App configuration
│   ├── api.config.ts                # API configuration
│   ├── payment.config.ts            # Payment configuration
│   └── analytics.config.ts          # Analytics configuration
│
├── 📚 docs/                         # Documentation
│   ├── ARCHITECTURE.md              # Architecture documentation
│   ├── API.md                       # API documentation
│   ├── COMPONENTS.md                # Component documentation
│   ├── DEPLOYMENT.md                # Deployment guide
│   └── CONTRIBUTING.md              # Contributing guidelines
│
├── 🧪 tests/                        # Test files
│   ├── unit/                        # Unit tests
│   │   ├── components/              # Component tests
│   │   ├── stores/                  # Store tests
│   │   └── utils/                   # Utility tests
│   │
│   ├── integration/                 # Integration tests
│   │   ├── api/                     # API integration tests
│   │   └── components/              # Component integration tests
│   │
│   └── e2e/                         # End-to-end tests
│       ├── flows/                   # User flow tests
│       └── scenarios/               # Test scenarios
│
├── 📦 assets/                       # Static assets
│   ├── images/                      # Image assets
│   ├── icons/                       # Icon assets
│   ├── fonts/                       # Font assets
│   └── animations/                  # Animation assets
│
├── 🔧 scripts/                      # Build and utility scripts
│   ├── build.ts                     # Build script
│   ├── deploy.ts                    # Deployment script
│   ├── test.ts                      # Test runner
│   └── lint.ts                      # Linting script
│
├── 📄 Configuration Files
│   ├── app.json                     # Expo configuration
│   ├── package.json                 # Dependencies and scripts
│   ├── tsconfig.json                # TypeScript configuration
│   ├── eslint.config.js             # ESLint configuration
│   ├── babel.config.js              # Babel configuration
│   └── metro.config.js              # Metro bundler configuration
│
└── 📋 Documentation Files
    ├── README.md                    # Project overview
    ├── CHANGELOG.md                 # Version history
    ├── LICENSE                      # License information
    └── SECURITY.md                  # Security policy
```

## 🎯 Component Architecture

### Component Categories

#### 1. Common Components (`components/common/`)
- **Reusable across features**
- **No business logic**
- **Highly configurable**
- **Well-documented props**

#### 2. Feature Components (`components/features/`)
- **Feature-specific functionality**
- **Business logic integration**
- **Feature-scoped styling**
- **Feature-specific hooks**

#### 3. Screen Components (`components/screens/`)
- **Screen-specific layouts**
- **Navigation integration**
- **Screen-level state management**
- **Screen-specific styling**

## 🏪 State Management Architecture

### Store Organization

#### 1. Slices (`stores/slices/`)
- **Domain-specific state**
- **Atomic state updates**
- **Computed values**
- **Persistence configuration**

#### 2. Middleware (`stores/middleware/`)
- **Cross-cutting concerns**
- **Analytics integration**
- **Error handling**
- **Performance monitoring**

## 🎨 Design System Architecture

### Theme Organization

#### 1. Design Tokens
- **Colors**: Brand and semantic colors
- **Typography**: Font families, sizes, weights
- **Spacing**: Consistent spacing scale
- **Shadows**: Elevation and depth

#### 2. Component Themes
- **Button variants**
- **Input styles**
- **Modal configurations**
- **Navigation themes**

## 🛠️ Utility Architecture

### Helper Organization

#### 1. Formatters (`utils/helpers/formatters.ts`)
- **Data formatting**
- **Currency formatting**
- **Date/time formatting**
- **Text formatting**

#### 2. Calculators (`utils/helpers/calculators.ts`)
- **Business logic**
- **Mathematical operations**
- **Price calculations**
- **Tax calculations**

#### 3. Validators (`utils/validators/`)
- **Input validation**
- **Form validation**
- **Business rule validation**
- **Data integrity checks**

## 📊 Type System Architecture

### Type Organization

#### 1. API Types (`types/api.ts`)
- **Request/response types**
- **API error types**
- **Pagination types**
- **Filter types**

#### 2. Component Types (`types/components.ts`)
- **Component prop types**
- **Event handler types**
- **Style types**
- **Animation types**

#### 3. Store Types (`types/stores.ts`)
- **State interfaces**
- **Action types**
- **Selector types**
- **Middleware types**

## 🗄️ Data Layer Architecture

### Service Organization

#### 1. API Client (`data/services/apiClient.ts`)
- **HTTP client configuration**
- **Request/response interceptors**
- **Error handling**
- **Authentication**

#### 2. Domain Services
- **User service**: User management
- **Menu service**: Menu and product management
- **Order service**: Order processing
- **Payment service**: Payment processing

## 🔧 Configuration Architecture

### Configuration Organization

#### 1. Environment-based Config
- **Development configuration**
- **Staging configuration**
- **Production configuration**
- **Feature flags**

#### 2. Feature-specific Config
- **API endpoints**
- **Payment gateways**
- **Analytics providers**
- **Third-party services**

## 🧪 Testing Architecture

### Test Organization

#### 1. Unit Tests (`tests/unit/`)
- **Component testing**
- **Store testing**
- **Utility testing**
- **Hook testing**

#### 2. Integration Tests (`tests/integration/`)
- **API integration**
- **Component integration**
- **Store integration**
- **Service integration**

#### 3. E2E Tests (`tests/e2e/`)
- **User flows**
- **Critical paths**
- **Cross-platform testing**
- **Performance testing**

## 📚 Documentation Architecture

### Documentation Organization

#### 1. Technical Documentation
- **Architecture guide**
- **API documentation**
- **Component library**
- **Deployment guide**

#### 2. User Documentation
- **User guides**
- **Feature documentation**
- **Troubleshooting**
- **FAQ**

## 🚀 Benefits of This Structure

### 1. Scalability
- **Modular architecture**
- **Clear separation of concerns**
- **Feature-based organization**
- **Extensible design**

### 2. Maintainability
- **Consistent patterns**
- **Well-documented code**
- **Type safety**
- **Clear dependencies**

### 3. Team Collaboration
- **Clear ownership**
- **Parallel development**
- **Code review efficiency**
- **Knowledge sharing**

### 4. Performance
- **Code splitting**
- **Lazy loading**
- **Optimized bundles**
- **Efficient state management**

### 5. Quality Assurance
- **Comprehensive testing**
- **Static analysis**
- **Code quality tools**
- **Performance monitoring**

---

*This structure is designed to support enterprise-level development with a focus on scalability, maintainability, and team collaboration.* 
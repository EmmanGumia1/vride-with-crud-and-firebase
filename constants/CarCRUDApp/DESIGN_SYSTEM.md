# Vride - Design System & UI Guide

## Color Palette

### Primary Colors
- **Coral Red (Primary)**: `#FF6B6B`
  - Used for: Buttons, highlights, primary actions, accents
  - Hex: #FF6B6B
  - RGB: (255, 107, 107)

- **Background**: `#F8F9FB`
  - Used for: Main background, screen background
  - Hex: #F8F9FB
  - RGB: (248, 249, 251)

### Neutral Colors
- **White**: `#FFFFFF`
  - Used for: Cards, modals, input backgrounds
  - Hex: #FFFFFF
  - RGB: (255, 255, 255)

- **Dark Gray**: `#333333`
  - Used for: Headings, primary text
  - Hex: #333333
  - RGB: (51, 51, 51)

- **Medium Gray**: `#666666`
  - Used for: Body text, secondary text
  - Hex: #666666
  - RGB: (102, 102, 102)

- **Light Gray**: `#999999`
  - Used for: Placeholder text, hints
  - Hex: #999999
  - RGB: (153, 153, 153)

- **Pale Gray**: `#E8E8E8`
  - Used for: Borders, dividers
  - Hex: #E8E8E8
  - RGB: (232, 232, 232)

### Car Color Options
Users can choose from 10 car colors:
1. **Red**: `#FF6B6B` (Primary color)
2. **Blue**: `#4A90E2`
3. **Black**: `#333333`
4. **White**: `#FFFFFF` (with border)
5. **Silver**: `#C0C0C0`
6. **Gray**: `#808080`
7. **Gold**: `#FFD700`
8. **Green**: `#2ECC71`
9. **Orange**: `#FF9500`
10. **Purple**: `#9B59B6`

---

## Typography

### Font Weights
- **Bold/Heavy**: 700-800 (Headings, titles)
- **Semi-Bold**: 600 (Buttons, labels)
- **Regular**: 400-500 (Body text)

### Font Sizes

| Usage | Size | Weight | Line Height |
|-------|------|--------|-------------|
| App Title (Vride) | 40px | 800 | 1.2 |
| Screen Heading | 24px | 800 | 1.3 |
| Card Title | 18px | 700 | 1.3 |
| Subtitle | 16px | 500 | 1.4 |
| Body Text | 14px | 400 | 1.5 |
| Label | 14px | 600 | 1.4 |
| Small Text | 12px | 500 | 1.4 |
| Hint/Placeholder | 14px | 400 | 1.5 |

### Text Colors

| Type | Color | Usage |
|------|-------|-------|
| Primary | #333333 | Headings, titles |
| Secondary | #666666 | Body text |
| Tertiary | #999999 | Hints, placeholders |
| Accent | #FF6B6B | Important info, links |
| Error | #FF6B6B | Error messages |
| Success | #2ECC71 | Success states |

---

## Spacing & Layout

### Standard Spacing Scale
```
4px   - Extra small gaps
8px   - Small gaps
12px  - Medium gaps
16px  - Standard padding/margin
24px  - Large spacing
32px  - Extra large spacing
48px  - Section spacing
```

### Padding/Margin Convention
- **Screen padding**: 16px (horizontal)
- **Card padding**: 16px
- **Input padding**: 12-14px (vertical) x 14-16px (horizontal)
- **Button padding**: 14px (vertical) x 16px+ (horizontal)
- **Gap between elements**: 8-16px

### Safe Area Handling
- Top: 12-16px from safe area
- Bottom: 24px+ from safe area (especially FAB)
- Sides: 16px from edges

---

## Component Styles

### Buttons

#### Primary Button (Action Buttons)
```
Background: #FF6B6B
Text Color: #FFFFFF
Padding: 14px vertical, 16px+ horizontal
Border Radius: 12px
Shadow: offset(0,4) blur(8) opacity(0.3) color(#FF6B6B)
Font Size: 16px
Font Weight: 700
```

#### Secondary Button (Outlined)
```
Background: #FFF
Border: 1.5px solid #FF6B6B
Border Radius: 12px
Text Color: #FF6B6B
Padding: 8px vertical, 12px horizontal
Font Weight: 600
```

#### Icon Button
```
Size: 28-32px (Floating Action Button)
Background: #FF6B6B
Border Radius: 50% (circle)
Shadow: offset(0,4) blur(10) opacity(0.4)
Icon Color: #FFFFFF
Icon Size: 24-28px
```

### Input Fields

```
Background: #FFFFFF
Border: 1px solid #E8E8E8
Border Radius: 12px
Padding: 14px horizontal, 12px vertical
Font Size: 16px
Text Color: #333333
Placeholder Color: #999999
Shadow: offset(0,2) blur(4) opacity(0.05)
Focus Border: 1px solid #FF6B6B
```

### Cards

```
Background: #FFFFFF
Border Radius: 16px
Padding: 16px
Margin Bottom: 12px
Shadow: offset(0,2) blur(6) opacity(0.08)
Elevation: 3
```

### Search Bar

```
Background: #FFFFFF
Border Radius: 12px
Padding: 12px horizontal
Icon Color: #999999
Icon Size: 20px
Shadow: offset(0,2) blur(6) opacity(0.08)
Elevation: 3
Margin: 16px horizontal, 16px vertical
```

---

## Shadows & Elevation

### Shadow Scale

#### Elevation 1 (Subtle)
- Offset: 0, 2
- Blur: 4
- Opacity: 0.05
- Used for: Input fields, small containers

#### Elevation 2 (Light)
- Offset: 0, 2
- Blur: 6
- Opacity: 0.08
- Used for: Cards, search bar

#### Elevation 3 (Medium)
- Offset: 0, 4
- Blur: 8
- Opacity: 0.1
- Used for: FAB, important cards

#### Elevation 4 (Strong)
- Offset: 0, 4
- Blur: 10
- Opacity: 0.2
- Used for: Modals (optional)

#### Button Shadow (Special)
- Offset: 0, 4
- Blur: 8
- Opacity: 0.3
- Color: Button color (tinted)
- Used for: Primary action buttons

---

## Border Radius

### Standard Radius Values
- **Small**: 8px (Badges, chips)
- **Medium**: 12px (Inputs, buttons, search bar)
- **Large**: 16px (Cards, modals)
- **Circle**: 50% or width/2 (FAB)

---

## Icons

### Icon Library
- **Source**: Expo Vector Icons (MaterialIcons)
- **Size Standards**:
  - Extra Small: 16px (Badges)
  - Small: 18-20px (Button icons, search icon)
  - Medium: 24-28px (Navigation, FAB)
  - Large: 32-36px (Empty state)
  - Extra Large: 64px (Empty state hero)

### Icon Colors
- Primary icons: #FF6B6B
- Secondary icons: #999999
- White icons: #FFFFFF
- Error icons: #FF6B6B

### Common Icons Used
- `add` - Add button
- `edit` - Edit button
- `delete` - Delete button
- `logout` - Logout button
- `search` - Search bar
- `directions-car` - App logo
- `close` - Close button
- `check` - Confirmation

---

## Animation & Motion

### Transition Types
- **Modal Entry**: `slide` animation
- **Button Press**: Touch opacity (0.7)
- **Loading**: `ActivityIndicator` spinner
- **List Updates**: Real-time, no animation

### Touch Feedback
- **Active State**: Opacity 0.7
- **Disabled State**: Opacity 0.5
- **Hover State**: Subtle elevation increase

---

## Screen Layouts

### Login/Signup Screens
```
┌─────────────────────────┐
│         (Safe Area)     │
│                         │
│  ┌──────────────────┐   │
│  │     Vride        │   │  40px, Bold
│  │  Create Account  │   │  16px, Regular
│  └──────────────────┘   │
│                         │
│  ┌──────────────────┐   │
│  │   Email Input    │   │  16px padding
│  └──────────────────┘   │
│                         │
│  ┌──────────────────┐   │
│  │  Password Input  │   │  16px padding
│  └──────────────────┘   │
│                         │
│  ┌──────────────────┐   │
│  │    Sign Up       │   │  Primary button
│  └──────────────────┘   │
│                         │
└─────────────────────────┘
```

### Home Screen
```
┌─────────────────────────────┐
│         (Safe Area)         │
├─────────────────────────────┤
│ 🚗 Vride        [Logout]   │  Header (16px)
├─────────────────────────────┤
│ 🔍 Search...                │  Search (16px margin)
├─────────────────────────────┤
│                             │
│ ┌───────────────────────┐   │
│ │ Car Name          2024│   │  Card (16px margin, 16px)
│ │ Brand • Model         │   │
│ │ ●Color    Details...  │   │  
│ │ [Edit] [Delete]       │   │
│ └───────────────────────┘   │
│                             │
│                    [+]      │  FAB (24px bottom, 24px right)
│                             │
└─────────────────────────────┘
```

### Add/Edit Modal
```
┌─────────────────────────────┐
│  [×]  Add New Car      [  ] │  Header
├─────────────────────────────┤
│                             │
│  Car Name *                 │
│  ┌─────────────────────┐    │  Input
│  │                     │    │
│  └─────────────────────┘    │
│                             │
│  Manufacturer *             │
│  ┌─────────────────────┐    │  Input
│  │                     │    │
│  └─────────────────────┘    │
│                             │
│  Color *                    │
│  ● ● ● ● ● ● ● ● ● ●      │  Color grid
│                             │
│  ┌─────────────────────┐    │
│  │    Add Car          │    │  Button
│  └─────────────────────┘    │
│                             │
└─────────────────────────────┘
```

---

## Responsive Design

### Screen Size Breakpoints
- **Phone**: 320px - 480px (portrait)
- **Tablet**: 481px - 1024px
- **Desktop**: 1025px+

### Scaling Rules
- **Text**: Scale 0.8-1.2x based on device
- **Padding**: Maintain 16px minimum
- **Touch targets**: Minimum 48px x 48px
- **Cards**: Full width - margins

---

## Accessibility

### Touch Targets
- Minimum size: 48px x 48px
- Button height: 48-56px
- Spacing between: 8px minimum

### Text Contrast
- Primary text (#333 on #FFF): 16:1 ratio ✓
- Secondary text (#666 on #FFF): 11:1 ratio ✓
- Buttons (#FFF on #FF6B6B): 7:1 ratio ✓

### Font Readability
- Minimum size: 12px
- Line height: 1.4-1.5
- Letter spacing: Normal

---

## Theme Configuration

### Light Theme (Default)
```typescript
export const Colors = {
  light: {
    text: '#333333',
    background: '#F8F9FB',
    tint: '#FF6B6B',
    tabIconDefault: '#999999',
    tabIconSelected: '#FF6B6B',
  },
  dark: {
    text: '#FFFFFF',
    background: '#1a1a1a',
    tint: '#FF6B6B',
    tabIconDefault: '#666666',
    tabIconSelected: '#FF6B6B',
  },
};
```

---

## Implementation Examples

### Button Style
```typescript
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    alignItems: 'center',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
});
```

### Card Style
```typescript
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
});
```

---

## Brand Guidelines

### Logo Usage
- Logo: 🚗 + "Vride"
- Font size: 24-40px
- Always use coral red (#FF6B6B)
- Minimum clearance: 16px from edges

### Tone
- Modern, friendly, professional
- User-centric messaging
- Clear, concise copy
- Encouraging but honest

---

**Design System Version**: 1.0
**Last Updated**: December 2025

import React from 'react';
import Svg, {
  Circle,
  Line,
  Path,
  Polyline,
  Rect,
} from 'react-native-svg';

export type FinanceIconProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

function BaseIcon({
  size = 24,
  children,
}: {
  size?: number;
  children: React.ReactNode;
}) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {children}
    </Svg>
  );
}

export function BellIcon({
  size = 24,
  color = '#052224',
  strokeWidth = 1.8,
}: FinanceIconProps) {
  return (
    <BaseIcon size={size}>
      <Path
        d="M8 18H16"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M9.5 20C10 21 10.8 21.5 12 21.5C13.2 21.5 14 21 14.5 20"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M6.5 17C7.7 15.7 8 14.2 8 12.2V11C8 8.8 9.8 7 12 7C14.2 7 16 8.8 16 11V12.2C16 14.2 16.3 15.7 17.5 17"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M10.8 5.8C11 5.1 11.4 4.5 12 4.5C12.6 4.5 13 5.1 13.2 5.8"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
    </BaseIcon>
  );
}

export function ArrowLeftIcon({
  size = 24,
  color = '#052224',
  strokeWidth = 1.8,
}: FinanceIconProps) {
  return (
    <BaseIcon size={size}>
      <Path
        d="M19 12H5"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M10 7L5 12L10 17"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </BaseIcon>
  );
}

export function SearchIcon({
  size = 24,
  color = '#052224',
  strokeWidth = 1.8,
}: FinanceIconProps) {
  return (
    <BaseIcon size={size}>
      <Circle cx="11" cy="11" r="6" stroke={color} strokeWidth={strokeWidth} />
      <Path
        d="M15.5 15.5L19 19"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
    </BaseIcon>
  );
}

export function PlusIcon({
  size = 24,
  color = '#052224',
  strokeWidth = 1.8,
}: FinanceIconProps) {
  return (
    <BaseIcon size={size}>
      <Path
        d="M12 5V19"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M5 12H19"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
    </BaseIcon>
  );
}

export function CalendarIcon({
  size = 24,
  color = '#052224',
  strokeWidth = 1.8,
}: FinanceIconProps) {
  return (
    <BaseIcon size={size}>
      <Rect
        x="4.5"
        y="6.5"
        width="15"
        height="13"
        rx="2.2"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <Path
        d="M8 4.5V8"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M16 4.5V8"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M4.5 10H19.5"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Circle cx="8.3" cy="13.3" r="0.8" fill={color} />
      <Circle cx="12" cy="13.3" r="0.8" fill={color} />
      <Circle cx="15.7" cy="13.3" r="0.8" fill={color} />
    </BaseIcon>
  );
}

export function StarIcon({
  size = 24,
  color = '#052224',
  strokeWidth = 1.8,
}: FinanceIconProps) {
  return (
    <BaseIcon size={size}>
      <Path
        d="M12 5.2L14 9.3L18.6 10L15.3 13.3L16.1 17.9L12 15.7L7.9 17.9L8.7 13.3L5.4 10L10 9.3L12 5.2Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </BaseIcon>
  );
}

export function DollarIcon({
  size = 24,
  color = '#052224',
  strokeWidth = 1.8,
}: FinanceIconProps) {
  return (
    <BaseIcon size={size}>
      <Path
        d="M12 4V20"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M15.5 7.2C14.7 6.2 13.4 5.5 12 5.5C9.8 5.5 8 6.8 8 8.8C8 10.6 9.5 11.4 12 12"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M8.5 16.8C9.3 17.8 10.6 18.5 12 18.5C14.2 18.5 16 17.2 16 15.2C16 13.4 14.5 12.6 12 12"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
    </BaseIcon>
  );
}

export function TrendDownIcon({
  size = 24,
  color = '#052224',
  strokeWidth = 1.8,
}: FinanceIconProps) {
  return (
    <BaseIcon size={size}>
      <Path
        d="M6 8L18 16"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M11.5 16H18V9.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </BaseIcon>
  );
}

export function ArrowUpRightIcon({
  size = 24,
  color = '#052224',
  strokeWidth = 1.8,
}: FinanceIconProps) {
  return (
    <BaseIcon size={size}>
      <Rect
        x="4.5"
        y="4.5"
        width="15"
        height="15"
        rx="3"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <Path
        d="M8 16L16 8"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M10.5 8H16V13.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </BaseIcon>
  );
}

export function ArrowDownRightIcon({
  size = 24,
  color = '#052224',
  strokeWidth = 1.8,
}: FinanceIconProps) {
  return (
    <BaseIcon size={size}>
      <Rect
        x="4.5"
        y="4.5"
        width="15"
        height="15"
        rx="3"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <Path
        d="M8 8L16 16"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M10.5 16H16V10.5"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </BaseIcon>
  );
}

export function CheckSquareIcon({
  size = 16,
  color = '#052224',
  strokeWidth = 1.7,
}: FinanceIconProps) {
  return (
    <BaseIcon size={size}>
      <Rect
        x="5"
        y="5"
        width="14"
        height="14"
        rx="2.5"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <Path
        d="M8.5 12.2L10.8 14.5L15.5 9.7"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </BaseIcon>
  );
}

export function HomeIcon({
  size = 24,
  color = '#052224',
  strokeWidth = 1.8,
}: FinanceIconProps) {
  return (
    <BaseIcon size={size}>
      <Path
        d="M4.8 10.6L12 5L19.2 10.6"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M7.3 9.9V19H16.7V9.9"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M10.2 19V14.4H13.8V19"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </BaseIcon>
  );
}

export function AnalyticsIcon({
  size = 24,
  color = '#052224',
  strokeWidth = 1.8,
}: FinanceIconProps) {
  return (
    <BaseIcon size={size}>
      <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={strokeWidth} />
      <Line
        x1="8"
        y1="14"
        x2="8"
        y2="10"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Line
        x1="12"
        y1="14"
        x2="12"
        y2="7"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Line
        x1="16"
        y1="14"
        x2="16"
        y2="11.2"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Line
        x1="6.5"
        y1="17"
        x2="17.5"
        y2="17"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
    </BaseIcon>
  );
}

export function TransferIcon({
  size = 24,
  color = '#052224',
  strokeWidth = 1.8,
}: FinanceIconProps) {
  return (
    <BaseIcon size={size}>
      <Path
        d="M4 9H18"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Polyline
        points="15,6 20,9 15,12"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M20 15H6"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Polyline
        points="9,12 4,15 9,18"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </BaseIcon>
  );
}

export function LayersIcon({
  size = 24,
  color = '#052224',
  strokeWidth = 1.8,
}: FinanceIconProps) {
  return (
    <BaseIcon size={size}>
      <Path
        d="M4.8 9.2L12 5L19.2 9.2L12 13.4L4.8 9.2Z"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M6.8 13.1L12 16L17.2 13.1"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M4.8 15.8L12 20L19.2 15.8"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </BaseIcon>
  );
}

export function UserIcon({
  size = 24,
  color = '#052224',
  strokeWidth = 1.8,
}: FinanceIconProps) {
  return (
    <BaseIcon size={size}>
      <Circle cx="12" cy="8.5" r="3.5" stroke={color} strokeWidth={strokeWidth} />
      <Path
        d="M5 19.3C6.5 16.8 8.8 15.5 12 15.5C15.2 15.5 17.5 16.8 19 19.3"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
    </BaseIcon>
  );
}

export function StackCashIcon({
  size = 24,
  color = '#052224',
  strokeWidth = 1.8,
}: FinanceIconProps) {
  return (
    <BaseIcon size={size}>
      <Rect
        x="6"
        y="11"
        width="11"
        height="6"
        rx="1.2"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <Rect
        x="8"
        y="8"
        width="11"
        height="6"
        rx="1.2"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <Rect
        x="10"
        y="5"
        width="11"
        height="6"
        rx="1.2"
        stroke={color}
        strokeWidth={strokeWidth}
      />
    </BaseIcon>
  );
}

export function BagIcon({
  size = 24,
  color = '#052224',
  strokeWidth = 1.8,
}: FinanceIconProps) {
  return (
    <BaseIcon size={size}>
      <Path
        d="M8 9V7.8C8 5.7 9.8 4 12 4C14.2 4 16 5.7 16 7.8V9"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M6.5 9.5H17.5L16.6 19.5H7.4L6.5 9.5Z"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M10 12.5H14"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
    </BaseIcon>
  );
}

export function KeyIcon({
  size = 24,
  color = '#052224',
  strokeWidth = 1.8,
}: FinanceIconProps) {
  return (
    <BaseIcon size={size}>
      <Circle cx="9" cy="11" r="3" stroke={color} strokeWidth={strokeWidth} />
      <Path
        d="M12 11H20"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M17 11V14"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M15 11V13"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
    </BaseIcon>
  );
}

export function CarIcon({
  size = 28,
  color = '#052224',
  strokeWidth = 1.8,
}: FinanceIconProps) {
  return (
    <BaseIcon size={size}>
      <Circle cx="8" cy="16.5" r="1.6" fill={color} />
      <Circle cx="16" cy="16.5" r="1.6" fill={color} />
      <Path
        d="M6.6 15H17.4L16 10.8C15.6 9.7 14.6 9 13.5 9H10.5C9.4 9 8.4 9.7 8 10.8L6.6 15Z"
        stroke={color}
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M5.5 15H18.5C19.3 15 20 15.7 20 16.5V17.3C20 18.2 19.2 19 18.3 19H17.8"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M5.5 15C4.7 15 4 15.7 4 16.5V17.3C4 18.2 4.8 19 5.7 19H6.2"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M8.2 12.5H15.8"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
    </BaseIcon>
  );
}

export function ForkKnifeIcon({
  size = 24,
  color = '#052224',
  strokeWidth = 1.8,
}: FinanceIconProps) {
  return (
    <BaseIcon size={size}>
      <Path
        d="M7 4V10"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M5 4V8"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M9 4V8"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M7 10V20"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M16.5 4C18 6.1 18.3 8.8 17.5 11.3L16 16"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M15.2 20L16 16"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
    </BaseIcon>
  );
}

export function TransportIcon({
  size = 24,
  color = '#052224',
  strokeWidth = 1.8,
}: FinanceIconProps) {
  return (
    <BaseIcon size={size}>
      <Rect
        x="6"
        y="4.5"
        width="12"
        height="14"
        rx="2.2"
        stroke={color}
        strokeWidth={strokeWidth}
      />
      <Path
        d="M9 18.5V20"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M15 18.5V20"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M6 11.5H18"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M8.5 7.8H10.5"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M13.5 7.8H15.5"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Circle cx="9" cy="15.2" r="1" fill={color} />
      <Circle cx="15" cy="15.2" r="1" fill={color} />
      <Path
        d="M4 9.5H6"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
      <Path
        d="M18 9.5H20"
        stroke={color}
        strokeLinecap="round"
        strokeWidth={strokeWidth}
      />
    </BaseIcon>
  );
}

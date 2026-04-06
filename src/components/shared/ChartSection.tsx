import React, { useCallback, useMemo, useState } from 'react';
import {
  Text,
  View,
  type LayoutChangeEvent,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { S } from '../../theme/scale';

export type ChartSectionProps = {
  title: string;
  actions?: React.ReactNode;
  containerClassName?: string;
  headerClassName?: string;
  titleClassName?: string;
  containerStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  children: React.ReactNode | ((args: { width: number }) => React.ReactNode);
};

export function ChartSection({
  title,
  actions,
  containerClassName,
  headerClassName,
  titleClassName,
  containerStyle,
  headerStyle,
  titleStyle,
  children,
}: ChartSectionProps) {
  const [width, setWidth] = useState(0);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const nextWidth = Math.floor(event.nativeEvent.layout.width);
    setWidth(current => (current === nextWidth ? current : nextWidth));
  }, []);

  const content = useMemo(() => {
    if (typeof children === 'function') {
      return children({ width });
    }

    return children;
  }, [children, width]);

  return (
    <View
      onLayout={onLayout}
      className={containerClassName}
      style={[
        {
          borderRadius: S.radius.xl,
          padding: S.space.lg,
          overflow: 'hidden',
        },
        containerStyle,
      ]}
    >
      <View style={{ gap: S.space.lg }}>
        <View
          className={headerClassName ?? 'flex-row items-center justify-between'}
          style={headerStyle}
        >
          <Text
            className={titleClassName ?? 'text-text'}
            style={[
              {
                fontSize: S.fs.sm,
              },
              titleStyle,
            ]}
          >
            {title}
          </Text>

          {actions}
        </View>

        <View>{content}</View>
      </View>
    </View>
  );
}

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
  containerStyle?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  children: React.ReactNode | ((args: { width: number }) => React.ReactNode);
};

export function ChartSection({
  title,
  actions,
  containerClassName,
  containerStyle,
  headerStyle,
  titleStyle,
  children,
}: ChartSectionProps) {
  const [width, setWidth] = useState(0);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const nextWidth = Math.floor(event.nativeEvent.layout.width);
    setWidth((current) => (current === nextWidth ? current : nextWidth));
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
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: S.space.lg,
          },
          headerStyle,
        ]}
      >
        <Text
          className="text-text"
          style={[
            {
              fontSize: S.fs.sm,
              fontFamily: 'Poppins-SemiBold',
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
  );
}

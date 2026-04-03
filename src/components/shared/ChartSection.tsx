import React, { useCallback, useMemo, useState } from 'react';
import { LayoutChangeEvent, Text, View } from 'react-native';
import { S } from '../../theme/scale';

export type ChartSectionProps = {
  title: string;
  actions?: React.ReactNode;
  containerClassName?: string;
  children: React.ReactNode | ((args: { width: number }) => React.ReactNode);
};

export function ChartSection({
  title,
  actions,
  containerClassName,
  children,
}: ChartSectionProps) {
  const [width, setWidth] = useState(0);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const next = Math.floor(e.nativeEvent.layout.width);
    setWidth((prev) => (prev === next ? prev : next));
  }, []);

  const content = useMemo(() => {
    if (typeof children === 'function') return children({ width });
    return children;
  }, [children, width]);

  return (
    <View
      onLayout={onLayout}
      className={containerClassName}
      style={{
        borderRadius: S.radius.xl,
        padding: S.space.lg,
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: S.space.lg,
        }}
      >
        <Text
          className="text-text"
          style={{ fontSize: S.fs.sm, fontFamily: 'Poppins-SemiBold' }}
        >
          {title}
        </Text>
        {actions}
      </View>

      <View>{content}</View>
    </View>
  );
}


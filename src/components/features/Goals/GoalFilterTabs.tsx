import React from 'react';
import { S } from '../../../theme/scale';
import { moderateScale, rs } from '../../../utils/responsive';
import { SegmentedTabs } from '../../shared/SegmentedTabs';

export type GoalFilterTabsProps<T extends string> = {
  tabs: readonly T[];
  activeTab: T;
  onChange: (tab: T) => void;
};

export function GoalFilterTabs<T extends string>({
  tabs,
  activeTab,
  onChange,
}: GoalFilterTabsProps<T>) {
  return (
    <SegmentedTabs
      activeTab={activeTab}
      tabs={tabs}
      onChange={onChange}
      containerClassName="flex-row items-center bg-pill"
      activeItemClassName="bg-primary-500"
      activeLabelClassName="text-surface-dark"
      inactiveLabelClassName="text-title"
      containerPadding={rs(6)}
      gap={S.space.xs}
      containerStyle={{
        borderRadius: S.radius.xxl,
      }}
      itemStyle={{
        borderRadius: S.radius.xl,
        paddingVertical: moderateScale(10),
      }}
      labelStyle={{
        fontSize: S.fs.sm,
      }}
      activeLabelStyle={{
        fontFamily: 'Poppins-Bold',
      }}
      inactiveLabelStyle={{
        fontFamily: 'Poppins-Medium',
      }}
    />

  );
}

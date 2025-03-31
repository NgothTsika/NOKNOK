import {StyleSheet} from 'react-native';
import React, {FC} from 'react';
import {Colors} from '@/utils/Constants';
import {
  StickyView,
  useCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import SearchBar from '@/components/dashboard/SearchBar';

const StickSearchBar: FC = () => {
  const {scrollY} = useCollapsibleContext();

  const shadowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [0, 14], [0, 1], 'clamp'),
  }));

  const backgroundStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(255,255,255, ${interpolate(
      scrollY.value,
      [1, 80],
      [0, 1],
      'clamp',
    )})`,
  }));

  return (
    <StickyView style={[backgroundStyle]}>
      <SearchBar />
      <Animated.View style={[styles.shadow, shadowStyle]} />
    </StickyView>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    width: '90%',
    padding: 10,
    height: 50,
  },
  shadow: {
    height: 15,
    width: '100%',
    borderBottomColor: Colors.border,
  },
});

export default StickSearchBar;

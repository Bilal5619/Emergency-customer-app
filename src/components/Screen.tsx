import { useEffect, useState, type PropsWithChildren } from 'react';
import { Animated, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/constants/colors';

type Props = PropsWithChildren<{
  scroll?: boolean;
}>;

export function Screen({ children, scroll = true }: Props) {
  const [entrance] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.timing(entrance, {
      toValue: 1,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [entrance]);

  const content = (
    <Animated.View
      style={[
        styles.animated,
        {
          opacity: entrance,
          transform: [
            {
              translateY: entrance.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }),
            },
          ],
        },
      ]}>
      <View style={styles.content}>{children}</View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {scroll ? (
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          {content}
        </ScrollView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },
  animated: {
    flexGrow: 1,
  },
  content: {
    width: '100%',
    maxWidth: 760,
    alignSelf: 'center',
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 28,
    gap: 16,
  },
});

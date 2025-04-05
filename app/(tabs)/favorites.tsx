import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { useColorScheme } from '@/hooks/useColorScheme';

const categories = [
  { id: 'book', title: 'Улюблена книга', icon: '📚' },
  { id: 'movie', title: 'Улюблений фільм', icon: '🎬' },
  { id: 'actor', title: 'Улюблений актор', icon: '🎭' },
  { id: 'music', title: 'Улюблена музика', icon: '🎵' },
];

const FavoritesPage = () => {
  const colorScheme = useColorScheme();
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#E8D3F1', dark: '#2D1B36' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.headerImage}
        />
      }
      title="Вибрати улюблене"
      titleStyle={styles.headerTitle}
    >
      <View style={styles.container}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.card,
              selectedCategory === category.id && styles.selectedCard,
              { backgroundColor: colorScheme === 'dark' ? '#2A2A2A' : '#FFFFFF' }
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <BlurView
              intensity={5}
              style={styles.cardContent}
              tint={colorScheme === 'dark' ? 'dark' : 'light'}
            >
              <View style={styles.iconContainer}>
                <ThemedText style={styles.icon}>{category.icon}</ThemedText>
              </View>
              <ThemedText style={styles.categoryTitle}>{category.title}</ThemedText>
            </BlurView>
          </TouchableOpacity>
        ))}

        {selectedCategory && (
          <ThemedView style={styles.selectionContainer}>
            <ThemedText style={styles.selectionText}>
              Ви вибрали: {categories.find(c => c.id === selectedCategory)?.title}
            </ThemedText>
          </ThemedView>
        )}
      </View>
    </ParallaxScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  headerImage: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
    opacity: 0.7,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: '#8A2BE2',
  },
  cardContent: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 28,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '500',
  },
  selectionContainer: {
    marginTop: 24,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  selectionText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default FavoritesPage; 
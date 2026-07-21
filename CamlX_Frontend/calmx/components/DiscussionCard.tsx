import React from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const CARD_WIDTH = Dimensions.get('window').width * 0.72;

export interface DiscussionItem {
  id: string;
  color: string;
  duration: string;
  author: string;
  title: string;
  body: string;
  participants: string;
  authorAvatar: ImageSourcePropType;
  participantAvatars: ImageSourcePropType[];
}

interface Props {
  item: DiscussionItem;
}

export function DiscussionCard({ item }: Props) {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.color }]}
      activeOpacity={0.9}
    >
      {/* Top row: badge + share */}
      <View style={styles.topRow}>
        <View style={styles.badgeRow}>
          <View style={styles.badge}>
            <View style={styles.badgeDot} />
            <Text style={styles.badgeText}>{item.duration}</Text>
          </View>
          <View style={styles.authorBadge}>
            <Image source={item.authorAvatar} style={styles.authorAvatar} />
            <Text style={styles.authorName}>{item.author}</Text>
          </View>
        </View>
        <TouchableOpacity hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <ShareIcon />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title}>{item.title}</Text>

      {/* Body */}
      <Text style={styles.body} numberOfLines={2}>{item.body}</Text>

      {/* Participants */}
      <View style={styles.participantsRow}>
        <View style={styles.avatarStack}>
          {item.participantAvatars.slice(0, 4).map((src, i) => (
            <Image
              key={i}
              source={src}
              style={[styles.participantAvatar, { left: i * 6 }]}
            />
          ))}
        </View>
        <Text style={styles.participantCount}>{item.participants}</Text>
      </View>
    </TouchableOpacity>
  );
}

function ShareIcon() {
  return (
    <Text style={{ fontSize: 18, color: '#fff' }}>↗</Text>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    borderRadius: 15,
    padding: 16,
    minHeight: 167,
    justifyContent: 'space-between',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    backgroundColor: '#FF6B6B',
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 2,
    gap: 4,
  },
  badgeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#fff',
  },
  badgeText: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#fff',
    letterSpacing: 0.22,
  },
  authorBadge: {
    backgroundColor: '#fff',
    borderRadius: 3,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 2,
    gap: 4,
    height: 16,
  },
  authorAvatar: {
    width: 12,
    height: 12,
    borderRadius: 3,
  },
  authorName: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    color: '#000',
    letterSpacing: 0.22,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: '#fff',
    letterSpacing: 0.32,
    lineHeight: 22,
    marginBottom: 6,
  },
  body: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#fff',
    lineHeight: 18,
    letterSpacing: 0.24,
    flex: 1,
  },
  participantsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 28,
  },
  avatarStack: {
    position: 'relative',
    width: 36,
    height: 10,
  },
  participantAvatar: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  participantCount: {
    fontFamily: 'Inter-Regular',
    fontSize: 8,
    color: '#fff',
    letterSpacing: 0.16,
  },
});

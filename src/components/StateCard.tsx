// src/components/StateCard.tsx
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import type { Estado } from "../types/ibge";
import { FLAGS } from "../constants/flags";

interface Props {
  item: Estado;
  onPress: (item: Estado) => void;
  cardWidth: number; // fornecido pela Home
}

export default function StateCard({ item, onPress, cardWidth }: Props) {
  const flag = FLAGS[item.sigla as keyof typeof FLAGS] ?? null;

  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
      onPress={() => onPress(item)}
      activeOpacity={0.9}
    >
      {flag ? (
        <Image
          source={flag}
          style={styles.flag}
          resizeMode="cover"
          accessibilityLabel={`Bandeira de ${item.nome}`}
        />
      ) : (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{item.sigla}</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{item.nome}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>Região: {item.regiao.nome}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 86,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f7f7f7",
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  flag: { width: 42, height: 30, borderRadius: 4, marginRight: 10 },
  badge: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: "#e6eefc",
    alignItems: "center", justifyContent: "center",
    marginRight: 10,
  },
  badgeText: { fontSize: 16, fontWeight: "700" },
  info: { flex: 1, minWidth: 0 },
  title: { fontSize: 14, fontWeight: "700", color: "#1b1b1b" },
  subtitle: { marginTop: 2, fontSize: 12, color: "#666" },
});

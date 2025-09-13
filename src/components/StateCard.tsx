// src/components/StateCard.tsx
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import type { Estado } from "../types/ibge";
import { FLAGS } from "../constants/flags";

interface Props {
  item: Estado;
  onPress: (item: Estado) => void;
  cardStyle?: StyleProp<ViewStyle>; // largura vinda da Home
}

export default function StateCard({ item, onPress, cardStyle }: Props) {
  const flag = FLAGS[item.sigla as keyof typeof FLAGS] ?? null;
  const regSigla = item.regiao?.sigla ?? "—";

  return (
    <TouchableOpacity
      style={[styles.card, cardStyle]}
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
        {/* Título maior e com 2 linhas */}
        <Text style={styles.title} numberOfLines={2}>
          {item.nome}
        </Text>

        <View style={styles.metaRow}>
          <View style={styles.pill}>
            <Text style={styles.pillText}>{regSigla}</Text>
          </View>
          <Text style={styles.ufText}>{item.sigla}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 100, // um pouco mais alto p/ caber 2 linhas
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#FFFFFF", // branco p/ destacar no fundo cinza
    borderRadius: 16,
    // sombra mais evidente (ainda suave)
    shadowColor: "#000",
    shadowOpacity: 0.10,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  flag: { width: 44, height: 32, borderRadius: 6, marginRight: 12 },

  badge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#E6EEFC",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  badgeText: { fontSize: 16, fontWeight: "700", color: "#111827" },

  info: { flex: 1, minWidth: 0 },
  // Título um pouco maior
  title: { fontSize: 15, fontWeight: "700", color: "#111827", lineHeight: 20 },
  metaRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  pill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: "#E9EDF9",
    marginRight: 8,
  },
  pillText: { fontSize: 11, fontWeight: "700", color: "#3B4B82" },
  ufText: { fontSize: 11, color: "#6B7280" },
});

// src/screens/HomeScreen.tsx
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  Platform,
  useWindowDimensions,
} from "react-native";
import { getEstados, getMunicipiosByEstadoId } from "../services/ibge";
import type { Estado, Municipio } from "../types/ibge";
import StateCard from "../components/StateCard";

export default function HomeScreen() {
  const [estados, setEstados] = useState<Estado[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // --- Grid: 3 colunas em native; responsivo no web ---
  const { width } = useWindowDimensions();
  const cols =
    Platform.OS === "web"
      ? width < 480
        ? 1
        : width < 900
        ? 2
        : width < 1300
        ? 3
        : 4
      : 3;

  const GAP = 12;
  const HPAD = 12; // padding horizontal
  const available = Math.max(0, width - HPAD * 2 - GAP * (cols - 1));
  const CARD_WIDTH = Math.floor(available / cols);

  async function load() {
    try {
      setLoading(true);
      const data = await getEstados();
      setEstados(data);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      Alert.alert("Erro", `Não foi possível carregar os estados.\n${msg}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function handlePress(estado: Estado) {
    try {
      const municipios: Municipio[] = await getMunicipiosByEstadoId(estado.id);
      const body =
        `Municípios: ${municipios.slice(0, 10).map((m) => m.nome).join(", ")}…` +
        `\n(+${Math.max(0, municipios.length - 10)} outros)`;

      if (Platform.OS === "web") {
        window.alert(`${estado.nome} (${estado.sigla})\n${body}`);
      } else {
        Alert.alert(`${estado.nome} (${estado.sigla})`, body);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (Platform.OS === "web") window.alert(`Falha ao carregar municípios.\n${msg}`);
      else Alert.alert("Erro", `Falha ao carregar municípios.\n${msg}`);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Estados do Brasil (IBGE)</Text>

      <FlatList
        key={`cols-${cols}`} // força remontar quando o nº de colunas muda (evita erro)
        data={estados}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <StateCard item={item} onPress={handlePress} cardWidth={CARD_WIDTH} />
        )}
        numColumns={cols}
        columnWrapperStyle={cols > 1 ? styles.row : undefined}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              await load();
              setRefreshing(false);
            }}
          />
        }
        ListEmptyComponent={
          !loading ? <Text style={styles.empty}>Nenhum estado encontrado.</Text> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    fontSize: 18,
    fontWeight: "800",
    marginTop: 12,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  row: {
    paddingHorizontal: 12,
    justifyContent: "space-between",
    marginBottom: 12,
  },
  listContent: {
    paddingTop: 12,
    paddingBottom: 24,
    paddingHorizontal: 12,
  },
  empty: { textAlign: "center", marginTop: 24, color: "#666" },
});

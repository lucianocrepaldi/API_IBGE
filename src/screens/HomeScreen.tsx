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

  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === "web";

  // 2 colunas em smartphones; 3+ em telas maiores / web
  const cols = isWeb
    ? width < 480
      ? 1
      : width < 900
      ? 2
      : width < 1300
      ? 3
      : 4
    : width < 600
    ? 2
    : 3;

  // Espaçamentos
  const GAP = 16;
  const HPAD = 16;

  // Largura de cada card considerando APENAS o padding do container e o gap entre colunas
  const available = Math.max(0, width - HPAD * 2 - GAP * (cols - 1));
  const CARD_WIDTH = Math.floor(available / cols);

  // Estilo dinâmico (sem inline) para largura do card
  const dyn = StyleSheet.create({
    cardW: { width: CARD_WIDTH },
  });

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

      if (isWeb) window.alert(`${estado.nome} (${estado.sigla})\n${body}`);
      else Alert.alert(`${estado.nome} (${estado.sigla})`, body);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (isWeb) window.alert(`Falha ao carregar municípios.\n${msg}`);
      else Alert.alert("Erro", `Falha ao carregar municípios.\n${msg}`);
    }
  }

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.headerWrap}>
        <Text style={styles.headerTitle}>Estados do Brasil (IBGE)</Text>
        <Text style={styles.headerSubtitle}>SALVE O CAPITÃO</Text>
      </View>

      {/* Lista */}
      <FlatList
        key={`cols-${cols}`}
        data={estados}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <StateCard item={item} onPress={handlePress} cardStyle={dyn.cardW} />
        )}
        numColumns={cols}
        // sem padding aqui; apenas gap horizontal + margem inferior
        columnWrapperStyle={cols > 1 ? styles.row : undefined}
        // o padding lateral fica SOMENTE no contentContainerStyle
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
  // Fundo suave para destacar os cards
  container: { flex: 1, backgroundColor: "#F2F4F7" },

  headerWrap: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 6,
  },
  headerTitle: {
    fontSize: 20, // maior
    fontWeight: "800",
    color: "#0F172A",
  },
  headerSubtitle: {
    marginTop: 2,
    fontSize: 12,
    fontWeight: "700",
    color: "#64748B",
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  // linha: apenas gap; sem padding horizontal
  row: {
    gap: 16,           // espaçamento horizontal IGUAL ao vertical
    marginBottom: 16,  // espaçamento vertical entre fileiras
  },

  // padding lateral/global da lista
  listContent: {
    paddingHorizontal: 16, // controla as bordas esquerda/direita
    paddingBottom: 28,
    paddingTop: 8,
  },

  empty: { textAlign: "center", marginTop: 24, color: "#64748B" },
});

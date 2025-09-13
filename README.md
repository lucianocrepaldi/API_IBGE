

# instalar dependências
npm install

# abrir o bundler
npm start
# Web: pressione "w" no terminal
# Mobile: abra o Expo Go e escaneie o QR code


# Dica: se mudar pacotes/SDK, rode com cache limpo:

npm start -- --clear

# Estrutura
assets/
  icon.png
  splash.png
  flags/AC.png ... TO.png       # bandeiras (placeholder com sigla)
src/
  components/
    StateCard.tsx               # card do estado (bandeira, nome, região, UF)
  screens/
    SplashScreen.tsx            # splash interna (2s)
    HomeScreen.tsx              # lista + grid responsivo
  services/
    ibge.ts                     # chamadas HTTP (estados, municípios)
  types/
    ibge.ts                     # tipos Estado, Municipio, Regiao
  constants/
    flags.ts                    # mapa UF -> require('assets/flags/UF.png')
App.tsx                         # controla splash -> home, safe-area
app.json                        # splash nativa, ícone, favicon (web)



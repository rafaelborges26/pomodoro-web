import 'styled-components' // importando para conseguir somente adicionar mais tipagens
import { defaultTheme } from '../styles/themes/default'

type ThemeType = typeof defaultTheme // pegando a tipagem do defaultThemes

declare module 'styled-components' {
  // adicionando a tipagem na lib
  export interface DefaultTheme extends ThemeType {}
}

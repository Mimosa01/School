export type ThemePreference = 'light' | 'dark' | 'system';
export type FontSize = 'small' | 'medium' | 'large';
export type RoomLabelMode = 'always' | 'never' | 'onZoom';

export interface AppSettings {
  theme: ThemePreference;
  fontSize: FontSize;
  roomLabels: RoomLabelMode;
}
export interface ISidebarAddSectionInputProps {
  placeholder: string;
  inputRef: React.RefObject<HTMLInputElement>;
  onBlur: () => void;
  onKeyUp: (_event: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  onCloseClick: () => void;
}

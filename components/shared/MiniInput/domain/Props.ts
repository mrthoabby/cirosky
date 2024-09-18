export interface IMiniInputProps {
  initialValue?: string;
  placeholder: string;
  isSubButton?: boolean;
  showSaveButton?: boolean;
  onClose: () => void;
  onSave: (value: string) => void;
}

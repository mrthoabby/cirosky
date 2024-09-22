export interface ISidebarNavProps {
  text: string;
  href: string;
  icon?: JSX.Element;
  isActive: boolean;
  onClick: () => void;
}

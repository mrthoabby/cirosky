import "react";

interface SidebarSectionButtonProps {
    text: string;
}

const SidebarSectionButton = ({ text }: SidebarSectionButtonProps) => {
    return (
        <button className="flex items-center justify-center gap-2 p-4 rounded-lg border border-transparent transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30">
            {text}sss
        </button>
    );
};

export default SidebarSectionButton;
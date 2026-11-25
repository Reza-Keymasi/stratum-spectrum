import AppCombobox from "@/shared/ui/AppCombobox";

interface Item {
  value: string;
  label: string;
}

interface ProjectSelectProps {
  name: string;
  items: Item[];
  value?: string;
  onSelectItem: (value: string) => void;
}

const TaskAttributeSelect = ({
  value = "",
  onSelectItem,
  items,
  name,
}: ProjectSelectProps) => {
  const handleSelectItem = (newValue: string | null) => {
    if (newValue && newValue !== value) {
      onSelectItem(newValue);
    }
  };

  return (
    <AppCombobox
      name={name}
      value={value}
      itemsArray={items}
      onChange={handleSelectItem}
      className="bg-transparent! border! shadow-none"
    />
  );
};

export default TaskAttributeSelect;

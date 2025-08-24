import ShoppingList from "@/components/shopping-list";

export default function Gifts() {
  return (
    <div className="min-h-screen w-full bg-background dark:bg-gray-900">
      <main className="container mx-auto px-4 pt-32 pb-8">
        <ShoppingList />
      </main>
    </div>
  );
}

import { getListCategory } from "@/services/user/category/category.service";
import CategoriesFilter from "./component/CategoriesFilter";

export default async function CategoriesPage() {
  const categories = await getListCategory();

  return (
    <div className="flex w-full px-8 py-8 gap-4">
      {/* Categories (Client Component) */}
      <CategoriesFilter categories={categories} />

      {/* Content SEO */}
      <div className="flex-[7] border rounded-md p-4">
        <h1 className="text-xl font-semibold">Content</h1>
        <p>Nội dung này sẽ được crawl SEO đầy đủ 🚀</p>
      </div>
    </div>
  );
}

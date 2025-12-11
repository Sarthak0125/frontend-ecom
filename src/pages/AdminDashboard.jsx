import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../redux/slices/categorySlice";

export default function AdminCategories() {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.category);

  const [name, setName] = useState("");
  const [editing, setEditing] = useState(null);
  const [updateName, setUpdateName] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAdd = () => {
    if (!name) return;
    dispatch(createCategory(name));
    setName("");
  };

  const handleUpdate = (id) => {
    dispatch(updateCategory({ id, name: updateName }));
    setEditing(null);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this?")) return;
    dispatch(deleteCategory(id));
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>

      {/* Add category */}
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Category name"
          className="border px-2 py-1 flex-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-green-600 text-white px-4 py-1 rounded"
        >
          Add
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id} className="border">
              <td className="p-2">
                {editing === cat._id ? (
                  <input
                    value={updateName}
                    onChange={(e) => setUpdateName(e.target.value)}
                    className="border px-2 py-1"
                  />
                ) : (
                  cat.name
                )}
              </td>
              <td className="p-2 flex gap-2">
                {editing === cat._id ? (
                  <button
                    onClick={() => handleUpdate(cat._id)}
                    className="bg-blue-600 text-white px-2 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditing(cat._id);
                      setUpdateName(cat.name);
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => handleDelete(cat._id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

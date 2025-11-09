import React, { useState } from "react";
import { router } from "@inertiajs/react";

export default function VideoSettingEdit({ setting }) {
  const [form, setForm] = useState({
    title: setting?.title || "",
    video_url: setting?.video_url || "",
    message: setting?.message || "",
    purchase_link: setting?.purchase_link || "",
  });

  const [errors, setErrors] = useState({}); // store backend validation errors

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({}); // clear previous errors

    router.post("/video-settings", form, {
      onError: (err) => {
        setErrors(err); // show errors to user
      },
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 shadow rounded-xl">
      <h2 className="text-xl font-bold mb-4">🎥 Update Video Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        
        {/* Title */}
        <div>
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        {/* Video URL */}
        <div>
          <input
            type="text"
            placeholder="Video URL"
            value={form.video_url}
            onChange={(e) => setForm({ ...form, video_url: e.target.value })}
            className="w-full border p-2 rounded"
            required
          />
          {errors.video_url && (
            <p className="text-red-500 text-sm mt-1">{errors.video_url}</p>
          )}
        </div>

        {/* Message */}
        <div>
          <textarea
            placeholder="Message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full border p-2 rounded"
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        {/* Purchase Link */}
        <div>
          <input
            type="text"
            placeholder="Purchase Link"
            value={form.purchase_link}
            onChange={(e) =>
              setForm({ ...form, purchase_link: e.target.value })
            }
            className="w-full border p-2 rounded"
          />
          {errors.purchase_link && (
            <p className="text-red-500 text-sm mt-1">{errors.purchase_link}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </div>
  );
}

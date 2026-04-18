"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Plus,
  Trash2,
  Pencil,
  ToggleLeft,
  ToggleRight,
  X,
  Save,
  AlertCircle,
  Image as ImageIcon,
} from "lucide-react";
import {
  getBanners,
  saveBanner,
  deleteBanner,
  toggleBanner,
} from "@/lib/admin/adminData";
import type { Banner } from "@/lib/admin/adminData";

function BannerModal({
  onClose,
  onSave,
  initial,
}: {
  onClose: () => void;
  onSave: (b: Banner) => void;
  initial?: Banner;
}) {
  const [form, setForm] = useState({
    title: initial?.title || "",
    subtitle: initial?.subtitle || "",
    description: initial?.description || "",
    ctaText: initial?.ctaText || "Shop Now",
    ctaLink: initial?.ctaLink || "/shop",
    imageUrl: initial?.imageUrl || "",
    active: initial?.active ?? true,
    order: initial?.order || 1,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.imageUrl.trim()) e.imageUrl = "Image URL is required";
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    const b: Banner = {
      id: initial?.id || crypto.randomUUID(),
      ...form,
      createdAt: initial?.createdAt || new Date().toISOString(),
    };
    onSave(b);
  };

  const inputCls =
    "w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm outline-none focus:border-amber-400 transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl my-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 sticky top-0 bg-white rounded-t-2xl">
          <h2 className="font-semibold" style={{ color: "var(--brand-dark)" }}>
            {initial ? "Edit Banner" : "New Banner"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          {/* Preview */}
          {form.imageUrl && (
            <div className="relative h-28 rounded-xl overflow-hidden bg-stone-100">
              <Image
                src={form.imageUrl}
                alt="preview"
                fill
                className="object-cover"
                onError={() => {}}
              />
              <div
                className="absolute inset-0 flex items-end p-3"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
                }}
              >
                <div>
                  {form.subtitle && (
                    <p className="text-white text-xs font-semibold opacity-80">
                      {form.subtitle}
                    </p>
                  )}
                  {form.title && (
                    <p className="text-white text-sm font-bold">{form.title}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--brand-dark)" }}
            >
              Image URL *
            </label>
            <input
              value={form.imageUrl}
              onChange={(e) => {
                setForm((f) => ({ ...f, imageUrl: e.target.value }));
                setErrors((e2) => ({ ...e2, imageUrl: "" }));
              }}
              placeholder="https://images.unsplash.com/..."
              className={inputCls}
            />
            {errors.imageUrl && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={11} /> {errors.imageUrl}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label
                className="text-sm font-medium"
                style={{ color: "var(--brand-dark)" }}
              >
                Title *
              </label>
              <input
                value={form.title}
                onChange={(e) => {
                  setForm((f) => ({ ...f, title: e.target.value }));
                  setErrors((e2) => ({ ...e2, title: "" }));
                }}
                placeholder="Hydrate with intention."
                className={inputCls}
              />
              {errors.title && (
                <p className="text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle size={11} /> {errors.title}
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <label
                className="text-sm font-medium"
                style={{ color: "var(--brand-dark)" }}
              >
                Subtitle
              </label>
              <input
                value={form.subtitle}
                onChange={(e) =>
                  setForm((f) => ({ ...f, subtitle: e.target.value }))
                }
                placeholder="New Collection"
                className={inputCls}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--brand-dark)" }}
            >
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              placeholder="Short description for the banner..."
              rows={2}
              className="w-full px-3.5 py-3 rounded-xl border border-stone-200 bg-stone-50 text-sm outline-none focus:border-amber-400 transition-colors resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label
                className="text-sm font-medium"
                style={{ color: "var(--brand-dark)" }}
              >
                CTA Text
              </label>
              <input
                value={form.ctaText}
                onChange={(e) =>
                  setForm((f) => ({ ...f, ctaText: e.target.value }))
                }
                placeholder="Shop Now"
                className={inputCls}
              />
            </div>
            <div className="space-y-1.5">
              <label
                className="text-sm font-medium"
                style={{ color: "var(--brand-dark)" }}
              >
                CTA Link
              </label>
              <input
                value={form.ctaLink}
                onChange={(e) =>
                  setForm((f) => ({ ...f, ctaLink: e.target.value }))
                }
                placeholder="/shop"
                className={inputCls}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 items-center">
            <div className="space-y-1.5">
              <label
                className="text-sm font-medium"
                style={{ color: "var(--brand-dark)" }}
              >
                Display Order
              </label>
              <input
                type="number"
                min={1}
                value={form.order}
                onChange={(e) =>
                  setForm((f) => ({ ...f, order: Number(e.target.value) }))
                }
                className={inputCls}
              />
            </div>
            <label className="flex items-center gap-2.5 cursor-pointer mt-5">
              <div
                className="relative w-10 h-5 rounded-full transition-colors"
                style={{
                  backgroundColor: form.active
                    ? "var(--brand-sage)"
                    : "#D1D5DB",
                }}
                onClick={() => setForm((f) => ({ ...f, active: !f.active }))}
              >
                <div
                  className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                    form.active ? "translate-x-5" : "translate-x-0.5"
                  }`}
                />
              </div>
              <span className="text-sm" style={{ color: "var(--brand-dark)" }}>
                {form.active ? "Active" : "Inactive"}
              </span>
            </label>
          </div>
        </div>

        <div className="flex gap-3 px-6 pb-5">
          <button
            onClick={onClose}
            className="flex-1 h-10 rounded-xl text-sm font-medium border border-stone-200 text-stone-500 hover:bg-stone-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 h-10 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90"
            style={{ backgroundColor: "var(--brand-earth)" }}
          >
            <Save size={15} />
            Save Banner
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [modal, setModal] = useState<null | "new" | Banner>(null);
  const [delConfirm, setDelConfirm] = useState<string | null>(null);

  const load = () => setBanners(getBanners().sort((a, b) => a.order - b.order));
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const handleSave = (b: Banner) => {
    saveBanner(b);
    load();
    setModal(null);
  };

  const handleDelete = (id: string) => {
    deleteBanner(id);
    load();
    setDelConfirm(null);
  };

  const handleToggle = (id: string) => {
    toggleBanner(id);
    load();
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto">
      {modal && (
        <BannerModal
          onClose={() => setModal(null)}
          onSave={handleSave}
          initial={modal !== "new" ? modal : undefined}
        />
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--brand-dark)" }}
          >
            Banners
          </h1>
          <p className="text-sm text-stone-400 mt-0.5">
            {banners.filter((b) => b.active).length} active banners
          </p>
        </div>
        <button
          onClick={() => setModal("new")}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: "var(--brand-earth)" }}
        >
          <Plus size={16} />
          New Banner
        </button>
      </div>

      {/* Banners */}
      {banners.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-100 py-16 text-center text-stone-400">
          <ImageIcon size={32} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm font-medium">No banners yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className={`bg-white rounded-2xl border overflow-hidden transition-all ${
                banner.active
                  ? "border-stone-100"
                  : "border-stone-100 opacity-70"
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr_auto] gap-0">
                {/* Preview Image */}
                <div className="relative h-28 sm:w-48 sm:h-auto shrink-0 bg-stone-100">
                  <Image
                    src={banner.imageUrl}
                    alt={banner.title}
                    fill
                    className="object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "rgba(0,0,0,0.3)" }}
                  />
                  <div className="absolute bottom-2 left-3 right-3">
                    <p className="text-white text-xs font-semibold opacity-70 truncate">
                      {banner.subtitle}
                    </p>
                    <p className="text-white text-sm font-bold truncate">
                      {banner.title}
                    </p>
                  </div>
                </div>

                {/* Info */}
                <div className="px-5 py-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3
                      className="font-semibold text-sm"
                      style={{ color: "var(--brand-dark)" }}
                    >
                      {banner.title}
                    </h3>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        banner.active
                          ? "bg-green-100 text-green-700"
                          : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {banner.active ? "Active" : "Inactive"}
                    </span>
                    <span className="text-xs text-stone-400">
                      Order: #{banner.order}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 line-clamp-2 mb-2">
                    {banner.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-stone-400">
                    <span
                      className="px-2 py-0.5 rounded-lg font-medium"
                      style={{
                        backgroundColor: "var(--brand-sand)",
                        color: "var(--brand-earth)",
                      }}
                    >
                      {banner.ctaText}
                    </span>
                    <span>→ {banner.ctaLink}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex sm:flex-col gap-2 px-4 py-4 border-t sm:border-t-0 sm:border-l border-stone-100 items-center justify-center">
                  <button
                    onClick={() => handleToggle(banner.id)}
                    className="p-2 rounded-xl hover:bg-stone-50 transition-colors"
                    style={{
                      color: banner.active ? "var(--brand-sage)" : "#9CA3AF",
                    }}
                    title={banner.active ? "Disable" : "Enable"}
                  >
                    {banner.active ? (
                      <ToggleRight size={20} />
                    ) : (
                      <ToggleLeft size={20} />
                    )}
                  </button>
                  <button
                    onClick={() => setModal(banner)}
                    className="p-2 rounded-xl hover:bg-stone-50 transition-colors text-stone-400 hover:text-stone-700"
                  >
                    <Pencil size={16} />
                  </button>
                  {delConfirm === banner.id ? (
                    <div className="flex flex-col gap-1.5">
                      <button
                        onClick={() => handleDelete(banner.id)}
                        className="px-3 py-1 rounded-xl text-xs font-medium bg-red-50 text-red-600"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setDelConfirm(null)}
                        className="px-3 py-1 rounded-xl text-xs font-medium bg-stone-100 text-stone-500"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDelConfirm(banner.id)}
                      className="p-2 rounded-xl hover:bg-red-50 transition-colors text-stone-400 hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

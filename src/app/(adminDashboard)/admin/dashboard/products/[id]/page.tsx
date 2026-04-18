"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, Save, AlertCircle } from "lucide-react";
import Link from "next/link";
import { getAdminProducts, saveProduct } from "@/lib/admin/adminData";
import type { AdminProduct } from "@/lib/admin/adminData";

const emptyProduct: Omit<AdminProduct, "id" | "createdAt"> = {
  slug: "",
  name: "",
  tagline: "",
  description: "",
  price: 0,
  originalPrice: undefined,
  images: [{ url: "", alt: "" }],
  stock: 0,
  totalSold: 0,
  category: "",
  tags: [],
  features: [],
  metaTitle: "",
  metaDescription: "",
  featured: false,
  status: "draft",
};

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label
        className="text-sm font-medium flex gap-1"
        style={{ color: "var(--brand-dark)" }}
      >
        {label}
        {required && <span style={{ color: "var(--brand-earth)" }}>*</span>}
      </label>
      {children}
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle size={11} />
          {error}
        </p>
      )}
    </div>
  );
}

const inputCls =
  "w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-white text-sm outline-none focus:border-amber-400 transition-colors";
const textareaCls =
  "w-full px-3.5 py-3 rounded-xl border border-stone-200 bg-white text-sm outline-none focus:border-amber-400 transition-colors resize-none";

export default function ProductFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const isNew = id === "new";

  const [form, setForm] =
    useState<Omit<AdminProduct, "id" | "createdAt">>(emptyProduct);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [tagsInput, setTagsInput] = useState("");
  const [featuresInput, setFeaturesInput] = useState("");

  useEffect(() => {
    if (!isNew) {
      const products = getAdminProducts();
      const existing = products.find((p) => p.id === id);
      if (existing) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id: _id, createdAt: _ca, ...rest } = existing;
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setForm(rest);
        setTagsInput(existing.tags.join(", "));
        setFeaturesInput(existing.features.join("\n"));
      }
    }
  }, [id, isNew]);

  const set = (k: string, v: unknown) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.slug.trim()) e.slug = "Slug is required";
    if (!form.category.trim()) e.category = "Category is required";
    if (form.price <= 0) e.price = "Price must be greater than 0";
    if (!form.images[0]?.url.trim())
      e.imageUrl = "At least one image URL is required";
    return e;
  };

  const handleSave = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setSaving(true);

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const features = featuresInput
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    const product: AdminProduct = {
      ...form,
      id: isNew ? crypto.randomUUID() : id,
      tags,
      features,
      createdAt: isNew
        ? new Date().toISOString()
        : getAdminProducts().find((p) => p.id === id)?.createdAt ||
          new Date().toISOString(),
    };

    await new Promise((r) => setTimeout(r, 400));
    saveProduct(product);
    setSaving(false);
    router.push("/admin/products");
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/products"
          className="p-2 rounded-xl hover:bg-stone-100 transition-colors text-stone-400"
        >
          <ChevronLeft size={20} />
        </Link>
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--brand-dark)" }}
          >
            {isNew ? "Add New Product" : "Edit Product"}
          </h1>
          <p className="text-sm text-stone-400 mt-0.5">
            {isNew ? "Create a new product listing" : `Editing: ${form.name}`}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Main form */}
        <div className="lg:col-span-2 space-y-5">
          {/* Basic Info */}
          <div className="bg-white rounded-2xl border border-stone-100 p-5 space-y-4">
            <h2
              className="font-semibold text-sm"
              style={{ color: "var(--brand-dark)" }}
            >
              Basic Information
            </h2>
            <Field label="Product Name" required error={errors.name}>
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Aurora Frosted Glass Bottle"
                className={inputCls}
              />
            </Field>
            <Field label="URL Slug" required error={errors.slug}>
              <input
                value={form.slug}
                onChange={(e) =>
                  set("slug", e.target.value.toLowerCase().replace(/\s+/g, "-"))
                }
                placeholder="aurora-frosted-glass-bottle"
                className={inputCls}
              />
            </Field>
            <Field label="Tagline">
              <input
                value={form.tagline}
                onChange={(e) => set("tagline", e.target.value)}
                placeholder="The bottle that actually fits your aesthetic."
                className={inputCls}
              />
            </Field>
            <Field label="Category" required error={errors.category}>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className={inputCls + " cursor-pointer"}
              >
                <option value="">Select category</option>
                <option>Water Bottles</option>
                <option>Tumblers</option>
                <option>Gift Sets</option>
                <option>Accessories</option>
              </select>
            </Field>
            <Field label="Description">
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Product description..."
                rows={5}
                className={textareaCls}
              />
            </Field>
          </div>

          {/* Pricing & Inventory */}
          <div className="bg-white rounded-2xl border border-stone-100 p-5 space-y-4">
            <h2
              className="font-semibold text-sm"
              style={{ color: "var(--brand-dark)" }}
            >
              Pricing & Inventory
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Price (৳)" required error={errors.price}>
                <input
                  type="number"
                  value={form.price || ""}
                  onChange={(e) => set("price", Number(e.target.value))}
                  placeholder="650"
                  className={inputCls}
                />
              </Field>
              <Field label="Original Price (৳)">
                <input
                  type="number"
                  value={form.originalPrice || ""}
                  onChange={(e) =>
                    set(
                      "originalPrice",
                      e.target.value ? Number(e.target.value) : undefined,
                    )
                  }
                  placeholder="850"
                  className={inputCls}
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Stock">
                <input
                  type="number"
                  value={form.stock || ""}
                  onChange={(e) => set("stock", Number(e.target.value))}
                  placeholder="10"
                  className={inputCls}
                />
              </Field>
              <Field label="Total Sold">
                <input
                  type="number"
                  value={form.totalSold || ""}
                  onChange={(e) => set("totalSold", Number(e.target.value))}
                  placeholder="0"
                  className={inputCls}
                />
              </Field>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-2xl border border-stone-100 p-5 space-y-4">
            <h2
              className="font-semibold text-sm"
              style={{ color: "var(--brand-dark)" }}
            >
              Images
            </h2>
            {form.images.map((img, i) => (
              <div key={i} className="grid grid-cols-[1fr_auto] gap-3">
                <div className="space-y-2">
                  <Field
                    label={`Image ${i + 1} URL`}
                    error={i === 0 ? errors.imageUrl : undefined}
                  >
                    <input
                      value={img.url}
                      onChange={(e) => {
                        const imgs = [...form.images];
                        imgs[i] = { ...imgs[i], url: e.target.value };
                        set("images", imgs);
                      }}
                      placeholder="https://images.unsplash.com/..."
                      className={inputCls}
                    />
                  </Field>
                  <input
                    value={img.alt}
                    onChange={(e) => {
                      const imgs = [...form.images];
                      imgs[i] = { ...imgs[i], alt: e.target.value };
                      set("images", imgs);
                    }}
                    placeholder="Alt text"
                    className={inputCls}
                  />
                </div>
                {form.images.length > 1 && (
                  <button
                    onClick={() => {
                      const imgs = form.images.filter((_, j) => j !== i);
                      set("images", imgs);
                    }}
                    className="mt-7 p-2 h-10 rounded-xl text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors self-start"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={() =>
                set("images", [...form.images, { url: "", alt: "" }])
              }
              className="text-sm font-medium hover:underline"
              style={{ color: "var(--brand-earth)" }}
            >
              + Add another image
            </button>
          </div>

          {/* Tags & Features */}
          <div className="bg-white rounded-2xl border border-stone-100 p-5 space-y-4">
            <h2
              className="font-semibold text-sm"
              style={{ color: "var(--brand-dark)" }}
            >
              Tags & Features
            </h2>
            <Field label="Tags (comma separated)">
              <input
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="aesthetic, glass, desk setup"
                className={inputCls}
              />
            </Field>
            <Field label="Features (one per line)">
              <textarea
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
                placeholder={
                  "500ml borosilicate glass\nAnti-slip silicone sleeve\nLeakproof bamboo lid"
                }
                rows={5}
                className={textareaCls}
              />
            </Field>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-2xl border border-stone-100 p-5 space-y-4">
            <h2
              className="font-semibold text-sm"
              style={{ color: "var(--brand-dark)" }}
            >
              SEO
            </h2>
            <Field label="Meta Title">
              <input
                value={form.metaTitle}
                onChange={(e) => set("metaTitle", e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Meta Description">
              <textarea
                value={form.metaDescription}
                onChange={(e) => set("metaDescription", e.target.value)}
                rows={2}
                className={textareaCls}
              />
            </Field>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          {/* Status & Options */}
          <div className="bg-white rounded-2xl border border-stone-100 p-5 space-y-4">
            <h2
              className="font-semibold text-sm"
              style={{ color: "var(--brand-dark)" }}
            >
              Status
            </h2>
            <Field label="Product Status">
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                className={inputCls + " cursor-pointer"}
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </Field>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => set("featured", e.target.checked)}
                className="w-4 h-4 rounded"
                style={{ accentColor: "var(--brand-earth)" }}
              />
              <span className="text-sm" style={{ color: "var(--brand-dark)" }}>
                Featured product
              </span>
            </label>
          </div>

          {/* Save */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full h-11 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: "var(--brand-dark)" }}
          >
            {saving ? (
              <>
                <span
                  className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
                  style={{
                    borderColor: "white",
                    borderTopColor: "transparent",
                  }}
                />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                {isNew ? "Create Product" : "Save Changes"}
              </>
            )}
          </button>

          <Link
            href="/admin/products"
            className="w-full h-11 rounded-xl text-sm font-medium border border-stone-200 flex items-center justify-center gap-2 hover:bg-stone-50 transition-colors"
            style={{ color: "var(--brand-dark)" }}
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}

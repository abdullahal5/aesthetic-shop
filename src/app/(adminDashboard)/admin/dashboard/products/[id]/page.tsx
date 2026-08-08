"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft, Save, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useCreateProduct, useProduct, useUpdateProduct } from "@/hooks/product/useProduct";

// Field component for form inputs with validation
function Field({
  label,
  required,
  error,
  children,
  description,
}: {
  label: string;
  required?: boolean;
  error?: string;
  description?: string;
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
      {description && <p className="text-xs text-stone-400">{description}</p>}
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
  "w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-white text-sm outline-none focus:border-amber-400 transition-colors disabled:bg-stone-50 disabled:text-stone-400";
const textareaCls =
  "w-full px-3.5 py-3 rounded-xl border border-stone-200 bg-white text-sm outline-none focus:border-amber-400 transition-colors resize-none disabled:bg-stone-50 disabled:text-stone-400";

// Empty product template matching your schema
const emptyProduct = {
  slug: "",
  name: "",
  tagline: "",
  description: "",
  price: 0,
  originalPrice: undefined as number | undefined,
  images: [{ url: "", alt: "" }],
  stock: 0,
  totalSold: 0,
  category: "",
  tags: [] as string[],
  features: [] as string[],
  metaTitle: "",
  metaDescription: "",
  featured: false,
  status: "draft" as "active" | "draft" | "archived",
};

export default function ProductFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const isNew = id === "new";

  const [form, setForm] = useState(emptyProduct);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [tagsInput, setTagsInput] = useState("");
  const [featuresInput, setFeaturesInput] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  // Fetch existing product if editing (only when we have a valid id)
  const {
    data: existingProduct,
    isLoading,
    isError,
    error,
  } = useProduct(isNew || !id ? "" : id);

  // Initialize form from existing product data
  useEffect(() => {
    if (existingProduct && !isNew && !isInitialized) {
      const newForm = {
        slug: existingProduct.slug || "",
        name: existingProduct.name || "",
        tagline: existingProduct.tagline || "",
        description: existingProduct.description || "",
        price: existingProduct.price || 0,
        originalPrice: existingProduct.originalPrice,
        images: existingProduct.images?.length
          ? existingProduct.images
          : [{ url: "", alt: "" }],
        stock: existingProduct.stock || 0,
        totalSold: existingProduct.totalSold || 0,
        category: existingProduct.category || "",
        tags: existingProduct.tags || [],
        features: existingProduct.features || [],
        metaTitle: existingProduct.metaTitle || "",
        metaDescription: existingProduct.metaDescription || "",
        featured: existingProduct.featured || false,
        status: existingProduct.status || "draft",
      };

      setForm(newForm);
      setTagsInput((existingProduct.tags || []).join(", "));
      setFeaturesInput((existingProduct.features || []).join("\n"));
      setIsInitialized(true);
    }
  }, [existingProduct, isNew, isInitialized]);

  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();

  const setField = (key: string, value: unknown) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.slug.trim()) e.slug = "Slug is required";
    if (!form.category.trim()) e.category = "Category is required";
    if (form.price <= 0) e.price = "Price must be greater than 0";
    if (!form.images[0]?.url?.trim())
      e.imageUrl = "At least one image URL is required";
    return e;
  };

  const handleSave = async () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Process tags and features
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const features = featuresInput
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);

    const productData = {
      ...form,
      tags,
      features,
      // Ensure images have alt text if missing
      images: form.images.map((img) => ({
        url: img.url.trim(),
        alt: img.alt || "",
      })),
    };

    try {
      if (isNew) {
        await createProductMutation.mutateAsync(productData);
      } else {
        await updateProductMutation.mutateAsync({
          id,
          payload: productData,
        });
      }
      router.push("/admin/dashboard/products");
    } catch (err) {
      console.error("Save failed:", err);
      // Error handling is done in the mutation's onError
    }
  };

  // Loading state
  if (!isNew && isLoading) {
    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2
              size={40}
              className="animate-spin mx-auto mb-4"
              style={{ color: "var(--brand-earth)" }}
            />
            <p className="text-stone-500">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (!isNew && isError) {
    return (
      <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
          <AlertCircle size={48} className="mx-auto mb-4 text-red-400" />
          <h2 className="text-lg font-semibold text-red-700 mb-2">
            Failed to load product
          </h2>
          <p className="text-red-600 text-sm mb-4">
            {error?.message || "An error occurred while fetching the product."}
          </p>
          <Link
            href="/admin/dashboard/products"
            className="inline-flex items-center gap-2 px-4 py-2 bg-stone-100 text-stone-700 rounded-xl text-sm font-medium hover:bg-stone-200 transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const isSaving =
    createProductMutation.isPending || updateProductMutation.isPending;

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/dashboard/products"
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
            {isNew
              ? "Create a new product listing"
              : `Editing: ${form.name || "Product"}`}
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
                onChange={(e) => setField("name", e.target.value)}
                placeholder="Aurora Frosted Glass Bottle"
                className={inputCls}
                disabled={isSaving}
              />
            </Field>
            <Field
              label="URL Slug"
              required
              error={errors.slug}
              description="URL-friendly version of the name. Used in product links."
            >
              <input
                value={form.slug}
                onChange={(e) =>
                  setField(
                    "slug",
                    e.target.value.toLowerCase().replace(/\s+/g, "-"),
                  )
                }
                placeholder="aurora-frosted-glass-bottle"
                className={inputCls}
                disabled={isSaving}
              />
            </Field>
            <Field label="Tagline">
              <input
                value={form.tagline}
                onChange={(e) => setField("tagline", e.target.value)}
                placeholder="The bottle that actually fits your aesthetic."
                className={inputCls}
                disabled={isSaving}
              />
            </Field>
            <Field label="Category" required error={errors.category}>
              <select
                value={form.category}
                onChange={(e) => setField("category", e.target.value)}
                className={inputCls + " cursor-pointer"}
                disabled={isSaving}
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
                onChange={(e) => setField("description", e.target.value)}
                placeholder="Product description..."
                rows={5}
                className={textareaCls}
                disabled={isSaving}
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
              <Field
                label="Price (৳)"
                required
                error={errors.price}
                description="Current selling price"
              >
                <input
                  type="number"
                  value={form.price || ""}
                  onChange={(e) => setField("price", Number(e.target.value))}
                  placeholder="650"
                  className={inputCls}
                  disabled={isSaving}
                />
              </Field>
              <Field
                label="Original Price (৳)"
                description="Higher price shown as strikethrough (for sales)"
              >
                <input
                  type="number"
                  value={form.originalPrice || ""}
                  onChange={(e) =>
                    setField(
                      "originalPrice",
                      e.target.value ? Number(e.target.value) : undefined,
                    )
                  }
                  placeholder="850"
                  className={inputCls}
                  disabled={isSaving}
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Stock" description="Available quantity">
                <input
                  type="number"
                  value={form.stock || ""}
                  onChange={(e) => setField("stock", Number(e.target.value))}
                  placeholder="10"
                  className={inputCls}
                  disabled={isSaving}
                />
              </Field>
              <Field label="Total Sold" description="Lifetime sales count">
                <input
                  type="number"
                  value={form.totalSold || ""}
                  onChange={(e) =>
                    setField("totalSold", Number(e.target.value))
                  }
                  placeholder="0"
                  className={inputCls}
                  disabled={isSaving}
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
                    description={i === 0 ? "Main product image" : ""}
                  >
                    <input
                      value={img.url}
                      onChange={(e) => {
                        const imgs = [...form.images];
                        imgs[i] = { ...imgs[i], url: e.target.value };
                        setField("images", imgs);
                      }}
                      placeholder="https://images.unsplash.com/..."
                      className={inputCls}
                      disabled={isSaving}
                    />
                  </Field>
                  <input
                    value={img.alt}
                    onChange={(e) => {
                      const imgs = [...form.images];
                      imgs[i] = { ...imgs[i], alt: e.target.value };
                      setField("images", imgs);
                    }}
                    placeholder="Alt text (for accessibility)"
                    className={inputCls}
                    disabled={isSaving}
                  />
                </div>
                {form.images.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const imgs = form.images.filter((_, j) => j !== i);
                      setField("images", imgs);
                    }}
                    className="mt-7 p-2 h-10 rounded-xl text-stone-400 hover:text-red-500 hover:bg-red-50 transition-colors self-start"
                    disabled={isSaving}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setField("images", [...form.images, { url: "", alt: "" }])
              }
              className="text-sm font-medium hover:underline"
              style={{ color: "var(--brand-earth)" }}
              disabled={isSaving}
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
            <Field
              label="Tags"
              description="Comma-separated values. Used for filtering and search."
            >
              <input
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                placeholder="aesthetic, glass, desk setup"
                className={inputCls}
                disabled={isSaving}
              />
            </Field>
            <Field
              label="Features"
              description="One per line. Displayed as bullet points on product page."
            >
              <textarea
                value={featuresInput}
                onChange={(e) => setFeaturesInput(e.target.value)}
                placeholder={
                  "500ml borosilicate glass\nAnti-slip silicone sleeve\nLeakproof bamboo lid"
                }
                rows={5}
                className={textareaCls}
                disabled={isSaving}
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
            <Field
              label="Meta Title"
              description="Appears in search results. Leave empty to use product name."
            >
              <input
                value={form.metaTitle}
                onChange={(e) => setField("metaTitle", e.target.value)}
                className={inputCls}
                disabled={isSaving}
              />
            </Field>
            <Field
              label="Meta Description"
              description="Appears below title in search results. 150-160 characters recommended."
            >
              <textarea
                value={form.metaDescription}
                onChange={(e) => setField("metaDescription", e.target.value)}
                rows={2}
                className={textareaCls}
                disabled={isSaving}
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
              Status & Options
            </h2>
            <Field label="Product Status">
              <select
                value={form.status}
                onChange={(e) =>
                  setField("status", e.target.value as typeof form.status)
                }
                className={inputCls + " cursor-pointer"}
                disabled={isSaving}
              >
                <option value="active">Active (Visible in store)</option>
                <option value="draft">Draft (Hidden from customers)</option>
                <option value="archived">Archived (Removed from store)</option>
              </select>
            </Field>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setField("featured", e.target.checked)}
                className="w-4 h-4 rounded"
                style={{ accentColor: "var(--brand-earth)" }}
                disabled={isSaving}
              />
              <span className="text-sm" style={{ color: "var(--brand-dark)" }}>
                Featured product
              </span>
            </label>
            <p className="text-xs text-stone-400 mt-2">
              Featured products appear on the homepage and special sections.
            </p>
          </div>

          {/* Save Actions */}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full h-11 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60"
            style={{ backgroundColor: "var(--brand-dark)" }}
          >
            {isSaving ? (
              <>
                <Loader2 size={16} className="animate-spin" />
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
            href="/admin/dashboard/products"
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

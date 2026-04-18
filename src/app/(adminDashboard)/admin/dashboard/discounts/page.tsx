"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Tag,
  ToggleLeft,
  ToggleRight,
  X,
  Save,
  AlertCircle,
} from "lucide-react";
import {
  getDiscounts,
  saveDiscount,
  deleteDiscount,
  toggleDiscount,
} from "@/lib/admin/adminData";
import type { Discount } from "@/lib/admin/adminData";

function Modal({
  onClose,
  onSave,
  initial,
}: {
  onClose: () => void;
  onSave: (d: Discount) => void;
  initial?: Discount;
}) {
  const [form, setForm] = useState({
    code: initial?.code || "",
    discount: initial?.discount || 0,
    description: initial?.description || "",
    active: initial?.active ?? true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.code.trim()) e.code = "Code is required";
    if (form.discount <= 0 || form.discount > 100)
      e.discount = "Discount must be between 1-100%";
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    const d: Discount = {
      id: initial?.id || crypto.randomUUID(),
      code: form.code.toUpperCase().trim(),
      discount: Number(form.discount),
      description: form.description,
      active: form.active,
      usageCount: initial?.usageCount || 0,
      createdAt: initial?.createdAt || new Date().toISOString(),
    };
    onSave(d);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <h2 className="font-semibold" style={{ color: "var(--brand-dark)" }}>
            {initial ? "Edit Coupon" : "New Coupon"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5 space-y-4">
          <div className="space-y-1.5">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--brand-dark)" }}
            >
              Coupon Code *
            </label>
            <input
              value={form.code}
              onChange={(e) => {
                setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }));
                setErrors((e2) => ({ ...e2, code: "" }));
              }}
              placeholder="WELCOME10"
              className="w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm font-mono outline-none focus:border-amber-400 transition-colors uppercase"
            />
            {errors.code && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={11} /> {errors.code}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--brand-dark)" }}
            >
              Discount % *
            </label>
            <div className="relative">
              <input
                type="number"
                min={1}
                max={100}
                value={form.discount || ""}
                onChange={(e) => {
                  setForm((f) => ({ ...f, discount: Number(e.target.value) }));
                  setErrors((e2) => ({ ...e2, discount: "" }));
                }}
                placeholder="10"
                className="w-full h-10 px-3.5 pr-8 rounded-xl border border-stone-200 bg-stone-50 text-sm outline-none focus:border-amber-400 transition-colors"
              />
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-stone-400">
                %
              </span>
            </div>
            {errors.discount && (
              <p className="text-xs text-red-500 flex items-center gap-1">
                <AlertCircle size={11} /> {errors.discount}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              className="text-sm font-medium"
              style={{ color: "var(--brand-dark)" }}
            >
              Description
            </label>
            <input
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              placeholder="Welcome discount for new customers"
              className="w-full h-10 px-3.5 rounded-xl border border-stone-200 bg-stone-50 text-sm outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <div
              className="relative w-10 h-5 rounded-full transition-colors"
              style={{
                backgroundColor: form.active ? "var(--brand-sage)" : "#D1D5DB",
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
            Save Coupon
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminDiscountsPage() {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [modal, setModal] = useState<null | "new" | Discount>(null);
  const [delConfirm, setDelConfirm] = useState<string | null>(null);

  const load = () => setDiscounts(getDiscounts());
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
  }, []);

  const handleSave = (d: Discount) => {
    saveDiscount(d);
    load();
    setModal(null);
  };

  const handleDelete = (id: string) => {
    deleteDiscount(id);
    load();
    setDelConfirm(null);
  };

  const handleToggle = (id: string) => {
    toggleDiscount(id);
    load();
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto">
      {modal && (
        <Modal
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
            Discounts
          </h1>
          <p className="text-sm text-stone-400 mt-0.5">
            {discounts.filter((d) => d.active).length} active coupons
          </p>
        </div>
        <button
          onClick={() => setModal("new")}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ backgroundColor: "var(--brand-earth)" }}
        >
          <Plus size={16} />
          New Coupon
        </button>
      </div>

      {/* Grid */}
      {discounts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-100 py-16 text-center text-stone-400">
          <Tag size={32} className="mx-auto mb-3 opacity-40" />
          <p className="text-sm font-medium">No coupons yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {discounts.map((d) => (
            <div
              key={d.id}
              className={`bg-white rounded-2xl border p-5 transition-all ${
                d.active ? "border-stone-100" : "border-stone-100 opacity-60"
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                {/* Code */}
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-lg font-bold font-mono tracking-wide"
                      style={{ color: "var(--brand-dark)" }}
                    >
                      {d.code}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        d.active
                          ? "bg-green-100 text-green-700"
                          : "bg-stone-100 text-stone-500"
                      }`}
                    >
                      {d.active ? "Active" : "Off"}
                    </span>
                  </div>
                  {d.description && (
                    <p className="text-xs text-stone-400 mt-0.5">
                      {d.description}
                    </p>
                  )}
                </div>

                {/* Discount % */}
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-white text-sm shrink-0"
                  style={{ backgroundColor: "var(--brand-earth)" }}
                >
                  -{d.discount}%
                </div>
              </div>

              {/* Usage */}
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="flex-1 h-1.5 rounded-full overflow-hidden"
                  style={{ backgroundColor: "var(--brand-sand)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(d.usageCount * 2, 100)}%`,
                      backgroundColor: "var(--brand-sage)",
                    }}
                  />
                </div>
                <span className="text-xs text-stone-400">
                  {d.usageCount} uses
                </span>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {/* Toggle */}
                <button
                  onClick={() => handleToggle(d.id)}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl hover:bg-stone-50 transition-colors"
                  style={{ color: d.active ? "var(--brand-sage)" : "#9CA3AF" }}
                >
                  {d.active ? (
                    <ToggleRight size={16} />
                  ) : (
                    <ToggleLeft size={16} />
                  )}
                  {d.active ? "Disable" : "Enable"}
                </button>

                {/* Edit */}
                <button
                  onClick={() => setModal(d)}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl hover:bg-stone-50 transition-colors"
                  style={{ color: "var(--brand-earth)" }}
                >
                  Edit
                </button>

                {/* Delete */}
                <div className="ml-auto">
                  {delConfirm === d.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(d.id)}
                        className="px-3 py-1.5 rounded-xl text-xs font-medium bg-red-50 text-red-600"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setDelConfirm(null)}
                        className="px-3 py-1.5 rounded-xl text-xs font-medium bg-stone-100 text-stone-500"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDelConfirm(d.id)}
                      className="p-2 rounded-xl hover:bg-red-50 text-stone-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={15} />
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

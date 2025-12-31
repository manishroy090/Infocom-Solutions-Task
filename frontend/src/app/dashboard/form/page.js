"use client";

import React, { useEffect, useState } from "react";

export default function Page() {
  const [template, setTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [globalError, setGlobalError] = useState(null);


  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://127.0.0.1:8000/api/formsubmission/getschema",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch form schema");

        const data = await response.json();
        setTemplate(data.template);

     
      } catch (err) {
        setGlobalError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSchema();
  }, []);


  const handleChange = (e) => {
 const { name, value } = e.target;


  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  if (errors[name]) {
    setErrors((prev) => ({ ...prev, [name]: null }));
  }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrors({});
    setSuccess(null);
    setGlobalError(null);

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:8000/api/formsubmission/store",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            template_id:template.id,
            employee_id:1,
            ...formData,
          }),
        }
      );

      const res = await response.json();

      // Laravel validation error
      if (response.status === 422) {
        setErrors(res.validation_error || {});
        setSubmitting(false);
        return;
      }

      if (!response.ok) throw new Error("Submission failed");

      setSuccess("Form submitted successfully");
      setFormData({});
    } catch (err) {
      setGlobalError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };


  if (loading) {
    return <div className="p-6 text-gray-500">Loading form…</div>;
  }

  if (globalError) {
    return <div className="p-6 text-red-500">{globalError}</div>;
  }


  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          {template.name}
        </h1>
        <p className="text-sm text-gray-500">
          Dynamic form generated from schema
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-6 space-y-4"
      >
        {template.schema.map((field) => {
          return (
            <div key={field.name} className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
                {field.required && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </label>

              {field.type === "textarea" ? (
             <h1>c</h1>
              ) : (
                <input
                  type={field.type}
                  className={`w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-200
                  `}
                  name={field?.label.replace(/\s+/g, '').toLowerCase()}
                  placeholder={field.placeholder}
                  onChange={(e) =>
                    handleChange(e)
                  }
                />
              )}

              {/* Validation message */}
              {errors && (
                <span className="text-red-500 text-sm">
                  {errors?.[
                    field?.label.replace(/\s+/g, '').toLowerCase()
                  ]}
                </span>
              )}
            </div>
          );
        })}

        {/* Success */}
        {success && (
          <div className="text-green-600 text-sm">{success}</div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg
            hover:bg-blue-700 transition disabled:opacity-60"
        >
          {submitting ? "Submitting…" : "Submit"}
        </button>
      </form>
    </div>
  );
}

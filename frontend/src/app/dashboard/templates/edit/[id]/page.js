"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";7
import CloseIcon from '@mui/icons-material/Close';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const FIELD_TYPES = [
  "text",
  "email",
  "number",
  "textarea",
  "select",
  "checkbox",
  "radio",
  "date",
  "file",
  "phone",
  "url",
];

export default function Page({ params }) {
  const router = useRouter();
  const [templateName, setTemplateName] = useState("");
  const [fields, setFields] = useState([]);
  const { id } = useParams();
  const [TEMPLATE_ID, setId] = useState(id);
  const [errors, setErrors] = useState([]);



  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch(`http://127.0.0.1:8000/api/templates/edit/${TEMPLATE_ID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => {
        setTemplateName(data.templates.name);
        setFields(
          data.templates.schema.map(f => ({
            id: crypto.randomUUID(),
            label: f.label || "",
            type: f.type || "text",
            placeholder: f.placeholder || "",
            required: f.required || false,
            options: f.options || [],
          }))
        );
      });
  }, []);



  const addField = () => {
    setFields(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        label: "",
        type: "text",
        placeholder: "",
        required: false,
        options: [],
      },
    ]);
  };

  const updateField = (id, key, value) => {
    setFields(prev =>
      prev.map(f =>
        f.id === id
          ? {
            ...f,
            [key]: value,
            ...(key === "type" &&
              !["select", "radio"].includes(value) && {
              options: [],
            }),
          }
          : f
      )
    );
  };

  const removeField = id => {
    setFields(prev => prev.filter(f => f.id !== id));
  };

  const duplicateField = field => {
    setFields(prev => [
      ...prev,
      { ...field, id: crypto.randomUUID() },
    ]);
  };



  const saveTemplate = async () => {
    const payload = {
      name: templateName,
      schema: fields.map(f => ({
        label: f.label,
        type: f.type,
        placeholder: f.placeholder,
        required: f.required,
        options:
          f.type === "select" || f.type === "radio" ? f.options : null,
      })),
    };
    const token = localStorage.getItem('token');

    fetch(`http://127.0.0.1:8000/api/templates/update/${TEMPLATE_ID}`, {
      method: "PUT", // or PUT if update
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,

      },
      body: JSON.stringify(payload),
    }).then(async (res) => {
      const data = await res.json();
      if (res.status == 422) {
        setErrors(data.validation_error);
      }

      else {
        setErrors([]);
        alert(data.message);
        router.push("/dashboard/templates");
      }
    }).catch((error) => {
      console.log(error);

    }).finally(() => {

    })
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-black">
      <div>
        <h2 className="text-xl font-semibold mb-4"><FormatListBulletedIcon/> Form Builder</h2>
        <div className="flex flex-col">

          <input
            placeholder="Template name"
            className="w-full border rounded-lg px-3 py-2 mb-4"
            value={templateName}
            onChange={e => setTemplateName(e.target.value)}
          />
          <span className="text-red-600 italic">{errors.name}</span>
        </div>

        <button
          onClick={addField}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          + Add Field
        </button>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="bg-white border rounded-xl p-4 shadow-sm"
            >
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">
                  Field {index + 1}
                </span>
                <button
                  onClick={() => removeField(field.id)}
                  className="text-red-500"
                >
                  <CloseIcon/>
                </button>
              </div>
              <div className="flex flex-col">
                <input
                  placeholder="Label"
                  className="w-full border rounded-lg px-3 py-2 mb-2"
                  value={field.label}
                  onChange={e =>
                    updateField(field.id, "label", e.target.value)
                  }
                />
                <span className="text-red-600 italic">{errors?.[`schema.${index}.label`]?.[0]}</span>

              </div>

              <div>
                <select
                  className="w-full border rounded-lg px-3 py-2 mb-2"
                  value={field.type}
                  onChange={e =>
                    updateField(field.id, "type", e.target.value)
                  }
                >
                  {FIELD_TYPES.map(t => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <span className="text-red-600 italic">{errors?.[`schema.${index}.placeholder`]?.[0]}</span>
              </div>

              <input
                placeholder="Placeholder"
                className="w-full border rounded-lg px-3 py-2 mb-2"
                value={field.placeholder}
                onChange={e =>
                  updateField(field.id, "placeholder", e.target.value)
                }
              />

              <div>
                {(field.type === "select" || field.type === "radio") && (
                  <input
                    placeholder="Options (comma separated)"
                    className="w-full border rounded-lg px-3 py-2 mb-2"
                    value={field.options.join(",")}
                    onChange={e =>
                      updateField(
                        field.id,
                        "options",
                        e.target.value
                          .split(",")
                          .map(o => o.trim())
                          .filter(Boolean)
                      )
                    }
                  />
                )}
                <span className="text-red-600 italic">{errors?.[`schema.${index}.options`]?.[0]}</span>

              </div>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={field.required}
                  onChange={e =>
                    updateField(field.id, "required", e.target.checked)
                  }
                />
                Required
              </label>

              <button
                onClick={() => duplicateField(field)}
                className="mt-2 text-sm text-blue-600"
              >
                Duplicate
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={saveTemplate}
          className="mt-6 w-full bg-green-600 text-white py-2 rounded-lg"
        >
          Save Template
        </button>
      </div>

      <div className="sticky top-6 h-fit">
        <h2 className="text-xl font-semibold mb-4"><RemoveRedEyeIcon/> Live Preview</h2>

        <form className="bg-white border rounded-xl p-6 space-y-4">
          {fields.map(field => (
            <div key={field.id}>
              <label className="text-sm font-medium">
                {field.label || "Untitled"}
                {field.required && " *"}
              </label>
              {renderField(field)}
            </div>
          ))}
        </form>
      </div>
    </div>
  );
}



function renderField(field) {
  const base = "w-full border rounded-lg px-3 py-2";

  switch (field.type) {
    case "textarea":
      return <textarea className={base} />;
    case "select":
      return (
        <select className={base}>
          {field.options.map(o => (
            <option key={o}>{o}</option>
          ))}
        </select>
      );
    case "radio":
      return field.options.map(o => (
        <label key={o} className="flex gap-2">
          <input type="radio" /> {o}
        </label>
      ));
    case "checkbox":
      return <input type="checkbox" />;
    default:
      return <input type={field.type} className={base} />;
  }
}

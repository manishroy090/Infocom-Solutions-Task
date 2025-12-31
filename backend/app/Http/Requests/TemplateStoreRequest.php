<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;



class TemplateStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            response()->json([
                'message' => 'Validation failed',
                'validation_error' => $validator->errors()->toArray()
            ], 422)
        );
    }
    public function rules(): array
    {
        return [
            'name' => 'required',
            'schema' => 'required|array',
            'schema.*.label' => 'required',
            'schema.*.placeholder' => 'required',
            'schema.*.type' => 'required',
            'schema.*.options' => [
                'nullable',
                function ($attribute, $value, $fail) {
                    $index = explode('.', $attribute)[1];
                    $type = $this->schema[$index]['type'] ?? null;

                    if (in_array($type, ['select', 'radio'])) {
                        if (!is_array($value) || count($value) < 1) {
                            $fail('Options must be a non-empty array when type is select or radio');
                        }
                    }
                },
            ],
        ];
    }
    public function messages(): array
    {
        return [
            'name.required' => 'Name is required',
            'schema.required' => 'Schema is required',
            'schema.*.label.required' => 'Schema label is required',
            'schema.*.placeholder.required' => 'Schema Placeholder is required',
            'schema.*.type.required' => 'Schema type is required',
        ];
    }
}

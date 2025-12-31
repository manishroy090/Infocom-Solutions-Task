<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use App\Models\Templates;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Log;

class FormSubmissionStore extends FormRequest
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
    public function rules(): array
    {
        $templateId = $this->input('template_id');


        if (!$templateId) {
            return ['template_id' => 'required|exists:templates,id'];
        }

        $template = Templates::find($templateId);

        if (!$template) {
            return ['template_id' => 'exists:templates,id'];
        }

        $fields = $template->schema;
        $rules = ['template_id' => 'required|exists:templates,id'];
        $rules = [
            'template_id' => 'required|exists:templates,id',
            'employee_id' => 'nullable',
        ];


        foreach ($fields as $field) {
$rule = [($field['required'] ?? false) ? 'required' : 'nullable'];

            switch ($field['type']) {
                case 'text':
                case 'textarea':
                    $rule[] = 'string';
                    break;

                case 'email':
                    $rule[] = 'email';
                    break;

                case 'number':
                    $rule[] = 'numeric';
                    break;

                case 'date':
                    $rule[] = 'date';
                    break;

                case 'file':
                    $rule[] = 'file';
                    $rule[] = 'max:2048';
                    break;
            }
            $label =  strtolower(str_replace(' ', '', $field['label']));
            $rules[$label] = implode('|', $rule);
        }

        return $rules;
    }

    /**
     * Handle a failed validation attempt.
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

    /**
     * Get custom error messages
     */
    public function messages(): array
    {
        $messages = [];

        $templateId = $this->input('template_id');
        $template = Templates::find($templateId);

        if (!$template) {
            return [];
        }

        foreach ($template->schema as $field) {
            $key = str_replace(' ', '', strtolower($field['label']));
            $label = $field['label'];
            $messages["{$key}.required"] = "{$label} is required.";
            $messages["{$key}.email"]    = "{$label} must be a valid email address.";
            $messages["{$key}.numeric"]  = "{$label} must be a number.";
            $messages["{$key}.date"]     = "{$label} must be a valid date.";
            $messages["{$key}.file"]     = "{$label} must be a file.";
            $messages["{$key}.max"]      = "{$label} may not be greater than 2MB.";
        }

        return $messages;
    }
}
